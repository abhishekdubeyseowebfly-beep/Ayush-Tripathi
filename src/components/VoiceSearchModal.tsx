import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Sparkles, 
  Search, 
  Compass, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Sun,
  Moon,
  Leaf,
  FileText,
  Cpu,
  Globe,
  CornerDownLeft
} from 'lucide-react';
import { PageTab, Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: PageTab) => void;
  onSelectProject: (project: Project) => void;
  onFilterProjects: (filter: { category?: 'all' | 'web' | 'iot' | 'ai'; tech?: string; query?: string }) => void;
  onToggleTheme: () => void;
  onOpenEcoModal: () => void;
  onOpenShortcutsModal: () => void;
  theme: 'dark' | 'light';
}

export type RecognitionState = 'idle' | 'listening' | 'processing' | 'success' | 'error' | 'unsupported';

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onFilterProjects,
  onToggleTheme,
  onOpenEcoModal,
  onOpenShortcutsModal,
  theme,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [status, setStatus] = useState<RecognitionState>('idle');
  const [statusMessage, setStatusMessage] = useState('Listening... Speak a command or search query');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [voiceAudioFeedback, setVoiceAudioFeedback] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ayush_voice_audio_feedback') !== 'false';
    }
    return true;
  });

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  // Check Web Speech API support
  const isSpeechSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Spoken verbal feedback synthesis
  const speakFeedback = useCallback((message: string) => {
    if (!voiceAudioFeedback) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore synthesis errors
      }
    }
  }, [voiceAudioFeedback]);

  // Execute parsed voice command
  const executeCommand = useCallback((rawQuery: string) => {
    const text = rawQuery.trim().toLowerCase();
    if (!text) return;

    setStatus('processing');
    setTranscript(rawQuery);

    // 1. Navigation Commands
    if (
      text.includes('go to project') || 
      text.includes('show project') || 
      text.includes('open project') || 
      text === 'projects' || 
      text === 'project' ||
      text.includes('portfolio')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Projects');
      setLastAction('Navigated to Projects Catalog');
      speakFeedback('Navigating to Projects');
      onNavigate('projects');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('experience') || 
      text.includes('internship') || 
      text.includes('timeline') || 
      text.includes('career') ||
      text.includes('work history')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Experience Timeline');
      setLastAction('Navigated to Experience Page');
      speakFeedback('Opening Experience Timeline');
      onNavigate('experience');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('skill') || 
      text.includes('tech stack') || 
      text.includes('technologies') ||
      text.includes('stack')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Technical Skills');
      setLastAction('Navigated to Skills Directory');
      speakFeedback('Opening Technical Skills');
      onNavigate('skills');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('education') || 
      text.includes('academic') || 
      text.includes('university') || 
      text.includes('college') ||
      text.includes('btech') ||
      text.includes('school')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Education & Academics');
      setLastAction('Navigated to Education Records');
      speakFeedback('Opening Education Records');
      onNavigate('education');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('achievement') || 
      text.includes('hackathon') || 
      text.includes('award') || 
      text.includes('smart india') ||
      text.includes('sih')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Achievements');
      setLastAction('Navigated to Achievements & Hackathons');
      speakFeedback('Opening Achievements');
      onNavigate('achievements');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('resume') || 
      text.includes('cv') || 
      text.includes('curriculum vitae')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Resume');
      setLastAction('Navigated to Verified Resume');
      speakFeedback('Opening Verified Resume');
      onNavigate('resume');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('contact') || 
      text.includes('hire') || 
      text.includes('reach out') || 
      text.includes('send message') ||
      text.includes('email ayush')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Contact Page');
      setLastAction('Navigated to Contact Channels');
      speakFeedback('Opening Contact Channels');
      onNavigate('contact');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('home') || 
      text.includes('overview') || 
      text.includes('about') ||
      text.includes('front page')
    ) {
      setStatus('success');
      setStatusMessage('Navigating to Overview');
      setLastAction('Navigated to Overview');
      speakFeedback('Opening Overview');
      onNavigate('home');
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    // 2. Direct Project Modal Invocations
    const lifelineMatch = PROJECTS.find((p) => p.id === 'lifeline-ai');
    if (
      lifelineMatch && 
      (text.includes('lifeline') || text.includes('blood donation') || text.includes('blood'))
    ) {
      setStatus('success');
      setStatusMessage('Opening Lifeline AI Case Study');
      setLastAction('Launched Lifeline AI Architecture Simulator');
      speakFeedback('Opening Lifeline AI Project');
      onNavigate('projects');
      onSelectProject(lifelineMatch);
      timeoutRef.current = setTimeout(onClose, 1200);
      return;
    }

    const agriMatch = PROJECTS.find((p) => p.id === 'iot-smart-agriculture');
    if (
      agriMatch && 
      (text.includes('agriculture') || text.includes('farming') || text.includes('irrigation') || text.includes('soil'))
    ) {
      setStatus('success');
      setStatusMessage('Opening IoT Smart Agriculture System');
      setLastAction('Launched Smart Agriculture Simulator');
      speakFeedback('Opening IoT Smart Agriculture Project');
      onNavigate('projects');
      onSelectProject(agriMatch);
      timeoutRef.current = setTimeout(onClose, 1200);
      return;
    }

    const chatbotMatch = PROJECTS.find((p) => p.id === 'healthcare-chatbot');
    if (
      chatbotMatch && 
      (text.includes('chatbot') || text.includes('healthcare') || text.includes('medical') || text.includes('doctor'))
    ) {
      setStatus('success');
      setStatusMessage('Opening Healthcare Chatbot Case Study');
      setLastAction('Launched Healthcare Chatbot Simulator');
      speakFeedback('Opening Healthcare Chatbot');
      onNavigate('projects');
      onSelectProject(chatbotMatch);
      timeoutRef.current = setTimeout(onClose, 1200);
      return;
    }

    // 3. Category Domain Filters
    if (
      text.includes('iot') || 
      text.includes('hardware') || 
      text.includes('sensors') || 
      text.includes('esp32') || 
      text.includes('arduino')
    ) {
      setStatus('success');
      setStatusMessage('Filtering Projects: Hardware & IoT');
      setLastAction('Filtered projects by IoT domain');
      speakFeedback('Showing IoT and Embedded Systems Projects');
      onNavigate('projects');
      onFilterProjects({ category: 'iot', tech: 'all', query: '' });
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('web') || 
      text.includes('full stack') || 
      text.includes('frontend') || 
      text.includes('backend')
    ) {
      setStatus('success');
      setStatusMessage('Filtering Projects: Full-Stack Web & GIS');
      setLastAction('Filtered projects by Web domain');
      speakFeedback('Showing Full-Stack Web Projects');
      onNavigate('projects');
      onFilterProjects({ category: 'web', tech: 'all', query: '' });
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('ai') || 
      text.includes('machine learning') || 
      text.includes('nlp') || 
      text.includes('artificial intelligence') ||
      text.includes('model')
    ) {
      setStatus('success');
      setStatusMessage('Filtering Projects: AI & Machine Learning');
      setLastAction('Filtered projects by AI domain');
      speakFeedback('Showing AI and Machine Learning Projects');
      onNavigate('projects');
      onFilterProjects({ category: 'ai', tech: 'all', query: '' });
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('all projects') || 
      text.includes('reset') || 
      text.includes('clear filter') || 
      text.includes('show all') ||
      text.includes('clear search')
    ) {
      setStatus('success');
      setStatusMessage('Resetting all project filters');
      setLastAction('Showing All Projects');
      speakFeedback('Showing all projects');
      onNavigate('projects');
      onFilterProjects({ category: 'all', tech: 'all', query: '' });
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    // 4. Utility & System Commands
    if (
      text.includes('dark mode') || 
      text.includes('light mode') || 
      text.includes('toggle theme') || 
      text.includes('switch theme') ||
      text.includes('change theme')
    ) {
      setStatus('success');
      const targetTheme = theme === 'dark' ? 'Light' : 'Dark';
      setStatusMessage(`Switched theme to ${targetTheme} Mode`);
      setLastAction(`Toggled to ${targetTheme} Mode`);
      speakFeedback(`Switched to ${targetTheme} Mode`);
      onToggleTheme();
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    if (
      text.includes('eco') || 
      text.includes('carbon') || 
      text.includes('footprint') || 
      text.includes('green')
    ) {
      setStatus('success');
      setStatusMessage('Opening Eco-Footprint Report');
      setLastAction('Opened Low-Carbon Eco Modal');
      speakFeedback('Opening Eco Footprint Assessment');
      onOpenEcoModal();
      timeoutRef.current = setTimeout(onClose, 1200);
      return;
    }

    if (
      text.includes('shortcut') || 
      text.includes('keyboard') || 
      text.includes('help') || 
      text.includes('keys')
    ) {
      setStatus('success');
      setStatusMessage('Opening Keyboard Shortcuts');
      setLastAction('Opened Shortcuts Cheatsheet');
      speakFeedback('Opening Keyboard Shortcuts');
      onOpenShortcutsModal();
      timeoutRef.current = setTimeout(onClose, 1200);
      return;
    }

    // 5. Technology Keyword Filter (e.g., Python, React, FastAPI, TensorFlow, MySQL, etc.)
    const techKeywords = [
      'python', 'react', 'fastapi', 'typescript', 'javascript', 'mongodb', 
      'mysql', 'arduino', 'esp32', 'node-red', 'tensorflow', 'jwt', 
      'leaflet', 'docker', 'c++', 'java', 'html', 'css', 'gis', 'haversine'
    ];

    const matchedTech = techKeywords.find((tech) => text.includes(tech));
    if (matchedTech) {
      const cleanKeyword = matchedTech.charAt(0).toUpperCase() + matchedTech.slice(1);
      setStatus('success');
      setStatusMessage(`Filtering projects for: ${cleanKeyword}`);
      setLastAction(`Filtered by technology: ${cleanKeyword}`);
      speakFeedback(`Filtering projects matching ${cleanKeyword}`);
      onNavigate('projects');
      onFilterProjects({ category: 'all', query: matchedTech });
      timeoutRef.current = setTimeout(onClose, 1400);
      return;
    }

    // 6. Generic Fallback: Search Projects with spoken phrase
    // Remove filler phrases for clean search
    const cleanSearch = text
      .replace(/^(search for|search|find|filter by|show me|look for|lookup)\s+/i, '')
      .replace(/[?.!]/g, '')
      .trim();

    if (cleanSearch) {
      setStatus('success');
      setStatusMessage(`Searching projects for: "${cleanSearch}"`);
      setLastAction(`Applied search: "${cleanSearch}"`);
      speakFeedback(`Searching projects for ${cleanSearch}`);
      onNavigate('projects');
      onFilterProjects({ category: 'all', query: cleanSearch });
      timeoutRef.current = setTimeout(onClose, 1400);
    } else {
      setStatus('error');
      setStatusMessage("Could not understand command. Please try again or select a suggested command below.");
    }
  }, [
    onNavigate, 
    onSelectProject, 
    onFilterProjects, 
    onToggleTheme, 
    onOpenEcoModal, 
    onOpenShortcutsModal, 
    theme, 
    speakFeedback, 
    onClose
  ]);

  // Start speech recognition instance
  const startListening = useCallback(() => {
    if (!isSpeechSupported) {
      setStatus('unsupported');
      setStatusMessage('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari, or click any sample command below.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const SpeechRecognition = 
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('listening');
        setStatusMessage('Listening... Speak a navigation command or project filter');
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          setIsListening(false);
          executeCommand(final);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'no-speech') {
          setStatus('idle');
          setStatusMessage('No speech detected. Click the microphone to try again.');
        } else if (event.error === 'not-allowed') {
          setStatus('error');
          setStatusMessage('Microphone access was denied. Please allow microphone permissions in your browser or click any command below.');
        } else {
          setStatus('error');
          setStatusMessage(`Speech recognition error: ${event.error}. You can also click the quick sample commands below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      setStatus('error');
      setStatusMessage('Unable to access microphone. Please check permissions or select a command below.');
    }
  }, [isSpeechSupported, executeCommand]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Handle modal lifecycle
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setInterimTranscript('');
      setLastAction(null);
      document.body.style.overflow = 'hidden';
      // Automatically initiate listening when opened
      startListening();
    } else {
      stopListening();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.body.style.overflow = 'unset';
    }

    return () => {
      stopListening();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, startListening, stopListening]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleAudioFeedback = () => {
    setVoiceAudioFeedback((prev) => {
      const next = !prev;
      localStorage.setItem('ayush_voice_audio_feedback', String(next));
      return next;
    });
  };

  if (!isOpen) return null;

  // Suggested Voice Commands organized by domain
  const commandCategories = [
    {
      label: 'Page Navigation',
      commands: [
        { text: 'Go to Experience', actionText: 'Navigates to Experience Timeline' },
        { text: 'Show Projects', actionText: 'Navigates to Projects catalog' },
        { text: 'View Resume', actionText: 'Navigates to ATS-verified Resume' },
        { text: 'Go to Skills', actionText: 'Navigates to Tech Stack matrix' },
        { text: 'Go to Education', actionText: 'Navigates to Academics & Scores' },
        { text: 'Go to Achievements', actionText: 'Navigates to SIH Hackathon & Honors' },
      ],
    },
    {
      label: 'Filter & Search Projects',
      commands: [
        { text: 'Filter by Python', actionText: 'Shows projects using Python' },
        { text: 'Show IoT Projects', actionText: 'Filters embedded systems & IoT' },
        { text: 'Show Full-Stack Web', actionText: 'Filters web applications & GIS' },
        { text: 'Show AI Projects', actionText: 'Filters TensorFlow & NLP systems' },
        { text: 'Reset all filters', actionText: 'Shows all 3 flagship projects' },
      ],
    },
    {
      label: 'Inspect Project Case Studies',
      commands: [
        { text: 'Open Lifeline AI', actionText: 'Opens Blood Donation Spatial GIS' },
        { text: 'Open Smart Agriculture', actionText: 'Opens ESP32 IoT automated irrigation' },
        { text: 'Open Healthcare Chatbot', actionText: 'Opens Flask NLP symptom checker' },
      ],
    },
    {
      label: 'Voice Preferences & Utilities',
      commands: [
        { text: 'Toggle dark mode', actionText: 'Switches light/dark theme' },
        { text: 'Show eco footprint', actionText: 'Opens low-carbon telemetry' },
        { text: 'Show shortcuts', actionText: 'Opens keyboard cheatsheet' },
      ],
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden text-stone-100">
        
        {/* Top Header & Controls */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/70 text-emerald-400">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="voice-modal-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Hands-Free Voice Search & Navigation</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Web Speech API
                </span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Verbally filter systems, launch simulators, or navigate pages hands-free.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Speech Synthesis Toggle */}
            <button
              type="button"
              onClick={toggleAudioFeedback}
              title={voiceAudioFeedback ? 'Voice responses active (Click to mute)' : 'Voice responses muted (Click to enable)'}
              aria-label={voiceAudioFeedback ? 'Mute spoken audio confirmations' : 'Enable spoken audio confirmations'}
              className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-950/60 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
            >
              {voiceAudioFeedback ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-950/60 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
              aria-label="Close voice search modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ACTIVE VOICE LISTENING HERO CARD */}
        <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-5 mb-5 text-center relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* Subtle Ambient Radial Glow */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isListening 
              ? 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)] opacity-100' 
              : 'opacity-0'
          }`} />

          {/* Interactive Microphone Pulsing Center Button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            title={isListening ? 'Click to pause listening' : 'Click to start listening'}
            className={`relative p-5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50 mb-3.5 ${
              isListening
                ? 'bg-emerald-500 text-stone-950 scale-105 shadow-[0_0_24px_rgba(16,185,129,0.5)]'
                : status === 'error' || status === 'unsupported'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-8 h-8 animate-bounce" />
                <span className="absolute -inset-2 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none" />
              </>
            ) : status === 'unsupported' ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          {/* Live Waveform Indicator (shown while listening) */}
          {isListening && (
            <div className="flex items-center justify-center gap-1.5 h-6 mb-3" aria-hidden="true">
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-1 h-5 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s]" />
              <span className="w-1 h-6 bg-emerald-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
              <span className="w-1 h-4 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.15s]" />
              <span className="w-1 h-2 bg-emerald-500 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.25s]" />
            </div>
          )}

          {/* Real-time Transcribed Text Display */}
          <div className="min-h-[44px] flex flex-col items-center justify-center max-w-lg px-2">
            {interimTranscript && (
              <div className="text-emerald-300 text-sm italic font-medium animate-pulse">
                "{interimTranscript}..."
              </div>
            )}

            {transcript && !interimTranscript && (
              <div className="text-white text-base font-semibold">
                "{transcript}"
              </div>
            )}

            {!transcript && !interimTranscript && (
              <div className="text-xs sm:text-sm text-stone-400 font-normal">
                {statusMessage}
              </div>
            )}
          </div>

          {/* Status / Feedback Pill */}
          {lastAction && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lastAction}</span>
            </div>
          )}
        </div>

        {/* CLICKABLE COMMAND CHEATSHEET (Scrollable section) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono">
              Try Saying (or Click to Execute Instantly):
            </span>
            <span className="text-[11px] text-stone-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[10px]">Esc</kbd> to exit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {commandCategories.map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                <div className="text-[11px] font-bold text-stone-300 tracking-wide uppercase font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{cat.label}</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {cat.commands.map((cmd, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => executeCommand(cmd.text)}
                      title={cmd.actionText}
                      className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-emerald-950/70 border border-stone-800 hover:border-emerald-700/80 text-left transition-all cursor-pointer text-xs text-stone-300 hover:text-white"
                    >
                      <Mic className="w-3 h-3 text-stone-500 group-hover:text-emerald-400 shrink-0" />
                      <span>"{cmd.text}"</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Guidance Bar */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Accessible hands-free portfolio voice controller</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => executeCommand('all projects')}
              className="text-stone-400 hover:text-emerald-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
