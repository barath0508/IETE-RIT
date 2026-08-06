import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Cpu, Award, Sparkles, Wrench, FileText, Share2, Users, UserCheck, Palette, Video, GraduationCap, Crown } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const CoreMembers: React.FC = () => {
  const getRoleIcon = (position: string) => {
    if (position.includes('Faculty') || position.includes('Mentor')) return <ShieldCheck className="w-5 h-5 text-brand-blue" />;
    if (position.includes('Chairman') || position.includes('Chairperson')) return <Crown className="w-5 h-5 text-amber-500" />;
    if (position.includes('Secretary') || position.includes('Vice')) return <Award className="w-5 h-5 text-sky-500" />;
    if (position.includes('Technical')) return <Cpu className="w-5 h-5 text-cyan-500" />;
    if (position.includes('Sponsorship') || position.includes('Guest Care')) return <Sparkles className="w-5 h-5 text-purple-500" />;
    if (position.includes('Event')) return <Wrench className="w-5 h-5 text-emerald-500" />;
    if (position.includes('Documentation')) return <FileText className="w-5 h-5 text-blue-500" />;
    if (position.includes('Social Media')) return <Share2 className="w-5 h-5 text-pink-500" />;
    if (position.includes('Volunteer')) return <Users className="w-5 h-5 text-indigo-500" />;
    if (position.includes('Registration')) return <UserCheck className="w-5 h-5 text-teal-500" />;
    if (position.includes('Designing')) return <Palette className="w-5 h-5 text-orange-500" />;
    if (position.includes('Editing')) return <Video className="w-5 h-5 text-rose-500" />;
    return <User className="w-5 h-5 text-brand-blue" />;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(part => part && part !== '&' && part !== 'Ms.')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const facultyMentor = SITE_CONFIG.coreMembers.filter(m => m.position.includes('Faculty') || m.position.includes('Mentor'));
  const executiveBoard = SITE_CONFIG.coreMembers.filter(m => m.position === 'Chairman' || m.position === 'Vice Chairman' || m.position === 'Secretary');
  const domainLeads = SITE_CONFIG.coreMembers.filter(m => !m.position.includes('Faculty') && m.position !== 'Chairman' && m.position !== 'Vice Chairman' && m.position !== 'Secretary');

  return (
    <section id="members" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Users className="w-3.5 h-3.5 text-brand-blue" />
            <span>Leadership & Guidance</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            ISF Office Bearers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            The dedicated faculty mentor and student office bearers driving the IETE Student Forum chapter forward.
          </p>
        </div>

        {/* 1. Faculty Mentor Highlight Section */}
        {facultyMentor.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-soft-lg flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-blue via-blue-600 to-brand-navy text-white font-heading font-black text-2xl flex items-center justify-center shadow-md shrink-0 border-2 border-white">
              {getInitials(member.name)}
            </div>
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-bold border border-blue-200 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{member.position}</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-navy">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                {member.department}
              </p>
            </div>
          </motion.div>
        ))}

        {/* 2. Executive Board & Domain Leads Grid */}
        <div className="space-y-8">
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-navy border-l-4 border-brand-blue pl-3">
              Student Executive Committee & Domain Leads
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...executiveBoard, ...domainLeads].map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Card Gradient Bar for Executive Officers */}
                {(member.position === 'Chairman' || member.position === 'Vice Chairman' || member.position === 'Secretary') && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-brand-blue to-indigo-600" />
                )}

                <div className="relative z-10 space-y-4">
                  {/* Header Row: Initials Avatar + Role Icon & Position Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy text-white font-heading font-bold text-base flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      {getInitials(member.name)}
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                        {getRoleIcon(member.position)}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {member.position}
                      </span>
                    </div>
                  </div>

                  {/* Member Name & Department */}
                  <div>
                    <h4 className="font-heading font-extrabold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {member.department}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Designation */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>{member.year}</span>
                  <span className="w-2 h-2 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors" />
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

