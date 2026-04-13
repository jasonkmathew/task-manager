'use client';

export default function FilterBar({ current, onChange, totalCount, activeCount, completedCount }) {
  const filters = [
    { key: 'all',    label: `All (${totalCount})` },
    { key: 'active', label: `Active (${activeCount})` },
    { key: 'done',   label: `Done (${completedCount})` },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`px-3 py-1 rounded text-sm border ${
            current === f.key
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
