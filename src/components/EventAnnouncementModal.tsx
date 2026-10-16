import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, MapPin, Users, Award, ExternalLink, 
  Sparkles, Zap, ArrowRight, CheckCircle2, Lightbulb,
  Trophy, IndianRupee
} from 'lucide-react';
import { EventItem, SITE_CONFIG } from '../data/siteConfig';
import { BlurImage } from './BlurImage';

interface EventAnnouncementModalProps {
  event: EventItem | null;
  onExploreEvents?: () => void;
}

// Helper to verify event is still upcoming/active (up to 23:59:59 on event day)
const isBeforeEventEnd = (dateString?: string): boolean => {
  if (!dateString) return false;
  try {
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) return true;
    eventDate.setHours(23, 59, 59, 999);
    return new Date().getTime() <= eventDate.getTime();
  } catch {
    return true;
  }
};

export const EventAnnouncementModal: React.FC<EventAnnouncementModalProps> = ({
  event,
  onExploreEvents
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!event) return;

    // Automatically check if event date has not yet passed
    if (!isBeforeEventEnd(event.date)) {
      return;
    }

    // Always pop up with a smooth entrance delay when website is opened
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [event]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExplore = () => {
    handleClose();
    if (onExploreEvents) {
      onExploreEvents();
    } else {
      const el = document.getElementById('events');
      if (el) {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!event) return null;

  const whatsappUrl = SITE_CONFIG.contact.socials.whatsapp || SITE_CONFIG.whatsappGroupLink;
  const registerUrl = event.registrationLink || whatsappUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 relative overflow-hidden my-auto"
          >
            {/* Top Glowing Ambient Accents */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600" />
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Poster Banner Visual */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <BlurImage
                src={event.image}
                blurHash={event.blurHash}
                alt={event.title}
                className="w-full h-full object-cover object-top filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Floating Top Left Pill Badge */}
              <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-600 to-indigo-600 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Registration Open
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-cyan-200 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Oct 28, 2026
                </span>
              </div>

              {/* Top Right Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close Announcement"
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            {/* Modal Body Content */}
            <div className="p-4 sm:p-6 space-y-3.5">
              
              {/* Event Title Header */}
              <div>
                <div className="flex items-center gap-1.5 text-brand-blue text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                  <span>Flagship Innovation Sprint</span>
                </div>
                <h3 className="font-heading font-black text-lg sm:text-xl md:text-2xl text-brand-navy mt-1 tracking-tight leading-snug">
                  {event.title}
                </h3>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ready to turn your innovative idea into reality? Pitch your breakthrough solutions across 
                <strong className="text-slate-800"> AI, IoT, VLSI, and Sustainable Tech </strong> 
                in teams of 2 in front of premier industry judges and academic researchers.
              </p>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-1">
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Venue</div>
                    <div className="text-xs font-extrabold text-brand-navy truncate">4th Floor, Green Bldg, RIT</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Team Size</div>
                    <div className="text-xs font-extrabold text-brand-navy truncate">Exactly 2 Members</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Date & Time</div>
                    <div className="text-xs font-extrabold text-brand-navy truncate">Oct 28 • 8 AM – 3 PM</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Registration Fee</div>
                    <div className="text-xs font-extrabold text-brand-navy truncate">₹200 per Team</div>
                  </div>
                </div>
              </div>

              {/* Rewards & Recognition Banner */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 flex items-center justify-between gap-3 text-amber-950">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Perks &amp; Rewards</div>
                    <div className="text-xs sm:text-sm font-black text-amber-950 truncate">₹10,000 Cash Prize + Certificates</div>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-xl bg-amber-200/80 text-[10px] font-extrabold text-amber-900 border border-amber-300/60">
                  ₹10,000 Pool
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                {event.registrationOpen && event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-navy text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                  >
                    <Zap className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                    <span>Register Now</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                  >
                    <Zap className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
                    <span>Registration Opening Soon • Stay Tuned</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}

                <button
                  onClick={handleExplore}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:text-brand-navy hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Subtle Dismiss */}
              <div className="text-center pt-1">
                <button
                  onClick={handleClose}
                  className="text-[11px] text-slate-400 hover:text-slate-600 font-medium transition-colors"
                >
                  Continue browsing website &rarr;
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
