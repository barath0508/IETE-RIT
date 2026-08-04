import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Calendar, Wrench, Sparkles, BookOpen } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
              Who We Are
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
              {SITE_CONFIG.about.title}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              {SITE_CONFIG.about.subtitle}
            </p>
          </motion.div>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Illustration & Lab Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border border-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Engineering Students Team Collaborating"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-blue/80 backdrop-blur-md text-xs font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Empowering Engineering Talent</span>
                </div>
                <h3 className="text-xl font-heading font-bold">Bridge Theory with Real-World Engineering</h3>
                <p className="text-xs text-slate-200 line-clamp-2">
                  Providing students with direct access to hardware testbenches, mentorship, research publications, and national innovation networks.
                </p>
              </div>
            </div>


          </motion.div>

          {/* Right Content Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-slate-800">
                What is IETE & The Student Forum?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {SITE_CONFIG.about.description}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {SITE_CONFIG.about.isfDescription}
              </p>
            </div>

            {/* Key Objectives Bullet Points */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-navy">Core Objectives & Activities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SITE_CONFIG.about.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100/80">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 leading-snug">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>



      </div>
    </section>
  );
};
