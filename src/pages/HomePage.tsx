import React from 'react';
import { PageTab, Project } from '../types';
import { PERSONAL_INFO, PROJECTS, ACHIEVEMENTS, ECO_STATS } from '../data/portfolioData';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Terminal, 
  Cpu, 
  Leaf, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onSelectProject: (project: Project) => void;
  onOpenEcoModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject, onOpenEcoModal }) => {
  return (
    <div className="space-y-20">
      {/* HERO SECTION: Split Layout with High-Fidelity Portrait & Oversized Typographic Impact */}
      <section className="pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline, Bio & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Availability & Sub-discipline unboxed metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Available for SDE / Full-Stack Roles (2025–2026)
                </span>
                <span aria-hidden="true">·</span>
                <span>B.Tech CSE United University</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  Prayagraj, India
                </span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                Architecting <span className="text-emerald-400">scalable full-stack</span> systems & low-power IoT solutions.
              </h1>

              {/* Body Prose */}
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-light">
                Hi, I'm <strong className="text-white font-medium">Ayush Tripathi</strong>. Final-year Computer Science student 
                specializing in React.js, FastAPI, Node.js, and Python. I craft end-to-end IoT sensor networks, 
                AI-driven healthcare applications, and production-style full-stack platforms with clean architecture.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-3 text-sm font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span>Explore Featured Works</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 text-sm font-medium text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Key Credentials Strip */}
              <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white tabular-nums">2</div>
                  <div className="text-xs text-stone-400">Software Internships</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tabular-nums">SIH '24</div>
                  <div className="text-xs text-stone-400">IoT Category Finalist</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tabular-nums">7.1 / 10</div>
                  <div className="text-xs text-stone-400">B.Tech CSE CGPA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400 tabular-nums">3+</div>
                  <div className="text-xs text-stone-400">Flagship Projects</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Portrait & Eco Badge Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl group">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt="Ayush Tripathi - Full-Stack Developer"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar container if needed
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Contrast Scrim with unboxed data */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        Ayush Tripathi
                      </span>
                      <button
                        onClick={onOpenEcoModal}
                        className="flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded cursor-pointer hover:bg-emerald-900 transition-colors"
                      >
                        <Leaf className="w-3 h-3 text-emerald-400" />
                        <span>{ECO_STATS.carbonPerView}</span>
                      </button>
                    </div>
                    <div className="text-sm font-medium text-stone-200">
                      Full-Stack Web Developer & IoT Systems Engineer
                    </div>
                    <div className="text-xs text-stone-400">
                      United University · Class of 2026
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative subtle ambient glow */}
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl -z-10 rounded-full pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* QUICK EXPLORE CHANNELS: Dedicated Pages Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Dedicated Portfolio Sections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Explore Every Dimension of My Work
            </h2>
          </div>
          <p className="text-xs text-stone-400 max-w-sm">
            Each section opens as an independent page with in-depth technical breakdowns and interactive simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Projects Page */}
          <div 
            onClick={() => onNavigate('projects')}
            className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/60 transition-all cursor-pointer group hover:-translate-y-1 shadow-sm"
          >
            <div className="p-3 rounded-xl bg-stone-800/80 w-fit text-emerald-400 mb-4 group-hover:bg-emerald-950 transition-colors">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Featured Projects</span>
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Lifeline AI (Haversine Blood Matching), IoT-Based Smart Agriculture, and AI Healthcare Chatbot with live working simulators.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>Open Projects Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Experience Page */}
          <div 
            onClick={() => onNavigate('experience')}
            className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/60 transition-all cursor-pointer group hover:-translate-y-1 shadow-sm"
          >
            <div className="p-3 rounded-xl bg-stone-800/80 w-fit text-emerald-400 mb-4 group-hover:bg-emerald-950 transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Internship Experience</span>
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Software engineering internships at Opam Technology (Python Automation) and Navodita Infotech (Java/MySQL systems).
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>Open Experience Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Skills & Education */}
          <div 
            onClick={() => onNavigate('skills')}
            className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/60 transition-all cursor-pointer group hover:-translate-y-1 shadow-sm"
          >
            <div className="p-3 rounded-xl bg-stone-800/80 w-fit text-emerald-400 mb-4 group-hover:bg-emerald-950 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Skills & Academics</span>
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Proficiency matrix across Python, React, Java, TypeScript, MongoDB, MySQL, and Core Computer Science fundamentals.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>Open Skills Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FLAGSHIP SPOTLIGHT (BENTO FORMAT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Flagship Innovation Spotlight
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Engineered for Real-World Societal Impact
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="hidden sm:flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View all 3 projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Card: Lifeline AI */}
          <div className="lg:col-span-8 rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-emerald-500/60 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Full-Stack Web & GIS Innovation
                </span>
                <span className="text-xs text-stone-400">FastAPI · React · Leaflet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Lifeline AI — Smart Blood Donation Network
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Role-based access (Donor, Recipient, Admin) platform with JWT authentication and bcrypt password hashing. 
                Implemented geolocation-based donor search utilizing the mathematical Haversine distance formula to sort donors 
                by physical proximity without third-party geocoding API reliance.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-400">
                <span className="text-stone-300">FastAPI</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">React + TypeScript</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">MongoDB Atlas</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300">Leaflet GIS</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onSelectProject(PROJECTS[0])}
                className="px-4 py-2 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Architecture & Haversine Demo</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs text-stone-400">
                Deployed on Vercel & Render
              </div>
            </div>
          </div>

          {/* Side Card: IoT Smart Agriculture (Eco-Tech Focus) */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-stone-900 border border-emerald-800/60 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Eco-Friendly Clean Tech
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                IoT-Based Smart Agriculture System
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Automated water delivery system with ESP32 sensor telemetry saving over 40% agricultural water, 
                combined with an ML leaf disease detection module.
              </p>
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-900/60 text-xs text-emerald-300">
                Selected participant at <strong>Smart India Hackathon 2024</strong> (IoT Category).
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800/80">
              <button
                onClick={() => onSelectProject(PROJECTS[1])}
                className="w-full py-2 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-900/60 hover:bg-emerald-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Test IoT Moisture Simulator</span>
                <Cpu className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INVITATION TO CONNECT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Ready to Collaborate
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Looking for a dedicated Full-Stack or Software Engineering intern/engineer?
          </h2>
          <p className="text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            I bring hands-on experience in full-stack web platforms, Python automation, and Java backend architectures, 
            backed by strong computer science fundamentals.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
            >
              Contact Ayush Directly
            </button>
            <button
              onClick={() => onNavigate('resume')}
              className="px-6 py-2.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer"
            >
              Review Full Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
