import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, User, Mail, Hash, Phone, Cpu, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../data/siteConfig';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNo: '',
    phone: '',
    department: 'Electronics & Communication',
    year: '2nd Year',
    interests: [] as string[],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const interestOptions = [
    'Embedded Systems & IoT',
    'Robotics & Automation',
    'VLSI & ASIC Design',
    'AI / Machine Learning',
    'Signal & Image Processing',
    'Web & App Development',
    'Event Operations & PR'
  ];

  const handleInterestToggle = (item: string) => {
    if (formData.interests.includes(item)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, item] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="space-y-2 pr-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 inline-flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" />
                  {SITE_CONFIG.collegeCode} ISF Chapter
                </span>
                <h3 className="font-heading font-bold text-2xl text-brand-navy">
                  Join IETE Student Forum
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Become an active student member to access hardware labs, workshops, and IETE certification.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      College Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@student.college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      Roll Number / USN *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1EC22EC012"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                    >
                      <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                      <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                      <option value="Computer Science">Computer Science (CSE)</option>
                      <option value="Information Technology">Information Technology (IT)</option>
                      <option value="Robotics & Automation">Robotics & Automation</option>
                      <option value="Other Engineering">Other Engineering Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                {/* Interest Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Areas of Technical Interest (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((option) => {
                      const isSelected = formData.interests.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleInterestToggle(option)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-sm font-semibold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Membership Application
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-heading font-bold text-2xl text-slate-800">
                Welcome to ISF!
              </h3>

              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Congratulations, <strong className="text-slate-800">{formData.fullName}</strong>! Your application for ISF Membership has been submitted. Check <span className="text-brand-blue font-semibold">{formData.email}</span> for your member ID card and lab pass instructions.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                Close & Return
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
