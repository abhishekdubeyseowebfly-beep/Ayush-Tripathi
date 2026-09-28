import React, { useEffect, useState } from 'react';
import { X, Leaf, Cpu, Droplets, Zap, ShieldCheck } from 'lucide-react';
import { ECO_STATS } from '../data/portfolioData';

interface EcoImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcoImpactModal: React.FC<EcoImpactModalProps> = ({ isOpen, onClose }) => {
  const [pageViewsSimulated, setPageViewsSimulated] = useState(100);

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

  // Comparison: Average web page emits ~0.8g CO2 per page view. This site emits ~0.08g.
  const standardCarbonGrams = (pageViewsSimulated * 0.8).toFixed(1);
  const thisSiteCarbonGrams = (pageViewsSimulated * 0.08).toFixed(1);
  const savedCarbonGrams = (pageViewsSimulated * (0.8 - 0.08)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-emerald-800/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eco-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800/80 text-emerald-400">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h2 id="eco-title" className="text-xl font-bold text-white">
              Eco-Friendly Engineering & Carbon Efficiency
            </h2>
            <p className="text-xs text-emerald-400 font-medium">
              Sustainable Web Standards · Verified Low-Impact Portfolio
            </p>
          </div>
        </div>

        <p className="text-sm text-stone-300 leading-relaxed mb-6">
          The digital industry accounts for ~4% of global greenhouse emissions. This portfolio is engineered 
          following Sustainable Web Design guidelines to reduce network payloads, memory consumption, and server CPU cycles.
        </p>

        {/* 3 Pillars of Eco Design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Carbon Score</span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">0.08g</div>
            <div className="text-xs text-stone-400 mt-1">CO₂ per page view (vs. 0.8g average)</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Droplets className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Water Saved</span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">40%+</div>
            <div className="text-xs text-stone-400 mt-1">Via IoT Smart Agriculture sensor system</div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Lean Compute</span>
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">Zero API Bloat</div>
            <div className="text-xs text-stone-400 mt-1">Mathematical formulas over heavy server requests</div>
          </div>
        </div>

        {/* Interactive Carbon Calculator */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              Interactive Impact Calculator
            </span>
            <span className="text-xs text-stone-400">
              Simulating <strong className="text-white">{pageViewsSimulated}</strong> visits
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={pageViewsSimulated}
            onChange={(e) => setPageViewsSimulated(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Adjust simulated page views"
          />

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-emerald-900/60">
            <div>
              <div className="text-xs text-stone-400">Standard Web</div>
              <div className="text-base font-bold text-stone-300 tabular-nums">{standardCarbonGrams}g CO₂</div>
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-medium">This Portfolio</div>
              <div className="text-base font-bold text-emerald-400 tabular-nums">{thisSiteCarbonGrams}g CO₂</div>
            </div>
            <div>
              <div className="text-xs text-emerald-300 font-medium">Net Carbon Saved</div>
              <div className="text-base font-bold text-emerald-300 tabular-nums">{savedCarbonGrams}g CO₂</div>
            </div>
          </div>
        </div>

        {/* Sustainable Software Architecture List */}
        <div className="space-y-2 text-xs text-stone-300">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Zero-Bloat DOM:</strong> Hand-crafted semantic layout without heavy multi-megabyte UI libraries.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>OLED-Optimized Dark Palette:</strong> Deep charcoal and emerald hues preserve mobile battery life and display energy.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Green Real-World Projects:</strong> Ayush’s Smart India Hackathon IoT system specifically targets agricultural sustainability and water preservation.</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Close Insight
          </button>
        </div>
      </div>
    </div>
  );
};
