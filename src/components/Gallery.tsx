import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Calendar, Image as ImageIcon } from 'lucide-react';
import { SITE_CONFIG, GalleryItem } from '../data/siteConfig';
import { LightboxModal } from './LightboxModal';
import { BlurImage } from './BlurImage';

export const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = SITE_CONFIG.gallery;

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-brand-blue" />
            <span>Event Archive</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Moments & Key Milestones
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Glimpses into our past workshops, technical hackathons, guest seminars, and project expos.
          </p>
        </div>

        {/* Masonry / Grid Gallery */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item, idx) => (
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
                  <BlurImage
                    src={item.image}
                    blurHash={item.blurHash}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                </div>

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-blue/90 text-white px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Info */}
                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] text-brand-accent font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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

