import React from 'react';
import { Advisor } from '../types';

interface AdvisorsSectionProps {
  advisors: Advisor[];
}

export const AdvisorsSection: React.FC<AdvisorsSectionProps> = ({ advisors }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-10 sm:my-14">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-base sm:text-xl md:text-2xl font-normal tracking-[0.25em] text-[#d6b158] uppercase font-cinzel">
          NUESTROS ASESORES
        </h2>
      </div>

      {/* 6 Advisors Grid - Responsive from mobile (2 cols) to tablet (3 cols) to desktop (6 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="flex flex-col items-center text-center group">
            {/* Portrait with sleek gold frame and rounded corners */}
            <div
              className="w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-[#caa34d]/60 shadow-[0_4px_25px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-[1.03] group-hover:border-[#e7c978]"
              style={{
                boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.9), 0 0 10px rgba(202, 163, 77, 0.15)',
              }}
            >
              <img
                src={advisor.photoUrl}
                alt={advisor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Informative text below photo */}
            <div className="mt-3 space-y-0.5 w-full">
              <h3 className="text-xs sm:text-xs md:text-sm font-semibold tracking-wider text-[#e6ca85] uppercase font-cinzel leading-tight line-clamp-1">
                {advisor.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 font-light tracking-wide leading-tight">
                {advisor.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
