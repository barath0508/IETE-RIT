import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, UserPlus, Home, Info, Target, Compass, Calendar, Image, Globe, Users, Award, HelpCircle, PhoneCall, Newspaper } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Vision & Mission', href: '#vision', icon: Target },
    { name: 'Benefits', href: '#benefits', icon: Award },
    { name: 'Office Bearers', href: '#members', icon: Users },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Activities', href: '#activities', icon: Compass },
    { name: 'Blog', href: '#blog', icon: Newspaper },
    { name: '3D Globe', href: '#photo-globe', icon: Globe },
    { name: 'Gallery', href: '#gallery', icon: Image },
    { name: 'FAQs', href: '#faqs', icon: HelpCircle },
    { name: 'Contact', href: '#contact', icon: PhoneCall },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Progress bar
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Active section highlighting
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-brand-border z-50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-blue via-blue-500 to-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar Header */}
      <header
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft py-2.5'
            : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-brand-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: RIT Logo + IETE Logo + Brand Title */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
            >
              {/* RIT Logo */}
              <img 
                src={SITE_CONFIG.logos.collegeLogo} 
                alt="Rajalakshmi Institute of Technology (RIT)" 
                className="h-6 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />

              <div className="h-4 sm:h-6 w-px bg-slate-200" />

              {/* IETE Logo */}
              <img 
                src={SITE_CONFIG.logos.ieteLogo} 
                alt="IETE Logo" 
                className="h-6 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />

              {/* Chapter Title - Hidden on small mobile to prevent header overlap */}
              <div className="hidden md:flex flex-col">
                <span className="font-heading font-extrabold text-sm sm:text-base text-brand-navy leading-tight tracking-tight flex items-center gap-1">
                  IETE <span className="text-brand-blue">Student Forum</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-brand-muted tracking-wider uppercase">
                  {SITE_CONFIG.collegeCode} Student Chapter
                </span>
              </div>
            </a>

            {/* Right: Join ISF Button + Menu Dropdown Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <a
                href={SITE_CONFIG.membershipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 group overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden xs:inline">Join ISF</span>
                  <span className="xs:hidden">Join</span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              {/* Menu Toggle Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 border ${
                  menuOpen
                    ? 'bg-brand-blue text-white border-brand-blue shadow-soft'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5 text-brand-blue" />}
                <span>Menu</span>
              </button>
            </div>

          </div>
        </div>

        {/* Dropdown Navigation Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-white/95 backdrop-blur-xl border-b border-brand-border/60 overflow-hidden shadow-2xl max-h-[82vh] overflow-y-auto"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Navigation Menu</span>
                  <span>{SITE_CONFIG.chapterName}</span>
                </div>

                {/* 2-Column / Multi-Column Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-brand-50 text-brand-blue border border-brand-200 shadow-sm'
                            : 'text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-brand-blue border border-slate-100'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-brand-blue text-white' : 'bg-white text-slate-500 shadow-sm'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="truncate">{link.name}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Drawer Footer Banner */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Official Student Chapter of Rajalakshmi Institute of Technology</span>
                  </div>

                  <a
                    href={SITE_CONFIG.membershipLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-brand-blue font-bold hover:underline cursor-pointer"
                  >
                    <span>Become a Member</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
