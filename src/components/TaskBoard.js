'use client';

import { useState, useEffect } from 'react';
import TaskStats   from './TaskStats';
import AddTaskForm from './AddTaskForm';
import FilterBar   from './FilterBar';
import TaskList    from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('taskflow-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const totalCount     = tasks.length;
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount    = totalCount - completedCount;

  const visibleTasks = filter === 'all'
    ? tasks
    : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done);

  function handleAdd(title) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    <div>
      <AddTaskForm onAdd={handleAdd} />

      <FilterBar
        current={filter}
        onChange={setFilter}
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
      />

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {visibleTasks.length === 0 && (
        <p className="text-gray-400 text-sm mt-6">
          {totalCount === 0 ? 'Nothing here yet.' : 'No tasks in this view.'}
        </p>
      )}

      <TaskStats
        completed={completedCount}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}
