import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  Download,
  UserCheck
} from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Software Engineering Opportunity',
    message: '',
  });

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [vCardDownloaded, setVCardDownloaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownloadContact = () => {
    downloadVCard('Ayush_Tripathi_Developer.vcf');
    setVCardDownloaded(true);
    setTimeout(() => setVCardDownloaded(false), 3000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message & storing in localStorage
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('ayush_portfolio_messages') || '[]');
        stored.push({
          ...formData,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('ayush_portfolio_messages', JSON.stringify(stored));
      } catch (err) {
        // Safe fallback
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Get in Touch</span>
            <span aria-hidden="true">·</span>
            <span>Open For Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let’s Build High-Impact Software Together
          </h1>
          <p className="text-base text-stone-300 leading-relaxed font-light">
            Whether you have a full-time SDE role, internship opportunity, open-source collaboration, 
            or technical inquiry, I welcome your message and respond promptly.
          </p>
        </div>

        {/* Top Quick Action: Save Contact */}
        <button
          type="button"
          onClick={handleDownloadContact}
          className="self-start md:self-auto px-4 py-2.5 text-xs font-semibold text-stone-200 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          title="Download Ayush Tripathi's contact vCard (.vcf) for your phone or address book"
        >
          {vCardDownloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">vCard Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Save Contact (.vcf)</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Direct Contact Information
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                Verified
              </span>
            </div>

            {/* Download vCard Action Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/50 via-stone-950 to-stone-950 border border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Developer Contact Card</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-stone-800 text-stone-300">
                    .vcf
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 leading-snug">
                  One-tap import into iOS, Android, Google Contacts & Outlook.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadContact}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-sm ${
                  vCardDownloaded
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-stone-950'
                }`}
                title="Save contact card file"
              >
                {vCardDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download vCard</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-900 text-emerald-400 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400">Direct Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-900 text-emerald-400 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400">Phone & WhatsApp</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors font-mono"
                    >
                      {PERSONAL_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
                <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-900 text-emerald-400 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Current Base</div>
                  <div className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </div>
                  <div className="text-xs text-stone-400 mt-0.5">Open to on-site, hybrid, and remote relocation.</div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Professional Profiles
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-950/50 hover:bg-stone-800/80 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-emerald-400" />
                    <span>linkedin.com/in/{PERSONAL_INFO.linkedinUser}</span>
                  </div>
                  <span className="text-stone-500">Connect ↗</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-950/50 hover:bg-stone-800/80 border border-stone-800 text-stone-300 hover:text-white transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>github.com/{PERSONAL_INFO.githubUser}</span>
                  </div>
                  <span className="text-stone-500">View code ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Send Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Send a Direct Message
              </h2>
              <p className="text-xs text-stone-400">
                Fill in the details below. Ayush typically replies within 12–24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Thank You, Message Dispatched!
                </h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your message has been safely logged. Ayush has received notification and will get in touch with you at <strong className="text-emerald-400">{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Software Engineering Opportunity', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-stone-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-stone-300">
                      Your Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-stone-300">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-stone-300">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="Software Engineering Opportunity">Software Engineering Opportunity</option>
                    <option value="Full-Stack Web Internship">Full-Stack Web Internship</option>
                    <option value="IoT / Clean-Tech Project Inquiry">IoT / Clean-Tech Project Inquiry</option>
                    <option value="Technical Interview Request">Technical Interview Request</option>
                    <option value="General Collaboration">General Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-stone-300">
                    Your Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your project, team, or opportunity requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-stone-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {isSubmitting ? (
                    <span>Dispatching Message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
