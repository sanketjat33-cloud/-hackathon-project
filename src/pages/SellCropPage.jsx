import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import mustardImg from '../assets/mustard.jpg';
import maizeImg from '../assets/maize.jpg';
import { AIButton } from '../components/AIButton';
import {
  Check,
  Camera,
  Upload,
  Trash2,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Bell,
  Menu,
  X,
  Sparkles,
  Award
} from 'lucide-react';

const cropOptions = [
  { id: 'Wheat', name: 'Wheat', image: wheatImg },
  { id: 'Mustard', name: 'Mustard', image: mustardImg },
  { id: 'Maize', name: 'Maize', image: maizeImg }
];

const qualityOptions = [
  { id: 'Premium', label: 'Premium', badge: 'Top Tier' },
  { id: 'Good', label: 'Good', badge: 'Standard' },
  { id: 'Average', label: 'Average', badge: 'Fair' },
  { id: 'Needs Checking', label: 'Needs Checking', badge: 'Unassessed' }
];

/**
 * SellCropPage component for AGROVA Platform.
 * Two-column layout with comprehensive listing form on left and dynamic sticky preview on right.
 */
export function SellCropPage() {
  const navigate = useNavigate();

  // Navigation State
  const [activeTab, setActiveTab] = useState('Sell Crop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Form State
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [quantity, setQuantity] = useState('50');
  const [unit, setUnit] = useState('Quintal');
  const [farmingType, setFarmingType] = useState('Conventional');
  const [quality, setQuality] = useState('Good');
  const [price, setPrice] = useState('2,450');
  const [isLabTested, setIsLabTested] = useState(false);
  const [photos, setPhotos] = useState([wheatImg, mustardImg, maizeImg]);

  const currentCropImage = cropOptions.find((c) => c.id === selectedCrop)?.image || wheatImg;

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      navigate('/dashboard');
    } else if (tabName === 'My Crops') {
      navigate('/my-crops');
    } else if (tabName === 'Government Schemes') {
      navigate('/government-schemes');
    } else if (tabName === 'Market') {
      navigate('/market');
    } else if (tabName === 'Sell Crop') {
      navigate('/sell-crop');
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, currentCropImage]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Listing Created Successfully for ${quantity} ${unit}s of ${selectedCrop} at ₹${price}/${unit}!`);
    navigate('/my-crops');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-40 shadow-2xs">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
          
          {/* Left — AGROVA Logo & Wordmark */}
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
                    🛒 3 Wholesale buyers active in Sangrur Mandi
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* PAGE TITLE */}
        <section className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            Sell Your Crop
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            Provide details to list your crop on the marketplace and start receiving bids.
          </p>
        </section>

        {/* TWO-COLUMN DESKTOP LAYOUT */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM SECTIONS (7-8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. WHICH CROP DO YOU WANT TO SELL? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                1. Which crop do you want to sell?
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {cropOptions.map((crop) => {
                  const isSelected = selectedCrop === crop.name;
                  return (
                    <div
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop.name)}
                      className={`bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition p-2.5 flex flex-col items-center justify-between text-center relative group ${
                        isSelected
                          ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-emerald-500'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#173f31] text-white p-0.5 rounded-full z-10">
                          <Check size={12} />
                        </div>
                      )}

                      <div className="h-20 w-full rounded-xl overflow-hidden bg-gray-100 mb-2">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <span className="text-xs font-extrabold text-[#173f31]">
                        {crop.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. HOW MUCH DO YOU WANT TO SELL? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                2. How much do you want to sell?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block">QUANTITY</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-sm font-extrabold text-[#173f31] focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31]"
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block">UNIT</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-sm font-extrabold text-[#173f31] focus:outline-none cursor-pointer"
                  >
                    <option value="Quintal">Quintal</option>
                    <option value="Ton">Ton</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. WHAT TYPE OF CROP ARE YOU SELLING? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                3. What type of crop are you selling?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organic */}
                <div
                  onClick={() => setFarmingType('Organic')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-1 relative ${
                    farmingType === 'Organic'
                      ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {farmingType === 'Organic' && (
                    <div className="absolute top-3 right-3 bg-[#173f31] text-white p-0.5 rounded-full">
                      <Check size={12} />
                    </div>
                  )}
                  <h3 className="text-sm font-extrabold text-[#173f31]">Organic</h3>
                  <p className="text-xs text-gray-500 font-medium">No synthetic fertilizers</p>
                </div>

                {/* Conventional */}
                <div
                  onClick={() => setFarmingType('Conventional')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-1 relative ${
                    farmingType === 'Conventional'
                      ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {farmingType === 'Conventional' && (
                    <div className="absolute top-3 right-3 bg-[#173f31] text-white p-0.5 rounded-full">
                      <Check size={12} />
                    </div>
                  )}
                  <h3 className="text-sm font-extrabold text-[#173f31]">Conventional</h3>
                  <p className="text-xs text-gray-500 font-medium">Standard farming practices</p>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-medium italic">
                * Organic status may require verification/testing.
              </p>
            </div>

            {/* 4. WHAT IS THE QUALITY OF YOUR CROP? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                4. What is the quality of your crop?
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {qualityOptions.map((q) => {
                  const isSelected = quality === q.label;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setQuality(q.label)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-center space-y-1 relative ${
                        isSelected
                          ? 'border-[#173f31] bg-emerald-50/40 ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#173f31] text-white p-0.5 rounded-full">
                          <Check size={10} />
                        </div>
                      )}
                      <span className="text-xs font-extrabold text-[#173f31] block">{q.label}</span>
                      <span className="text-[10px] text-gray-400 font-semibold block">{q.badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. ADD CROP PHOTOS */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                5. Add Crop Photos
              </h2>

              {/* Photos Thumbnails */}
              <div className="flex flex-wrap items-center gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 group">
                    <img src={photo} alt={`Crop photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera size={16} />
                  <span>Take Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload size={16} />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            {/* 6. TESTING PROMOTIONAL CARD */}
            <div className="bg-emerald-50/90 rounded-3xl border border-emerald-200/90 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#173f31]">
                <Sparkles size={18} className="text-emerald-700" />
                <h3 className="text-base font-extrabold">
                  Want to test your crop?
                </h3>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                Certified crops often receive higher bids from wholesalers. Agrova can arrange a lab test.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsLabTested(!isLabTested);
                  alert(isLabTested ? "Lab test canceled." : "Lab test request added to your listing!");
                }}
                className="px-4 py-2.5 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isLabTested ? 'Lab Test Requested ✓' : 'Send for Testing →'}</span>
              </button>
            </div>

            {/* 7. YOUR EXPECTED PRICE */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#173f31]">
                  7. Your Expected Price
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/market')}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Market Price</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 block">PRICE PER QUINTAL (₹)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-extrabold text-[#173f31]">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-sm font-extrabold text-[#173f31] focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31]"
                  />
                </div>
              </div>
            </div>

            {/* 8. PICKUP LOCATION */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                8. Pickup Location
              </h2>

              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-gray-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-[#173f31]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#173f31]">Churu, Rajasthan</h4>
                    <span className="text-xs text-gray-500 font-medium">Primary Farm Location</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Change pickup location...")}
                  className="text-xs font-bold text-[#173f31] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* PRIMARY SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#173f31] hover:bg-[#113126] text-white font-extrabold text-base transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Put Crop Up for Bidding</span>
              <ArrowRight size={18} />
            </button>

          </div>

          {/* RIGHT COLUMN: YOUR LISTING PREVIEW (4-5 cols STICKY) */}
          <div className="lg:col-span-5 space-y-3 sticky top-24">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block">
              YOUR LISTING PREVIEW
            </span>

            <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-2xs p-5 space-y-4">
              
              {/* Hero Image & Badges */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={currentCropImage}
                  alt={selectedCrop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#173f31] text-white text-[10px] font-extrabold uppercase">
                    Listing
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase">
                    New
                  </span>
                </div>
              </div>

              {/* Title & Location */}
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-2xl font-extrabold text-[#173f31]">
                  {selectedCrop}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 font-medium mt-0.5">
                  <MapPin size={13} className="text-emerald-700" />
                  <span>Churu, RJ</span>
                </div>
              </div>

              {/* Key Specs */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Expected Price</span>
                  <span className="font-extrabold text-gray-900">₹{price} / {unit}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Quantity</span>
                  <span className="font-extrabold text-gray-900">{quantity} {unit}s</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Farming Type</span>
                  <span className="font-extrabold text-gray-900">{farmingType}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Quality Grade</span>
                  <span className="font-extrabold text-[#173f31]">{quality}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Lab Certified</span>
                  <span className={`font-extrabold ${isLabTested ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {isLabTested ? 'Yes (Verified)' : 'No'}
                  </span>
                </div>
              </div>

              {/* Seller Profile Summary */}
              <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-xs">
                    RJ
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#173f31]">Rajesh</h4>
                    <span className="text-[10px] text-gray-500 font-medium">Member since 2023</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                  <Star size={13} className="fill-amber-500 text-amber-500" />
                  <span>4.8</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-medium italic text-center">
                * This is exactly how wholesalers will see your listing.
              </p>

            </div>
          </div>

        </form>

      </main>

      {/* ==================== 3. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <a href="#about" onClick={(e) => { e.preventDefault(); alert("Agrova Agritech"); }} className="hover:text-[#173f31] font-bold text-[#173f31]">Agrova</a>
            <span>•</span>
            <a href="#platform" onClick={(e) => { e.preventDefault(); alert("Platform"); }} className="hover:text-[#173f31]">Platform</a>
            <span>•</span>
            <a href="#support" onClick={(e) => { e.preventDefault(); alert("Support"); }} className="hover:text-[#173f31]">Support</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms"); }} className="hover:text-[#173f31]">Terms</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <span>© 2024 Agrova Agritech. All rights reserved.</span>
            <span className="font-semibold text-gray-700">India (English)</span>
          </div>
        </div>
      </footer>

      {/* ==================== 4. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

    </div>
  );
}

export default SellCropPage;
