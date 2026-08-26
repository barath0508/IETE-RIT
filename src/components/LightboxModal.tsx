import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { Blurhash } from 'react-blurhash';
import { GalleryItem } from '../data/siteConfig';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-2 sm:p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors shadow-lg"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image Container with Prev/Next buttons */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[220px] sm:min-h-[380px]">
            {currentItem.blurHash && !isLoaded && (
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <Blurhash
                  hash={currentItem.blurHash}
                  width="100%"
                  height="100%"
                  resolutionX={32}
                  resolutionY={24}
                  punch={1}
                />
              </div>
            )}

            <img
              src={currentItem.image}
              alt={currentItem.title}
              onLoad={() => setIsLoaded(true)}
              className={`max-h-[45vh] sm:max-h-[55vh] md:max-h-[70vh] w-full object-contain relative z-10 transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110 active:scale-95 shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Sidebar / Bottom Details Info */}
          <div className="w-full md:w-80 p-4 sm:p-6 bg-slate-900 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent bg-brand-blue/30 px-2.5 py-1 rounded-md border border-brand-blue/40 inline-flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {currentItem.category}
                </span>
                <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {currentItem.date}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white">
                {currentItem.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>{currentIndex + 1} of {items.length}</span>
              <span>IETE Past Events Archive</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
