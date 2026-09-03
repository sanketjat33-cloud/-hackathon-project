import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import api from '../services/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import { AIButton } from '../components/AIButton';
import {
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Bell,
  Menu,
  X,
  Sprout,
  ShieldCheck,
  Landmark,
  Tractor,
  Coins,
  MoreVertical,
  MapPin,
  HelpCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

/**
 * {tx('title')} Catalog Data Structure
 */
const schemesData = [
  {
    id: 'pm-kisan',
    title: 'PM-KISAN',
    category: 'Money Support',
    badgeCategory: 'INCOME SUPPORT',
    benefit: '₹6,000 yearly income support',
    whoCanApply: 'Small & marginal farmers',
    statusBadge: 'Application Open',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200/80',
    categoryTagColor: 'bg-[#173f31] text-white',
    popularTag: 'Farmer support'
  },
  {
    id: 'pmfby',
    title: 'PM Fasal Bima Yojana',
    category: 'Crop Insurance',
    badgeCategory: 'INSURANCE',
    benefit: 'Low-premium crop insurance',
    whoCanApply: 'All farmers with crop loans',
    statusBadge: 'You may be eligible',
    statusBadgeColor: 'bg-blue-100 text-blue-900 border-blue-200/80',
    categoryTagColor: 'bg-blue-900 text-white',
    popularTag: 'Crop insurance'
  },
  {
    id: 'kcc',
    title: 'Kisan Credit Card',
    category: 'Loans',
    badgeCategory: 'FINANCE',
    benefit: 'Easy loans at low interest',
    whoCanApply: 'Owner & tenant farmers',
    statusBadge: 'Check eligibility',
    statusBadgeColor: 'bg-amber-100 text-amber-900 border-amber-200/80',
    categoryTagColor: 'bg-amber-900 text-white',
    popularTag: 'Loans'
  },
  {
    id: 'sub-mission-agri-mechanization',
    title: 'Sub-Mission on Agricultural Mechanization',
    category: 'Equipment',
    badgeCategory: 'EQUIPMENT',
    benefit: 'Up to 50% subsidy on farm machinery',
    whoCanApply: 'Individual farmers & SHGs',
    statusBadge: 'Application Open',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200/80',
    categoryTagColor: 'bg-emerald-900 text-white',
    popularTag: 'Equipment'
  },
  {
    id: 'certified-seed-subsidy',
    title: 'Certified Seed Subsidy Scheme',
    category: 'Seeds & Fertilizers',
    badgeCategory: 'SEEDS & FERTILIZERS',
    benefit: 'Subsidized high-yield certified seeds',
    whoCanApply: 'Registered district farmers',
    statusBadge: 'Available at local centre',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200/80',
    categoryTagColor: 'bg-teal-900 text-white',
    popularTag: 'Seeds'
  }
];

const categoryFilters = [
  { id: 'All Schemes', label: 'All Schemes', icon: FileText },
  { id: 'Money Support', label: 'Money Support', icon: Coins },
  { id: 'Crop Insurance', label: 'Crop Insurance', icon: ShieldCheck },
  { id: 'Loans', label: 'Loans', icon: Landmark },
  { id: 'Seeds & Fertilizers', label: 'Seeds & Fertilizers', icon: Sprout },
  { id: 'Equipment', label: 'Equipment', icon: Tractor },
  { id: 'Other', label: 'Other', icon: HelpCircle }
];

const popularQueries = [
  'Crop insurance',
  'Farmer support',
  'Seeds',
  'Fertilizer',
  'Loans',
  'Equipment'
];

/**
 * GovernmentSchemesPage component for AGROVA Platform.
 * Matches original UI reference with 2-column layout, search container, popular chips, category filters, schemes list, AI assessment card, and My Applications sidebar.
 */
export function GovernmentSchemesPage() {
  const navigate = useNavigate();
  const tx = usePageText('schemes');

  // State Management
  const [activeTab, setActiveTab] = useState('Government Schemes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Schemes');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [notice, setNotice] = useState('');
  const [applyingScheme, setApplyingScheme] = useState('');

  const handleApply = async (scheme) => {
    const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';
    setApplyingScheme(scheme.id);
    setNotice('');
    try {
      await api.submitSchemeApplication(userId, { schemeId: scheme.id, schemeTitle: scheme.title });
      setNotice(`Application submitted for ${scheme.title}.`);
    } catch (error) {
      setNotice(`Could not submit application: ${error.message}`);
    } finally {
      setApplyingScheme('');
    }
  };

  const handleSchemeMatch = () => navigate('/scheme-matcher');

  // Filter logic
  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesCategory =
      selectedCategory === 'All Schemes' || scheme.category === selectedCategory;
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.badgeCategory.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Home') {
      navigate('/dashboard');
    } else if (tabName === 'My Crops') {
      navigate('/my-crops');
    } else if (tabName === 'Government Schemes') {
      navigate('/government-schemes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="governmentSchemes" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        {notice && (
          <div role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-900">
            {notice}
          </div>
        )}
        
        {/* PAGE HEADER */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
              {tx('title')}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-600 max-w-2xl leading-relaxed">
              {tx('description')}
            </p>
          </div>

          {/* AI Scheme Matcher Button */}
          <button
            type="button"
            onClick={() => {
              handleSchemeMatch();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs self-start sm:self-auto flex-shrink-0"
          >
            <Sparkles size={16} className="text-emerald-300" />
            <span>{tx('matcher')}</span>
          </button>
        </section>

        {/* 3. SEARCH CONTAINER */}
        <section className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tx('search')}
              className="w-full pl-11 pr-4 py-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#173f31] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173f31]/20 focus:border-[#173f31] transition"
            />
          </div>

          {/* Popular Suggestions Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-extrabold text-gray-400 tracking-wider mr-1">
              POPULAR:
            </span>
            {popularQueries.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-semibold transition cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>

        </section>

        {/* 4. CATEGORY FILTERS */}
        <section className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  isSelected
                    ? 'bg-[#173f31] text-white border-[#173f31] shadow-2xs'
                    : 'bg-white text-gray-700 border-gray-200/90 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <IconComponent size={14} className={isSelected ? 'text-emerald-300' : 'text-gray-500'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </section>

        {/* 5. MAIN TWO-COLUMN CONTENT LAYOUT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: SCHEMES FOR YOU (7-8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
                Schemes For You
              </h2>
              <span className="text-xs font-bold text-gray-500">
                {filteredSchemes.length} Available
              </span>
            </div>

            {/* Scheme Cards List */}
            <div className="space-y-4">
              {filteredSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md transition space-y-4"
                >
                  {/* Card Top: Category Badge & Action */}
                  <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
                    <div className="space-y-1">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider inline-block ${scheme.categoryTagColor}`}>
                        {scheme.badgeCategory}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#173f31] pt-1">
                        {scheme.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery(scheme.title);
                        setNotice(`Showing details for ${scheme.title}.`);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173f31] hover:text-emerald-700 transition cursor-pointer"
                    >
                      <span>{tx('details')}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#f8faf9] p-3 rounded-2xl border border-gray-200/60 space-y-0.5">
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">{tx('benefit')}</span>
                      <span className="font-extrabold text-gray-900 text-sm block">{scheme.benefit}</span>
                    </div>

                    <div className="bg-[#f8faf9] p-3 rounded-2xl border border-gray-200/60 space-y-0.5">
                      <span className="text-gray-400 font-bold uppercase text-[10px] block">{tx('eligibility')}</span>
                      <span className="font-extrabold text-gray-900 text-sm block">{scheme.whoCanApply}</span>
                    </div>
                  </div>

                  {/* Card Bottom Status Badge */}
                  <div className="pt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center gap-1.5 ${scheme.statusBadgeColor}`}>
                      <CheckCircle2 size={13} />
                      <span>{scheme.statusBadge}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApply(scheme)}
                    disabled={applyingScheme === scheme.id}
                    className="w-full py-2.5 rounded-xl bg-[#173f31] hover:bg-[#113126] disabled:opacity-60 text-white text-xs font-bold transition cursor-pointer"
                  >
                    {applyingScheme === scheme.id ? 'Submitting…' : 'Apply Now'}
                  </button>
                </div>
              ))}

              {filteredSchemes.length === 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center space-y-2">
                  <p className="text-base font-bold text-gray-700">{tx('noResults')}</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All Schemes'); }}
                    className="text-xs font-bold text-[#173f31] underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Card 4: Green AI Assessment Card */}
              <div className="bg-gradient-to-r from-[#173f31] to-[#113126] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-4">
                <div className="relative z-10 space-y-2 max-w-lg">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <Sparkles size={13} />
                    <span>{tx('matching')}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    Not sure what to apply for?
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Let our AI analyze your farm profile and suggest the best schemes instantly.
                  </p>
                  <button
                    type="button"
                    onClick={handleSchemeMatch}
                    className="mt-2 px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 disabled:opacity-60 text-[#173f31] text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{tx('assessment')}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: MY APPLICATIONS & HELP PANELS (4-5 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 7. MY APPLICATIONS PANEL */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
              
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-[#173f31]">
                    My Applications
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                    2 Active
                  </span>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-3">
                
                {/* Application 1 */}
                <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 space-y-2 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#173f31]">
                        PM-KISAN
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold mt-1 inline-block">
                        Application Submitted
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === 'app1' ? null : 'app1')}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotice('Application status: Submitted and verified by Tehsildar.')}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 text-xs font-bold transition text-center cursor-pointer shadow-2xs"
                  >
                    View Status
                  </button>
                </div>

                {/* Application 2 */}
                <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-gray-200/70 space-y-2 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#173f31]">
                        Soil Health Card
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 text-[10px] font-bold mt-1 inline-block">
                        Under Review
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === 'app2' ? null : 'app2')}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotice('Application status: Sample collected; laboratory testing is under review.')}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 text-xs font-bold transition text-center cursor-pointer shadow-2xs"
                  >
                    View Status
                  </button>
                </div>

              </div>

              {/* Bottom History Link */}
              <div className="pt-1 text-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setNotice('Application history is shown in the applications panel.')}
                  className="text-xs font-bold text-[#173f31] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{tx('history')}</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>

            {/* 8. NEED HELP APPLYING PANEL */}
            <div className="bg-emerald-50/90 rounded-3xl border border-emerald-200/90 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#173f31]">
                <HelpCircle size={20} className="text-emerald-700" />
                <h3 className="text-base font-extrabold">
                  Need Help Applying?
                </h3>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                Common Service Centres (CSCs) can assist you with scheme applications for a nominal fee.
              </p>
              <button
                type="button"
                onClick={() => setNotice('Nearest CSC: Sangrur District CSC, open today until 5:00 PM.')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173f31] hover:text-emerald-800 transition cursor-pointer pt-1"
              >
                <MapPin size={14} className="text-emerald-700" />
                <span className="underline">{tx('nearby')}</span>
                <ArrowRight size={12} />
              </button>
            </div>

          </div>

        </section>

      </main>

      {/* ==================== 9. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © 2024 Agrova Agriculture Systems. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ==================== 10. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => navigate('/dashboard')} />

    </div>
  );
}

export default GovernmentSchemesPage;
