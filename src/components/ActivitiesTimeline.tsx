import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Trophy,
  GraduationCap,
  Zap,
  Globe,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG, MilestoneItem } from '../data/siteConfig';

interface ActivitiesTimelineProps {
  onSelectPost?: (slug: string) => void;
}

export const ActivitiesTimeline: React.FC<ActivitiesTimelineProps> = ({ onSelectPost }) => {
  const milestones = SITE_CONFIG.milestones;

  const getMilestoneIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-brand-blue" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-indigo-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-blue" />;
    }
  };

  const getCategoryBadgeStyles = (category: string) => {
    switch (category) {
      case 'Workshop':
        return 'text-brand-blue bg-blue-50 border-blue-200';
      case 'Competition':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Seminar':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Hackathon':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Inauguration':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      default:
        return 'text-brand-blue bg-blue-50 border-blue-200';
    }
  };

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    if (onSelectPost) {
      e.preventDefault();
      onSelectPost(slug);
    }
  };

  return (
    <section id="activities" className="py-20 bg-slate-50/70 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>Event Milestones & History</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Key Milestones & Journey
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            A chronological journey of technical competitions, hands-on workshops, hackathons, and guest seminars hosted by RIT IETE.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Central Line for Large Screens */}
          <div className="hidden lg:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-blue via-sky-400 to-indigo-600 opacity-30" />

          <div className="space-y-8 lg:space-y-12">
            {milestones.map((milestone: MilestoneItem, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Card Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-blue/40 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">
                      
                      {/* Top Accent Gradient Bar on Hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-sky-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Top Category Badge & Date Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${getCategoryBadgeStyles(milestone.category)}`}>
                            {milestone.category}
                          </span>
                          
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/70 shadow-2xs">
                            <Calendar className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                            <span>{milestone.formattedDate}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <a
                          href={`/blog/${milestone.slug}`}
                          onClick={(e) => handleCardClick(e, milestone.slug)}
                          className="block group/link"
                        >
                          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-brand-navy group-hover/link:text-brand-blue transition-colors leading-snug">
                            {milestone.title}
                          </h3>
                        </a>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                          {milestone.description}
                        </p>

                        {/* Meta Tags: Venue & Participants */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                          {milestone.venue && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                              <MapPin className="w-3 h-3 text-brand-blue shrink-0" />
                              <span className="truncate max-w-[180px]">{milestone.venue}</span>
                            </span>
                          )}
                          {milestone.participants && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                              <Users className="w-3 h-3 text-brand-blue shrink-0" />
                              <span>{milestone.participants}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Link */}
                      <div className="mt-4 pt-2">
                        <a
                          href={`/blog/${milestone.slug}`}
                          onClick={(e) => handleCardClick(e, milestone.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Read Full Event Report</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>

                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden lg:flex items-center justify-center shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue shadow-md z-10 font-bold group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    {getMilestoneIcon(milestone.iconName, milestone.category)}
                  </div>

                  {/* Empty Spacer Column for layout symmetry */}
                  <div className="hidden lg:block w-1/2" />

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
