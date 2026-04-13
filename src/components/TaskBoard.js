// ══════════════════════════════════════════════════════════════
// COMPONENT: TaskBoard (the "brain" of the app)
// PURPOSE:   Owns ALL task state (the single source of truth).
//            Passes task data DOWN to child components via props.
//            Receives user actions UP from children via callback
//            props. This pattern is called "lifting state up" —
//            the core React data-flow principle. By centralizing
//            state here, we ensure every child component always
//            shows consistent, synchronized data.
// TYPE:      Client Component ('use client') — this component
//            needs useState for reactive state management and
//            useEffect for syncing state with localStorage.
//            The 'use client' directive tells Next.js to include
//            this component's JavaScript in the client bundle so
//            it can run in the browser with full interactivity.
// PROPS:     None — this is the top-level stateful component.
//            It does not receive props because it IS the state
//            owner. All data originates here and flows downward.
// ══════════════════════════════════════════════════════════════
'use client';

import { useState, useEffect } from 'react';
import TaskStats    from './TaskStats';
import AddTaskForm  from './AddTaskForm';
import FilterBar    from './FilterBar';
import TaskList     from './TaskList';

export default function TaskBoard() {

  // ── STATE: tasks ───────────────────────────────────────────
  // This is the primary state of the entire application.
  // It stores an array of task objects, each with:
  //   { id: string, title: string, done: boolean }
  //
  // WHY useState? Because tasks change over time (add, toggle,
  // delete) and the UI must re-render to reflect those changes.
  // useState gives React the ability to track changes and trigger
  // re-renders. A plain variable would be reset on every render
  // and wouldn't cause the UI to update.
  //
  // LAZY INITIALIZER: We pass a function to useState instead of
  // a value. React calls this function ONLY on the first render,
  // not on subsequent re-renders. This is crucial because reading
  // from localStorage is a synchronous I/O operation — if we did
  // it on every render, it would slow down the app unnecessarily.
  //
  // typeof window GUARD: Next.js runs components on the server
  // first (Server-Side Rendering / SSR) to generate the initial
  // HTML. On the server, there is no browser, so `window` and
  // `localStorage` don't exist. Without this guard, the code
  // would throw a ReferenceError during SSR. We return an empty
  // array on the server, and on the client, the lazy initializer
  // runs again with the real localStorage data.
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('taskflow-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      // If localStorage data is corrupted or parsing fails,
      // we silently fall back to an empty array rather than
      // crashing the entire application.
      return [];
    }
  });

  // ── STATE: filter ──────────────────────────────────────────
  // Controls which subset of tasks the user currently sees.
  // Possible values: 'all', 'active', 'done'
  //
  // WHY separate from tasks? Because filter and tasks change
  // independently — clicking a filter button shouldn't modify
  // any task data, and adding a task shouldn't change the filter.
  // React best practice: each piece of state should represent
  // one independent piece of data. Grouping unrelated values
  // into one state object would cause unnecessary re-renders.
  const [filter, setFilter] = useState('all');

  // ── EFFECT: Persist tasks to localStorage ──────────────────
  // useEffect synchronizes React state with an external system
  // (in this case, the browser's localStorage API). React state
  // lives in memory and is lost on page refresh — localStorage
  // persists data across browser sessions.
  //
  // DEPENDENCY ARRAY: [tasks] means this effect runs ONLY when
  // the `tasks` array reference changes. React uses Object.is()
  // to compare the previous and current values. If tasks hasn't
  // changed (same reference), the effect is skipped entirely.
  // This prevents unnecessary writes to localStorage on renders
  // caused by other state changes (like changing the filter).
  //
  // WHY not include filter? Because we only want to persist
  // tasks — the filter is a temporary UI preference that
  // doesn't need to survive a page refresh.
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES ─────────────────────────────────────────
  // These values are COMPUTED from state on every render rather
  // than stored as separate state. This is intentional:
  //
  // 1. They are deterministically derived from `tasks` — given
  //    the same tasks array, these values will always be the same.
  //
  // 2. Storing them as state would create "duplicate state" —
  //    multiple sources of truth for the same information. If we
  //    forgot to update `completedCount` when toggling a task,
  //    the UI would show inconsistent data. By computing them
  //    fresh, they're always guaranteed to be correct.
  //
  // 3. React's reconciliation is fast enough that computing
  //    these on every render has negligible performance cost
  //    compared to the complexity bugs duplicate state would cause.

  // Total tasks, active tasks, and completed tasks for the stats bar
  const totalCount     = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount    = totalCount - completedCount;

  // The list of tasks the user currently sees, based on the filter.
  // This is a derived value because it depends on both `tasks` and
  // `filter` — whenever either changes, React re-renders and this
  // value is recomputed automatically. No effect needed.
  const visibleTasks = filter === 'all'
    ? tasks
    : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  // ── HANDLERS (callback props passed DOWN to children) ──────
  // These functions modify state and are passed to child
  // components as props. When a child calls one of these,
  // React re-renders TaskBoard with the new state, and all
  // children receive updated props automatically.
  //
  // CRITICAL: Every handler uses IMMUTABLE updates (creating
  // new arrays/objects) rather than mutating the existing state.
  // React uses referential equality (===) to detect state changes.
  // If we mutated tasks directly (e.g. tasks[0].done = true),
  // the array reference wouldn't change, so React would think
  // nothing changed and skip the re-render. The UI would be stale.

  // handleAdd: Creates a new task object and appends it.
  // Spread operator [...tasks, newTask] creates a NEW array
  // containing all existing tasks plus the new one.
  // crypto.randomUUID() generates a unique ID so React can
  // efficiently track and update individual tasks in the list.
  function handleAdd(title) {
    setTasks([...tasks, {
      id: crypto.randomUUID(),
      title,
      done: false,
    }]);
  }

  // handleToggle: Flips the `done` boolean for one specific task.
  // .map() returns a NEW array where each element is either:
  //   - a NEW object with `done` flipped (if id matches), or
  //   - the original unchanged task object (if id doesn't match).
  // The spread { ...t, done: !t.done } creates a shallow copy
  // of the task object with just the `done` property overridden.
  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  // handleDelete: Removes one task from the array.
  // .filter() returns a NEW array containing only the tasks
  // whose id does NOT match the deleted task's id. The original
  // array is never modified — filter always creates a new one.
  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // handleClearCompleted: Removes ALL completed tasks at once.
  // Similar to handleDelete, but the filter condition keeps
  // only the tasks that are NOT done (!t.done === true).
  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // ── RENDER ─────────────────────────────────────────────────
  // The JSX below defines the component tree. Data flows DOWN
  // through props, and events flow UP through callbacks.
  // This one-way data flow makes the app predictable and
  // easy to debug — you always know where state lives (here)
  // and how it changes (through the handlers above).
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

      {/* ── GLASS CARD CONTAINER ──────────────────────────
          The main card uses glassmorphism (backdrop-blur +
          semi-transparent bg) for a modern, layered look.
          rounded-3xl gives generously rounded corners that
          feel friendly and approachable. */}
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/30">

        {/* ── STATS BAR ───────────────────────────────────
            TaskStats receives count values as props (data
            flows DOWN) and the handleClearCompleted callback
            (events flow UP when user clicks "Clear Done").
            completedCount is passed so the button can be
            conditionally shown only when there are done tasks. */}
        <TaskStats
          total={totalCount}
          active={activeCount}
          completed={completedCount}
          onClearCompleted={handleClearCompleted}
        />

        {/* ── ADD TASK FORM ────────────────────────────────
            AddTaskForm manages its own input state (the text
            the user is typing) but does NOT own the task list.
            When the user submits, it calls onAdd(title) which
            is our handleAdd function. This keeps the form
            simple and focused — it only knows about input,
            not about the broader task state. */}
        <AddTaskForm onAdd={handleAdd} />

        {/* ── FILTER BAR ──────────────────────────────────
            FilterBar receives the current filter value and a
            setter to change it. It also receives counts so it
            can display badges showing how many tasks are in
            each category. This gives the user context about
            what each filter will show before clicking. */}
        <FilterBar
          current={filter}
          onChange={setFilter}
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {/* ── TASK LIST ───────────────────────────────────
            TaskList receives the filtered task array and the
            toggle/delete callbacks. It renders a TaskCard for
            each task. The callbacks are "passed through" —
            TaskList passes them to each TaskCard, which calls
            them when the user interacts. This is called
            "prop drilling" — acceptable here because we're
            only one level deep. For deeper nesting, React
            Context would be more appropriate. */}
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {/* ── EMPTY STATE MESSAGE ─────────────────────────
            Conditional rendering: this JSX only appears when
            there are no visible tasks. The && operator works
            as a guard — if the left side is falsy, React
            renders nothing. This provides helpful feedback
            so the user doesn't stare at a blank screen. */}
        {visibleTasks.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-5xl mb-4">
              {/* Different emoji based on whether ALL tasks
                  are empty or just the current filter view */}
              {totalCount === 0 ? '📝' : '✨'}
            </div>
            <p className="text-muted text-lg font-medium">
              {totalCount === 0
                ? 'No tasks yet — add one above!'
                : filter === 'done'
                  ? 'No completed tasks'
                  : 'All tasks are done! 🎉'}
            </p>
            <p className="text-muted/60 text-sm mt-1">
              {totalCount === 0
                ? 'Start your productive day by adding your first task'
                : 'Try changing the filter to see other tasks'}
            </p>
          </div>
        )}
      </div>

      {/* ── FOOTER ────────────────────────────────────────
          Simple branding footer outside the glass card */}
      <p className="text-center text-muted/50 text-xs mt-6 tracking-wide">
        Built with Next.js 16 · React 19 · Tailwind CSS v4
      </p>
    </div>
  );
}
