import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import { useLanguage } from '../hooks/useLanguage';
import { Bell, Menu, X } from 'lucide-react';

const items = [
  { key: 'home', path: '/dashboard' },
  { key: 'myCrops', path: '/my-crops' },
  { key: 'cropRoadmap', path: '/crop-roadmap' },
  { key: 'sellCrop', path: '/sell-crop' },
  { key: 'bids', path: '/bids' },
  { key: 'market', path: '/market' },
  { key: 'governmentSchemes', path: '/government-schemes' },
];

export function AppHeader({ activeKey, notification }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-40 shadow-2xs">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        <button type="button" className="flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => navigate('/dashboard')} aria-label="Agrova">
          <span className="w-10 h-10 rounded-xl bg-[#173f31] text-white flex items-center justify-center p-1.5 overflow-hidden shadow-xs">
            <img src={agrovaLogo} alt="Agrova logo" className="w-full h-full object-contain" />
          </span>
          <span className="text-xl font-extrabold tracking-wider text-[#173f31] uppercase leading-none">AGROVA</span>
        </button>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 h-full" aria-label="Primary navigation">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => navigate(item.path)}
              className={`h-full inline-flex items-center px-1 text-xs xl:text-sm font-semibold transition-all cursor-pointer border-b-2 ${
                activeKey === item.key ? 'border-[#173f31] text-[#173f31] font-bold' : 'border-transparent text-gray-600 hover:text-[#173f31]'
              }`}
            >
              {t.nav[item.key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <button type="button" aria-label={t.common.notifications || 'Notifications'} onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer">
              <Bell size={20} />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h4 className="text-xs font-bold text-[#173f31]">{t.common.notifications || 'Notifications'} (2)</h4>
                  <button type="button" onClick={() => setNotificationsOpen(false)} className="text-[11px] text-gray-400 hover:text-gray-600">{t.common.close}</button>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-medium">{notification || t.common.notificationText || ''}</div>
              </div>
            )}
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-[#173f31] hidden sm:inline">Rajesh</span>
            <span className="w-9 h-9 rounded-full bg-[#173f31] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-emerald-100/80">RJ</span>
          </div>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-[#173f31] hover:bg-gray-100 transition cursor-pointer" aria-label={t.common.menu || 'Menu'}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 p-4 shadow-lg z-50 space-y-1">
          {items.map((item) => (
            <button key={item.key} type="button" onClick={() => { navigate(item.path); setMobileOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${activeKey === item.key ? 'bg-[#173f31] text-white font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
              {t.nav[item.key]}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default AppHeader;
