import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Dumbbell, Compass, RefreshCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { TFC_LOCATION } from '../data';

export default function BmiCalculator() {
  const [profile, setProfile] = useState<'senior' | 'child' | 'general'>('child');
  const [weight, setWeight] = useState<string>('30');
  const [height, setHeight] = useState<string>('120');
  const [age, setAge] = useState<string>('8');
  const [goal, setGoal] = useState<string>('sensory');
  const [assessmentResult, setAssessmentResult] = useState<any | null>(null);
  const [displayBmi, setDisplayBmi] = useState<number>(0);

  // Set default values when profile changes to make it quick and realistic
  const handleProfileChange = (p: 'senior' | 'child' | 'general') => {
    setProfile(p);
    setAssessmentResult(null);
    setDisplayBmi(0);
    if (p === 'child') {
      setWeight('28');
      setHeight('125');
      setAge('8');
      setGoal('sensory');
    } else if (p === 'senior') {
      setWeight('68');
      setHeight('162');
      setAge('68');
      setGoal('balance');
    } else {
      setWeight('72');
      setHeight('170');
      setAge('42');
      setGoal('rehab');
    }
  };

  const calculateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // in meters
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const bmi = w / (h * h);
    let bmiCategory = '';
    let advice = '';
    let recommendedServices: string[] = [];
    let frequency = '';

    if (profile === 'child') {
      if (bmi < 14) bmiCategory = 'Underweight (Child Percentile)';
      else if (bmi > 21) bmiCategory = 'Overweight (Child Percentile)';
      else bmiCategory = 'Healthy weight indicator';

      frequency = '3 times a week (45 mins sessions)';
      if (goal === 'sensory') {
        advice = 'Recommended: Focus on colorful coordination sensory paths. This helps build core cerebellar pathways to regulate stimulus spikes and elevate focus.';
        recommendedServices = ['Sensory Integration Unit', 'Playful coordination obstacles'];
      } else {
        advice = 'Recommended: Gentle pediatric muscle toning and swimming play. Encourages motor motor skills and leg strength.';
        recommendedServices = ['Pediatric Hydro Therapy', 'Active Child Gym'];
      }
    } else if (profile === 'senior') {
      // Seniors have different ideal BMI ranges for bone durability
      if (bmi < 22) bmiCategory = 'Under-cushion range (Ideal is 22-27 for seniors)';
      else if (bmi > 28) bmiCategory = 'High pressure range';
      else bmiCategory = 'Optimal cushion range (Protects joints)';

      frequency = '2 to 3 times a week (Sub-maximal heart load)';
      if (goal === 'balance') {
        advice = 'Recommended: Focus on vestibular balance drills, gentle side walking with supports, and low-impact leg resistance. Avoid heavy jumping loads.';
        recommendedServices = ['Active Aging & Fall Prevention', 'Vestibular Balance Platforms'];
      } else {
        advice = 'Recommended: Buoyant muscle therapy. Water reduces joint gravity pressure completely, enabling full range of motion safely.';
        recommendedServices = ['Hydro Therapy Pool', 'Anti-Gravity parallel walking'];
      }
    } else {
      if (bmi < 18.5) bmiCategory = 'Underweight';
      else if (bmi > 24.9) bmiCategory = 'Overweight';
      else bmiCategory = 'Healthy range';

      frequency = '3 to 4 times a week (Progressive strength load)';
      advice = 'Recommended: Structured orthopedic recovery. Gentle stretching combined with safe mechanical pulley work to restore native joint mobility.';
      recommendedServices = ['Adaptive Gym Unit', 'Targeted neuromuscular flexes'];
    }

    setAssessmentResult({
      bmi: bmi.toFixed(1),
      bmiCategory,
      advice,
      frequency,
      recommendedServices,
      goalText: {
        sensory: 'Sensory Integration & Attention',
        pediatric: 'Pediatric Motor Strengthening',
        balance: 'Elders Fall Prevention & Stability',
        stiffness: 'Joint Stiffness Release',
        rehab: 'Orthopedic Muscle Rehabilitation'
      }[goal] || goal
    });
  };

  // High performance cubic easeOut count-up timer triggered on calculation
  useEffect(() => {
    if (assessmentResult && assessmentResult.bmi) {
      const target = parseFloat(assessmentResult.bmi);
      let start = 0;
      const duration = 800; // ms
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = start + ease * (target - start);
        setDisplayBmi(parseFloat(currentVal.toFixed(1)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [assessmentResult]);

  // Compile Tamil & English text for pre-filling WhatsApp easily
  const getWhatsAppLink = () => {
    if (!assessmentResult) return '';
    const text = `Dear TFC Team, I did an Inclusive Fitness Assessment on your website:
Profile: ${profile.toUpperCase()}
Age: ${age} years old
Approx index: ${assessmentResult.bmi} (${assessmentResult.bmiCategory})
Focus Goal: ${assessmentResult.goalText}
Recommended pathway: ${assessmentResult.recommendedServices.join(' & ')}
Please tell me if I can visit your centre in Pollachi for a trial!`;
    return `https://wa.me/${TFC_LOCATION.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="assessment" className="py-24 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-[45px] md:rounded-[65px] mx-4 mb-24 overflow-hidden relative border border-slate-900 shadow-xl">
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Widget Heading */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-blue-400 font-extrabold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-4.5 py-2.5 rounded-full inline-block shadow-lg"
          >
            🩺 TFC Smart Wellness Pathway
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-display font-extrabold mt-4 tracking-tight uppercase"
          >
            Inclusive <span className="text-blue-400">Fitness Assessment</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-sm mt-3.5 max-w-xl mx-auto font-medium leading-relaxed"
          >
            Get instant customized safety guidelines, ideal index evaluation, and recommended therapeutic routines tailored for your age group and fitness goals. No blood testing required!
          </motion.p>
        </div>

        {/* Profiles Selector */}
        <div className="flex justify-center gap-3.5 mb-12 flex-wrap">
          <button
            onClick={() => handleProfileChange('child')}
            className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${profile === 'child'
              ? 'bg-blue-600 border border-blue-500 shadow-lg shadow-blue-500/25 text-white'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-350 border border-slate-800/80'
              }`}
            id="profile-tab-child"
          >
            👦 Children Development (Age 3-15)
          </button>
          <button
            onClick={() => handleProfileChange('senior')}
            className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${profile === 'senior'
              ? 'bg-blue-600 border border-blue-500 shadow-lg shadow-blue-500/25 text-white'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-350 border border-slate-800/80'
              }`}
            id="profile-tab-senior"
          >
            🧓 Elders Strength (Age 55+)
          </button>
          <button
            onClick={() => handleProfileChange('general')}
            className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${profile === 'general'
              ? 'bg-blue-600 border border-blue-500 shadow-lg shadow-blue-500/25 text-white'
              : 'bg-slate-900/60 hover:bg-slate-900 text-slate-350 border border-slate-800/80'
              }`}
            id="profile-tab-general"
          >
            💪 Adult Rehab & Mobility
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">

          {/* Left Block - Interactive Form */}
          <div className="md:col-span-5 bg-slate-950/40 backdrop-blur-md p-7.5 rounded-[32px] border border-white/10 text-left shadow-2xl relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm font-black text-slate-200 uppercase tracking-wider mb-5 flex items-center gap-2"
              >
                <Activity size={16} className="text-blue-400" />
                Body Parameters
              </motion.h3>

              <form onSubmit={calculateAssessment} className="space-y-4">
                {/* Age & Height */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                      Age (Years)
                    </label>
                    <motion.input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min={profile === 'child' ? '3' : profile === 'senior' ? '55' : '15'}
                      max={profile === 'child' ? '17' : profile === 'senior' ? '105' : '65'}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full bg-slate-800/65 font-bold p-3 rounded-xl border border-slate-700/80 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.30)] transition-all duration-300 text-sm"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                      Height (cms)
                    </label>
                    <motion.input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min="70"
                      max="220"
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full bg-slate-800/65 font-bold p-3 rounded-xl border border-slate-700/80 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_15px_rgba(59,130,246,0.30)] transition-all duration-300 text-sm"
                    />
                  </motion.div>
                </div>

                {/* Weight */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-1.5 flex justify-between">
                    <span>Weight (kgs)</span>
                    <motion.span
                      className="text-blue-400 font-bold"
                      key={weight}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {weight} kg
                    </motion.span>
                  </label>
                  <motion.input
                    type="range"
                    min={profile === 'child' ? '10' : '35'}
                    max={profile === 'child' ? '70' : '140'}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </motion.div>

                {/* Special Goal focus selection */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                    Target Therapy / Comfort Priority
                  </label>
                  <motion.select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full bg-slate-800/65 font-bold p-3.5 rounded-xl border border-slate-700/80 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-xs"
                  >
                    {profile === 'child' && (
                      <>
                        <option value="sensory">Sensory Integration (Autism/ADHD Focus)</option>
                        <option value="pediatric">Coordination & Leg Balance Strengthening</option>
                        <option value="stiffness">Spasticity Relief & Safe Stretching</option>
                      </>
                    )}
                    {profile === 'senior' && (
                      <>
                        <option value="balance">Fall Prevention & Vestibular Stability</option>
                        <option value="stiffness">Arthritis Relief & Warm Hydro Pool Walks</option>
                        <option value="heart">Low-impact Cardio & Lung Vitality</option>
                      </>
                    )}
                    {profile === 'general' && (
                      <>
                        <option value="rehab">Neuromuscular Rehabilitation (Post-Stroke, Injury)</option>
                        <option value="stiffness">Chronic Muscle Strength & Posture Fix</option>
                        <option value="balance">Core Gait Balance & Gait Training</option>
                      </>
                    )}
                  </motion.select>
                </motion.div>

                {/* Submit trigger with pulse on tap */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all cursor-pointer flex justify-center items-center gap-2 shadow-md shadow-blue-600/10"
                  id="assessment-submit"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  Calculate Safe Pathway
                </motion.button>
              </form>
            </div>
          </div>

          {/* Right Block - Diagnostic Pathway Results with category color shifts */}
          <div className="md:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {assessmentResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-6 md:p-8 rounded-[32px] border border-white/10 bg-slate-950/45 backdrop-blur-md text-left space-y-6 h-full flex flex-col justify-between shadow-2xl"
                  id="assessment-result-card"
                >
                  <div>
                    {/* Diagnostic Score Circle with active count-up values */}
                    <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                      <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] text-blue-400 font-extrabold uppercase leading-none">BMI</span>
                        <span className="text-xl font-black mt-0.5 text-blue-350">{displayBmi}</span>
                      </div>
                      <div>
                        <span className="text-[9px] bg-blue-500/10 border border-blue-500/25 text-blue-400 uppercase font-black px-2.5 py-1 rounded-md tracking-wider">
                          Result State
                        </span>
                        <p className="text-base font-extrabold mt-1.5 text-slate-100">{assessmentResult.bmiCategory}</p>
                      </div>
                    </div>

                    {/* Warm summary statement */}
                    <div className="mt-5 space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Therapist's Path Guidance:
                        </h4>
                        <p className="text-xs sm:text-sm mt-2 text-slate-300 leading-relaxed font-normal bg-white/5 p-4.5 rounded-2xl border border-white/5">
                          {assessmentResult.advice}
                        </p>
                      </div>

                      {/* Best Recommended services matches lists */}
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Suited TFC Units:
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {assessmentResult.recommendedServices.map((srv: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-white/5 text-slate-205 font-bold px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Suggested Frequency:
                        </h4>
                        <p className="text-xs font-bold text-slate-200 mt-1">
                          ⚡ {assessmentResult.frequency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside result card */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                      id="assessment-whatsapp"
                    >
                      <span>Share Results on WhatsApp</span>
                      <ChevronRight size={14} />
                    </a>
                    <button
                      onClick={() => setAssessmentResult(null)}
                      className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs text-slate-400 hover:text-white transition-all cursor-pointer font-bold border border-white/5 shrink-0"
                    >
                      Reset Tool
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="bg-slate-950/20 p-8 rounded-[32px] border border-white/5 aspect-video flex flex-col items-center justify-center text-center space-y-4 h-full shadow-inner">
                  <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg">
                    <Compass className="text-blue-400 animate-spin" size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-200">Waiting for parameters</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto leading-relaxed">
                      Select your target age group, enter the height and weight guidelines, and tap "Calculate Safe Pathway" to display.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
