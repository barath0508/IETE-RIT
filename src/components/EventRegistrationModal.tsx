import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User, CheckCircle2, Award, ExternalLink, Sparkles } from 'lucide-react';
import { EventItem } from '../data/siteConfig';

interface EventRegistrationModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white z-10">
            <div className="space-y-1.5 pr-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                {event.category}
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-navy">
                {event.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                {event.description}
              </p>
            </div>
            
            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {/* Event Details Card */}
            <div className="p-4 rounded-2xl bg-brand-section border border-slate-200/80 space-y-3 text-xs text-slate-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-800">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-800">Venue: {event.venue}</span>
                </div>
                {event.teamSize && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>Team: {event.teamSize}</span>
                  </div>
                )}
                {event.eligibility && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{event.eligibility}</span>
                  </div>
                )}
              </div>

              {event.perks && (
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{event.perks}</span>
                </div>
              )}

              {event.fullDetails && (
                <div className="pt-3 mt-2 border-t border-slate-200/60 text-slate-700 whitespace-pre-line font-mono text-[11px] leading-relaxed bg-white/60 p-3 rounded-xl border border-slate-100">
                  {event.fullDetails}
                </div>
              )}
            </div>

            {/* Google Form Info Box */}
            {event.registrationLink && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-2 text-left">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Registration via Official Google Form</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Registration for this event is conducted exclusively through the official Google Form.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            {event.registrationLink ? (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Complete Registration on Google Form</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors shrink-0"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};



