import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, Activity, Heart, Menu, X, Check } from 'lucide-react';
import { TFC_LOCATION } from '../data';

interface HeaderProps {
  onBookTrialClick?: () => void;
}

export default function Header({ onBookTrialClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          onClick={() => scrollToSection('home')} 
          className="flex items-center gap-3.5 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            T
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-tight text-blue-950 uppercase leading-none">
              TFC <span className="text-blue-500 font-medium">TOGETHER</span>
            </span>
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mt-1.5">
              Fitness Centre • Pollachi
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-8 font-semibold text-slate-650">
          <button 
            onClick={() => scrollToSection('home')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-home"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-services"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('assessment')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-assessment"
          >
            Fitness Assessment
          </button>
          <button 
            onClick={() => scrollToSection('booking')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-booking"
          >
            Booking Arena
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-testimonials"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-blue-600 transition-all duration-300 text-sm cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all after:duration-300"
            id="nav-item-contact"
          >
            Contact
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex gap-3 items-center">
          <a
            href={`tel:${TFC_LOCATION.phone.replace(/[\s\+]/g, '')}`}
            className="flex items-center gap-2 text-xs text-slate-705 font-extrabold bg-slate-100/80 border border-slate-200/50 px-4 py-2.5 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 shadow-sm hover:scale-[1.03] whitespace-nowrap cursor-pointer"
            id="nav-phone-call-1"
            title="Centre Director Office"
          >
            <Phone size={12} className="text-blue-600 animate-pulse" />
            {TFC_LOCATION.phone}
          </a>

        </div>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none cursor-pointer"
          id="nav-mobile-toggle"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl px-6 py-8 flex flex-col gap-5 font-semibold text-slate-700"
          >
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-services"
            >
              Our Features
            </button>
            <button 
              onClick={() => scrollToSection('assessment')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-assessment"
            >
              Inclusive assessment
            </button>
            <button 
              onClick={() => scrollToSection('booking')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-booking"
            >
              Booking Arena
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-testimonials"
            >
              Our Families
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-left py-2 hover:text-blue-600 transition-colors"
              id="mobile-nav-contact"
            >
              Contact
            </button>

            <div className="border-t border-slate-100 pt-5 mt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${TFC_LOCATION.phone.replace(/[\s\+]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full text-xs text-slate-700 font-bold bg-slate-50 border border-slate-100 py-3 rounded-xl whitespace-nowrap hover:bg-blue-50 transition-colors"
              >
                <Phone size={14} className="text-blue-600" />
                Director: {TFC_LOCATION.phone}
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
