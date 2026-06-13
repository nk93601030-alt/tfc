import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    caption: 'Children Fitness Training',
  },
  {
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    caption: 'Group Workout Session',
  },
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    caption: 'Rehabilitation & Recovery',
  },
  {
    src: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80',
    caption: 'Coach & Child — Together',
  },
  {
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80',
    caption: 'Physical Therapy Session',
  },
  {
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    caption: 'Team Sports & Development',
  },
];

const TAGLINE_WORDS = [
  { text: 'Discipline', accent: true },
  { text: 'Hard Work', accent: false },
  { text: 'Perseverance', accent: true },
  { text: 'Change', accent: false },
];

export default function AboutPollachi() {
  const easeOutExpo = [0.16, 1, 0.3, 1];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-advance every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % SLIDE_PHOTOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDE_PHOTOS.length) % SLIDE_PHOTOS.length);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDE_PHOTOS.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.98 }),
  };

  return (
    <section id="about-pollachi" className="relative py-20 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-900">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-start">

          {/* ── Left: Slideshow Carousel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: easeOutExpo }}
            className="md:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900" style={{ aspectRatio: '4/5' }}>

              {/* Sliding image */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <img
                    src={SLIDE_PHOTOS[current].src}
                    alt={SLIDE_PHOTOS[current].caption}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Caption + dots */}
              <div className="absolute bottom-0 inset-x-0 px-5 pb-5 z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`cap-${current}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs font-black text-white uppercase tracking-widest mb-3"
                  >
                    {SLIDE_PHOTOS[current].caption}
                  </motion.p>
                </AnimatePresence>

                <div className="flex items-center gap-1.5">
                  {SLIDE_PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-6 bg-blue-400' : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white cursor-pointer backdrop-blur-sm transition-all hover:scale-110"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white cursor-pointer backdrop-blur-sm transition-all hover:scale-110"
              >
                <ChevronRight size={16} />
              </button>

              {/* TFC badge top-left */}
              <div className="absolute top-4 left-4 z-10 bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-blue-400/20 shadow">
                <p className="text-[9px] font-black uppercase tracking-widest text-white">Together Fitness Centre</p>
                <p className="text-[11px] font-extrabold text-blue-200">பொள்ளாச்சி • TFC</p>
              </div>

              {/* Slide counter top-right */}
              <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold text-white/70 tabular-nums">
                  {String(current + 1).padStart(2, '0')} / {String(SLIDE_PHOTOS.length).padStart(2, '0')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Text Content ── */}
          <div className="md:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-extrabold text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider"
            >
              <Award size={12} className="shrink-0" />
              <span>எங்கள் தொடக்கம் மற்றும் நன்றிகள்</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight tracking-tight"
            >
              பொள்ளாச்சி: எங்கள் வளர்ச்சியின் <br />
              <span className="text-blue-400 relative inline-block mt-1">
                அடித்தளம்
                <svg className="absolute left-0 bottom-[-6px] w-full h-[4px] text-blue-400/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h3>

            {/* ✨ Big Tagline Words — Ultra Stylish & Unique */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }}
              className="flex flex-wrap gap-x-5 gap-y-3 pt-3 pb-4 items-center"
            >
              {TAGLINE_WORDS.map((word, i) => (
                <div key={word.text} className="flex items-center gap-5">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)', skewX: -12 }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', skewX: -12 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: easeOutExpo }}
                    className={`
                      inline-block font-black uppercase tracking-widest text-2xl sm:text-3xl italic
                      ${word.accent
                        ? 'text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 drop-shadow-[0_2px_15px_rgba(59,130,246,0.6)]'
                        : 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]'
                      }
                    `}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {word.text}
                  </motion.span>

                  {i < TAGLINE_WORDS.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
                      className="text-blue-500/40 text-2xl font-black italic tracking-tighter"
                    >
                      //
                    </motion.span>
                  )}
                </div>
              ))}
            </motion.div>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium"
              >
                கோவையில் தனது முதல் அடியை எடுத்து வைக்கும் டிஎப்சி (TFC), பொள்ளாச்சி பெற்றோர்களின் ஆதரவும் பங்களிப்பும் எங்களுக்குக் கிடைத்த மிகப்பெரிய பலமாகும். அவர்கள் எங்கள் மீது வைத்த நம்பிக்கையும், குழந்தைகளின் உடல் மற்றும் திறன் மேம்பாட்டிற்காக ஒரு இடத்தையும் மைதானத்தையும் ஒதுக்கி வழங்கிய ஒத்துழைப்பும், டிஎப்சியின் வளர்ச்சிப் பயணத்தில் முக்கியமான மைல்கல்லாக அமைந்துள்ளது.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.25 }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium"
              >
                Together Fitness Centre குழந்தைகள், பெற்றோர், உறவினர்கள், ஆசிரியர்கள், மருத்துவர்கள் மற்றும் பயிற்சியாளர்களை ஒரே தளத்தில் இணைக்கிறது. ஒவ்வொரு குழந்தையின் தனித்திறன், ஆரோக்கியம், கல்வி மற்றும் வாழ்க்கை இலக்குகளை கருத்தில் கொண்டு, அனைவரின் ஆலோசனைகளையும் ஒருங்கிணைத்து சரியான பாதையைத் தேர்ந்தெடுக்க உதவுகிறது. இங்கு நாம் தனிநபர்களாக அல்ல, ஒரு குடும்பமாக இணைந்து குழந்தைகளின் முழுமையான வளர்ச்சிக்காக செயல்படுகிறோம்.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.28 }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium"
              >
                குழந்தையின் வெற்றி என்பது பெற்றோர், ஆசிரியர், மருத்துவர், பயிற்சியாளர் மற்றும் சமூகத்தின் கூட்டு முயற்சியின் பலன்.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
                className="text-sm sm:text-base text-slate-300 italic border-l-2 border-blue-500 pl-4 py-1 leading-relaxed"
              >
                "அந்த நன்றியை வெளிப்படுத்தும் விதமாக, டிஎப்சி தனது முதல் அடையாளமாக பொள்ளாச்சியை பெருமையுடன் கருதுகிறது. இன்று ஒரு அமைப்பாக மட்டுமல்லாமல், ஒரு குடும்பமாக இணைந்து, குழந்தைகளின் வளர்ச்சிப் பாதையில் தொடர்ந்து பயணித்து வருகிறோம். இந்தப் பயணத்தின் அடித்தளமாக இருந்த பொள்ளாச்சி பெற்றோர்கள் அனைவருக்கும் எங்கள் மனமார்ந்த நன்றிகள்."
              </motion.p>
            </div>

            <div className="border-t border-white/5 my-6" />

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.4 }}
                className="text-base sm:text-lg leading-relaxed font-medium text-slate-300"
              >
                As TFC takes its first steps in Coimbatore, the support and contribution of parents from Pollachi stand as our greatest strength. The trust they placed in us—and their cooperation in providing a dedicated space and ground for the physical and skill development of the children—mark a significant milestone in TFC's journey of growth.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.45 }}
                className="text-base sm:text-lg leading-relaxed font-medium text-slate-300"
              >
                Together Fitness Centre brings together children, parents, relatives, teachers, doctors, and trainers on a single platform. By considering each child's unique talents, health, education, and life goals, and by integrating everyone's insights, it helps determine the right path forward. Here, we work together not merely as individuals, but as a family, dedicated to the holistic development of the children.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.48 }}
                className="text-base sm:text-lg leading-relaxed font-medium text-slate-300"
              >
                A child's success is the result of the collective effort of parents, teachers, doctors, coaches, and society.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.5 }}
                className="text-sm sm:text-base text-slate-400 italic border-l-2 border-blue-500/50 pl-4 py-1 leading-relaxed"
              >
                "In appreciation of this, TFC proudly regards Pollachi as its foundational home. Today, we move forward not merely as an organization, but as a united family, continuing to nurture the children's growth. We extend our heartfelt gratitude to all the parents from Pollachi who laid the foundation for this journey."
              </motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
