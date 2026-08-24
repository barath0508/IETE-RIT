import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  Share2,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { BlogPost } from '../data/blogData';
import { BlurImage } from './BlurImage';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  if (!post) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/#blog-${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.subtitle,
          url: shareUrl
        });
      } catch {
        // Fallback copy
        navigator.clipboard.writeText(shareUrl);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Event Report Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-slate-200"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-blue uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Official Event Recap & Report</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-brand-navy transition-colors"
                title="Share Event Blog"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-brand-navy transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Hero Image & Metadata Header */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-900">
                <BlurImage
                  src={post.image}
                  blurHash={post.blurHash}
                  alt={post.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
                    {post.category}
                  </span>
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                    {post.title}
                  </h1>
                  <p className="text-slate-200 text-sm font-medium mt-1">
                    {post.subtitle}
                  </p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-bold text-brand-navy">{post.formattedDate}</div>
                    <div className="text-[11px] text-slate-500">Date</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-bold text-brand-navy">{post.time}</div>
                    <div className="text-[11px] text-slate-500">Time</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-bold text-brand-navy">{post.venue}</div>
                    <div className="text-[11px] text-slate-500">Venue</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-bold text-brand-navy">{post.participation.participants}</div>
                    <div className="text-[11px] text-slate-500">{post.participation.teams || "Total Attendance"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-blue" />
                <span>Executive Summary</span>
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                {post.summary}
              </p>
            </div>

            {/* Event Rounds (if applicable) */}
            {post.rounds && post.rounds.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-blue" />
                  <span>Competition Rounds Breakdown</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {post.rounds.map((round) => (
                    <div
                      key={round.roundNumber}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/60 shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-extrabold text-brand-blue uppercase tracking-wider">
                          Round {round.roundNumber}
                        </div>
                        <h3 className="font-heading font-bold text-base text-brand-navy mt-1">
                          {round.title}
                        </h3>
                        <div className="text-xs font-semibold text-slate-500 mb-2">
                          {round.subtitle}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {round.description}
                        </p>
                      </div>
                      {round.details && (
                        <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                          {round.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Topics / Workshop Modules (if applicable) */}
            {post.keyTopics && post.keyTopics.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-brand-blue" />
                  <span>Key Workshop Modules & Insights</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {post.keyTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resource Persons (if applicable) */}
            {post.resourcePersons && post.resourcePersons.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-blue" />
                  <span>Distinguished Resource Persons</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.resourcePersons.map((rp, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200"
                    >
                      <div className="font-heading font-bold text-base text-brand-navy">
                        {rp.name}
                      </div>
                      <div className="text-xs font-semibold text-brand-blue mt-0.5">
                        {rp.role}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {rp.designation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Winners & Champions Podium (if applicable) */}
            {post.winners && post.winners.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Winners & Champions</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.winners.map((w, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border shadow-sm ${
                        w.rank === 'Winner'
                          ? 'bg-amber-50/60 border-amber-300'
                          : 'bg-slate-100/70 border-slate-300'
                      }`}
                    >
                      <div className="font-heading font-bold text-sm text-amber-900 mb-3 flex items-center justify-between">
                        <span>{w.badge}</span>
                      </div>
                      <div className="space-y-2">
                        {w.members.map((m, mi) => (
                          <div key={mi} className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl text-xs">
                            <span className="font-bold text-brand-navy">{m.name}</span>
                            <span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md text-[10px]">
                              {m.class}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Report Paragraphs */}
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-brand-navy">
                Event Proceedings & Outcomes
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {post.fullReport.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Quote Banner */}
            {post.quote && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white text-center italic text-sm sm:text-base font-serif shadow-md border border-slate-800">
                "{post.quote}"
              </div>
            )}

            {/* Coordinators Credits */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <div className="font-bold text-brand-navy mb-2 uppercase tracking-wider text-[11px]">
                  Student Coordinators
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.studentCoordinators.map((sc, i) => (
                    <span key={i} className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 text-[11px]">
                      {sc.name} <span className="text-slate-400">({sc.class})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-brand-navy mb-2 uppercase tracking-wider text-[11px]">
                  Faculty Leadership & Mentorship
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.facultyCoordinators.map((fc, i) => (
                    <span key={i} className="bg-blue-50 text-brand-blue border border-blue-100 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                      {fc.name} — <span className="text-slate-600 font-normal">{fc.role}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
