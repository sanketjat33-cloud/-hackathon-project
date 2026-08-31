import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
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

/**
 * SelectCropPage component for AGROVA platform.
 * Allows farmers to search, filter, and select a crop to track.
 */
export function SelectCropPage() {
  const navigate = useNavigate();
  const tx = usePageText('selectCrop');
  
  // English categories (for crop data matching)
  const englishCategories = ['All', 'Cereals', 'Pulses', 'Vegetables', 'Fruits', 'Cash Crops'];
  // Get translated categories (for UI display)
  const translatedCategories = tx('categories', englishCategories);
  
  // State
  const [activeTab, setActiveTab] = useState('My Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  // Filter crops based on category and search query
  const filteredCrops = initialCrops.filter((crop) => {
    const selectedEnglishCategory = englishCategories[selectedCategoryIdx];
    const matchesCategory =
      selectedEnglishCategory === 'All' || crop.category === selectedEnglishCategory;
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // State for UI
  const [selectedCrop, setSelectedCrop] = useState(null);
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

  const handleContinue = () => {
    if (!selectedCrop) return;
    navigate(`/selected-crop/${selectedCrop.id}`, { state: { selectedCrop } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="myCrops" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* Main Heading Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {tx('title')}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600 max-w-2xl leading-relaxed">
            {tx('description')}
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
              placeholder={tx('search')}
              className="w-full pl-11 pr-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#173f31] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31] transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {translatedCategories.map((cat, idx) => {
              const isSelected = selectedCategoryIdx === idx;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategoryIdx(idx)}
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
              {tx('other')}
            </span>
          </div>

        </div>

        {/* 6. IN-FLOW SELECTED-CROP PANEL (Centered directly under crop grid) */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-2.5 sm:p-3 shadow-sm flex items-center justify-between gap-4 w-full max-w-xs sm:max-w-sm">
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                {tx('selected')}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#173f31] truncate max-w-[120px] sm:max-w-[150px]">
                {selectedCrop ? selectedCrop.name : tx('none')}
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
              <span>{tx('continue')}</span>
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
