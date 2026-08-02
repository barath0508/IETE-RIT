import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Wrench, Building2, Microscope, Lightbulb, Users, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const VisionMission: React.FC = () => {
  const getMissionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Microscope': return <Microscope className="w-6 h-6" />;
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      default: return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <section id="vision" className="py-20 bg-brand-section relative overflow-hidden">
      
      {/* Background Gradient Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-50 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Centered Vision Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-8 sm:p-12 shadow-soft border border-white/80 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-navy text-white mx-auto flex items-center justify-center shadow-soft mb-6">
            <Target className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Our Core Vision
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-navy mt-4 leading-relaxed">
            "{SITE_CONFIG.vision.statement}"
          </h2>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            <span>Guiding Principles of IETE Student Forum</span>
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
          </div>
        </motion.div>

        {/* Mission Cards Header */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Our Key Pillars
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Mission & Strategic Objectives
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Structured initiatives to foster hardware innovation, academic publication, and career readiness.
          </p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.missions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
                  {getMissionIcon(item.iconName)}
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Pillar 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 group-hover:bg-brand-blue transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
