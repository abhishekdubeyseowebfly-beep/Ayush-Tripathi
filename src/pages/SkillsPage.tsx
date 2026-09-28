import React, { useState, useRef, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Search, Code2, Database, Terminal, Cpu, BookOpen, CheckCircle, Sparkles, X } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === 'Escape' && activeEl === searchInputRef.current) {
        if (searchQuery) {
          setSearchQuery('');
        } else {
          searchInputRef.current?.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming Languages': <Code2 className="w-5 h-5 text-emerald-400" />,
    'Web Technologies & Frameworks': <Terminal className="w-5 h-5 text-emerald-400" />,
    'Databases & Storage': <Database className="w-5 h-5 text-emerald-400" />,
    'Tools, Hardware & Platforms': <Cpu className="w-5 h-5 text-emerald-400" />,
    'Core Computer Science Fundamentals': <BookOpen className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <span>Technical Competencies</span>
          <span aria-hidden="true">·</span>
          <span>Verified Stack</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Comprehensive Technical & CS Matrix
        </h1>
        <p className="text-base text-stone-300 leading-relaxed font-light">
          A disciplined repertoire spanning systems programming, modern web application architecture, 
          embedded IoT edge devices, and core theoretical computer science principles.
        </p>
      </div>

      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            data-search-input="true"
            type="text"
            placeholder="Search skills (e.g. Python, React, MySQL, DSA, ESP32)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-14 py-2.5 text-xs text-white placeholder-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-white p-0.5 rounded cursor-pointer"
                title="Clear search (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono pointer-events-none">
                <kbd className="px-1.5 py-0.5 bg-stone-800 border border-stone-700 rounded text-stone-400 shadow-xs text-[10px]">
                  /
                </kbd>
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-stone-400 flex items-center gap-2">
          <span>Press <kbd className="px-1 py-0.5 bg-stone-800 border border-stone-700 rounded text-[10px] font-mono text-stone-300">/</kbd> to search</span>
          <span aria-hidden="true">·</span>
          <span>Evaluated through 2 internships & 3 flagship projects</span>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-10">
        {SKILL_CATEGORIES.map((category) => {
          const matchingSkills = category.skills.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && matchingSkills.length === 0) return null;

          return (
            <div
              key={category.title}
              className="rounded-2xl bg-stone-900/80 border border-stone-800 p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-800 border border-stone-700/80">
                    {categoryIcons[category.title] || <Sparkles className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs text-stone-400">{category.description}</p>
                  </div>
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {matchingSkills.length} competencies
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`p-4 rounded-xl border transition-all ${
                      skill.highlight
                        ? 'bg-stone-950/80 border-emerald-900/60 hover:border-emerald-500/60'
                        : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <span>{skill.name}</span>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Core Specialty" />
                        )}
                      </div>
                      <div className="font-mono text-xs text-emerald-400 font-bold tabular-nums">
                        {skill.level}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden mb-2.5">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>{skill.category}</span>
                      {skill.experienceYears && (
                        <span className="font-mono text-stone-500">{skill.experienceYears}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CS Fundamentals & Architecture Principle Card */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 to-emerald-950/30 border border-stone-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Computer Science Theoretical Rigor</span>
        </h3>
        <p className="text-xs text-stone-300 leading-relaxed max-w-4xl">
          Ayush’s engineering practice is anchored in strong fundamentals: asymptotic time/space algorithmic complexity 
          (Big-O), relational database normalization and ACID transactions, process synchronization and thread scheduling 
          in Operating Systems, and layered TCP/IP socket network protocols.
        </p>
      </div>
    </div>
  );
};
