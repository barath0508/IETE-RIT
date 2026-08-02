import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Calendar, Tag } from 'lucide-react';
import { SITE_CONFIG, GalleryItem } from '../data/siteConfig';
import { LightboxModal } from './LightboxModal';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Workshop', 'Seminar', 'Hackathon', 'Industrial Visit', 'Competition'];

  const filteredItems = activeCategory === 'All'
    ? SITE_CONFIG.gallery
    : SITE_CONFIG.gallery.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Event Gallery
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Moments & Key Milestones
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Glimpses into our past workshops, technical hackathons, industrial visits, and project expos.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-blue text-white shadow-soft scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover cursor-pointer bg-slate-900 border border-slate-100"
                onClick={() => {
                  const globalIdx = SITE_CONFIG.gallery.findIndex(g => g.id === item.id);
                  setLightboxIndex(globalIdx !== -1 ? globalIdx : 0);
                }}
              >
                {/* Image */}
                <div className="h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                </div>

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-blue/90 text-white px-2.5 py-1 rounded-md backdrop-blur-md">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Info */}
                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300 space-y-1">
                    <div className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                      <Calendar className="w-3 h-3 text-brand-accent" />
                      {item.date}
                    </div>
                    <h3 className="font-heading font-bold text-base text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No events found under this category.
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={SITE_CONFIG.gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
};
