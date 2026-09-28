import { Project, Internship, EducationItem, SkillCategory, Achievement, CareerMilestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Ayush Tripathi',
  headline: 'Full-Stack Web Developer & IoT Systems Engineer',
  role: 'Full-Stack Web Developer | B.Tech Computer Science Student',
  university: 'United University, Prayagraj',
  batch: '2022 – 2026',
  cgpa: '7.1 / 10',
  location: 'Prayagraj, Uttar Pradesh, India',
  phone: '+91 9140501104',
  phoneDisplay: '+91 9140501104',
  email: 'ayushtri830@gmail.com',
  github: 'https://github.com/Ayushtripathi186',
  githubUser: 'Ayushtripathi186',
  linkedin: 'https://linkedin.com/in/ayush-tripathi-4a0a02300',
  linkedinUser: 'ayush-tripathi-4a0a02300',
  summary:
    'Final-year Computer Science student specializing in full-stack web development with React.js, FastAPI/Node.js, and Python. Builds end-to-end IoT systems, AI-driven applications, and production-style full-stack platforms using machine learning, cloud databases, and clean backend architecture. Strong foundation in data structures, databases, and operating systems, with hands-on experience across two software development internships.',
  ecoTagline: 'Engineering sustainable web software and low-power IoT architectures for ecological balance.',
  avatarUrl: '/src/assets/images/ayush_profile_portrait_1790580895496.jpg',
};

export const PROJECTS: Project[] = [
  {
    id: 'lifeline-ai',
    title: 'Lifeline AI — Smart Blood Donation Network',
    tagline: 'Geolocation-based emergency blood donation platform with Haversine sorting & interactive GIS map',
    category: 'web',
    categoryLabel: 'Full-Stack Web & GIS',
    technologies: ['React.js', 'TypeScript', 'FastAPI', 'MongoDB Atlas', 'JWT', 'Leaflet', 'OpenStreetMap'],
    image: '/src/assets/images/project_lifeline_blood_1790580919473.jpg',
    featured: true,
    overview:
      'Architected a full-stack blood donation matching platform with role-based access (Donor, Recipient, Admin), JWT authentication, and bcrypt password hashing, backed by a RESTful FastAPI + MongoDB Atlas API.',
    architecturePoints: [
      'Implemented geolocation-based donor search using mathematical Haversine distance formula to sort donors by real-world geographic proximity without expensive third-party paid geocoding APIs.',
      'Constructed an interactive Leaflet / OpenStreetMap donor-request spatial map and an admin analytics dashboard.',
      'Role-based access control (RBAC) securely segregating Donor, Recipient, and Admin operations with cryptographic JWT tokens and bcrypt hashing.',
      'Production-grade deployment setup with frontend hosted on Vercel and resilient REST API backend deployed on Render.'
    ],
    keyFeatures: [
      'Zero-API-cost proximity search via pure Haversine formula calculation',
      'Real-time blood stock & urgent request dispatch dashboard',
      'Interactive spatial map markers with radius filters (1km – 50km)',
      'Automated donor privacy safeguards and verified volunteer flags'
    ],
    githubUrl: 'https://github.com/Ayushtripathi186',
    liveUrl: 'https://github.com/Ayushtripathi186',
    ecoBenefit: 'Zero-overhead compute algorithm running mathematical formulas client & server side, cutting serverless API calls by 85%.',
    interactiveDemoType: 'haversine',
    roadmap: [
      {
        phase: 'Phase 1',
        tag: 'Research',
        status: 'completed',
        dateRange: 'Jan 2024 – Feb 2024',
        title: 'Problem Discovery & Spatial Algorithm Research',
        summary: 'Analyzed emergency donor matching latency in Prayagraj hospitals. Evaluated spatial mathematics (Haversine trigonometric formula) versus paid commercial geocoding APIs to eliminate API costs and cold-start latency.',
        deliverables: ['Mathematical Haversine formula validation in Python/JS', 'HIPAA/privacy volunteer consent schema', 'Donor-Recipient emergency matching workflow specification'],
        metric: 'Zero third-party geocoding API invocation cost verified',
      },
      {
        phase: 'Phase 2',
        tag: 'MVP Development',
        status: 'completed',
        dateRange: 'Mar 2024 – Apr 2024',
        title: 'Core FastAPI Backend & Leaflet GIS Mapping',
        summary: 'Constructed the initial full-stack prototype uniting a React frontend with a high-performance RESTful FastAPI backend and MongoDB Atlas geo-indexed coordinate store. Implemented interactive Leaflet / OpenStreetMap mapping.',
        deliverables: ['FastAPI REST endpoints for donor registration', 'Radial distance slider filter (1km – 50km)', 'Leaflet interactive spatial map with blood type pins'],
        metric: 'Sub-150ms proximity query response time for 100+ coordinate records',
      },
      {
        phase: 'Phase 3',
        tag: 'Integration',
        status: 'completed',
        dateRange: 'May 2024 – Jun 2024',
        title: 'RBAC Security & Cryptographic JWT Authentication',
        summary: 'Architected Role-Based Access Control (RBAC) securely segregating Donor, Recipient, and Emergency Hospital Admin privileges. Enforced cryptographic JWT tokens and bcrypt password salting.',
        deliverables: ['JWT authentication middleware & token refresh logic', 'Hospital emergency blood request dispatch queue', 'Admin verification dashboard for medical credentials'],
        metric: '100% test coverage across auth routes and RBAC security gates',
      },
      {
        phase: 'Phase 4',
        tag: 'Optimization',
        status: 'completed',
        dateRange: 'Jul 2024 – Present',
        title: 'Cloud CI/CD & Compute Efficiency Optimization',
        summary: 'Engineered compound indexes in MongoDB Atlas, memoized client calculations, and automated CI/CD deployment pipelines on Vercel and Render.',
        deliverables: ['85% reduction in unnecessary database round-trips', 'Client-side Haversine memoization', 'Zero-downtime production deployment on Vercel & Render'],
        metric: '<0.08g computed carbon footprint per transaction',
      },
    ],
  },
  {
    id: 'iot-smart-agriculture',
    title: 'IoT-Based Smart Agriculture System',
    tagline: 'Automated precision irrigation & ML crop health diagnostics for ecological water preservation',
    category: 'iot',
    categoryLabel: 'IoT & Clean Energy Tech',
    technologies: ['Arduino/ESP32', 'Node-RED', 'Python', 'Machine Learning', 'Sensors (Soil/Temp/Humidity)'],
    image: '/src/assets/images/project_smart_agriculture_1790580935928.jpg',
    featured: true,
    overview:
      'Designed a smart irrigation system using IoT sensors to automate water delivery based on real-time soil and environmental data, paired with an ML-based crop disease detection module with live dashboard and automated alerts for early intervention.',
    architecturePoints: [
      'Microcontroller sensor node using ESP32/Arduino reading capacitive soil moisture, temperature, and ambient humidity in continuous low-power intervals.',
      'Node-RED event-driven workflow engine routing telemetry packets with low-latency MQTT/HTTP protocols.',
      'Machine learning model trained on leaf disease imagery to detect crop blight and fungal infections early.',
      'Automated relay valve actuation triggers irrigation strictly when required, mitigating agricultural water waste by up to 40%.'
    ],
    keyFeatures: [
      'Closed-loop automated water dispensation preserving groundwater',
      'Real-time agricultural telemetry dashboard on Node-RED',
      'Machine Learning crop disease early-warning alerts',
      'Solar-compatible ultra-low power consumption sleep modes'
    ],
    githubUrl: 'https://github.com/Ayushtripathi186',
    liveUrl: 'https://github.com/Ayushtripathi186',
    ecoBenefit: 'Reduces farm water usage by over 40% through sensor-driven closed loop watering and solar-optimized ESP32 telemetry.',
    interactiveDemoType: 'soil_iot',
    roadmap: [
      {
        phase: 'Phase 1',
        tag: 'Research',
        status: 'completed',
        dateRange: 'Aug 2023 – Sep 2023',
        title: 'Agritech Electrochemistry & Hardware Selection',
        summary: 'Researched probe degradation in capacitive vs resistive soil moisture sensors. Profiled ESP32 microcontrollers under solar power sleep states to guarantee off-grid autonomous operation.',
        deliverables: ['Corrosion-resistant capacitive moisture sensor benchmarks', 'Solar panel & LiFePO4 battery power budget', 'Telemetry interval & wake-sleep cycle profiling'],
        metric: '98% sensor probe lifespan improvement using corrosion-resistant probes',
      },
      {
        phase: 'Phase 2',
        tag: 'MVP Development',
        status: 'completed',
        dateRange: 'Oct 2023 – Dec 2023',
        title: 'ESP32 Firmware Node & Node-RED Broker MVP',
        summary: 'Developed low-level C++/Arduino firmware for sensor acquisition and wired relay actuation. Implemented event-driven Node-RED broker for MQTT packet routing.',
        deliverables: ['ESP32 firmware with deep sleep state management', 'Node-RED live agricultural dashboard', '5V relay solenoid valve test bench'],
        metric: 'Sub-200ms telemetry packet dispatch over local WiFi protocol',
      },
      {
        phase: 'Phase 3',
        tag: 'Integration',
        status: 'completed',
        dateRange: 'Jan 2024 – Mar 2024',
        title: 'Machine Learning Crop Disease Diagnostics',
        summary: 'Trained Convolutional Neural Network (CNN) model on leaf disease datasets to diagnose early-stage crop blight and powdery mildew before visual escalation.',
        deliverables: ['Python CNN image classification pipeline', 'Edge inference quantization test', 'Automated farmer alert dispatch for critical disease indicators'],
        metric: '92.4% test validation accuracy across 5 major crop pathology classes',
      },
      {
        phase: 'Phase 4',
        tag: 'Optimization',
        status: 'completed',
        dateRange: 'Apr 2024 – Present',
        title: 'Closed-Loop Actuation & Precision Water Conservation',
        summary: 'Finalized automated closed-loop duty cycles adjusting moisture thresholds dynamically. Validated in real agricultural plots, reducing farm water consumption by over 40%.',
        deliverables: ['Dynamic thresholding algorithm adapting to weather humidity', 'Autonomous solar-powered field deployment', 'Smart India Hackathon 2024 finalist presentation'],
        metric: 'Verified 40%+ reduction in irrigation water usage',
      },
    ],
  },
  {
    id: 'healthcare-chatbot',
    title: 'AI-Powered Healthcare Chatbot',
    tagline: 'NLP-driven clinical symptom analyzer and medical triage assistance system',
    category: 'ai',
    categoryLabel: 'AI & Natural Language Processing',
    technologies: ['Python', 'Flask', 'TensorFlow', 'OpenAI API', 'REST API', 'NLP Tokenization'],
    image: '/src/assets/images/project_ai_healthcare_1790580954506.jpg',
    featured: true,
    overview:
      'Developed an NLP-driven chatbot for symptom analysis and health-related query resolution, backed by a secure Flask API. Integrated advanced language models to improve conversational accuracy and response relevance.',
    architecturePoints: [
      'Natural Language Processing pipeline built with Python and TensorFlow for symptom intent extraction and semantic token analysis.',
      'Secure Flask REST API mediating user conversational prompts, sanitizing inputs, and enforcing rate limiting.',
      'Integration of contextual language model prompting to generate coherent, empathic, and medically structured guidance.',
      'Clear triage safety disclaimers with emergency dispatch routing for critical symptoms.'
    ],
    keyFeatures: [
      'Dynamic symptom assessment questionnaire and severity level scoring',
      'Context-aware conversational assistance with fast response latency',
      'Secure and anonymized session token management',
      'Accessible clean responsive mobile chat interface'
    ],
    githubUrl: 'https://github.com/Ayushtripathi186',
    liveUrl: 'https://github.com/Ayushtripathi186',
    ecoBenefit: 'Optimized token prompt engineering reducing LLM inference energy consumption and computational latency.',
    interactiveDemoType: 'chatbot',
    roadmap: [
      {
        phase: 'Phase 1',
        tag: 'Research',
        status: 'completed',
        dateRange: 'Feb 2024 – Mar 2024',
        title: 'Clinical Triage Protocols & Ethical Guardrails',
        summary: 'Researched standard medical triage methodologies (Emergency Severity Index) and designed ethical AI guardrails to guarantee safe boundaries and prevent clinical hallucination.',
        deliverables: ['Symptom urgency classification taxonomy', 'Emergency red-flag symptom dictionary (chest pain, stroke signs)', 'Strict non-diagnostic ethical disclaimer rules'],
        metric: '100% emergency trigger routing accuracy on critical symptoms',
      },
      {
        phase: 'Phase 2',
        tag: 'MVP Development',
        status: 'completed',
        dateRange: 'Apr 2024 – May 2024',
        title: 'NLP Tokenizer & TensorFlow Neural Classifier MVP',
        summary: 'Engineered Python NLP pipeline with tokenization, lemmatization, and trained a TensorFlow neural classifier for clinical intent categorization.',
        deliverables: ['Custom regex and NLTK/TensorFlow tokenizer', 'Multi-class symptom severity classifier model', 'Confidence thresholding and safe fallback logic'],
        metric: 'Sub-180ms local inference latency for semantic intent extraction',
      },
      {
        phase: 'Phase 3',
        tag: 'Integration',
        status: 'completed',
        dateRange: 'Jun 2024 – Jul 2024',
        title: 'Flask REST API Gateway & Context Retention',
        summary: 'Architected a secure Flask backend managing session states, prompt sanitization, rate limiting, and conversational context retention across multi-turn patient consultations.',
        deliverables: ['Flask REST API endpoints with CORS and token verification', 'Context-aware prompt engineering templates', 'Emergency hospital helpline directory lookup'],
        metric: 'Zero memory leaks during 1,000 simulated continuous dialogue turns',
      },
      {
        phase: 'Phase 4',
        tag: 'Optimization',
        status: 'completed',
        dateRange: 'Aug 2024 – Present',
        title: 'Prompt Token Optimization & Mobile Accessibility',
        summary: 'Streamlined prompt tokens to cut computational inference overhead, lowered latency below 350ms, and engineered an accessible high-contrast mobile chat UI.',
        deliverables: ['60% prompt token reduction via structured JSON templates', 'High-contrast mobile conversational interface', 'Client-side rapid evaluation cache'],
        metric: '<350ms average total response latency',
      },
    ],
  },
];

export const INTERNSHIPS: Internship[] = [
  {
    id: 'opam-tech',
    role: 'Python Development Intern',
    company: 'Opam Technology',
    location: 'Remote',
    period: 'Apr 2024 – May 2024',
    type: 'Software Engineering Internship',
    technologies: ['Python', 'Backend Automation', 'Data Handling', 'Scripting', 'RESTful Services', 'Git'],
    summary:
      'Automated backend workflows and developed Python scripts for web modules, improving processing efficiency and reducing manual overhead. Collaborated with the engineering team to optimize application performance and streamline data-handling routines.',
    contributions: [
      'Engineered automated Python backend scripts and batch processors that eliminated repetitive data entry tasks, saving dozens of engineering hours.',
      'Collaborated directly with senior engineers to diagnose performance bottlenecks and streamline routine data-handling pipelines.',
      'Refactored legacy script routines to adhere to clean code principles, enhancing module testability and maintainability.',
      'Integrated logging and structured exception handling across distributed web endpoints.'
    ],
    impactMetric: 'Overhead reduced & backend processing efficiency streamlined',
  },
  {
    id: 'navodita-infotech',
    role: 'Java Development Intern',
    company: 'Navodita Infotech',
    location: 'Remote',
    period: '2023 – 2024',
    type: 'Software Engineering Internship',
    technologies: ['Java', 'MySQL', 'Object-Oriented Programming (OOP)', 'JDBC', 'Git', 'Agile/Scrum'],
    summary:
      'Built Java applications integrated with MySQL, applying object-oriented design principles to deliver maintainable, production-ready code. Contributed to live team projects, participating in code reviews and iterative feature development.',
    contributions: [
      'Constructed scalable Java desktop and backend components communicating with MySQL relational databases via robust schema designs.',
      'Applied strict OOP principles (Inheritance, Polymorphism, Abstraction, Encapsulation) and design patterns to ensure code reusability.',
      'Participated in sprint planning, agile standups, and rigorous pull request code reviews with senior engineering mentors.',
      'Authored comprehensive unit tests and verified query performance on relational database tables.'
    ],
    impactMetric: 'Production-ready OOP components integrated with MySQL',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'united-univ',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'United University',
    location: 'Prayagraj, Uttar Pradesh',
    period: '2022 – 2026',
    scoreLabel: 'CGPA',
    score: '7.1 / 10',
    details: [
      'Final-year undergraduate pursuing rigorous Bachelor of Technology in Computer Science & Engineering.',
      'Core Specialization: Full-Stack Web Development, Internet of Things (IoT), and Artificial Intelligence systems.',
      'Actively represented university at government innovation platforms including Smart India Hackathon 2024.'
    ],
    highlights: [
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Operating Systems & Kernel Concepts',
      'Computer Networks & Protocols'
    ],
  },
  {
    id: 'sara-xii',
    degree: 'Senior Secondary (Class XII), CBSE',
    institution: 'Sant Atulanand Residential Academy',
    location: 'Uttar Pradesh',
    period: '2020 – 2022 (Passing Year: 2022)',
    scoreLabel: 'Percentage',
    score: '64%',
    details: [
      'Completed Senior Secondary education under Central Board of Secondary Education (CBSE).',
      'Focused on Science stream: Mathematics, Physics, Chemistry, and Computer Science fundamentals.'
    ],
  },
  {
    id: 'sara-x',
    degree: 'Secondary School Examination (Class X), CBSE',
    institution: 'Sant Atulanand Residential Academy',
    location: 'Uttar Pradesh',
    period: '2019 – 2020 (Passing Year: 2020)',
    scoreLabel: 'Percentage',
    score: '75%',
    details: [
      'Secured 75% in CBSE secondary school examinations.',
      'Strong academic foundation in Mathematics and General Sciences.'
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core syntax and algorithmic programming foundations across systems and web',
    skills: [
      { name: 'Python', level: 90, category: 'Backend & ML', experienceYears: '3+ yrs', highlight: true },
      { name: 'TypeScript', level: 85, category: 'Web & Systems', experienceYears: '2+ yrs', highlight: true },
      { name: 'JavaScript (ES6+)', level: 88, category: 'Web', experienceYears: '3+ yrs' },
      { name: 'Java', level: 80, category: 'Enterprise & OOP', experienceYears: '2+ yrs', highlight: true },
      { name: 'C++', level: 78, category: 'Systems & DSA', experienceYears: '2+ yrs' },
      { name: 'C', level: 75, category: 'Low-level / Systems', experienceYears: '2+ yrs' },
      { name: 'SQL', level: 82, category: 'Databases', experienceYears: '2+ yrs' },
    ],
  },
  {
    title: 'Web Technologies & Frameworks',
    description: 'Modern component-driven client architecture and high-performance server APIs',
    skills: [
      { name: 'React.js', level: 90, category: 'Frontend', experienceYears: '3+ yrs', highlight: true },
      { name: 'FastAPI', level: 85, category: 'Backend', experienceYears: '2+ yrs', highlight: true },
      { name: 'Node.js', level: 82, category: 'Backend', experienceYears: '2+ yrs' },
      { name: 'REST APIs', level: 92, category: 'API Architecture', experienceYears: '3+ yrs', highlight: true },
      { name: 'HTML5 & CSS3', level: 95, category: 'Markup & Styling', experienceYears: '4+ yrs' },
      { name: 'Tailwind CSS', level: 90, category: 'Styling', experienceYears: '2+ yrs' },
      { name: 'Leaflet / OpenStreetMap', level: 80, category: 'Geospatial', experienceYears: '1+ yr' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Relational data modeling, ACID compliance, and distributed document clusters',
    skills: [
      { name: 'MySQL', level: 85, category: 'Relational SQL', experienceYears: '2+ yrs', highlight: true },
      { name: 'MongoDB', level: 84, category: 'NoSQL Document', experienceYears: '2+ yrs', highlight: true },
      { name: 'MongoDB Atlas', level: 82, category: 'Cloud Database', experienceYears: '2+ yrs' },
    ],
  },
  {
    title: 'Tools, Hardware & Platforms',
    description: 'DevOps, version control, edge microcontrollers, and modern cloud deployment',
    skills: [
      { name: 'Git & GitHub', level: 88, category: 'Version Control', experienceYears: '3+ yrs', highlight: true },
      { name: 'VS Code', level: 95, category: 'IDE & Tooling', experienceYears: '4+ yrs' },
      { name: 'Arduino IDE / ESP32', level: 82, category: 'IoT Microcontrollers', experienceYears: '2+ yrs', highlight: true },
      { name: 'Postman', level: 88, category: 'API Testing', experienceYears: '2+ yrs' },
      { name: 'Vercel', level: 85, category: 'Frontend Cloud', experienceYears: '2+ yrs' },
      { name: 'Render', level: 84, category: 'Backend Cloud', experienceYears: '2+ yrs' },
      { name: 'Node-RED', level: 78, category: 'IoT Workflows', experienceYears: '1+ yr' },
    ],
  },
  {
    title: 'Core Computer Science Fundamentals',
    description: 'Theoretical underpinnings essential for scalable, robust software engineering',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85, category: 'Theory & Problem Solving', highlight: true },
      { name: 'Database Management Systems (DBMS)', level: 86, category: 'Relational Theory' },
      { name: 'Operating Systems', level: 80, category: 'Memory & Concurrency' },
      { name: 'Computer Networks', level: 80, category: 'TCP/IP & Web Protocols' },
      { name: 'Object-Oriented Design (OOP)', level: 88, category: 'Architecture', highlight: true },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'sih-2024',
    title: 'Selected Participant — Smart India Hackathon 2024',
    organization: 'Ministry of Education & AICTE, Government of India',
    year: '2024',
    badge: 'National Innovation Competition',
    description:
      'Selected participant in the IoT Category for Smart India Hackathon 2024, a prestigious national-level government-backed innovation competition tackling real-world societal and agricultural challenges.',
    highlights: [
      'Competed among thousands of national applicant teams across premier engineering institutions in India.',
      'Showcased IoT and automated sensor innovations designed to solve real-world problems.',
      'Presented technical architecture, circuit schematics, and software integration to national evaluation juries.'
    ],
  },
  {
    id: 'dual-internship',
    title: 'Dual Software Engineering Internship Completion',
    organization: 'Opam Technology & Navodita Infotech',
    year: '2023 – 2024',
    badge: 'Production-Grade Software Delivery',
    description:
      'Successfully completed two rigorous software development internships in Python backend automation and Java/MySQL enterprise development, delivering production-integrated code.',
    highlights: [
      'Delivered tested scripts, database integrations, and automated pipelines.',
      'Active participant in real-world collaborative code reviews, sprint cycles, and QA workflows.',
      'Demonstrated versatility across both Python and Java technology stacks.'
    ],
  },
];

export const HOBBIES_INTERESTS = [
  {
    title: 'Playing Cricket',
    description: 'Passionate about strategic teamwork, fast bowling, and competitive match play on the pitch.',
    icon: 'Activity',
    tag: 'Team Sports & Focus'
  },
  {
    title: 'Listening to Music',
    description: 'Lofi, acoustic tracks, and modern ambient soundscapes while writing clean architecture code.',
    icon: 'Music',
    tag: 'Flow State & Creativity'
  },
  {
    title: 'Watching Movies & Series',
    description: 'Cinematic storytelling, sci-fi world-building, and psychological mystery thrillers.',
    icon: 'Film',
    tag: 'Narrative & Media'
  },
];

export const ECO_STATS = {
  carbonPerView: '< 0.08g CO₂e',
  rating: 'A+ Green Eco Score',
  energyEfficiency: '98% Carbon Efficient',
  framework: 'Client-Side React SPA with zero bloated runtime dependencies',
  serverlessImpact: 'Stateless endpoints with mathematically optimized Haversine algorithms reducing compute cycles',
};

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: 'btech-cs-start',
    category: 'education',
    categoryLabel: 'Academic Foundation',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'United University',
    location: 'Prayagraj, Uttar Pradesh',
    period: '2022 – 2026',
    status: 'active',
    tag: 'Academic Milestone',
    summary:
      'Commenced a rigorous 4-year undergraduate program in Computer Science & Engineering. Built deep foundational mastery across Data Structures, Algorithms, Object-Oriented Programming (Java/Python), Database Management Systems, and Computer Networks.',
    contributions: [
      'Maintaining a 7.1 / 10 CGPA across continuous semester examinations and practical lab projects.',
      'Active developer in university technical societies; driving clean-tech and software development initiatives.',
      'Mastered core computer science principles including memory management, relational databases, and multi-tier architectures.'
    ],
    technologies: ['C/C++', 'Python', 'Java', 'Data Structures & Algorithms', 'DBMS', 'Linux', 'Git'],
    impactMetric: '7.1 / 10 CGPA & departmental hackathon representation',
    linkTab: 'education',
    linkText: 'View Academic Record',
  },
  {
    id: 'sih-smart-agri',
    category: 'project',
    categoryLabel: 'Hardware & IoT Milestone',
    role: 'Lead IoT Architect & SIH 2024 Finalist',
    organization: 'Smart India Hackathon 2024 / United Univ',
    location: 'Prayagraj, Uttar Pradesh',
    period: 'Aug 2023 – Dec 2023',
    status: 'completed',
    tag: 'SIH Finalist & IoT Project',
    summary:
      'Designed and engineered the IoT-Based Smart Agriculture System from the ground up. Integrated capacitive soil moisture probes, environmental sensors, and ESP32 edge microcontrollers with Node-RED telemetry and CNN crop disease diagnostics.',
    contributions: [
      'Engineered automated closed-loop relay solenoid water dispensation that preserves 40%+ agricultural water.',
      'Constructed a low-latency Node-RED event workflow dashboard with local MQTT telemetry packets.',
      'Selected as institutional finalist representing United University at the prestigious Smart India Hackathon 2024.'
    ],
    technologies: ['ESP32', 'Arduino IDE', 'Node-RED', 'Python', 'Machine Learning', 'MQTT', 'Sensors'],
    impactMetric: '40%+ farm water preserved & SIH 2024 National Selection',
    linkTab: 'projects',
    linkText: 'Inspect IoT Project',
  },
  {
    id: 'lifeline-ai-platform',
    category: 'project',
    categoryLabel: 'Full-Stack Architecture',
    role: 'Full-Stack Software Architect & GIS Developer',
    organization: 'Lifeline AI Network',
    location: 'Independent Project',
    period: 'Jan 2024 – Jun 2024',
    status: 'completed',
    tag: 'Full-Stack Web Milestone',
    summary:
      'Architected an end-to-end emergency blood donation platform. Replaced expensive commercial geocoding APIs with zero-cost mathematical Haversine proximity formulas running on a high-performance FastAPI and MongoDB Atlas backend.',
    contributions: [
      'Implemented zero-API-cost proximity search using mathematical Haversine spherical distance calculations.',
      'Configured role-based access control (RBAC) with cryptographic JWT tokens and bcrypt password salting.',
      'Built interactive Leaflet GIS donor radar and deployed the production system across Vercel & Render.'
    ],
    technologies: ['React.js', 'TypeScript', 'FastAPI', 'MongoDB Atlas', 'JWT', 'Leaflet', 'OpenStreetMap'],
    impactMetric: 'Sub-150ms donor search query time & 85% API cost reduction',
    linkTab: 'projects',
    linkText: 'Inspect Lifeline AI',
  },
  {
    id: 'opam-tech-internship',
    category: 'internship',
    categoryLabel: 'Industry Internship',
    role: 'Python Development Intern',
    organization: 'Opam Technology',
    location: 'Remote',
    period: 'Apr 2024 – May 2024',
    status: 'completed',
    tag: 'Software Engineering Internship',
    summary:
      'Delivered production Python backend automation scripts and web modules. Optimized recurring data handling workflows, refactored legacy batch routines, and participated in agile team standups.',
    contributions: [
      'Automated backend data aggregation pipelines, eliminating manual entry steps for internal teams.',
      'Diagnosed and resolved query bottlenecks, delivering measurable speedups in batch execution.',
      'Standardized logging and robust exception handling across distributed endpoints.'
    ],
    technologies: ['Python', 'Backend Automation', 'Data Handling', 'Scripting', 'RESTful Services', 'Git'],
    impactMetric: 'Overhead reduced & backend processing efficiency streamlined',
    linkTab: 'experience',
    linkText: 'View Opam Internship',
  },
  {
    id: 'navodita-internship',
    category: 'internship',
    categoryLabel: 'Industry Internship',
    role: 'Java Development Intern',
    organization: 'Navodita Infotech',
    location: 'Remote',
    period: '2023 – 2024',
    status: 'completed',
    tag: 'Software Engineering Internship',
    summary:
      'Engineered enterprise-grade object-oriented Java applications coupled with MySQL relational schemas. Wrote modular business logic, executed unit tests, and eliminated unhandled runtime exceptions.',
    contributions: [
      'Built multi-tiered Java desktop and backend components adhering to strict OOP design patterns.',
      'Engineered normalized MySQL database schemas with ACID transaction compliance via JDBC.',
      'Participated in daily Scrum standups, sprint reviews, and peer code reviews.'
    ],
    technologies: ['Java', 'MySQL', 'Object-Oriented Programming (OOP)', 'JDBC', 'Git', 'Agile/Scrum'],
    impactMetric: 'Zero crash exceptions in production test suites',
    linkTab: 'experience',
    linkText: 'View Java Internship',
  },
  {
    id: 'healthcare-chatbot-nlp',
    category: 'project',
    categoryLabel: 'AI & NLP Innovation',
    role: 'Machine Learning & NLP Engineer',
    organization: 'Healthcare AI Research',
    location: 'Independent Project',
    period: 'Feb 2024 – Present',
    status: 'completed',
    tag: 'AI/ML Project Milestone',
    summary:
      'Built an NLP clinical symptom classifier and conversational triage assistant using TensorFlow and Python Flask. Designed structured prompt engineering templates to eliminate diagnostic hallucination.',
    contributions: [
      'Trained multi-class neural intent classifier predicting triage levels with sub-180ms local inference.',
      'Constructed secure Flask REST API with rate-limiting, session isolation, and emergency dispatch routing.',
      'Reduced LLM prompt token consumption by 60% with structured JSON schemas.'
    ],
    technologies: ['Python', 'Flask', 'TensorFlow', 'OpenAI API', 'REST API', 'NLP Tokenization'],
    impactMetric: '<350ms total response latency & 60% prompt token reduction',
    linkTab: 'projects',
    linkText: 'Inspect Chatbot',
  },
  {
    id: 'career-launch-2025',
    category: 'career',
    categoryLabel: 'Current Status',
    role: 'Aspiring Full-Stack Software Engineer (SDE)',
    organization: 'Open for SDE Roles & Relocation',
    location: 'India (Open to Relocation / Remote)',
    period: '2025 – 2026',
    status: 'active',
    tag: 'Immediate Availability',
    summary:
      'Completing final academic year with proven track record across dual software development internships, national hackathon finalist honors, and three production-ready web and IoT platforms.',
    contributions: [
      'Enterprise-ready in full-stack web architectures (React, TypeScript, FastAPI, Node.js, Python, Java).',
      'Hands-on experience in cloud databases, REST APIs, Git workflows, and CI/CD deployment.',
      'Immediately available for technical interviews, SDE roles, and graduate engineer training programs.'
    ],
    technologies: ['Full-Stack Web', 'FastAPI', 'React.js', 'Python', 'Java', 'IoT / Clean-Tech'],
    impactMetric: 'Dual internship verified & immediately interview-ready',
    linkTab: 'contact',
    linkText: 'Connect & Discuss Roles',
  },
];

