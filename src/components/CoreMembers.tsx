import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Github, GraduationCap, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const CoreMembers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Faculty', 'Executive Board', 'Domain Lead'];

  const filteredMembers = activeTab === 'All'
    ? SITE_CONFIG.coreMembers
    : SITE_CONFIG.coreMembers.filter(m => m.category === activeTab);

  return (
    <section id="members" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Leadership & Office Bearers
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Meet Our Core Team
          </h2>
          <p className="text-slate-600 text-base mt-2">
            The dedicated faculty mentors and student leaders driving the ISF chapter.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-brand-blue text-white shadow-soft scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Photo Container */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

                  {/* Position Badge Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm inline-flex items-center gap-1">
                      {member.category === 'Faculty' ? <ShieldCheck className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                      {member.position}
                    </span>
                  </div>

                  {/* Name & Dept Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-heading font-bold text-xl text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-brand-accent font-medium mt-0.5">
                      {member.department}
                    </p>
                  </div>
                </div>

                {/* Card Details & Social Links */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      {member.year}
                    </span>

                    {/* Social Buttons */}
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}

                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-colors"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
