import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Wrench, Building2, Microscope, Lightbulb, Users, Compass, Quote } from 'lucide-react';
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
    <section id="vision" className="py-20 bg-slate-50/70 relative overflow-hidden">
      
      {/* Background Gradient Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Centered Vision Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-soft border border-slate-200/90 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue via-blue-600 to-brand-navy text-white mx-auto flex items-center justify-center shadow-md mb-6 transform group-hover:scale-105 transition-transform duration-300">
            <Target className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-4">
            <Quote className="w-3.5 h-3.5" />
            <span>Our Core Vision</span>
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-navy leading-relaxed max-w-3xl mx-auto">
            "{SITE_CONFIG.vision.statement}"
          </h2>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-500 font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            <span>Guiding Principles of IETE Student Forum</span>
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
          </div>
        </motion.div>

        {/* Mission Cards Header */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm inline-block mb-3">
            Our Strategic Pillars
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Mission & Key Objectives
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
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
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-navy group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                  {getMissionIcon(item.iconName)}
                </div>

                <h3 className="font-heading font-bold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span className="text-brand-blue">Pillar 0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

