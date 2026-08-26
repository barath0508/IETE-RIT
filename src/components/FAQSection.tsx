import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(SITE_CONFIG.faqs[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = SITE_CONFIG.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faqs" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-blue" />
            <span>Got Questions?</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Everything you need to know about joining ISF, membership validity, workshops, and student benefits.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords (e.g. fee, eligibility, certificate)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 shadow-soft transition-all"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none group"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-brand-navy flex items-center gap-2.5 sm:gap-3 group-hover:text-brand-blue transition-colors">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue shrink-0" />
                    {faq.question}
                  </span>

                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-brand-blue' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

