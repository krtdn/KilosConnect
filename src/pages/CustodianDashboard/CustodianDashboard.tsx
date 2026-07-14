import React from 'react';
import Header from './Header';
import WelcomeBanner from './WelcomeBanner';
import QuickActions from './QuickActions';
import TasksList from './TaskList'; 
import WeeklyStats from './WeeklyStats';

interface CustodianDashboardProps {
  onNavigateToScan: () => void;
  onNavigateToReport: () => void;
  onNavigateToLost: () => void; // Keeps the quick action callback active!
}

const CustodianDashboard: React.FC<CustodianDashboardProps> = ({ 
  onNavigateToScan, 
  onNavigateToReport,
  onNavigateToLost
}) => {
  const mockTasks = [
    { id: '1', title: 'Mezzanine Maintenance', description: 'Scan QR and complete checklist', status: 'Pending' as const },
    { id: '2', title: 'Powerlifting Area Check', description: 'Equipment inspection required', status: 'Pending' as const },
    { id: '3', title: 'WOD Area Cleaning', description: 'Completed 2 hours ago', status: 'Completed' as const },
  ];

  const totalTasksToday = mockTasks.filter(t => t.status === 'Pending').length;

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* 1. Simplified Header (No redundant view switching state required) */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <WelcomeBanner name="John" tasksToday={totalTasksToday} completedCount={42} />

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h2>
          {/* 2. Retained the quick actions grid so users can kick-start immediate tasks */}
          <QuickActions 
            onScanClick={onNavigateToScan} 
            onReportClick={onNavigateToReport} 
            onLostClick={onNavigateToLost} 
          />
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Today's Tasks</h2>
          <TasksList tasks={mockTasks} />
        </section>

        <section>
          <WeeklyStats tasksDone={12} completionRate={95} avgTime="2.3h" />
        </section>
      </main>

      <button className="fixed bottom-20 right-4 z-40 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 focus:outline-none transition-colors">
        <span className="text-lg font-bold">?</span>
      </button>
    </div>
  );
};

export default CustodianDashboard;