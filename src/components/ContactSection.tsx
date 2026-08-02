import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2, User, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
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
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', department: '', subject: 'General Query', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
            Get In Touch
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
            Contact IETE Student Forum
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Have questions about upcoming workshops, events, or sponsorships? Drop us a message!
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
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <h3 className="font-heading font-bold text-xl text-brand-navy border-b border-slate-100 pb-3">
                Faculty & Chapter Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400">Faculty Coordinator</div>
                    <div className="font-semibold text-slate-800">{SITE_CONFIG.contact.facultyCoordinator}</div>
                    <div className="text-xs text-slate-500">{SITE_CONFIG.contact.department}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400">Official Email</div>
                    <a href={`mailto:${SITE_CONFIG.contact.facultyEmail}`} className="font-semibold text-brand-blue hover:underline">
                      {SITE_CONFIG.contact.facultyEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400">Phone & Desk Helpline</div>
                    <div className="font-semibold text-slate-800">{SITE_CONFIG.contact.facultyPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400">Office Room</div>
                    <div className="font-semibold text-slate-800">{SITE_CONFIG.contact.building}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-blue flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-slate-400">Campus Address</div>
                    <div className="text-xs text-slate-600 leading-relaxed">{SITE_CONFIG.contact.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Preview Card */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft h-56 relative group">
              <iframe
                title="College Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00123456789!2d80.234567!3d13.012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzQ0LjQiTiA4MMKwMTQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                <span>Knowledge City Campus</span>
                <ExternalLink className="w-3 h-3 text-brand-blue" />
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
            <div className="bg-brand-section rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
              <h3 className="font-heading font-bold text-2xl text-brand-navy mb-2">
                Send Us a Message
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                Fill out the details below and our student leads will respond within 24 hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Message Delivered!</strong> Thank you for reaching out to ISF. We will get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Department / College
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ECE / External College"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Event Inquiry">Event Registration Query</option>
                      <option value="Sponsorship">Sponsorship & Collaboration</option>
                      <option value="Membership Verification">Membership Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy text-white text-sm font-semibold shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
