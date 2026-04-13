'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-3 py-3 border-b border-gray-100 group ${done ? 'opacity-50' : ''}`}>
      <button
        onClick={() => onToggle(id)}
        aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          done ? 'bg-black border-black' : 'border-gray-400 hover:border-black'
        }`}
      >
        {done && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {title}
      </span>

      <button
        onClick={() => onDelete(id)}
        aria-label={`Delete task: ${title}`}
        className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
