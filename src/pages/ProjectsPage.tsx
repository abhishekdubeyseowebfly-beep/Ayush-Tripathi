import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Search, 
  X, 
  Cpu, 
  Globe, 
  SlidersHorizontal,
  Activity,
  Layers,
  Code2,
  Clock,
  Compass,
  Zap,
  Play,
  Mic
} from 'lucide-react';

export type CategoryType = 'all' | 'web' | 'iot' | 'ai';

export interface ProjectFilterState {
  category?: CategoryType;
  tech?: string;
  query?: string;
}

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onOpenEcoModal: () => void;
  onOpenVoiceModal?: () => void;
  externalFilter?: ProjectFilterState;
  onClearExternalFilter?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  onSelectProject, 
  onOpenEcoModal,
  onOpenVoiceModal,
  externalFilter,
  onClearExternalFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync with external voice filter if provided
  useEffect(() => {
    if (externalFilter) {
      if (externalFilter.category !== undefined) {
        setActiveCategory(externalFilter.category);
      }
      if (externalFilter.tech !== undefined) {
        setSelectedTech(externalFilter.tech);
      }
      if (externalFilter.query !== undefined) {
        setSearchQuery(externalFilter.query);
      }
    }
  }, [externalFilter]);

  // Extract all unique technologies across all projects
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: PROJECTS.length,
      web: PROJECTS.filter((p) => p.category === 'web').length,
      iot: PROJECTS.filter((p) => p.category === 'iot').length,
      ai: PROJECTS.filter((p) => p.category === 'ai').length,
    };
  }, []);

  // Filtered projects based on category, technology, and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }
      // Technology tag filter
      if (selectedTech !== 'all' && !project.technologies.includes(selectedTech)) {
        return false;
      }
      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesTagline = project.tagline.toLowerCase().includes(query);
        const matchesOverview = project.overview.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesArch = project.architecturePoints.some((a) => a.toLowerCase().includes(query));
        return matchesTitle || matchesTagline || matchesOverview || matchesTech || matchesArch;
      }
      return true;
    });
  }, [activeCategory, selectedTech, searchQuery]);

  // Visual Architecture Pipeline Definitions for each project
  const architecturePipelines: Record<string, string[]> = {
    'lifeline-ai': ['Client Spatial Query', 'Haversine Trig Math', 'FastAPI & JWT Auth', 'MongoDB Atlas', 'Leaflet Live GIS'],
    'iot-smart-agriculture': ['ESP32 Edge Node', 'Capacitive Sensors', 'Node-RED Broker', 'ML Disease CNN', 'Precision Solenoid'],
    'healthcare-chatbot': ['Symptom Ingestion', 'TensorFlow Tokenizer', 'Flask API Gateway', 'Clinical Triage Model', 'Emergency Routing'],
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedTech('all');
    setSearchQuery('');
    if (onClearExternalFilter) {
      onClearExternalFilter();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Engineering Portfolio</span>
          <span aria-hidden="true">·</span>
          <span>Flagship Systems & Simulators</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Featured Engineering Projects & Technical Architecture
        </h1>
        <p className="text-base text-stone-300 leading-relaxed font-light">
          Explore complete production-style systems across Full-Stack Web, Edge IoT & Clean-Tech, and AI Machine Learning. 
          Use the category filters below to explore specific domains or launch interactive client-side simulators.
        </p>
      </div>

      {/* GRAPHIC CATEGORY SHOWCASE CARDS (Visual Domain Selector) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Card 1: All */}
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group ${
            activeCategory === 'all'
              ? 'bg-stone-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/40'
              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${activeCategory === 'all' ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300 tabular-nums">
              {categoryCounts.all} Systems
            </span>
          </div>
          <div className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
            All Domains
          </div>
          <div className="text-xs text-stone-400 mt-1">
            Complete full-stack, hardware IoT, and machine learning catalog
          </div>
        </button>

        {/* Category Card 2: Full-Stack Web */}
        <button
          type="button"
          onClick={() => setActiveCategory('web')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group ${
            activeCategory === 'web'
              ? 'bg-stone-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/40'
              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${activeCategory === 'web' ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300 tabular-nums">
              {categoryCounts.web} Project
            </span>
          </div>
          <div className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
            Full-Stack Web & GIS
          </div>
          <div className="text-xs text-stone-400 mt-1">
            FastAPI · React · Leaflet · JWT & Algorithmic Proximity
          </div>
        </button>

        {/* Category Card 3: IoT & Clean Tech */}
        <button
          type="button"
          onClick={() => setActiveCategory('iot')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group ${
            activeCategory === 'iot'
              ? 'bg-stone-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/40'
              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${activeCategory === 'iot' ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300 tabular-nums">
              {categoryCounts.iot} Project
            </span>
          </div>
          <div className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
            IoT & Clean Tech
          </div>
          <div className="text-xs text-stone-400 mt-1">
            ESP32 · Node-RED · Automated Precision Water Preservation
          </div>
        </button>

        {/* Category Card 4: AI & Machine Learning */}
        <button
          type="button"
          onClick={() => setActiveCategory('ai')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative group ${
            activeCategory === 'ai'
              ? 'bg-stone-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/40'
              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${activeCategory === 'ai' ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300 tabular-nums">
              {categoryCounts.ai} Project
            </span>
          </div>
          <div className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
            AI & Healthcare
          </div>
          <div className="text-xs text-stone-400 mt-1">
            TensorFlow · Flask NLP · Clinical Symptom Assessment
          </div>
        </button>
      </div>

      {/* FILTER CONTROL BAR & KEYWORD SEARCH */}
      <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Keyword Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. Haversine, FastAPI, ESP32, Flask)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-16 py-2 text-xs text-white placeholder-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    if (onClearExternalFilter) onClearExternalFilter();
                  }}
                  className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenVoiceModal && (
                <button
                  type="button"
                  onClick={onOpenVoiceModal}
                  className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/60 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  title="Voice Search (V key)"
                  aria-label="Activate voice search"
                >
                  <Mic className="w-3.5 h-3.5 animate-pulse" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Segmented Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-950 rounded-xl border border-stone-800/80 overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All ({categoryCounts.all})
            </button>
            <button
              onClick={() => setActiveCategory('web')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'web'
                  ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Full-Stack ({categoryCounts.web})
            </button>
            <button
              onClick={() => setActiveCategory('iot')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'iot'
                  ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              IoT ({categoryCounts.iot})
            </button>
            <button
              onClick={() => setActiveCategory('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'ai'
                  ? 'bg-emerald-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              AI & ML ({categoryCounts.ai})
            </button>
          </div>
        </div>

        {/* Popular Tech Filter Pills */}
        <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 text-[11px] mr-1">Filter by Tech:</span>
          {['all', 'React.js', 'FastAPI', 'Python', 'Arduino/ESP32', 'MongoDB Atlas', 'TensorFlow', 'Leaflet'].map((tech) => {
            const isSelected = selectedTech === tech;
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 font-semibold'
                    : 'bg-stone-950/70 text-stone-400 border border-stone-800 hover:text-stone-200'
                }`}
              >
                {tech === 'all' ? 'All Stacks' : tech}
              </button>
            );
          })}

          {(activeCategory !== 'all' || selectedTech !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 underline cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER RESULT COUNTER */}
      <div className="flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span>Displaying <strong>{filteredProjects.length}</strong> of {PROJECTS.length} verified projects</span>
          {activeCategory !== 'all' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 capitalize">Category: {activeCategory === 'web' ? 'Full-Stack' : activeCategory.toUpperCase()}</span>
            </>
          )}
          {selectedTech !== 'all' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Tech: {selectedTech}</span>
            </>
          )}
        </div>
        <div className="hidden sm:block text-stone-500">
          Tip: Click any project card to launch live simulator
        </div>
      </div>

      {/* EMPTY STATE IF NO PROJECTS MATCH */}
      {filteredProjects.length === 0 && (
        <div className="p-12 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Matching Projects Found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            No projects matched your active category or search query. Reset filters to view all flagship works.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* HIGH-FIDELITY GRAPHIC PROJECT CARDS */}
      <div className="space-y-12">
        {filteredProjects.map((project) => {
          const pipelineSteps = architecturePipelines[project.id] || [];

          return (
            <div
              key={project.id}
              className="rounded-3xl bg-stone-900/90 border border-stone-800 overflow-hidden hover:border-emerald-500/50 transition-all shadow-xl group relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual Media Container (Left Side) */}
                <div className="lg:col-span-5 relative aspect-video lg:aspect-auto bg-stone-950 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Simulator Ready Insignia */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950/85 backdrop-blur-md border border-emerald-500/40 text-[11px] font-medium text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Interactive Simulator</span>
                  </div>

                  {/* Quick Action Overlay (Desktop Hover) */}
                  <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-stone-950 text-xs font-bold transition-transform transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Interactive Demo</span>
                    </button>
                  </div>
                </div>

                {/* Content Container (Right Side) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    
                    {/* Unboxed Category & Status Strip */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                      <span className="text-emerald-400 font-semibold">{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified Architecture</span>
                      {project.ecoBenefit && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-300 flex items-center gap-1 font-medium">
                            <Leaf className="w-3 h-3 text-emerald-400" />
                            Eco-Efficient
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1.5">
                      <h2 
                        onClick={() => onSelectProject(project)}
                        className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h2>
                      <p className="text-xs text-emerald-400/90 font-mono">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-stone-300 leading-relaxed font-light">
                      {project.overview}
                    </p>

                    {/* GRAPHIC ARCHITECTURE PIPELINE FLOW (Visual Structure) */}
                    {pipelineSteps.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            Execution Flowchart Pipeline
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">End-to-End</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {pipelineSteps.map((step, sIdx) => (
                            <React.Fragment key={step}>
                              <span className="px-2.5 py-1 rounded bg-stone-900 text-stone-200 border border-stone-800 text-[11px] font-mono">
                                {step}
                              </span>
                              {sIdx < pipelineSteps.length - 1 && (
                                <ArrowRight className="w-3 h-3 text-stone-600 shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Highlights */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                        Engineering Highlights:
                      </span>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {project.architecturePoints.slice(0, 2).map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Clean Tech Stack */}
                    <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-stone-400">
                      <span className="text-stone-500 font-mono text-[11px]">Stack:</span>
                      {project.technologies.map((tech, tIdx) => (
                        <button
                          key={tech}
                          onClick={() => setSelectedTech(tech)}
                          className={`text-stone-300 hover:text-emerald-400 transition-colors font-medium cursor-pointer ${
                            selectedTech === tech ? 'text-emerald-400 underline font-semibold' : ''
                          }`}
                        >
                          {tech}
                          {tIdx < project.technologies.length - 1 && (
                            <span className="ml-2 text-stone-600" aria-hidden="true">·</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span>Run Interactive Simulator</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                          title="GitHub Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
