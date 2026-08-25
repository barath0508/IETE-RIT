import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, UserPlus, Cpu, Zap, Radio, Bot, ShieldCheck, ArrowRight, Award, Users, BookOpen, Layers } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeroProps {
  onOpenJoinModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal }) => {
  const handleScrollToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    const eventsElement = document.getElementById('events');
    if (eventsElement) {
      const navOffset = 80;
      const elementPosition = eventsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-hero-gradient overflow-hidden">
      {/* Abstract Background Floating Tech & Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl" />

        {/* Animated grid lines pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#2563EB 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* College Logo & Institution Header Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-md transition-shadow">
                <img 
                  src={SITE_CONFIG.logos.collegeLogo} 
                  alt={SITE_CONFIG.collegeName} 
                  className="h-9 sm:h-11 w-auto object-contain" 
                />
                <div className="h-7 w-px bg-slate-200" />
                <img 
                  src={SITE_CONFIG.logos.ieteLogo} 
                  alt="IETE Logo" 
                  className="h-8 sm:h-10 w-auto object-contain" 
                />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-xs font-extrabold text-brand-navy">{SITE_CONFIG.collegeName}</div>
                  <div className="text-[10px] font-semibold text-brand-blue uppercase tracking-wider">{SITE_CONFIG.collegeCode} Student Forum</div>
                </div>
              </div>

              {/* Official IETE Students Forum RIT Chapter Emblem */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300">
                <img
                  src={SITE_CONFIG.logos.chapterEmblem}
                  alt="IETE Students Forum RIT Official Seal"
                  className="h-10 sm:h-12 w-auto object-contain rounded-full border border-slate-100 shadow-2xs"
                />
                <div className="text-left leading-tight pr-1">
                  <div className="text-[11px] sm:text-xs font-extrabold text-brand-navy flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>IETE Student Forum</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-brand-blue tracking-wider uppercase">
                    RIT Official Chapter
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy tracking-tight leading-[1.12]">
              RIT IETE <span className="gradient-text">Student Forum</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-body font-normal leading-relaxed max-w-2xl mx-auto">
              {SITE_CONFIG.chapterTagline}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#events"
                onClick={handleScrollToEvents}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-navy text-white text-sm font-semibold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={SITE_CONFIG.membershipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-brand-navy border border-brand-border text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-brand-blue/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform" />
                <span>Become a Member</span>
              </a>
            </div>

            {/* Key Quick Badges / Trust Markers */}
            <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 max-w-lg mx-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">IETE Govt</div>
                  <div className="text-[10px] text-slate-500 font-medium">Recognized</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Hardware & AI</div>
                  <div className="text-[10px] text-slate-500 font-medium">Maker Lab</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">100+ Active</div>
                  <div className="text-[10px] text-slate-500 font-medium">Student Members</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>


      </div>
    </section>
  );
};

