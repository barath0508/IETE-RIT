import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users, Award, CheckCircle, Zap, ExternalLink } from 'lucide-react';
import { SITE_CONFIG, EventItem } from '../data/siteConfig';
import { EventRegistrationModal } from './EventRegistrationModal';

export const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="py-20 bg-slate-50/70 relative overflow-hidden">
      
      {/* Background Decorator */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Join Us Live</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Upcoming Events & Competitions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Immersive technical challenges, national hackathons, and interactive competitions hosted by ISF RIT.
          </p>
        </div>

        {/* Featured Mega Event Layout */}
        <div className="max-w-5xl mx-auto">
          {SITE_CONFIG.upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft-lg hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* Left Image Poster Column */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />

                {/* Top Poster Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-navy px-3.5 py-1.5 rounded-full shadow-md">
                    Featured {event.category}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                    <Users className="w-3.5 h-3.5 text-brand-blue" />
                    <span>500 Points Pool</span>
                  </span>
                </div>

                {/* Date & Time Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Registration Open</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-accent" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-accent" />
                      {event.venue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Event Info & Round Breakdown Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Flagship Competition 2026</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-blue transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Quick Snapshot Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {event.teamSize && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-brand-blue text-xs font-semibold border border-blue-100">
                        <Users className="w-3.5 h-3.5" />
                        Team: {event.teamSize}
                      </span>
                    )}
                    {event.eligibility && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {event.eligibility}
                      </span>
                    )}
                    {event.perks && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        {event.perks}
                      </span>
                    )}
                  </div>

                  {/* Highlights Grid */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-left">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">Round 1 (300 Pts)</div>
                      <div className="text-xs font-bold text-brand-navy mt-0.5">Puzzles & AI Myth</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-left">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">Round 2 (200 Pts)</div>
                      <div className="text-xs font-bold text-brand-navy mt-0.5">Logos & Founders</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-left">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">Round 3</div>
                      <div className="text-xs font-bold text-brand-navy mt-0.5">High-Stakes Betting</div>
                    </div>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="font-bold text-brand-navy">Certificates & Cash Rewards</span> for Top Winners
                  </div>

                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      View Details
                    </button>

                    {event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group/btn"
                      >
                        <span>Register Now (Google Form)</span>
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group/btn"
                      >
                        <span>Register Team Now</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Registration Modal Popup */}
      <EventRegistrationModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

