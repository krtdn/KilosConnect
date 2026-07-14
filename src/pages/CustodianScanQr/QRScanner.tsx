import React from 'react';
import { type Zone } from './MaintenanceWizard';

interface QRScannerProps {
  zone: Zone;
  onVerifySuccess: () => void;
  onCancel: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ zone, onVerifySuccess, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video relative flex flex-col justify-between p-6 text-white shadow-inner">
        <p className="text-center text-sm font-medium tracking-wide text-gray-300 opacity-90">
          Position QR code in frame for <span className="text-emerald-400 font-semibold">{zone.name}</span>
        </p>

        {/* Viewfinder Target graphic container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 border-2 border-dashed border-white/40 rounded-xl relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400 -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400 -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 -mb-0.5 -mr-0.5"></div>
          </div>
        </div>

        <div className="mt-auto">
          <button 
            onClick={onVerifySuccess}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow transition-colors"
          >
            Start Scan
          </button>
        </div>
      </div>
      
      <button onClick={onCancel} className="w-full text-center text-sm text-gray-500 font-medium hover:text-gray-700 py-1">
        Cancel Process
      </button>
    </div>
  );
};

export default QRScanner;