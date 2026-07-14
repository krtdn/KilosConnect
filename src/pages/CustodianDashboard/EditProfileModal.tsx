import React, { useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileData;
  onSave: (updatedData: ProfileData) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [tempData, setTempData] = useState<ProfileData>({ ...initialData });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tempData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-default"
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col text-slate-800 animate-slide-up">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
            <p className="text-xs text-emerald-600 font-bold">Manage your portal identity</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Avatar Area */}
          <div className="flex items-center space-x-4 pb-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xl flex items-center justify-center border-2 border-emerald-200">
              {tempData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-800">Profile Picture</span>
              <span className="text-xs text-gray-400 block mt-0.5">Synced with HR directory</span>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={tempData.name}
              onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={tempData.email}
              onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Number</label>
            <input
              type="text"
              required
              value={tempData.phone}
              onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-slate-900"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/10 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;