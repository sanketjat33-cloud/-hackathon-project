import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import farmerHero from '../assets/farmer-hero.png';
import { AIButton } from '../components/AIButton';
import { Lock } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

/**
 * OTPPage component for AGROVA 6-digit OTP verification.
 * Matches official AGROVA visual design system: two-column layout with agricultural hero left panel,
 * centered OTP card with 6 auto-focusing inputs, timer countdown for resend, and security badge.
 */
export function OTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Read state passed from AuthPage
  const rawMobile = location.state?.mobileNumber || '';
  const role = location.state?.role || 'Farmer';
  const demoOtp = location.state?.demoOtp || '';

  // Mask mobile number to format: +91 •••••• 4821
  const formatMaskedMobile = (mobile) => {
    if (!mobile) return '+91 •••••• 4821';
    const digitsOnly = mobile.toString().replace(/\D/g, '');
    if (digitsOnly.length >= 4) {
      const last4 = digitsOnly.slice(-4);
      return `+91 •••••• ${last4}`;
    }
    return '+91 •••••• 4821';
  };

  // State for 6 OTP input digits
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // State for 30-second resend countdown timer
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Handle single-digit typing and auto-advance
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Accept only numeric characters
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      // Take the last typed character
      const digit = value.slice(-1);
      newOtp[index] = digit;
      setOtp(newOtp);

      if (error) setError('');

      // Auto-advance to next box if digit entered
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace navigation to previous box
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle pasting 6-digit OTP string
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digits.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);

      if (error) setError('');

      // Focus appropriate box after paste
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Handle OTP Verification submit
  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');

    if (fullOtp.length < 6) {
      setError(t.otp.invalidOtp);
      return;
    }

    setError('');

    try {
      const response = await api.verifyOtp({
        mobileNumber: rawMobile,
        otp: fullOtp,
      });

      localStorage.setItem('agrova_session', JSON.stringify(response.user));
      localStorage.setItem('agrova_dashboard', JSON.stringify(response.dashboard));
      navigate('/dashboard');
    } catch (verifyError) {
      setError(verifyError.message || 'Invalid OTP. Please try again.');
    }
  };

  // Handle Resend OTP click
  const handleResend = () => {
    if (!canResend) return;

    setOtp(Array(6).fill(''));
    setError('');
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();

    console.log('Resending OTP to:', {
      mobileNumber: rawMobile,
      role: role,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8faf9]">
      {/* LEFT SIDE — BRANDING & AGRICULTURAL HERO (50% on Desktop) */}
      <div className="w-full lg:w-1/2 bg-[#173f31] text-white p-6 sm:p-8 lg:px-10 lg:py-10 flex flex-col justify-between relative overflow-hidden">
        {/* Agricultural Background Image & Dark Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={farmerHero}
            alt="Agricultural background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#173f31]/80 backdrop-blur-[1px]"></div>
        </div>

        {/* Top Branding Header */}
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

        {/* Bottom Hero Message (Desktop Only) */}
        <div className="relative z-10 hidden lg:block mt-auto pb-4 pt-12">
          <h2 className="text-xl xl:text-2xl font-bold text-white leading-snug tracking-tight">
            Powering the New <br />
            <span className="text-emerald-400">Green Revolution</span>
          </h2>
          <p className="mt-2 text-emerald-100/80 text-sm font-medium">
            Grow smarter. Sell better. Earn more.
          </p>
        </div>

        {/* Decorative Background Blur */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* RIGHT SIDE — OTP VERIFICATION CARD */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-12 flex flex-col justify-center items-center relative min-h-[calc(100vh-200px)] lg:min-h-screen">
        {/* Centered White OTP Card */}
        <div className="w-full max-w-[440px] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/80 text-center my-auto">
          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#173f31] tracking-tight">
            {t.otp.title}
          </h1>

          {/* Subtitle & Masked Mobile Number */}
          <div className="mt-2 text-xs sm:text-sm text-gray-600 font-medium">
            <p>{t.otp.subtitle}</p>
            <p className="mt-1 font-semibold text-gray-900 text-sm tracking-wide">
              {formatMaskedMobile(rawMobile)}
            </p>
          </div>

          {demoOtp && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 font-semibold">
              {t.otp.demoOtp}: <span className="tracking-[0.2em]">{demoOtp}</span>
            </div>
          )}

          {/* OTP Verification Form */}
          <form onSubmit={handleVerify} className="mt-8">
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-label={`Digit ${index + 1} of verification code`}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-xl sm:text-2xl font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#173f31] focus:ring-2 focus:ring-[#173f31]/20 transition-all"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-600 font-medium mt-3 text-center">
                {error}
              </p>
            )}

            {/* Verify & Continue Button */}
            <button
              type="submit"
              className="w-full mt-7 py-3.5 px-6 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-semibold text-base shadow-md shadow-[#173f31]/15 hover:shadow-lg transition-all duration-200 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              {t.common.verifyContinue}
            </button>
          </form>

          {/* Resend OTP & Change Mobile Actions */}
          <div className="mt-6 space-y-3">
            {/* Resend OTP Link */}
            <div className="text-xs sm:text-sm text-gray-600">
              <span>Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`font-semibold transition-colors ${
                  canResend
                    ? 'text-emerald-700 hover:text-[#173f31] hover:underline cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {canResend ? t.otp.resend : `${t.otp.resendIn} ${timer}s`}
              </button>
            </div>

            {/* Change Mobile Number Link */}
            <div>
              <button
                type="button"
                onClick={() => navigate('/auth')}
                className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#173f31] hover:underline cursor-pointer"
              >
                {t.otp.changeMobile}
              </button>
            </div>
          </div>

          {/* Divider & Security Badge */}
          <div className="mt-8 pt-6 border-t border-gray-200/80">
            <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
              <Lock size={14} className="text-gray-400" />
              <span>{t.otp.secureText}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating AI Button */}
      <AIButton />
    </div>
  );
}

export default OTPPage;