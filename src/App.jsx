import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LanguagePage from './pages/LanguagePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;