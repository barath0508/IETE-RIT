import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, MapPin, User, CheckCircle2, Award, ExternalLink, 
  Sparkles, Clock, AlertCircle, Trophy, IndianRupee, Laptop, 
  Coffee, ShieldCheck, Check, Zap, Flame, Phone 
} from 'lucide-react';
import { EventItem } from '../data/siteConfig';
import { BlurImage } from './BlurImage';

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
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 relative overflow-hidden m-2 sm:m-0"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0 bg-white z-10">
            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                  {event.category}
                </span>
                {event.seatsLeft && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {event.seatsLeft}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-black text-lg sm:text-2xl text-brand-navy leading-snug">
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
              className="shrink-0 p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* Poster Preview */}
            {event.image && (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-slate-950 flex flex-col items-center justify-center border border-slate-800">
                <div className="relative w-full max-h-[360px] sm:max-h-[460px] overflow-hidden flex items-center justify-center bg-slate-950">
                  <BlurImage
                    src={event.image}
                    blurHash={event.blurHash}
                    alt={event.title}
                    className="w-full h-auto max-h-[360px] sm:max-h-[460px] object-contain mx-auto"
                  />
                </div>
                <div className="w-full bg-slate-900/90 border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-slate-300">Official Event Poster</span>
                  <a
                    href={event.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                  >
                    <span>Open High-Res Poster</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Slogan Banner */}
            {event.slogan && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-blue/10 via-indigo-500/10 to-amber-500/10 border border-blue-200/80 flex items-center justify-center gap-2 text-center">
                <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-brand-navy tracking-wide">
                  {event.slogan}
                </span>
              </div>
            )}

            {/* Event Key Info Grid */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs text-slate-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-800">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-800">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-semibold text-slate-800">Venue: {event.venue}</span>
                </div>
                {event.teamSize && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>Team: <strong className="text-slate-800">{event.teamSize}</strong></span>
                  </div>
                )}
                {event.registrationFee && (
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-semibold text-purple-700">Fee: {event.registrationFee}</span>
                  </div>
                )}
                {event.eligibility && (
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{event.eligibility}</span>
                  </div>
                )}
              </div>

              {event.perks && (
                <div className="pt-2.5 border-t border-slate-200/60 flex items-center gap-2 text-xs text-amber-900 font-bold">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{event.perks}</span>
                </div>
              )}
            </div>

            {/* Crucial Day-Of Checklist Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950">
              <div className="font-bold uppercase tracking-wider text-[11px] text-amber-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Important Participant Instructions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>Report before 8:00 AM</strong> for registration &amp; track draws.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Laptop className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>Bring your laptop</strong> for 30-min PPT preparation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Coffee className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>Refreshments provided</strong> (Lunch will not be provided).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span><strong>Participation Certificates</strong> for all participants.</span>
                </div>
              </div>
            </div>

            {/* Structured Event Flow */}
            {event.rounds && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-sm text-brand-navy flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <span>Event Flow ({event.rounds.length} Stages)</span>
                  </h4>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Full Timeline
                  </span>
                </div>

                <div className="space-y-2.5">
                  {event.rounds.map((r) => (
                    <div key={r.roundNumber} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/30 transition-all flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        {r.roundNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-brand-navy">
                          {r.title}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {r.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules & Guidelines */}
            {event.rules && (
              <div className="space-y-3 pt-2">
                <h4 className="font-heading font-extrabold text-sm text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span>Rules &amp; Guidelines</span>
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
                  {event.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="leading-snug">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Coordinators & Contacts */}
            {event.coordinators && event.coordinators.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-sm text-brand-navy flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-blue" />
                    <span>Event Coordinators &amp; Helpline</span>
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tap to Call</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.coordinators.map((c) => (
                    <a
                      key={c.name}
                      href={`tel:${c.phone?.replace(/[^0-9+]/g, '')}`}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors truncate">
                          {c.name}
                        </div>
                        {c.role && (
                          <div className="text-[10px] text-slate-500 truncate">
                            {c.role}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-2xs shrink-0 group-hover:border-brand-blue/30 group-hover:text-brand-blue">
                        <Phone className="w-3 h-3 text-brand-blue" />
                        <span>{c.phone}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Join & Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

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



