import React, { useState } from 'react';
import { CheckCircle2, Eye, Flag, X } from 'lucide-react';

interface Submission {
  id: string;
  taskTitle: string;
  area: string;
  custodianName: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Flagged';
  image: string;
  basisImage?: string;
  flagReason?: string;
}

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    taskTitle: 'Sanitize Powerlifting Benches and Barbells',
    area: 'Powerlifting Area',
    custodianName: 'John Custodian',
    submittedAt: 'Today, 08:30 AM',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    basisImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sub-2',
    taskTitle: 'Inspect CrossFit Rig Bolts and Pull-up Bars',
    area: 'CrossFit Area',
    custodianName: 'Alex Smith',
    submittedAt: 'Yesterday, 05:45 PM',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    basisImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
  },
];

const COMMON_FLAG_REASONS = [
  'Incomplete sanitization or wipe-down',
  'Equipment left unorganized or out of position',
  'Proof photo is blurry or unclear',
  'Does not match standard reference layout',
];

export const ReviewSubmissionsTab: React.FC<{ basisImages?: Record<string, any> }> = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  
  // Flagging Modal State
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [targetSubId, setTargetSubId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: 'Approved' } : sub));
    if (selectedSub?.id === id) {
      setSelectedSub(prev => prev ? { ...prev, status: 'Approved' } : null);
    }
  };

  const openFlagModal = (id: string) => {
    setTargetSubId(id);
    setSelectedReason('');
    setCustomReason('');
    setIsFlagModalOpen(true);
  };

  const submitFlag = () => {
    if (!targetSubId) return;
    const finalReason = selectedReason === 'Others' ? customReason : selectedReason;
    if (!finalReason.trim()) return;

    setSubmissions(prev => prev.map(sub => sub.id === targetSubId ? { ...sub, status: 'Flagged', flagReason: finalReason } : sub));
    if (selectedSub?.id === targetSubId) {
      setSelectedSub(prev => prev ? { ...prev, status: 'Flagged', flagReason: finalReason } : null);
    }
    setIsFlagModalOpen(false);
    setTargetSubId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Task Completion Submissions</h2>
            <p className="text-sm text-gray-500 mt-0.5">Review photographic proof submitted by custodians against reference layout standards.</p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
            {submissions.filter(s => s.status === 'Pending').length} Pending Reviews
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start space-x-4">
                <img 
                  src={sub.image} 
                  alt="Submission Proof" 
                  className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm flex-shrink-0" 
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-gray-900">{sub.taskTitle}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      sub.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      sub.status === 'Flagged' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-indigo-600">{sub.area}</p>
                  <p className="text-xs text-gray-500">Submitted by <span className="font-semibold text-gray-700">{sub.custodianName}</span> • {sub.submittedAt}</p>
                  {sub.flagReason && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg mt-1 font-medium">
                      <strong>Flag Reason:</strong> {sub.flagReason}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                <button
                  onClick={() => setSelectedSub(sub)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
                >
                  <Eye size={16} />
                  <span>Inspect Side-by-Side</span>
                </button>

                {sub.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => openFlagModal(sub.id)}
                      className="px-4 py-2 border border-amber-500 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all shadow-sm"
                    >
                      Flag for Review
                    </button>
                    
                    <button
                      onClick={() => handleApprove(sub.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center space-x-1.5"
                    >
                      <CheckCircle2 size={16} />
                      <span>Approve Submission</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INSPECT MODAL (SIDE BY SIDE COMPARISON) */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedSub.taskTitle}</h3>
                <p className="text-sm font-medium text-indigo-600">Location: {selectedSub.area} • Submitted by {selectedSub.custodianName}</p>
              </div>
              <button 
                onClick={() => setSelectedSub(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto p-1">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Reference Basis Standard</span>
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                  <img src={selectedSub.basisImage || selectedSub.image} alt="Basis Reference" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-500">Expected layout configuration setup for this specific zone.</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Custodian Live Proof Submission</span>
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-inner">
                  <img src={selectedSub.image} alt="Submission Proof" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-500">Uploaded snapshot captured on-site during task wrap-up.</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedSub.status === 'Pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedSub.id;
                      setSelectedSub(null);
                      openFlagModal(id);
                    }}
                    className="px-5 py-2.5 border border-amber-500 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all"
                  >
                    Flag for Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedSub.id)}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-sm transition-all flex items-center space-x-2"
                  >
                    <CheckCircle2 size={18} />
                    <span>Approve Submission</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLAG REASON MODAL WITH PRESETS & OTHERS */}
      {isFlagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600 border-b pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <Flag size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Flag Task Submission</h3>
                <p className="text-xs text-gray-500">Select a common reason or specify a custom feedback note.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Select Flag Reason</label>
              
              <div className="space-y-2">
                {COMMON_FLAG_REASONS.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                      selectedReason === reason 
                        ? 'border-red-500 bg-red-50/50 text-red-900 shadow-sm' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{reason}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedReason === reason ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300'
                    }`}>
                      {selectedReason === reason && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </span>
                  </button>
                ))}

                {/* OTHERS OPTION */}
                <button
                  type="button"
                  onClick={() => setSelectedReason('Others')}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                    selectedReason === 'Others' 
                      ? 'border-red-500 bg-red-50/50 text-red-900 shadow-sm' 
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>Others (Specify reason)</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedReason === 'Others' ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300'
                  }`}>
                    {selectedReason === 'Others' && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </button>
              </div>

              {/* CUSTOM TEXT AREA IF OTHERS IS SELECTED */}
              {selectedReason === 'Others' && (
                <div className="pt-2 space-y-1 animate-fadeIn">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Custom Reason Details</label>
                  <textarea
                    rows={3}
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Type specific explanation or feedback notes..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm outline-none resize-none"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsFlagModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitFlag}
                disabled={!selectedReason || (selectedReason === 'Others' && !customReason.trim())}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 shadow-sm transition-colors"
              >
                Submit Flag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReviewSubmissionsTab;