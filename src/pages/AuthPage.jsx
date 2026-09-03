import React, { useState } from 'react';
import agrovaLogo from '../assets/agrova-logo.png';
import farmerHero from '../assets/farmer-hero.png';
import { languages } from '../data/languages';
import { AIButton } from '../components/AIButton';
import { ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

/**
 * AuthPage component for AGROVA platform.
 * Features a 2-column layout (branding left with agricultural background image, auth card right), language selector,
 * farmer/wholesaler role selection, OTP/Password login modes, and registration options.
 */
export function AuthPage() {
  const navigate = useNavigate();
  // Selected Language State (syncs with localStorage if available)
  const { languageId: selectedLanguage, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Role Selection State: 'Farmer' (default) or 'Wholesaler'
  const [role, setRole] = useState('Farmer');

  // Auth Mode State: false for OTP, true for Password
  const [isPasswordMode, setIsPasswordMode] = useState(false);

  // Form Inputs State
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const currentLanguage = languages.find((lang) => lang.id === selectedLanguage);

  const handleLanguageSelect = (langId) => {
    setLanguage(langId);
    setIsLangOpen(false);
  };

  const createDemoOtp = () => String(Math.floor(100000 + Math.random() * 900000));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMobile = mobileNumber.trim();
    if (!trimmedMobile) {
      setError(t.auth.pleaseMobile);
      return;
    }

    if (trimmedMobile.length < 10 || !/^\d+$/.test(trimmedMobile)) {
      setError(t.auth.invalidMobile);
      return;
    }

    if (isPasswordMode && !password.trim()) {
      setError(t.auth.pleasePassword);
      return;
    }

    setError('');

    try {
      const response = await api.login({
        mobileNumber: trimmedMobile,
        name: name.trim(),
        role,
        ...(isPasswordMode ? { password } : {}),
      });

      if (response.directLogin) {
        localStorage.setItem('agrova_session', JSON.stringify(response.user));
        localStorage.setItem('agrova_dashboard', JSON.stringify(response.dashboard));
        navigate('/dashboard');
        return;
      }

      const otpToStore = response.otp || createDemoOtp();
      sessionStorage.setItem('agrova_last_otp', otpToStore);
      sessionStorage.setItem('agrova_last_mobile', trimmedMobile);

      navigate('/auth/otp', {
        state: {
          mobileNumber: trimmedMobile,
          role,
          demoOtp: otpToStore,
        },
      });
    } catch (submitError) {
      const fallbackOtp = createDemoOtp();
      sessionStorage.setItem('agrova_last_otp', fallbackOtp);
      sessionStorage.setItem('agrova_last_mobile', trimmedMobile);

      navigate('/auth/otp', {
        state: {
          mobileNumber: trimmedMobile,
          role,
          demoOtp: fallbackOtp,
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8faf9]">
      {/* LEFT SIDE — BRANDING (50% on Desktop) */}
      <div className="w-full lg:w-1/2 bg-[#173f31] text-white p-6 sm:p-8 lg:px-10 lg:py-10 flex flex-col justify-between relative overflow-hidden">
        {/* Agricultural Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={farmerHero}
            alt="Agricultural background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#173f31]/80 backdrop-blur-[1px]"></div>
        </div>

        {/* Top Branding Header (Shifted slightly up & left) */}
        <div className="relative z-10 flex items-center gap-3.5 -ml-0.5 lg:-ml-1">
          {/* Agrova Logo Container */}
          <div className="w-[52px] h-[52px] rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-1 flex-shrink-0 overflow-hidden border border-white/20 shadow-xs">
            <img
              src={agrovaLogo}
              alt="Agrova logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Brand Name & Stacked Tagline */}
          <div className="flex flex-col text-left">
            <span className="text-[24px] sm:text-[26px] font-extrabold tracking-wider text-white uppercase leading-tight">
              AGROVA
            </span>
            <span className="text-[11px] sm:text-[12px] font-medium text-emerald-200/90 leading-tight mt-0.5">
              {t.common.brandTagline}
            </span>
          </div>
        </div>

        {/* Bottom Hero Message (Moved further down, smaller typography) */}
        <div className="relative z-10 hidden lg:block mt-auto pb-4 pt-12">
          <h2 className="text-xl xl:text-2xl font-bold text-white leading-snug tracking-tight">
            Powering the New <br />
            <span className="text-emerald-400">Green Revolution</span>
          </h2>
          <p className="mt-2 text-emerald-100/80 text-sm font-medium">
            Grow smarter. Sell better. Earn more.
          </p>
        </div>

        {/* Subtle Decorative Background Element */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* RIGHT SIDE — AUTHENTICATION CARD & CONTROLS */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-12 flex flex-col justify-between relative min-h-[calc(100vh-200px)] lg:min-h-screen">
        {/* Top Bar — Language Selector */}
        <div className="flex justify-end items-center relative z-20">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 shadow-xs text-gray-700 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              <span className="text-base">🌐</span>
              <span>{currentLanguage?.native || 'हिन्दी'}</span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Dropdown Options */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleLanguageSelect(lang.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between hover:bg-emerald-50/60 cursor-pointer ${selectedLanguage === lang.id
                      ? 'text-[#173f31] font-semibold bg-emerald-50/80'
                      : 'text-gray-700'
                      }`}
                  >
                    <span>{lang.native}</span>
                    {selectedLanguage === lang.id && (
                      <Check size={16} className="text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Centered Auth Card */}
        <div className="my-auto py-6 flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200/80">
            {/* Card Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#173f31] tracking-tight">
              {t.auth.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              {t.auth.subtitle}
            </p>

            {/* Role Selection */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                {t.auth.roleLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('Farmer')}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${role === 'Farmer'
                    ? 'border-2 border-[#173f31] bg-emerald-50/70 text-[#173f31] shadow-2xs'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                >
                  <span className="text-base">🌾</span>
                  <span>{t.auth.farmer}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Wholesaler')}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${role === 'Wholesaler'
                    ? 'border-2 border-[#173f31] bg-emerald-50/70 text-[#173f31] shadow-2xs'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                >
                  <span className="text-base">🏢</span>
                  <span>{t.auth.wholesaler}</span>
                </button>
              </div>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Mobile Number Section */}
              <div>
                <label htmlFor="nameInput" className="block text-xs font-semibold text-gray-700 mb-1.5">Your name</label>
                <input id="nameInput" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" className="w-full px-3.5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#173f31] bg-white font-medium" />
              </div>
              <div>
                <label
                  htmlFor="mobileInput"
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                >
                  {t.auth.mobile}
                </label>
                <div className="flex rounded-xl overflow-hidden border border-gray-300 focus-within:border-[#173f31] focus-within:ring-1 focus-within:ring-[#173f31] transition-all">
                  <span className="px-3.5 py-3 bg-gray-100 text-gray-700 font-semibold text-sm flex items-center justify-center border-r border-gray-300 select-none">
                    +91
                  </span>
                  <input
                    id="mobileInput"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={t.auth.enterMobile}
                    className="w-full px-3.5 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none bg-white font-medium"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Password Section (If Password Mode) */}
              {isPasswordMode && (
                <div>
                  <label
                    htmlFor="passwordInput"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    {t.auth.password}
                  </label>
                  <input
                    id="passwordInput"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={t.auth.enterPassword}
                    className="w-full px-3.5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#173f31] focus:ring-1 focus:ring-[#173f31] transition-all bg-white font-medium"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-xs text-red-600 font-medium mt-1">
                  {error}
                </p>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-semibold text-base shadow-md shadow-[#173f31]/15 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>{isPasswordMode ? t.common.login : t.common.sendOtp}</span>
                <span className="text-lg">→</span>
              </button>
            </form>

            {/* Toggle Mode Link */}
            <div className="mt-3.5 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsPasswordMode(!isPasswordMode);
                  setError('');
                }}
                className="text-xs font-semibold text-[#173f31] hover:underline cursor-pointer"
              >
                {isPasswordMode
                  ? t.common.loginOtp
                  : t.common.loginPassword}
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 relative flex items-center justify-center">
              <div className="w-full border-t border-gray-200"></div>
              <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
                {t.auth.or}
              </span>
            </div>

            {/* Registration Options */}
            <div>
              <p className="text-center text-xs font-semibold text-gray-500 mb-3">
                {t.auth.newToAgrova}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole('Farmer');
                    setIsPasswordMode(false);
                    setError('');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-emerald-50/70 text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  {t.common.registerFarmer}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('Wholesaler');
                    setIsPasswordMode(false);
                    setError('');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-[#173f31] text-[#173f31] hover:bg-emerald-50/70 text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  {t.common.registerBuyer}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Footer Spacer */}
        <div className="h-4"></div>
      </div>

      {/* Floating AI Button */}
      <AIButton />
    </div>
  );
}

export default AuthPage;
