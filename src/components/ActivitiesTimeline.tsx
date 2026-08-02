import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, GraduationCap, Factory, Sparkles, Code2, FileText, Trophy, TrendingUp, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const ActivitiesTimeline: React.FC = () => {
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="activities" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            What We Do
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Technical & Professional Activities
          </h2>
          <p className="text-slate-600 text-base mt-2">
            A continuous roadmap of learning, competition, research, and career development.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Central Line for Large Screens */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-blue via-brand-accent to-brand-navy/30 opacity-30" />

          <div className="space-y-8 lg:space-y-12">
            {SITE_CONFIG.activities.map((act, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Card Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-brand-blue/30 transition-all duration-300 relative group">
                      
                      {/* Top Category Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
                          {act.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {act.frequency}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-brand-blue transition-colors">
                        {act.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden lg:flex items-center justify-center shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue shadow-md z-10 font-bold">
                    {getActivityIcon(act.iconName)}
                  </div>

                  {/* Empty Spacer Column for layout symmetry */}
                  <div className="hidden lg:block w-1/2" />

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
