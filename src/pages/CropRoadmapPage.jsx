import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import { AIButton } from '../components/AIButton';
import {
  Calendar,
  Clock,
  Lightbulb,
  CloudRain,
  Droplets,
  Bug,
  Sprout,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Camera,
  FlaskConical,
  Bell,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

const growthCycleStages = [
  { id: 1, name: 'Land Prep', status: 'completed' },
  { id: 2, name: 'Sowing', status: 'completed' },
  { id: 3, name: 'Emergence', status: 'completed' },
  { id: 4, name: 'Tillering', status: 'current' },
  { id: 5, name: 'Jointing', status: 'upcoming' },
  { id: 6, name: 'Heading', status: 'upcoming' },
  { id: 7, name: 'Ripening', status: 'upcoming' }
];

/**
 * CropRoadmapPage component for AGROVA Platform.
 * Features Hero wheat header, Growth Progress & Today's Advice, 7-stage Full Growth Cycle, Step-by-Step Sequence timeline, Quick Actions, and Crop Health check.
 */
export function CropRoadmapPage() {
  const navigate = useNavigate();

  // Navigation State
  const [activeTab, setActiveTab] = useState('Crop Roadmap');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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
    } else if (tabName === 'Bids') {
      navigate('/bids');
    } else if (tabName === 'Crop Roadmap') {
      navigate('/crop-roadmap');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. GLOBAL NAVBAR ==================== */}
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
                    🌱 Tillering phase optimal: Nitrogen application recommended
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

      {/* ==================== 2. MAIN PAGE LAYOUT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* HERO CROP ROADMAP CARD */}
        <section className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden shadow-md group">
          {/* Background Image */}
          <img
            src={wheatImg}
            alt="Wheat Crop Roadmap"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-3">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold inline-flex items-center gap-1.5 border border-white/20">
                <Calendar size={13} className="text-emerald-300" />
                <span>Season: Rabi</span>
              </span>

              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold inline-flex items-center gap-1.5 border border-white/20">
                <Clock size={13} className="text-emerald-300" />
                <span>Approx: 110–150 days</span>
              </span>
            </div>

            {/* Heading & Description */}
            <div className="space-y-1.5 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Wheat Crop Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                Follow your wheat crop from sowing to harvest. Currently tracking robust growth in the early tillering phase.
              </p>
            </div>

          </div>
        </section>

        {/* 3. GROWTH PROGRESS + TODAY'S ADVICE (HORIZONTAL 2-CARD SECTION) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT CARD: Growth Progress (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#173f31]">
                Growth Progress
              </h2>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80">
                Day 48 / 120
              </span>
            </div>

            {/* Stage Labels Row */}
            <div className="flex items-center justify-between text-xs font-extrabold text-[#173f31]">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 size={14} /> Seed
              </span>
              <span className="flex items-center gap-1 text-[#173f31] font-black">
                <Sprout size={14} className="text-emerald-600" /> Tillering
              </span>
              <span className="text-gray-400 font-bold">
                Harvest
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#173f31] rounded-full w-[40%]" />
            </div>

            {/* Bordered Light-Green Info Box */}
            <div className="bg-emerald-50/90 rounded-2xl border border-emerald-200/90 p-4 text-xs font-medium text-emerald-950 leading-relaxed space-y-1">
              <span className="font-extrabold text-[#173f31] block">
                Current stage: Tillering.
              </span>
              <span>
                Focus on nutrient management to encourage healthy shoots.
              </span>
            </div>
          </div>

          {/* RIGHT CARD: Today's Advice (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#173f31]">
              <Lightbulb size={20} className="text-amber-500 fill-amber-400" />
              <h2 className="text-lg font-extrabold">
                Today's Advice
              </h2>
            </div>

            {/* 3 Equal Advice Sub-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* A. Weather */}
              <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 space-y-2">
                <div className="p-2 w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CloudRain size={16} />
                </div>
                <h4 className="text-xs font-extrabold text-[#173f31]">Weather</h4>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">
                  Rain expected this evening. Avoid irrigation today to prevent waterlogging.
                </p>
              </div>

              {/* B. Water */}
              <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 space-y-2">
                <div className="p-2 w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Droplets size={16} />
                </div>
                <h4 className="text-xs font-extrabold text-[#173f31]">Water</h4>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">
                  Check soil moisture in sector 4. Roots need oxygen during this critical tillering phase.
                </p>
              </div>

              {/* C. Crop */}
              <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 space-y-2">
                <div className="p-2 w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bug size={16} />
                </div>
                <h4 className="text-xs font-extrabold text-[#173f31]">Crop</h4>
                <p className="text-[11px] text-gray-600 font-medium leading-tight">
                  Inspect for broadleaf weeds. Early intervention prevents yield reduction.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* 4. FULL GROWTH CYCLE (FULL-WIDTH STAGE TIMELINE CARD) */}
        <section className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-5">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block">
            FULL GROWTH CYCLE
          </span>

          {/* Horizontal Stage Timeline */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[700px] flex items-center justify-between relative">
              
              {/* Timeline Connecting Line */}
              <div className="absolute top-5 left-6 right-6 h-0.5 bg-gray-200 z-0" />

              {growthCycleStages.map((stage) => {
                const isCurrent = stage.status === 'current';
                const isCompleted = stage.status === 'completed';
                
                return (
                  <div key={stage.id} className="relative z-10 flex flex-col items-center space-y-2 text-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition shadow-2xs ${
                        isCurrent
                          ? 'bg-[#173f31] text-white ring-4 ring-emerald-100 scale-110'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white border border-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={18} /> : stage.id}
                    </div>
                    <span
                      className={`text-xs ${
                        isCurrent
                          ? 'font-extrabold text-[#173f31]'
                          : isCompleted
                          ? 'font-bold text-gray-700'
                          : 'font-medium text-gray-400'
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* 5. LOWER TWO-COLUMN SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: STEP-BY-STEP SEQUENCE (7-8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/90 p-6 shadow-2xs space-y-6">
            <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
              Step-by-Step Sequence
            </h2>

            {/* Vertical Timeline Container */}
            <div className="space-y-6 relative pl-6 border-l-2 border-emerald-200">
              
              {/* Stage 1-3 (Completed) */}
              <div className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100" />
                <h3 className="text-sm font-extrabold text-gray-500 line-through">
                  1-3. Land Prep to Emergence
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Seedbed prepared, seeds sown, and early shoots emerged successfully.
                </p>
              </div>

              {/* Stage 4 (Current Highlighted - Tillering) */}
              <div className="relative space-y-3 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 shadow-2xs">
                <div className="absolute -left-[39px] top-4 w-5 h-5 rounded-full bg-[#173f31] border-2 border-white ring-4 ring-emerald-200 flex items-center justify-center">
                  <Sprout size={10} className="text-white" />
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[#173f31]">
                    4. Tillering
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#173f31] text-white text-[10px] font-extrabold uppercase">
                    IMPORTANT STAGE
                  </span>
                </div>

                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  The plant is producing side shoots (tillers). This stage determines the potential number of heads the plant will produce. Adequate nitrogen and weed control are critical right now.
                </p>

                {/* 2-Column Details Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="h-28 rounded-xl overflow-hidden bg-gray-100 border border-emerald-200">
                    <img src={wheatImg} alt="Tillering crop" className="w-full h-full object-cover" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col justify-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">ESTIMATED DURATION</span>
                    <span className="text-base font-extrabold text-[#173f31]">15 - 20 Days remaining</span>
                    <span className="text-xs text-emerald-700 font-semibold">Active Monitoring</span>
                  </div>
                </div>
              </div>

              {/* Stage 5 (Next - Jointing) */}
              <div className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white" />
                <h3 className="text-sm font-extrabold text-[#173f31]">
                  5. Jointing & Stem Extension
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Stems elongate and the head begins to form inside the stem.
                </p>
              </div>

              {/* Stage 6-9 (Next - Heading to Harvest) */}
              <div className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-300 border-2 border-white" />
                <h3 className="text-sm font-extrabold text-[#173f31]">
                  6-9. Heading to Harvest
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Flowering, grain fill, ripening, and final harvest.
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: QUICK ACTIONS & CHECK CROP HEALTH (4-5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Title & Cards */}
            <div className="space-y-3">
              <h2 className="text-lg font-extrabold text-[#173f31]">
                Quick Actions
              </h2>

              {/* Action 1: Log Irrigation */}
              <div 
                onClick={() => alert("Log Irrigation modal opened!")}
                className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#173f31]">Log Irrigation</h4>
                    <span className="text-xs text-gray-500 font-medium">Record water usage</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>

              {/* Action 2: Add Fertilizer */}
              <div 
                onClick={() => alert("Add Fertilizer modal opened!")}
                className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#173f31]">Add Fertilizer</h4>
                    <span className="text-xs text-gray-500 font-medium">Update nutrient logs</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>

            {/* Check Crop Health Card */}
            <div className="bg-gradient-to-r from-[#173f31] to-[#113126] text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <HeartPulse size={20} className="text-emerald-300" />
                <h3 className="text-lg font-extrabold text-white">
                  Check Crop Health
                </h3>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
                Notice yellowing leaves or pests? Use your camera to instantly identify issues.
              </p>
              <button
                type="button"
                onClick={() => alert("Opening Agrova AI Camera Crop Diagnostic...")}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#173f31] text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <Camera size={16} />
                <span>Check My Crop</span>
              </button>
            </div>

          </div>

        </section>

      </main>

      {/* ==================== 8. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-[#173f31] text-white flex items-center justify-center p-1">
              <img src={agrovaLogo} alt="Agrova logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold text-[#173f31] uppercase tracking-wider">Agrova</span>
          </div>

          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agricultural Systems. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 9. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => alert("Agrova Voice & AI Assistant Activated!")} />

    </div>
  );
}

export default CropRoadmapPage;
