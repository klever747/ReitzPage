import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenProjects: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenProjects,
}) => {
  return (
    <footer className="w-full mt-16 sm:mt-24 pb-12 pt-8 border-t border-neutral-900 bg-[#060608] text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Footer Navigation - Exactly as shown in the screenshot */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-neutral-400">
          <button
            onClick={onOpenContact}
            className="hover:text-[#ebd58d] transition-colors cursor-pointer"
          >
            Contacto
          </button>
          <span className="text-neutral-700">•</span>
          <button
            onClick={onOpenProjects}
            className="hover:text-[#ebd58d] transition-colors cursor-pointer"
          >
            Resultados
          </button>
          <span className="text-neutral-700">•</span>
          <button
            onClick={onOpenProjects}
            className="hover:text-[#ebd58d] transition-colors cursor-pointer"
          >
            Proyectos
          </button>
          <span className="text-neutral-700">•</span>
          <button
            onClick={onOpenContact}
            className="hover:text-[#ebd58d] transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        {/* Copyright - Exactly as in the screenshot */}
        <p className="mt-6 text-[10px] sm:text-[11px] tracking-wider text-neutral-500 font-light">
          © 2026 REITZ - Todos los Derechos Reservados
        </p>
      </div>
    </footer>
  );
};
