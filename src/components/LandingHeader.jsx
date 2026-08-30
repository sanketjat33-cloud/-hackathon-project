import React, { useState } from 'react';
import agrovaLogo from '../assets/agrova-logo.png';
import { languages } from '../data/languages';
import { useLanguage } from '../hooks/useLanguage';

export function LandingHeader() {
    const { languageId: selectedLanguage, setLanguage, t } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(
        (lang) => lang.id === selectedLanguage
    );

    const handleLanguageChange = (languageId) => {
        setLanguage(languageId);
        setIsOpen(false);
    };

    return (
        <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-50">

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* LEFT — AGROVA BRAND */}
                <div className="flex items-center gap-3.5">

                    <div className="w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-xl bg-[#173f31] flex items-center justify-center shadow-xs flex-shrink-0 overflow-hidden">
                        <img
                            src={agrovaLogo}
                            alt="Agrova logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex flex-col text-left">
                        <span className="text-[24px] sm:text-[26px] font-extrabold tracking-wider text-[#173f31] uppercase leading-tight">
                            AGROVA
                        </span>

                        <span className="text-[11px] sm:text-[12px] font-medium text-gray-500 leading-tight mt-0.5">
                            {t.common.brandTagline}
                        </span>
                    </div>

                </div>


                {/* RIGHT — LANGUAGE SELECTOR */}
                <div className="relative">

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                    >

                        {/* Globe */}
                        <span className="text-gray-600 text-base">
                            🌐
                        </span>

                        {/* Selected Language */}
                        <span className="text-sm font-medium text-gray-700">
                            {currentLanguage?.native || 'हिन्दी'}
                        </span>

                        {/* Arrow */}
                        <span className="text-xs text-gray-400">
                            {isOpen ? '▲' : '▼'}
                        </span>

                    </button>


                    {/* DROPDOWN */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                            {languages.map((language) => (

                                <button
                                    key={language.id}
                                    type="button"
                                    onClick={() =>
                                        handleLanguageChange(language.id)
                                    }
                                    className={`w-full text-left px-4 py-3 text-sm transition hover:bg-gray-50 flex items-center justify-between ${selectedLanguage === language.id
                                        ? 'text-[#173f31] font-semibold bg-gray-50'
                                        : 'text-gray-700'
                                        }`}
                                >

                                    <span>
                                        {language.native}
                                    </span>

                                    {selectedLanguage === language.id && (
                                        <span className="text-emerald-600">
                                            ✓
                                        </span>
                                    )}

                                </button>

                            ))}

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default LandingHeader;