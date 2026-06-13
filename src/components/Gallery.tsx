import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'gym' | 'sensory' | 'therapy' | 'classes'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'gym', label: 'Adaptive Gym' },
    { id: 'sensory', label: 'Sensory Integrations' },
    { id: 'therapy', label: 'Hydro Therapy' },
    { id: 'classes', label: 'Elders Classes' }
  ];

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhoto !== null) {
      const nextIdx = (selectedPhoto + 1) % filteredItems.length;
      setSelectedPhoto(nextIdx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhoto !== null) {
      const prevIdx = (selectedPhoto - 1 + filteredItems.length) % filteredItems.length;
      setSelectedPhoto(prevIdx);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 px-6 bg-slate-50 border-t border-slate-100/60 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-blue-200/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/5 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Gallery Title Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md">
              Therapy Arenas
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-blue-950 mt-3 tracking-tight">
              Gallery <span className="text-blue-500 italic text-xl ml-1 font-normal block md:inline">Our Activities & Spaces</span>
            </h2>
            <p className="text-slate-605 text-slate-600 text-sm mt-3 max-w-xl font-semibold">
              Take a visual look inside Together Fitness Centre. Our setups are certified, sanitized daily, and optimized for physical rehabilitation in Pollachi.
            </p>
          </motion.div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id as any);
                  setSelectedPhoto(null);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all ${
                  filter === cat.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
                id={`gallery-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Images Grid */}
        <motion.div 
          layout
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.85 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 100, damping: 15 }
                  }
                }}
                whileHover="hovered"
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer aspect-4/3 transition-all hover:shadow-2xl hover:border-blue-300"
                onClick={() => setSelectedPhoto(index)}
              >
                {/* Image item zoom with enhanced effect */}
                <div className="w-full h-full overflow-hidden bg-slate-100">
                  <motion.img 
                    src={item.src} 
                    alt={item.alt}
                    variants={{
                      hovered: { scale: 1.15, rotate: 2 }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const originalIdx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                      const fallbacks = [
                        'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517964603305-3b4d6f8d7b57?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1526406915892-3f1f9fd1f1f8?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1584467745941-0b6f9f0b5b0a?auto=format&fit=crop&w=800&q=80'
                      ];
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbacks[originalIdx] || fallbacks[0];
                    }}
                  />
                </div>
                
                {/* Dark Hover overlay gradient with enhanced animation */}
                <motion.div 
                  variants={{
                    hovered: { opacity: 0.7 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-slate-950 opacity-0 pointer-events-none" 
                />

                {/* Info Eye displayed on hover only */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 shadow-sm z-10">
                  <Eye className="text-blue-600" size={16} />
                </div>

                {/* Slide Up Content from Bottom */}
                <motion.div 
                  variants={{
                    hovered: { y: 0, opacity: 1 }
                  }}
                  initial={{ y: 24, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 p-5 text-left z-10 pointer-events-none"
                >
                  <span className="text-[10px] bg-blue-500 text-white font-extrabold uppercase px-2 py-0.5 rounded tracking-widest mb-1.5 inline-block">
                    {item.category}
                  </span>
                  <p className="text-sm font-bold text-white line-clamp-1">{item.alt}</p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.caption}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Slideshow Modal */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Header inside lightbox */}
              <div className="flex justify-between items-center text-white py-2 px-4 self-stretch">
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400">
                    Together Fitness Centre Pollachi
                  </p>
                  <p className="text-sm font-bold mt-0.5">
                    Viewing {selectedPhoto + 1} of {filteredItems.length}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white cursor-pointer"
                  id="gallery-zoom-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image Slider Area */}
              <div className="flex items-center justify-between w-full max-w-5xl mx-auto flex-1 gap-2 p-2 relative h-[60vh]">
                {/* Prev button */}
                <button 
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer select-none shrink-0"
                  id="gallery-prev"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Animated Image View Container */}
                <div 
                  className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img 
                    key={filteredItems[selectedPhoto].id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={filteredItems[selectedPhoto].src} 
                    alt={filteredItems[selectedPhoto].alt}
                    className="max-h-[70vh] max-w-full object-contain pointer-events-none"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const item = filteredItems[selectedPhoto];
                      const originalIdx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
                      const fallbacks = [
                        'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517964603305-3b4d6f8d7b57?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1526406915892-3f1f9fd1f1f8?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1584467745941-0b6f9f0b5b0a?auto=format&fit=crop&w=800&q=80'
                      ];
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbacks[originalIdx] || fallbacks[0];
                    }}
                  />
                </div>

                {/* Next button */}
                <button 
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer select-none shrink-0"
                  id="gallery-next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Footer Panel inside Lightbox */}
              <div 
                className="bg-slate-900/85 backdrop-blur border-t border-white/10 text-white p-6 max-w-3xl mx-auto rounded-2xl mb-4 w-full text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-blue-600 text-white font-extrabold uppercase px-2.5 py-1 rounded tracking-widest leading-none">
                    {filteredItems[selectedPhoto].category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Safe environment guidelines strictly applied
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">{filteredItems[selectedPhoto].alt}</h3>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {filteredItems[selectedPhoto].caption}
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
