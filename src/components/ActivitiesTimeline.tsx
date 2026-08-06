import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, GraduationCap, Factory, Sparkles, Code2, FileText, Trophy, TrendingUp, Clock, Filter } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const ActivitiesTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Skill Building', 'Competitive', 'Mentorship', 'Showcase', 'Coding', 'Academic', 'Career'];

  const filteredActivities = selectedCategory === 'All' 
    ? SITE_CONFIG.activities 
    : SITE_CONFIG.activities.filter(a => a.category === selectedCategory || (selectedCategory === 'Academic' && (a.category === 'Academic' || a.category === 'Excellence')));

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="activities" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm inline-block mb-3">
            What We Do
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Technical & Professional Activities
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            A continuous roadmap of hands-on learning, hackathons, research guidance, and career development.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-blue to-brand-navy text-white shadow-soft scale-105'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Central Line for Large Screens */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-blue via-sky-400 to-indigo-600 opacity-25" />

          <motion.div layout className="space-y-8 lg:space-y-12">
            <AnimatePresence>
              {filteredActivities.map((act, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={act.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    
                    {/* Card Content */}
                    <div className="w-full lg:w-1/2">
                      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-blue/40 transition-all duration-300 relative group overflow-hidden">
                        
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Top Category Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            {act.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                            <Clock className="w-3 h-3 text-brand-blue" />
                            {act.frequency}
                          </span>
                        </div>

                        <h3 className="font-heading font-extrabold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                          {act.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>

                    {/* Central Node Badge */}
                    <div className="hidden lg:flex items-center justify-center shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue shadow-md z-10 font-bold group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      {getActivityIcon(act.iconName)}
                    </div>

                    {/* Empty Spacer Column for layout symmetry */}
                    <div className="hidden lg:block w-1/2" />

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

