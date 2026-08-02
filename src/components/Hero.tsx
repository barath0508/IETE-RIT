import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, UserPlus, Cpu, Zap, Radio, Bot, ShieldCheck, ArrowRight } from 'lucide-react';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 shadow-sm text-brand-blue text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="uppercase text-[11px] tracking-wider font-bold">Official Student Chapter</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-normal">{SITE_CONFIG.collegeCode}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy tracking-tight leading-[1.15]">
              IETE <span className="gradient-text">Student Forum</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-body font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {SITE_CONFIG.chapterTagline}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#events"
                onClick={handleScrollToEvents}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-sm font-semibold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenJoinModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-brand-navy border border-brand-border text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-brand-blue/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <UserPlus className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform" />
                <span>Become a Member</span>
              </button>
            </div>

            {/* Key Quick Badges / Trust Markers */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">IETE Govt</div>
                  <div className="text-[10px] text-slate-500">Recognized</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Hardware & AI</div>
                  <div className="text-[10px] text-slate-500">Maker Space</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">100+ Active</div>
                  <div className="text-[10px] text-slate-500">Student Members</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual 3D Tech Illustration Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Central Graphic Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-blue-400/20 to-indigo-500/20 rounded-3xl blur-2xl transform rotate-6 scale-95" />

              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-6 shadow-soft-lg border border-white/80 overflow-hidden">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">ISF_Robotics_Lab_v4.2</span>
                </div>

                {/* High Quality Illustration Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
                    alt="Students collaborating on robotics and electronics"
                    className="w-full h-64 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-0.5">Electronics & Robotics Lab</div>
                    <div className="text-sm font-medium">Hands-On Embedded Systems & IoT Prototyping</div>
                  </div>
                </div>

                {/* Interactive Grid Metrics Below Image */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Robotics & AI</div>
                      <div className="text-xs font-bold text-slate-800">Hardware Kits</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Telecom & RF</div>
                      <div className="text-xs font-bold text-slate-800">Antenna Simulation</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Animated Badges Around Graphic */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-3 shadow-soft border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Status</div>
                  <div className="text-xs font-extrabold text-slate-800">Registrations Open</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-3 shadow-soft border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold font-heading">
                  25+
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Annual</div>
                  <div className="text-xs font-extrabold text-slate-800">Technical Events</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
