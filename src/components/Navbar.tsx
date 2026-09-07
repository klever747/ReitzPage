import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ReitzLogo } from './ReitzLogo';

interface NavbarProps {
  onOpenProjects: () => void;
  onOpenCotizador: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjects,
  onOpenCotizador,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08080b]/90 border-b border-[#d4af37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Monogram Left */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ReitzLogo className="w-6 h-8 sm:w-7 sm:h-9" showSubtitle={false} />
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#f5df96] font-cinzel">
              REITZ
            </span>
            <span className="text-[10px] text-[#d4af37]/75 tracking-wider ml-1.5 font-light">
              By Cofiza
            </span>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onOpenProjects}
            className="hidden md:block text-xs text-neutral-300 hover:text-[#f5df96] transition-colors cursor-pointer"
          >
            Proyectos
          </button>
          <a
            href="https://cotizador.ventasreitz.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-xs text-neutral-300 hover:text-[#f5df96] transition-colors cursor-pointer"
          >
            Cotizador
          </a>

          {/* Direct WhatsApp Callout */}
          <a
            href="https://wa.me/593984973895?text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20los%20desarrollos%20inmobiliarios%20Reitz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">WhatsApp Ventas</span>
          </a>

          {/* Contact button */}
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#17151e] to-[#252230] hover:from-[#252230] hover:to-[#322c40] border border-[#d4af37]/40 text-xs text-[#f5df96] font-medium transition-all cursor-pointer shadow-sm"
          >
            Contacto
          </button>
        </div>
      </div>
    </header>
  );
};
