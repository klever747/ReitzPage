import React, { useState } from 'react';
import { Advisor } from '../types';
import { Mail, Phone, MessageCircle, X, Check, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisors: Advisor[];
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  advisors,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [advisorId, setAdvisorId] = useState(advisors[0]?.id || '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const selectedAdv = advisors.find((a) => a.id === advisorId) || advisors[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#0d0c11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#17151f] via-[#100f15] to-[#17151f] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
              Contacto Confidencial Reitz
            </h2>
            <p className="text-xs text-[#d4af37]">Atención directa y asesoramiento sin compromiso</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-cinzel text-neutral-100">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                {selectedAdv?.name} revisará tu requerimiento de inmediato y se pondrá en contacto al {phone || email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold block mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold block mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold block mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold block mb-1">
                  Asesor de Preferencia
                </label>
                <select
                  value={advisorId}
                  onChange={(e) => setAdvisorId(e.target.value)}
                  className="w-full bg-[#141219] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                >
                  {advisors.map((adv) => (
                    <option key={adv.id} value={adv.id}>
                      {adv.name} - {adv.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold block mb-1">
                  Mensaje o Consulta
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Deseo información sobre tipologías disponibles, valores y opciones de financiamiento..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#141219] border border-neutral-700 rounded-xl p-3 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${selectedAdv?.whatsapp}?text=${encodeURIComponent(
                    `Hola ${selectedAdv?.name}, te escribo para consultar por los proyectos de Ventas Reitz.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Directo</span>
                </a>

                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#ebd58d] text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
