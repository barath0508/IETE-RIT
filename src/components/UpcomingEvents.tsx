import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users } from 'lucide-react';
import { SITE_CONFIG, EventItem } from '../data/siteConfig';
import { EventRegistrationModal } from './EventRegistrationModal';

export const UpcomingEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="py-20 bg-brand-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
              Join Us
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
              Upcoming Events & Bootcamps
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Immersive workshops, national hackathons, and industrial exposure sessions hosted by ISF.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-semibold text-brand-blue">
            <Sparkles className="w-4 h-4" />
            <span>Seats filling fast for Q3/Q4 sessions</span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE_CONFIG.upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image Header */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm">
                    {event.category}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm">
                    <Users className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{event.seatsLeft} Seats Left</span>
                  </span>
                </div>

                {/* Date & Time Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      {event.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-accent" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{event.venue}</span>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Card Footer Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Registration Open
                  </div>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white transition-all duration-200 group/btn"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
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
