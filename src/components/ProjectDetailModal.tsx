import React, { useState, useEffect, useMemo } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, MapPin, Droplet, Send, AlertTriangle, Sparkles, Clock, ArrowLeft, ArrowRight, Link2, Check } from 'lucide-react';
import { ProjectRoadmap } from './ProjectRoadmap';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
  projectIndex?: number;
  totalProjects?: number;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  onClose,
  onPrevProject,
  onNextProject,
  projectIndex,
  totalProjects
}) => {
  // Haversine demo states
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('O+');
  const [userLocation, setUserLocation] = useState('Civil Lines, Prayagraj');
  const [calculatedDonors, setCalculatedDonors] = useState<any[]>([]);

  // Soil IoT demo states
  const [soilMoisture, setSoilMoisture] = useState(24);
  const [temperature, setTemperature] = useState(31);
  const [humidity, setHumidity] = useState(48);

  // Chatbot demo states
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; triageLevel?: 'mild' | 'moderate' | 'emergency' }>>([
    {
      sender: 'bot',
      text: 'Hello, I am the Lifeline Health Assistant. Please state your symptoms, onset time, and intensity for preliminary triage guidance.',
    },
  ]);

  // Reading scroll progress state (0 to 100%)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Copy URL & Toast feedback state
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Reset reading progress & copy status when opening or changing project
    setScrollProgress(0);
    setCopied(false);
    setToastMessage(null);
  }, [project]);

  const handleCopyUrl = async () => {
    if (!project) return;
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const projectUrl = `${origin}${pathname}#project-${project.id}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(projectUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = projectUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setToastMessage('Copied!');
      setTimeout(() => {
        setCopied(false);
      }, 2200);
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    } catch (err) {
      console.error('Failed to copy project URL:', err);
      setToastMessage('Error copying');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      const pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setScrollProgress(pct);
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Check if user is actively typing in an input, textarea, or select
      const activeEl = document.activeElement;
      const isInput = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);

      if (!isInput) {
        if (e.key === 'ArrowLeft' && onPrevProject) {
          e.preventDefault();
          onPrevProject();
        } else if (e.key === 'ArrowRight' && onNextProject) {
          e.preventDefault();
          onNextProject();
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Initialize Haversine data
      if (project.interactiveDemoType === 'haversine') {
        runHaversineCalculation('Civil Lines, Prayagraj', selectedBloodGroup);
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, selectedBloodGroup, onPrevProject, onNextProject, onClose]);

  if (!project) return null;

  // Haversine formula calculation simulator (using real spherical trigonometry math)
  function runHaversineCalculation(locationName: string, bloodGroup: string) {
    // Reference base coord for Prayagraj: 25.4358° N, 81.8463° E
    const baseLat = 25.4358;
    const baseLon = 81.8463;

    const mockDonorsPool = [
      { id: 1, name: 'Rahul Sharma', blood: 'O+', lat: 25.4410, lon: 81.8520, area: 'Civil Lines Central', verified: true, responseRate: '98%' },
      { id: 2, name: 'Priya Verma', blood: 'O+', lat: 25.4520, lon: 81.8650, area: 'Katra Market', verified: true, responseRate: '95%' },
      { id: 3, name: 'Amitabh Mishra', blood: 'B+', lat: 25.4210, lon: 81.8310, area: 'George Town', verified: true, responseRate: '91%' },
      { id: 4, name: 'Sneha Patel', blood: 'A+', lat: 25.4100, lon: 81.8200, area: 'Naini Industrial Area', verified: false, responseRate: '88%' },
      { id: 5, name: 'Vikas Gupta', blood: 'AB+', lat: 25.4650, lon: 81.8700, area: 'Teliyarganj', verified: true, responseRate: '99%' },
      { id: 6, name: 'Ananya Roy', blood: 'O-', lat: 25.4380, lon: 81.8490, area: 'Ashok Nagar', verified: true, responseRate: '100%' },
      { id: 7, name: 'Deepak Yadav', blood: 'O+', lat: 25.4780, lon: 81.8900, area: 'Phaphamau Bridge', verified: true, responseRate: '92%' },
    ];

    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // Earth's mean radius in km

    const results = mockDonorsPool
      .filter((d) => bloodGroup === 'All' || d.blood === bloodGroup)
      .map((donor) => {
        const dLat = toRad(donor.lat - baseLat);
        const dLon = toRad(donor.lon - baseLon);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(baseLat)) * Math.cos(toRad(donor.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = R * c;
        return {
          ...donor,
          distanceKm: parseFloat(distanceKm.toFixed(2)),
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    setCalculatedDonors(results);
  }

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMsg = { sender: 'user' as const, text: userText };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Clinical NLP rule triage simulator
    setTimeout(() => {
      let botResponse = '';
      let triage: 'mild' | 'moderate' | 'emergency' = 'mild';

      const lower = userText.toLowerCase();
      if (lower.includes('chest') || lower.includes('breath') || lower.includes('severe') || lower.includes('bleed')) {
        triage = 'emergency';
        botResponse = '⚠️ High Priority Alert: Your stated symptoms may indicate an acute medical condition. Please seek immediate in-person emergency attention or call national emergency response (+91 112) without delay.';
      } else if (lower.includes('fever') || lower.includes('headache') || lower.includes('cough') || lower.includes('vomit')) {
        triage = 'moderate';
        botResponse = 'Preliminary Triage: Symptoms correlate with mild acute viral response or dehydration. Ensure electrolyte hydration, monitor body temperature every 4 hours, and consult a registered physician if persistent past 48 hours.';
      } else {
        triage = 'mild';
        botResponse = 'Routine Query Logged: Stay hydrated, maintain balanced nutrition, and record symptom onset progression for clinical evaluation.';
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse, triageLevel: triage }]);
    }, 450);
  };

  const isPumpActive = soilMoisture < 30;

  // Dynamic estimated reading time calculation based on project content length (200 words per minute)
  const { readingTimeMinutes, wordCount } = useMemo(() => {
    if (!project) return { readingTimeMinutes: 1, wordCount: 0 };
    const fullText = [
      project.title,
      project.tagline,
      project.overview,
      ...(project.architecturePoints || []),
      ...(project.keyFeatures || []),
      project.ecoBenefit || '',
      ...(project.roadmap?.map((p) => `${p.title} ${p.summary} ${p.deliverables?.join(' ') || ''}`) || []),
    ].join(' ');

    const words = fullText.trim().split(/\s+/).filter(Boolean).length;
    // Assuming standard 200 words per minute reading speed
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { readingTimeMinutes: minutes, wordCount: words };
  }, [project]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl max-w-4xl w-full shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        {/* Subtle Reading Scroll Progress Bar pinned at the top */}
        <div className="h-1 w-full bg-stone-800/80 shrink-0 overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Content reading progress"
          />
        </div>

        {/* Scrollable Modal Content */}
        <div 
          onScroll={handleScroll}
          className="p-5 sm:p-8 overflow-y-auto flex-1 relative"
        >
          {/* Top Control Bar with Slide Navigation & Close */}
          <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
            {totalProjects && totalProjects > 1 && (
              <div className="hidden sm:flex items-center gap-1 bg-stone-950/90 border border-stone-800 rounded-lg p-1 text-xs text-stone-400">
                <button
                  type="button"
                  onClick={onPrevProject}
                  disabled={!onPrevProject}
                  className="px-1.5 py-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Previous project (Arrow Left key)"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <kbd className="text-[10px] font-mono text-stone-500 bg-stone-900 border border-stone-800 px-1 rounded">←</kbd>
                </button>
                <span className="px-1.5 text-[11px] font-mono tabular-nums text-stone-300">
                  {(projectIndex ?? 0) + 1} / {totalProjects}
                </span>
                <button
                  type="button"
                  onClick={onNextProject}
                  disabled={!onNextProject}
                  className="px-1.5 py-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Next project (Arrow Right key)"
                  aria-label="Next project"
                >
                  <kbd className="text-[10px] font-mono text-stone-500 bg-stone-900 border border-stone-800 px-1 rounded">→</kbd>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Direct Copy URL Action Button */}
            <button
              type="button"
              onClick={handleCopyUrl}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                copied
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/80 shadow-sm'
                  : 'bg-stone-950/90 text-stone-300 hover:text-white border-stone-800 hover:bg-stone-800'
              }`}
              title="Copy direct URL to this project"
              aria-label="Copy direct URL to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Copy URL</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center gap-1.5"
              aria-label="Close project modal"
              title="Close modal (Esc key)"
            >
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-stone-500 bg-stone-950 border border-stone-800 px-1.5 py-0.5 rounded">Esc</kbd>
              <X className="w-5 h-5" />
            </button>
          </div>

        {/* Header Metadata (Zero-Pill Discipline with Estimated Reading Time) */}
        <div className="space-y-2 mb-6 pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
            <span className="text-emerald-400 font-semibold">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Production Architecture</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{readingTimeMinutes} min read</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>By Ayush Tripathi</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="project-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-medium shadow-xs"
              title={`Estimated reading time: ${readingTimeMinutes} min (${wordCount} words based on 200 WPM)`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{readingTimeMinutes} min read</span>
              <span className="text-emerald-500/70 font-mono text-[10px]">({wordCount} words)</span>
            </div>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Media Banner with Fallback */}
        <div className="relative rounded-xl overflow-hidden aspect-video bg-stone-950 border border-stone-800 mb-6">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
              {project.technologies.map((tech, idx) => (
                <span key={tech}>
                  {tech}
                  {idx < project.technologies.length - 1 && <span className="ml-2 text-stone-500" aria-hidden="true">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                System Overview
              </h3>
              <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>~{readingTimeMinutes} min read ({wordCount} words)</span>
              </span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              {project.overview}
            </p>
            {project.ecoBenefit && (
              <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-300 space-y-1">
                <span className="font-semibold flex items-center gap-1.5 text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Eco-Friendly Efficiency Metric
                </span>
                <p>{project.ecoBenefit}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Engineering Architecture
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              {project.architecturePoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chronological Development Roadmap */}
        <ProjectRoadmap roadmap={project.roadmap} projectTitle={project.title} />

        {/* INTERACTIVE DEMO SIMULATOR SECTION */}
        <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Interactive Simulator
              </h4>
            </div>
            <span className="text-xs text-emerald-400">
              Client-side verification of Ayush's implementation
            </span>
          </div>

          {/* SIMULATOR 1: Haversine Distance & Spatial Matching */}
          {project.interactiveDemoType === 'haversine' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-400">
                Experience the real Haversine formula distance calculation in action. Select an emergency blood group 
                to immediately sort nearby verified donors without third-party geocoding API round-trips.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Emergency Blood Group Needed
                  </label>
                  <select
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="All">All Blood Types</option>
                    <option value="O+">O+ (Universal Donor / High Demand)</option>
                    <option value="O-">O- (Universal Red Cell)</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+ (Universal Plasma)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Patient / Hospital Location
                  </label>
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => {
                      setUserLocation(e.target.value);
                      runHaversineCalculation(e.target.value, selectedBloodGroup);
                    }}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Haversine proximity sorted list */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-medium text-stone-400 flex items-center justify-between">
                  <span>Matched Donors (Sorted by Haversine Distance)</span>
                  <span className="tabular-nums text-emerald-400">{calculatedDonors.length} Donors Found</span>
                </div>
                <div className="divide-y divide-stone-800/80 rounded-lg border border-stone-800 bg-stone-900/60 overflow-hidden">
                  {calculatedDonors.map((donor) => (
                    <div key={donor.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-rose-400 bg-rose-950/80 border border-rose-900/80 px-2 py-0.5 rounded text-[11px]">
                          {donor.blood}
                        </span>
                        <div>
                          <div className="font-medium text-stone-200">{donor.name}</div>
                          <div className="text-[11px] text-stone-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-500" />
                            <span>{donor.area}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400 tabular-nums">
                          {donor.distanceKm} km away
                        </div>
                        <div className="text-[10px] text-stone-400">Response: {donor.responseRate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: IoT Soil & Precision Irrigation */}
          {project.interactiveDemoType === 'soil_iot' && (
            <div className="space-y-5">
              <p className="text-xs text-stone-400">
                Adjust sensor telemetry values to simulate how ESP32 microcontroller triggers irrigation solenoid valves 
                only when soil moisture drops below the critical 30% threshold.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Soil Moisture</span>
                    <span className="font-mono font-bold text-emerald-400 tabular-nums">{soilMoisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={soilMoisture}
                    onChange={(e) => setSoilMoisture(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="text-[11px] text-stone-500">Threshold: &lt;30% triggers pump</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Ambient Temp</span>
                    <span className="font-mono font-bold text-amber-400 tabular-nums">{temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[11px] text-stone-500">DHT22 Ambient Sensor</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Air Humidity</span>
                    <span className="font-mono font-bold text-sky-400 tabular-nums">{humidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={humidity}
                    onChange={(e) => setHumidity(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="text-[11px] text-stone-500">Transpiration Index</div>
                </div>
              </div>

              {/* Status Relay Actuation Display */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isPumpActive ? 'bg-emerald-950 text-emerald-400 animate-pulse' : 'bg-stone-800 text-stone-500'}`}>
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-300">
                      Solenoid Irrigation Relay: {isPumpActive ? 'ACTIVATED (Watering)' : 'STANDBY (Conserving Water)'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {isPumpActive
                        ? 'Low moisture detected. Precision dispensing active.'
                        : 'Moisture optimal. Water saved.'}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-stone-400 border border-stone-800 px-3 py-1.5 rounded-lg bg-stone-950">
                  ML Crop Disease Health: <span className="text-emerald-400 font-semibold">98.4% Normal (No Blight)</span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 3: Healthcare Chatbot Triage */}
          {project.interactiveDemoType === 'chatbot' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-400">
                Interactive dialogue simulator executing symptom keyword evaluation and NLP contextual triage:
              </p>

              <div className="h-48 overflow-y-auto p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-2 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg max-w-[85%] ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-emerald-800/60 text-white border border-emerald-700/60'
                        : 'mr-auto bg-stone-800/80 text-stone-200 border border-stone-700/80'
                    }`}
                  >
                    {msg.text}
                    {msg.triageLevel === 'emergency' && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-rose-300 font-bold uppercase">
                        <AlertTriangle className="w-3 h-3" /> Urgent Attention Required
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sample quick prompts */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setChatInput('Severe chest pain and sudden shortness of breath')}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                >
                  Prompt: Chest pain & breathing
                </button>
                <button
                  type="button"
                  onClick={() => setChatInput('Mild headache and sore throat for 2 days')}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                >
                  Prompt: Mild headache & sore throat
                </button>
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Describe symptoms (e.g., headache, fever, cough)..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                <span>Live Repository / Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyUrl}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                copied
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/80 shadow-sm'
                  : 'text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 border-stone-700/60'
              }`}
              title="Copy direct project link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onPrevProject && (
              <button
                type="button"
                onClick={onPrevProject}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                title="Previous project (Arrow Left key)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
                <kbd className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-700/60 px-1 rounded">←</kbd>
              </button>
            )}

            {onNextProject && (
              <button
                type="button"
                onClick={onNextProject}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                title="Next project (Arrow Right key)"
              >
                <span className="hidden sm:inline">Next</span>
                <kbd className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-700/60 px-1 rounded">→</kbd>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-900/95 text-white border border-emerald-500/80 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold text-emerald-400 tracking-wide">{toastMessage}</span>
          <span className="text-[11px] text-stone-300 border-l border-stone-700 pl-2">
            Direct project URL copied to clipboard
          </span>
        </div>
      )}
    </div>
  </div>
  );
};
