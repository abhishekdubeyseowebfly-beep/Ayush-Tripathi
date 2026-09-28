import React, { useState } from 'react';
import { DevelopmentPhase } from '../types';
import { 
  GitCommit, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Search, 
  Layers, 
  Gauge, 
  Compass,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface ProjectRoadmapProps {
  roadmap?: DevelopmentPhase[];
  projectTitle: string;
}

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({ roadmap, projectTitle }) => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number | null>(null);

  if (!roadmap || roadmap.length === 0) {
    return null;
  }

  // Helper for tag badge styling
  const getTagBadgeStyle = (tag: string) => {
    switch (tag) {
      case 'Research':
        return {
          icon: <Search className="w-3 h-3 text-sky-400" />,
          container: 'bg-sky-950/70 border-sky-800 text-sky-300',
          dot: 'bg-sky-400',
        };
      case 'MVP Development':
        return {
          icon: <Layers className="w-3 h-3 text-amber-400" />,
          container: 'bg-amber-950/70 border-amber-800 text-amber-300',
          dot: 'bg-amber-400',
        };
      case 'Integration':
        return {
          icon: <ShieldCheck className="w-3 h-3 text-purple-400" />,
          container: 'bg-purple-950/70 border-purple-800 text-purple-300',
          dot: 'bg-purple-400',
        };
      case 'Optimization':
      default:
        return {
          icon: <Gauge className="w-3 h-3 text-emerald-400" />,
          container: 'bg-emerald-950/70 border-emerald-800 text-emerald-300',
          dot: 'bg-emerald-400',
        };
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/90 border border-stone-800 mb-8 space-y-6">
      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
              <GitCommit className="w-4 h-4" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Chronological Development Roadmap
            </h4>
          </div>
          <p className="text-xs text-stone-400">
            Phase-by-phase evolution of {projectTitle} from initial research to production optimization
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-stone-300 font-mono text-[11px]">
            {roadmap.length} Milestones Completed
          </span>
        </div>
      </div>

      {/* Horizontal Phase Timeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {roadmap.map((item, idx) => {
          const style = getTagBadgeStyle(item.tag);
          const isSelected = selectedPhaseIdx === idx;
          return (
            <button
              key={item.phase}
              type="button"
              onClick={() => setSelectedPhaseIdx(selectedPhaseIdx === idx ? null : idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-stone-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md'
                  : 'bg-stone-900/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-mono text-stone-400">{item.phase}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              </div>
              <div className="text-xs font-bold text-white truncate">
                {item.tag}
              </div>
              <div className="text-[10px] text-stone-400 truncate mt-0.5">
                {item.dateRange}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chronological Vertical Visual Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-emerald-400">
        {roadmap.map((phase, idx) => {
          const style = getTagBadgeStyle(phase.tag);
          const isHighlighted = selectedPhaseIdx === null || selectedPhaseIdx === idx;

          return (
            <div
              key={phase.phase}
              className={`relative transition-all duration-300 ${
                isHighlighted ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.99]'
              }`}
            >
              {/* Chronological Milestone Node Icon */}
              <div className="absolute -left-6 sm:-left-8 top-1 flex items-center justify-center">
                <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-stone-950 border-2 border-emerald-500 flex items-center justify-center shadow-md">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    {idx + 1}
                  </span>
                </div>
              </div>

              {/* Milestone Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-stone-900/80 border border-stone-800/90 space-y-3 hover:border-stone-700 transition-colors">
                
                {/* Milestone Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Phase Tag */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${style.container}`}>
                      {style.icon}
                      <span>{phase.tag}</span>
                    </span>

                    <span className="text-xs font-mono text-stone-400">
                      {phase.phase}
                    </span>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{phase.dateRange}</span>
                  </div>
                </div>

                {/* Milestone Title & Summary */}
                <div className="space-y-1">
                  <h5 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {phase.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {phase.summary}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                {phase.deliverables && phase.deliverables.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                      Key Deliverables & Milestones:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {phase.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact Metric Banner */}
                {phase.metric && (
                  <div className="pt-2">
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 flex items-center gap-2 text-xs text-emerald-300">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-emerald-400">Validation Metric:</span>
                      <span className="font-mono">{phase.metric}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
