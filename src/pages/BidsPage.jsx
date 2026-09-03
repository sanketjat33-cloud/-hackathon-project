import { AppHeader } from '../components/AppHeader';
import usePageText from '../hooks/usePageText';
import api from '../services/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agrovaLogo from '../assets/agrova-logo.png';
import { AIButton } from '../components/AIButton';
import {
  ShieldCheck,
  Star,
  MapPin,
  Truck,
  Clock,
  CheckCircle2,
  Bell,
  Menu,
  X,
  Sprout,
  ArrowRight,
  Coins,
  X as CloseIcon
} from 'lucide-react';

/**
 * Mock Bids Catalog Data Structure
 */
const mockBidsData = [
  {
    id: 'bid-1',
    buyerName: 'Raj Traders',
    isVerified: true,
    rating: '4.8',
    dealsCount: 120,
    location: 'Jaipur, Rajasthan',
    pickupAvailable: true,
    timeAgo: '2 hours ago',
    pricePerQtl: '₹2,550',
    priceNum: 2550,
    totalAmount: '₹1,27,500',
    quantity: '50 Qtl',
    isBestOffer: true,
    paymentTerms: 'Instant Bank Transfer upon Loading',
    pickupDate: 'Tomorrow, 31 Aug 2026'
  },
  {
    id: 'bid-2',
    buyerName: 'Shree Agro Traders',
    isVerified: true,
    rating: '4.2',
    dealsCount: 45,
    location: 'Sikar, Rajasthan',
    pickupAvailable: true,
    timeAgo: '4 hours ago',
    pricePerQtl: '₹2,480',
    priceNum: 2480,
    totalAmount: '₹1,24,000',
    quantity: '50 Qtl',
    isBestOffer: false,
    paymentTerms: 'Cash / UPI upon Weighment',
    pickupDate: 'In 2 Days, 01 Sep 2026'
  },
  {
    id: 'bid-3',
    buyerName: 'Kisan Wholesalers',
    isVerified: true,
    rating: '4.6',
    dealsCount: 88,
    location: 'Churu, Rajasthan',
    pickupAvailable: true,
    timeAgo: '6 hours ago',
    pricePerQtl: '₹2,450',
    priceNum: 2450,
    totalAmount: '₹1,22,500',
    quantity: '50 Qtl',
    isBestOffer: false,
    paymentTerms: 'Direct Mandi Transfer',
    pickupDate: 'Today Evening'
  }
];

/**
 * Reusable Summary Card Component
 */
function SummaryCard({ label, mainValue, subText, isDark = false }) {
  if (isDark) {
    return (
      <div className="bg-[#173f31] text-white p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-2 border border-[#113126]">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
          {label}
        </span>
        <div className="space-y-0.5">
          <span className="text-2xl sm:text-3xl font-extrabold block">
            {mainValue}
          </span>
          <span className="text-xs font-medium text-emerald-100/90 block">
            {subText}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-2">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="space-y-0.5">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#173f31] block">
          {mainValue}
        </span>
        <span className="text-xs font-semibold text-emerald-700 block">
          {subText}
        </span>
      </div>
    </div>
  );
}

/**
 * Reusable Bid Card Component
 */
function BidCard({ bid, onViewOffer, onAcceptBid }) {
  const tx = usePageText('bids');
  return (
    <div
      className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-2xs space-y-4 relative transition hover:shadow-md ${
        bid.isBestOffer
          ? 'border-emerald-500/80 ring-2 ring-emerald-500/15'
          : 'border-gray-200/90'
      }`}
    >
      {/* Best Offer Badge */}
      {bid.isBestOffer && (
        <div className="absolute top-4 right-4 bg-emerald-500 text-white font-extrabold px-3.5 py-1 rounded-full text-xs shadow-2xs flex items-center gap-1">
          <Coins size={13} />
          <span>{tx('best')}</span>
        </div>
      )}

      {/* Buyer Info & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-extrabold text-[#173f31]">
              {bid.buyerName}
            </h3>
            {bid.isVerified && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-200/80">
                <ShieldCheck size={12} className="text-emerald-700" />
                {tx('verified')}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              {bid.rating} ({bid.dealsCount} deals)
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-emerald-700" />
              {bid.location}
            </span>
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <Truck size={13} />
              {tx('pickup')}: {bid.pickupAvailable ? tx('available') : tx('selfDrop')}
            </span>
          </div>
        </div>

        <span className="text-xs text-gray-400 font-medium self-start sm:self-auto">
          {bid.timeAgo}
        </span>
      </div>

      {/* Offer Price & Payout Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{tx('offer')}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#173f31]">
              {bid.pricePerQtl}
            </span>
            <span className="text-xs text-gray-500 font-bold">/ Qtl</span>
          </div>
          <span className="text-xs font-extrabold text-emerald-800 block">
            Total for {bid.quantity}: {bid.totalAmount}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onViewOffer(bid)}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-800 text-xs font-bold transition cursor-pointer text-center"
          >
            {tx('view')}
          </button>

          <button
            type="button"
            onClick={() => onAcceptBid(bid)}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-center shadow-xs ${
              bid.isBestOffer
                ? 'bg-[#173f31] hover:bg-[#113126] text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200'
            }`}
          >
            {tx('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * BidsPage component for AGROVA Platform.
 * Displays wholesaler offers, crop metrics, bid comparisons, and action modals.
 */
export function BidsPage() {
  const navigate = useNavigate();
  const tx = usePageText('bids');

  // State Management
  const [activeTab, setActiveTab] = useState('Bids');
  const [selectedCropFilter, setSelectedCropFilter] = useState('Wheat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [viewingBid, setViewingBid] = useState(null);
  const [confirmingBid, setConfirmingBid] = useState(null);
  const userId = JSON.parse(localStorage.getItem('agrova_session') || 'null')?.id || 'demo-user';
  const [actionError, setActionError] = useState('');
  const [bids, setBids] = useState(mockBidsData);

  useEffect(() => {
    api.getBids(userId).then(({ bids: savedBids }) => {
      if (savedBids?.length) setBids(savedBids);
    }).catch((error) => console.warn('Bid fetch failed:', error.message));
  }, [userId]);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative font-sans selection:bg-emerald-100 pb-20">
      
      {/* ==================== 1. NAVBAR ==================== */}
      <AppHeader activeKey="bids" notification={tx('notification')} />

      {/* ==================== 2. MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        {actionError && <p className="text-sm font-medium text-red-600">{actionError}</p>}
        
        {/* PAGE HEADER */}
        <section className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173f31] tracking-tight">
            {tx('title')}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {tx('description')}
          </p>

          {/* Green Crop Filter Pill */}
          <div className="pt-1">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
              <Sprout size={14} className="text-emerald-700" />
              <span>{selectedCropFilter}</span>
            </span>
          </div>
        </section>

        {/* 3. SUMMARY CARDS (3 CARDS IN A ROW) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <SummaryCard
            label="YOUR CROP"
            mainValue="Wheat"
            subText="50 Quintals"
          />
          <SummaryCard
            label="BIDS RECEIVED"
            mainValue="3 Active"
            subText="+1 since yesterday"
          />
          <SummaryCard
            label="HIGHEST OFFER"
            mainValue="₹2,550 / Quintal"
            subText="Total: ₹1,27,500"
            isDark={true}
          />
        </section>

        {/* 4. BID LIST */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[#173f31] tracking-tight">
              Active Offers ({bids.length})
            </h2>
            <span className="text-xs font-bold text-gray-500">
              Sorted by highest price
            </span>
          </div>

          <div className="space-y-4">
            {bids.map((bid) => (
              <BidCard
                key={bid.id}
                bid={bid}
                onViewOffer={(targetBid) => setViewingBid(targetBid)}
                onAcceptBid={(targetBid) => setConfirmingBid(targetBid)}
              />
            ))}
          </div>
        </section>

      </main>

      {/* ==================== 5. VIEW OFFER MODAL ==================== */}
      {viewingBid && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#173f31]">
                  Offer Details — {viewingBid.buyerName}
                </h3>
                <span className="text-xs text-gray-500 font-medium">{viewingBid.location}</span>
              </div>
              <button onClick={() => setViewingBid(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">{tx('offered')}</span>
                  <span className="text-xl font-extrabold text-[#173f31]">{viewingBid.pricePerQtl} / Quintal</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">{tx('payout')}</span>
                  <span className="text-xl font-extrabold text-[#173f31]">{viewingBid.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-medium text-gray-500">{tx('payment')}</span>
                  <span className="font-bold text-gray-900">{viewingBid.paymentTerms}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-medium text-gray-500">{tx('scheduled')}</span>
                  <span className="font-bold text-gray-900">{viewingBid.pickupDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="font-medium text-gray-500">{tx('rating')}</span>
                  <span className="font-bold text-amber-600">⭐ {viewingBid.rating} ({viewingBid.dealsCount} {tx('deals')})</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    api.contactBuyer(userId, viewingBid.id).then(() => setViewingBid(null)).catch((error) => setActionError(error.message));
                  }}
                  className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition cursor-pointer"
                >
                  Contact Buyer
                </button>
                <button
                  onClick={() => {
                    const target = viewingBid;
                    setViewingBid(null);
                    setConfirmingBid(target);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-bold transition cursor-pointer"
                >
                  Accept Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ACCEPT BID CONFIRMATION MODAL ==================== */}
      {confirmingBid && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-gray-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#173f31] flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-xl text-[#173f31]">
                Confirm Bid Acceptance
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Are you sure you want to accept the offer of <strong className="text-gray-900">{confirmingBid.pricePerQtl}/Qtl</strong> from <strong className="text-gray-900">{confirmingBid.buyerName}</strong> for a total of <strong className="text-emerald-800">{confirmingBid.totalAmount}</strong>?
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setConfirmingBid(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                   api.acceptBid(userId, confirmingBid.id)
                     .then(() => setConfirmingBid(null))
                     .catch((error) => setActionError(error.message));
                }}
                className="flex-1 py-3 rounded-xl bg-[#173f31] hover:bg-[#113126] text-white font-bold text-xs transition cursor-pointer shadow-xs"
              >
                Confirm Acceptance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 7. FOOTER ==================== */}
      <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-auto py-6">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <a href="#about" className="hover:text-[#173f31] font-bold text-[#173f31]">Agrova</a>
            <span>•</span>
            <a href="#platform" className="hover:text-[#173f31]">Platform</a>
            <span>•</span>
            <a href="#support" className="hover:text-[#173f31]">Support</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#173f31]">Terms</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <span>© 2024 Agrova Agriculture Systems. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ==================== 6. FLOATING AI BUTTON ==================== */}
      <AIButton onClick={() => navigate('/dashboard')} />

    </div>
  );
}

export default BidsPage;
