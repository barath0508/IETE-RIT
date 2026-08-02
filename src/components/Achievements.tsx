import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, FileCheck, Lightbulb, Cpu, Briefcase, Award, Star } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Achievements: React.FC = () => {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-brand-blue" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6 text-indigo-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-emerald-500" />;
      case 'Award': return <Award className="w-6 h-6 text-yellow-500" />;
      default: return <Star className="w-6 h-6 text-brand-blue" />;
    }
  };

  return (
    <section className="py-20 bg-brand-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Excellence & Recognition
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Chapter Achievements & Impact
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Celebrating national accolades, research papers, patents, and top-tier career placements.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {getAchievementIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>

                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy group-hover:text-brand-blue transition-colors">
                    {item.value}
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-800 mt-1">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-brand-blue">
                <Star className="w-3.5 h-3.5 fill-brand-blue text-brand-blue" />
                <span>Institutional Honor</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
