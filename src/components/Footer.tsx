import { motion } from 'motion/react';
import { TFC_LOCATION } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Adaptive Gym', href: '#services' },
    { label: 'Sensory Room', href: '#services' },
    { label: 'Hydro Therapy', href: '#services' },
    { label: 'Senior Stability', href: '#services' },
    { label: 'Book a Slot', href: '#booking' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: TFC_LOCATION.instagram,
      icon: '📸',
      color: 'from-pink-500 to-purple-600',
      glow: 'rgba(236,72,153,0.3)'
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${TFC_LOCATION.whatsappNumber}?text=Hello%20TFC!`,
      icon: '💬',
      color: 'from-emerald-500 to-teal-600',
      glow: 'rgba(16,185,129,0.3)'
    },
    {
      label: 'Facebook',
      href: '#',
      icon: '👍',
      color: 'from-blue-500 to-indigo-600',
      glow: 'rgba(59,130,246,0.3)'
    },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/50 overflow-hidden">
      {/* Top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(59,130,246,0.5), transparent)'}} />
      {/* Ambient glow blobs */}
      <div className="absolute top-[-80px] left-[10%] w-[400px] h-[300px] rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse, rgba(59,130,246,0.05), transparent 70%)'}} />
      <div className="absolute bottom-[-80px] right-[10%] w-[400px] h-[300px] rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse, rgba(99,102,241,0.05), transparent 70%)'}} />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 relative z-10">
        {/* Core grid */}
        <div className="grid md:grid-cols-4 gap-10 text-left">

          {/* Col 1 – Brand block */}
          <div className="md:col-span-2 space-y-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer w-fit"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl text-white"
                style={{background: 'linear-gradient(135deg, #2563eb, #6366f1)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)'}}
              >
                T
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white uppercase block leading-none">
                  TFC <span className="text-indigo-400 font-semibold text-sm">Together</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fitness Centre · Pollachi</span>
              </div>
            </motion.div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Pollachi's first integrated physical therapy facility designed for sensory motor balancing in kids, neuromuscular support in post-injury patients, and strength training in older adults.
            </p>

            <div className="flex flex-wrap gap-x-1 gap-y-2">
              <a
                href={`https://wa.me/${TFC_LOCATION.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                💬 WhatsApp Chat
              </a>
              <a
                href={`tel:${TFC_LOCATION.phone.replace(/[\s\+]/g, '')}`}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                📞 {TFC_LOCATION.phone}
              </a>
            </div>
          </div>

          {/* Col 2 – Services nav links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest" style={{color: 'rgba(255,255,255,0.6)'}}>
              PROGRAMMES
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors shrink-0"></span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 – Quality stats */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest" style={{color: 'rgba(255,255,255,0.6)'}}>
              TFC QUALITY
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold">4.9/5 by 100+ families</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>✅</span>
                <span>ISO Compliant facility</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>🏋️</span>
                <span>25+ Custom Safe Gear</span>
              </div>
              <a
                href={`https://www.google.com/maps?q=${TFC_LOCATION.latitude},${TFC_LOCATION.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold leading-snug"
              >
                <span className="mt-0.5">📍</span>
                <span className="text-[11px]">{TFC_LOCATION.address}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social icons row */}
        <div className="mt-12 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left – copyright */}
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase font-black text-slate-600 tracking-widest">
                © 2026 Together Fitness Centre. All Rights Reserved. Pollachi.
              </p>
              <p className="text-[9px] text-slate-700 mt-1.5 max-w-md leading-relaxed">
                Medical Disclaimer: TFC sessions provide supplementary fitness & balance exercises. Consult your physician before intensive programs.
              </p>
            </div>

            {/* Right – socials */}
            <div className="flex items-center gap-3 shrink-0">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-base text-white bg-gradient-to-br ${s.color} cursor-pointer`}
                  style={{boxShadow: `0 4px 15px ${s.glow}`}}
                >
                  {s.icon}
                </motion.a>
              ))}
              {/* Scroll to top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title="Back to top"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-base text-white cursor-pointer border border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/80"
              >
                ↑
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
