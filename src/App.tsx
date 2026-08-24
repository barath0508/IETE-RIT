import React, { useState } from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionMission } from './components/VisionMission';
import { ActivitiesTimeline } from './components/ActivitiesTimeline';
import { UpcomingEvents } from './components/UpcomingEvents';
import { BlogSection } from './components/BlogSection';
import { Gallery } from './components/Gallery';
import { PhotoGlobe } from './components/PhotoGlobe';
import { CoreMembers } from './components/CoreMembers';
import { MembershipBenefits } from './components/MembershipBenefits';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { JoinModal } from './components/JoinModal';

export function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

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
        <BlogSection />
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

