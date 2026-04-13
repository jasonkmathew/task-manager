// ══════════════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE:   Displays a live statistics bar showing the total,
//            active, and completed task counts. Also renders a
//            "Clear Done" button that removes all completed tasks
//            at once. Counts update automatically because they
//            are derived values computed in TaskBoard and passed
//            down as props — whenever tasks state changes, React
//            re-renders TaskBoard, recomputes the counts, and
//            passes the new values here as updated props.
// TYPE:      Client Component ('use client') — needs onClick
//            for the "Clear Done" button.
// PROPS:
//   total          — total number of tasks (derived in TaskBoard)
//   active         — number of incomplete tasks (derived)
//   completed      — number of completed tasks (derived)
//   onClearCompleted — callback from TaskBoard (handleClearCompleted);
//                      fires when user clicks "Clear Done". TaskBoard
//                      uses .filter() to keep only !done tasks.
// ══════════════════════════════════════════════════════════════
'use client';

export default function TaskStats({ total, active, completed, onClearCompleted }) {

  // ── DERIVED VALUE: stats array ─────────────────────────────
  // This array is built from props on every render. It's NOT
  // stored in state because it's entirely determined by the
  // props — if we stored it as state, we'd have to manually
  // keep it in sync with props, which is error-prone and
  // unnecessary. React's philosophy: derive what you can,
  // store only what you must.
  const stats = [
    { label: 'Total',     value: total,     color: 'text-foreground', bg: 'bg-foreground/10' },
    { label: 'Active',    value: active,    color: 'text-secondary',  bg: 'bg-secondary/10' },
    { label: 'Completed', value: completed, color: 'text-accent',     bg: 'bg-accent/10' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

      {/* ── STAT PILLS ──────────────────────────────────────
          Each stat is rendered as a small pill with the label
          and count. .map() creates one pill per stat entry. */}
      <div className="flex flex-wrap gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            id={`stat-${stat.label.toLowerCase()}`}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full
              ${stat.bg} text-xs md:text-sm font-medium
            `}
          >
            <span className="text-muted">{stat.label}</span>
            {/* The count value — uses the stat-specific color
                to create visual distinction between categories */}
            <span className={`${stat.color} font-bold`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── CLEAR COMPLETED BUTTON ────────────────────────────
          Conditional render using &&: this button ONLY appears
          when there are completed tasks (completed > 0). If
          completed is 0, the expression short-circuits and React
          renders nothing. This prevents showing a useless button
          that would confuse the user.

          onClick calls onClearCompleted() (no arguments needed
          because TaskBoard's handleClearCompleted already knows
          to filter out all done tasks — it doesn't need an ID). */}
      {completed > 0 && (
        <button
          id="clear-completed-btn"
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-danger/10 text-danger text-xs md:text-sm font-medium hover:bg-danger/20 transition-colors duration-200"
        >
          {/* Sweep icon */}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear Done
        </button>
      )}
    </div>
  );
}
