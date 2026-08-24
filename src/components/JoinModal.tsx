import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Sparkles, ExternalLink, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const joinLink = SITE_CONFIG.membershipLink || "https://chat.whatsapp.com/LFAeERPhyuVJq1W7oIxXbJ";

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white z-10">
            <div className="space-y-1.5 pr-2 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 inline-flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                {SITE_CONFIG.collegeCode} ISF Chapter
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-brand-navy">
                Join ISF Community
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Join our official WhatsApp group for instant announcements, event registrations, and student community discussions.
              </p>
            </div>

            {/* Top Right Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 space-y-3 text-left">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Official WhatsApp Community</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with fellow student members, office bearers, and mentors in our official WhatsApp group.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors shrink-0"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};



