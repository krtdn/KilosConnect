import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessViewProps {
  onReturn: () => void;
}

export default function SuccessView({ onReturn }: SuccessViewProps) {
  // Generate mock reference ticket tracking metrics dynamically
  const generatedId = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="text-center p-8 bg-[#1C2541]/40 border border-slate-800 rounded-2xl shadow-xl max-w-md mx-auto space-y-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
        <CheckCircle2 size={32} />
      </div>
      <h2 className="text-xl font-bold text-white">Report Filed Successfully</h2>
      <p className="text-xs text-slate-400 leading-relaxed">
        Our operations custodian team has been systematically updated. Thank you for making our facility clean, running, and reliable.
      </p>
      <div className="bg-[#0B132B] border border-slate-800 py-2.5 px-4 rounded-lg text-xs text-slate-300 font-mono select-all">
        Ticket ID: {generatedId}
      </div>
      <button 
        onClick={onReturn}
        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition mt-2"
      >
        Return to Reporting Center
      </button>
    </div>
  );
}