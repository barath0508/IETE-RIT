import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, FileCheck, Lightbulb, Cpu, Briefcase, Award, Sparkles, TrendingUp } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Achievements: React.FC = () => {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-6 h-6" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-white relative overflow-hidden">
      {/* Background Decorator */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Proven Track Record</span>
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
              Key Chapter Achievements
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Recognizing our members' excellence in national hackathons, research publications, IP creation, and core placements.
            </p>
          </motion.div>
        </div>

        {/* Achievements 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Top Card Gradient Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-navy text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  {getAchievementIcon(item.iconName)}
                </div>
                <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>

              {/* Big Stat Value */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-heading font-black text-3xl sm:text-4xl text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.value}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-slate-800 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> Official Milestone
                </span>
                <span>IETE RIT</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
