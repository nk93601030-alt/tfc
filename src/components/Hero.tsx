import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Flame, Trophy, Heart, MapPin, CheckCircle, Video, X } from 'lucide-react';
import { TFC_LOCATION } from '../data';

interface HeroProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export default function Hero({ onExploreClick, onBookClick }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Floating particles mock data
  const particles = [
    { id: 1, size: 'w-2 h-2', top: '15%', left: '10%', duration: 15, delay: 0 },
    { id: 2, size: 'w-3 h-3', top: '25%', left: '80%', duration: 18, delay: 2 },
    { id: 3, size: 'w-1.5 h-1.5', top: '70%', left: '15%', duration: 12, delay: 1 },
    { id: 4, size: 'w-4 h-4', top: '65%', left: '75%', duration: 22, delay: 3 },
    { id: 5, size: 'w-2 h-2', top: '40%', left: '50%', duration: 16, delay: 4 },
    { id: 6, size: 'w-2.5 h-2.5', top: '80%', left: '45%', duration: 20, delay: 5 },
  ];

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <section id="home" className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Dynamic Background Particles (low opacity) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`${p.size} rounded-full bg-blue-400/10 absolute`}
            style={{ top: p.top, left: p.left }}
            animate={{
              y: [0, -35, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Layered glows for designer depth */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-[45%] right-[25%] w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Text Content */}
        <div className="md:col-span-7 space-y-6 text-left">
          <motion.a 
            href={`https://www.google.com/maps?q=${TFC_LOCATION.latitude},${TFC_LOCATION.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeOutExpo }}
            className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-blue-400 hover:text-blue-300 transition-all font-extrabold text-xs px-4.5 py-2.5 rounded-full uppercase tracking-wider border border-slate-800/80 shadow-lg cursor-pointer"
          >
            <MapPin size={14} className="text-blue-500 animate-bounce" />
            <span>📍 Map & Directions: TFC HOME</span>
          </motion.a>

          <motion.h1 
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white leading-tight tracking-tight filter drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          >
            Fitness Hub <br />
            <span className="text-blue-400 relative inline-block mt-1">
              No Limits!
              <svg className="absolute left-0 bottom-[-8px] w-full h-[6px] text-blue-400/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
          >
            Pollachi's premier wellness sanctuary offering certified, caring athletic guidance for 
            <strong className="text-white"> children with developmental/physical differences</strong> and <strong className="text-white">older adults</strong> seeking active rehabilitation. We believe safety, dignity, and specialized compassion come first.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mt-2 text-slate-300 text-sm font-semibold"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              <span>Adaptive Wheelchair-Friendly Layout</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              <span>Certified Motor & Sensory Therapists</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              <span>Custom Soft Harness & Support Gear</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              <span>Patient 1-on-1 Personalized Care</span>
            </div>
          </motion.div>

          {/* CTA Buttons with high load subtle bounce on load */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.55 }}
            className="flex flex-wrap gap-3.5 pt-6 pb-2"
          >
            <button 
              onClick={onBookClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white font-extrabold text-sm px-8 py-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.03] shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center gap-2.5 group relative overflow-hidden"
              id="hero-book-slot"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Book Arena Slot
            </button>
            <button 
              onClick={onExploreClick}
              className="bg-slate-900/50 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800/80 font-extrabold text-sm px-7 py-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.03] shadow-md active:scale-[0.98]"
              id="hero-explore"
            >
              Explore Services
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="bg-slate-900/40 hover:bg-slate-900/80 text-slate-400 hover:text-slate-200 font-extrabold text-xs px-5 py-4 rounded-2xl flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] border border-slate-850/60 active:scale-[0.98]"
              id="hero-watch-video"
            >
              <Video size={16} className="text-blue-400" />
              Watch Tour
            </button>
          </motion.div>
        </div>

        {/* Right Column Visual Image Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.2 }}
          className="md:col-span-5 relative mt-6 md:mt-0"
        >
          <div className="relative mx-auto max-w-md md:max-w-none">
            {/* Background shape */}
            <div className="absolute inset-0 bg-blue-500 rounded-[45px] transform rotate-3 scale-102 opacity-20 pointer-events-none" />
            
            {/* Primary Image Container */}
            <div className="relative bg-slate-900/80 rounded-[45px] shadow-2xl overflow-hidden border-2 border-white/10 p-1.5 transform hover:scale-101 transition-transform rotate-1.5 hover:rotate-0 duration-500">
              <div className="rounded-[38px] overflow-hidden relative">
                <img 
                  src="/hero.jpg" 
                  alt="Therapy Activities children and seniors" 
                  className="w-full h-[380px] md:h-[450px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                
                {/* Image Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="text-xs bg-emerald-500 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block shadow-sm">
                    TFC Sports
                  </span>
                  <p className="text-lg font-bold leading-tight">Together we grow, together we heal.</p>
                </div>
              </div>
            </div>

            {/* Corner Badge float - Frosted Glassmorphism style */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.05 }}
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute -bottom-6 -left-6 bg-slate-900/85 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/10 flex items-center gap-3.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Heart className="fill-blue-500/80 text-blue-400 animate-pulse" size={24} />
              </div>
              <div className="text-left">
                <p className="text-2xl font-black text-blue-400 leading-none">100+</p>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-wider">Happy Families</p>
              </div>
            </motion.div>

            {/* Corner Service Stat badge - Frosted Glassmorphism style */}
            <motion.div 
              whileHover={{ y: -5, scale: 1.05 }}
              initial={{ scale: 0, x: 10 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute -top-6 -right-6 bg-slate-900/85 backdrop-blur-md text-white p-4.5 rounded-3xl shadow-xl hidden sm:block text-left border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  Live Registration
                </span>
              </div>
              <p className="text-base font-bold mt-1 text-slate-50">Free Trials Open!</p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Video Overlay Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.8)' }}
            className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <div className="p-4 bg-slate-950 flex justify-between items-center border-b border-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <Play size={18} className="text-blue-500 fill-blue-500" />
                  <span className="font-bold text-sm">TFC Pollachi - Virtual Tour & Activities</span>
                </div>
                <button 
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  id="video-modal-close"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Mock Video Container */}
              <div className="relative aspect-video bg-black flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-radial from-slate-900 to-slate-950">
                <div className="space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg mx-auto animate-bounce">
                    T
                  </div>
                  <h3 className="text-xl font-bold text-white">Explore Safe & Specialized Physical Training</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Watch our kids navigating colorful sensory obstacle rings, doing adaptive core training, and elders improving balancing sequences with hydro-float assists in real-time.
                  </p>
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 inline-flex items-center gap-3">
                    <CheckCircle className="text-emerald-500 text-xs shrink-0" size={16} />
                    <span className="text-[11px] text-left text-slate-300 font-medium">
                      All workouts are closely guarded under certified care guidelines.
                    </span>
                  </div>
                  <div className="pt-4 flex justify-center gap-4">
                    <button 
                      onClick={() => setIsVideoOpen(false)}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl text-xs font-bold"
                    >
                      Close Tour
                    </button>
                    <button 
                      onClick={() => {
                        setIsVideoOpen(false);
                        onBookClick();
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-xs font-bold"
                    >
                      Schedule Personal Visit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
