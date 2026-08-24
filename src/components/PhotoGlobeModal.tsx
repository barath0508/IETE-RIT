import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Tag, ZoomIn, ZoomOut, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { Blurhash } from 'react-blurhash';
import { GalleryItem } from '../data/siteConfig';

interface PhotoGlobeModalProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

export const PhotoGlobeModal: React.FC<PhotoGlobeModalProps> = ({
  item,
  allItems,
  onClose,
  onSelectNext,
  onSelectPrev,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setZoomLevel(1);
    setIsImageLoaded(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectNext();
      if (e.key === 'ArrowLeft') onSelectPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onSelectNext, onSelectPrev]);

  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-950/85 backdrop-blur-xl">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl bg-slate-900/95 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 backdrop-blur-md transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Top: Main Image Viewport */}
          <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[520px]">
            {/* Background ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-transparent to-purple-600/10 pointer-events-none" />

            <div className="relative w-full h-full flex items-center justify-center p-4 overflow-auto min-h-[280px]">
              {/* BlurHash placeholder during loading */}
              {item.blurHash && !isImageLoaded && (
                <div className="absolute inset-6 z-0 flex items-center justify-center rounded-2xl overflow-hidden pointer-events-none max-w-2xl max-h-[65vh] mx-auto shadow-2xl">
                  <Blurhash
                    hash={item.blurHash}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={24}
                    punch={1}
                  />
                </div>
              )}

              <motion.img
                key={item.id}
                src={item.image}
                alt={item.title}
                onLoad={() => setIsImageLoaded(true)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isImageLoaded ? 1 : 0, scale: zoomLevel }}
                transition={{ duration: 0.25 }}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 select-none relative z-10"
              />
            </div>

            {/* Navigation Arrows */}
            {allItems.length > 1 && (
              <>
                <button
                  onClick={onSelectPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-brand-blue text-white flex items-center justify-center border border-slate-700/80 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95"
                  title="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={onSelectNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-brand-blue text-white flex items-center justify-center border border-slate-700/80 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95"
                  title="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Zoom Control Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/70 px-4 py-2 rounded-full text-slate-300 shadow-xl">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="p-1 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-semibold px-2 min-w-[48px] text-center text-slate-200">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-700 mx-1" />
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 hover:text-white transition-colors text-slate-400"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right / Bottom: Detailed Info */}
          <div className="w-full lg:w-96 p-6 sm:p-8 bg-slate-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-blue/20 text-brand-blue border border-brand-blue/30">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            {/* Bottom Actions & Globe Info */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                <span>IETE 3D Photo Sphere</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
