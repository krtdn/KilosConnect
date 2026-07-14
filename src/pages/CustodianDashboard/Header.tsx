import React, { useEffect, useState } from 'react';
import EditProfileModal from './EditProfileModal';
import BranchInfoModal from './BranchInfoModal';
import HelpSupportModal from './HelpSupportModal';

interface HeaderProps {
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showMenu = true }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Global Profile State
  const [profileData, setProfileData] = useState({
    name: 'John Custodian',
    email: 'john.custodian@kilosconnect.com',
    phone: '+63 917 123 4567',
  });

  // Global Keybind Escape to close active UI modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setShowProfileModal(false);
        setShowBranchModal(false);
        setShowHelpModal(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock background layout window scrolling on structural overlays
  useEffect(() => {
    const shouldLock = mobileOpen || showProfileModal || showBranchModal || showHelpModal;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, showProfileModal, showBranchModal, showHelpModal]);

  const handleSaveProfile = (updatedData: typeof profileData) => {
    setProfileData(updatedData);
    setShowProfileModal(false);
    alert('Profile updated successfully!');
  };

  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Burger Menu and Brand Info Container */}
        <div className="flex items-center space-x-3">
          {showMenu && (
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              type="button"
              className="p-2 rounded-md hover:bg-emerald-700 focus:outline-none transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold tracking-tight">KilosConnect</h1>
            <p className="text-xs text-emerald-200">Custodian Portal</p>
          </div>
        </div>

        {/* Right Side: Empty for layout balancing or future profile icons */}
        <div className="w-10 h-10 hidden sm:block" />
      </div>

      {/* Slide-out Mobile Menu Drawer (Now anchoring from Left) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <button
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-default"
          />

          {/* Left-Aligned Sidebar Drawer Container */}
          <div className="relative w-[300px] max-w-[85%] h-full bg-white text-slate-800 flex flex-col shadow-2xl animate-slide-right">
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <span className="text-xl font-bold text-slate-900">Account</span>
              <button 
                onClick={() => setMobileOpen(false)}
                className="text-gray-500 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-5 pt-4">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <span className="block text-xs font-semibold text-emerald-600">Logged in as</span>
                <span className="block text-base font-bold text-emerald-950 mt-0.5">{profileData.name}</span>
              </div>
            </div>

            <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
              {/* Profile Edit Action */}
              <button
                type="button"
                onClick={() => {
                  setShowProfileModal(true);
                  setMobileOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors border border-transparent cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Edit Profile</span>
              </button>

              {/* Branch Directory Action */}
              <button
                type="button"
                onClick={() => {
                  setShowBranchModal(true);
                  setMobileOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors border border-transparent cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Branch Information</span>
              </button>

              {/* Help Line Desk Action */}
              <button
                type="button"
                onClick={() => {
                  setShowHelpModal(true);
                  setMobileOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors border border-transparent cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Help & Support</span>
              </button>

              <button
                type="button"
                onClick={() => alert("Logging out...")}
                className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50 transition-colors border border-transparent mt-8"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Modular Modals */}
      <EditProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        initialData={profileData}
        onSave={handleSaveProfile}
      />

      <BranchInfoModal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
      />

      <HelpSupportModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </header>
  );
};

export default Header;