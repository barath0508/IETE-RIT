import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, UserPlus, Cpu } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Vision & Mission', href: '#vision' },
    { name: 'Activities', href: '#activities' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Members', href: '#members' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
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
    setMobileMenuOpen(false);
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

      {/* Main Navbar */}
      <header
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft py-3'
            : 'bg-white/80 backdrop-blur-md py-4 border-b border-brand-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-brand-navy leading-tight tracking-tight flex items-center gap-1.5">
                  IETE <span className="text-brand-blue">Student Forum</span>
                </span>
                <span className="text-[11px] font-medium text-brand-muted tracking-wider uppercase">
                  {SITE_CONFIG.collegeCode} College Chapter
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-brand-blue font-semibold bg-brand-50'
                        : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-blue rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenJoinModal}
                className="relative inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Join ISF
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Hamburger Button for Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-brand-border/60 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-blue font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-brand-blue'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-brand-blue translate-x-1' : 'text-slate-400'}`} />
                    </a>
                  );
                })}

                <div className="pt-4 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenJoinModal();
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-soft"
                  >
                    <UserPlus className="w-4 h-4" />
                    Join ISF Chapter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
