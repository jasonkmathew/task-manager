// ══════════════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE:   Renders the filtered list of tasks. Receives the
//            visible tasks array from TaskBoard and maps each
//            task object into a TaskCard component. Also passes
//            the toggle/delete callbacks through to TaskCard.
// TYPE:      Client Component ('use client') — needs to render
//            interactive TaskCard children and handle the list.
// PROPS:
//   tasks    — array of task objects to display. This is the
//              FILTERED array from TaskBoard (visibleTasks),
//              not the full tasks array. The filtering logic
//              lives in TaskBoard; this component just renders
//              whatever it receives.
//   onToggle — callback from TaskBoard (handleToggle); passed
//              through to each TaskCard. When a TaskCard calls
//              it with a task ID, the event bubbles up through
//              TaskList to TaskBoard, which updates state.
//   onDelete — callback from TaskBoard (handleDelete); same
//              pass-through pattern as onToggle.
// ══════════════════════════════════════════════════════════════
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  // ── CONDITIONAL RENDER ─────────────────────────────────────
  // If there are no tasks to display, return null (render nothing).
  // The empty state message is handled by TaskBoard, not here,
  // because TaskBoard has the context to display different
  // messages based on whether tasks are truly empty vs. just
  // filtered out. Keeping that logic in the parent avoids
  // duplicating the "why is the list empty?" logic.
  if (tasks.length === 0) return null;

  return (
    // max-h + overflow-y-auto creates a scrollable container
    // for the task list when there are many tasks. This prevents
    // the page from becoming infinitely long. pr-1 adds a small
    // right padding so the scrollbar doesn't overlap content.
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">

      {/* .map() transforms each task object into a TaskCard
          component. React renders an array of JSX elements
          as a list of siblings in the DOM.

          KEY PROP: key={task.id} is critical for React's
          reconciliation algorithm. When the list changes
          (item added, removed, or reordered), React uses keys
          to match old elements with new ones. Without keys,
          React would destroy and recreate every DOM element
          on every change. With keys, it only updates what
          actually changed — much faster and preserves any
          internal state (like animations) in unchanged items.

          We use task.id (a UUID) rather than the array index
          because indices change when items are reordered or
          deleted. Using index as key would cause React to
          mismatch elements and potentially show wrong data. */}
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
          // index is passed for staggered animation delay —
          // each card appears slightly after the previous one,
          // creating a cascading entrance effect
          index={index}
        />
      ))}
    </div>
  );
}
