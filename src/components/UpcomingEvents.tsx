import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users, Award, CheckCircle, Zap, ExternalLink, Phone, AlertCircle, Instagram, MessageCircle, Bell, Radio, Cpu, Trophy, BookOpen, Layers } from 'lucide-react';
import { SITE_CONFIG, EventItem } from '../data/siteConfig';
import { EventRegistrationModal } from './EventRegistrationModal';
import { BlurImage } from './BlurImage';

export const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const hasUpcomingEvents = SITE_CONFIG.upcomingEvents && SITE_CONFIG.upcomingEvents.length > 0;
  const whatsappUrl = SITE_CONFIG.contact.socials.whatsapp || SITE_CONFIG.whatsappGroupLink;
  const instagramUrl = SITE_CONFIG.contact.socials.instagram;

  return (
    <section id="events" className="py-20 bg-white relative overflow-hidden">
      
      {/* Background Ambient Decorators */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Join Us Live</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Upcoming Events & Competitions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Immersive technical challenges, national hackathons, and hands-on workshops hosted by IETE ISF RIT.
          </p>
        </div>

        {/* 1. When Upcoming Events Exist */}
        {hasUpcomingEvents ? (
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
                <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-slate-950">
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
                        href={whatsappUrl}
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
        ) : (
          /* 2. When No Upcoming Events Are Currently Live (Stay Tuned View) */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            {/* Main Stay Tuned Banner */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Background ambient glow circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
                
                {/* Live Status Pulse Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-brand-accent shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span>Next Technical Season in Planning</span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                  Stay Tuned for Upcoming Hackathons, Workshops & Competitions!
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Our previous events, including <strong className="text-white">Silicon Maze</strong>, <strong className="text-white">Research Articulation</strong>, and <strong className="text-white">Digital Twin of Everything</strong>, have concluded successfully. Follow our official channels to be the first to know when new event registrations open!
                </p>

                {/* Primary Dual Action Channels (WhatsApp & Instagram) */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* WhatsApp Channel CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-medium text-emerald-100 leading-none">Instant Announcements</div>
                      <div className="text-sm font-extrabold text-white mt-0.5 flex items-center gap-1.5">
                        <span>Join WhatsApp Community</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>

                  {/* Instagram Page CTA */}
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:brightness-110 text-white font-bold text-sm shadow-lg hover:shadow-rose-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-medium text-rose-100 leading-none">Stories & Teasers</div>
                      <div className="text-sm font-extrabold text-white mt-0.5 flex items-center gap-1.5">
                        <span>Follow on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>

            {/* Upcoming Roadmap Preview Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 hover:border-brand-blue/40 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-100 shadow-sm">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-navy">National Hackathons</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    24h coding & hardware sprints with real-world industry problem statements.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 hover:border-brand-blue/40 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-navy">VLSI & PCB Bootcamps</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Hands-on FPGA programming, Verilog HDL coding, and circuit fabrication.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 hover:border-brand-blue/40 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 shadow-sm">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-navy">Technical Symposiums</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Inter-collegiate project expos, technical puzzles, and robotics showcases.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 hover:border-brand-blue/40 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-navy">Research Mentorship</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Expert lectures on research articulation, paper writing, and publication ethics.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        )}

      </div>

      {/* Registration Modal Popup */}
      <EventRegistrationModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};


