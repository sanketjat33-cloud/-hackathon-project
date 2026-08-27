import React from 'react';

/**
 * AIButton component for floating Agrova AI assistance.
 * Fixed in the bottom-right corner of the viewport with dark agricultural green pill styling.
 *
 * @param {Object} props
 * @param {Function} [props.onClick] - Optional click handler
 */
export function AIButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ask Agrova AI"
      className={`
        fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40
        flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3
        rounded-full bg-[#173f31] text-white font-medium text-sm sm:text-base
        shadow-lg shadow-[#173f31]/25 hover:shadow-xl hover:shadow-[#173f31]/35
        transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95
        hover:bg-[#113126] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
        cursor-pointer select-none
      `}
    >
      <svg
        className="w-5 h-5 text-white flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
      <span className="whitespace-nowrap font-medium">Ask Agrova AI</span>
    </button>
  );
}

export default AIButton;
