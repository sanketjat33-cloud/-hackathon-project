import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatField from '../assets/wheat-field.png';
import { AIButton } from '../components/AIButton';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Bell,
  Menu,
  X
} from 'lucide-react';

/**
 * CropDetailsPage component for AGROVA Farmer Platform.
 * Matches original UI design reference:
 * 1. Header/Navbar with AGROVA brand, 7 nav tabs ("My Crops" active underline), bell, Rajesh profile avatar.
 * 2. "← Back to My Crops" navigation link.
 * 3. Main Crop Card with wheat image, "Wheat" title overlay near bottom-left.
 * 4. 4-column Information Section (Crop Added, Crop Type, Status ● Active, Fertilizer Added NPK Applied 12 days ago).
 * 5. Action Buttons (Dark green "Change Crop" button with Pencil icon & Red outlined "Remove Crop" button with Trash icon).
 * 6. Footer & Floating AI Assistant Button.
 */
export function CropDetailsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My Crops');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      navigate('/dashboard');
    } else if (tabName === 'My Crops') {
      navigate('/my-crops');
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

          {/* Center — Navigation Links (7 exact items in exact order) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 h-full">
            {[
              'Home',
              'My Crops',
              'Crop Roadmap',
              'Sell Crop',
              'Bids',
              'Market',
              'Government Schemes'
            ].map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`h-full inline-flex items-center px-1 text-xs xl:text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#173f31] text-[#173f31] font-bold'
                      : 'border-transparent text-gray-600 hover:text-[#173f31]'
                  }`}
                >
                  {item}
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
            {[
              'Home',
              'My Crops',
              'Crop Roadmap',
              'Sell Crop',
              'Bids',
              'Market',
              'Government Schemes'
            ].map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    handleNavClick(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#173f31] text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Back to My Crops Link */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/my-crops')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#173f31] transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to My Crops</span>
          </button>
        </div>

        {/* Main Centered Crop Detail Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs overflow-hidden p-6 sm:p-8 space-y-6">
          
          {/* Top Wheat Field Image with Title Overlay */}
          <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={wheatField}
              alt="Golden wheat field at sunset"
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* "Wheat" Title Overlay near bottom-left */}
            <div className="absolute bottom-4 left-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                Wheat
              </h1>
            </div>
          </div>

          {/* 4-Column Information Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: Crop Added */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Crop Added
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                27 Aug
              </span>
              <span className="text-xs font-medium text-gray-500 block">
                2026
              </span>
            </div>

            {/* Column 2: Crop Type */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Crop Type
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                Cereal
              </span>
            </div>

            {/* Column 3: Status */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Status
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-base font-extrabold text-emerald-800">
                  Active
                </span>
              </div>
            </div>

            {/* Column 4: Fertilizer Added */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Fertilizer Added
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                NPK (12:32:16)
              </span>
              <span className="text-xs font-semibold text-emerald-700 block">
                Applied 12 days ago
              </span>
            </div>

          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => alert("Change Crop flow initiated.")}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Pencil size={18} />
              <span>Change Crop</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to remove this crop?")) {
                  navigate('/my-crops');
                }
              }}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 text-red-600 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 size={18} />
              <span>Remove Crop</span>
            </button>
          </div>

        </div>

      </main>

      {/* ==================== 3. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Farm Management. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 4. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

    </div>
  );
}

export default CropDetailsPage;
