import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';

interface ScrollProgressBarProps {
  currentTab: PageTab;
}

// Long-form content pages where reading progress is valuable
const LONG_FORM_TABS: PageTab[] = [
  'experience',
  'education',
  'projects',
  'achievements',
  'skills',
  'resume',
];

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ currentTab }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const isLongFormPage = LONG_FORM_TABS.includes(currentTab);

  useEffect(() => {
    // Reset progress on tab change
    setScrollProgress(0);

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollableDistance = scrollHeight - clientHeight;

      if (totalScrollableDistance > 80) {
        setIsScrollable(true);
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const progressPercentage = (currentScroll / totalScrollableDistance) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progressPercentage)));
      } else {
        setIsScrollable(false);
        setScrollProgress(0);
      }
    };

    // Delay slightly to ensure newly rendered tab content has adjusted the document height
    const timer = setTimeout(updateScrollProgress, 50);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [currentTab]);

  // Only render on long-form content pages that have sufficient scrollable height
  if (!isLongFormPage || !isScrollable) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none no-print"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${currentTab} page scroll progress`}
    >
      {/* Background track rail */}
      <div className="w-full h-full bg-stone-900/30">
        {/* Glowing Emerald Progress Fill */}
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.85)] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};
