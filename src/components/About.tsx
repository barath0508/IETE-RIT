import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Calendar, Wrench, Sparkles, BookOpen, ShieldCheck, Compass, Lightbulb } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { BlurImage } from './BlurImage';

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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm inline-block mb-3">
              Who We Are
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
              {SITE_CONFIG.about.title}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
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
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border border-slate-200/80 group">
              <BlurImage
                src="/images/about-collaboration.webp"
                blurHash="LDB3pRj]X8%N~Vt7WVxu$yoLbIoz"
                alt="Engineering Students Team Collaborating"
                className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-[280px] sm:h-[360px] lg:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent pointer-events-none" />
              
              {/* Floating Top Left Pill Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-navy border border-white/80 shadow-md flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>Founded {SITE_CONFIG.foundedYear}</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-blue/90 backdrop-blur-md text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Empowering Engineering Talent</span>
                </div>
                <h3 className="text-xl font-heading font-bold">Bridge Theory with Real-World Engineering</h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
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
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>National Engineering Forum</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy leading-tight">
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
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy">Core Objectives & Activities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SITE_CONFIG.about.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-200 transition-all">
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

