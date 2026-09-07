import React from 'react';
import { ReitzLogo } from './ReitzLogo';

export const HeroMonogram: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-8 pb-6 px-4 text-center">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Monogram Emblem Container - Using official Reitz By Cofiza logo */}
      <div className="relative group cursor-pointer transition-transform duration-500 hover:scale-105">
        <ReitzLogo className="w-36 h-48 sm:w-44 sm:h-56" showSubtitle={true} />
      </div>

      {/* Main Subtitle */}
      <h1 className="mt-4 text-sm sm:text-base md:text-lg font-medium tracking-[0.25em] sm:tracking-[0.35em] text-[#e7c978] uppercase px-4 max-w-2xl font-cinzel">
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
