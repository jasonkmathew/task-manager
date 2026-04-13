// ══════════════════════════════════════════════════════════════
// COMPONENT: FilterBar
// PURPOSE:   Renders three filter buttons (All / Active / Done)
//            that let the user choose which subset of tasks to
//            display. This component does NOT filter the tasks
//            itself — it simply tells TaskBoard which filter
//            the user selected, and TaskBoard computes the
//            filtered list as a derived value.
// TYPE:      Client Component ('use client') — needs onClick
//            handlers to respond to user interaction.
// PROPS:
//   current        — the currently active filter string
//                     ('all', 'active', or 'done')
//   onChange        — callback from TaskBoard (setFilter);
//                     called with the new filter string when
//                     the user clicks a filter button
//   totalCount     — number of total tasks (for badge display)
//   activeCount    — number of incomplete tasks (for badge)
//   completedCount — number of completed tasks (for badge)
// ══════════════════════════════════════════════════════════════
'use client';

export default function FilterBar({ current, onChange, totalCount, activeCount, completedCount }) {

  // ── DERIVED VALUE: filters array ───────────────────────────
  // This array is defined inside the component so it has access
  // to the count props. It's recreated on every render, which
  // is fine — arrays of 3 objects are trivially cheap to create.
  // Storing this in state would be wrong because it's fully
  // determined by the props (derived data, not independent state).
  const filters = [
    { key: 'all',    label: 'All',    count: totalCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'done',   label: 'Done',   count: completedCount },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {/* .map() transforms the filters array into an array of
          JSX button elements. React requires a unique `key` prop
          on each element in a mapped list so it can efficiently
          track which items changed, were added, or removed during
          re-renders. Without keys, React would re-render the
          entire list on every change instead of just the diff. */}
      {filters.map((f) => {

        // DERIVED VALUE: isActive determines if this button
        // represents the currently selected filter. It's computed
        // fresh on every render from the `current` prop — no
        // need to store it in state because it's deterministic.
        const isActive = current === f.key;

        return (
          // onClick calls onChange (which is TaskBoard's setFilter)
          // with this filter's key string. This updates TaskBoard's
          // filter state, which triggers a re-render, which
          // recomputes visibleTasks, which updates the task list.
          // Data flows: click → onChange → TaskBoard state →
          //             re-render → new visibleTasks → TaskList
          <button
            key={f.key}
            id={`filter-${f.key}-btn`}
            onClick={() => onChange(f.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-200
              ${isActive
                // Active state: accent background with glow effect
                // to clearly show which filter is currently selected
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-sm shadow-accent-glow'
                // Inactive state: subtle surface background that
                // lights up on hover to indicate it's clickable
                : 'bg-surface/50 text-muted border border-transparent hover:bg-surface-hover hover:text-foreground'
              }
            `}
          >
            {f.label}

            {/* Badge showing the count for each filter category.
                This gives the user immediate context about what
                each filter will show, without needing to click.
                Conditional styling makes the active badge more
                prominent to reinforce the current selection. */}
            <span className={`
              text-xs px-2 py-0.5 rounded-full font-semibold
              ${isActive
                ? 'bg-accent/20 text-accent'
                : 'bg-surface text-muted'
              }
            `}>
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
