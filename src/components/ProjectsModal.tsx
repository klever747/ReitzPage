import React, { useState } from 'react';
import { Project } from '../types';
import { Building2, MapPin, Check, ArrowRight, Sparkles, X } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProjectToQuote: (project: Project) => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProjectToQuote,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(projects[0] || null);

  if (!isOpen) return null;

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.status === selectedFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0d0c11] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#17151f] via-[#100f15] to-[#17151f] border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#e8ca79]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-neutral-100 font-cinzel">
                Nuestros Desarrollos Exclusivos
              </h2>
              <p className="text-xs text-[#d4af37]">Colección Residencial Reitz 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status filters */}
        <div className="px-6 py-3 bg-[#0a0a0e] border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {['all', 'Entrega Inmediata', 'Venta en Verde', 'Preventa Exclusiva'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {filter === 'all' ? 'Todos los Proyectos' : filter}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-[#121117] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-transparent to-black/20" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase bg-black/75 backdrop-blur-md text-[#e7c978] border border-[#d4af37]/30">
                    {project.status}
                  </span>
                  <div className="absolute bottom-3 right-3 text-right">
                    <span className="text-[10px] text-neutral-400 block uppercase">Desde</span>
                    <span className="text-sm font-bold text-white font-cinzel">
                      {project.priceFromUF.toLocaleString()} UF
                    </span>
                    <span className="text-[10px] text-neutral-400 block">
                      (~${(project.priceFromUSD / 1000).toFixed(0)}k USD)
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-100 font-cinzel group-hover:text-[#e7c978] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#cfa84e] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {project.location}
                    </p>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Amenities chips */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-neutral-300 border border-neutral-800"
                        >
                          {amenity}
                        </span>
                      ))}
                      {project.amenities.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-[#d4af37]">
                          +{project.amenities.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3" />
                      {project.availableUnits} unidades disponibles
                    </span>

                    <a
                      href="https://cotizador.ventasreitz.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#ebd58d] text-black font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
