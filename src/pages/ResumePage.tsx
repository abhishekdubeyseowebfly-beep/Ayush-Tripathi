import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, INTERNSHIPS, EDUCATION_DATA, ACHIEVEMENTS, SKILL_CATEGORIES, HOBBIES_INTERESTS } from '../data/portfolioData';
import { Printer, Copy, Check, Download, ExternalLink, Mail, Phone, Github, Linkedin, FileText } from 'lucide-react';

export const ResumePage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
${PERSONAL_INFO.name}
${PERSONAL_INFO.role}
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

TECHNICAL SKILLS
- Programming Languages: C, C++, Python, Java, SQL, TypeScript
- Web Technologies: HTML5, CSS3, JavaScript, React.js, Node.js, FastAPI, REST APIs
- Databases: MySQL, MongoDB (MongoDB Atlas)
- Tools & Platforms: Git/GitHub, VS Code, Arduino IDE, Postman, Vercel, Render
- Core Computer Science: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks

INTERNSHIP EXPERIENCE
1. Python Development Intern — Opam Technology (Remote, Apr 2024 – May 2024)
- Automated backend workflows and developed Python scripts for web modules, improving processing efficiency and reducing manual overhead.
- Collaborated with the engineering team to optimize application performance and streamline data-handling routines.

2. Java Development Intern — Navodita Infotech (Remote)
- Built Java applications integrated with MySQL, applying object-oriented design principles to deliver maintainable, production-ready code.
- Contributed to live team projects, participating in code reviews and iterative feature development.

PROJECTS
1. Lifeline AI — Smart Blood Donation Network
Stack: React, TypeScript, FastAPI, MongoDB Atlas, JWT, Leaflet
- Architected a full-stack blood donation matching platform with role-based access (Donor, Recipient, Admin), JWT authentication, and bcrypt password hashing, backed by a RESTful FastAPI + MongoDB Atlas API.
- Implemented geolocation-based donor search using the Haversine distance formula to sort donors by real-world proximity, without third-party geocoding APIs.
- Built an interactive Leaflet/OpenStreetMap donor-request map and an admin analytics dashboard; deployed via Vercel (frontend) and Render (backend).

2. IoT-Based Smart Agriculture System
Stack: Arduino/ESP32, Node-RED, Python, Machine Learning
- Designed a smart irrigation system using IoT sensors to automate water delivery based on real-time soil and environmental data.
- Built an ML-based crop disease detection module with a live dashboard and automated alerts for early intervention.

3. AI-Powered Healthcare Chatbot
Stack: Python, Flask, TensorFlow, OpenAI API
- Developed an NLP-driven chatbot for symptom analysis and health-related query resolution, backed by a secure Flask API.
- Integrated OpenAI's language model to improve conversational accuracy and response relevance.

EDUCATION
- B.Tech, Computer Science & Engineering | United University, Prayagraj (2022 – 2026) | CGPA: 7.1 / 10
- Senior Secondary (XII), CBSE | Sant Atulanand Residential Academy (2022) | Percentage: 64%
- Secondary (X), CBSE | Sant Atulanand Residential Academy (2020) | Percentage: 75%

ACHIEVEMENTS
- Selected participant, Smart India Hackathon 2024 IoT Category (national-level government-backed innovation competition).
- Successfully completed two software development internships (Opam Technology and Navodita Infotech).
- Hobbies & Interests: Playing cricket | Listening to music | Watching movies and series
    `.trim();

    navigator.clipboard.writeText(resumeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Action Bar (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-900 border border-stone-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Interactive Verified Resume</span>
          </h1>
          <p className="text-xs text-stone-400">
            ATS-optimized curriculum vitae matching official academic & internship records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Plaintext'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* PAPER RESUME SHEET (Clean, high-fidelity styling) */}
      <div className="print-sheet resume-document bg-white text-stone-900 rounded-xl p-8 sm:p-12 shadow-2xl border border-stone-200 font-sans text-[13px] leading-normal selection:bg-emerald-100 selection:text-black">
        
        {/* Document Header */}
        <header className="border-b-2 border-stone-900 pb-5 mb-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 uppercase">
            {PERSONAL_INFO.name}
          </h2>
          <div className="text-sm font-semibold text-stone-700 mt-1">
            {PERSONAL_INFO.role}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-stone-600 mt-2 font-mono">
            <span>{PERSONAL_INFO.phone}</span>
            <span aria-hidden="true">|</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-stone-800 hover:underline">
              {PERSONAL_INFO.email}
            </a>
            <span aria-hidden="true">|</span>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-stone-800 hover:underline">
              github.com/{PERSONAL_INFO.githubUser}
            </a>
            <span aria-hidden="true">|</span>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-stone-800 hover:underline">
              linkedin.com/in/{PERSONAL_INFO.linkedinUser}
            </a>
            <span aria-hidden="true">|</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </header>

        {/* Section 1: Professional Summary */}
        <section className="mb-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Professional Summary
          </h3>
          <p className="text-stone-800 leading-relaxed text-justify">
            {PERSONAL_INFO.summary}
          </p>
        </section>

        {/* Section 2: Technical Skills */}
        <section className="mb-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Technical Skills
          </h3>
          <div className="space-y-1 text-stone-800">
            <div>
              <strong className="text-stone-900">Programming Languages:</strong> C, C++, Python, Java, SQL, TypeScript
            </div>
            <div>
              <strong className="text-stone-900">Web Technologies:</strong> HTML5, CSS3, JavaScript, React.js, Node.js, FastAPI, REST APIs
            </div>
            <div>
              <strong className="text-stone-900">Databases:</strong> MySQL, MongoDB (MongoDB Atlas)
            </div>
            <div>
              <strong className="text-stone-900">Tools & Platforms:</strong> Git/GitHub, VS Code, Arduino IDE, Postman, Vercel, Render
            </div>
            <div>
              <strong className="text-stone-900">Core Computer Science:</strong> Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks
            </div>
          </div>
        </section>

        {/* Section 3: Internship Experience */}
        <section className="mb-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Internship Experience
          </h3>
          
          <div className="space-y-4">
            {/* Opam Tech */}
            <div>
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>Python Development Intern</span>
                <span className="font-semibold text-stone-700">Opam Technology</span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-600 italic mb-1.5 font-mono">
                <span>Remote</span>
                <span>Apr 2024 – May 2024</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800">
                <li>Automated backend workflows and developed Python scripts for web modules, improving processing efficiency and reducing manual overhead.</li>
                <li>Collaborated with the engineering team to optimize application performance and streamline data-handling routines.</li>
              </ul>
            </div>

            {/* Navodita Infotech */}
            <div>
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>Java Development Intern</span>
                <span className="font-semibold text-stone-700">Navodita Infotech</span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-600 italic mb-1.5 font-mono">
                <span>Remote</span>
                <span>2023 – 2024</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800">
                <li>Built Java applications integrated with MySQL, applying object-oriented design principles to deliver maintainable, production-ready code.</li>
                <li>Contributed to live team projects, participating in code reviews and iterative feature development.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Projects */}
        <section className="mb-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Projects
          </h3>

          <div className="space-y-4">
            {/* Lifeline AI */}
            <div>
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>Lifeline AI — Smart Blood Donation Network</span>
                <span className="text-xs font-mono text-stone-700 font-normal">React, TypeScript, FastAPI, MongoDB Atlas, JWT, Leaflet</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800 mt-1">
                <li>Architected a full-stack blood donation matching platform with role-based access (Donor, Recipient, Admin), JWT authentication, and bcrypt password hashing, backed by a RESTful FastAPI + MongoDB Atlas API.</li>
                <li>Implemented geolocation-based donor search using the Haversine distance formula to sort donors by real-world proximity, without third-party geocoding APIs.</li>
                <li>Built an interactive Leaflet/OpenStreetMap donor-request map and an admin analytics dashboard; deployed via Vercel (frontend) and Render (backend).</li>
              </ul>
            </div>

            {/* IoT Smart Agriculture */}
            <div>
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>IoT-Based Smart Agriculture System</span>
                <span className="text-xs font-mono text-stone-700 font-normal">Arduino/ESP32, Node-RED, Python, Machine Learning</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800 mt-1">
                <li>Designed a smart irrigation system using IoT sensors to automate water delivery based on real-time soil and environmental data.</li>
                <li>Built an ML-based crop disease detection module with a live dashboard and automated alerts for early intervention.</li>
              </ul>
            </div>

            {/* Healthcare Chatbot */}
            <div>
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span>AI-Powered Healthcare Chatbot</span>
                <span className="text-xs font-mono text-stone-700 font-normal">Python, Flask, TensorFlow, OpenAI API</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800 mt-1">
                <li>Developed an NLP-driven chatbot for symptom analysis and health-related query resolution, backed by a secure Flask API.</li>
                <li>Integrated OpenAI’s language model to improve conversational accuracy and response relevance.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Education */}
        <section className="mb-5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Education
          </h3>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="font-bold text-stone-900">B.Tech, Computer Science & Engineering</span>
                <span className="text-stone-700"> — United University, Prayagraj</span>
              </div>
              <div className="text-xs font-mono text-stone-700">
                CGPA: 7.1 / 10 | 2022 – 2026
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="font-bold text-stone-900">Senior Secondary (XII), CBSE</span>
                <span className="text-stone-700"> — Sant Atulanand Residential Academy</span>
              </div>
              <div className="text-xs font-mono text-stone-700">
                Percentage: 64% | 2022
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <span className="font-bold text-stone-900">Secondary (X), CBSE</span>
                <span className="text-stone-700"> — Sant Atulanand Residential Academy</span>
              </div>
              <div className="text-xs font-mono text-stone-700">
                Percentage: 75% | 2020
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Achievements */}
        <section className="mb-4">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-2 font-mono">
            Achievements
          </h3>
          <ul className="list-disc list-outside pl-4 space-y-1 text-stone-800">
            <li>Selected participant, Smart India Hackathon 2024 IoT Category, a national-level government-backed innovation competition.</li>
            <li>Successfully completed two software development internships (Opam Technology and Navodita Infotech), delivering production-integrated code in both Python and Java.</li>
          </ul>
        </section>

        {/* Section 7: Hobbies & Interests */}
        <section>
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider border-b border-stone-300 pb-1 mb-1 font-mono">
            Hobbies & Interests
          </h3>
          <div className="text-stone-800">
            Playing cricket | Listening to music | Watching movies and series
          </div>
        </section>

      </div>
    </div>
  );
};
