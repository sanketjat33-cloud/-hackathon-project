import React from 'react';
import farmerHero from '../assets/farmer-hero.png';
import { LandingHeader } from '../components/LandingHeader';
import { AIButton } from '../components/AIButton';
import { useNavigate } from 'react-router-dom';
import { Sprout, Sun, Store } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

function LandingPage() {

    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#f8faf9]">

            {/* Existing Agrova Header */}
            <LandingHeader />

            {/* Landing Page Content */}
            <main>
                {/* Floating Agrova AI Button */}
                <AIButton onClick={() => navigate('/dashboard')} />

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* Left Side */}
                        <div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#173f31]">
                                {t.landing.heroTitle}
                            </h1>

                            <div className="mt-7 space-y-4 text-lg text-gray-700">

                                <p className="flex items-center gap-3">
                                    <span className="text-2xl text-[#173f31]">🌱</span>
                                    {t.landing.heroLine1}
                                </p>

                                <p className="flex items-center gap-3">
                                    <Sun
                                        size={26}
                                        strokeWidth={2}
                                        className="text-[#173f31]"
                                    />
                                    {t.landing.heroLine2}
                                </p>

                                <p className="flex items-center gap-3">
                                    <span className="text-2xl text-[#173f31]">☀️</span>
                                    {t.landing.heroLine3}
                                </p>

                            </div>

                            <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">

                                <button
                                    type="button"
                                    onClick={() => navigate('/auth')}
                                    className="px-7 py-3.5 rounded-xl bg-[#173f31] text-white font-semibold shadow-md hover:bg-[#113126] transition-all duration-200"
                                >
                                    {t.landing.ctaStart}
                                </button>

                                <p className="text-[#173f31]">
                                    {t.landing.alreadyAccount}{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/auth')}
                                        className="font-semibold hover:underline"
                                    >
                                        {t.landing.login}
                                    </button>
                                </p>

                            </div>

                        </div>

                        {/* Right Side - Image */}
                        <div className="flex justify-center lg:justify-end">

                            <div className="w-full max-w-xl">
                                <img
                                    src={farmerHero}
                                    alt="Farmer working in an agricultural field"
                                    className="w-full aspect-square object-cover rounded-[32px]"
                                />
                            </div>

                        </div>

                    </div>

                </section>
                {/* Features Section */}
                <section className="bg-white py-16 sm:py-20">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#173f31]">
                            {t.landing.featuresTitle}
                        </h2>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Grow Better */}
                            <div className="relative min-h-[230px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-emerald-50"></div>

                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <Sprout
                                        size={26}
                                        strokeWidth={2}
                                        className="text-[#173f31]"
                                    />
                                </div>

                                <h3 className="relative mt-5 text-2xl font-semibold text-[#111827]">
                                    Grow Better
                                </h3>

                                <p className="relative mt-3 text-base leading-relaxed text-gray-600">
                                    Get simple guidance for your crops. From planting to
                                    harvesting, access expert advice tailored to your land.
                                </p>

                            </div>

                            {/* Protect Better */}
                            <div className="relative min-h-[230px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-emerald-50"></div>

                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <Sun
                                        size={26}
                                        strokeWidth={2}
                                        className="text-[#173f31]"
                                    />
                                </div>

                                <h3 className="relative mt-5 text-2xl font-semibold text-[#111827]">
                                    Protect Better
                                </h3>

                                <p className="relative mt-3 text-base leading-relaxed text-gray-600">
                                    Know the weather and protect your crops. Receive timely
                                    alerts for adverse conditions and disease outbreaks.
                                </p>

                            </div>

                            {/* Sell Better */}
                            <div className="relative min-h-[230px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl bg-emerald-50"></div>

                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <Store
                                        size={26}
                                        strokeWidth={2}
                                        className="text-[#173f31]"
                                    />
                                </div>

                                <h3 className="relative mt-5 text-2xl font-semibold text-[#111827]">
                                    Sell Better
                                </h3>

                                <p className="relative mt-3 text-base leading-relaxed text-gray-600">
                                    Connect with buyers and get better offers. Access live
                                    market prices and secure fair deals for your harvest.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>
                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                            <p className="text-sm text-gray-500">
                                {t.landing.footer}
                            </p>

                            <div className="flex items-center gap-6 text-sm text-gray-500">

                                <button
                                    type="button"
                                    className="hover:text-[#173f31] transition-colors"
                                >
                                    Privacy Policy
                                </button>

                                <button
                                    type="button"
                                    className="hover:text-[#173f31] transition-colors"
                                >
                                    Terms of Service
                                </button>

                            </div>

                        </div>

                    </div>

                </footer>

            </main>

        </div>
    );
}

export default LandingPage;
