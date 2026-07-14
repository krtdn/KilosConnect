import React from 'react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
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
            <h3 className="text-lg font-bold text-slate-900">Help & Support</h3>
            <p className="text-xs text-emerald-600 font-bold">Custodian Resource Desk</p>
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
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Common Solutions</h4>
            <div className="space-y-2">
              <details className="bg-gray-50 rounded-xl p-3 text-xs group cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center outline-none">
                  <span>QR Scanner is not loading camera</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  Make sure you have granted camera permissions in your browser. If you denied it by accident, reset browser site permissions in your browser settings bar at the top of your screen.
                </p>
              </details>

              <details className="bg-gray-50 rounded-xl p-3 text-xs group cursor-pointer">
                <summary className="font-bold text-slate-800 flex justify-between items-center outline-none">
                  <span>How to report emergency major leaks?</span>
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  First, immediately switch off the primary water main shut-off valve (located in the service corridor). Next, inform the floor manager immediately and submit an emergency tag using the "Report Issue" action.
                </p>
              </details>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact IT Tech Support</h4>
            <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block font-bold text-slate-800">HQ Support Ticket Line</span>
                  <span className="text-gray-400 block mt-0.5">Response time: &lt; 15 mins</span>
                </div>
                <a href="mailto:support@kilosconnect.com" className="text-emerald-700 font-bold text-xs bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportModal;