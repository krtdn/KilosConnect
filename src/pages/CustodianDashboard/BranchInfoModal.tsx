import React from 'react';

interface BranchInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BranchInfoModal: React.FC<BranchInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
      />

      <div className="relative bg-white rounded-3xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl flex flex-col text-slate-800 animate-slide-up">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Branch Information</h3>
            <p className="text-xs text-emerald-600 font-bold">Kilos PH</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Daily Alert Banner */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-800">
            <strong className="block text-amber-900 font-bold mb-1">📢 Facilities Notice</strong>
            AC maintenance on the Mezzanine is scheduled today between 1:00 PM and 3:00 PM.
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Operating Hours</h4>
            <div className="bg-gray-50 rounded-2xl p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Weekdays:</span>
                <span className="font-bold text-slate-900">6:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Weekends:</span>
                <span className="font-bold text-slate-900">7:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Critical Utility Mapping */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Critical Map & Shut-offs</h4>
            <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-3">
              <div>
                <span className="block font-bold text-slate-800">Water Shut-off Valve</span>
                <span className="text-gray-500 block mt-0.5">Service locker area behind female shower room</span>
              </div>
              <div>
                <span className="block font-bold text-slate-800">Main Electrical Panel</span>
                <span className="text-gray-500 block mt-0.5">Breakroom cabinet (Keycard access required)</span>
              </div>
            </div>
          </div>

          {/* On-Duty Emergency Contacts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">On-Duty Contacts</h4>
            <div className="bg-gray-50 rounded-2xl p-4 text-sm space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs text-gray-400 font-semibold">Branch Manager</span>
                  <span className="font-bold text-slate-800">Sarah Cruz</span>
                </div>
                <a href="tel:+639171234567" className="text-emerald-700 font-bold text-xs bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchInfoModal;