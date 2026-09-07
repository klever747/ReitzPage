import React, { useState } from 'react';
import { Project, Advisor } from '../types';
import { Calculator, MessageCircle, DollarSign, X, Check, ArrowRight } from 'lucide-react';

interface CotizadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  advisors: Advisor[];
  initialProject?: Project | null;
}

export const CotizadorModal: React.FC<CotizadorModalProps> = ({
  isOpen,
  onClose,
  projects,
  advisors,
  initialProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProject?.id || projects[0]?.id || ''
  );
  const [ufPrice, setUfPrice] = useState<number>(initialProject?.priceFromUF || 8400);
  const [piePercent, setPiePercent] = useState<number>(20);
  const [years, setYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.6);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>(advisors[0]?.id || '');
  const [buyerName, setBuyerName] = useState<string>('');

  if (!isOpen) return null;

  // Constants
  const UF_VALUE_CLP = 38200; // Valor referencia UF
  const pieUF = (ufPrice * piePercent) / 100;
  const loanAmountUF = ufPrice - pieUF;

  // Monthly mortgage calculation formula:
  // M = P * ( r * (1+r)^n ) / ( (1+r)^n - 1 )
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;
  const monthlyDividendUF =
    monthlyRate > 0
      ? (loanAmountUF * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmountUF / totalMonths;

  const monthlyDividendCLP = monthlyDividendUF * UF_VALUE_CLP;
  const suggestedIncomeCLP = monthlyDividendCLP * 4; // Renta requerida (máx 25% del ingreso)

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const currentAdvisor = advisors.find((a) => a.id === selectedAdvisorId) || advisors[0];

  const handleProjectChange = (projId: string) => {
    setSelectedProjectId(projId);
    const p = projects.find((x) => x.id === projId);
    if (p) {
      setUfPrice(p.priceFromUF);
    }
  };

  const getWhatsAppLink = () => {
    const text = `Hola ${currentAdvisor.name}, me gustaría cotizar una unidad en *${currentProject?.title}*.
Detalles de mi simulación:
- Valor estimado: ${ufPrice.toLocaleString()} UF
- Pie (%): ${piePercent}% (${pieUF.toLocaleString(undefined, { maximumFractionDigits: 0 })} UF)
- Plazo Crédito: ${years} años
- Dividendo mensual estimado: ${monthlyDividendUF.toFixed(1)} UF ($${Math.round(monthlyDividendCLP).toLocaleString('es-CL')} CLP)
${buyerName ? `- Nombre: ${buyerName}` : ''}
¿Podríamos coordinar una reunión para revisar disponibilidad?`;

    return `https://wa.me/${currentAdvisor.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0d0c11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#17151f] via-[#100f15] to-[#17151f] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#e8ca79]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
                Cotizador Financiero Reitz
              </h2>
              <p className="text-xs text-[#d4af37]">Simulador hipotecario para propiedades de lujo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Project selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
                  Seleccionar Proyecto
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} - Desde {p.priceFromUF.toLocaleString()} UF ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Value UF */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                    Valor de la Propiedad (UF)
                  </label>
                  <span className="text-sm font-mono font-bold text-white">
                    {ufPrice.toLocaleString()} UF
                  </span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="30000"
                  step="100"
                  value={ufPrice}
                  onChange={(e) => setUfPrice(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>4.000 UF</span>
                  <span>15.000 UF</span>
                  <span>30.000 UF</span>
                </div>
              </div>

              {/* Pie / Down payment */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                    Pie Inicial ({piePercent}%)
                  </label>
                  <span className="text-xs font-mono text-[#f6e27a]">
                    {pieUF.toLocaleString(undefined, { maximumFractionDigits: 0 })} UF (~$
                    {Math.round((pieUF * UF_VALUE_CLP) / 1000000)}M CLP)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={piePercent}
                  onChange={(e) => setPiePercent(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>10% (Mínimo)</span>
                  <span>20% (Estándar)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Plazo & Tasa */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
                    Plazo en Años
                  </label>
                  <select
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value={15}>15 Años</option>
                    <option value={20}>20 Años</option>
                    <option value={25}>25 Años</option>
                    <option value={30}>30 Años</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
                    Tasa Anual Estimada
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="3.0"
                      max="8.0"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                    />
                    <span className="absolute right-3 top-2 text-neutral-400 text-xs">% UF</span>
                  </div>
                </div>
              </div>

              {/* Asesor preferido para recibir la cotización */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
                  Asesor Reitz para Enviar Cotización
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {advisors.map((adv) => (
                    <button
                      key={adv.id}
                      type="button"
                      onClick={() => setSelectedAdvisorId(adv.id)}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all cursor-pointer ${
                        selectedAdvisorId === adv.id
                          ? 'bg-[#1e1a14] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#111016] border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <img
                        src={adv.photoUrl}
                        alt={adv.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover object-top"
                      />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-neutral-200 truncate">{adv.name}</p>
                        <p className="text-[9px] text-[#d4af37] truncate">{adv.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#16141c] to-[#0c0b10] p-6 rounded-2xl border border-[#d4af37]/30 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[10px] tracking-widest text-[#d4af37] uppercase font-semibold">
                  Resumen de Financiamiento
                </span>

                <div className="mt-4 p-4 rounded-xl bg-black/60 border border-neutral-800 space-y-3">
                  <div>
                    <span className="text-xs text-neutral-400">Dividendo Mensual Estimado:</span>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-cinzel tracking-wide mt-0.5">
                      {monthlyDividendUF.toFixed(2)} UF
                    </div>
                    <div className="text-xs text-[#ebd58d] font-mono">
                      ~${Math.round(monthlyDividendCLP).toLocaleString('es-CL')} CLP / mes
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Monto crédito hipotecario:</span>
                      <span className="font-mono text-neutral-200">{loanAmountUF.toLocaleString()} UF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Pie requerido ({piePercent}%):</span>
                      <span className="font-mono text-neutral-200">{pieUF.toLocaleString()} UF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Renta familiar sugerida:</span>
                      <span className="font-mono text-emerald-400">
                        ~${Math.round(suggestedIncomeCLP).toLocaleString('es-CL')} CLP
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-neutral-400 leading-relaxed">
                  * Valores aproximados con fines ilustrativos referenciales. Sujeto a evaluación crediticia bancaria y condiciones vigentes al momento de escriturar.
                </p>
              </div>

              {/* Direct WhatsApp Action with calculated message */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Cotización a {currentAdvisor.name.split(' ')[0]} vía WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
