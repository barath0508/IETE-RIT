import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Cpu, Wrench, Zap, Users, Sparkles, Briefcase } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const MembershipBenefits: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-brand-blue" />;
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-500" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-amber-500" />;
      case 'Zap': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'Users': return <Users className="w-6 h-6 text-emerald-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-blue-600" />;
      default: return <Award className="w-6 h-6 text-brand-blue" />;
    }
  };

  return (
    <section id="benefits" className="py-20 bg-brand-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Why Join Us
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Membership Benefits & Privileges
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Unlock exclusive hardware labs, nationwide professional credentials, and career mentorship.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
                  {getBenefitIcon(benefit.iconName)}
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-brand-blue transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-right">
                <span className="text-[10px] font-mono text-slate-400">ISF PERK 0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
