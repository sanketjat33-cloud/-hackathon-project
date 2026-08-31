import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

const pages = [
  { name: 'Language', path: '/', description: 'Select language', color: 'from-emerald-500 to-green-700' },
  { name: 'Landing', path: '/landing', description: 'Main intro page', color: 'from-emerald-600 to-teal-700' },
  { name: 'Auth', path: '/auth', description: 'Login / sign in', color: 'from-green-600 to-lime-700' },
  { name: 'OTP', path: '/auth/otp', description: 'Verification flow', color: 'from-amber-500 to-orange-600' },
  { name: 'Dashboard', path: '/dashboard', description: 'Main farmer dashboard', color: 'from-teal-600 to-cyan-700' },
  { name: 'My Crops', path: '/my-crops', description: 'Crops management', color: 'from-lime-500 to-emerald-700' },
  { name: 'Select Crop', path: '/select-crop', description: 'Choose a crop to track', color: 'from-green-500 to-emerald-700' },
  { name: 'Crop Details', path: '/my-crops/wheat', description: 'View crop information', color: 'from-yellow-500 to-orange-700' },
  { name: 'Crop Roadmap', path: '/crop-roadmap', description: 'Plan crop activities', color: 'from-cyan-500 to-teal-700' },
  { name: 'Sell Crop', path: '/sell-crop', description: 'Create a crop listing', color: 'from-orange-500 to-amber-700' },
  { name: 'Bids', path: '/bids', description: 'Review buyer offers', color: 'from-blue-500 to-indigo-700' },
  { name: 'Market', path: '/market', description: 'View market prices', color: 'from-violet-500 to-purple-700' },
  { name: 'Government Schemes', path: '/government-schemes', description: 'Find farm support programs', color: 'from-rose-500 to-red-700' },
  { name: 'Progress Update', path: '/update-progress', description: 'Update crop progress', color: 'from-sky-500 to-blue-700' },
  { name: 'All Pages', path: '/all-pages', description: 'Complete page directory', color: 'from-slate-500 to-slate-700' },
];

function AllPagesPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] px-4 py-10 text-[#173f31]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm">
              <LayoutGrid size={16} />
              Agrova Page Index
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">All pages</h1>
          </div>
          <Link
            to="/landing"
            className="inline-flex items-center gap-2 rounded-xl bg-[#173f31] px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-[#113126]"
          >
            Go to landing <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${page.color}`} />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                {page.name === 'Language' && <Sparkles size={20} />}
                {page.name === 'Landing' && <Leaf size={20} />}
                {page.name === 'Auth' && <ShieldCheck size={20} />}
                {page.name === 'OTP' && <Sparkles size={20} />}
                {page.name === 'Dashboard' && <LayoutGrid size={20} />}
                {page.name === 'My Crops' && <Leaf size={20} />}
                {page.name === 'All Pages' && <LayoutGrid size={20} />}
              </div>

              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
                {page.path}
              </div>
              <h2 className="text-2xl font-bold text-[#173f31]">{page.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{page.description}</p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#173f31]">
                Open page <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPagesPage;
