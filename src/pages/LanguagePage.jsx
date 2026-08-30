import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

import { LanguageCard } from '../components/LanguageCard';
import { AIButton } from '../components/AIButton';
import { languages } from '../data/languages';
import { useLanguage } from '../hooks/useLanguage';

/**
 * LanguagePage component for Agrova language selection.
 * Reduced vertical spacing between header, title, and language cards grid so cards sit higher up.
 */
export function LanguagePage() {
    const navigate = useNavigate();
    const { languageId, setLanguage, t } = useLanguage();

    const handleContinue = () => {
        const currentLang = languages.find(
            (l) => l.id === languageId
        );

        setLanguage(languageId);

        console.log('Selected language:', currentLang);

        navigate('/landing');
    };
    return (
        <div className="min-h-screen flex flex-col bg-[#f8faf9] text-[#173f31] relative pb-24">
            {/* Header */}
            <Header />

            {/* Main Content Container (Max width 1152px / 6xl) */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10">
                {/* Title & Header Section */}
                <div className="text-center max-w-[640px] mx-auto mb-5 sm:mb-6">
                    {/* Main Heading */}
                    <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold tracking-tight text-[#173f31] leading-tight">
                        {t.language.title}
                    </h1>

                    {/* Hindi Subtitle */}
                    <p className="text-[17px] sm:text-[20px] lg:text-[22px] font-medium text-[#173f31]/90 mt-1 sm:mt-1.5">
                        {t.language.subtitle}
                    </p>

                    {/* Description */}
                    <div className="mt-2.5 sm:mt-3 text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
                        <p>{t.language.description1}</p>
                        <p>{t.language.description2}</p>
                    </div>
                </div>

                {/* Language Grid: 1 col Mobile, 2 cols Tablet, 4 cols Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4 sm:gap-y-5">
                    {languages.map((lang) => (
                        <LanguageCard
                            key={lang.id}
                            language={lang}
                            selected={languageId === lang.id}
                            onClick={() => setLanguage(lang.id)}
                        />
                    ))}
                </div>

                {/* Action Area Below Grid */}
                <div className="mt-7 sm:mt-9 flex flex-col items-center">
                    {/* Visual Element: More Languages */}
                    <div
                        className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-[#173f31] transition-colors cursor-pointer mb-5"
                        role="button"
                        tabIndex={0}
                        aria-label="More Languages"
                    >
                        <span>{t.common.moreLanguages}</span>
                        <span className="text-gray-300">|</span>
                        <span>{t.language.subtitle}</span>
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>

                    {/* Continue Button */}
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full max-w-xs sm:w-[220px] py-3.5 px-6 rounded-[12px] bg-[#173f31] hover:bg-[#102d23] text-white font-semibold text-base shadow-md shadow-[#173f31]/15 hover:shadow-lg transition-all duration-200 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                        {t.common.continue}
                    </button>
                </div>
            </main>

            {/* Floating AI Assistance Button */}
            <AIButton />
        </div>
    );
}

export default LanguagePage;
