import React, { useState, useEffect } from 'react';
import { QrCode, AlertTriangle, Search, Info, ArrowLeft, Upload } from 'lucide-react';
import { type ReportingView, GYM_ZONES } from './reporting';
import QRScannerView from './QrScannerView';
import SuccessView from './SuccessView';

export default function PublicReportingPage() {
  const [view, setView] = useState<ReportingView>('menu');
  const [trackId, setTrackId] = useState('');
  
  // Data Inputs
  const [assetId, setAssetId] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qrAssetId = params.get('assetId');
    if (qrAssetId) {
      setAssetId(qrAssetId);
      setView('asset-form');
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate your API call context logic
    setTimeout(() => {
      setIsSubmitting(false);
      setView('success');
      setDescription('');
      setContactEmail('');
    }, 1200);
  };

  const resetToMenu = () => {
    setView('menu');
    const params = new URLSearchParams(window.location.search);
    if (!params.get('assetId')) setAssetId('');
  };

  return (
    <div className="min-h-screen w-full bg-[#0B132B] text-slate-100 flex flex-col justify-between items-center px-4 py-8 md:py-12 selection:bg-emerald-500 selection:text-neutral-900">
      
      {view !== 'success' && (
        <header className="w-full max-w-2xl text-center mt-4 md:mt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-black tracking-wider text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">KILOS</span>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse mt-2" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-200 tracking-tight">KilosConnect Public Reporting</h1>
        </header>
      )}

      <main className="w-full max-w-xl my-auto py-6">
        {/* VIEW 1: MAIN INTERACTIVE MENU */}
        {view === 'menu' && (
          <div className="space-y-5 animate-fade-in">
            <p className="text-center text-sm text-slate-400 max-w-xs mx-auto leading-relaxed mb-6">
              Help us maintain a safe and functional facility. Report equipment issues or safety hazards instantly.
            </p>

            <button onClick={() => setView('scanner')} className="w-full text-left block group p-5 bg-[#1C2541]/60 hover:bg-[#1C2541]/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors duration-300">
                  <QrCode size={26} />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Report Asset Issue</h2>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300">Scan equipment QR code or manually enter asset details to report malfunctions or damage.</p>
                </div>
              </div>
            </button>

            <button onClick={() => setView('hazard-form')} className="w-full text-left block group p-5 bg-[#1C2541]/60 hover:bg-[#1C2541]/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300">
                  <AlertTriangle size={26} />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Report Facility Hazard</h2>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300">Report structural concerns, wet spills, or structural hazards needing maintenance.</p>
                </div>
              </div>
            </button>

            <div className="p-4 bg-[#111A36] border border-slate-800/80 rounded-xl shadow-inner">
              <form onSubmit={(e) => { e.preventDefault(); alert(`Searching track status: ${trackId}`); }} className="space-y-2">
                <label className="block text-xs font-medium text-slate-400 flex items-center gap-1.5"><Search size={12} /> Track status code</label>
                <div className="relative flex items-center">
                  <input type="text" placeholder="Enter Reference ID (e.g., #REQ-1234)" value={trackId} onChange={(e) => setTrackId(e.target.value)} className="w-full px-3 py-2 text-sm bg-[#0B132B] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500" />
                  <button type="submit" className="absolute right-1.5 px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition">Track</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 2: CAMERA CAPTURE HARDWARE */}
        {view === 'scanner' && (
          <QRScannerView 
            onBack={resetToMenu} 
            onSkipToManual={() => setView('asset-form')} 
            onScanSuccess={(id) => { setAssetId(id); setView('asset-form'); }} 
          />
        )}

        {/* VIEW 3: ASSET REPORT ENTRY FORM */}
        {view === 'asset-form' && (
          <div className="bg-[#1C2541]/50 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 animate-fade-in">
            <button onClick={resetToMenu} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"><ArrowLeft size={14} /> Cancel & Back</button>
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><QrCode className="text-emerald-400" size={20} /> Report Asset Issue</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Asset ID / QR Identifier *</label>
                <input type="text" required placeholder="e.g., TREADMILL-04, BENCH-02" value={assetId} onChange={(e) => setAssetId(e.target.value)} className="w-full px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-lg text-sm focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Issue Description *</label>
                <textarea required rows={4} placeholder="Describe the problem accurately..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-lg text-sm resize-none focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Add Reference Photo</label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center cursor-pointer"><Upload size={20} className="mx-auto text-slate-500 mb-1" /><span className="text-xs text-slate-400">Upload system image asset</span></div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition text-sm">{isSubmitting ? 'Submitting...' : 'Submit Issue'}</button>
            </form>
          </div>
        )}

        {/* VIEW 4: HAZARD LOCATION FORM */}
        {view === 'hazard-form' && (
          <div className="bg-[#1C2541]/50 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 animate-fade-in">
            <button onClick={resetToMenu} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"><ArrowLeft size={14} /> Cancel & Back</button>
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><AlertTriangle className="text-amber-400" size={20} /> Report Facility Hazard</h2>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Facility Zone *</label>
                <select required value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} className="w-full px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-lg text-sm text-slate-200 focus:border-amber-500 focus:outline-none">
                  <option value="" disabled>-- Select location zone --</option>
                  {GYM_ZONES.map(zone => <option key={zone} value={zone}>{zone}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hazard Details *</label>
                <textarea required rows={4} placeholder="Explain the safety concern..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-lg text-sm resize-none focus:border-amber-500 focus:outline-none" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 rounded-lg font-bold transition text-sm">{isSubmitting ? 'Transmitting Alert...' : 'Submit Urgent Report'}</button>
            </form>
          </div>
        )}

        {/* VIEW 5: TRANSACTION RESOLUTION */}
        {view === 'success' && <SuccessView onReturn={resetToMenu} />}
      </main>

      <footer className="w-full max-w-xl text-center space-y-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <div className="flex items-start gap-2.5 text-left bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/50">
          <Info size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-normal">All public reports remain anonymized unless custom tracking information notifications are checked manually.</p>
        </div>
      </footer>
    </div>
  );
}