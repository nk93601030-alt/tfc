import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BmiCalculator from './components/BmiCalculator';
import BookingMatrix from './components/BookingMatrix';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPollachi from './components/AboutPollachi';
import { TESTIMONIALS, TFC_LOCATION } from './data';
import { ShieldAlert, CheckSquare, X, Heart, MessageSquare, Phone, Info, Award, User, Sparkles, Sliders, Palette, Check, Sun, Moon, Type, Image as LucideImage } from 'lucide-react';
import { initializeSecurity } from './utils/security';

export default function App() {
  React.useEffect(() => {
    // Initialize security measures on app load
    initializeSecurity();

    // Prevent browser scroll restoration glitch on load, always start clean from top
    if (typeof window !== 'undefined' && 'history' in window) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0 });
    document.documentElement.scrollTop = 0;
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, []);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('adaptive-gym');
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);
  const [trialName, setTrialName] = useState<string>('');
  const [trialPhone, setTrialPhone] = useState<string>('');
  const [trialProfile, setTrialProfile] = useState<string>('child');
  const [trialNote, setTrialNote] = useState<string>('');
  const [trialSuccess, setTrialSuccess] = useState<any | null>(null);

  // Stats Counters
  const stats = [
    { value: '4+', label: 'Coaches', desc: 'Pediatric & Senior physical experts' },
    { value: '25+', label: 'Custom Safe Gear', desc: 'Support vests, gantry rings & floaters' },
    { value: '100%', label: 'Accessible Layout', desc: 'Ramps, wide sliding entries & support bars' },
    { value: '4.9/5', label: 'Parent Review', desc: 'Based on 100+ happy Pollachi families' }
  ];

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialName || !trialPhone) return;

    const refNo = `TRIAL-${Math.floor(2000 + Math.random() * 8000)}`;
    const ticket = {
      name: trialName,
      phone: trialPhone,
      profile: trialProfile,
      notes: trialNote || 'None',
      refNo
    };

    setTrialSuccess(ticket);
    // Clear inputs
    setTrialName('');
    setTrialPhone('');
    setTrialNote('');
  };

  const getTrialWhatsAppLink = (t: any) => {
    const text = `Dear Together Fitness Centre (TFC) Team,

I have registered on your official website for a complimentary trial session. Kindly find my details below for verification and confirmation:

Candidate Name: ${t.name}
Contact Number: ${t.phone}
Target Program: ${t.profile.toUpperCase()}
Special Requirements: ${t.notes}
Registration Reference: ${t.refNo}

I respectfully request you to verify and confirm my trial appointment at your earliest convenience. Thank you for providing world-class rehabilitation services to our Pollachi community.

Warm regards`;
    return `https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Callback from Booking Matrix to open WhatsApp
  const handleBookingSuccess = () => {
    // We can show a celebratory float or keep quiet
  };

  const isDark = false;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden" id="main-app">

      {/* Page Transitions (fade + slide + blur) on main app mount */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {/* 1. Navbar Header */}
        <Header onBookTrialClick={() => setTrialModalOpen(true)} />

        {/* 2. Hero Presentation */}
        <Hero
          onExploreClick={() => scrollToSection('services')}
          onBookClick={() => scrollToSection('booking')}
        />

        {/* 2.5. Pollachi Roots/Origins Introduction */}
        <AboutPollachi />

        {/* 3. Aesthetic Interactive Stats Panel */}
        <section className="py-16 relative z-10 bg-white border-y border-slate-100/80" id="stats-section">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((st, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                key={i}
                className="text-center p-6 bg-slate-50/40 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 border border-transparent hover:border-slate-200/50 rounded-3xl md:border-r md:last:border-0 md:rounded-none transition-all duration-300"
                id={`stat-badge-${i}`}
              >
                <p className="text-4xl sm:text-5xl font-display font-extrabold leading-none text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent">{st.value}</p>
                <p className="text-xs font-black mt-3.5 uppercase tracking-wider text-slate-800">{st.label}</p>
                <p className="text-[10px] mt-1.5 text-slate-500 leading-normal font-medium">{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Services Explorer */}
        <Services onBookSlotClick={(serviceId) => {
          setSelectedServiceId(serviceId);
          scrollToSection('booking');
        }} />

        {/* 5. Smart Inclusive Index & Fitness Assessment (highly premium, matching requested scope beautifully) */}
        <BmiCalculator />

        {/* 6. Filterable Gallery and Lightbox */}
        <Gallery />

        {/* 7. Arena Booking Matrix Layout */}
        <BookingMatrix
          selectedServiceId={selectedServiceId}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 8. Testimonials Section */}
        <section id="testimonials" className={`py-20 border-t transition-colors duration-600 ${isDark ? 'bg-slate-900/30 border-slate-900' : 'bg-white border-slate-100'}`}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div className="text-center max-w-xl mx-auto mb-16 overflow-hidden">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded inline-block ${isDark ? 'bg-blue-950 text-blue-400 border border-blue-900/40' : 'bg-blue-50 text-blue-700'}`}
              >
                Verified Feedback
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-2xl md:text-3xl font-black mt-3 uppercase tracking-tight ${isDark ? 'text-white' : 'text-blue-950'}`}
              >
                What Pollachi Families Say
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`text-[12px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
              >
                Real reviews from parents, elders, and medical practitioners.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
                  }}
                  whileHover={{ y: -8, boxShadow: "0 20px 45px rgba(59, 130, 246, 0.08)", borderColor: "rgba(59, 130, 246, 0.2)" }}
                  className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6.5 text-left flex flex-col justify-between transition-all duration-300 h-full"
                  id={`testimonial-${t.id}`}
                >
                  <div>
                    <motion.div
                      className="flex gap-1 text-amber-500 text-xs mb-3.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {[...Array(t.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </motion.div>
                    <p className="text-[12px] leading-relaxed font-semibold italic text-slate-655 text-slate-650 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-100">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-slate-100/80 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-sm text-blue-950">{t.name}</p>
                      <p className="text-[9px] uppercase font-black tracking-widest mt-1 text-blue-600">{t.relation}</p>
                    </div>
                    <span className="text-xl bg-blue-50/50 w-8 h-8 rounded-full flex items-center justify-center border border-blue-100/30">💬</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Slogan banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 p-5 rounded-2xl text-center max-w-sm mx-auto flex items-center justify-center gap-3 bg-blue-50/60 border border-blue-100/65 text-blue-900 shadow-sm"
            >
              <Heart className="shrink-0 fill-blue-500 text-blue-600 animate-pulse" size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Over 100+ Pollachi homes healed since 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* 9. Contact Section with FAQ */}
        <Contact />

        {/* 10. Footer Section */}
        <Footer />
      </motion.div>

      {/* 11. Interactive Floating WhatsApp Button for Easy Reach */}
      <a
        href={`https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(
          "Hello Together Fitness Centre (TFC) Team,\n\nI visited your website and would like to receive more details about your training programs, operational timings, and fee structures. Thank you."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all text-xs border border-white/20"
        id="whatsapp-floating-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M20.52 3.48A10.92 10.92 0 0 0 12 1c-6.075 0-11 4.925-11 11 0 1.93.517 3.83 1.496 5.497L2 23l5.68-1.47A10.95 10.95 0 0 0 12 23c6.075 0 11-4.925 11-11 0-2.99-1.18-5.8-3.48-7.52z" fill="#fff" opacity="0.10"></path>
          <path d="M17.54 14.55c-.28-.14-1.65-.81-1.91-.9-.26-.09-.45-.13-.64.13-.18.26-.72.9-.88 1.09-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.66-1.55-1.93-.16-.27-.02-.42.12-.56.12-.12.28-.32.42-.48.14-.16.18-.26.28-.43.09-.17.04-.32-.02-.45-.06-.13-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.64 1.1 2.82.14.18 1.9 3 4.6 4.2 3.22 1.4 3.22.93 3.8.87.58-.06 1.88-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.28-.18-.56-.32z" fill="#fff"></path>
        </svg>
      </a>


      {/* 12. Book Trial Modal Overlay Sheet */}
      <AnimatePresence>
        {trialModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.8)' }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 25, scale: 0.95, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="bg-white rounded-[35px] w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200/50 text-left relative"
            >
              {/* Header */}
              <div className="bg-indigo-950 text-white p-6 relative">
                <button
                  onClick={() => {
                    setTrialModalOpen(false);
                    setTrialSuccess(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  id="trial-modal-close"
                >
                  <X size={15} />
                </button>
                <span className="text-[10px] bg-blue-600 text-white font-extrabold uppercase px-2 py-0.5 rounded tracking-widest inline-block mb-1">
                  Limited Opening
                </span>
                <h3 className="text-xl font-extrabold">Register Free Trial Day</h3>
                <p className="text-xs text-slate-300 mt-1">
                  1-on-1 session with our physical therapist block in Pollachi center.
                </p>
              </div>

              {/* Success / Form toggle */}
              {!trialSuccess ? (
                <form onSubmit={handleTrialSubmit} className="p-6 space-y-4">
                  {/* Visitor Name */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Attendee Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={trialName}
                      onChange={(e) => setTrialName(e.target.value)}
                      placeholder="e.g. Baby Dhanya or Senior Murugappan"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 rounded-xl text-xs font-bold"
                    />
                  </div>

                  {/* phone contact */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      WhatsApp Contact *
                    </label>
                    <input
                      type="tel"
                      required
                      value={trialPhone}
                      onChange={(e) => setTrialPhone(e.target.value)}
                      placeholder="e.g. +91 99945 xxxxx"
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 rounded-xl text-xs font-bold"
                    />
                  </div>

                  {/* profile selection */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Target Program / Age Group Category
                    </label>
                    <select
                      value={trialProfile}
                      onChange={(e) => setTrialProfile(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-blue-500"
                    >
                      <option value="child">👧 Pediatric Sensory development (Age 3-15)</option>
                      <option value="senior">🧓 Senior Wellness (Age 55+)</option>
                      <option value="adult">💪 Orthopedic Rehab (Post-Injury)</option>
                    </select>
                  </div>

                  {/* note */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Any accessibility requests (Optional)
                    </label>
                    <textarea
                      value={trialNote}
                      onChange={(e) => setTrialNote(e.target.value)}
                      rows={2}
                      placeholder="e.g. Wheelchair access needed, non-verbal autism..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 rounded-xl text-xs font-bold resize-none"
                    />
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2 text-blue-900 text-[10.5px] leading-relaxed">
                    <Info size={14} className="shrink-0 text-blue-600 mt-0.5" />
                    <span>Our coaches maintain a non-threatening 1-on-1 pace with zero force. Feel free to speak Tamil with us during your visit.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-md cursor-pointer text-center"
                    id="submit-trial-registration"
                  >
                    Confirm Trial Seat Block
                  </button>
                </form>
              ) : (
                /* Successful trial sheet card */
                <div className="p-6 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900 uppercase">Trial Reserved!</h4>
                    <p className="text-xs text-slate-500">We generated a safe trial pass for you.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <p className="text-slate-500">🔖 Ticket Code: <strong className="font-mono text-blue-600">{trialSuccess.refNo}</strong></p>
                    <p className="text-slate-700">👤 Participant: <strong>{trialSuccess.name}</strong></p>
                    <p className="text-slate-705 text-slate-650">👥 Category: {trialSuccess.profile.toUpperCase()}</p>
                    <p className="text-slate-705 text-slate-650">🛡️ Specifics: {trialSuccess.notes}</p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getTrialWhatsAppLink(trialSuccess)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl block text-center cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      Authenticate Trial over WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setTrialModalOpen(false);
                        setTrialSuccess(null);
                      }}
                      className="text-xs text-slate-400 hover:text-slate-650 font-bold hover:underline cursor-pointer"
                    >
                      Back to website
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
