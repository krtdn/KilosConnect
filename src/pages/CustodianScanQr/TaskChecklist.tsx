import React, { useState } from 'react';
import { type Zone } from './MaintenanceWizard';

interface TaskChecklistProps {
  zone: Zone;
  onComplete: (completed: number, total: number) => void;
}

const TaskChecklist: React.FC<TaskChecklistProps> = ({ zone, onComplete }) => {
  // Simulating custom dynamic check fields based on the chosen workspace zone
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Check cable machine tension', done: false },
    { id: 2, label: 'Inspect weight stack pins', done: false },
    { id: 3, label: 'Clean equipment surfaces', done: false },
    { id: 4, label: 'Check floor matting', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const isAllChecked = completedCount === tasks.length;

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-emerald-800">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-base font-bold">{zone.name}</h2>
        </div>
        <p className="text-xs text-emerald-700 mt-0.5">QR Code Verified ✓</p>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs font-semibold text-gray-500">
            <span>Progress</span>
            <span>{completedCount}/{tasks.length}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <label 
            key={task.id} 
            className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-200 transition-colors"
          >
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className={`text-sm font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {task.label}
            </span>
          </label>
        ))}
      </div>

      <button
        disabled={!isAllChecked}
        onClick={() => onComplete(completedCount, tasks.length)}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow transition-all ${
          isAllChecked ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Proceed to Photo Evidence
      </button>
    </div>
  );
};

export default TaskChecklist;