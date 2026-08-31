import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import { AIButton } from '../components/AIButton';
import {
  Search,
  MapPin,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowRight,
  Bell,
  Menu,
  X,
  ChevronDown,
  Store,
  Check
} from 'lucide-react';

/**
 * Market Data Structures
 */
const initialCropPrices = [
  {
    id: 'wheat',
    name: 'Wheat',
    price: '₹2,450',
    change: '↑ ₹80',
    percentage: '+3.4%',
    isUp: true
  },
  {
    id: 'mustard',
    name: 'Mustard',
    price: '₹5,850',
    change: '↑ ₹120',
    percentage: '+2.1%',
    isUp: true
  },
  {
    id: 'maize',
    name: 'Maize',
    price: '₹2,100',
    change: '↓ ₹50',
    percentage: '-2.3%',
    isUp: false
  },
  {
    id: 'rice',
    name: 'Rice',
    price: '₹3,200',
    change: '↑ ₹100',
    percentage: '+3.2%',
    isUp: true
  }
];

const compareMarketsList = [
  { name: 'Churu', price: '₹2,450', isHighest: false },
  { name: 'Sikar', price: '₹2,520', isHighest: true },
  { name: 'Jaipur', price: '₹2,480', isHighest: false }
];

const locationsList = [
  'Churu, Rajasthan',
  'Sikar, Rajasthan',
  'Jaipur, Rajasthan',
  'Sangrur, Punjab',
  'Karnal, Haryana'
];

const marketsList = [
  'Churu Mandi',
  'Sikar Grain Market',
  'Jaipur Apex Mandi',
  'Sangrur Main Market'
];

/**
 * MarketPage component for AGROVA platform.
 * Displays today's crop prices, interactive trend charts, market comparison, user crop rates, and sell CTA.
 */
export function MarketPage() {
  const navigate = useNavigate();
  const tx = usePageText('market');

  // State Management
  const [activeTab, setActiveTab] = useState('Market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('7 Days');
  const [selectedChartCrop, setSelectedChartCrop] = useState('Wheat');
  const [selectedLocation, setSelectedLocation] = useState('Churu, Rajasthan');
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('Churu Mandi');
  const [isMktOpen, setIsMktOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Filter crop prices based on search input
  const filteredPrices = initialCropPrices.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="market" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* PAGE HEADER */}
        <section className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {tx('title')}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {tx('description')}
          </p>
        </section>

        {/* 3. LOCATION / MARKET / SEARCH BAR */}
        <section className="bg-white rounded-3xl border border-gray-200/90 p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Location Selector (4 cols) */}
            <div className="md:col-span-4 relative">
              <button
                type="button"
                onClick={() => setIsLocOpen(!isLocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs font-bold text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin size={16} className="text-emerald-700 flex-shrink-0" />
                  <span className="truncate">{selectedLocation}</span>
                </div>
                <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
              </button>

              {isLocOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-1 overflow-hidden">
                  {locationsList.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setSelectedLocation(loc); setIsLocOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#173f31] flex items-center justify-between cursor-pointer"
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && <Check size={14} className="text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Market Selector (4 cols) */}
            <div className="md:col-span-4 relative">
              <button
                type="button"
                onClick={() => setIsMktOpen(!isMktOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs font-bold text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Building2 size={16} className="text-emerald-700 flex-shrink-0" />
                  <span className="truncate">{selectedMarket}</span>
                </div>
                <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
              </button>

              {isMktOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-1 overflow-hidden">
                  {marketsList.map((mkt) => (
                    <button
                      key={mkt}
                      onClick={() => { setSelectedMarket(mkt); setIsMktOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#173f31] flex items-center justify-between cursor-pointer"
                    >
                      <span>{mkt}</span>
                      {selectedMarket === mkt && <Check size={14} className="text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Crop Input (4 cols) */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={tx('search')}
                className="w-full pl-10 pr-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs font-semibold text-[#173f31] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31] transition"
              />
            </div>

          </div>
        </section>

        {/* 4. TODAY'S CROP PRICES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
              {tx('today')}
            </h2>
            <span className="text-[11px] font-extrabold text-gray-400 tracking-wider">
              {tx('perQtl')}
            </span>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPrices.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-2xs space-y-3 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#173f31]">
                    {crop.name}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      crop.isUp
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {crop.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span>{crop.percentage}</span>
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-2xl font-extrabold text-[#173f31] block">
                    {crop.price}
                  </span>
                  <span className={`text-xs font-bold block ${crop.isUp ? 'text-emerald-700' : 'text-red-600'}`}>
                    {crop.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. MARKET TREND & COMPARE MARKETS (2-COLUMN SECTION) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CARD: MARKET TREND (7-8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-5">
            
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <h3 className="text-lg font-extrabold text-[#173f31]">
                {tx('trend')}
              </h3>

              <div className="flex items-center gap-3">
                {/* Crop Dropdown Selector */}
                <select
                  value={selectedChartCrop}
                  onChange={(e) => setSelectedChartCrop(e.target.value)}
                  className="bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-[#173f31] px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Maize">Maize</option>
                  <option value="Rice">Rice</option>
                </select>

                {/* Time Filters */}
                <div className="flex items-center gap-1 bg-[#f8faf9] p-1 rounded-xl border border-gray-200">
                  {['7 Days', '30 Days', '3 Months'].map((time) => {
                    const isActive = selectedTimeFilter === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTimeFilter(time)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          isActive
                            ? 'bg-[#173f31] text-white shadow-2xs'
                            : 'text-gray-600 hover:text-[#173f31]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* High Precision SVG Chart Component */}
            <div className="w-full h-56 relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                {/* Area Fill */}
                <path
                  d="M 0,140 Q 80,130 160,95 T 320,60 T 500,20 L 500,160 L 0,160 Z"
                  fill="url(#chartGradient)"
                />

                {/* Main Trend Line */}
                <path
                  d="M 0,140 Q 80,130 160,95 T 320,60 T 500,20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* End Point Indicator Circle */}
                <circle cx="500" cy="20" r="5" fill="#173f31" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Chart Axis Labels */}
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 pt-2 border-t border-gray-100">
                <span>Day 1 (₹2,370)</span>
                <span>Day 3 (₹2,400)</span>
                <span>Day 5 (₹2,425)</span>
                <span>Today (₹2,450)</span>
              </div>
            </div>

            {/* Green Insight Panel Below Chart */}
            <div className="bg-emerald-50/90 rounded-2xl border border-emerald-200/90 p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                <TrendingUp size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-extrabold text-emerald-950">
                  Wheat prices are going up.
                </h4>
                <p className="text-xs text-emerald-800 font-medium">
                  The price has increased by ₹80 in the last 7 days.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT CARD: COMPARE MARKETS (4-5 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-5">
            
            <div className="border-b border-gray-100 pb-3 space-y-0.5">
              <h3 className="text-lg font-extrabold text-[#173f31]">
                {tx('compare')}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Wheat Prices
              </p>
            </div>

            {/* {tx('compare')} List */}
            <div className="space-y-3">
              {compareMarketsList.map((mkt) => (
                <div
                  key={mkt.name}
                  className="p-4 rounded-2xl bg-[#f8faf9] border border-gray-200/70 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Store size={16} className="text-emerald-700" />
                    <span className="text-sm font-extrabold text-[#173f31]">
                      {mkt.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-gray-900">
                      {mkt.price}
                    </span>
                    {mkt.isHighest && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                        {tx('highest')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </section>

        {/* 7. YOUR CROP PRICES */}
        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
            {tx('yourPrices')}
          </h2>

          <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-lg font-extrabold text-[#173f31] block">
                Wheat
              </span>
              <span className="text-sm font-bold text-gray-600 block">
                ₹2,450/quintal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <TrendingUp size={14} />
                <span>↑ 3.4%</span>
              </span>

              <button
                type="button"
                onClick={() => setSelectedChartCrop('Wheat')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#173f31] hover:text-emerald-700 transition cursor-pointer"
              >
                <span>{tx('viewTrend')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* 8. SELL CROP CTA BANNER */}
        <section className="bg-gradient-to-r from-[#173f31] to-[#113126] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-2xl font-extrabold text-white">
              {tx('sellQuestion')}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              {tx('sellDescription')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/sell-crop')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#173f31] text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer inline-flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>{tx('sell')}</span>
            <ArrowRight size={16} />
          </button>
        </section>

      </main>

      {/* ==================== 9. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy"); }} className="hover:text-[#173f31]">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service"); }} className="hover:text-[#173f31]">Terms of Service</a>
            <span>•</span>
            <a href="#support" onClick={(e) => { e.preventDefault(); alert("Support"); }} className="hover:text-[#173f31]">Support</a>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agritech. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 10. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

    </div>
  );
}

export default MarketPage;
