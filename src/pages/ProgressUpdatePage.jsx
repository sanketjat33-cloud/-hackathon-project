import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import { AIButton } from '../components/AIButton';
import {
  Calendar,
  Camera,
  Upload,
  Sprout,
  Hourglass,
  AlertTriangle,
  HelpCircle,
  Mic,
  Sparkles,
  CheckCircle2,
  Bell,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Check
} from 'lucide-react';

const growthStatusOptions = [
  { id: 'Growing Well', label: 'Growing Well', icon: Sprout },
  { id: 'Growing Slowly', label: 'Growing Slowly', icon: Hourglass },
  { id: 'Growth Problem', label: 'Growth Problem', icon: AlertTriangle },
  { id: 'Not Sure', label: 'Not Sure', icon: HelpCircle }
];

/**
 * ProgressUpdatePage component for AGROVA Platform.
 * Displays Today's Growth form on left column and Crop Summary, AI Insight, Trend Chart, and Recent Log on right column.
 */
export function ProgressUpdatePage() {
  const navigate = useNavigate();
  const tx = usePageText('progress');
  const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';

  // Navigation State
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Form State
  const [growthStatus, setGrowthStatus] = useState('Growing Well');
  const [plantHeight, setPlantHeight] = useState('18');
  const [observationNotes, setObservationNotes] = useState('');
  const [photos, setPhotos] = useState([wheatImg]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    }
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, wheatImg]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaved(true);
    try {
      await api.saveProgress(userId, { growthStatus, plantHeight, observationNotes, photos });
      navigate('/dashboard');
    } catch (error) {
      setIsSaved(false);
      console.warn('Progress save failed:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. TOP NAVBAR ==================== */}
      <AppHeader activeKey="cropRoadmap" notification={tx('notification')} />

      {/* ==================== 2. MAIN PAGE LAYOUT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        
        {/* TWO-COLUMN DESKTOP LAYOUT */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: GROWTH UPDATE FORM (7-8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Heading & Day Badge */}
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
                {tx('title')}
              </h1>
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-extrabold inline-flex items-center gap-1.5 shadow-2xs">
                <Calendar size={14} className="text-emerald-700" />
                <span>{tx('day')} 48</span>
              </span>
            </div>

            {/* 3. LEFT FORM CARD */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-2xs space-y-6">
              
              {/* {tx('photo')} */}
              <div className="space-y-3">
                <h2 className="text-base font-extrabold text-[#173f31]">
                  {tx('photo')}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera size={16} />
                    <span>{tx('take')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload size={16} />
                    <span>{tx('upload')}</span>
                  </button>
                </div>

                {/* Photo Previews */}
                {photos.length > 0 && (
                  <div className="flex items-center gap-3 pt-1">
                    {photos.map((p, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                        <img src={p} alt={`Growth ${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* {tx('how')} (2x2 Grid) */}
              <div className="space-y-3">
                <h2 className="text-base font-extrabold text-[#173f31]">
                  {tx('how')}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {growthStatusOptions.map((option) => {
                    const isSelected = growthStatus === option.id;
                    const IconComp = option.icon;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setGrowthStatus(option.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center space-y-2 relative ${
                          isSelected
                            ? 'border-[#173f31] bg-emerald-50/50 ring-2 ring-emerald-500/20'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 bg-[#173f31] text-white p-0.5 rounded-full">
                            <Check size={10} />
                          </div>
                        )}
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#173f31] text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <IconComp size={20} />
                        </div>
                        <span className="text-xs font-extrabold text-[#173f31]">
                          {option.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* {tx('height')} */}
              <div className="space-y-2">
                <h2 className="text-base font-extrabold text-[#173f31]">
                  {tx('height')}
                </h2>

                <div className="relative">
                  <input
                    type="number"
                    value={plantHeight}
                    onChange={(e) => setPlantHeight(e.target.value)}
                    className="w-full pr-12 pl-4 py-3.5 bg-[#f8faf9] border border-gray-200 rounded-2xl text-base font-extrabold text-[#173f31] focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31]"
                  />
                  <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-extrabold text-gray-400">
                    cm
                  </span>
                </div>
              </div>

              {/* {tx('notes')} */}
              <div className="space-y-2">
                <h2 className="text-base font-extrabold text-[#173f31]">
                  {tx('notes')}
                </h2>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={observationNotes}
                    onChange={(e) => setObservationNotes(e.target.value)}
                    placeholder={tx('placeholder')}
                    className="w-full p-4 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium text-[#173f31] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31] resize-none"
                  />

                  {/* Microphone Voice Note Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecording(!isRecording);
                      if (!isRecording) {
                        setObservationNotes("Leaves looking strong. Soil moisture feels adequate.");
                      }
                    }}
                    className={`absolute bottom-3 right-3 p-2 rounded-xl transition cursor-pointer ${
                      isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    title="Voice input observation"
                  >
                    <Mic size={16} />
                  </button>
                </div>
              </div>

              {/* {tx('save')} Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#173f31] hover:bg-[#113126] text-white font-extrabold text-base transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSaved ? tx('saving') : tx('save')}</span>
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

          {/* RIGHT COLUMN: CARDS (4-5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 4. CROP PROGRESS SUMMARY CARD */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#173f31] text-white flex items-center justify-center font-bold">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#173f31]">Wheat</h3>
                    <span className="text-xs text-gray-500 font-medium">Sown: 15 Nov 2026</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80">
                  Day 48 of 120
                </span>
              </div>

              {/* Horizontal Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#173f31] rounded-full w-[40%]" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Vegetative Phase</span>
                  <span>40% Completed</span>
                </div>
              </div>
            </div>

            {/* 5. AGROVA AI INSIGHT CARD */}
            <div className="bg-emerald-50/90 rounded-3xl border border-emerald-200/90 p-5 sm:p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#173f31]">
                <Sparkles size={18} className="text-emerald-700" />
                <h3 className="text-base font-extrabold">
                  Agrova AI Insight
                </h3>
              </div>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                "Growth is perfectly steady. Height is right on target for Day 48. Keep up the good work!"
              </p>
            </div>

            {/* 6. GROWTH TREND CARD */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-extrabold text-[#173f31]">
                Growth Trend (Height in cm)
              </h3>

              {/* Clean Line Chart */}
              <div className="w-full h-44 relative pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 140" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Trend Line */}
                  <path
                    d="M 0,110 L 80,90 L 160,70 L 240,50 L 320,35 L 400,20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Data Point Circles */}
                  <circle cx="0" cy="110" r="4" fill="#173f31" />
                  <circle cx="80" cy="90" r="4" fill="#173f31" />
                  <circle cx="160" cy="70" r="4" fill="#173f31" />
                  <circle cx="240" cy="50" r="4" fill="#173f31" />
                  <circle cx="320" cy="35" r="4" fill="#173f31" />
                  <circle cx="400" cy="20" r="5" fill="#173f31" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* X-Axis Labels */}
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 pt-2 border-t border-gray-100">
                  <span>Day 40 (15cm)</span>
                  <span>Day 42 (16cm)</span>
                  <span>Day 44 (17cm)</span>
                  <span>Day 46 (17.5cm)</span>
                  <span>Day 48 (18cm)</span>
                </div>
              </div>
            </div>

            {/* 7. RECENT LOG CARD */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-extrabold text-[#173f31]">
                Recent Log
              </h3>

              <div className="space-y-3 relative pl-4 border-l-2 border-emerald-200">
                {/* Timeline Entry 1 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#173f31]">Day 47</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">GOOD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={wheatImg} alt="Day 47" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-[#173f31]">17.5 cm</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Leaves looking strong. Soil moisture feels adequate.
                  </p>
                </div>

                {/* Timeline Entry 2 */}
                <div className="relative space-y-1 pt-2 border-t border-gray-100">
                  <div className="absolute -left-[23px] top-3.5 w-3 h-3 rounded-full bg-gray-400 border-2 border-white" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#173f31]">Day 46</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">GOOD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={wheatImg} alt="Day 46" className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-[#173f31]">16.8 cm</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Consistent growth observed.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </form>

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
      <AIButton onClick={() => navigate('/dashboard')} />

    </div>
  );
}

export default ProgressUpdatePage;
