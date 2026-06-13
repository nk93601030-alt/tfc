import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, COACHES, TFC_LOCATION } from '../data';
import { Service, Coach } from '../types';
import { Check, Shield, Award, Users, Pocket, Sparkles, X, ChevronRight, Phone, Plus, Trash2, UserPlus, Briefcase, ExternalLink } from 'lucide-react';

// Helper function to resolve coach avatar automatically based on image paths & name keywords for perfect deployment reliability
function getCoachAvatar(coach: Coach, index: number = 0): string {
  if (!coach) return '';

  const img = (coach.image || '').trim();
  const name = (coach.name || '').toLowerCase();
  
  // 1. If it's a valid remote premium URL (e.g., Unsplash, HTTP/HTTPS), use it!
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }

  // 1b. If it is a custom uploaded local image path (e.g. '/coach1.jpg' or '/coach_new.png')
  if (img.startsWith('/') && img.length > 2) {
    return img;
  }

  // 2. Map offline local placeholders like 'coach1.jpg', 'coach_1.png', 'coach-1', etc. to gorgeous live Unsplash replacements
  const imgLower = img.toLowerCase();
  if (imgLower.includes('coach1') || imgLower.includes('coach_1')) {
    return 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'; // Senior Male Specialist
  }
  if (imgLower.includes('coach2') || imgLower.includes('coach_2')) {
    return 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80'; // Female Dr Specialist
  }
  if (imgLower.includes('coach3') || imgLower.includes('coach_3')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'; // Active Male conditioning
  }

  // 3. Name-based smart matching ("name la vacha athu photo varanum")
  if (name.includes('preethi') || name.includes('raghavan') || name.includes('sundari') || name.includes('priya') || name.includes('female')) {
    return 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80';
  }
  if (name.includes('sundaram') || name.includes('vignesh') || name.includes('stevak') || name.includes('steva') || name.includes('pradeep') || name.includes('naveen') || name.includes('ganesh') || name.includes('nandha') || name.includes('kumar') || name.includes('male')) {
    if (name.includes('stevak') || name.includes('steva')) {
      return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'; // Active Male fitness
    }
    if (name.includes('pradeep')) {
      return 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'; // Rehab portrait
    }
    return 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'; // Male Doctor
  }

  // 4. Stable Hash code fallback if it's none of the above so there's ALWAYS a beautiful photo
  const defaultAvatars = [
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  ];
  let hash = 0;
  const chars = name || 'coach';
  for (let i = 0; i < chars.length; i++) {
    hash = chars.charCodeAt(i) + ((hash << 5) - hash);
  }
  const chosenIdx = Math.abs(hash) % defaultAvatars.length;
  return defaultAvatars[chosenIdx];
}

interface ServicesProps {
  onBookSlotClick: (serviceId: string) => void;
}

export default function Services({ onBookSlotClick }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const [systemCoaches, setSystemCoaches] = useState<Coach[]>(() => {
    const saved = localStorage.getItem('tfc_coaches_v7');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return COACHES;
      }
    }
    return COACHES;
  });

  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [showAddCoachModal, setShowAddCoachModal] = useState<boolean>(false);

  // Form states for adding new coach
  const [newCoachName, setNewCoachName] = useState('');
  const [newCoachRole, setNewCoachRole] = useState('Senior Rehab Trainer');
  const [newCoachSpecialty, setNewCoachSpecialty] = useState('');
  const [newCoachExperience, setNewCoachExperience] = useState('');
  const [newCoachImage, setNewCoachImage] = useState('');

  const saveCoaches = (updated: Coach[]) => {
    setSystemCoaches(updated);
    localStorage.setItem('tfc_coaches_v7', JSON.stringify(updated));
  };

  const handleAddCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoachName.trim()) return;

    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    ];
    const defaultImg = avatars[systemCoaches.length % avatars.length];

    const created: Coach = {
      name: newCoachName,
      role: newCoachRole,
      specialty: newCoachSpecialty || 'General Rehab & Strength Athlete Guidance',
      experience: newCoachExperience || '3+ Years with certified training',
      image: newCoachImage.trim() || defaultImg
    };

    const nextList = [...systemCoaches, created];
    saveCoaches(nextList);

    // Reset Form fields
    setNewCoachName('');
    setNewCoachRole('Senior Rehab Trainer');
    setNewCoachSpecialty('');
    setNewCoachExperience('');
    setNewCoachImage('');
    setShowAddCoachModal(false);
  };

  const handleDeleteCoach = (coachName: string) => {
    const nextList = systemCoaches.filter(c => c.name !== coachName);
    saveCoaches(nextList);
    if (selectedCoach?.name === coachName) {
      setSelectedCoach(null);
    }
  };

  return (
    <section id="services" className="py-20 px-6 bg-white border-y border-slate-100/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block"
          >
            Our Key Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-display font-extrabold text-blue-950 mt-4 leading-tight tracking-tight"
          >
            High-Performance & <br />
            <span className="text-blue-600">Adaptive Environments</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 text-sm mt-4 leading-relaxed font-semibold"
          >
            Every segment in TFC Pollachi is completely custom-fitted to offer non-weight-bearing physical loads, high-contrast visual cues, and maximum comfort for children and seniors.
          </motion.p>
        </div>

        {/* Services Grid list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((srv, index) => {
            // Pick a custom border / icon badge color based on category
            const colors = {
              specialized: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'hover:border-blue-300' },
              child: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'hover:border-teal-300' },
              therapeutic: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'hover:border-indigo-300' },
              general: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'hover:border-amber-300' }
            }[srv.category] || { bg: 'bg-blue-50', text: 'text-blue-700', border: 'hover:border-blue-300' };

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover="hover"
                variants={{
                  hover: {
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 30px rgba(59, 130, 246, 0.08)",
                    borderColor: "rgba(59, 130, 246, 0.4)"
                  }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={srv.id}
                className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm flex flex-col justify-between group h-full"
                id={`service-card-${srv.id}`}
              >
                <div>
                  {/* Image wrapper */}
                  <div className="h-48 md:h-52 bg-slate-105 rounded-2xl overflow-hidden mb-5 relative border border-slate-100">
                    <img 
                      src={srv.image} 
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const fallbacks = [
                          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1597484662317-c87b33069151?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1520222984843-df35ebc0f24d?auto=format&fit=crop&w=800&q=80',
                          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
                        ];
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbacks[index] || fallbacks[0];
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-md bg-white/90 border border-slate-200/40 ${colors.text}`}>
                        {srv.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text Details with rotating icon on hover */}
                  <div className="px-1 pb-4">
                    <div className="flex items-start justify-between min-h-[3rem] gap-2">
                      <h3 className="text-base font-extrabold text-blue-950 group-hover:text-blue-600 transition-colors duration-300">
                        {srv.title}
                      </h3>
                      <motion.div
                        variants={{
                          hover: { rotate: 8, scale: 1.15 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-blue-500 shrink-0 mt-1"
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    </div>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3 font-medium">
                      {srv.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      {srv.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
                          <Check size={12} className="text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="px-1 pb-1 flex items-center justify-between mt-4 pt-4 border-t border-slate-100/80">
                  <button 
                    onClick={() => setSelectedService(srv)}
                    className="text-xs text-slate-500 font-bold hover:text-blue-600 transition-colors cursor-pointer"
                    id={`service-learn-more-${srv.id}`}
                  >
                    Quick Specs
                  </button>
                  <button 
                    onClick={() => onBookSlotClick(srv.id)}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-650 hover:text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    id={`service-view-slot-${srv.id}`}
                  >
                    Select Arena 
                    <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Meet Our Therapists & Coaches */}
        <div className="mt-24 pt-16 border-t border-slate-100 dark:border-slate-900/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-left max-w-2xl"
            >
              <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
                Care & Competence
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 dark:text-white mt-2">
                Meet Our Specialist Coaches
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Every class is closely designed and supervised by certified neuromuscular rehabilitation physiotherapists.
              </p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              onClick={() => setShowAddCoachModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.01] flex items-center gap-1.5 shrink-0"
              id="btn-register-new-coach"
            >
              <UserPlus size={14} />
              <span>Add Specialist Coach</span>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {systemCoaches.map((coach, index) => {
              const avatarUrl = getCoachAvatar(coach, index);
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
                    borderColor: "rgba(59, 130, 246, 0.4)"
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  className="bg-white border border-slate-200/60 rounded-3xl p-5.5 flex flex-col justify-between shadow-sm text-left relative group cursor-pointer overflow-hidden min-h-[420px]"
                  onClick={() => setSelectedCoach(coach)}
                >
                  {/* Decorative glowing gradient circle behind card on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500 -mr-6 -mt-6 pointer-events-none" />

                  {/* Delete button (displays on card hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCoach(coach.name);
                    }}
                    className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-105 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer shadow-sm"
                    title="Remove staff member"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="space-y-5">
                    {/* Big Premium Coach Portrait Container */}
                    <div className="w-full h-52 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm group-hover:shadow-md transition-shadow">
                      <img 
                        src={avatarUrl} 
                        alt={coach.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          const nameLower = coach.name.toLowerCase();
                          if (nameLower.includes('pradeep')) {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                          } else if (nameLower.includes('naveen') || nameLower.includes('pranesh') || nameLower.includes('vignesh')) {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80';
                          } else {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80';
                          }
                        }}
                      />
                      {coach.experience && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent h-20 flex items-end p-4">
                          <span className="text-[10px] font-black uppercase text-white tracking-wider bg-blue-600/90 py-1.5 px-3 rounded-lg backdrop-blur-md border border-blue-400/20 shadow-sm">
                            {coach.experience}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-extrabold text-blue-950 text-base leading-tight group-hover:text-blue-600 transition-colors duration-300">
                          {coach.name}
                        </h4>
                      </div>
                      <span className="inline-block text-blue-655 text-[10px] font-black uppercase tracking-wider bg-blue-50 border border-blue-100/60 px-3 py-1 rounded-lg">
                        {coach.role}
                      </span>
                      <p className="text-slate-605 text-slate-550 text-xs font-semibold leading-relaxed pt-2.5 border-t border-slate-100">
                        <span className="text-blue-500 font-bold block text-[10px] uppercase tracking-wider mb-1">Clinical Specialty</span>
                        💬 {coach.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Details Call To Action button inside Card */}
                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="text-slate-400 font-medium text-[11px]">Available Daily</span>
                    <span className="inline-flex items-center gap-1 bg-blue-50 group-hover:bg-blue-650 group-hover:text-white px-3.5 py-2 rounded-xl transition-all shadow-sm">
                      Consult Now <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Empty dynamic placeholder card when no coaches are remaining */}
            {systemCoaches.length === 0 && (
              <div 
                onClick={() => setShowAddCoachModal(true)}
                className="bg-slate-50 border-2 border-dashed border-slate-200/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100/50 transition-all cursor-pointer md:col-span-3 min-h-[140px]"
              >
                <p className="text-sm font-bold text-slate-500">No coaches listed yet. Let's register standard profile cards!</p>
                <span className="text-xs text-blue-500 hover:underline font-extrabold mt-1 uppercase tracking-wider">Add your first Coach</span>
              </div>
            )}
          </div>
        </div>

        {/* Quality Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 p-6 bg-blue-50/60 dark:bg-slate-900/40 rounded-3xl border border-blue-100 dark:border-slate-800 transition-colors">
          <div className="flex gap-3 items-center text-left p-2">
            <Shield className="text-blue-650 dark:text-blue-400 shrink-0" size={24} />
            <div>
              <p className="font-black text-xs text-blue-950 dark:text-white uppercase leading-none">100% Safe</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Harness & Soft padding</p>
            </div>
          </div>
          <div className="flex gap-3 items-center text-left p-2">
            <Award className="text-blue-650 dark:text-blue-400 shrink-0" size={24} />
            <div>
              <p className="font-black text-xs text-blue-950 dark:text-white uppercase leading-none">Certified Staff</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">MPT & BPEd qualified</p>
            </div>
          </div>
          <div className="flex gap-3 items-center text-left p-2">
            <Users className="text-blue-650 dark:text-blue-400 shrink-0" size={24} />
            <div>
              <p className="font-black text-xs text-blue-950 dark:text-white uppercase leading-none">Individual Care</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">1-on-1 personalized help</p>
            </div>
          </div>
          <div className="flex gap-3 items-center text-left p-2">
            <Sparkles className="text-blue-610 dark:text-blue-400 shrink-0 text-amber-500 dark:text-amber-400 animate-pulse" size={24} />
            <div>
              <p className="font-black text-xs text-blue-950 dark:text-white uppercase leading-none">Tamil & English</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Native bilingual support</p>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Showcase Drawer/Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            key="srv-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)' }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-200 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="h-48 relative bg-slate-100">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-white/90 text-slate-900 p-2 rounded-full cursor-pointer hover:bg-white"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-4 bg-blue-900/90 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                  {selectedService.tag}
                </div>
              </div>

              {/* Text content details */}
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <h3 className="text-xl font-extrabold text-blue-950">{selectedService.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedService.fullDetails}</p>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-xs uppercase font-black tracking-wider text-blue-900">Key Benefits Expected:</h4>
                  <div className="mt-2 space-y-1.5">
                    {selectedService.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety & Gear */}
                <div>
                  <h4 className="text-xs uppercase font-black tracking-wider text-blue-900">Adaptive Equipment Included:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedService.equipment.map((eq, eqIdx) => (
                      <span key={eqIdx} className="text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1.2 rounded-lg">
                        🛡️ {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      onBookSlotClick(selectedService.id);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Reserve In Arena
                  </button>
                  <a
                    href={`https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Together Fitness Centre (TFC) Team,\n\nI am interested in learning more about the costs, packages, and plans for the "${selectedService.title}" program. Kindly share the details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl text-xs font-bold"
                  >
                    <Phone size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Selected Coach Detail Modal */}
        {selectedCoach && (
          <motion.div 
            key="coach-modal-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)' }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCoach(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setSelectedCoach(null)}
                  className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-full cursor-pointer transition-colors"
                  aria-label="Close modal"
                >
                  <X size={14} />
                </button>

                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-md mb-4 ring-4 ring-blue-500/10">
                    <img 
                      src={getCoachAvatar(selectedCoach)} 
                      alt={selectedCoach.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        const nameLower = selectedCoach.name.toLowerCase();
                        if (nameLower.includes('pradeep')) {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                        } else if (nameLower.includes('naveen') || nameLower.includes('pranesh') || nameLower.includes('vignesh')) {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80';
                        } else {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80';
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-blue-950">{selectedCoach.name}</h3>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 border border-blue-100">
                    {selectedCoach.role}
                  </span>
                </div>

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Clinical Specialty</span>
                    <p className="text-sm font-bold text-slate-805 mt-1 leading-snug text-slate-800">
                      🎯 {selectedCoach.specialty}
                    </p>
                  </div>

                  {selectedCoach.experience && (
                    <div>
                      <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Active Track Record</span>
                      <p className="text-xs font-semibold text-slate-650 mt-1 flex items-center gap-1.5 text-slate-600">
                        <Briefcase size={13} className="text-blue-500" /> {selectedCoach.experience}
                      </p>
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-150/80">
                    <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1">Coach Availability</span>
                    <p className="text-[11px] font-bold text-slate-705 text-slate-700 leading-normal">
                      📍 Available at <strong className="text-blue-900">ground 🏃🏻, TFC home</strong> near Saibaba Kovil. Daily sessions scheduled via the booking calendar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Together Fitness Centre (TFC) Team,\n\nI would like to consult or schedule a session with Coach/Trainer ${selectedCoach.name} at TFC Home. Kindly let me know the availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
                  >
                    <Phone size={13} />
                    Consult Custom
                  </a>
                  <button
                    onClick={() => {
                      setSelectedCoach(null);
                      onBookSlotClick('adaptive-gym');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    Secure Booking
                  </button>
                </div>

                {/* Remove option at bottom of view */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteCoach(selectedCoach.name);
                    }}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={11} /> Remove Specialist Staff
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add Coach Profile Registration Modal */}
        {showAddCoachModal && (
          <motion.div 
            key="coach-modal-add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)' }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddCoachModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
                    <UserPlus size={18} className="text-blue-600" />
                    Register Specialist Coach
                  </h3>
                  <button 
                    onClick={() => setShowAddCoachModal(false)}
                    className="bg-slate-50 text-slate-500 p-2 rounded-full cursor-pointer hover:bg-slate-100"
                  >
                    <X size={14} />
                  </button>
                </div>

                <form onSubmit={handleAddCoachSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Coach Name / Degree *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coach K. Sundaram, BPEd, MPT"
                      value={newCoachName}
                      onChange={(e) => setNewCoachName(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Professional Role / Title *
                    </label>
                    <select
                      value={newCoachRole}
                      onChange={(e) => setNewCoachRole(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Lead Physiotherapist & Rehabilitation Director">Lead Physiotherapist & Rehab Director</option>
                      <option value="Sensory Integration Specialist">Sensory Integration Specialist</option>
                      <option value="Adaptive Gym Facilitator">Adaptive Gym Facilitator</option>
                      <option value="Senior Pediatric Rehabilitation Coach">Senior Pediatric Rehabilitation Coach</option>
                      <option value="Clinical Fitness Therapist">Clinical Fitness Therapist</option>
                      <option value="Senior Rehab Trainer">Senior Rehab Trainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Clinical Specialty / Certifications *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Neuromuscular Rehab & Senior Mobility Expert"
                      value={newCoachSpecialty}
                      onChange={(e) => setNewCoachSpecialty(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Experience Track *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12+ Years with special-needs rehabilitation"
                      value={newCoachExperience}
                      onChange={(e) => setNewCoachExperience(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Profile Photo URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={newCoachImage}
                      onChange={(e) => setNewCoachImage(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-805 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    
                    {/* Quick Selection Avatars Grid */}
                    <div className="mt-3">
                      <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                        ⚡ Quick Select Premium Coach Avatars:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=150&h=150&q=80', label: 'Female Coach' },
                          { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&h=150&q=80', label: 'Male Fitness' },
                          { url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=150&h=150&q=80', label: 'Female Doctor' },
                          { url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80', label: 'Male Therapist' },
                          { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80', label: 'Senior Female' },
                          { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80', label: 'Senior Rehab' },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setNewCoachImage(item.url)}
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 shrink-0 ${
                              newCoachImage === item.url 
                                ? 'border-blue-600 ring-2 ring-blue-500/25 scale-105' 
                                : 'border-slate-200 hover:border-slate-400'
                            }`}
                            title={item.label}
                          >
                            <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <span className="block text-[9px] text-slate-400 mt-2">
                      💡 Click any premium avatar above to instant-apply or paste any custom web image address (.jpg/.png URL).
                    </span>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddCoachModal(false)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Confirm and Save
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
