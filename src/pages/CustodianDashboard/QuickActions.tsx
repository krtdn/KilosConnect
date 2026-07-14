import React from 'react';

interface QuickActionsProps {
  onScanClick: () => void;
  onReportClick: () => void;
  onLostClick: () => void; // Added click property
}

const QuickActions: React.FC<QuickActionsProps> = ({ onScanClick, onReportClick, onLostClick }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        
        {/* Scan QR Code Button */}
        <button 
          type="button"
          onClick={onScanClick} 
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center hover:bg-gray-50 transition-colors w-full"
        >
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full mb-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h2a2 2 0 002-2v-2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M4 8V6a2 2 0 012-2h2" />
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-900 mt-2">Scan QR Code</span>
          <span className="text-xs text-gray-400 mt-1">Start maintenance</span>
        </button>

        {/* Report Issue Button */}
        <button 
          type="button"
          onClick={onReportClick} 
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center hover:bg-gray-50 transition-colors w-full"
        >
          <div className="bg-red-50 text-red-600 p-3 rounded-full mb-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-900 mt-2">Report Issue</span>
          <span className="text-xs text-gray-400 mt-1">Log incident</span>
        </button>

        {/* Lost & Found Button */}
        <button 
          type="button"
          onClick={onLostClick} // Added click handler trigger
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center hover:bg-gray-50 transition-colors w-full"
        >
          <div className="bg-amber-50 text-amber-600 p-3 rounded-full mb-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-900 mt-2">Lost & Found</span>
          <span className="text-xs text-gray-400 mt-1">Add item</span>
        </button>

        {/* My Stats Button */}
        <button 
          type="button"
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center hover:bg-gray-50 transition-colors w-full"
        >
          <div className="bg-purple-50 text-purple-600 p-3 rounded-full mb-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-900 mt-2">My Stats</span>
          <span className="text-xs text-gray-400 mt-1">View performance</span>
        </button>

      </div>
    </div>
  );
};

export default QuickActions;