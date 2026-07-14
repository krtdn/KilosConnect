import React from 'react';

interface SummarySubmissionProps {
  zoneName: string;
  qrVerified: boolean;
  completedTasks: string;
  photoVerified: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const SummaryRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-none">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <span className="text-sm font-semibold text-gray-900">{value}</span>
  </div>
);

const SummarySubmission: React.FC<SummarySubmissionProps> = ({
  zoneName,
  qrVerified,
  completedTasks,
  photoVerified,
  onSubmit,
  onCancel,
}) => {
  const checkIcon = (
    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center flex flex-col items-center">
        <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-2 shadow-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-emerald-900">Ready to Submit</h2>
        <p className="text-xs text-emerald-700 mt-0.5">All requirements completed</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <SummaryRow label="Zone" value={zoneName} />
        <SummaryRow label="QR Verified" value={qrVerified ? checkIcon : 'No'} />
        <SummaryRow label="Tasks Completed" value={<span className="text-emerald-700">{completedTasks}</span>} />
        <SummaryRow label="Photo Evidence" value={photoVerified ? checkIcon : 'No'} />
      </div>

      <div className="space-y-2 pt-2">
        <button
          onClick={onSubmit}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow transition-colors"
        >
          Submit Verification
        </button>
        
        <button 
          onClick={onCancel}
          className="w-full text-center text-sm text-gray-500 font-medium hover:text-gray-700 py-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export { SummarySubmission };