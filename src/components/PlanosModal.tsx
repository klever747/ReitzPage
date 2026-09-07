import React, { useState } from 'react';
import { Blueprint } from '../types';
import { Layers, X, Home, Compass, Square, Bed, Bath, ArrowRight } from 'lucide-react';

interface PlanosModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: Blueprint[];
  onOpenCotizador: () => void;
}

export const PlanosModal: React.FC<PlanosModalProps> = ({
  isOpen,
  onClose,
  blueprints,
  onOpenCotizador,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<Blueprint>(blueprints[0] || {} as Blueprint);

  if (!isOpen) return null;

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
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
                Planos & Distribución Arquitectónica
              </h2>
              <p className="text-xs text-[#d4af37]">Tipologías residenciales y superficies técnicas</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Typology selector tabs */}
        <div className="px-6 py-3 bg-[#0a0a0e] border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {blueprints.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                selectedPlan.id === plan.id
                  ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {plan.title.split('-')[0]} ({plan.bedrooms}D + {plan.bathrooms}B)
            </button>
          ))}
        </div>

        {/* Main Blueprint View */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Architectural Layout Display */}
            <div className="lg:col-span-7 bg-[#131219] p-4 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-neutral-800/70">
                <img
                  src={selectedPlan.image}
                  alt={selectedPlan.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Blueprint watermark/overlay */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#d4af37]/30 text-[11px] text-[#e7c978]">
                  {selectedPlan.model}
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#d4af37] font-semibold">
                  Ficha Técnica
                </span>
                <h3 className="text-lg font-cinzel text-neutral-100 mt-1">
                  {selectedPlan.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">{selectedPlan.model}</p>
              </div>

              {/* Surface Stats */}
              <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-black/60 border border-neutral-800 text-center">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Total</span>
                  <span className="text-base font-bold text-white font-mono">{selectedPlan.surfaceTotal} m²</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Útil</span>
                  <span className="text-base font-bold text-[#e7c978] font-mono">{selectedPlan.surfaceInterior} m²</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Terraza</span>
                  <span className="text-base font-bold text-neutral-300 font-mono">{selectedPlan.surfaceTerrace} m²</span>
                </div>
              </div>

              {/* Feature pills */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#141219] border border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#d4af37]" /> Dormitorios:
                  </span>
                  <span className="text-neutral-200 font-medium">{selectedPlan.bedrooms} Suites</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#141219] border border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Bath className="w-4 h-4 text-[#d4af37]" /> Baños:
                  </span>
                  <span className="text-neutral-200 font-medium">{selectedPlan.bathrooms} con grifería alemana</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#141219] border border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" /> Orientación:
                  </span>
                  <span className="text-neutral-200 font-medium">{selectedPlan.orientation}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-[#141219] border border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#d4af37]" /> Valor Estimado:
                  </span>
                  <span className="text-[#f5df96] font-bold font-cinzel text-sm">
                    Desde {selectedPlan.priceUF.toLocaleString()} UF
                  </span>
                </div>
              </div>

              {/* Link to Google Drive folder */}
              <a
                href="https://drive.google.com/drive/folders/17sO5A0sqqKFK8ELezIqDG3RP-6aJNcq6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-[#d4af37]/40 text-[#f5df96] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Ver Planos Completos en Google Drive</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </a>

              {/* Cotizar this plan */}
              <a
                href="https://cotizador.ventasreitz.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#d4af37] hover:bg-[#ebd58d] text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Ir al Cotizador Oficial de Ventas Reitz</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
