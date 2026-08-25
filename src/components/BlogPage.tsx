import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
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
  GraduationCap,
  ChevronRight,
  Home,
  MessageCircle,
  Linkedin,
  Twitter,
  Copy,
  Crown
} from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/blogData';
import { SITE_CONFIG } from '../data/siteConfig';
import { BlurImage } from './BlurImage';
import { SEO } from './SEO';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

interface BlogPageProps {
  post: BlogPost;
  onNavigateHome: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  post,
  onNavigateHome,
  onSelectPost
}) => {
  // Scroll to top on mount or when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [post.slug]);

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Event report link copied to clipboard!');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${post.title}*\n${post.subtitle}\n\nRead the full event report: ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${post.title} — RIT IETE Student Forum`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <div className="min-h-screen bg-slate-50 text-brand-text font-body antialiased flex flex-col selection:bg-brand-blue selection:text-white">
      {/* Dynamic SEO for this specific blog page */}
      <SEO
        title={`${post.title.replace(/^[^\w\s]+/, '').trim()} | RIT IETE`}
        description={post.summary}
        canonicalUrl={shareUrl}
        imageUrl={`${window.location.origin}${post.image}`}
      />

      {/* Top Fixed Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand-blue transition-colors px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200/60"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="flex items-center gap-2"
            >
              <img
                src={SITE_CONFIG.logos.collegeLogo}
                alt={SITE_CONFIG.collegeName}
                className="h-8 w-auto object-contain hidden sm:block"
              />
              <img
                src={SITE_CONFIG.logos.ieteLogo}
                alt="IETE Logo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <span className="font-heading font-black text-sm text-brand-navy hidden md:inline">
                RIT IETE
              </span>
            </a>

            <a
              href={SITE_CONFIG.membershipLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
            >
              <span>Join ISF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Blog Article Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1 hover:text-brand-blue transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={onNavigateHome}
            className="hover:text-brand-blue transition-colors"
          >
            Blog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-brand-navy font-semibold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Article Header & Cover Hero */}
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Category & Read Time Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-brand-blue text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {post.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
                {post.readTime}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-brand-blue font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Chapter Event Report</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-brand-navy leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed">
              {post.subtitle}
            </p>
          </div>

          {/* Social Share & Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-semibold text-brand-navy">{post.formattedDate}</span>
              <span className="text-slate-300">•</span>
              <Clock className="w-4 h-4 text-brand-blue shrink-0" />
              <span>{post.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] hidden sm:inline">
                Share:
              </span>
              <button
                onClick={handleShareWhatsApp}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareTwitter}
                className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
                <span className="text-[11px] font-semibold hidden sm:inline">Copy Link</span>
              </button>
            </div>
          </div>

          {/* Featured Image Banner */}
          <div className="relative h-72 sm:h-96 md:h-[480px] w-full rounded-3xl overflow-hidden shadow-soft-lg bg-slate-900 border border-slate-200">
            <BlurImage
              src={post.image}
              blurHash={post.blurHash}
              alt={post.title}
              className="w-full h-full object-contain sm:object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                {post.venue}
              </span>
              <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl">
                <Users className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                {post.participation.participants} ({post.participation.departments})
              </span>
            </div>
          </div>

          {/* Event Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-soft text-xs">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</div>
              <div className="font-bold text-brand-navy text-sm mt-0.5">{post.formattedDate}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timing</div>
              <div className="font-bold text-brand-navy text-sm mt-0.5">{post.time}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Venue</div>
              <div className="font-bold text-brand-navy text-sm mt-0.5 truncate">{post.venue}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance</div>
              <div className="font-bold text-brand-navy text-sm mt-0.5">{post.participation.participants}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-3">
            <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-blue" />
              <span>Executive Summary</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              {post.summary}
            </p>
          </div>

          {/* Key Topics / Workshop Modules (if applicable) */}
          {post.keyTopics && post.keyTopics.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-blue" />
                <span>Core Modules & Key Insights</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.keyTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-blue text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competition Rounds (if applicable) */}
          {post.rounds && post.rounds.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-blue" />
                <span>Competition Rounds Breakdown</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.rounds.map((round) => (
                  <div
                    key={round.roundNumber}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue/60 shadow-sm transition-all flex flex-col justify-between"
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
                      <ul className="space-y-1.5 pt-3 border-t border-slate-200/60 text-[11px] text-slate-600">
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

          {/* Resource Persons (if applicable) */}
          {post.resourcePersons && post.resourcePersons.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-blue" />
                <span>Distinguished Resource Persons</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.resourcePersons.map((rp, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200"
                  >
                    <div className="font-heading font-bold text-base text-brand-navy">
                      {rp.name}
                    </div>
                    <div className="text-xs font-semibold text-brand-blue mt-0.5">
                      {rp.role}
                    </div>
                    <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {rp.designation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Winners Podium (if applicable) */}
          {post.winners && post.winners.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
              <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
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
                        <div key={mi} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl text-xs shadow-sm">
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

          {/* Office Bearers Investiture Postings (if applicable) */}
          {post.officeBearers && post.officeBearers.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-xl text-brand-navy flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>Installed Student Office Bearers & Portfolios</span>
                </h2>
                <span className="text-xs font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hidden sm:inline">
                  Official Investiture 2026
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {post.officeBearers.map((ob, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/50 hover:bg-blue-50/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-blue bg-white px-2.5 py-0.5 rounded-full border border-blue-100 inline-block mb-1.5 shadow-2xs">
                        {ob.position}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-brand-navy">
                        {ob.name}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span className="text-brand-blue font-bold">{ob.department}</span>
                      <span>Year {ob.year} • Sec {ob.section}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Proceedings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <h2 className="font-heading font-bold text-xl text-brand-navy">
              Event Proceedings & Outcomes
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {post.fullReport.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Quote Callout */}
          {post.quote && (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy text-white text-center italic text-base sm:text-lg font-serif shadow-lg border border-slate-800 leading-relaxed">
              "{post.quote}"
            </div>
          )}

          {/* Coordinators & Mentors Credits */}
          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft grid grid-cols-1 ${post.studentCoordinators && post.studentCoordinators.length > 0 ? 'sm:grid-cols-2' : ''} gap-6 text-xs`}>
            {post.studentCoordinators && post.studentCoordinators.length > 0 && (
              <div>
                <div className="font-bold text-brand-navy mb-2.5 uppercase tracking-wider text-[11px]">
                  Student Coordinators
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.studentCoordinators.map((sc, i) => (
                    <span key={i} className="bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700 text-xs">
                      {sc.name} <span className="text-slate-400">({sc.class})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="font-bold text-brand-navy mb-2.5 uppercase tracking-wider text-[11px]">
                Faculty Leadership & Mentorship
              </div>
              <div className="flex flex-wrap gap-2">
                {post.facultyCoordinators.map((fc, i) => (
                  <span key={i} className="bg-blue-50 text-brand-blue border border-blue-100 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    {fc.name} — <span className="text-slate-600 font-normal">{fc.role}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Other Recent Event Reports Carousel / Grid */}
        {otherPosts.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-brand-navy">
                  More Event Reports & Articles
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Explore other recent technical milestones by RIT IETE
                </p>
              </div>
              <button
                onClick={onNavigateHome}
                className="text-xs font-bold text-brand-blue hover:underline hidden sm:inline"
              >
                View All Events →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.slice(0, 2).map((other) => (
                <button
                  key={other.id}
                  onClick={() => onSelectPost(other.slug)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/50 hover:shadow-card-hover transition-all text-left group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                      {other.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                      {other.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {other.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-brand-blue flex items-center justify-between">
                    <span>{other.formattedDate}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Read Report →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer & Scroll to Top */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};
