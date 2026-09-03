import React, { useRef } from 'react';
import { Calendar, UserPlus, Cpu, Zap, ShieldCheck, ArrowRight, MessageCircle, Instagram } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { gsap, useGSAP } from '../lib/gsap';

interface HeroProps {
  onOpenJoinModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = SITE_CONFIG.contact.socials.whatsapp || SITE_CONFIG.whatsappGroupLink;
  const instagramUrl = SITE_CONFIG.contact.socials.instagram;

  useGSAP(() => {
    // 1. Cinematic Staggered Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-hero-badge',
      { opacity: 0, y: -25, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 }
    )
      .fromTo(
        '.gsap-hero-title',
        { opacity: 0, y: 35, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
        '-=0.5'
      )
      .fromTo(
        '.gsap-hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        '.gsap-hero-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(
        '.gsap-hero-trust',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        '-=0.3'
      )
      .fromTo(
        '.gsap-hero-stat',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 },
        '-=0.3'
      );

    // 2. Floating Micro-Parallax for Ambient Badges & Glow Orbs
    gsap.to('.gsap-float-slow', {
      y: 12,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.gsap-float-fast', {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

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
    <section ref={containerRef} id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-hero-gradient overflow-hidden">
      {/* Abstract Background Floating Tech & Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl gsap-float-slow" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl gsap-float-fast" />
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
          <div className="space-y-6">
            {/* College Logo & Institution Header Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="gsap-hero-badge inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-md transition-shadow">
                <img 
                  src={SITE_CONFIG.logos.collegeLogo} 
                  alt={SITE_CONFIG.collegeName} 
                  className="h-9 sm:h-11 w-auto object-contain" 
                />
                <div className="h-7 w-px bg-slate-200" />
                <img 
                  src={SITE_CONFIG.logos.ieteLogo} 
                  alt="IETE Student Forum Logo" 
                  className="h-8 sm:h-10 w-auto object-contain" 
                />
                <div className="text-left leading-tight hidden sm:block">
                  <div className="text-xs font-extrabold text-brand-navy">{SITE_CONFIG.collegeName}</div>
                  <div className="text-[10px] font-semibold text-brand-blue uppercase tracking-wider">{SITE_CONFIG.collegeCode} Student Forum</div>
                </div>
              </div>

              {/* Official IETE Students Forum RIT Chapter Emblem */}
              <div className="gsap-hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-soft hover:shadow-md hover:scale-105 transition-all duration-300">
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
            <h1 className="gsap-hero-title font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy tracking-tight leading-[1.12]">
              RIT IETE <span className="gradient-text">Student Forum</span>
            </h1>

            {/* Subtitle */}
            <p className="gsap-hero-subtitle text-base sm:text-lg lg:text-xl text-slate-600 font-body font-normal leading-relaxed max-w-2xl mx-auto">
              {SITE_CONFIG.chapterTagline}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#events"
                onClick={handleScrollToEvents}
                className="gsap-hero-cta w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-navy text-white text-sm font-semibold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={SITE_CONFIG.membershipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-hero-cta w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white text-brand-navy border border-brand-border text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-brand-blue/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform" />
                <span>Become a Member</span>
              </a>
            </div>

            {/* Key Quick Badges / Trust Markers */}
            <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 max-w-lg mx-auto">
              <div className="gsap-hero-trust flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">IETE Govt</div>
                  <div className="text-[10px] text-slate-500 font-medium">Recognized</div>
                </div>
              </div>

              <div className="gsap-hero-trust flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">Hardware & AI</div>
                  <div className="text-[10px] text-slate-500 font-medium">Maker Lab</div>
                </div>
              </div>

              <div className="gsap-hero-trust flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800">246 Enrolled</div>
                  <div className="text-[10px] text-slate-500 font-medium">Student Members</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Official Community Channels: WhatsApp & Instagram Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 max-w-4xl mx-auto">
          {/* WhatsApp Official Community Card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gsap-hero-stat group relative overflow-hidden bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-emerald-200/80 shadow-soft hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
          >
            {/* Ambient Background Glow & Accent Bar */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Instant Updates
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Official WhatsApp Community
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mt-2">
                Join our student forum community for live event announcements, workshop registrations, study circles, and instant circulars.
              </p>
            </div>

            {/* CTA Link Footer */}
            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Join Community</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                246+ Students
              </span>
            </div>
          </a>

          {/* Instagram Official Page Card */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gsap-hero-stat group relative overflow-hidden bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-pink-200/80 shadow-soft hover:shadow-xl hover:border-pink-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
          >
            {/* Ambient Background Glow & Accent Bar */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200/80 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  @rit_iete_official
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                Follow on Instagram
              </h3>
              <p className="text-sm text-slate-600 font-normal leading-relaxed mt-2">
                Catch our latest photo galleries, event highlights, student project showcases, reels, and behind-the-scenes moments.
              </p>
            </div>

            {/* CTA Link Footer */}
            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-rose-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Follow @rit_iete_official</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Stories & Reels
              </span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
