import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import api from '../services/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatField from '../assets/wheat-field.png';
import riceImg from '../assets/rice.jpg';
import maizeImg from '../assets/maize.jpg';
import mustardImg from '../assets/mustard.jpg';
import chickpeaImg from '../assets/chickpea.jpg';
import cottonImg from '../assets/cotton.jpg';
import tomatoImg from '../assets/tomato.jpg';
import { AIButton } from '../components/AIButton';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Bell,
  Menu,
  X
} from 'lucide-react';

/**
 * CropDetailsPage component for AGROVA Farmer Platform.
 * Matches original UI design reference:
 * 1. Header/Navbar with AGROVA brand, 7 nav tabs ("My Crops" active underline), bell, Rajesh profile avatar.
 * 2. "← {tx('back')}" navigation link.
 * 3. Main Crop Card with wheat image, "Wheat" title overlay near bottom-left.
 * 4. 4-column Information Section ({tx('cropAdded')}, {tx('cropType')}, {tx('status')} ● {tx('active')}, {tx('fertilizer')} NPK {tx('applied')}).
 * 5. Action Buttons (Dark green "{tx('change')}" button with Pencil icon & Red outlined "{tx('remove')}" button with Trash icon).
 * 6. Footer & Floating AI Assistant Button.
 */
export function CropDetailsPage() {
  const navigate = useNavigate();
  const tx = usePageText('cropDetails');
  const { cropId } = useParams();
  const [crop, setCrop] = useState(null);
  const [removeError, setRemoveError] = useState('');
  const [activeTab, setActiveTab] = useState('My Crops');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const cropImages = { wheat: wheatField, rice: riceImg, paddy: riceImg, maize: maizeImg, mustard: mustardImg, chickpea: chickpeaImg, cotton: cottonImg, tomato: tomatoImg };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';
    api.getCrops(userId)
      .then((response) => setCrop((response.crops || []).find((item) => item.id === cropId) || null))
      .catch(() => {});
  }, [cropId]);

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      navigate('/dashboard');
    } else if (tabName === 'My Crops') {
      navigate('/my-crops');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="myCrops" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* {tx('back')} Link */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/my-crops')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#173f31] transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{tx('back')}</span>
          </button>
        </div>
        {removeError && <p className="text-sm text-red-600">{removeError}</p>}

        {/* Main Centered Crop Detail Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs overflow-hidden p-6 sm:p-8 space-y-6">
          
          {/* Top Wheat Field Image with Title Overlay */}
          <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={cropImages[(crop?.name || 'wheat').toLowerCase().split(' ')[0]] || wheatField}
              alt={`${crop?.name || 'Wheat'} crop`}
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* "Wheat" Title Overlay near bottom-left */}
            <div className="absolute bottom-4 left-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                {crop?.name || 'Wheat'}
              </h1>
            </div>
          </div>

          {/* 4-Column Information Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Column 1: {tx('cropAdded')} */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                {tx('cropAdded')}
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                27 Aug
              </span>
              <span className="text-xs font-medium text-gray-500 block">
                2026
              </span>
            </div>

            {/* Column 2: {tx('cropType')} */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                {tx('cropType')}
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                Cereal
              </span>
            </div>

            {/* Column 3: {tx('status')} */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                {tx('status')}
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-base font-extrabold text-emerald-800">
                  {tx('active')}
                </span>
              </div>
            </div>

            {/* Column 4: {tx('fertilizer')} */}
            <div className="bg-[#f8faf9] rounded-2xl p-4 border border-gray-200/60 space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                {tx('fertilizer')}
              </span>
              <span className="text-base font-extrabold text-[#173f31] block">
                NPK (12:32:16)
              </span>
              <span className="text-xs font-semibold text-emerald-700 block">
                {tx('applied')}
              </span>
            </div>

          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/select-crop?replace=${encodeURIComponent(cropId || '')}`)}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Pencil size={18} />
              <span>{tx('change')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(tx('removeConfirm'))) {
                  const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';
                  api.deleteCrop(userId, cropId)
                    .then(() => navigate('/my-crops'))
                    .catch((error) => setRemoveError(error.message));
                }
              }}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 text-red-600 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 size={18} />
              <span>{tx('remove')}</span>
            </button>
          </div>

        </div>

      </main>

      {/* ==================== 3. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Farm Management. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 4. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => navigate('/dashboard')} />

    </div>
  );
}

export default CropDetailsPage;
