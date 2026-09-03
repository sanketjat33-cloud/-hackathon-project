import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import mustardImg from '../assets/mustard.jpg';
import maizeImg from '../assets/maize.jpg';
import { AIButton } from '../components/AIButton';
import api from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
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
  const tx = usePageText('sell');
  const { t } = useLanguage();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [pickupLocation, setPickupLocation] = useState('Churu, Rajasthan');
  const [notice, setNotice] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id;
    if (!userId) {
      navigate('/auth');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await api.createListing(userId, {
        crop: selectedCrop, quantity, unit, quality, price, farmingType,
        photos, pickupLocation,
      });
      navigate('/my-crops');
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="sellCrop" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* PAGE TITLE */}
        <section className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {tx('title')}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {tx('description')}
          </p>
        </section>

        {/* TWO-COLUMN DESKTOP LAYOUT */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM SECTIONS (7-8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. WHICH CROP DO YOU WANT TO SELL? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                1. {tx('which')}
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
                2. {tx('quantity')}?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block">{tx('quantity')}</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-sm font-extrabold text-[#173f31] focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31]"
                    placeholder={tx('quantityPlaceholder')}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block">{tx('unit')}</label>
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
                3. {tx('farming')}?
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
                  <h3 className="text-sm font-extrabold text-[#173f31]">{tx('organic')}</h3>
                  <p className="text-xs text-gray-500 font-medium">{tx('organicText')}</p>
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
                  <h3 className="text-sm font-extrabold text-[#173f31]">{tx('conventional')}</h3>
                  <p className="text-xs text-gray-500 font-medium">{tx('conventionalText')}</p>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-medium italic">
                * Organic status may require verification/testing.
              </p>
            </div>

            {/* 4. WHAT IS THE QUALITY OF YOUR CROP? */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#173f31]">
                4. {tx('quality')}?
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
                  <span>{tx('takePhoto')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload size={16} />
                  <span>{tx('upload')}</span>
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
                  setNotice(isLabTested ? 'Lab test request canceled.' : 'Lab test request added to your listing.');
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
                  7. {tx('expected')}
                </h2>
                <button
                  type="button"
                  onClick={() => navigate('/market')}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{tx('marketPrice')}</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 block">{tx('price')}</label>
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
                    <h4 className="text-sm font-extrabold text-[#173f31]">{pickupLocation}</h4>
                    <span className="text-xs text-gray-500 font-medium">{tx('location')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPickupLocation((current) => current === 'Churu, Rajasthan' ? 'Sangrur, Punjab' : 'Churu, Rajasthan')}
                  className="text-xs font-bold text-[#173f31] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* PRIMARY SUBMIT BUTTON */}
            {(submitError || notice) && <p className={`text-sm font-medium ${submitError ? 'text-red-600' : 'text-emerald-700'}`}>{submitError || notice}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#173f31] hover:bg-[#113126] text-white font-extrabold text-base transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{tx('submit')}</span>
              <ArrowRight size={18} />
            </button>

          </div>

          {/* RIGHT COLUMN: YOUR LISTING PREVIEW (4-5 cols STICKY) */}
          <div className="lg:col-span-5 space-y-3 sticky top-24">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block">
              {tx('preview')}
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
                    {isSubmitting ? tx('saving') : tx('create')}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase">
                    {tx('new')}
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
                  <span className="text-gray-500 font-medium">{tx('expected')}</span>
                  <span className="font-extrabold text-gray-900">₹{price} / {unit}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Quantity</span>
                  <span className="font-extrabold text-gray-900">{quantity} {unit}s</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">{tx('farming')}</span>
                  <span className="font-extrabold text-gray-900">{farmingType}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">{tx('quality')}</span>
                  <span className="font-extrabold text-[#173f31]">{quality}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">{tx('lab')}</span>
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
                    <span className="text-[10px] text-gray-500 font-medium">{tx('member')}</span>
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
            <a href="#about" className="hover:text-[#173f31] font-bold text-[#173f31]">Agrova</a>
            <span>•</span>
            <a href="#platform" className="hover:text-[#173f31]">Platform</a>
            <span>•</span>
            <a href="#support" className="hover:text-[#173f31]">Support</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#173f31]">Terms</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <span>© 2024 Agrova Agritech. All rights reserved.</span>
            <span className="font-semibold text-gray-700">India (English)</span>
          </div>
        </div>
      </footer>

      {/* ==================== 4. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => navigate('/dashboard?ai=1')} />

    </div>
  );
}

export default SellCropPage;
