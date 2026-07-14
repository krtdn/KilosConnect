import React from 'react';
import { type Zone } from './MaintenanceWizard';

interface PhotoEvidenceProps {
  zone: Zone;
  onCaptureSuccess: () => void;
}

const PhotoEvidence: React.FC<PhotoEvidenceProps> = ({ zone, onCaptureSuccess }) => {
  return (
    <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
      <div>
        <h2 className="text-md font-bold text-gray-900">Take Photo Evidence</h2>
        <p className="text-xs text-gray-400 mt-0.5">Capture live photo of completed area ({zone.name})</p>
      </div>

      {/* Frame UI Component representing live device view capture area */}
      <div 
        onClick={onCaptureSuccess}
        className="bg-gray-950 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer group border border-transparent hover:border-emerald-500 transition-all relative overflow-hidden"
      >
        <div className="p-4 rounded-full bg-white/5 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:scale-105 shadow-md">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-[11px] text-gray-500 mt-2 tracking-wide font-medium group-hover:text-emerald-400 transition-colors">
          Click window frame to simulate capturing media frame
        </p>
      </div>
    </div>
  );
};

export default PhotoEvidence;