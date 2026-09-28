import React from 'react';
import { PageTab } from '../types';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface EducationPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Academic Pedigree</span>
          <span aria-hidden="true">·</span>
          <span>Computer Science Education</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & Academic Background
        </h1>
        <p className="text-base text-stone-300 leading-relaxed font-light">
          Formal engineering education focused on computer science theory, systems architecture, 
          and applied modern software engineering at United University, Prayagraj.
        </p>
      </div>

      {/* Education Cards */}
      <div className="space-y-8">
        {EDUCATION_DATA.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 hover:border-emerald-500/60 transition-all shadow-md relative"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-stone-800 pb-6 mb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                  <span className="text-emerald-400 font-semibold">Degree Program</span>
                  {item.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        {item.location}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.degree}
                </h2>
                <div className="text-lg font-semibold text-stone-200">
                  {item.institution}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/80 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-300">
                  <span className="text-xs text-stone-400">{item.scoreLabel}:</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums text-base">
                    {item.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Description details */}
            <div className="space-y-2 mb-6">
              {item.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Key Coursework (if B.Tech) */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="pt-4 border-t border-stone-800 space-y-2">
                <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  Core Specialized Coursework:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {item.highlights.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 rounded-lg bg-stone-800/90 text-stone-200 border border-stone-700/60 font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Academic Milestone summary */}
      <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <span>Class of 2026 Ready for Immediate Deployment</span>
          </h3>
          <p className="text-xs text-stone-400 max-w-xl">
            Eligible for on-site or remote full-time opportunities, graduate development programs, 
            and technical engineering contracts.
          </p>
        </div>

        <button
          onClick={() => onNavigate('resume')}
          className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          View Verified Resume
        </button>
      </div>
    </div>
  );
};
