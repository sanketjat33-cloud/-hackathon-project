import React, { useState } from 'react';
import agrovaLogo from '../assets/agrova-logo.png';
import { AIButton } from '../components/AIButton';
import { languages } from '../data/languages';
import {
  Sprout,
  Sun,
  Store,
  TrendingUp,
  AlertTriangle,
  Droplets,
  CloudSun,
  Camera,
  Calendar,
  ChevronDown,
  Bell,
  User,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Check,
  Award,
  Layers
} from 'lucide-react';

/**
 * DashboardPage component for AGROVA Farmer Platform.
 * Built with AGROVA design system: #173f31 primary dark green, #f8faf9 background,
 * white cards, subtle gray borders, emerald accents, and responsive layout.
 */
export function DashboardPage() {
  // Selected Language State
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'hi';
  });
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('Overview');

  // Alert Dismiss State
  const [showAlert, setShowAlert] = useState(true);

  const currentLanguage = languages.find((lang) => lang.id === selectedLanguage);

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    localStorage.setItem('selectedLanguage', langId);
    setIsLangOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative pb-20">
      {/* 1. TOP NAVIGATION */}
      <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left — AGROVA Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-[50px] h-[50px] rounded-xl bg-[#173f31] text-white flex items-center justify-center p-1 flex-shrink-0 overflow-hidden shadow-xs">
              <img
                src={agrovaLogo}
                alt="Agrova logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[22px] sm:text-[24px] font-extrabold tracking-wider text-[#173f31] uppercase leading-tight">
                AGROVA
              </span>
              <span className="text-[11px] font-medium text-gray-500 leading-tight">
                Grow better. Sell smarter. Earn more.
              </span>
            </div>
          </div>

          {/* Center — Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl border border-gray-200/60">
            {['Overview', 'My Crops', 'Marketplace', 'Advisory'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-[#173f31] shadow-xs'
                    : 'text-gray-600 hover:text-[#173f31] hover:bg-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Right — Language Selector, Notifications & User Badge */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-100 transition cursor-pointer"
              >
                <span>🌐</span>
                <span>{currentLanguage?.native || 'हिन्दी'}</span>
                <ChevronDown
                  size={12}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isLangOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleLanguageSelect(lang.id)}
                      className={`w-full text-left px-3.5 py-2 text-xs transition flex items-center justify-between hover:bg-emerald-50/60 cursor-pointer ${
                        selectedLanguage === lang.id
                          ? 'text-[#173f31] font-semibold bg-emerald-50/80'
                          : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.native}</span>
                      {selectedLanguage === lang.id && (
                        <Check size={14} className="text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Farmer Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                RS
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#173f31]">Ram Singh</span>
                <span className="text-[10px] text-gray-500 font-medium">Sangrur, PB</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-7">
        {/* 2. GREETING / HEADER */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#173f31] tracking-tight">
                Namaste, Ram Singh! 🌾
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                Verified Farmer
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 font-medium">
              Here is your farm summary for Sangrur, Punjab • Kharif Season 2026
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f8faf9] px-4 py-2.5 rounded-xl border border-gray-200/60 text-xs text-gray-600 font-semibold self-start sm:self-auto">
            <MapPin size={16} className="text-emerald-600" />
            <span>Sangrur • 28 Aug 2026</span>
          </div>
        </section>

        {/* 3. HERO + SUMMARY CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Active Crops */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Active Crops
                </span>
                <h3 className="text-xl font-bold text-[#173f31] mt-1">
                  Wheat & Paddy
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Sprout size={22} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">12 Acres Cultivated</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                +15% Est. Yield
              </span>
            </div>
          </div>

          {/* Card 2: Today's Weather */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Weather Advisory
                </span>
                <h3 className="text-xl font-bold text-[#173f31] mt-1">
                  28°C • Partly Cloudy
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun size={22} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Humidity 65% • Rain 10%</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                Good Spraying Day
              </span>
            </div>
          </div>

          {/* Card 3: Live Mandi Price */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Live Mandi Rate (Wheat)
                </span>
                <h3 className="text-xl font-bold text-[#173f31] mt-1">
                  ₹2,275 <span className="text-xs font-normal text-gray-500">/ Qtl</span>
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <TrendingUp size={22} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-bold">▲ +₹45 Today</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                Peak Rate Week
              </span>
            </div>
          </div>

          {/* Card 4: Soil Health */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Soil Health Status
                </span>
                <h3 className="text-xl font-bold text-[#173f31] mt-1">
                  Optimal (pH 6.8)
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Layers size={22} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Moisture 42% • NPK Good</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                Fertilizer Due in 4 Days
              </span>
            </div>
          </div>
        </section>

        {/* 4. ACTION REQUIRED ALERT */}
        {showAlert && (
          <section className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5 sm:mt-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-amber-950">
                    Action Required: Pest Outbreak Alert for Wheat Crop
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-extrabold uppercase">
                    High Priority
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed font-medium">
                  High humidity detected in Sangrur block. Recommended spray of Neem Oil solution within 48 hours to protect early-stage leaves.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                View Spray Guide
              </button>
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </section>
        )}

        {/* 5. FARMING TOOLKIT */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#173f31] tracking-tight flex items-center gap-2">
              <span>Farming Toolkit</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                AI Powered
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Smart tools to manage your crops, soil, weather, and mandi rates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Tool 1 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Camera size={24} />
                </div>
                <h3 className="text-base font-bold text-[#173f31] mt-4">
                  Crop Disease Scanner
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Snap a photo of leaf damage to instantly diagnose pests & get remedies.
                </p>
              </div>
              <button
                type="button"
                className="mt-5 w-full py-2.5 px-4 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-[#173f31] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Scan Crop</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Tool 2 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Droplets size={24} />
                </div>
                <h3 className="text-base font-bold text-[#173f31] mt-4">
                  Irrigation & Fertilizer
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Calculate precise water requirement and NPK dosage based on field area.
                </p>
              </div>
              <button
                type="button"
                className="mt-5 w-full py-2.5 px-4 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-[#173f31] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Calculate Dosage</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Tool 3 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-base font-bold text-[#173f31] mt-4">
                  Mandi Price Tracker
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Compare real-time market prices across 50+ APMC mandis in Punjab.
                </p>
              </div>
              <button
                type="button"
                className="mt-5 w-full py-2.5 px-4 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-[#173f31] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Check Mandi Rates</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Tool 4 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CloudSun size={24} />
                </div>
                <h3 className="text-base font-bold text-[#173f31] mt-4">
                  Weather Advisory
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Get 7-day hyperlocal weather updates and rain prediction alerts.
                </p>
              </div>
              <button
                type="button"
                className="mt-5 w-full py-2.5 px-4 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-[#173f31] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>7-Day Forecast</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* 6. CROP PROGRESS */}
        <section className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#173f31] tracking-tight">
                Crop Progress & Field Timeline
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                Track growth stages, irrigation schedules, and harvest milestones
              </p>
            </div>
            <span className="text-xs font-semibold text-[#173f31] bg-emerald-50 px-3 py-1 rounded-lg self-start sm:self-auto">
              2 Active Fields
            </span>
          </div>

          <div className="space-y-5">
            {/* Crop 1 */}
            <div className="p-4 rounded-xl border border-gray-200/70 bg-[#f8faf9]/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#173f31] flex items-center justify-center font-bold">
                    🌾
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#173f31]">
                      Wheat (HD-3086) • Field #1 (8 Acres)
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Tillering & Vegetative Stage • Day 45 of 120
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full self-start sm:self-auto">
                  38% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[38%] transition-all"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-1 pt-1">
                <span>Next Activity: Second Irrigation & Urea Spray</span>
                <span className="font-semibold text-[#173f31]">Due in 3 Days (01 Sep)</span>
              </div>
            </div>

            {/* Crop 2 */}
            <div className="p-4 rounded-xl border border-gray-200/70 bg-[#f8faf9]/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#173f31] flex items-center justify-center font-bold">
                    🌱
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#173f31]">
                      Paddy (PR-126) • Field #2 (4 Acres)
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Grain Ripening Stage • Day 110 of 120
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full self-start sm:self-auto">
                  91% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[91%] transition-all"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-600 gap-1 pt-1">
                <span>Next Activity: Harvesting & Mandi Transport</span>
                <span className="font-semibold text-[#173f31]">Due Tomorrow (29 Aug)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. AGROVA MARKET PROMOTIONAL BANNER */}
        <section className="bg-gradient-to-r from-[#173f31] to-[#113126] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                AGROVA DIRECT MARKETPLACE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Sell Harvest Directly to Verified Buyers & Cut Out Middlemen
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed font-medium pt-1">
                Get guaranteed instant digital payments, free farm doorstep pickup, and up to 12% higher profit margins for your produce.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                type="button"
                className="px-6 py-3.5 rounded-xl bg-white text-[#173f31] hover:bg-emerald-50 font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>List Produce for Sale</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Decorative Glow Circle */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2026 AGROVA Ecosystems. Resilient Agriculture Platform.</p>
            <div className="flex items-center gap-6 font-medium">
              <button type="button" className="hover:text-[#173f31] transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <button type="button" className="hover:text-[#173f31] transition-colors cursor-pointer">
                Terms of Service
              </button>
              <span className="text-emerald-700 font-bold">Helpline: 1800-AGROVA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. FLOATING AI BUTTON */}
      <AIButton />
    </div>
  );
}

export default DashboardPage;
