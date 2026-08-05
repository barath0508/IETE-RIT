import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Cpu, Award, Sparkles, Wrench, FileText, Share2, Users, UserCheck, Palette, Video } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const CoreMembers: React.FC = () => {
  const getRoleIcon = (position: string) => {
    if (position.includes('Faculty') || position.includes('Mentor')) return <ShieldCheck className="w-5 h-5 text-brand-blue" />;
    if (position.includes('Chairman') || position.includes('Chairperson')) return <Award className="w-5 h-5 text-amber-500" />;
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
      .filter(part => part && part !== '&')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section id="members" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            ISF Chapter Leadership
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Office Bearers
          </h2>
          <p className="text-slate-600 text-base mt-2">
            The dedicated faculty mentor and student office bearers leading the IETE Student Forum chapter.
          </p>
        </div>

        {/* Office Bearers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.coreMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-0 group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10 space-y-4">
                
                {/* Header Row: Initials Avatar + Role Icon & Position Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy text-white font-heading font-bold text-base flex items-center justify-center shadow-soft shrink-0 group-hover:scale-105 transition-transform">
                    {getInitials(member.name)}
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                      {getRoleIcon(member.position)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                      {member.position}
                    </span>
                  </div>
                </div>

                {/* Member Name & Department */}
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-navy group-hover:text-brand-blue transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-brand-accent font-semibold mt-0.5">
                    {member.department}
                  </p>
                </div>



              </div>

              {/* Card Footer: Designation */}
              <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {member.year}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
