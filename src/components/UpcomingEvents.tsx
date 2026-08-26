import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users, Award, CheckCircle, Zap, ExternalLink, Phone, AlertCircle } from 'lucide-react';
import { SITE_CONFIG, EventItem } from '../data/siteConfig';
import { EventRegistrationModal } from './EventRegistrationModal';
import { BlurImage } from './BlurImage';

export const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="py-20 bg-white relative overflow-hidden">
      
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
            Immersive technical challenges, national hackathons, and interactive competitions hosted by IETE ISF RIT.
          </p>
        </div>

        {/* Featured Event Cards Layout */}
        <div className="max-w-5xl mx-auto space-y-8">
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
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-950">
                <BlurImage
                  src={event.image}
                  blurHash={event.blurHash}
                  alt={event.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/30 to-transparent pointer-events-none" />

                {/* Top Poster Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-navy px-3.5 py-1.5 rounded-full shadow-md">
                    Featured {event.category}
                  </span>
                  
                  {event.seatsLeft && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-300 shadow-sm">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{event.seatsLeft}</span>
                    </span>
                  )}
                </div>

                {/* Date & Time Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 z-10">
                  {event.status === 'Completed' || !event.registrationOpen ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/90 text-emerald-400 text-xs font-bold shadow-sm border border-emerald-500/30 backdrop-blur-md">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Event Successfully Concluded</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>Registration Open</span>
                    </div>
                  )}
                  <div className="space-y-1 text-xs font-semibold text-slate-200 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Event Info & Round Breakdown Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Department of ECE & IETE ISF</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-blue transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Quick Snapshot Badges */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    {event.teamSize && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-brand-blue text-xs font-semibold border border-blue-100">
                        <Users className="w-3.5 h-3.5" />
                        {event.teamSize}
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

                  {/* Rounds Breakdown Grid */}
                  {event.rounds && (
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {event.rounds.map((round) => (
                        <div key={round.roundNumber} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/40 transition-colors text-left">
                          <div className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider">
                            Round {round.roundNumber}
                          </div>
                          <div className="text-xs font-bold text-brand-navy mt-0.5">
                            {round.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                            {round.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Coordinators Quick List */}
                  {event.coordinators && event.coordinators.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-blue" />
                        Contacts:
                      </span>
                      {event.coordinators.map((c) => (
                        <span key={c.name} className="bg-slate-100/80 px-2.5 py-1 rounded-lg text-[11px]">
                          {c.name}: <span className="font-semibold text-brand-navy">{c.phone}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="font-bold text-brand-navy">Trophies & E-Certificates</span> for Participants
                  </div>

                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      View Event Details
                    </button>

                    <a
                      href={SITE_CONFIG.whatsappGroupLink || SITE_CONFIG.membershipLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group/btn"
                    >
                      <span>Join WhatsApp Community</span>
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Next Events Roadmap Banner */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Upcoming Roadmap</span>
            </div>
            <h4 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Stay Tuned for Upcoming Hackathons & Competitions!
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              New national hackathons, circuit design bootcamps, and technical symposiums are currently being scheduled by IETE ISF RIT.
            </p>
          </div>
          <a
            href={SITE_CONFIG.whatsappGroupLink || SITE_CONFIG.membershipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-cyan-500 hover:from-cyan-500 hover:to-brand-blue text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>Get Priority Alerts on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
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

