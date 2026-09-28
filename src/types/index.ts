export type PageTab = 
  | 'home'
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'education'
  | 'achievements'
  | 'resume'
  | 'contact';

export interface DevelopmentPhase {
  phase: string;
  tag: 'Research' | 'MVP Development' | 'Integration' | 'Optimization' | string;
  status: 'completed' | 'in_progress' | 'future';
  dateRange: string;
  title: string;
  summary: string;
  deliverables: string[];
  metric?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web' | 'iot' | 'ai';
  categoryLabel: string;
  technologies: string[];
  image: string;
  featured: boolean;
  overview: string;
  architecturePoints: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveUrl?: string;
  ecoBenefit?: string;
  interactiveDemoType?: 'haversine' | 'soil_iot' | 'chatbot';
  roadmap?: DevelopmentPhase[];
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  technologies: string[];
  summary: string;
  contributions: string[];
  impactMetric: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  scoreLabel: string;
  score: string;
  details: string[];
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    category: string;
    experienceYears?: string;
    highlight?: boolean;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  badge: string;
  description: string;
  highlights: string[];
}

export interface CareerMilestone {
  id: string;
  category: 'internship' | 'project' | 'education' | 'recognition' | 'career';
  categoryLabel: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  status: 'completed' | 'active' | 'future';
  tag: string;
  summary: string;
  contributions: string[];
  technologies?: string[];
  impactMetric?: string;
  linkTab?: PageTab;
  linkText?: string;
}

