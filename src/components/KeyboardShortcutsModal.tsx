import React, { useEffect } from 'react';
import { X, Command, ArrowLeft, ArrowRight, CornerDownLeft, Search } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      keys: ['/'],
      description: 'Focus skills & competencies search',
      badge: 'Quick Search',
    },
    {
      keys: ['←', '→'],
      description: 'Navigate previous / next project in project modal',
      badge: 'Project Carousel',
    },
    {
      keys: ['Esc'],
      description: 'Close active modal or dismiss search focus',
      badge: 'Dismiss',
    },
    {
      keys: ['?'],
      description: 'Toggle this keyboard shortcuts cheatsheet',
      badge: 'Help',
    },
    {
      keys: ['V'],
      description: 'Trigger hands-free Voice Search & navigation',
      badge: 'Voice Assistant',
    },
    {
      keys: ['T'],
      description: 'Toggle Light / Dark theme mode',
      badge: 'Theme Switch',
    },
    {
      keys: ['1', '–', '7'],
      description: 'Switch between pages (1: Home, 2: Projects, 3: Exp, 4: Skills, 5: Edu, 6: Honors, 7: Contact)',
      badge: 'Page Nav',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Close shortcuts modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
            <Command className="w-5 h-5" />
          </div>
          <div>
            <h2 id="shortcuts-title" className="text-lg font-bold text-white tracking-tight">
              Keyboard Navigation & Shortcuts
            </h2>
            <p className="text-xs text-stone-400">
              Accessibility & speed controls for power users
            </p>
          </div>
        </div>

        <div className="divide-y divide-stone-800 border-y border-stone-800 mb-6">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-stone-200">{sc.description}</div>
                <div className="text-[10px] text-emerald-400/80 uppercase font-mono tracking-wider">{sc.badge}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {sc.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="min-w-6 px-2 py-1 text-xs font-mono font-semibold text-stone-200 bg-stone-950 border border-stone-700/80 rounded shadow-sm text-center"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-stone-400">
          <span>Tip: Shortcuts are paused while typing in form inputs.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
