import React, { useState, useEffect, useMemo } from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionMission } from './components/VisionMission';
import { ActivitiesTimeline } from './components/ActivitiesTimeline';
import { UpcomingEvents } from './components/UpcomingEvents';
import { BlogSection } from './components/BlogSection';
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

function getBlogSlugFromUrl(): string | null {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Pathname check: /blog/:slug
  const pathMatch = pathname.match(/^\/blog\/([^/?#]+)/i);
  if (pathMatch && pathMatch[1]) {
    return decodeURIComponent(pathMatch[1]);
  }

  // 2. Search query check: ?blog=:slug
  const querySlug = searchParams.get('blog');
  if (querySlug) {
    return querySlug;
  }

  // 3. Hash check: #/blog/:slug or #blog-:slug
  const hashPathMatch = hash.match(/^#\/?blog\/([^/?#]+)/i);
  if (hashPathMatch && hashPathMatch[1]) {
    return decodeURIComponent(hashPathMatch[1]);
  }

  const hashBlogMatch = hash.match(/^#blog-([^/?#]+)/i);
  if (hashBlogMatch && hashBlogMatch[1]) {
    const raw = decodeURIComponent(hashBlogMatch[1]);
    // Match by slug or id
    const found = BLOG_POSTS.find(p => p.slug === raw || p.id === `blog-${raw}` || p.id === raw);
    if (found) return found.slug;
    return raw;
  }

  return null;
}

export function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(() => getBlogSlugFromUrl());

  // Listen to popstate (back/forward) & hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const slug = getBlogSlugFromUrl();
      setCurrentBlogSlug(slug);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const activePost: BlogPost | undefined = useMemo(() => {
    if (!currentBlogSlug) return undefined;
    return BLOG_POSTS.find(
      (p) => p.slug === currentBlogSlug || p.id === currentBlogSlug || p.id === `blog-${currentBlogSlug}`
    );
  }, [currentBlogSlug]);

  const handleSelectPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    window.history.pushState(null, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentBlogSlug(null);
    window.history.pushState(null, '', '/#blog');
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      const navOffset = 80;
      const elementPosition = blogSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If viewing a separate blog page
  if (activePost) {
    return (
      <BlogPage
        post={activePost}
        onNavigateHome={handleNavigateHome}
        onSelectPost={handleSelectPost}
      />
    );
  }

  // Otherwise render full homepage
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
        <ActivitiesTimeline />
        <UpcomingEvents />
        <BlogSection onSelectPost={handleSelectPost} />
        <Gallery />
        <PhotoGlobe />
        <CoreMembers />
        <MembershipBenefits />
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
