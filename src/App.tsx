import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionMission } from './components/VisionMission';
import { ActivitiesTimeline } from './components/ActivitiesTimeline';
import { UpcomingEvents } from './components/UpcomingEvents';
import { BlogSection } from './components/BlogSection';
import { Gallery } from './components/Gallery';
import { CoreMembers } from './components/CoreMembers';
import { MembershipBenefits } from './components/MembershipBenefits';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SITE_CONFIG } from './data/siteConfig';
import { BLOG_POSTS, BlogPost } from './data/blogData';

// Code-split heavy interactive 3D, blog catalog, and modals to reduce initial mobile JS bundle by >550 kB
const PhotoGlobe = lazy(() => import('./components/PhotoGlobe').then(m => ({ default: m.PhotoGlobe })));
const BlogListPage = lazy(() => import('./components/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const JoinModal = lazy(() => import('./components/JoinModal').then(m => ({ default: m.JoinModal })));
const EventAnnouncementModal = lazy(() => import('./components/EventAnnouncementModal').then(m => ({ default: m.EventAnnouncementModal })));

const PhotoGlobeSkeleton = () => (
  <section className="py-20 bg-slate-950 text-white relative overflow-hidden select-none">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="max-w-3xl mx-auto mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/60 shadow-lg mb-3">
          <span>Interactive 3D Experience</span>
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          IETE 3D Memory Globe
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Loading 3D Memory Globe...
        </p>
      </div>
      <div className="w-full h-[380px] xs:h-[460px] sm:h-[620px] lg:h-[700px] rounded-3xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Loading interactive 3D sphere...</span>
        </div>
      </div>
    </div>
  </section>
);

type RouteState =
  | { type: 'home' }
  | { type: 'blog_list' }
  | { type: 'blog_post'; slug: string };

const SLUG_ALIASES: Record<string, string> = {
  'research-articulation-ideas-to-publication': 'research-articulation-workshop',
  'silicon-maze-2026-technical-quiz': 'silicon-maze-2026',
  'guest-lecture-digital-twin-of-everything': 'digital-twin-of-everything',
  'digital-twin': 'digital-twin-of-everything',
  'iete-professional-society-inauguration': 'iete-inauguration-2026',
  'inauguration-2026': 'iete-inauguration-2026',
  'higher-ed-pathways': 'higher-education-opportunities-career-pathways',
  'higher-education': 'higher-education-opportunities-career-pathways',
  'energize-2026': 'energize-2026-hackathon',
  'vision-of-skill': 'vision-of-skill-2026',
};

function normalizeSlug(rawSlug: string): string {
  const clean = rawSlug.trim().toLowerCase();
  return SLUG_ALIASES[clean] || clean;
}

function parseCurrentRoute(): RouteState {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Pathname check: /blog/:slug
  const pathMatch = pathname.match(/^\/blog\/([^/?#]+)/i);
  if (pathMatch && pathMatch[1]) {
    const raw = decodeURIComponent(pathMatch[1]);
    if (raw !== 'all' && raw !== 'list' && raw !== 'index') {
      return { type: 'blog_post', slug: normalizeSlug(raw) };
    }
  }

  // 2. Search query check: ?blog=:slug
  const querySlug = searchParams.get('blog');
  if (querySlug) {
    if (querySlug === 'all' || querySlug === 'list') {
      return { type: 'blog_list' };
    }
    return { type: 'blog_post', slug: normalizeSlug(querySlug) };
  }

  // 3. Hash check: #/blog/:slug or #blog-:slug
  const hashPathMatch = hash.match(/^#\/?blog\/([^/?#]+)/i);
  if (hashPathMatch && hashPathMatch[1]) {
    const raw = decodeURIComponent(hashPathMatch[1]);
    if (raw !== 'all' && raw !== 'list') {
      return { type: 'blog_post', slug: normalizeSlug(raw) };
    }
  }

  const hashBlogMatch = hash.match(/^#blog-([^/?#]+)/i);
  if (hashBlogMatch && hashBlogMatch[1]) {
    const raw = decodeURIComponent(hashBlogMatch[1]);
    const normalized = normalizeSlug(raw);
    const found = BLOG_POSTS.find(
      (p) => p.slug === normalized || p.slug === raw || p.id === `blog-${raw}` || p.id === raw
    );
    return { type: 'blog_post', slug: found ? found.slug : normalized };
  }

  // 4. Check dedicated Blog List catalog URL: /blog, /blogs, #blogs, #blog-list
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  if (
    cleanPath === '/blog' ||
    cleanPath === '/blogs' ||
    hash === '#blogs' ||
    hash === '#blog-list' ||
    hash === '#/blog' ||
    hash === '#/blogs'
  ) {
    return { type: 'blog_list' };
  }

  // 5. Default to Home
  return { type: 'home' };
}

export function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => parseCurrentRoute());

  // Listen to browser Back/Forward (popstate) & hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentRoute();
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Find active blog post if route is blog_post
  const activePost: BlogPost | undefined = useMemo(() => {
    if (currentRoute.type !== 'blog_post') return undefined;
    const slug = currentRoute.slug;
    return BLOG_POSTS.find(
      (p) => p.slug === slug || p.id === slug || p.id === `blog-${slug}`
    );
  }, [currentRoute]);

  // Navigation handlers
  const handleSelectPost = useCallback((slug: string) => {
    setCurrentRoute({ type: 'blog_post', slug });
    window.history.pushState(null, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleNavigateBlog = useCallback(() => {
    setCurrentRoute({ type: 'blog_list' });
    window.history.pushState(null, '', '/blog');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleNavigateHome = useCallback((scrollSectionId?: string) => {
    setCurrentRoute({ type: 'home' });
    const targetHash = scrollSectionId ? `#${scrollSectionId}` : '';
    window.history.pushState(null, '', `/${targetHash}`);

    if (scrollSectionId) {
      setTimeout(() => {
        const el = document.getElementById(scrollSectionId);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // 1. Single Blog Post Detail Page View
  if (currentRoute.type === 'blog_post' && activePost) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading article...</div>}>
        <BlogPage
          post={activePost}
          onNavigateHome={() => handleNavigateHome()}
          onNavigateBlog={handleNavigateBlog}
          onSelectPost={handleSelectPost}
        />
        {isJoinModalOpen && (
          <JoinModal
            isOpen={isJoinModalOpen}
            onClose={() => setIsJoinModalOpen(false)}
          />
        )}
      </Suspense>
    );
  }

  // 2. Dedicated Full Blog Archive / Catalog Page View (/blog)
  if (currentRoute.type === 'blog_list' || (currentRoute.type === 'blog_post' && !activePost)) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700">Loading catalog...</div>}>
        <BlogListPage
          onNavigateHome={() => handleNavigateHome()}
          onSelectPost={handleSelectPost}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />
        {isJoinModalOpen && (
          <JoinModal
            isOpen={isJoinModalOpen}
            onClose={() => setIsJoinModalOpen(false)}
          />
        )}
      </Suspense>
    );
  }

  // 3. Full Homepage View
  return (
    <div className="min-h-screen bg-white text-brand-text font-body antialiased flex flex-col selection:bg-brand-blue selection:text-white overflow-x-hidden">
      {/* High-Level SEO Injection */}
      <SEO />

      {/* Navigation */}
      <Navbar onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        <About />
        <VisionMission />
        <MembershipBenefits />
        <CoreMembers />
        <UpcomingEvents />
        <ActivitiesTimeline onSelectPost={handleSelectPost} />
        <BlogSection
          onSelectPost={handleSelectPost}
          onNavigateBlog={handleNavigateBlog}
        />
        <Suspense fallback={<PhotoGlobeSkeleton />}>
          <PhotoGlobe />
        </Suspense>
        <Gallery />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer & Utilities */}
      <Footer />
      <ScrollToTop />

      {/* Interactive Membership Application Modal */}
      {isJoinModalOpen && (
        <Suspense fallback={null}>
          <JoinModal
            isOpen={isJoinModalOpen}
            onClose={() => setIsJoinModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Flagship Event Announcement Pop-up on Website Open */}
      <Suspense fallback={null}>
        <EventAnnouncementModal
          event={SITE_CONFIG.upcomingEvents && SITE_CONFIG.upcomingEvents.length > 0 ? SITE_CONFIG.upcomingEvents[0] : null}
          onExploreEvents={() => handleNavigateHome('events')}
        />
      </Suspense>
    </div>
  );
}

export default App;
