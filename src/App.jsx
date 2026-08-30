import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LanguagePage from './pages/LanguagePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OTPPage from './pages/OTPPage';
import Dashboard from './pages/Dashboard.jsx';
import MyCropsPage from './pages/MyCropsPage.jsx';
import CropDetailsPage from './pages/CropDetailsPage.jsx';
import SelectCropPage from './pages/SelectCropPage.jsx';
import SelectedCropPage from './pages/SelectedCropPage.jsx';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage.jsx';
import MarketPage from './pages/MarketPage.jsx';
import SellCropPage from './pages/SellCropPage.jsx';
import BidsPage from './pages/BidsPage.jsx';
import ProgressUpdatePage from './pages/ProgressUpdatePage.jsx';
import CropRoadmapPage from './pages/CropRoadmapPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Language Page */}
        <Route path="/" element={<LanguagePage />} />

        {/* Landing Page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Auth / Login Page */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        {/* OTP Verification Page */}
        <Route path="/auth/otp" element={<OTPPage />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* My Crops Page */}
        <Route path="/my-crops" element={<MyCropsPage />} />
        <Route path="/crops" element={<MyCropsPage />} />

        {/* Select / Add New Crop Page */}
        <Route path="/select-crop" element={<SelectCropPage />} />
        <Route path="/add-crop" element={<SelectCropPage />} />

        {/* Selected Crop Confirmation Page */}
        <Route path="/selected-crop" element={<SelectedCropPage />} />
        <Route path="/selected-crop/:cropId" element={<SelectedCropPage />} />

        {/* Crop Details Page */}
        <Route path="/my-crops/:cropId" element={<CropDetailsPage />} />
        <Route path="/crops/:cropId" element={<CropDetailsPage />} />

        {/* Government Schemes Page */}
        <Route path="/government-schemes" element={<GovernmentSchemesPage />} />

        {/* Market Page */}
        <Route path="/market" element={<MarketPage />} />

        {/* Sell Crop Page */}
        <Route path="/sell-crop" element={<SellCropPage />} />
        <Route path="/sell" element={<SellCropPage />} />

        {/* Bids Page */}
        <Route path="/bids" element={<BidsPage />} />
        <Route path="/my-bids" element={<BidsPage />} />

        {/* Progress Update Page */}
        <Route path="/update-progress" element={<ProgressUpdatePage />} />
        <Route path="/progress-update" element={<ProgressUpdatePage />} />

        {/* Crop Roadmap Page */}
        <Route path="/crop-roadmap" element={<CropRoadmapPage />} />
        <Route path="/roadmap" element={<CropRoadmapPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;