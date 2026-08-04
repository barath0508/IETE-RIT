import React, { useState } from 'react';
import { Cpu, Linkedin, Instagram, Facebook, Youtube, Github, Send, Heart, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Subtle Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-2xl w-fit shadow-md">
              <img 
                src={SITE_CONFIG.logos.collegeLogo} 
                alt={SITE_CONFIG.collegeName} 
                className="h-9 sm:h-10 w-auto object-contain" 
              />
              <div className="h-6 w-px bg-slate-300" />
              <img 
                src={SITE_CONFIG.logos.ieteLogo} 
                alt="IETE Logo" 
                className="h-8 sm:h-9 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                IETE <span className="text-brand-accent">Student Forum</span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                {SITE_CONFIG.collegeName} ({SITE_CONFIG.collegeCode})
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Inspiring Innovation, Learning and Leadership in Electronics, Telecommunication, and Emerging Technologies.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs text-slate-200">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Recognized by IETE Main Center</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-base text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-brand-accent transition-colors">About ISF</a></li>
              <li><a href="#vision" onClick={(e) => handleLinkClick(e, '#vision')} className="hover:text-brand-accent transition-colors">Vision & Mission</a></li>
              <li><a href="#activities" onClick={(e) => handleLinkClick(e, '#activities')} className="hover:text-brand-accent transition-colors">Activities Timeline</a></li>
              <li><a href="#events" onClick={(e) => handleLinkClick(e, '#events')} className="hover:text-brand-accent transition-colors">Upcoming Events</a></li>
              <li><a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')} className="hover:text-brand-accent transition-colors">Past Events Gallery</a></li>
              <li><a href="#members" onClick={(e) => handleLinkClick(e, '#members')} className="hover:text-brand-accent transition-colors">Core Leadership</a></li>
              <li><a href="#benefits" onClick={(e) => handleLinkClick(e, '#benefits')} className="hover:text-brand-accent transition-colors">Membership Benefits</a></li>
              <li><a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-brand-accent transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-heading font-bold text-base text-white">Stay Updated</h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Subscribe to the ISF monthly tech newsletter for upcoming hackathons and workshop announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter student email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-emerald-400 font-medium">
                  Subscribed successfully! Welcome to the ISF network.
                </div>
              )}
            </form>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-300 mb-2">Connect With Us</div>
              <div className="flex items-center gap-2">
                <a
                  href={SITE_CONFIG.contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={SITE_CONFIG.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href={SITE_CONFIG.contact.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href={SITE_CONFIG.contact.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                <a
                  href={SITE_CONFIG.contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.chapterName} - {SITE_CONFIG.collegeName}. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse" />
            <span>by IETE Student Forum Web Team</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
