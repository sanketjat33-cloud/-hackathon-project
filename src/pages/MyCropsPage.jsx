import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatField from '../assets/wheat-field.png';
import { AIButton } from '../components/AIButton';
import { useLanguage } from '../hooks/useLanguage';
import {
  Sprout,
  Plus,
  ChevronRight,
  Bell,
  Menu,
  X,
  Mic
} from 'lucide-react';

/**
 * MyCropsPage component for AGROVA Farmer Platform.
 * Clean 2-column layout matching reference screenshot:
 * 1. Navbar with AGROVA branding, 7 exact tabs (My Crops active underline), notification bell, Rajesh avatar.
 * 2. Heading "My Crops" with short dark-green underline & "Your selected crops" subtitle.
 * 3. 2-column Crop Grid: Wheat Crop card (with image, Cereal badge, View details button) & Add New Crop dashed card.
 * 4. Footer with copyright notice.
 * 5. Floating mint-green microphone AI assistant button.
 */
export function MyCropsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('myCrops');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'myCrops', label: t.nav.myCrops },
    { key: 'cropRoadmap', label: t.nav.cropRoadmap },
    { key: 'sellCrop', label: t.nav.sellCrop },
    { key: 'bids', label: t.nav.bids },
    { key: 'market', label: t.nav.market },
    { key: 'governmentSchemes', label: t.nav.governmentSchemes },
  ];

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'home') {
      navigate('/dashboard');
    } else if (tabName === 'myCrops') {
      navigate('/my-crops');
    } else if (tabName === 'Government Schemes') {
      navigate('/government-schemes');
    } else if (tabName === 'Market') {
      navigate('/market');
    } else if (tabName === 'Bids') {
      navigate('/bids');
    } else if (tabName === 'Crop Roadmap') {
      navigate('/crop-roadmap');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-40 shadow-2xs">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
          
          {/* Left — AGROVA Leaf Logo & Wordmark */}
          <div 
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#173f31] text-white flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden shadow-xs">
              <img
                src={agrovaLogo}
                alt="Agrova logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-extrabold tracking-wider text-[#173f31] uppercase leading-none">
              AGROVA
            </span>
          </div>

          {/* Center — Navigation Items (7 exact items in exact order) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 h-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item.key)}
                  className={`h-full inline-flex items-center px-1 text-xs xl:text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#173f31] text-[#173f31] font-bold'
                      : 'border-transparent text-gray-600 hover:text-[#173f31]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right — Notification Bell, Vertical Divider & Rajesh Profile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
              >
                <Bell size={20} />
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h4 className="text-xs font-bold text-[#173f31]">Notifications (2)</h4>
                    <button onClick={() => setIsNotifOpen(false)} className="text-[11px] text-gray-400 hover:text-gray-600">Close</button>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-medium">
                    🌾 Wheat field advisory updated
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* User Section (Rajesh) */}
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-[#173f31]">
                Rajesh
              </span>
              <div className="w-9 h-9 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-emerald-100/80">
                <span>RJ</span>
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 p-4 shadow-lg z-50 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    handleNavClick(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#173f31] text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Heading Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {t.dashboard.myCrops || t.dashboard.activeCrops}
          </h1>
          <div className="w-12 h-1 bg-[#173f31] rounded-full"></div>
          <p className="text-sm font-medium text-gray-600 pt-1">
            {t.dashboard.selectedCrops || t.dashboard.activeCrops}
          </p>
        </div>

        {/* 3. TWO-COLUMN CROP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          
          {/* LEFT CARD: WHEAT CROP CARD */}
          <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
            
            {/* Top Image Portion with Overlay Badge */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={wheatField}
                alt="Golden wheat field at sunset"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Bottom-left overlay badge: Cereal with leaf icon */}
              <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                <Sprout size={14} className="text-emerald-400" />
                <span>Cereal</span>
              </div>
            </div>

            {/* Card Content & Action Button */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#173f31]">
                  Wheat
                </h3>
              </div>

              {/* Bottom Light-Gray Button Container */}
              <button
                type="button"
                onClick={() => navigate('/my-crops/wheat')}
                className="w-full py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition flex items-center justify-between cursor-pointer group-hover:bg-emerald-50 group-hover:text-[#173f31]"
              >
                <span>{t.dashboard.viewDetails || t.dashboard.viewAll}</span>
                <ChevronRight size={16} className="text-gray-500 group-hover:text-[#173f31] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* RIGHT CARD: ADD NEW CROP CARD */}
          <div 
            onClick={() => navigate('/select-crop')}
            className="bg-white rounded-3xl border-2 border-dashed border-gray-300 hover:border-emerald-600 hover:bg-emerald-50/20 transition p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer min-h-[320px] sm:min-h-[340px] group shadow-2xs"
          >
            {/* Plus Icon inside Light-Gray Rounded Square */}
            <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-emerald-100 group-hover:text-[#173f31] text-gray-500 flex items-center justify-center transition">
              <Plus size={28} />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#173f31]">
                {t.dashboard.newCrop}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Track another field or<br />plantation
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* ==================== 4. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agriculture Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating AI Assistant Button (Reusing exact Home/Dashboard AIButton component) */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

      {/* Add New Crop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#173f31]">Add New Crop</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Crop Type</label>
                <select className="w-full p-2.5 border border-gray-200 rounded-xl">
                  <option>Paddy / Rice</option>
                  <option>Mustard</option>
                  <option>Cotton</option>
                  <option>Sugarcane</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Field Name / Area</label>
                <input type="text" placeholder="e.g. Field B (4.5 Acres)" className="w-full p-2.5 border border-gray-200 rounded-xl" />
              </div>
              <button
                onClick={() => {
                  alert('New crop added to your tracking list!');
                  setIsAddModalOpen(false);
                }}
                className="w-full py-3 bg-[#173f31] text-white font-bold rounded-xl cursor-pointer mt-2"
              >
                Save & Add Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Crop Details Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#173f31]">Wheat (PBW 343) Details</h3>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 text-xs text-gray-700 font-medium">
              <p><strong>Category:</strong> Cereal</p>
              <p><strong>Field:</strong> Field A (6.0 Acres)</p>
              <p><strong>Stage:</strong> Vegetative Growth (Day 42)</p>
              <p><strong>Health:</strong> Optimal (pH 6.8, Moisture 42%)</p>
              <p><strong>Est. Harvest:</strong> 15 Apr 2026</p>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-full py-2.5 bg-[#173f31] text-white font-bold rounded-xl cursor-pointer mt-3"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MyCropsPage;
