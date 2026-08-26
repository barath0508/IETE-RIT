import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Cpu, Wrench, Zap, Users, Sparkles, Briefcase, Check, ArrowRight, UserPlus } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

export const MembershipBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalCountRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // 1. Stagger Perks Cards Entrance
    gsap.fromTo(
      '.gsap-benefit-card',
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gsap-benefits-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      }
    );

    // 2. Rolling Number Counter for Total Enrolled
    if (totalCountRef.current && SITE_CONFIG.membershipEnrollment) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: SITE_CONFIG.membershipEnrollment.totalCount,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gsap-enrollment-card',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          if (totalCountRef.current) {
            totalCountRef.current.textContent = `${Math.floor(obj.val)}`;
          }
        },
      });
    }

    // 3. Animate distribution progress bars
    gsap.utils.toArray<HTMLElement>('.gsap-progress-fill').forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width') || '100%';
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

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
    <section ref={sectionRef} id="benefits" className="py-20 bg-white relative overflow-hidden">
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

        {/* Benefits Grid with GSAP Entrance */}
        <div className="gsap-benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="gsap-benefit-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
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
            </div>
          ))}
        </div>

        {/* Total Registered Students Breakdown Card */}
        {SITE_CONFIG.membershipEnrollment && (
          <div
            className="gsap-enrollment-card mt-14 bg-gradient-to-br from-slate-900 via-slate-950 to-brand-navy rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-950/80 border border-blue-800/60 px-3.5 py-1.5 rounded-full mb-3 shadow-inner">
                    <Users className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Official Chapter Strength</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    {SITE_CONFIG.membershipEnrollment.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-2xl">
                    {SITE_CONFIG.membershipEnrollment.subtitle}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 px-5 py-3 rounded-2xl backdrop-blur-md shadow-xl self-start md:self-auto">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</div>
                    <div className="text-2xl sm:text-3xl font-heading font-black text-brand-accent">
                      <span ref={totalCountRef}>0</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30 text-brand-blue">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Department Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {SITE_CONFIG.membershipEnrollment.departments.map((dept) => (
                  <div
                    key={dept.code}
                    className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${dept.badgeColor}`}>
                            {dept.code}
                          </span>
                          <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                            {dept.department}
                          </h4>
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-brand-accent shrink-0">
                          {dept.total} Students
                        </span>
                      </div>

                      {/* Section Rows */}
                      <div className="space-y-3 pt-2">
                        {dept.sections.map((sec) => (
                          <div
                            key={sec.classes}
                            className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:bg-slate-950 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-brand-blue" />
                              <div>
                                <span className="font-bold text-xs sm:text-sm text-slate-200">
                                  {sec.classes}
                                </span>
                                <span className="text-[11px] text-slate-400 ml-2 font-medium">
                                  ({sec.year})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-heading font-extrabold text-xs sm:text-sm text-white bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                                {sec.count} Registered
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ratio Bar with GSAP Animated Fill */}
                    <div className="mt-5 pt-4 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1.5">
                        <span>Cohort Distribution</span>
                        <span className="text-slate-300 font-mono">100% Verified Members</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                        {dept.sections.map((sec, sIdx) => {
                          const wPercent = `${(sec.count / dept.total) * 100}%`;
                          return (
                            <div
                              key={sec.classes}
                              data-width={wPercent}
                              className={`gsap-progress-fill h-full ${sIdx === 0 ? 'bg-brand-blue' : 'bg-purple-500'}`}
                              title={`${sec.classes}: ${sec.count} (${Math.round((sec.count / dept.total) * 100)}%)`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Institutional Member Benefits Active for Undergraduate Duration</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  IETE Chennai Centre Chapter ID: ISF-RIT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-8 rounded-3xl bg-gradient-to-r from-brand-navy via-brand-blue to-blue-700 text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl">
              Ready to Accelerate Your Engineering Career?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Join active engineering innovators at Rajalakshmi Institute of Technology. Gain exclusive hardware access, workshop discounts, and leadership roles.
            </p>
          </div>

          <a
            href={SITE_CONFIG.membershipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-brand-navy font-bold text-xs sm:text-sm shadow-md hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-brand-blue group-hover:rotate-12 transition-transform" />
            <span>Become a Member</span>
            <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
