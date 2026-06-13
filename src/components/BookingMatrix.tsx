import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, TFC_LOCATION } from '../data';
import { Calendar, Clock, User, Phone, Check, ShieldCheck, HelpCircle, Dumbbell, Mail, Video, Copy, ExternalLink } from 'lucide-react';

interface BookingMatrixProps {
  selectedServiceId: string;
  onBookingSuccess: () => void;
}

interface LocalSavedBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  sport: string;
  date: string;
  time: string;
  refNo: string;
  meetLink?: string;
  createdAt: string;
}

export default function BookingMatrix({ selectedServiceId, onBookingSuccess }: BookingMatrixProps) {
  const [selectedSport, setSelectedSport] = useState<string>('adaptive-gym');
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('06:00 AM');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [copiedMeetLink, setCopiedMeetLink] = useState<boolean>(false);
  const [localBookings, setLocalBookings] = useState<LocalSavedBooking[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState<LocalSavedBooking | null>(null);

  const isFirstRender = React.useRef(true);

  // Sync prop change
  useEffect(() => {
    if (selectedServiceId) {
      setSelectedSport(selectedServiceId);
      
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Scroll to booking section when a service is selected
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedServiceId]);

  // Load existing bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tfc_local_bookings');
    if (saved) {
      try {
        setLocalBookings(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    }
  }, []);

  // Generate next 21 active days starting from today (excluding Sunday) - Full Calendar View
  const getNextDays = () => {
    const days = [];
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    let current = new Date();
    // In dev, if today is Sunday, move to next Mon
    if (current.getDay() === 0) {
      current.setDate(current.getDate() + 1);
    }

    let count = 0;
    while (count < 21) {
      if (current.getDay() !== 0) { // skip Sunday
        days.push({
          dayName: weekdays[current.getDay()],
          dayNo: current.getDate(),
          monthName: months[current.getMonth()],
          fullDateText: `${current.getDate()} ${months[current.getMonth()]} ${current.getFullYear()}`,
          rawDate: new Date(current)
        });
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const activeDays = getNextDays();

  // All Fresh Booking Time Slots - No Occupied Slots
  const timeSlots = [
    { time: '05:30 AM', isOccupied: false, type: 'Early Morning' },
    { time: '06:00 AM', isOccupied: false, type: 'Morning' },
    { time: '06:30 AM', isOccupied: false, type: 'Morning' },
    { time: '07:00 AM', isOccupied: false, type: 'Morning' },
    { time: '07:30 AM', isOccupied: false, type: 'Morning' },
    { time: '08:00 AM', isOccupied: false, type: 'Morning' },
    { time: '08:30 AM', isOccupied: false, type: 'Morning' },
    { time: '09:00 AM', isOccupied: false, type: 'Morning' },
    { time: '09:30 AM', isOccupied: false, type: 'Morning' },
    { time: '10:00 AM', isOccupied: false, type: 'Morning' },
    { time: '10:30 AM', isOccupied: false, type: 'Late Morning' },
    { time: '11:00 AM', isOccupied: false, type: 'Late Morning' },
    { time: '12:00 PM', isOccupied: false, type: 'Noon' },
    { time: '01:00 PM', isOccupied: false, type: 'Afternoon' },
    { time: '02:00 PM', isOccupied: false, type: 'Afternoon' },
    { time: '03:00 PM', isOccupied: false, type: 'Afternoon' },
    { time: '04:00 PM', isOccupied: false, type: 'Late Afternoon' },
    { time: '04:30 PM', isOccupied: false, type: 'Late Afternoon' },
    { time: '05:00 PM', isOccupied: false, type: 'Evening' },
    { time: '05:30 PM', isOccupied: false, type: 'Evening' },
    { time: '06:00 PM', isOccupied: false, type: 'Evening' },
    { time: '06:30 PM', isOccupied: false, type: 'Evening' },
    { time: '07:00 PM', isOccupied: false, type: 'Evening' },
    { time: '07:15 PM', isOccupied: false, type: 'Evening' },
    { time: '07:30 PM', isOccupied: false, type: 'Evening' },
    { time: '08:00 PM', isOccupied: false, type: 'Night' },
    { time: '08:15 PM', isOccupied: false, type: 'Night' },
    { time: '08:30 PM', isOccupied: false, type: 'Night' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Create confirmation tickets
    const refNo = `TFC-${Math.floor(1000 + Math.random() * 9000)}`;
    const sportName = SERVICES.find(s => s.id === selectedSport)?.title || 'Adaptive Workout';
    const chosenDay = activeDays[selectedDayIdx];

    const generateMeetLink = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const part1 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * 26)]).join('');
      const part2 = Array.from({length: 4}, () => chars[Math.floor(Math.random() * 26)]).join('');
      const part3 = Array.from({length: 3}, () => chars[Math.floor(Math.random() * 26)]).join('');
      return `https://meet.google.com/${part1}-${part2}-${part3}`;
    };

    const newBooking: LocalSavedBooking = {
      id: `${Date.now()}-${Math.random()}`,
      name,
      phone,
      email: email || '',
      sport: sportName,
      date: chosenDay.fullDateText,
      time: selectedTimeSlot,
      refNo,
      meetLink: generateMeetLink(),
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newBooking, ...localBookings];
    setLocalBookings(updated);
    localStorage.setItem('tfc_local_bookings', JSON.stringify(updated));
    setBookingConfirmed(newBooking);
    onBookingSuccess();
  };

  // Compile formal English text template for WhatsApp direct send
  const getWhatsAppSubmitLink = (b: LocalSavedBooking) => {
    const message = `Dear Together Fitness Centre (TFC) Management Team,

I hope this message finds you in good health. I have successfully registered for a booking session through your official website platform. Kindly find my verified appointment details below:

📋 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${b.name}
Contact Number: ${b.phone}
Email Address: ${b.email || 'Not provided'}
Registration Reference: ${b.refNo}
Booked Service/Unit: ${b.sport}
Scheduled Date: ${b.date}
Preferred Time Slot: ${b.time}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎥 ONLINE CONSULTATION LINK:
${b.meetLink || 'Google Meet link will be generated upon confirmation'}

I respectfully request your team to verify and confirm this appointment at your earliest convenience. I am looking forward to experiencing the professional rehabilitation services offered by Together Fitness Centre.

Thank you for your prompt attention and support.

Best Regards,
${b.name}`;
    return `https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const getEmailShareLink = (b: LocalSavedBooking) => {
    const subject = `Confirmed Booking & Google Meet Link - TFC HOME [Ref: ${b.refNo}]`;
    const body = `Dear ${b.name},

Thank you for reserving a session at the Together Fitness Centre (TFC HOME) platform. We have reserved your slot details.

Below are your dynamic session details and custom Google Meet link:

==================================================
Reference Number : ${b.refNo}
Selected Unit    : ${b.sport}
Date of Session  : ${b.date}
Scheduled Time   : ${b.time}

👉 Join Google Meet Video Call: 
${b.meetLink || 'https://meet.google.com/tfc-home-session'}
==================================================

* If this is an online clinical fitness consultation, please click the Google Meet link above at the scheduled time to start the session.
* If you are visiting our Pollachi center for an in-person physical therapy session, please keep this ticket reference handy when you arrive.

📍 Location: ${TFC_LOCATION.address}.
📞 Contact: ${TFC_LOCATION.phone}
💬 WhatsApp: https://wa.me/${TFC_LOCATION.whatsappNumber}
📧 Email: ${TFC_LOCATION.email}

Warm regards,
Together Fitness Centre (TFC HOME) Team
Pollachi, Tamil Nadu`;

    return `mailto:${b.email || 'tfchome2026@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const deleteLocalBooking = (id: string) => {
    const updated = localBookings.filter(b => b.id !== id);
    setLocalBookings(updated);
    localStorage.setItem('tfc_local_bookings', JSON.stringify(updated));
  };

  return (
    <section id="booking" className="py-20 px-6 bg-slate-950 text-white rounded-[40px] md:rounded-[60px] mx-4 mb-20 overflow-hidden relative border border-slate-800/60" style={{boxShadow: '0 0 80px rgba(59,130,246,0.04), 0 40px 100px rgba(0,0,0,0.6)'}}>
      {/* Animated mesh gradients layout background */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-14 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-blue-400 font-extrabold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border" style={{background: 'rgba(30,41,100,0.7)', borderColor: 'rgba(99,102,241,0.3)', backdropFilter: 'blur(12px)', boxShadow: '0 0 20px rgba(99,102,241,0.15)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Arena Booking Matrix
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-display font-extrabold mt-5 tracking-tighter leading-none"
          >
            Reserve Your
            <br />
            <span style={{background: 'linear-gradient(135deg, #60a5fa, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Dynamic Slot</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-sm mt-4 font-medium max-w-lg mx-auto leading-relaxed"
          >
            Lock in your customized clinic or gym session. Slots are confirmed by our admins via WhatsApp — free of charge.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!bookingConfirmed ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-10 rounded-3xl border backdrop-blur-xl" style={{background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(51,65,85,0.5)', boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'}}
            >
              <form onSubmit={handleBookingSubmit} className="space-y-8 text-left">
                
                {/* 1. SELECT SERVICE / UNIT */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-400 flex items-center justify-center font-bold text-[10px]">1</span>
                    Select Sports / Therapy Unit
                  </label>
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.05
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {SERVICES.map((s) => (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                        }}
                        whileHover={{ scale: 1.02, y: -2, borderColor: "rgb(59, 130, 246)", boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        key={s.id}
                        onClick={() => setSelectedSport(s.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          selectedSport === s.id 
                            ? 'text-white' 
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                        style={selectedSport === s.id ? {background: 'linear-gradient(135deg, rgba(37,99,235,0.4), rgba(79,70,229,0.3))', borderColor: 'rgba(96,165,250,0.6)', boxShadow: '0 0 20px rgba(59,130,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'} : {background: 'rgba(15,23,42,0.6)', borderColor: 'rgba(51,65,85,0.6)'}}
                        id={`booking-sport-${s.id}`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                          selectedSport === s.id ? 'text-white' : 'bg-slate-800/80 text-slate-400'
                        }`} style={selectedSport === s.id ? {background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 12px rgba(59,130,246,0.4)'} : {}}>
                          🏅
                        </div>
                        <div className="text-left leading-none">
                          <p className="font-bold text-sm text-slate-100">{s.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{s.tag}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* 2. DYNAMIC DAY PICKER */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-400 flex items-center justify-center font-bold text-[10px]">2</span>
                    Select Day of Visit (Full Calendar - 21 Days Ahead)
                  </label>
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-2 pb-2 overflow-x-auto" 
                    id="date-scroll-container"
                  >
                    {activeDays.map((day, idx) => (
                      <motion.button
                        variants={{
                          hidden: { opacity: 0, x: 10 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ scale: 1.04, y: -2, borderColor: "rgb(59, 130, 246)", boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)" }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        key={idx}
                        onClick={() => setSelectedDayIdx(idx)}
                        className={`flex flex-col items-center justify-center p-3.5 rounded-2xl font-bold min-w-[76px] transition-all cursor-pointer border ${
                          selectedDayIdx === idx 
                            ? 'text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                        style={selectedDayIdx === idx ? {background: 'linear-gradient(135deg, #2563eb, #4f46e5)', borderColor: 'rgba(96,165,250,0.7)', boxShadow: '0 0 20px rgba(59,130,246,0.4), 0 8px 20px rgba(59,130,246,0.2)'} : {background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(51,65,85,0.6)'}}
                        id={`booking-day-${idx}`}
                      >
                        <span className="text-[10px] uppercase font-black tracking-widest">{day.dayName}</span>
                        <span className="text-lg font-black mt-1 leading-none">{day.dayNo}</span>
                        <span className="text-[9px] uppercase mt-1 text-slate-500 font-extrabold">{day.monthName}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* 3. TIME SLOT GRID */}
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-400 flex items-center justify-center font-bold text-[10px]">3</span>
                    Choose Time Slot
                  </label>
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                  >
                    {timeSlots.map((slot) => {
                      if (slot.isOccupied) {
                        return (
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            key={slot.time}
                            className="bg-slate-950/40 border border-slate-800/80 text-slate-400 p-3.5 rounded-xl text-center text-xs font-extrabold leading-none flex flex-col justify-center gap-1 opacity-60 cursor-not-allowed select-none"
                          >
                            <span>{slot.time}</span>
                            <span className="text-[8px] tracking-wider uppercase font-black text-slate-500">(Occupied)</span>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.button
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          animate={selectedTimeSlot === slot.time ? {
                            scale: [1, 1.08, 1.05, 1.08],
                            borderColor: "rgb(59, 130, 246)",
                            boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
                            transition: { repeat: Infinity, duration: 2, repeatType: "reverse" as const }
                          } : {
                            scale: 1,
                            borderColor: "rgb(51, 65, 85)",
                            boxShadow: "0 0 0px rgba(0,0,0,0)"
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            borderColor: "rgb(59, 130, 246)",
                            boxShadow: "0 0 12px rgba(59, 130, 246, 0.3)"
                          }}
                          whileTap={{ scale: 0.97 }}
                          type="button"
                          key={slot.time}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                           className={`p-3.5 rounded-xl text-center text-xs font-black transition-all cursor-pointer border ${
                             selectedTimeSlot === slot.time
                               ? 'text-white'
                               : 'text-slate-400 hover:text-white'
                           }`}
                           style={selectedTimeSlot === slot.time ? {background: 'linear-gradient(135deg, #2563eb, #4f46e5)', borderColor: 'rgba(96,165,250,0.6)', boxShadow: '0 0 15px rgba(59,130,246,0.35)'} : {background: 'rgba(15,23,42,0.7)', borderColor: 'rgba(51,65,85,0.5)'}}
                          id={`booking-slot-${slot.time.replace(':', '').replace(' ', '')}`}
                        >
                          {slot.time}
                          <span className="block text-[8px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                            {slot.type}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* 4. VISITOR INFO */}
                <div className="border-t pt-8" style={{borderColor: 'rgba(51,65,85,0.5)'}}>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                        Member / Parent Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-500" size={16} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ramesh or Ammal"
                          className="w-full p-3.5 pl-11 rounded-xl border text-white focus:outline-none font-bold text-sm placeholder:text-slate-600 transition-all duration-300" style={{background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(51,65,85,0.6)', outline: 'none'}} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.7)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.2)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
                          id="booking-name-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                        WhatsApp Contact No *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-slate-500" size={16} />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full p-3.5 pl-11 rounded-xl border text-white focus:outline-none font-bold text-sm placeholder:text-slate-600 transition-all duration-300" style={{background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(51,65,85,0.6)'}} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.7)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.2)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
                          id="booking-phone-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-500" size={16} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@domain.com"
                          className="w-full p-3.5 pl-11 rounded-xl border text-white focus:outline-none font-bold text-sm placeholder:text-slate-600 transition-all duration-300" style={{background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(51,65,85,0.6)'}} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.7)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.2)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)'; e.currentTarget.style.boxShadow = 'none'; }}
                          id="booking-email-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic selected recap block */}
                <div className="mt-8 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1d4ed8, #4338ca)', border: '1px solid rgba(96,165,250,0.3)', boxShadow: '0 0 40px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'}}>
                  <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at top right, rgba(167,139,250,0.2), transparent 60%)'}} />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black text-blue-100 italic tracking-wider">
                      Dynamic Slot Selected:
                    </p>
                    <p className="text-lg font-extrabold leading-tight mt-1 uppercase text-white">
                      {SERVICES.find(s => s.id === selectedSport)?.title || 'Adaptive Training'}
                    </p>
                    <p className="text-xs text-blue-100 mt-1 font-semibold">
                      📅 Date: {activeDays[selectedDayIdx].fullDateText} | ⏰ Time: {selectedTimeSlot}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] uppercase font-black text-blue-100 italic tracking-wider">
                      Training Cost:
                    </p>
                    <p className="text-lg font-black text-white">Custom quote details</p>
                    <p className="text-[10px] text-blue-150 font-bold leading-tight mt-0.5 max-w-[200px]">
                      Varies based on physiotherapy assessment
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-wider transition-all cursor-pointer text-sm relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #ffffff, #e0e7ff)', color: '#1e3a8a', boxShadow: '0 8px 30px rgba(99,102,241,0.25)'}}
                  id="booking-confirm-submit"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>✅</span> Confirm & Reserve Slot
                  </span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* Successful confirmation ticket card */
            <motion.div 
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl max-w-xl mx-auto space-y-6 relative border"
              style={{background: 'rgba(15,23,42,0.95)', borderColor: 'rgba(52,211,153,0.3)', boxShadow: '0 0 60px rgba(52,211,153,0.1), 0 40px 80px rgba(0,0,0,0.6)'}}
            >
              {/* Confetti element */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-400" style={{background: 'radial-gradient(circle, rgba(52,211,153,0.2), rgba(52,211,153,0.05))', boxShadow: '0 0 30px rgba(52,211,153,0.3)', border: '1px solid rgba(52,211,153,0.3)'}}>
                <ShieldCheck size={36} />
              </div>

              <div className="text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md">
                  Web Reservation Recorded
                </span>
                <h3 className="text-xl font-extrabold text-white">Your ticket is ready!</h3>
                <p className="text-xs text-slate-400">
                  We have locally pre-arranged your visiting slot. Please send to our manager on WhatsApp or click below to mail the invite.
                </p>
              </div>

              {/* Physical ticket mockup style */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative text-left overflow-hidden">
                {/* Side tickets holes design */}
                <div className="absolute top-[48%] left-[-10px] w-5 h-5 rounded-full bg-slate-900" />
                <div className="absolute top-[48%] right-[-10px] w-5 h-5 rounded-full bg-slate-900" />

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-slate-800 text-xs text-slate-300">
                  <div>
                    <span className="block text-[9px] uppercase font-black text-slate-500">TFC TICKET NO</span>
                    <span className="font-mono text-sm font-extrabold text-blue-400">{bookingConfirmed.refNo}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-black text-slate-500">MEMBER PROFILE</span>
                    <span className="font-bold text-slate-100">{bookingConfirmed.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 text-xs text-slate-300">
                  <div>
                    <span className="block text-[9px] uppercase font-black text-slate-500">SELECTED ARENA</span>
                    <p className="font-extrabold text-slate-100 mt-1 leading-tight">{bookingConfirmed.sport}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-black text-slate-500">SCHEDULE APPOINTMENT</span>
                    <p className="font-extrabold text-slate-100 mt-1 leading-tight">{bookingConfirmed.date}</p>
                    <p className="text-[10px] text-blue-400 font-bold mt-1">⏰ {bookingConfirmed.time}</p>
                  </div>
                </div>

                {/* Modern interactive Google Meet Section inside Ticket */}
                <div className="mt-2 pt-4 border-t border-dashed border-slate-800">
                  <span className="block text-[9px] uppercase font-black text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <Video size={11} className="text-blue-400" /> ONLINE GOOGLE MEET LINK
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-blue-350">
                    <span className="truncate select-all">{bookingConfirmed.meetLink || 'https://meet.google.com/xxx-xxxx-xxx'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (bookingConfirmed.meetLink) {
                          navigator.clipboard.writeText(bookingConfirmed.meetLink);
                          setCopiedMeetLink(true);
                          setTimeout(() => setCopiedMeetLink(false), 2000);
                        }
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-2 py-1 rounded border border-slate-700/50 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] shrink-0"
                    >
                      {copiedMeetLink ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                      <span>{copiedMeetLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1.5 leading-tight font-medium">
                    Google Meet has been prepared for virtual consultation or rehab check. A copy is included in templates below.
                  </p>
                </div>
              </div>

              {/* Actions buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={getWhatsAppSubmitLink(bookingConfirmed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-4 rounded-xl text-center text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 hover:scale-[1.01]"
                  id="booking-whatsapp-send"
                >
                  <span>Verify and Send on WhatsApp</span>
                </a>

                {bookingConfirmed.email && (
                  <a
                    href={getEmailShareLink(bookingConfirmed)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-center text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/10 hover:scale-[1.01]"
                    id="booking-email-send"
                  >
                    <Mail size={14} />
                    <span>Send Meet Invite & Ticket to Email</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setBookingConfirmed(null)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer font-bold pt-1"
                >
                  Reserve another slot
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Local History Section (if user made previous reservations and wants to see them!) */}
        {localBookings.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-900/60 text-left">
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest mb-4 flex items-center justify-between">
              <span>Your Active Web Bookings list ({localBookings.length})</span>
              <span className="text-[9px] text-slate-500 bg-slate-900 px-2 py-1 rounded">Local Storage Enabled</span>
            </h3>
            <div className="space-y-3">
              {localBookings.map((b) => (
                <div 
                  key={b.id}
                  className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-400 font-bold">{b.refNo}</span>
                      <span className="text-slate-500">|</span>
                      <strong className="text-slate-200">{b.name}</strong>
                    </div>
                    <p className="text-slate-400 mt-1 font-semibold">{b.sport}</p>
                    {b.email && (
                      <p className="text-[10px] text-blue-300 font-medium mt-0.5">
                        📧 Contact Email: {b.email}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-500 mt-1">
                      📅 {b.date} • ⏰ {b.time} {b.meetLink && <span className="text-blue-400 ml-1 bg-blue-950/80 px-1.5 py-0.5 rounded text-[9px] font-bold border border-blue-900/40">📹 Video Call Enabled</span>}
                    </p>
                  </div>
                  <div className="flex gap-2 self-stretch sm:self-auto justify-end flex-wrap items-center">
                    {b.email && (
                      <a
                        href={getEmailShareLink(b)}
                        className="bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-2 rounded-lg font-bold border border-blue-500/20 transition-all text-[11px]"
                      >
                        Resend Email
                      </a>
                    )}
                    <a
                      href={getWhatsAppSubmitLink(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white px-3 py-2 rounded-lg font-bold border border-emerald-500/20 transition-all text-[11px]"
                    >
                      Resend WhatsApp
                    </a>
                    <button
                      onClick={() => deleteLocalBooking(b.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/20 rounded-lg cursor-pointer transition-colors"
                      title="Delete log"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
