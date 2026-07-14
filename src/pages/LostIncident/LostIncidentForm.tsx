import React, { useState } from 'react';
import Header from '../CustodianDashboard/Header';

const LostIncidentForm: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [locationFound, setLocationFound] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ itemName, category, locationFound, description });
    alert('Lost item logged successfully!');
  };

  return (
    <div className="w-full bg-gray-50 font-sans antialiased text-gray-800">
      {/* Renders global header hiding the sidebar menu icon trigger */}
      <Header showMenu={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-4">
        
        {/* Yellow Info Alert Card Banner */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex items-start space-x-3 shadow-sm">
          <div className="text-amber-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-900">Add Lost Item</h2>
            <p className="text-xs text-amber-700 mt-0.5">Document found belongings for member pickup</p>
          </div>
        </div>

        {/* Data Fields Collection Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Item Name */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Black Water Bottle, Wireless Earbuds"
              className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 transition-colors"
            />
          </div>

          {/* Category Dropdown Selection */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select category...</option>
                <option value="electronics">Electronics / Gadgets</option>
                <option value="apparel">Clothing & Accessories</option>
                <option value="bottles">Water Bottles & Shakers</option>
                <option value="gear">Training Gear / Grips</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location Found dropdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2 flex items-center">
              <svg className="w-3.5 h-3.5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location Found
            </label>
            <div className="relative">
              <select
                value={locationFound}
                onChange={(e) => setLocationFound(e.target.value)}
                className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select zone...</option>
                <option value="mezzanine">Mezzanine Area</option>
                <option value="powerlifting">Powerlifting Area</option>
                <option value="wod">WOD Area</option>
                <option value="crossfit">CrossFit Area</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Detailed Description Field */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description (color, brand, distinguishing features)..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-300 resize-none transition-colors"
            />
          </div>

          {/* Photo Box upload simulator */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <label className="block text-xs font-bold text-gray-900 mb-2">
              Photo of Item
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

          {/* Green Submit Action Bar Trigger Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Add to Lost & Found</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LostIncidentForm;