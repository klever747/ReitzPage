/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroMonogram } from './components/HeroMonogram';
import { QuickNavPills } from './components/QuickNavPills';
import { AdvisorsSection } from './components/AdvisorsSection';
import { ProjectsModal } from './components/ProjectsModal';
import { CotizadorModal } from './components/CotizadorModal';
import { FotosModal } from './components/FotosModal';
import { PlanosModal } from './components/PlanosModal';
import { SocialModal } from './components/SocialModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

import { ADVISORS, PROJECTS, BLUEPRINTS, GALLERY_PHOTOS } from './data/mockData';
import { Advisor, Project } from './types';

export default function App() {
  // Modal states
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isCotizadorOpen, setIsCotizadorOpen] = useState(false);
  const [isFotosOpen, setIsFotosOpen] = useState(false);
  const [isPlanosOpen, setIsPlanosOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Selected entities
  const [quotingProject, setQuotingProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleOpenProjects = () => {
    setActiveSection('proyectos');
    setIsProjectsOpen(true);
  };

  const handleOpenCotizador = () => {
    window.open('https://cotizador.ventasreitz.com/login', '_blank', 'noopener,noreferrer');
  };

  const handleOpenFotos = () => {
    setActiveSection('fotos');
    setIsFotosOpen(true);
  };

  const handleOpenPlanos = () => {
    window.open('https://drive.google.com/drive/folders/17sO5A0sqqKFK8ELezIqDG3RP-6aJNcq6', '_blank', 'noopener,noreferrer');
  };

  const handleOpenSocial = () => {
    setActiveSection('redes');
    setIsSocialOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col selection:bg-[#d4af37]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenProjects={handleOpenProjects}
        onOpenCotizador={() => handleOpenCotizador()}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Page Content - Identical visual hierarchy to uploaded reference */}
      <main className="flex-1 flex flex-col items-center">
        {/* Architectural Monogram 'R' & Luxury Subtitle */}
        <HeroMonogram />

        {/* 5 Luxury Golden Navigation Buttons */}
        <QuickNavPills
          onOpenProjects={handleOpenProjects}
          onOpenCotizador={() => handleOpenCotizador()}
          onOpenFotos={handleOpenFotos}
          onOpenPlanos={handleOpenPlanos}
          onOpenSocial={handleOpenSocial}
          activeSection={activeSection}
        />

        {/* Advisors Section (Nuestros Asesores - Purely informative card grid matching screenshot) */}
        <AdvisorsSection advisors={ADVISORS} />
      </main>

      {/* Footer matching reference image */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenProjects={handleOpenProjects}
      />

      {/* Modals */}
      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => {
          setIsProjectsOpen(false);
          setActiveSection(null);
        }}
        projects={PROJECTS}
        onSelectProjectToQuote={(proj) => handleOpenCotizador(proj)}
      />

      <CotizadorModal
        isOpen={isCotizadorOpen}
        onClose={() => {
          setIsCotizadorOpen(false);
          setActiveSection(null);
        }}
        projects={PROJECTS}
        advisors={ADVISORS}
        initialProject={quotingProject}
      />

      <FotosModal
        isOpen={isFotosOpen}
        onClose={() => {
          setIsFotosOpen(false);
          setActiveSection(null);
        }}
        photos={GALLERY_PHOTOS}
      />

      <PlanosModal
        isOpen={isPlanosOpen}
        onClose={() => {
          setIsPlanosOpen(false);
          setActiveSection(null);
        }}
        blueprints={BLUEPRINTS}
        onOpenCotizador={() => handleOpenCotizador()}
      />

      <SocialModal
        isOpen={isSocialOpen}
        onClose={() => {
          setIsSocialOpen(false);
          setActiveSection(null);
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        advisors={ADVISORS}
      />
    </div>
  );
}
