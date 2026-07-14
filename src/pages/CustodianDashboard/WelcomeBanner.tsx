import React from 'react';

interface WelcomeBannerProps {
  name: string;
  tasksToday: number;
  completedCount: number;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name, tasksToday, completedCount }) => {
  return (
    <div className="bg-emerald-600 text-white rounded-xl p-5 shadow-sm">
      <h2 className="text-2xl font-bold">Welcome Back, {name}!</h2>
      <p className="text-sm text-emerald-100 mt-0.5">Ready to keep Kilos PH in top shape?</p>
      
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-emerald-700/40 backdrop-blur-sm rounded-lg p-3">
          <p className="text-xs text-emerald-200">Tasks Today</p>
          <p className="text-2xl font-bold mt-1">{tasksToday}</p>
        </div>
        <div className="bg-emerald-700/40 backdrop-blur-sm rounded-lg p-3">
          <p className="text-xs text-emerald-200">Completed</p>
          <p className="text-2xl font-bold mt-1">{completedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;