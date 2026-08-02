import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = SITE_CONFIG.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Student Feedback
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            What Our Members Say
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Real stories from student members and alumni placed in top engineering organizations.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft-lg relative overflow-hidden"
            >
              <Quote className="w-16 h-16 text-brand-blue/10 absolute top-6 right-6" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                
                {/* Photo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-blue shadow-md">
                  <img
                    src={current.photo}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 text-center sm:text-left flex-1">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed">
                    "{current.quote}"
                  </p>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-brand-navy">
                      {current.name}
                    </h3>
                    <p className="text-xs text-brand-blue font-semibold">
                      {current.department}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {current.year}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-brand-blue' : 'w-2.5 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-brand-blue hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
