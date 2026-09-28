import React, { useState } from 'react';
import { CareerMilestone, PageTab } from '../types';
import { 
  Briefcase, 
  Code2, 
  Cpu, 
  Award, 
  GraduationCap, 
  Rocket, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CareerTimelineProps {
  milestones: CareerMilestone[];
  onNavigate: (tab: PageTab) => void;
}

type FilterCategory = 'all' | 'internship' | 'project' | 'academic_award';

export const CareerTimeline: React.FC<CareerTimelineProps> = ({ milestones, onNavigate }) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [expandedAll, setExpandedAll] = useState(true);

  // Filter items
  const filteredMilestones = milestones.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'internship') return item.category === 'internship';
    if (filter === 'project') return item.category === 'project';
    if (filter === 'academic_award') return item.category === 'education' || item.category === 'recognition' || item.category === 'career';
    return true;
  });

  // Category Icon helper
  const getNodeIcon = (item: CareerMilestone) => {
    switch (item.category) {
      case 'internship':
        return <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />;
      case 'project':
        return item.technologies?.includes('ESP32') 
          ? <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
          : <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />;
      case 'recognition':
        return <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />;
      case 'career':
      default:
        return <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />;
    }
  };

  // Badge styling helper
  const getBadgeStyle = (item: CareerMilestone) => {
    switch (item.category) {
      case 'internship':
        return {
          container: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
          ring: 'border-emerald-500',
          dot: 'bg-emerald-400',
        };
      case 'project':
        return item.technologies?.includes('ESP32')
          ? {
              container: 'bg-teal-950/80 border-teal-800 text-teal-300',
              ring: 'border-teal-500',
              dot: 'bg-teal-400',
            }
          : {
              container: 'bg-sky-950/80 border-sky-800 text-sky-300',
              ring: 'border-sky-500',
              dot: 'bg-sky-400',
            };
      case 'recognition':
        return {
          container: 'bg-amber-950/80 border-amber-800 text-amber-300',
          ring: 'border-amber-500',
          dot: 'bg-amber-400',
        };
      case 'education':
        return {
          container: 'bg-indigo-950/80 border-indigo-800 text-indigo-300',
          ring: 'border-indigo-500',
          dot: 'bg-indigo-400',
        };
      case 'career':
      default:
        return {
          container: 'bg-rose-950/80 border-rose-800 text-rose-300',
          ring: 'border-emerald-400',
          dot: 'bg-emerald-400',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Controls & Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter Track:</span>
          </span>

          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-950/70 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800'
            }`}
          >
            All Milestones ({milestones.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('internship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filter === 'internship'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-950/70 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800'
            }`}
          >
            Work Internships ({milestones.filter(m => m.category === 'internship').length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('project')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filter === 'project'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-950/70 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800'
            }`}
          >
            Major Projects ({milestones.filter(m => m.category === 'project').length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('academic_award')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              filter === 'academic_award'
                ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                : 'bg-stone-950/70 text-stone-300 hover:text-white border border-stone-800 hover:bg-stone-800'
            }`}
          >
            Academics & SIH ({milestones.filter(m => m.category === 'education' || m.category === 'recognition' || m.category === 'career').length})
          </button>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setExpandedAll(!expandedAll)}
            className="px-3 py-1.5 rounded-lg bg-stone-950/70 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {expandedAll ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                <span>Compact View</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Chronological Horizontal Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-stretch gap-2.5 min-w-[700px]">
          {filteredMilestones.map((item, idx) => {
            const badgeStyle = getBadgeStyle(item);
            const isSelected = selectedMilestoneId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedMilestoneId(isSelected ? null : item.id);
                  const el = document.getElementById(`milestone-${item.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`flex-1 p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-stone-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                    : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-stone-400">{item.period.split('–')[0].trim()}</span>
                  <span className={`w-2 h-2 rounded-full ${badgeStyle.dot}`} />
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {item.role}
                </div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5">
                  {item.organization}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Vertical Interactive Timeline */}
      <div className="relative pl-8 sm:pl-12 space-y-10 before:absolute before:left-3.5 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-emerald-400">
        {filteredMilestones.map((milestone, index) => {
          const badgeStyle = getBadgeStyle(milestone);
          const isSelected = selectedMilestoneId === milestone.id;
          const isExpanded = expandedAll || isSelected;

          return (
            <div
              key={milestone.id}
              id={`milestone-${milestone.id}`}
              className={`relative transition-all duration-300 ${
                selectedMilestoneId && !isSelected ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {/* Vertical Node Marker */}
              <div 
                onClick={() => setSelectedMilestoneId(isSelected ? null : milestone.id)}
                className="absolute -left-8 sm:-left-12 top-1.5 flex items-center justify-center cursor-pointer group"
                title={`Click to focus: ${milestone.role}`}
              >
                <div className={`w-7 sm:w-10 h-7 sm:h-10 rounded-full bg-stone-950 border-2 ${badgeStyle.ring} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                  {getNodeIcon(milestone)}
                </div>
                {milestone.status === 'active' && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>

              {/* Milestone Content Card */}
              <div 
                className={`rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-stone-900 border-emerald-500/90 ring-1 ring-emerald-500/40 shadow-xl p-6 sm:p-7'
                    : 'bg-stone-900/90 border-stone-800 hover:border-stone-700/80 p-5 sm:p-6 shadow-md'
                }`}
              >
                {/* Milestone Top Metadata Bar */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-800/80 pb-4 mb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badgeStyle.container}`}>
                        <span>{milestone.tag}</span>
                      </span>

                      {milestone.location && (
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                          <MapPin className="w-3 h-3 text-stone-500" />
                          <span>{milestone.location}</span>
                        </span>
                      )}

                      {milestone.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current / Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-400">
                          Completed
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {milestone.role}
                    </h3>
                    <div className="text-sm font-semibold text-stone-300">
                      {milestone.organization}
                    </div>
                  </div>

                  {/* Date Range Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-950/80 px-3 py-1.5 rounded-lg border border-stone-800 font-mono self-start sm:self-auto shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{milestone.period}</span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm text-stone-300 leading-relaxed font-light mb-4">
                  {milestone.summary}
                </p>

                {/* Expandable Technical Contributions / Deliverables */}
                {isExpanded && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                        Key Accomplishments & Deliverables:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {milestone.contributions.map((contribution, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-start gap-2.5 text-xs text-stone-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{contribution}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact / Validation Metric Banner */}
                    {milestone.impactMetric && (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-emerald-300">
                          <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-semibold text-emerald-400">Impact Metric:</span>
                          <span className="font-mono text-white">{milestone.impactMetric}</span>
                        </div>
                      </div>
                    )}

                    {/* Technologies Strip & Direct Link Button */}
                    <div className="pt-3 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {milestone.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="text-stone-300 font-mono text-[11px] bg-stone-950 border border-stone-800 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {milestone.linkTab && milestone.linkText && (
                        <button
                          type="button"
                          onClick={() => onNavigate(milestone.linkTab!)}
                          className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
                        >
                          <span>{milestone.linkText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Collapsed view indicator toggle */}
                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setSelectedMilestoneId(milestone.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 pt-1 cursor-pointer font-medium"
                  >
                    <span>Show deliverables & impact metrics</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
