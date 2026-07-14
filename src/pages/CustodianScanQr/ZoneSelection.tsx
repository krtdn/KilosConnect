import React from 'react';
import { type Zone } from './MaintenanceWizard';

interface ZoneSelectionProps {
  onSelectZone: (zone: Zone) => void;
}

const ZoneSelection: React.FC<ZoneSelectionProps> = ({ onSelectZone }) => {
  const zones: Zone[] = [
    { id: '1', name: 'Mezzanine', code: 'QR-MEZ-011' },
    { id: '2', name: 'Powerlifting Area', code: 'QR-PWL-001' },
    { id: '3', name: 'WOD Area', code: 'QR-WOD-001' },
    { id: '4', name: 'Weightlifting Area', code: 'QR-WLT-001' },
    { id: '5', name: 'CrossFit Area', code: 'QR-CFT-001' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start space-x-3">
        <div className="text-emerald-700 mt-0.5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-emerald-900">Select Zone to Scan</h2>
          <p className="text-xs text-emerald-700 mt-0.5">Choose a zone to start maintenance verification</p>
        </div>
      </div>

      <div className="space-y-2">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onSelectZone(zone)}
            className="w-full bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:border-gray-200 transition-all text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{zone.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{zone.code}</p>
              </div>
            </div>
            <span className="text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZoneSelection;