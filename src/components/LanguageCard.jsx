import React from 'react';

/**
 * LanguageCard component for selecting a language.
 * Prominent native typography (20-22px), secondary English typography (16-17px), and large symbol (30-34px).
 *
 * @param {Object} props
 * @param {Object} props.language - Object containing id, native, english, symbol
 * @param {boolean} props.selected - Whether the card is currently selected
 * @param {Function} props.onClick - Handler triggered when card is clicked
 */
export function LanguageCard({ language, selected = false, onClick }) {
  const { native = '', english = '', symbol = '' } = language || {};
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Select ${english || native}`}
      className={`
        group relative w-full p-5 rounded-2xl bg-white text-center transition-all duration-200 cursor-pointer
        flex flex-col items-center justify-between min-h-[175px]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
        ${
          selected
            ? 'border-2 border-emerald-600 shadow-md bg-emerald-50/20'
            : 'border-2 border-gray-200 hover:border-emerald-300 hover:shadow-sm hover:-translate-y-0.5'
        }
      `}
    >
      {/* Top-Right Checkmark Badge */}
      <div className="absolute top-3.5 right-3.5">
        {selected ? (
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50/60" />
        )}
      </div>

      {/* Language Symbol Area (30-34px) */}
      <div
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-[30px] sm:text-[34px] font-bold transition-colors mt-1
          ${
            selected
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-emerald-50/80 text-emerald-900 group-hover:bg-emerald-100/70'
          }
        `}
      >
        {symbol}
      </div>

      {/* Language Names */}
      <div className="mt-3 flex flex-col items-center">
        {/* Primary Native Name (20-22px) */}
        <span
          className={`text-[20px] sm:text-[22px] block leading-tight ${
            selected ? 'font-bold text-emerald-950' : 'font-bold text-gray-900'
          }`}
        >
          {native}
        </span>
        {/* Secondary English Name (16-17px) */}
        <span
          className={`text-[16px] sm:text-[17px] block mt-0.5 ${
            selected ? 'font-medium text-emerald-700' : 'font-medium text-gray-500'
          }`}
        >
          {english}
        </span>
      </div>
    </button>
  );
}

export default LanguageCard;