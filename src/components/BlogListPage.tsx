import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Search,
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
  ArrowLeft,
  Home,
  ChevronRight,
  Filter,
  Layers,
  GraduationCap,
  Award
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { SITE_CONFIG } from '../data/siteConfig';
import { BlurImage } from './BlurImage';
import { SEO } from './SEO';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

interface BlogListPageProps {
  onNavigateHome: () => void;
  onSelectPost: (slug: string) => void;
  onOpenJoinModal?: () => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({
  onNavigateHome,
  onSelectPost,
  onOpenJoinModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  // Categories list
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
    return cats;
  }, []);

  // Filter and sort blog posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.venue.toLowerCase().includes(q) ||
        (post.keyTopics && post.keyTopics.some(t => t.toLowerCase().includes(q))) ||
        (post.resourcePersons && post.resourcePersons.some(rp => rp.name.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  // Featured post (latest flagship)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS[0];
  }, []);

  const pageUrl = `${window.location.origin}/blog`;

  return (
    <div className="min-h-screen bg-slate-50 text-brand-text font-body antialiased flex flex-col selection:bg-brand-blue selection:text-white">
      {/* Page-Specific SEO */}
      <SEO
        title="Event Reports, Workshops & Tech Symposiums | RIT IETE Student Forum"
        description="Explore comprehensive technical event reports, hackathon proceedings, hardware workshops, guest lectures, and student achievements from the IETE Student Forum at Rajalakshmi Institute of Technology."
        keywords="RIT IETE Blog, IETE Event Reports, Research Articulation Workshop, Silicon Maze 2026, Energize Hackathon, ECE Rajalakshmi Institute of Technology, Chennai Engineering Events, Technical Symposiums"
        canonicalUrl="https://iete-rit.vercel.app/blog"
        imageUrl={`https://iete-rit.vercel.app${featuredPost.image}`}
        imageAlt="RIT IETE Event Reports & Knowledge Hub"
        type="website"
        breadcrumbs={[
          { name: "Home", item: "https://iete-rit.vercel.app/#home" },
          { name: "Event Reports & Blog", item: "https://iete-rit.vercel.app/blog" }
        ]}
      />

      {/* Top Fixed Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-brand-blue transition-colors px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200/60"
            >
              <ArrowLeft className="w-4 h-4 text-brand-blue" />
              <span>Back to Home</span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">IETE Student Forum</span>
              <span>•</span>
              <span>Knowledge Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="flex items-center gap-2 group"
            >
              <img
                src={SITE_CONFIG.logos.collegeLogo}
                alt={SITE_CONFIG.collegeName}
                className="h-8 w-auto object-contain hidden md:block"
              />
              <img
                src={SITE_CONFIG.logos.ieteLogo}
                alt="IETE Student Forum Logo"
                className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </a>

            {onOpenJoinModal ? (
              <button
                onClick={onOpenJoinModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Join ISF</span>
              </button>
            ) : (
              <a
                href={SITE_CONFIG.membershipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
              >
                <span>Join ISF</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1 hover:text-brand-blue transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-brand-navy font-bold">Official Blog & Event Reports</span>
        </nav>

        {/* Hero Section Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-navy via-slate-900 to-brand-blue p-8 sm:p-12 text-white shadow-soft-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-accent">
              <Newspaper className="w-3.5 h-3.5" />
              <span>IETE Publications & Event Documentation</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl tracking-tight leading-tight">
              Event Recaps, Technical Articles & Proceedings
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Dive into comprehensive event reports, competition outcomes, hardware lab breakthroughs, and research methodologies published by the RIT IETE Student Forum.
            </p>

            {/* Quick Stats Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">{BLOG_POSTS.length} Published Reports</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-white/20" />
              <div>
                <span>Academic Year 2025–2026</span>
              </div>
              <div className="hidden sm:block h-3 w-px bg-white/20" />
              <div>
                <span>Department of ECE, RIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, topic, speaker, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider mr-1 shrink-0 text-[11px]">
              <Filter className="w-3 h-3" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => {
              const count = cat === 'All'
                ? BLOG_POSTS.length
                : BLOG_POSTS.filter(p => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Posts Grid / No Results */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-brand-navy">
              No matching reports found
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try searching for another topic or clear the search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold shadow-sm hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Banner Image */}
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPost(post.slug);
                    }}
                    className="block relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <BlurImage
                      src={post.image}
                      blurHash={post.blurHash}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Category & Read Time Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-brand-blue/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-medium border border-slate-700">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Date & Location Overlay */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white z-10 flex items-center justify-between gap-2 text-[11px] font-medium">
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3 h-3 text-brand-accent shrink-0" />
                        {post.formattedDate}
                      </span>
                      <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg truncate max-w-[140px]">
                        <MapPin className="w-3 h-3 text-brand-accent shrink-0" />
                        {post.venue.split(',')[0]}
                      </span>
                    </div>
                  </a>

                  {/* Card Body */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-blue uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>IETE ISF • RIT</span>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectPost(post.slug);
                      }}
                      className="block cursor-pointer"
                    >
                      <h3 className="font-heading font-black text-lg text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </a>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    {/* Key Metrics Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-brand-blue font-semibold border border-blue-100">
                        <Users className="w-3 h-3" />
                        {post.participation.participants.split(' ')[0]} Participants
                      </span>
                      {post.winners && post.winners.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                          <Trophy className="w-3 h-3" />
                          Winners Awarded
                        </span>
                      )}
                      {post.keyTopics && post.keyTopics.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                          <BookOpen className="w-3 h-3" />
                          {post.keyTopics.length} Topics
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPost(post.slug);
                    }}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-navy text-slate-700 group-hover:text-white font-bold text-xs transition-all duration-300 shadow-xs cursor-pointer"
                  >
                    <span>Read Full Report</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Bottom Membership CTA Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 rounded-3xl p-8 sm:p-10 border border-blue-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-brand-navy">
              Want to lead or present at the next IETE event?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
              Join the IETE Student Forum today to participate in national technical symposiums, research publications, hackathons, and hardware mentorship programmes.
            </p>
          </div>

          <a
            href={SITE_CONFIG.membershipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-xs sm:text-sm font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Become an ISF Member</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      {/* Footer & Scroll To Top */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};
