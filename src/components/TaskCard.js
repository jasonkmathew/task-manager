// ══════════════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE:   Displays a single task item with its title, a
//            toggle button to mark it complete/incomplete, and
//            a delete button to remove it. This is a presentational
//            component — it receives all data via props and does
//            not own any task state. When the user interacts, it
//            fires callback props back up to TaskBoard (through
//            TaskList) where the actual state changes happen.
// TYPE:      Client Component ('use client') — needs onClick
//            event handlers for the toggle and delete buttons.
// PROPS:
//   id       — unique task identifier (UUID from crypto.randomUUID).
//              Used to tell TaskBoard WHICH task to toggle/delete.
//   title    — the task text typed by the user.
//   done     — boolean flag; true = task is completed.
//   onToggle — callback; fires onToggle(id) when user clicks
//              the toggle button. TaskBoard receives this and
//              uses .map() to flip the done boolean for this task.
//   onDelete — callback; fires onDelete(id) when user clicks
//              delete. TaskBoard uses .filter() to remove this task.
//   index    — position in the visible list, used for staggering
//              the entrance animation so cards cascade in sequence.
// ══════════════════════════════════════════════════════════════
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete, index }) {

  // ── DERIVED VALUE: animation delay ─────────────────────────
  // Computed from the index prop — not stored in state because
  // it's deterministic (always the same for the same index).
  // The stagger creates a pleasing cascade effect when the
  // list first appears or when the filter changes.
  const animDelay = `${index * 0.05}s`;

  return (
    // The outer div uses conditional classes based on the `done`
    // prop to visually distinguish completed tasks. The border
    // color and opacity change to make done tasks appear "faded"
    // while active tasks stand out with full contrast.
    <div
      id={`task-${id}`}
      className={`
        group flex items-center gap-3 p-4 rounded-2xl border
        transition-all duration-200 animate-fade-in-up
        ${done
          // Completed: reduced opacity + green-tinted border
          // signals "finished" visually without hiding the task
          ? 'bg-accent/5 border-accent/15 opacity-70'
          // Active: subtle surface bg + border that brightens
          // on hover to invite interaction
          : 'bg-surface/40 border-border hover:border-accent/30 hover:bg-surface/70'
        }
      `}
      style={{ animationDelay: animDelay }}
    >

      {/* ── TOGGLE BUTTON (checkbox-style) ──────────────────
          Clicking this calls onToggle(id), which flows UP to
          TaskBoard where handleToggle uses .map() to create a
          new tasks array with this task's `done` value flipped.

          WHY a button and not a checkbox? We're building a
          custom-styled toggle that looks like a circle/checkmark.
          A <button> with aria attributes is more flexible for
          custom styling while remaining accessible. */}
      <button
        id={`toggle-${id}`}
        onClick={() => onToggle(id)}
        aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${done
            // When done: filled green circle with checkmark
            ? 'bg-accent border-accent text-background'
            // When active: empty circle that glows green on hover
            : 'border-muted/40 hover:border-accent hover:shadow-sm hover:shadow-accent-glow'
          }
        `}
      >
        {/* Conditional render: checkmark SVG only appears when
            the task is done. The && operator acts as a guard —
            if done is false, React renders nothing for this
            expression. If done is true, the SVG is rendered. */}
        {done && (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* ── TASK TITLE ──────────────────────────────────────
          The title text uses conditional CSS classes to show
          the completion state: done tasks get a line-through
          decoration and muted color, making them visually
          "recede" behind active tasks. This is a ternary
          operator — condition ? valueIfTrue : valueIfFalse */}
      <span className={`
        flex-1 text-sm md:text-base transition-all duration-200
        ${done
          ? 'line-through text-muted/60'
          : 'text-foreground'
        }
      `}>
        {title}
      </span>

      {/* ── DELETE BUTTON ───────────────────────────────────
          Always present but becomes more visible on hover
          (the 'group' class on the parent + group-hover:
          pattern). This keeps the UI clean when not interacting
          but makes the delete action easily discoverable.

          onClick calls onDelete(id), which flows UP to TaskBoard
          where handleDelete uses .filter() to create a new array
          without this task. The old array is not mutated — a
          completely new array is created, which React detects
          as a state change and triggers a re-render. */}
      <button
        id={`delete-${id}`}
        onClick={() => onDelete(id)}
        aria-label={`Delete task: ${title}`}
        className="flex-shrink-0 p-1.5 rounded-lg text-muted/40 hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        {/* Trash icon SVG — inline SVG gives us full control
            over color via text-current (inherits from parent) */}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
