import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { Camera, X, Maximize2, ExternalLink } from 'lucide-react';

interface FotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
}

export const FotosModal: React.FC<FotosModalProps> = ({ isOpen, onClose, photos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  if (!isOpen) return null;

  const categories = ['all', 'Interiores', 'Exteriores', 'Amenities', 'Vistas Panorámicas'];
  const filtered = selectedCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0d0c11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#17151f] via-[#100f15] to-[#17151f] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#e8ca79]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
                Galería de Fotografías
              </h2>
              <p className="text-xs text-[#d4af37]">Detalles y atmósferas de nuestros desarrollos</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://drive.google.com/drive/folders/1AjC2xHOhVvhylGwhKYh4Zy-ksUsP_h4A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5df96] hover:bg-[#d4af37]/30 text-xs transition-colors"
            >
              <span>Abrir Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 bg-[#0a0a0e] border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {cat === 'all' ? 'Todas las Fotos' : cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-[#d4af37]/70 transition-all duration-300 shadow-md"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-[#e7c978] block">{photo.project}</span>
                    <h4 className="text-xs font-medium text-neutral-100 line-clamp-1">{photo.title}</h4>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-black/60 border border-[#d4af37]/40 flex items-center justify-center text-[#e7c978]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in"
            onClick={() => setActivePhoto(null)}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto rounded-lg object-contain border border-[#d4af37]/40 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs text-[#e7c978] uppercase tracking-wider">{activePhoto.project} • {activePhoto.category}</span>
                <h3 className="text-base sm:text-lg font-cinzel text-neutral-100">{activePhoto.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
