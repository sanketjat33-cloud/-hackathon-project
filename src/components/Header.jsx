import React from 'react';
import agrovaLogo from '../assets/agrova-logo.png';

/**
 * Header component for the Agrova Language Selection Page.
 * Features white background, dark agricultural green branding, 52-54px logo image, 24-26px AGROVA wordmark, and tagline.
 */
export function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200/80 h-[72px] flex items-center sticky top-0 z-50">
            <div className="max-w-6xl w-full mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between">
                {/* Brand & Logo Area (Positioned slightly left) */}
                <div className="flex items-center gap-3.5 -ml-0.5 sm:-ml-1">
                    {/* Agrova Logo Container (52-54px) */}
                    <div className="w-[52px] h-[52px] sm:w-[54px] sm:h-[54px] rounded-xl bg-[#173f31] text-white flex items-center justify-center shadow-xs flex-shrink-0 overflow-hidden">
                        <img
                            src={agrovaLogo}
                            alt="Agrova logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Brand Name (24-26px) & Stacked Tagline */}
                    <div className="flex flex-col text-left">
                        <span className="text-[24px] sm:text-[26px] font-extrabold tracking-wider text-[#173f31] uppercase leading-tight">
                            AGROVA
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-medium text-gray-500 leading-tight mt-0.5">
                            Grow better. Sell smarter. Earn more.
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
