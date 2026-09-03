import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import farmerHero from '../assets/farmer-hero.png';
import marketplaceImage from '../assets/marketplace-image.png';
import chatgptImage from '../assets/ChatGPT Image Aug 25, 2026, 01_30_15 PM.png';
import { AIButton } from '../components/AIButton';
import { languages } from '../data/languages';
import api from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
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
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Check,
  Award,
  Layers,
  Menu,
  X,
  Send,
  Sparkles,
  Info,
  Upload,
  Clock,
  FlaskConical,
  Landmark,
  Mic,
  FileText,
  PlusCircle,
  CheckCircle as CheckMark
} from 'lucide-react';

const heroImages = [
  {
    src: farmerHero,
    alt: 'Smart crop and farm management in green wheat field'
  },
  {
    src: '/farmer.jpg',
    alt: 'Farmer working in agricultural fields under golden sunset'
  },
  {
    src: chatgptImage,
    alt: 'Modern farming technology and crop advisory'
  },
  {
    src: marketplaceImage,
    alt: 'Crop harvesting and agricultural marketplace'
  }
];

/**
 * DashboardPage component for AGROVA Farmer Platform.
 * Target UI Design:
 * - Color Palette: Primary dark green #173f31, Secondary dark green #113126, Background #f8faf9, White cards #ffffff.
 * - Header: 80px sticky navbar with AGROVA brand, 7 nav items, language selector, notification bell, vertical divider, Welcome back Rajesh & avatar.
 * - Greeting: Large white rounded summary card for Sangrur PB.
 * - Hero + 3 Cards: Farmer hero card (2/3 width) with Explore Guidance button + 3 vertically stacked summary cards (Active Crops, Weather Alert in pink, Active Bids).
 * - Action Required Alert: Horizontal alert with Acknowledge (dismiss) & Adjust Schedule buttons.
 * - Farming Toolkit: 6-column desktop cards grid (Crop Health, Weather, Soil Health, Testing, Schemes, Market).
 * - Crop Progress: Wheat (PBW 343) 6-stage lifecycle timeline (Sowing, Irrigation, Fertilizer, Growth Day 42 Active, Protection, Harvest).
 * - AGROVA Market Banner: Dark green promotional section with 7 New Bids & Review Bids & Sell button.
 * - Footer: 4-column modern footer & 2024 Agrova Technologies copyright.
 * - Floating AI Button: Fixed pill with Ask Agrova AI.
 */
export function DashboardPage() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    user: { name: 'Ram Singh', role: 'Farmer', location: 'Sangrur, Punjab', season: 'Kharif Season 2026' },
    stats: { activeCrops: 3, weatherAlert: 'Heavy Rain Expected', activeBids: 5, highestBid: 2550, soilHealth: 'Optimal (pH 6.8)' },
    market: { newBids: 7, highestBid: 2550, buyer: 'AgriCorp WholeSalers Sangrur' },
    ai: { welcome: 'Namaste Rajesh ji! I am Agrova AI, your farming assistant. How can I help your farm today?' }
  });

  // Selected Language State
  const { languageId: selectedLanguage, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Active Navigation Tab State
  const [activeTab, setActiveTab] = useState('home');

  // Mobile Menu Drawer Toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Notification Popover Toggle
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Action Required Alert Visibility State
  const [showAlert, setShowAlert] = useState(true);

  // Active Modal State for Functional Buttons
  const [activeModal, setActiveModal] = useState(null);

  // Hero Section 4-Image Carousel State & Autoplay Effect
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // AI Assistant Chat History & Input
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      sender: 'ai',
      text: t.ai.welcome
    }
  ]);

  useEffect(() => {
    const cachedDashboard = localStorage.getItem('agrova_dashboard');
    if (cachedDashboard) {
      try {
        setDashboardData(JSON.parse(cachedDashboard));
      } catch (error) {
        console.warn('Failed to parse cached dashboard', error);
      }
    }

    const session = JSON.parse(localStorage.getItem('agrova_session') || 'null');
    api.getDashboard(session?.id || 'demo-user').then((response) => {
      if (response.dashboard) {
        setDashboardData(response.dashboard);
        localStorage.setItem('agrova_dashboard', JSON.stringify(response.dashboard));
      }
    }).catch((error) => {
      console.warn('Dashboard fetch failed:', error.message);
    });
  }, []);

  useEffect(() => {
    setAiMessages([
      { sender: 'ai', text: t.ai.welcome }
    ]);
  }, [selectedLanguage]);

  const currentLanguage = languages.find((lang) => lang.id === selectedLanguage);
  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'myCrops', label: t.nav.myCrops },
    { key: 'cropRoadmap', label: t.nav.cropRoadmap },
    { key: 'sellCrop', label: t.nav.sellCrop },
    { key: 'bids', label: t.nav.bids },
    { key: 'market', label: t.nav.market },
    { key: 'governmentSchemes', label: t.nav.governmentSchemes },
  ];

  const handleLanguageSelect = (langId) => {
    setLanguage(langId);
    setIsLangOpen(false);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || aiInput;
    if (!text.trim()) return;

    const newMsgs = [...aiMessages, { sender: 'user', text }];
    setAiMessages(newMsgs);
    setAiInput('');

    try {
      const history = newMsgs.slice(-10).map((message) => ({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.text,
      }));
      const response = await api.askAi({ message: text, language: selectedLanguage, history });
      setAiMessages((prev) => [...prev, { sender: 'ai', text: response.reply }]);
    } catch (error) {
      setAiMessages((prev) => [...prev, { sender: 'ai', text: t.ai.fallback }]);
      console.warn('AI fetch failed:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative pb-20 font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. HEADER / NAVBAR ==================== */}
      <header className="w-full bg-white border-b border-gray-200/80 h-[80px] flex items-center sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          
          {/* Left — AGROVA Logo & Wordmark */}
          <div className="flex items-center gap-3.5 flex-shrink-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-xl bg-[#173f31] text-white flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden shadow-xs">
              <img
                src={agrovaLogo}
                alt="Agrova logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[24px] sm:text-[26px] font-extrabold tracking-wider text-[#173f31] uppercase leading-tight">
                AGROVA
              </span>
              <span className="hidden xl:inline text-[11px] font-medium text-gray-500 leading-tight mt-1">
                {t.common.brandTagline}
              </span>
            </div>
          </div>

          {/* Center — Navigation Links (7 exact items in exact order) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 h-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    if (item.key === 'home') {
                      navigate('/dashboard');
                    }
                    if (item.key === 'myCrops') {
                      navigate('/my-crops');
                    }
                    if (item.key === 'cropRoadmap') navigate('/crop-roadmap');
                    if (item.key === 'sellCrop') navigate('/sell-crop');
                    if (item.key === 'bids') navigate('/bids');
                    if (item.key === 'market') navigate('/market');
                    if (item.key === 'governmentSchemes') navigate('/government-schemes');
                  }}
                  className={`h-full inline-flex items-center px-1 text-xs xl:text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#173f31] text-[#173f31] font-bold'
                      : 'border-transparent text-gray-600 hover:text-[#173f31] hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right — Language Selector, Notification Bell, Vertical Divider & User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
            
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-100 transition cursor-pointer"
              >
                <span>🌐</span>
                <span className="hidden md:inline">{currentLanguage?.native || 'हिन्दी'}</span>
                <ChevronDown
                  size={14}
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
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2.5 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h4 className="text-sm font-bold text-[#173f31] flex items-center gap-1.5">
                      <Bell size={16} className="text-emerald-600" />
                      {t.common.notifications} (3)
                    </h4>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      {t.common.close}
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      <p className="font-semibold text-amber-900">🌧️ Weather Warning: Rain expected in 2 days</p>
                      <p className="text-amber-800 mt-0.5">Postpone irrigation for Wheat (PBW 343).</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                      <p className="font-semibold text-emerald-900">💰 New High Bid: ₹2,550/q</p>
                      <p className="text-emerald-800 mt-0.5">AgriCorp Traders placed a new bid on your wheat crop.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="h-7 w-px bg-gray-200"></div>

            {/* User Section (Far Right: Welcome back, Rajesh) */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col text-right leading-tight">
                <span className="text-[11px] font-medium text-gray-500">
                  {t.common.welcomeBack},
                </span>
                <span className="text-sm font-bold text-[#173f31]">
                  Rajesh
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-sm shadow-xs ring-2 ring-emerald-100/80 overflow-hidden">
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
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white border-b border-gray-200 p-4 shadow-lg z-50 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    setIsMobileMenuOpen(false);
                    if (item.key === 'home') {
                      navigate('/dashboard');
                    }
                    if (item.key === 'myCrops') {
                      navigate('/my-crops');
                    }
                    if (item.key === 'cropRoadmap') navigate('/crop-roadmap');
                    if (item.key === 'sellCrop') navigate('/sell-crop');
                    if (item.key === 'bids') navigate('/bids');
                    if (item.key === 'market') navigate('/market');
                    if (item.key === 'governmentSchemes') navigate('/government-schemes');
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

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7">
        
        {/* ==================== 2. GREETING / FARM SUMMARY ==================== */}
        <section className="flex flex-col md:flex-row md:items-start justify-between gap-4 py-1 px-1">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173f31] tracking-tight">
                {t.dashboard.greeting}
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold border border-emerald-200/80 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-700" />
                {t.dashboard.verified}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium pt-0.5">
              {t.dashboard.summary}
            </p>
          </div>

          {/* Right Side: Location Pill & New Crop Button with Identical Dimensions */}
          <div className="flex flex-col items-start md:items-end gap-2 self-start md:self-auto flex-shrink-0 w-[190px]">
            <div className="w-full h-9 flex items-center justify-center gap-2 bg-white/80 backdrop-blur-xs px-4 rounded-xl border border-gray-200/70 text-xs font-bold text-gray-700 shadow-2xs">
              <MapPin size={15} className="text-emerald-700 flex-shrink-0" />
              <span className="truncate">Sangrur • 28 Aug 2026</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModal('new-crop')}
              className="w-full h-9 flex items-center justify-center gap-1.5 px-4 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <PlusCircle size={14} className="text-emerald-300 flex-shrink-0" />
              <span>{t.dashboard.newCrop}</span>
            </button>
          </div>
        </section>

        {/* ==================== 3. HERO + SUMMARY CARDS ==================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Large Hero Card (7 cols / ~58% width) with 4-Image Carousel */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-md group flex flex-col justify-end border border-gray-200">
            
            {/* 4-Slide Background Image Carousel */}
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  idx === currentHeroSlide
                    ? 'opacity-100 scale-100 z-0'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              />
            ))}

            {/* Gradient Overlay for Text Legibility (Fixed & Static) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#173f31]/95 via-[#173f31]/50 to-transparent z-10 pointer-events-none" />

            {/* Hero Text Content Overlay (Fixed & Static) */}
            <div className="relative z-20 p-6 sm:p-8 space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-400 text-[#173f31] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                {t.dashboard.cropManagement}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.dashboard.heroTitle}
              </h2>

              <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
                {t.dashboard.heroText}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('guidance')}
                  className="px-5 py-3 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-md cursor-pointer border border-emerald-500/30"
                >
                  <span>{t.dashboard.explore}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentHeroSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentHeroSlide
                      ? 'w-6 bg-emerald-400'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Carousel Previous & Next Arrow Controls (Visible on hover) */}
            <button
              type="button"
              onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
              aria-label="Previous Hero Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10 backdrop-blur-xs"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length)}
              aria-label="Next Hero Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition opacity-0 group-hover:opacity-100 cursor-pointer border border-white/10 backdrop-blur-xs"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Right Stat Cards Container (5 cols / ~42% width: 2x2 grid rendering ALL 4 cards) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: ACTIVE CROPS */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t.dashboard.activeCrops}
                  </p>
                  <p className="text-2xl font-extrabold text-[#173f31] mt-1">
                    3
                  </p>
                  <p className="text-xs text-emerald-700 font-bold mt-1">
                    ↗ {t.status.lookingGood}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Sprout size={20} />
                </div>
              </div>
            </div>

            {/* Card 2: WEATHER ALERT */}
            <div className="bg-red-50/90 rounded-2xl border border-red-100 p-5 shadow-2xs transition flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                    {t.dashboard.weatherAlert}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-red-900 mt-1">
                    {t.status.heavyRain}
                  </p>
                  <p className="text-xs text-red-700 font-semibold mt-1">
                    ◷ {t.status.inTwoDays}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                  <CloudSun size={20} />
                </div>
              </div>
            </div>

            {/* Card 3: ACTIVE BIDS */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t.dashboard.activeBids}
                  </p>
                  <p className="text-2xl font-extrabold text-[#173f31] mt-1">
                    5
                  </p>
                  <p className="text-xs text-gray-600 font-medium mt-1">
                    {t.status.highest}: <span className="font-bold text-[#173f31]">₹2,550/q</span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>

            {/* Card 4: SOIL HEALTH */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t.dashboard.soilHealth}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-[#173f31] mt-1">
                    {t.status.optimal} (pH 6.8)
                  </p>
                  <p className="text-xs text-amber-700 font-semibold mt-1">
                    {t.status.ureaDue}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Layers size={20} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 4. ACTION REQUIRED ALERT ==================== */}
        {showAlert && (
          <section className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                <AlertTriangle size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-amber-950">
                  {t.dashboard.actionRequired}
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 font-medium leading-relaxed">
                  {t.dashboard.actionText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end md:self-center flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-100 text-xs font-bold transition cursor-pointer"
              >
                {t.dashboard.acknowledge}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('adjust-schedule')}
                className="px-4 py-2.5 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                {t.dashboard.adjustSchedule}
              </button>
            </div>
          </section>
        )}

        {/* ==================== 5. FARMING TOOLKIT ==================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
                  {t.dashboard.toolkit}
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Quick diagnostic and management tools for your field
              </p>
            </div>
            <button
              onClick={() => setActiveModal('guidance')}
              className="text-xs font-bold text-[#173f31] hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
                <span>{t.dashboard.viewAll}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 6 Desktop Cards in Desktop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* 1. Crop Health */}
            <div
              onClick={() => setActiveModal('toolkit-health')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200">
                <Sprout size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.cropHealth}</h3>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{t.status.lookingGood}</p>
              </div>
            </div>

            {/* 2. Weather */}
            <div
              onClick={() => setActiveModal('toolkit-weather')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-200">
                <CloudSun size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.weather}</h3>
                <p className="text-[11px] font-semibold text-amber-700 mt-0.5">{t.status.alertActive}</p>
              </div>
            </div>

            {/* 3. Soil Health */}
            <div
              onClick={() => setActiveModal('toolkit-soil')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.soilHealth}</h3>
                <p className="text-[11px] font-semibold text-amber-700 mt-0.5">{t.status.updateNeeded}</p>
              </div>
            </div>

            {/* 4. Testing */}
            <div
              onClick={() => setActiveModal('toolkit-testing')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200">
                <FlaskConical size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.testing}</h3>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{t.status.verified}</p>
              </div>
            </div>

            {/* 5. Schemes */}
            <div
              onClick={() => setActiveModal('toolkit-schemes')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200">
                <Landmark size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.schemes}</h3>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{t.status.matches}</p>
              </div>
            </div>

            {/* 6. Market */}
            <div
              onClick={() => setActiveModal('toolkit-market')}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-xs transition text-center flex flex-col items-center justify-center space-y-2 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#173f31] flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200">
                <Store size={24} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173f31]">{t.dashboard.market}</h3>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{t.status.pricesUp}</p>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 6. CROP PROGRESS / FIELD TIMELINE ==================== */}
        <section className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/my-crops/wheat-pbw-343')}
                  className="text-xl font-extrabold text-[#173f31] tracking-tight hover:text-emerald-700 transition cursor-pointer text-left"
                >
                  {t.features?.viewDetails || 'View My Crop'}
                </button>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {t.status.qualityVerified}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">
                {t.status.plantedOn} • 3 {t.status.acres}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/my-crops/wheat-pbw-343')}
              className="px-4 py-2.5 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-auto"
            >
              {t.features?.viewDetails || 'View My Crop'}
            </button>
          </div>

          {/* Horizontal Timeline Stages */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[650px] grid grid-cols-6 gap-2 relative">
              
              {/* Connecting Line Behind Nodes */}
              <div className="absolute top-5 left-[8%] right-[8%] h-0.5 bg-gray-200 -z-0"></div>

              {/* Stage 1: Sowing */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-[#173f31]">{t.status.sowing}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.status.done}</p>
                </div>
              </div>

              {/* Stage 2: Irrigation */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-[#173f31]">{t.status.irrigation}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.status.done}</p>
                </div>
              </div>

              {/* Stage 3: Fertilizer */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-[#173f31]">{t.status.fertilizer}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">{t.status.done}</p>
                </div>
              </div>

              {/* Stage 4: Growth (Active Highlighted) */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-11 h-11 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-emerald-100 animate-pulse">
                  42
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#173f31]">{t.status.growth}</p>
                  <span className="inline-block px-2 py-0.5 bg-[#173f31] text-white text-[10px] font-bold rounded-full mt-0.5">
                    {t.status.active}
                  </span>
                </div>
              </div>

              {/* Stage 5: Protection */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold text-xs">
                  ○
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600">{t.status.protection}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{t.status.upcoming}</p>
                </div>
              </div>

              {/* Stage 6: Harvest */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold text-xs">
                  🌾
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600">{t.status.harvest}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{t.status.expectedMar}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 7. AGROVA MARKET BANNER ==================== */}
        <section className="bg-[#173f31] text-white rounded-[28px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-lg border border-[#173f31]/40 min-h-[380px] flex flex-col justify-center">
          
          {/* Absolutely Positioned Right-Side Market Image with Soft Horizontal Blending Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] h-full pointer-events-none overflow-hidden">
            <img
              src={marketplaceImage}
              alt="Farmer selling produce directly to a buyer"
              className="w-full h-full object-cover object-[center_center] opacity-90 lg:opacity-100"
            />
            {/* Desktop Left-to-Right Dissolve Gradient Overlay matching exact #173f31 color */}
            <div 
              className="absolute inset-0 hidden lg:block" 
              style={{
                background: 'linear-gradient(to right, #173f31 0%, #173f31 12%, rgba(23,63,49,0.92) 28%, rgba(23,63,49,0.55) 45%, rgba(23,63,49,0.12) 65%, transparent 100%)'
              }}
            />
            {/* Mobile Top-to-Bottom Dissolve Gradient Overlay */}
            <div 
              className="absolute inset-0 lg:hidden"
              style={{
                background: 'linear-gradient(to bottom, #173f31 0%, rgba(23,63,49,0.85) 30%, transparent 100%)'
              }}
            />
          </div>

          {/* Left Text Content & Controls */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                AGROVA MARKET
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.dashboard.readyToSell}
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium max-w-lg">
                Connect directly with verified wholesale buyers. Skip the middlemen, secure the best price, and arrange hassle-free pickup.
              </p>
            </div>

            {/* Stat Pills & Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-emerald-400/15 border border-emerald-400/25 px-4 py-2 rounded-full text-xs font-semibold text-emerald-200 backdrop-blur-xs">
                  <span>{t.dashboard.newBids}: </span>
                  <span className="font-bold text-white">7</span>
                </div>
                <div className="bg-emerald-400/15 border border-emerald-400/25 px-4 py-2 rounded-full text-xs font-semibold text-emerald-200 backdrop-blur-xs">
                  <span>{t.dashboard.highestBid}: </span>
                  <span className="font-bold text-white">₹2,550/q</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('review-bids')}
                className="px-6 py-3.5 rounded-xl bg-white text-[#173f31] hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
              >
                <span>{t.dashboard.reviewBids}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ==================== 8. FOOTER ==================== */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#173f31] text-white flex items-center justify-center p-1 font-bold">
                  <img src={agrovaLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-extrabold text-[#173f31]">AGROVA</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Powering the New Green Revolution.
              </p>
            </div>

            {/* Column 2: Platform */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#173f31] uppercase tracking-wider">PLATFORM</p>
              <ul className="space-y-1.5 text-gray-600 font-medium">
                <li><a href="#marketplace" className="hover:text-[#173f31] transition">Marketplace</a></li>
                <li><a href="#insights" className="hover:text-[#173f31] transition">Crop Insights</a></li>
                <li><a href="#community" className="hover:text-[#173f31] transition">Farmer Community</a></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#173f31] uppercase tracking-wider">SUPPORT</p>
              <ul className="space-y-1.5 text-gray-600 font-medium">
                <li><a href="#help" className="hover:text-[#173f31] transition">Help Center</a></li>
                <li><a href="#schemes" className="hover:text-[#173f31] transition">Schemes Guide</a></li>
                <li><a href="#contact" className="hover:text-[#173f31] transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#173f31] uppercase tracking-wider">LEGAL</p>
              <ul className="space-y-1.5 text-gray-600 font-medium">
                <li><a href="#privacy" className="hover:text-[#173f31] transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-[#173f31] transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 font-medium">
            <p>© 2024 Agrova Technologies. All rights reserved.</p>
            <p className="text-emerald-800 font-bold">Kisan Helpline: 1800-AGROVA</p>
          </div>
        </div>
      </footer>

      {/* ==================== 9. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => setActiveModal('ai')} />

      {/* ==================== INTERACTIVE ACTION MODALS ==================== */}
      
      {/* AI Assistant Chat Modal */}
      {activeModal === 'ai' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] border border-gray-200">
            <div className="bg-[#173f31] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  ✨
                </div>
                <div>
                  <h3 className="font-bold text-sm">AGROVA AI Assistant</h3>
                  <p className="text-[10px] text-emerald-200">Sangrur Punjab Context Active</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-emerald-200 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8faf9]">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-[#173f31] text-white rounded-br-none font-medium' : 'bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-bl-none font-medium'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about Wheat PBW 343, weather, bids..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#173f31]"
              />
              <button onClick={() => handleSendMessage()} className="p-2.5 rounded-xl bg-[#173f31] text-white hover:bg-[#113126]">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore Guidance / New Crop / Generic Action Modal */}
      {(activeModal === 'guidance' || activeModal === 'new-crop' || activeModal === 'adjust-schedule' || activeModal === 'update-progress' || activeModal === 'review-bids' || activeModal?.startsWith('toolkit-')) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#173f31] capitalize">
                {activeModal === 'guidance' && 'Personalized Crop Guidance'}
                {activeModal === 'new-crop' && 'Register New Crop'}
                {activeModal === 'adjust-schedule' && 'Adjust Field Schedule'}
                {activeModal === 'update-progress' && 'Update Crop Lifecycle'}
                {activeModal === 'review-bids' && 'Review Active Wholesale Bids'}
                {activeModal?.startsWith('toolkit-') && `Toolkit: ${activeModal.replace('toolkit-', '')}`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700 font-medium">
              {activeModal === 'new-crop' && (
                <div className="space-y-2.5">
                  <p>Add a new crop or field to your Sangrur dashboard:</p>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Crop Type</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium">
                      <option>Mustard (Pusa-30)</option>
                      <option>Cotton (Bt Cotton)</option>
                      <option>Sugarcane (Co-0238)</option>
                      <option>Potato (Kufri Pukhraj)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Field Size (Acres)</label>
                    <input type="number" defaultValue="4" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium" />
                  </div>
                </div>
              )}
              {activeModal === 'guidance' && (
                <div className="space-y-2">
                  <p>Based on Sangrur weather data (Rain expected in 2 days):</p>
                  <ul className="list-disc list-inside space-y-1 text-emerald-900 bg-emerald-50 p-3 rounded-xl">
                    <li>Postpone irrigation scheduled for today.</li>
                    <li>Apply Zinc Sulphate after rain subsides on 30 Aug.</li>
                  </ul>
                </div>
              )}
              {activeModal === 'adjust-schedule' && (
                <div className="space-y-2">
                  <p>Shifted Irrigation schedule from 28 Aug to 31 Aug.</p>
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-900 font-semibold">
                    ✓ Irrigation postponed by 3 days automatically.
                  </div>
                </div>
              )}
              {activeModal === 'review-bids' && (
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="font-bold text-emerald-900">Highest Bid: ₹2,550/q</p>
                    <p className="text-[11px] text-emerald-800">Buyer: AgriCorp WholeSalers Sangrur</p>
                  </div>
                  <p className="text-gray-500">Free doorstep transport included.</p>
                </div>
              )}
              {activeModal?.startsWith('toolkit-') && (
                <p>Opening diagnostic suite for {activeModal.replace('toolkit-', '')}...</p>
              )}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#173f31] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default DashboardPage;
