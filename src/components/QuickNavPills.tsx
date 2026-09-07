import React from 'react';
import { Building2, Calculator, Camera, Layers, Share2 } from 'lucide-react';

interface QuickNavPillsProps {
  onOpenProjects: () => void;
  onOpenCotizador: () => void;
  onOpenFotos: () => void;
  onOpenPlanos: () => void;
  onOpenSocial: () => void;
  activeSection: string | null;
}

export const QuickNavPills: React.FC<QuickNavPillsProps> = ({
  onOpenProjects,
  onOpenCotizador,
  onOpenFotos,
  onOpenPlanos,
  onOpenSocial,
  activeSection,
}) => {
  const items: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action?: () => void;
    href?: string;
  }> = [
    {
      id: 'proyectos',
      label: 'NUESTROS PROYECTOS',
      icon: Building2,
      action: onOpenProjects,
    },
    {
      id: 'cotizador',
      label: 'COTIZADOR',
      icon: Calculator,
      href: 'https://cotizador.ventasreitz.com/login',
    },
    {
      id: 'fotos',
      label: 'FOTOS',
      icon: Camera,
      action: onOpenFotos,
    },
    {
      id: 'planos',
      label: 'PLANOS',
      icon: Layers,
      action: onOpenPlanos,
    },
    {
      id: 'redes',
      label: 'REDES SOCIALES',
      icon: Share2,
      action: onOpenSocial,
    },
  ];

  return (
    <nav className="w-full max-w-4xl mx-auto px-3 sm:px-6 my-6">
      {/* 5-item pill row, scrollable on very small screens, distributed evenly */}
      <div className="flex items-center justify-between sm:justify-center gap-2.5 sm:gap-4 md:gap-5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const sharedClassName = `group flex flex-col items-center justify-center flex-shrink-0 w-[68px] sm:w-24 md:w-28 h-[104px] sm:h-32 md:h-36 rounded-[28px] sm:rounded-[34px] transition-all duration-300 relative cursor-pointer
            ${
              isActive
                ? 'bg-gradient-to-b from-[#1c1a16] to-[#0c0b09] ring-2 ring-[#f4db8a] shadow-[0_0_25px_rgba(212,175,55,0.45)]'
                : 'bg-gradient-to-b from-[#141419]/90 to-[#0a0a0d]/95 hover:from-[#1b1915] hover:to-[#100e0a]'
            }
          `;
          const sharedStyle = {
            border: '1.5px solid rgba(212, 175, 55, 0.4)',
            boxShadow: 'inset 0 0 10px rgba(212, 175, 55, 0.12), 0 4px 18px rgba(0,0,0,0.7)',
          };

          const innerContent = (
            <>
              {/* Nested inner border mimicking the high-end luxury frame */}
              <div className="absolute inset-[3.5px] rounded-[24px] sm:rounded-[30px] border border-[#d4af37]/25 pointer-events-none group-hover:border-[#d4af37]/60 transition-colors" />

              {/* Icon Container with subtle reflective glow */}
              <div className="relative mb-2 sm:mb-2.5 text-[#d8b34f] group-hover:text-[#fae59a] transition-colors duration-300 transform group-hover:scale-110">
                <Icon className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.4]" />
                <div className="absolute inset-0 bg-[#d4af37]/20 blur-md rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Label in uppercase gold typography matching image */}
              <span className="text-[8px] sm:text-[10px] md:text-[11px] font-medium tracking-wider text-center leading-tight text-[#d5b058] group-hover:text-[#f8e6a5] px-1 transition-colors">
                {item.label}
              </span>
            </>
          );

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`quick-nav-${item.id}`}
                className={sharedClassName}
                style={sharedStyle}
              >
                {innerContent}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.action}
              id={`quick-nav-${item.id}`}
              className={sharedClassName}
              style={sharedStyle}
            >
              {innerContent}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
