import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LanguagePage from './pages/LanguagePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OTPPage from './pages/OTPPage';
import Dashboard from './pages/Dashboard.jsx';
import MyCropsPage from './pages/MyCropsPage.jsx';

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;