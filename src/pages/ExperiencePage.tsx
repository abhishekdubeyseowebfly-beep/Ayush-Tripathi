import React, { useState } from 'react';
import { PageTab } from '../types';
import { INTERNSHIPS, CAREER_MILESTONES } from '../data/portfolioData';
import { CareerTimeline } from '../components/CareerTimeline';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Code2, 
  ArrowRight,
  GitCommit,
  Layers,
  Sparkles
} from 'lucide-react';

interface ExperiencePageProps {
  onNavigate: (tab: PageTab) => void;
}

type ViewMode = 'timeline' | 'internships' | 'all';

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Career Path & Experience</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Milestones</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Trajectory & Work Milestones
          </h1>
          <p className="text-base text-stone-300 leading-relaxed font-light">
            Interactive chronological roadmap tracing Ayush's complete path — from foundational CS academics 
            and SIH finalist honors to production software internships in Python and Java.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-stone-900 border border-stone-800 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Interactive Timeline</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('internships')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'internships'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Internships Only</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'all'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Combined</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Interactive Vertical Node Career Timeline */}
      {(viewMode === 'timeline' || viewMode === 'all') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                <GitCommit className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Full Career & Project Milestone Roadmap
              </h2>
            </div>
            <span className="text-xs text-emerald-400 font-mono hidden sm:inline">
              Interactive Vertical Progression
            </span>
          </div>

          <CareerTimeline milestones={CAREER_MILESTONES} onNavigate={onNavigate} />
        </section>
      )}

      {/* SECTION 2: Deep-Dive Internship Case Studies */}
      {(viewMode === 'internships' || viewMode === 'all') && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                <Briefcase className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Production Internship Case Studies
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              2 Completed Software Roles
            </span>
          </div>

          <div className="space-y-8">
            {INTERNSHIPS.map((internship) => (
              <div
                key={internship.id}
                className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 hover:border-emerald-500/60 transition-all shadow-md relative"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-stone-800 pb-6 mb-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                      <span className="text-emerald-400 font-semibold">{internship.type}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        {internship.location}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {internship.role}
                    </h3>
                    <div className="text-lg font-semibold text-stone-200">
                      {internship.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/80 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{internship.period}</span>
                    </div>
                    <div className="text-xs text-emerald-400 font-medium">
                      {internship.impactMetric}
                    </div>
                  </div>
                </div>

                {/* Role Summary */}
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-stone-300 leading-relaxed font-light">
                    {internship.summary}
                  </p>
                </div>

                {/* Key Contributions & Deliverables */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Key Contributions & Engineering Deliverables
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {internship.contributions.map((contribution, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start gap-2.5 text-xs text-stone-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Applied */}
                <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400">
                  <span className="text-stone-500 font-medium">Technologies & Methodologies:</span>
                  {internship.technologies.map((tech) => (
                    <span key={tech} className="text-stone-200 font-mono text-[11px] bg-stone-800 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internship Outcomes Summary Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Demonstrated Enterprise Readiness</span>
          </div>
          <div className="text-lg font-bold text-white">
            Dual proficiency in both Python and Java ecosystems
          </div>
          <div className="text-xs text-stone-300 max-w-xl">
            Trained in production-level code hygiene, collaborative Git workflows, peer reviews, 
            and relational database schema optimization.
          </div>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Discuss Engineering Roles
        </button>
      </div>
    </div>
  );
};
