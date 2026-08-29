import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Users, Linkedin, ExternalLink
} from 'lucide-react';
import { SITE_CONFIG, CoreMember } from '../data/siteConfig';

export const CoreMembers: React.FC = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(part => part && part !== '&' && part !== 'Ms.' && part !== 'Dr.')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getRoleGradient = (domain?: string, position?: string) => {
    const pos = (position || '').toLowerCase();
    if (pos.includes('chairman') || pos.includes('secretary') || pos.includes('vice')) {
      return 'from-blue-600 via-indigo-600 to-sky-500';
    }
    if (domain === 'tech' || pos.includes('tech')) {
      return 'from-cyan-500 via-blue-600 to-teal-500';
    }
    if (domain === 'design' || pos.includes('design') || pos.includes('edit')) {
      return 'from-pink-500 via-purple-600 to-rose-500';
    }
    if (domain === 'events' || pos.includes('event') || pos.includes('sponsor')) {
      return 'from-emerald-500 via-teal-600 to-green-600';
    }
    return 'from-blue-600 via-indigo-600 to-slate-800';
  };

  const facultyMember = SITE_CONFIG.coreMembers.find(m => m.domain === 'faculty');
  const studentMembers = SITE_CONFIG.coreMembers.filter(m => m.domain !== 'faculty');

  return (
    <section id="members" className="py-20 sm:py-28 bg-slate-50/70 text-brand-text relative overflow-hidden select-none">
      {/* Soft Ambient Light Glow Accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-100/70 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-100/70 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-brand-blue" />
            <span>IETE ISF Leadership 2025–2026</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-brand-navy tracking-tight"
          >
            ISF Office Bearers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            The dedicated faculty mentor and student office bearers driving technical excellence, hackathons, and research initiatives at RIT.
          </motion.p>
        </div>

        {/* Faculty Mentor Spotlight Card */}
        {facultyMember && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-soft-lg flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-brand-blue to-indigo-600" />

            {/* Avatar / Portrait Visual */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-700 text-white font-heading font-black text-3xl flex items-center justify-center shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-500">
                {facultyMember.photo ? (
                  <img src={facultyMember.photo} alt={facultyMember.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span>{getInitials(facultyMember.name)}</span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider shadow-sm">
                Mentor
              </div>
            </div>

            {/* Info Details */}
            <div className="text-center sm:text-left space-y-1.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{facultyMember.position}</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-brand-navy">
                {facultyMember.name}
              </h3>
              <p className="text-slate-500 text-sm font-semibold">
                {facultyMember.department}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed pt-1">
                "Guiding the next generation of engineers through hands-on experiential learning, multidisciplinary research, and professional chapter excellence."
              </p>
            </div>

            {/* LinkedIn Action */}
            <div className="shrink-0 flex flex-col items-center sm:items-end gap-2 pt-2 sm:pt-0">
              <a
                href={facultyMember.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(facultyMember.name + ' Rajalakshmi Institute of Technology')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-[#0A66C2] text-brand-blue hover:text-white border border-blue-200 hover:border-[#0A66C2] shadow-sm transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 fill-current" />
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </motion.div>
        )}

        {/* Student Office Bearers Grid */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-navy border-l-4 border-brand-blue pl-3">
              Student Executive Committee & Domain Leads
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {studentMembers.map((member, idx) => {
              const roleGradient = getRoleGradient(member.domain, member.position);
              const linkedinUrl = member.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.name + ' Rajalakshmi Institute of Technology IETE')}`;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group relative rounded-[28px] overflow-hidden bg-slate-950 border border-slate-800/90 shadow-soft-lg hover:shadow-[0_12px_35px_-5px_rgba(59,130,246,0.3)] hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between aspect-[3/4.4] min-h-[420px]"
                >
                  {/* Portrait Canvas */}
                  <div className="absolute inset-0 overflow-hidden">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      /* Clean Cyber Gradient Canvas for members without photo */
                      <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 relative flex flex-col items-center justify-center p-6 overflow-hidden">
                        {/* Dot pattern */}
                        <div 
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '18px 18px'
                          }}
                        />

                        {/* Central Monogram */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                            <div className={`w-full h-full rounded-[22px] bg-gradient-to-tr ${roleGradient} flex items-center justify-center shadow-inner`}>
                              <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider">
                                {getInitials(member.name)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subtle Top & Bottom Gradient Vignettes */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/40 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* TOP AREA: Empty to leave faces 100% unobstructed */}
                  <div className="relative z-20" />

                  {/* BOTTOM IDENTITY OVERLAY: Name, Role, Department & LinkedIn */}
                  <div className="relative z-20 p-4 sm:p-5 space-y-2.5">
                    {/* Name & Role */}
                    <div className="space-y-0.5">
                      <h4 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wider leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-cyan-200 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        {member.position}
                      </p>
                    </div>

                    {/* Department Badge & LinkedIn Button */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                      <span className="text-[11px] font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-sm truncate">
                        {member.department}
                      </span>
                      {linkedinUrl && (
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#0A66C2] text-sky-400 hover:text-white border border-white/15 backdrop-blur-md flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm hover:shadow-[0_0_12px_rgba(10,102,194,0.6)]"
                          title={`LinkedIn profile of ${member.name}`}
                        >
                          <Linkedin className="w-3.5 h-3.5 fill-current" />
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Note / Join Committee CTA */}
        <div className="text-center pt-6 border-t border-slate-200">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Interested in joining the IETE RIT Executive Committee or volunteering for upcoming symposiums?{' '}
            <a href="#contact" className="text-brand-blue hover:text-blue-800 font-bold underline decoration-blue-300 hover:decoration-blue-500 transition-colors">
              Get in touch with the leadership team &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
