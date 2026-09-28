import React from 'react';
import { PageTab } from '../types';
import { ACHIEVEMENTS, HOBBIES_INTERESTS } from '../data/portfolioData';
import { Trophy, Award, Activity, Music, Film, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface AchievementsPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onNavigate }) => {
  const getHobbyIcon = (title: string) => {
    if (title.includes('Cricket')) return <Activity className="w-5 h-5 text-emerald-400" />;
    if (title.includes('Music')) return <Music className="w-5 h-5 text-emerald-400" />;
    return <Film className="w-5 h-5 text-emerald-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Honors & Extracurriculars</span>
          <span aria-hidden="true">·</span>
          <span>Verified Milestones</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Achievements, Hackathons & Personal Pursuits
        </h1>
        <p className="text-base text-stone-300 leading-relaxed font-light">
          Recognitions from national-level hackathons backed by the Government of India, 
          industrial software credentials, and balanced creative interests outside engineering.
        </p>
      </div>

      {/* Main Achievements Section */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-400" />
          <span>Major Honors & Recognition</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-md group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs text-stone-400">{item.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <div className="text-xs text-stone-400 font-medium">
                  {item.organization}
                </div>

                <p className="text-sm text-stone-300 leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2">
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {item.id === 'sih-2024' && (
                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span>Category: IoT & Embedded Systems</span>
                  <span className="text-emerald-400 font-medium">National Selection</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies & Personal Interests (From Resume) */}
      <div className="space-y-6 pt-6 border-t border-stone-800">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Beyond The Code
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Hobbies & Lifestyle Interests
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            How I recharge, cultivate strategic thinking, and maintain creative balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOBBIES_INTERESTS.map((hobby) => (
            <div
              key={hobby.title}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-all space-y-3"
            >
              <div className="p-3 rounded-xl bg-stone-800/80 w-fit">
                {getHobbyIcon(hobby.title)}
              </div>
              <div className="text-xs text-emerald-400 font-mono font-medium">
                {hobby.tag}
              </div>
              <h3 className="text-lg font-bold text-white">
                {hobby.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {hobby.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-lg font-bold text-white">
            Want to see how this translates into live software?
          </div>
          <div className="text-xs text-stone-400">
            Check the projects directory to interact with live working demos.
          </div>
        </div>

        <button
          onClick={() => onNavigate('projects')}
          className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
        >
          View Live Projects
        </button>
      </div>
    </div>
  );
};
