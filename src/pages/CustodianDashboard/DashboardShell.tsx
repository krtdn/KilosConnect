import React, { useState } from 'react';
import CustodianDashboard from './CustodianDashboard';
import MaintenanceWizard from '../CustodianScanQr/MaintenanceWizard';
import ReportIncidentForm from '../ReportCustodian/ReportIncidentForm'; // Correct path
import LostIncidentForm from '../LostIncident/LostIncidentForm'; // Imported the new lost items form page
import BottomNav from './BottomNav';

const DashboardShell: React.FC = () => {
  // 1. Added 'lost-flow' to the state union type
  const [currentView, setCurrentView] = useState<'home' | 'scan-flow' | 'report-flow' | 'lost-flow'>('home');

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans antialiased text-gray-800 overflow-hidden">
      s
      {/* Dynamic Main View Screen Pane */}
      <main className="flex-1 overflow-y-auto pb-20">
        {currentView === 'home' && (
          <CustodianDashboard 
            onNavigateToScan={() => setCurrentView('scan-flow')} 
            onNavigateToReport={() => setCurrentView('report-flow')}
            onNavigateToLost={() => setCurrentView('lost-flow')} // 2. Passed new trigger to dashboard quick actions
          />
        )}
        
        {currentView === 'scan-flow' && (
          <MaintenanceWizard onExitFlow={() => setCurrentView('home')} />
        )}

        {currentView === 'report-flow' && (
          <ReportIncidentForm />
        )}

        {/* 3. Render the newly created Lost items page */}
        {currentView === 'lost-flow' && (
          <LostIncidentForm />
        )}
      </main>

      {/* Synchronized Bottom Navigation Bar */}
      <BottomNav 
        currentView={currentView}
        onHomeClick={() => setCurrentView('home')}
        onScanClick={() => setCurrentView('scan-flow')} 
        onReportClick={() => setCurrentView('report-flow')}
        onLostClick={() => setCurrentView('lost-flow')} // 4. Added onLostClick handler for the navigation tab
      />
    </div>
  );
};

export default DashboardShell;