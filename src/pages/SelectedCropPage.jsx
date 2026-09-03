import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import wheatImg from '../assets/wheat-field.png';
import riceImg from '../assets/rice.jpg';
import maizeImg from '../assets/maize.jpg';
import mustardImg from '../assets/mustard.jpg';
import chickpeaImg from '../assets/chickpea.jpg';
import cottonImg from '../assets/cotton.jpg';
import tomatoImg from '../assets/tomato.jpg';
import { AIButton } from '../components/AIButton';
import api from '../services/api';
import { useLanguage } from '../hooks/useLanguage';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Image Mapping for Crop Catalog
 */
const cropImageMap = {
  wheat: { name: 'Wheat', image: wheatImg },
  rice: { name: 'Rice', image: riceImg },
  maize: { name: 'Maize', image: maizeImg },
  mustard: { name: 'Mustard', image: mustardImg },
  chickpea: { name: 'Chickpea', image: chickpeaImg },
  cotton: { name: 'Cotton', image: cottonImg },
  tomato: { name: 'Tomato', image: tomatoImg },
  other: { name: 'Other Crop', image: wheatImg }
};

/**
 * SelectedCropPage component for AGROVA Platform.
 * Displays the confirmation page for the selected crop with dynamic crop image and options.
 */
export function SelectedCropPage() {
  const navigate = useNavigate();
  const tx = usePageText('selectedCrop');
  const location = useLocation();
  const { cropId } = useParams();
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Determine selected crop dynamically from state or URL parameter
  const stateCrop = location.state?.selectedCrop;
  const paramCropKey = (cropId || stateCrop?.id || 'wheat').toLowerCase();
  
  const crop = stateCrop || cropImageMap[paramCropKey] || {
    id: paramCropKey,
    name: paramCropKey.charAt(0).toUpperCase() + paramCropKey.slice(1),
    image: cropImageMap[paramCropKey]?.image || wheatImg
  };

  const handleContinue = async () => {
    const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id;
    if (!userId) {
      navigate('/auth');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const response = await api.addCrop(userId, { name: crop.name, field: 'New Field', acres: 1 });
      navigate('/dashboard');
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangeCrop = () => {
    navigate('/select-crop');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100">
      
      {/* ==================== 1. MINIMAL TOP HEADER ==================== */}
      <AppHeader activeKey="myCrops" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center space-y-6">
        
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight text-center">
          {tx('title')}
        </h1>

        {/* 3. CENTERED SELECTED CROP CARD */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 w-full max-w-md space-y-5 text-center">
          
          {/* A. Dynamic Crop Image */}
          <div className="h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-2xs">
            <img
              src={crop.image || wheatImg}
              alt={crop.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* B. Dynamic Crop Name */}
          <div className="space-y-1.5 pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173f31]">
              {crop.name}
            </h2>

            {/* C. Status / Recommendation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-200/80">
              <CheckCircle2 size={13} className="text-emerald-700" />
              <span>{tx('season')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* D. Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-3.5 px-6 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-bold text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{saving ? t.features.saving : t.common.continue}</span>
              <ArrowRight size={16} />
            </button>

            {/* E. {tx('change')} Button */}
            <button
              type="button"
              onClick={handleChangeCrop}
              className="w-full py-3.5 px-6 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-[#173f31] font-bold text-sm transition flex items-center justify-center cursor-pointer"
            >
              {tx('change')}
            </button>
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        </div>

      </main>

      {/* ==================== 4. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => navigate('/dashboard?ai=1')} />

    </div>
  );
}

export default SelectedCropPage;
