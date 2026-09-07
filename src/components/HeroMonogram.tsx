import React from 'react';

export const HeroMonogram: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-8 pb-6 px-4 text-center">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Monogram Emblem Container - Matching exact geometric frame in photo */}
      <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-105">
        <div className="w-28 h-36 sm:w-32 sm:h-40 relative flex items-center justify-center">
          {/* Outer architectural gold polygon SVG */}
          <svg
            viewBox="0 0 100 130"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Geometric luxury house/tower angle frame */}
            <path
              d="M 50 4 L 94 36 L 94 124 L 6 124 L 6 36 Z"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              fill="rgba(10, 10, 14, 0.85)"
            />
            {/* Inner accent line */}
            <path
              d="M 50 12 L 86 40 L 86 116 L 14 116 L 14 40 Z"
              stroke="url(#goldGrad)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7e8a1" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#8d6e24" />
                <stop offset="100%" stopColor="#f3de8a" />
              </linearGradient>
            </defs>
          </svg>

          {/* Golden Serif 'R' Monogram */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span
              className="text-5xl sm:text-6xl font-serif font-semibold tracking-wider gold-gradient-text"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              R
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37]/80 -mt-1 font-semibold">
              REITZ
            </span>
          </div>
        </div>
      </div>

      {/* Main Subtitle - Matching photo: "VENTAS REITZ - DESARROLLOS INMOBILIARIOS EXCLUSIVOS" */}
      <h1 className="mt-6 text-sm sm:text-base md:text-lg font-medium tracking-[0.25em] sm:tracking-[0.35em] text-[#e7c978] uppercase px-4 max-w-2xl font-cinzel">
        VENTAS REITZ - DESARROLLOS INMOBILIARIOS EXCLUSIVOS
      </h1>

      {/* Decorative hairline line */}
      <div className="mt-4 flex items-center justify-center gap-3 w-48 opacity-60">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37] bg-[#d4af37]/40" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>
    </section>
  );
};
