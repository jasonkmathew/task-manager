'use client';

export default function TaskStats({ completed, onClearCompleted }) {
  return (
    <div className="flex justify-end mb-4">
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-gray-700 underline"
        >
          clear completed
        </button>
      )}
    </div>
  );
}
