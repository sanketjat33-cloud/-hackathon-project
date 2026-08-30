import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import riceImg from '../assets/rice.jpg';
import maizeImg from '../assets/maize.jpg';
import mustardImg from '../assets/mustard.jpg';
import chickpeaImg from '../assets/chickpea.jpg';
import cottonImg from '../assets/cotton.jpg';
import tomatoImg from '../assets/tomato.jpg';
import { AIButton } from '../components/AIButton';
import {
  Search,
  Plus,
  ArrowRight,
  Bell,
  Menu,
  X,
  Check,
  Sprout
} from 'lucide-react';

/**
 * Mock Crop Catalog Data
 */
const initialCrops = [
  { id: 'wheat', name: 'Wheat', category: 'Cereals', image: wheatImg },
  { id: 'rice', name: 'Rice', category: 'Cereals', image: riceImg },
  { id: 'maize', name: 'Maize', category: 'Cereals', image: maizeImg },
  { id: 'mustard', name: 'Mustard', category: 'Cash Crops', image: mustardImg },
  { id: 'chickpea', name: 'Chickpea', category: 'Pulses', image: chickpeaImg },
  { id: 'cotton', name: 'Cotton', category: 'Cash Crops', image: cottonImg },
  { id: 'tomato', name: 'Tomato', category: 'Vegetables', image: tomatoImg },
];

const categories = [
  'All',
  'Cereals',
  'Pulses',
  'Vegetables',
  'Fruits',
  'Cash Crops'
];

/**
 * SelectCropPage component for AGROVA platform.
 * Allows farmers to search, filter, and select a crop to track.
 */
export function SelectCropPage() {
  const navigate = useNavigate();
  
  // State
  const [activeTab, setActiveTab] = useState('My Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Filter crops based on category and search query
  const filteredCrops = initialCrops.filter((crop) => {
    const matchesCategory =
      selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      navigate('/dashboard');
    } else if (tabName === 'My Crops') {
      navigate('/my-crops');
    }
  };

  const handleContinue = () => {
    if (!selectedCrop) return;
    navigate(`/selected-crop/${selectedCrop.id}`, { state: { selectedCrop } });
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

          {/* Center — Navigation Links (7 exact items) */}
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
                    🌾 Ready to add new crop
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* Main Heading Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            Select Your Crop
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600 max-w-2xl leading-relaxed">
            Choose the crop you want to manage. Accurate selection ensures precise agronomic recommendations tailored to your field conditions.
          </p>
        </div>

        {/* 3. SEARCH + CATEGORY FILTER CARD */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
          
          {/* Search Input Box */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a crop by name or variety..."
              className="w-full pl-11 pr-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#173f31] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31] transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#173f31] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-[#173f31]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* 4. CROP SELECTION GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          
          {filteredCrops.map((crop) => {
            const isSelected = selectedCrop?.id === crop.id;
            return (
              <div
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className={`bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition shadow-2xs hover:shadow-md flex flex-col justify-between group relative ${
                  isSelected
                    ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-gray-200/90 hover:border-emerald-500'
                }`}
              >
                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-[#173f31] text-white p-1 rounded-full z-10 shadow-xs">
                    <Check size={14} />
                  </div>
                )}

                {/* Top Image Portion */}
                <div className="h-36 sm:h-40 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Crop Name */}
                <div className="p-3 text-center bg-white">
                  <span className="text-sm font-extrabold text-[#173f31]">
                    {crop.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* 5. OTHER CROP CARD */}
          <div
            onClick={() =>
              setSelectedCrop({
                id: 'other',
                name: 'Other Crop',
                category: 'Custom'
              })
            }
            className={`bg-[#f8faf9] rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer min-h-[190px] transition shadow-2xs group ${
              selectedCrop?.id === 'other'
                ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-md'
                : 'border-gray-300 hover:border-emerald-600 hover:bg-emerald-50/20'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-emerald-100 text-gray-500 group-hover:text-[#173f31] flex items-center justify-center mb-2 transition">
              <Plus size={22} />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#173f31]">
              Other Crop...
            </span>
          </div>

        </div>

        {/* 6. IN-FLOW SELECTED-CROP PANEL (Centered directly under crop grid) */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-2.5 sm:p-3 shadow-sm flex items-center justify-between gap-4 w-full max-w-xs sm:max-w-sm">
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                SELECTED CROP
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#173f31] truncate max-w-[120px] sm:max-w-[150px]">
                {selectedCrop ? selectedCrop.name : 'None selected'}
              </span>
            </div>

            <button
              type="button"
              disabled={!selectedCrop}
              onClick={handleContinue}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedCrop
                  ? 'bg-[#173f31] hover:bg-[#113126] text-white shadow-xs cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </main>

      {/* ==================== 7. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agriculture Systems. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 8. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

    </div>
  );
}

export default SelectCropPage;
