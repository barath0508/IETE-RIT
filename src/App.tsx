import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionMission } from './components/VisionMission';
import { ActivitiesTimeline } from './components/ActivitiesTimeline';
import { UpcomingEvents } from './components/UpcomingEvents';
import { BlogSection } from './components/BlogSection';
import { BlogListPage } from './components/BlogListPage';
import { BlogPage } from './components/BlogPage';
import { Gallery } from './components/Gallery';
import { PhotoGlobe } from './components/PhotoGlobe';
import { CoreMembers } from './components/CoreMembers';
import { MembershipBenefits } from './components/MembershipBenefits';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { JoinModal } from './components/JoinModal';
import { BLOG_POSTS, BlogPost } from './data/blogData';

type RouteState =
  | { type: 'home' }
  | { type: 'blog_list' }
  | { type: 'blog_post'; slug: string };

function parseCurrentRoute(): RouteState {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Pathname check: /blog/:slug
  const pathMatch = pathname.match(/^\/blog\/([^/?#]+)/i);
  if (pathMatch && pathMatch[1]) {
    const raw = decodeURIComponent(pathMatch[1]);
    if (raw !== 'all' && raw !== 'list' && raw !== 'index') {
      return { type: 'blog_post', slug: raw };
    }
  }

  // 2. Search query check: ?blog=:slug
  const querySlug = searchParams.get('blog');
  if (querySlug) {
    if (querySlug === 'all' || querySlug === 'list') {
      return { type: 'blog_list' };
    }
    return { type: 'blog_post', slug: querySlug };
  }

  // 3. Hash check: #/blog/:slug or #blog-:slug
  const hashPathMatch = hash.match(/^#\/?blog\/([^/?#]+)/i);
  if (hashPathMatch && hashPathMatch[1]) {
    const raw = decodeURIComponent(hashPathMatch[1]);
    if (raw !== 'all' && raw !== 'list') {
      return { type: 'blog_post', slug: raw };
    }
  }

  const hashBlogMatch = hash.match(/^#blog-([^/?#]+)/i);
  if (hashBlogMatch && hashBlogMatch[1]) {
    const raw = decodeURIComponent(hashBlogMatch[1]);
    const found = BLOG_POSTS.find(
      (p) => p.slug === raw || p.id === `blog-${raw}` || p.id === raw
    );
    return { type: 'blog_post', slug: found ? found.slug : raw };
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
      <>
        <BlogPage
          post={activePost}
          onNavigateHome={() => handleNavigateHome()}
          onNavigateBlog={handleNavigateBlog}
          onSelectPost={handleSelectPost}
        />
        <JoinModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
        />
      </>
    );
  }

  // 2. Dedicated Full Blog Archive / Catalog Page View (/blog)
  if (currentRoute.type === 'blog_list' || (currentRoute.type === 'blog_post' && !activePost)) {
    return (
      <>
        <BlogListPage
          onNavigateHome={() => handleNavigateHome()}
          onSelectPost={handleSelectPost}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />
        <JoinModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
        />
      </>
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
        <PhotoGlobe />
        <Gallery />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer & Utilities */}
      <Footer />
      <ScrollToTop />

      {/* Interactive Membership Application Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}

export default App;
