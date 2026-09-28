/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PageTab, Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EcoImpactModal } from './components/EcoImpactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { VoiceFloatingTrigger } from './components/VoiceFloatingTrigger';
import { HomePage } from './pages/HomePage';
import { ProjectsPage, ProjectFilterState } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { EducationPage } from './pages/EducationPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ecoModalOpen, setEcoModalOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectFilterState | undefined>(undefined);

  // Sync with browser URL hash for true multi-page deep linking and direct project URLs
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      
      // Direct project URL link handler: e.g. #project-lifeline-ai
      if (rawHash.startsWith('project-')) {
        const projectId = rawHash.replace('project-', '');
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          setCurrentTab('projects');
          return;
        }
      }

      const hash = rawHash as PageTab;
      const validTabs: PageTab[] = [
        'home',
        'projects',
        'experience',
        'skills',
        'education',
        'achievements',
        'resume',
        'contact',
      ];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };

    // On initial load
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((tab: PageTab) => {
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
    window.location.hash = `#project-${project.id}`;
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
    window.location.hash = currentTab === 'home' ? '' : `#${currentTab}`;
  }, [currentTab]);

  // Slide navigation for projects
  const currentProjectIndex = selectedProject
    ? PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrevProject = useCallback(() => {
    let next: Project | null = null;
    if (currentProjectIndex > 0) {
      next = PROJECTS[currentProjectIndex - 1];
    } else if (currentProjectIndex === 0) {
      next = PROJECTS[PROJECTS.length - 1]; // cycle around
    }
    if (next) {
      setSelectedProject(next);
      window.location.hash = `#project-${next.id}`;
    }
  }, [currentProjectIndex]);

  const handleNextProject = useCallback(() => {
    let next: Project | null = null;
    if (currentProjectIndex < PROJECTS.length - 1) {
      next = PROJECTS[currentProjectIndex + 1];
    } else if (currentProjectIndex === PROJECTS.length - 1) {
      next = PROJECTS[0]; // cycle around
    }
    if (next) {
      setSelectedProject(next);
      window.location.hash = `#project-${next.id}`;
    }
  }, [currentProjectIndex]);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ayush_portfolio_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('ayush_portfolio_theme', theme);
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleFilterProjects = useCallback((filter: ProjectFilterState) => {
    setProjectFilter(filter);
    setCurrentTab('projects');
    window.location.hash = '#projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearProjectFilter = useCallback(() => {
    setProjectFilter(undefined);
  }, []);

  // Global Keyboard Shortcuts (like '/' to search, '?' for shortcuts, 't' for theme, 'v' for voice, 1-7 for tabs)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);
      if (isInput) return;

      // '?' toggles keyboard shortcuts cheatsheet modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
        return;
      }

      // 'v' or 'V' opens hands-free voice search modal
      if ((e.key === 'v' || e.key === 'V') && !selectedProject && !ecoModalOpen && !shortcutsModalOpen) {
        e.preventDefault();
        setVoiceModalOpen((prev) => !prev);
        return;
      }

      // 't' or 'T' toggles light/dark theme
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        handleToggleTheme();
        return;
      }

      // '/' navigates to skills and focuses search if modal is not open
      if (e.key === '/' && !selectedProject && !ecoModalOpen && !shortcutsModalOpen) {
        e.preventDefault();
        if (currentTab !== 'skills') {
          handleNavigate('skills');
        }
        setTimeout(() => {
          const el = document.querySelector('input[data-search-input="true"]') as HTMLInputElement;
          if (el) {
            el.focus();
            el.select();
          }
        }, 60);
        return;
      }

      // Numbers 1-7 navigate tabs when no modal is open
      if (!selectedProject && !ecoModalOpen && !shortcutsModalOpen && !voiceModalOpen) {
        const keyMap: Record<string, PageTab> = {
          '1': 'home',
          '2': 'projects',
          '3': 'experience',
          '4': 'skills',
          '5': 'education',
          '6': 'achievements',
          '7': 'contact',
        };
        if (keyMap[e.key]) {
          e.preventDefault();
          handleNavigate(keyMap[e.key]);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentTab, selectedProject, ecoModalOpen, shortcutsModalOpen, voiceModalOpen, handleNavigate, handleToggleTheme]);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950">
      {/* Viewport Scroll Progress Bar for Long-Form Content */}
      <ScrollProgressBar currentTab={currentTab} />

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenEcoModal={() => setEcoModalOpen(true)}
        onOpenShortcutsModal={() => setShortcutsModalOpen(true)}
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Multi-Page Routed Viewport */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onOpenEcoModal={() => setEcoModalOpen(true)}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsPage
            onSelectProject={handleSelectProject}
            onOpenEcoModal={() => setEcoModalOpen(true)}
            onOpenVoiceModal={() => setVoiceModalOpen(true)}
            externalFilter={projectFilter}
            onClearExternalFilter={handleClearProjectFilter}
          />
        )}

        {currentTab === 'experience' && (
          <ExperiencePage onNavigate={handleNavigate} />
        )}

        {currentTab === 'skills' && <SkillsPage />}

        {currentTab === 'education' && (
          <EducationPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'achievements' && (
          <AchievementsPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'resume' && <ResumePage />}

        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEcoModal={() => setEcoModalOpen(true)}
        onOpenShortcutsModal={() => setShortcutsModalOpen(true)}
      />

      {/* Floating Hands-Free Voice Assistant Pill */}
      <VoiceFloatingTrigger onOpenVoiceModal={() => setVoiceModalOpen(true)} />

      {/* Hands-Free Voice Search & Navigation Modal (Web Speech API) */}
      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onNavigate={handleNavigate}
        onSelectProject={handleSelectProject}
        onFilterProjects={handleFilterProjects}
        onToggleTheme={handleToggleTheme}
        onOpenEcoModal={() => setEcoModalOpen(true)}
        onOpenShortcutsModal={() => setShortcutsModalOpen(true)}
        theme={theme}
      />

      {/* Interactive Project Simulator & Architecture Detail Modal with Keyboard Slide Navigation & Deep Linking */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
        onPrevProject={handlePrevProject}
        onNextProject={handleNextProject}
        projectIndex={currentProjectIndex}
        totalProjects={PROJECTS.length}
      />

      {/* Eco-Friendly & Carbon Impact Explanation Modal */}
      <EcoImpactModal
        isOpen={ecoModalOpen}
        onClose={() => setEcoModalOpen(false)}
      />

      {/* Keyboard Navigation Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />
    </div>
  );
}
