import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, Leaf, ArrowUpRight, FileText, Command, Sun, Moon, Mic } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  currentTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenEcoModal: () => void;
  onOpenShortcutsModal?: () => void;
  onOpenVoiceModal?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onNavigate, 
  onOpenEcoModal, 
  onOpenShortcutsModal,
  onOpenVoiceModal,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-900/90 border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
        >
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            {PERSONAL_INFO.name}
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors cursor-pointer relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode (T key)' : 'Switch to Dark Mode (T key)'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            role="switch"
            aria-checked={theme === 'dark'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stone-300 hover:text-white bg-stone-950/70 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-stone-300 font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-stone-700 font-medium">Dark</span>
              </>
            )}
          </button>

          {/* Eco footprint modal trigger button */}
          <button
            onClick={onOpenEcoModal}
            title="Eco-friendly compute and low-carbon score"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 border border-emerald-800/60 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>&lt;0.08g CO₂</span>
          </button>

          {/* Interactive Resume View Action */}
          <button
            onClick={() => handleNavClick('resume')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              currentTab === 'resume'
                ? 'bg-emerald-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-100 hover:bg-stone-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Hands-Free Voice Search Trigger */}
          {onOpenVoiceModal && (
            <button
              type="button"
              onClick={onOpenVoiceModal}
              title="Hands-free Voice Search (V key)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Open voice search"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-medium hidden xl:inline">Voice</span>
              <kbd className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950 border border-emerald-700/60 px-1 rounded">V</kbd>
            </button>
          )}

          {/* Keyboard Shortcuts Trigger */}
          {onOpenShortcutsModal && (
            <button
              onClick={onOpenShortcutsModal}
              title="Keyboard shortcuts (? key)"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-400 hover:text-white bg-stone-950/70 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Open keyboard shortcuts"
            >
              <Command className="w-3.5 h-3.5 text-emerald-400" />
              <kbd className="text-[10px] font-mono text-stone-400 bg-stone-900 border border-stone-700/60 px-1 rounded">?</kbd>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap"
          >
            <span>Hire Ayush</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu and theme button */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenVoiceModal && (
            <button
              type="button"
              onClick={onOpenVoiceModal}
              title="Voice Search"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800/70 rounded-md"
              aria-label="Open voice search"
            >
              <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Voice</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800 border border-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          <button
            onClick={onOpenEcoModal}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800/70 rounded-md"
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Eco</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white rounded-lg bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-950/60 text-emerald-400 font-semibold border-l-2 border-emerald-500'
                    : 'text-stone-300 hover:bg-stone-800/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium bg-stone-800 text-stone-200"
            >
              <span>Color Theme: {theme === 'dark' ? 'Deep Stone (Dark)' : 'Crisp White (Light)'}</span>
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>
            <button
              onClick={() => handleNavClick('resume')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-stone-800 text-stone-200 hover:bg-stone-700"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <span>Get In Touch / Hire</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
