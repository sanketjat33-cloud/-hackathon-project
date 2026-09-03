import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatField from '../assets/wheat-field.png';
import riceImg from '../assets/rice.jpg';
import maizeImg from '../assets/maize.jpg';
import mustardImg from '../assets/mustard.jpg';
import chickpeaImg from '../assets/chickpea.jpg';
import cottonImg from '../assets/cotton.jpg';
import tomatoImg from '../assets/tomato.jpg';
import { AIButton } from '../components/AIButton';
import { useLanguage } from '../hooks/useLanguage';
import api from '../services/api';
import {
  Sprout,
  Plus,
  ChevronRight,
  Bell,
  Menu,
  X,
  Mic
} from 'lucide-react';

/**
 * MyCropsPage component for AGROVA Farmer Platform.
 * Clean 2-column layout matching reference screenshot:
 * 1. Navbar with AGROVA branding, 7 exact tabs (My Crops active underline), notification bell, Rajesh avatar.
 * 2. Heading "My Crops" with short dark-green underline & "Your selected crops" subtitle.
 * 3. 2-column Crop Grid: Wheat Crop card (with image, {tx('cereal')} badge, View details button) & Add New Crop dashed card.
 * 4. Footer with copyright notice.
 * 5. Floating mint-green microphone AI assistant button.
 */
export function MyCropsPage() {
  const navigate = useNavigate();
  const tx = usePageText('myCrops');
  const { t } = useLanguage();
  const [crops, setCrops] = useState([]);
  const [activeTab, setActiveTab] = useState('myCrops');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailCrop, setSelectedDetailCrop] = useState(null);
  const [cropType, setCropType] = useState('Paddy / Rice');
  const [field, setField] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);
  const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';
  const cropImages = { wheat: wheatField, rice: riceImg, paddy: riceImg, maize: maizeImg, mustard: mustardImg, chickpea: chickpeaImg, cotton: cottonImg, tomato: tomatoImg };
  useEffect(() => {
    api.getCrops(userId).then((response) => setCrops(response.crops || [])).catch((error) => {
      console.warn('Crop fetch failed:', error.message);
    });
  }, [userId]);
  const handleAddCrop = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const response = await api.addCrop(userId, { name: cropType, field });
      const refreshed = await api.getCrops(userId);
      setCrops(refreshed.crops || response.crops || []);
      setField('');
      setIsAddModalOpen(false);
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setSaving(false);
    }
  };
  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'myCrops', label: t.nav.myCrops },
    { key: 'cropRoadmap', label: t.nav.cropRoadmap },
    { key: 'sellCrop', label: t.nav.sellCrop },
    { key: 'bids', label: t.nav.bids },
    { key: 'market', label: t.nav.market },
    { key: 'governmentSchemes', label: t.nav.governmentSchemes },
  ];

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'home') {
      navigate('/dashboard');
    } else if (tabName === 'myCrops') {
      navigate('/my-crops');
    } else if (tabName === 'cropRoadmap') {
      navigate('/crop-roadmap');
    } else if (tabName === 'sellCrop') {
      navigate('/sell-crop');
    } else if (tabName === 'bids') {
      navigate('/bids');
    } else if (tabName === 'market') {
      navigate('/market');
    } else if (tabName === 'governmentSchemes') {
      navigate('/government-schemes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="myCrops" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Heading Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {tx('title')}
          </h1>
          <div className="w-12 h-1 bg-[#173f31] rounded-full"></div>
          <p className="text-sm font-medium text-gray-600 pt-1">
            {tx('subtitle')}
          </p>
        </div>

        {/* 3. TWO-COLUMN CROP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          
          {crops.map((crop) => <div key={crop.id} className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group">
            
            {/* Top Image Portion with Overlay Badge */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={cropImages[crop.name.toLowerCase().split(' ')[0]] || wheatField}
                alt={`${crop.name} crop`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Bottom-left overlay badge: {tx('cereal')} with leaf icon */}
              <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                <Sprout size={14} className="text-emerald-400" />
                <span>{tx('cereal')}</span>
              </div>
            </div>

            {/* Card Content & Action Button */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#173f31]">
                  {crop.name}
                </h3>
              </div>

              {/* Bottom Light-Gray Button Container */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDetailCrop(crop);
                  setIsDetailModalOpen(true);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition flex items-center justify-between cursor-pointer group-hover:bg-emerald-50 group-hover:text-[#173f31]"
              >
                <span>{t.features.viewDetails || tx('details')}</span>
                <ChevronRight size={16} className="text-gray-500 group-hover:text-[#173f31] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>)}

          {/* RIGHT CARD: ADD NEW CROP CARD */}
          <div 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white rounded-3xl border-2 border-dashed border-gray-300 hover:border-emerald-600 hover:bg-emerald-50/20 transition p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer min-h-[320px] sm:min-h-[340px] group shadow-2xs"
          >
            {/* Plus Icon inside Light-Gray Rounded Square */}
            <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-emerald-100 group-hover:text-[#173f31] text-gray-500 flex items-center justify-center transition">
              <Plus size={28} />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#173f31]">
                {t.features.addCrop}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {t.features.trackAnother}
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* ==================== 4. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agriculture Solutions. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating AI Assistant Button (Reusing exact Home/Dashboard AIButton component) */}
      <AIButton onClick={() => navigate('/dashboard')} />

      {/* Add New Crop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#173f31]">{t.features.addCrop}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">{t.features.cropType}</label>
                <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full p-2.5 border border-gray-200 rounded-xl">
                  <option>Paddy / Rice</option>
                  <option>Mustard</option>
                  <option>Cotton</option>
                  <option>Sugarcane</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">{t.features.fieldArea}</label>
                <input type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder={t.features.fieldPlaceholder} className="w-full p-2.5 border border-gray-200 rounded-xl" />
              </div>
              {saveError && <p className="text-xs text-red-600">{saveError}</p>}
              <button
                onClick={handleAddCrop}
                disabled={saving}
                className="w-full py-3 bg-[#173f31] text-white font-bold rounded-xl cursor-pointer mt-2"
              >
                {saving ? t.features.saving : t.features.saveCrop}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Crop Details Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#173f31]">{selectedDetailCrop?.name || tx('details')}</h3>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 text-xs text-gray-700 font-medium">
              <p><strong>{tx('category')}:</strong> {tx('cereal')}</p>
              <p><strong>{tx('field')}:</strong> {selectedDetailCrop?.field || 'Field A (6.0 Acres)'}</p>
              <p><strong>{tx('stage')}:</strong> Vegetative Growth (Day 42)</p>
              <p><strong>{tx('health')}:</strong> Optimal (pH 6.8, Moisture 42%)</p>
              <p><strong>{tx('harvest')}:</strong> 15 Apr 2026</p>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-full py-2.5 bg-[#173f31] text-white font-bold rounded-xl cursor-pointer mt-3"
              >
                {tx('close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MyCropsPage;
