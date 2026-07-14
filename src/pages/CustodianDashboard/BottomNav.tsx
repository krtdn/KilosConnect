import React from 'react';

interface BottomNavProps {
  currentView: 'home' | 'scan-flow' | 'report-flow' | 'lost-flow';
  onHomeClick: () => void;
  onScanClick: () => void;
  onReportClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onHomeClick,
  onScanClick,
  onReportClick,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-8 flex justify-around items-center z-50">
      
      {/* Home tab */}
      <button 
        onClick={onHomeClick}
        className={`flex flex-col items-center space-y-0.5 text-xs font-medium transition-colors ${
          currentView === 'home' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </button>

      {/* Scan tab */}
      <button 
        onClick={onScanClick}
        className={`flex flex-col items-center space-y-0.5 text-xs font-medium transition-colors ${
          currentView === 'scan-flow' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M4 8V6a2 2 0 012-2h2" />
        </svg>
        <span>Scan QR</span>
      </button>

      {/* Report Issue tab */}
      <button 
        onClick={onReportClick}
        className={`flex flex-col items-center space-y-0.5 text-xs font-medium transition-colors ${
          currentView === 'report-flow' || currentView === 'lost-flow' ? 'text-emerald-700' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Report Issue</span>
      </button>
    </nav>
  );
};

export default BottomNav;