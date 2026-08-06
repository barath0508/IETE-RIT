import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Send, CheckCircle2, MessageSquare, ExternalLink, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG } from '../data/siteConfig';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subject: 'General Query',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // Fallback
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', department: '', subject: 'General Query', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200 shadow-sm mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
            <span>Get In Touch</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Contact IETE Student Forum
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Have questions about upcoming workshops, membership registration, or event sponsorships? Drop us a line!
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Details Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
              <h3 className="font-heading font-bold text-xl text-brand-navy border-b border-slate-200/80 pb-4">
                Faculty & Chapter Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Faculty Coordinator</div>
                    <div className="font-extrabold text-brand-navy text-sm mt-0.5">{SITE_CONFIG.contact.facultyCoordinator}</div>
                    <div className="text-xs text-slate-500 font-medium">{SITE_CONFIG.contact.department}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Email</div>
                    <a href={`mailto:${SITE_CONFIG.contact.facultyEmail}`} className="font-semibold text-brand-blue hover:underline text-xs sm:text-sm">
                      {SITE_CONFIG.contact.facultyEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Campus Location</div>
                    <div className="text-xs text-slate-600 leading-relaxed font-medium mt-0.5">{SITE_CONFIG.contact.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Preview Card */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft h-56 relative group">
              <iframe
                title="College Location Map"
                src={SITE_CONFIG.contact.googleMapEmbed}
                className="w-full h-full border-0 filter opacity-90 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-brand-navy shadow-md flex items-center gap-1.5">
                <span>RIT Campus Ground</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
              </div>
            </div>

          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft">
              <h3 className="font-heading font-extrabold text-2xl text-brand-navy mb-2">
                Send Us a Message
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Fill out the details below and our student executive team will respond within 24 hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Message Delivered!</strong> Thank you for reaching out to ISF. We will get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Department / College
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ECE / RIT"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Event Inquiry">Event Registration Query</option>
                      <option value="Sponsorship">Sponsorship & Collaboration</option>
                      <option value="Membership Verification">Membership Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-navy text-white text-xs font-extrabold tracking-wider uppercase shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

