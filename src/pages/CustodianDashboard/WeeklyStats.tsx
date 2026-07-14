import React from 'react';

interface WeeklyStatsProps {
  tasksDone: number;
  completionRate: number;
  avgTime: string;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({ tasksDone, completionRate, avgTime }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-center space-x-2 text-emerald-600 mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">This Week</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xl font-bold text-gray-900">{tasksDone}</p>
          <p className="text-[10px] text-gray-400 font-medium">Tasks Done</p>
        </div>
        <div>
          <p className="text-xl font-bold text-emerald-600">{completionRate}%</p>
          <p className="text-[10px] text-gray-400 font-medium">Completion</p>
        </div>
        <div>
          <p className="text-xl font-bold text-blue-600">{avgTime}</p>
          <p className="text-[10px] text-gray-400 font-medium">Avg Time</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;