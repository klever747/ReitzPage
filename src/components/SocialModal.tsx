import React from 'react';
import { Share2, X, Instagram, Linkedin, Facebook, Youtube, ExternalLink } from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@reitzinmobiliaria',
      followers: '48.2k seguidores',
      description: 'Lanzamientos en vivo, tours virtuales en formato Reels y arquitectura.',
      url: 'https://instagram.com',
      icon: Instagram,
      accent: 'from-pink-500 via-red-500 to-yellow-500',
    },
    {
      name: 'LinkedIn',
      handle: 'Reitz Desarrollos Inmobiliarios',
      followers: '14.5k conexiones',
      description: 'Reportes de mercado, análisis de plusvalía y relaciones corporativas.',
      url: 'https://linkedin.com',
      icon: Linkedin,
      accent: 'from-blue-600 to-sky-400',
    },
    {
      name: 'Facebook',
      handle: 'Reitz Inmobiliaria Oficial',
      followers: '32k miembros',
      description: 'Eventos de inauguración, open houses y promociones de preventa.',
      url: 'https://facebook.com',
      icon: Facebook,
      accent: 'from-blue-700 to-blue-500',
    },
    {
      name: 'YouTube',
      handle: 'Reitz Desarrollos TV',
      followers: '18.9k suscriptores',
      description: 'Recorridos 4K en dron por los proyectos y entrevistas con los arquitectos.',
      url: 'https://youtube.com',
      icon: Youtube,
      accent: 'from-red-600 to-red-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0d0c11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#17151f] via-[#100f15] to-[#17151f] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#e8ca79]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
                Comunidad & Redes Sociales
              </h2>
              <p className="text-xs text-[#d4af37]">Sigue de cerca cada avance constructivo y evento privado</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channels */}
        <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-[#131219] hover:bg-[#1a1823] border border-neutral-800 hover:border-[#d4af37]/60 flex items-center justify-between transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-200 group-hover:text-[#ebd58d] group-hover:border-[#d4af37]/50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-[#ebd58d] transition-colors">
                        {social.name}
                      </h4>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {social.handle}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {social.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 text-xs text-[#d4af37]">
                  <span className="hidden sm:inline text-[11px] text-neutral-400">{social.followers}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
