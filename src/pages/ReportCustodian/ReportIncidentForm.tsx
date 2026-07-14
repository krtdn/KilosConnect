import React, { useState } from 'react';
import Header from '../CustodianDashboard/Header'; // Imported the global dashboard header[cite: 2]

const ReportIncidentForm: React.FC = () => {
  const [assetName, setAssetName] = useState('');
  const [zoneLocation, setZoneLocation] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical' | null>(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ assetName, zoneLocation, incidentType, severity, description });
    alert('Incident report submitted successfully!');
  };

  return (
    <div className="w-full bg-gray-50 font-sans antialiased text-gray-800">
      {/* Renders global header hiding the sidebar menu icon trigger */}
      <Header showMenu={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-4">
        
        {/* Banner Alert Card */}
        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4 flex items-start space-x-3 shadow-sm">
          <div className="text-red-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-red-900">Report Incident</h2>
            <p className="text-xs text-red-700 mt-0.5">Document issues immediately for safety</p>
          </div>
        </div>

        {/* Form Elements Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Asset/Equipment Name */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Asset/Equipment Name
            </label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="e.g., Squat Rack A, Barbell #45"
              className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 transition-colors"
            />
          </div>

          {/* Zone Location */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2 flex items-center">
              <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Zone Location
            </label>
            <div className="relative">
              <select
                value={zoneLocation}
                onChange={(e) => setZoneLocation(e.target.value)}
                className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select zone...</option>
                <option value="mezzanine">Mezzanine Area</option>
                <option value="powerlifting">Powerlifting Area</option>
                <option value="wod">WOD Area</option>
                <option value="crossfit">CrossFit Area</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Incident Type */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Incident Type
            </label>
            <div className="relative">
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select type...</option>
                <option value="equipment-damage">Equipment Damage</option>
                <option value="facility-issue">Facility / Structural Issue</option>
                <option value="safety-hazard">Safety Hazard</option>
                <option value="cleanliness">Cleanliness Deficit</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Severity Levels Layout */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Severity Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['Low', 'Medium', 'High', 'Critical'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSeverity(level)}
                  className={`py-3.5 rounded-xl text-sm font-medium border text-center transition-all ${
                    severity === level
                      ? 'border-red-600 bg-red-50/50 text-red-700 font-bold shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50/60'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 resize-none transition-colors"
            />
          </div>

          {/* Photo Evidence Optional Box */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Photo Evidence (Optional)
            </label>
            <div className="bg-gray-50/80 rounded-xl py-8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/70 transition-colors border border-dashed border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-500">Tap to take photo</span>
            </div>
          </div>

          {/* Red Submit Report Action Trigger Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Submit Report</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReportIncidentForm;