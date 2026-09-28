import React from 'react';
import { Mic } from 'lucide-react';

interface VoiceFloatingTriggerProps {
  onOpenVoiceModal: () => void;
}

export const VoiceFloatingTrigger: React.FC<VoiceFloatingTriggerProps> = ({ onOpenVoiceModal }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 no-print">
      <button
        type="button"
        onClick={onOpenVoiceModal}
        title="Hands-free Voice Search & Navigation (Press V key)"
        aria-label="Activate voice search and navigation"
        className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-stone-900/95 hover:bg-stone-850 text-stone-200 hover:text-white border border-emerald-500/40 hover:border-emerald-400 shadow-xl shadow-black/60 backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
        <Mic className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold tracking-tight hidden sm:inline">
          Voice Search
        </span>
        <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-stone-800 text-stone-400 border border-stone-700/80 group-hover:text-stone-200">
          V
        </kbd>
      </button>
    </div>
  );
};
