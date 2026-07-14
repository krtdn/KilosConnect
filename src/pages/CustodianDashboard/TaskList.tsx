import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isPending = task.status === 'Pending';
        return (
          <div
            key={task.id}
            className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
              isPending 
                ? 'bg-white border-gray-100 hover:border-gray-200' 
                : 'bg-emerald-50/50 border-emerald-100'
            }`}
          >
            <div className="space-y-1">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isPending ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {task.status}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 pt-0.5">{task.title}</h3>
              <p className="text-xs text-gray-400">{task.description}</p>
            </div>
            
            <div className="text-gray-400">
              {isPending ? (
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;