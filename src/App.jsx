import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LanguagePage from './pages/LanguagePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OTPPage from './pages/OTPPage';
import Dashboard from './pages/Dashboard.jsx';
import MyCropsPage from './pages/MyCropsPage.jsx';
import AllPagesPage from './pages/AllPagesPage.jsx';
import CropDetailsPage from './pages/CropDetailsPage.jsx';
import SelectCropPage from './pages/SelectCropPage.jsx';
import SelectedCropPage from './pages/SelectedCropPage.jsx';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage.jsx';
import SchemeMatcherPage from './pages/SchemeMatcherPage.jsx';
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
        {/* All Pages Overview */}
        <Route path="/all-pages" element={<AllPagesPage />} />
        <Route path="/pages" element={<AllPagesPage />} />

        <Route path="/select-crop" element={<SelectCropPage />} />
        <Route path="/add-crop" element={<SelectCropPage />} />
        <Route path="/selected-crop" element={<SelectedCropPage />} />
        <Route path="/selected-crop/:cropId" element={<SelectedCropPage />} />
        <Route path="/my-crops/:cropId" element={<CropDetailsPage />} />
        <Route path="/crops/:cropId" element={<CropDetailsPage />} />
        <Route path="/government-schemes" element={<GovernmentSchemesPage />} />
        <Route path="/scheme-matcher" element={<SchemeMatcherPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/sell-crop" element={<SellCropPage />} />
        <Route path="/sell" element={<SellCropPage />} />
        <Route path="/bids" element={<BidsPage />} />
        <Route path="/my-bids" element={<BidsPage />} />
        <Route path="/update-progress" element={<ProgressUpdatePage />} />
        <Route path="/update-progress/:cropId" element={<ProgressUpdatePage />} />
        <Route path="/progress-update" element={<ProgressUpdatePage />} />
        <Route path="/crop-roadmap" element={<CropRoadmapPage />} />
        <Route path="/roadmap" element={<CropRoadmapPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;