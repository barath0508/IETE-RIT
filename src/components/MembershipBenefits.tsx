import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Cpu, Wrench, Zap, Users, Sparkles, Briefcase, Check } from 'lucide-react';
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
    <section id="benefits" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Why Join Us</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Membership Benefits & Privileges
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Unlock exclusive hardware labs, nationwide professional credentials, research publication support, and placement boosts.
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
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-navy group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                  {getBenefitIcon(benefit.iconName)}
                </div>

                <h3 className="font-heading font-extrabold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600">
                  <Check className="w-3.5 h-3.5" /> Included
                </span>
                <span className="font-mono text-[10px]">ISF PERK 0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

