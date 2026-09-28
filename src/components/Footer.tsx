import React from 'react';
import { PageTab } from '../types';
import { PERSONAL_INFO, ECO_STATS } from '../data/portfolioData';
import { Github, Linkedin, Mail, Phone, Leaf, ArrowUp, FileText, Command } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenEcoModal: () => void;
  onOpenShortcutsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEcoModal, onOpenShortcutsModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-950 border-t border-stone-800 text-stone-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Full-Stack Web Developer & IoT Systems Engineer graduating in 2026 from United University.
              Committed to clean architecture, high-efficiency algorithms, and environmentally conscious tech.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
              <button
                onClick={onOpenEcoModal}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>{ECO_STATS.carbonPerView} carbon efficiency</span>
              </button>
              <span aria-hidden="true">·</span>
              <span>Prayagraj, India</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Featured Projects & Demos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Internships Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Technical Skills Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('education')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Education & Coursework
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Achievements & Hackathons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resume')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume Viewer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Connect Directly
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>github.com/{PERSONAL_INFO.githubUser}</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
                <span>linkedin.com/in/{PERSONAL_INFO.linkedinUser}</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{PERSONAL_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Ayush Tripathi. Built with sustainable web principles & modern React.
          </div>
          <div className="flex items-center gap-4">
            {onOpenShortcutsModal && (
              <button
                onClick={onOpenShortcutsModal}
                className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Open keyboard shortcuts (?)"
              >
                <Command className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shortcuts</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-800 rounded">?</kbd>
              </button>
            )}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
