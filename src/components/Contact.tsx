import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS, TFC_LOCATION } from '../data';
import { Phone, MapPin, Mail, Send, CheckCircle, ChevronDown, ChevronUp, Clock, HelpCircle, RefreshCw } from 'lucide-react';

interface LocalInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submittedInquiries, setSubmittedInquiries] = useState<LocalInquiry[]>([]);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load inquiries sent in current browser session
  useEffect(() => {
    const saved = localStorage.getItem('tfc_local_inquiries');
    if (saved) {
      try {
        setSubmittedInquiries(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    }
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);

    // Simulate network submission delay of 1 second for reactive feel
    setTimeout(() => {
      const newInquiry: LocalInquiry = {
        id: `${Date.now()}`,
        name,
        email: email || 'Not specified',
        message,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newInquiry, ...submittedInquiries];
      setSubmittedInquiries(updated);
      localStorage.setItem('tfc_local_inquiries', JSON.stringify(updated));

      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
      setSuccessMsg(true);

      // Auto dismiss check after 4 seconds
      setTimeout(() => setSuccessMsg(false), 4000);
    }, 1000);
  };

  const deleteInquiry = (id: string) => {
    const updated = submittedInquiries.filter(i => i.id !== id);
    setSubmittedInquiries(updated);
    localStorage.setItem('tfc_local_inquiries', JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto space-y-24 relative overflow-hidden" style={{contain: 'paint'}}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-0 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* 2-Column layout: info on the left, inquiry form on the right */}
      <div className="grid md:grid-cols-2 gap-14 items-start text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase font-black tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Easy Communication
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-blue-950 mt-5 tracking-tight italic leading-none"
          >
            Ready to
            <span className="text-transparent bg-clip-text block mt-2 not-italic font-black text-5xl md:text-6xl" style={{backgroundImage: 'linear-gradient(135deg, #2563eb, #6366f1)'}}>Connect?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 mt-4 font-semibold leading-relaxed"
          >
            Together Fitness Centre values transparency and care. Use the contact direct points below, or leave an inquiry. We respond immediately!
          </motion.p>

          <div className="space-y-5 mt-8">
            <div className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)'}}>
                📍
              </div>
              <div>
                <p className="font-extrabold text-xs text-blue-900 uppercase tracking-wider">TFC HOME (OUR LOCATION)</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {TFC_LOCATION.address}
                </p>
                <div className="mt-2">
                  <a 
                    href={`https://www.google.com/maps?q=${TFC_LOCATION.latitude},${TFC_LOCATION.longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    🗺️ Open TFC home on Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)'}}>
                📞
              </div>
              <div>
                <p className="font-extrabold text-xs text-blue-900 uppercase tracking-wider">HELPLINE CONTACTS</p>
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <a 
                      href={`tel:${TFC_LOCATION.phone.replace(/[\s\+]/g, '')}`} 
                      className="hover:text-white hover:bg-blue-600 transition-all whitespace-nowrap bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 font-bold text-xs"
                    >
                      {TFC_LOCATION.phone}
                    </a>
                    <span className="text-[10px] text-slate-500 font-semibold whitespace-nowrap">(Centre Director Office)</span>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)'}}>
                ✉️
              </div>
              <div>
                <p className="font-extrabold text-xs text-blue-900 uppercase tracking-wider">OFFICIAL EMAIL</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  <a href={`mailto:${TFC_LOCATION.email}`} className="hover:text-blue-600 transition-colors font-bold">
                    {TFC_LOCATION.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)'}}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)'}}>
                ⏰
              </div>
              <div>
                <p className="font-extrabold text-xs text-blue-900 uppercase tracking-wider">FACILITY HOURS</p>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Monday - Saturday: <strong className="text-blue-900">6:00 AM - 11:30 AM</strong> & <strong className="text-blue-900">4:00 PM - 9:00 PM</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Bilingual WhatsApp triggers */}
          <div className="mt-6 p-5 rounded-2xl border" style={{background: 'linear-gradient(135deg, rgba(240,253,244,0.9), rgba(236,253,245,0.7))', borderColor: 'rgba(134,239,172,0.4)', backdropFilter: 'blur(8px)'}}>
            <h4 className="text-xs font-black uppercase text-emerald-800 tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-sm">💬</span>
              <span>Direct WhatsApp Connect</span>
              <span className="text-[9px] bg-emerald-100 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-black tracking-wider">Fast Answer</span>
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Send a direct request on WhatsApp. Use our formal templates below:
            </p>
            <div className="flex gap-2.5 mt-4 flex-wrap">
              <a
                href={`https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Together Fitness Centre (TFC) Pollachi,\n\nI am contacting you from your website. I would like to inquire about the physical therapy, rehabilitation, and fitness training programs available at TFC."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg" style={{background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)'}}
              >
                <span>💬</span> Program Information
              </a>
              <a
                href={`https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Together Fitness Centre (TFC) Pollachi,\n\nI am contacting you from your website. I would like to request custom quote details and the pricing structure for training/rehab sessions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>💰</span> Inquire Fees & Pricing
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form panel */}
        <div className="p-8 md:p-10 rounded-[35px] relative" style={{background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(219,234,254,0.6)', boxShadow: '0 20px 60px rgba(59,130,246,0.08), 0 0 0 1px rgba(255,255,255,0.6)'}}>
          <h3 className="text-lg font-extrabold text-blue-950 mb-1 leading-none">Drop Us An Inquiry</h3>
          <p className="text-xs text-slate-500 mb-6 font-semibold">We will follow up with direct advice.</p>
          
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <input 
                type="text" 
                required
                disabled={isSubmitting}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="YOUR NAME *" 
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 font-bold text-xs"
                id="contact-name-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <input 
                type="email" 
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS (Optional)" 
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 font-bold text-xs"
                id="contact-email-input"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <textarea 
                rows={4} 
                required
                disabled={isSubmitting}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="MESSAGE / INQUIRY DETAILS (Optional specify if Child Care or Senior General) *" 
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 font-bold text-xs"
                id="contact-message-input"
              />
            </motion.div>

            <motion.button 
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 cursor-pointer ${
                isSubmitting ? 'opacity-85 cursor-wait' : ''
              }`}
              id="contact-submit"
            >
              {isSubmitting ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
              {isSubmitting ? 'Sending Request...' : 'Send Message'}
            </motion.button>
          </form>

          {/* Local Confirmation Banner alert */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute inset-x-6 bottom-6 bg-slate-900 text-white p-4 rounded-xl border border-emerald-500 flex items-center gap-3 text-xs text-left shadow-2xl z-20"
              >
                <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                <div>
                  <p className="font-extrabold">Inquiry Logged Locally!</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Thank you, we have saved your message below.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Local Submitted inquiries recap list */}
      {submittedInquiries.length > 0 && (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
          <h4 className="text-xs uppercase font-black text-slate-600 tracking-wider mb-4 flex items-center justify-between">
            <span>Sent Messages list stored locally ({submittedInquiries.length})</span>
            <span className="text-[9px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded">Active Session</span>
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {submittedInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-white p-4 rounded-xl border border-slate-150 relative text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-blue-900 block font-bold truncate pr-6">{inq.name}</strong>
                    <span className="text-[10px] text-slate-400 font-mono italic">{inq.createdAt}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2 font-semibold">Email: {inq.email}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    "{inq.message}"
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 italic font-medium">Auto-ready for manager contact</span>
                  <button 
                    onClick={() => deleteInquiry(inq.id)}
                    className="text-[9.5px] text-slate-400 hover:text-red-500 hover:underline font-bold cursor-pointer transition-colors"
                  >
                    Remove Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2.5 INTERACTIVE GOOGLE MAPS SECTION */}
      <div className="pt-12 border-t border-slate-155 text-left">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl mx-auto mb-3 border border-blue-100 animate-pulse">
            🗺️
          </div>
          <h3 className="text-2xl font-black text-blue-950">Find Us On Google Maps</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Locate <strong className="text-blue-900">ground 🏃🏻, TFC home</strong> in Vinayaga garden, Pollachi. Get real-time directions with a single click.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden grid md:grid-cols-12 max-w-4xl mx-auto" style={{background: 'white', border: '1px solid rgba(219,234,254,0.8)', boxShadow: '0 20px 60px rgba(59,130,246,0.1), 0 0 0 1px rgba(255,255,255,0.8)'}}>
          {/* Map display */}
          <div className="md:col-span-8 h-[360px] md:h-[420px] relative bg-slate-100">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${TFC_LOCATION.longitude}!3d${TFC_LOCATION.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749637200000`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TFC HOME Google Map"
              id="tfc-interactive-google-map"
            ></iframe>
          </div>

          {/* Quick info block & directions */}
          <div className="md:col-span-4 p-6 flex flex-col justify-between bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-200/80">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                  Location Verified
                </span>
                <h4 className="font-extrabold text-blue-950 text-base mt-3 leading-tight">
                  ground 🏃🏻, TFC home
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                  Pollachi Wellness Hub
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-150/80 text-xs text-slate-700 leading-relaxed space-y-2">
                <p className="font-medium text-slate-655 font-bold">
                  📍 {TFC_LOCATION.address}
                </p>
                <div className="h-px bg-slate-100 my-2" />
                <p className="text-[10px] text-slate-500">
                  💡 <span className="font-semibold text-slate-600">Note:</span> Newly registered location on Google Maps! Listed officially as <span className="font-bold text-slate-700">TFC home</span>.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-6 md:pt-0">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${TFC_LOCATION.latitude},${TFC_LOCATION.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                🗺️ Get Directions 
              </a>
              <a 
                href={`https://www.google.com/maps?q=${TFC_LOCATION.latitude},${TFC_LOCATION.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                📱 Open In Maps App
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SCIENTIFIC REHAB FAQS */}
      <div className="pt-12 border-t border-slate-100 text-left">
        <div className="text-center max-w-xl mx-auto mb-10">
          <HelpCircle size={32} className="mx-auto text-blue-600" />
          <h3 className="text-2xl font-black text-blue-950 mt-3">FAQ & Quality Guidelines</h3>
          <p className="text-xs text-slate-550 mt-1">Frequently asked wellness questions by Pollachi families.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = faqOpenIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-blue-200 transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-sm text-blue-950 gap-4 cursor-pointer focus:outline-none"
                  id={`faq-toggle-${idx}`}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-blue-600" /> : <ChevronDown size={16} />}
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
