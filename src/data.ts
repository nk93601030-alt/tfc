import { Service, GalleryItem, Coach, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'adaptive-gym',
    title: 'Adaptive Gym Unit',
    category: 'specialized',
    tag: 'Specialized',
    description: 'Wheelchair-accessible gym area equipped with specialized training equipment and safety vests.',
    fullDetails: 'Our adaptive gym offers specialized resistance bands, custom high-support seats, wide-base treadmills, and fully adjustable weight machines. Designed specifically for individuals with limited mobility, hemiplegia, or neurological conditions to build strength and coordination safely.',
    benefits: ['Improves muscle tone and joint mobility', 'Increases muscular endurance', 'Enhancing daily life functional independence'],
    equipment: ['Adjustable Pulley Systems', 'Safety Harness Gantry', 'Pneumatic Strength Trainers', 'Broad Standing Platforms'],
    image: '/service1.jpg'
  },
  {
    id: 'sensory-integration',
    title: 'Sensory Integration',
    category: 'child',
    tag: 'Child Care',
    description: 'Specialized physical development programs for children with learning differences, ADHD, and autism.',
    fullDetails: 'Active integration using customized sensory paths, high-visibility balance beams, tactile stimulation spheres, and playful coordination games. Guided by highly patient physical educators who make fitness a joyful social experience.',
    benefits: ['Improves sensory processing and regulation', 'Develops spatial awareness and balance', 'Boosts social communication and confidence'],
    equipment: ['Multi-Tactile Stepping Stones', 'Weighted Vests & Pillows', 'Safe Foam Obstacle Courses', 'Cozy Swing Pods'],
    image: '/service2.jpg'
  },
  {
    id: 'hydrotherapy',
    title: 'Hydro Therapy Pool',
    category: 'therapeutic',
    tag: 'Therapeutic',
    description: 'Gentle, anti-gravity aquatic setups for joint pain reduction, muscle toning, and rehabilitation.',
    fullDetails: 'A temperature-controlled rehabilitation pool equipped with double-rail safety steps, float assists, and gentle water jets. Hydrostatic pressure provides instant joint relief, ideal for older adults with arthritis or children with cerebral palsy.',
    benefits: ['Reduces joint stress by up to 90%', 'Relieves chronic arthritic pain', 'Facilitates gait training with zero fall risk'],
    equipment: ['Underwater Parallel Walkways', 'Floating Parallel Supports', 'Full-Body Floatation Splints', 'Resistance Hydro Dumbles'],
    image: '/service3.jpg'
  },
  {
    id: 'senior-mobility',
    title: 'Active Aging & Fall Prevention',
    category: 'general',
    tag: 'Senior Citizens',
    description: 'Strength, balance, and flexibility classes specifically structured for elders to live independently.',
    fullDetails: 'Our senior wellness programs combine low-impact cardio, bone-density strengthening, and targeted vestibular exercises to eliminate fall hazards. Perfect for our older Pollachi elders to maintain high vitality.',
    benefits: ['Drastically lowers risk of accidental falls', 'Improves heart and lung capacity', 'Keeps joints lubricated and highly flexible'],
    equipment: ['Seated Balance Discs', 'Loop Resistance Cables', 'Soft Medical Medicine Balls', 'Elders-safe Stability Bars'],
    image: '/service4.jpg'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    src: '/gallery1.jpg',
    alt: 'Inclusive children sports and stretching',
    category: 'sensory',
    caption: 'Safe developmental and dynamic stretching session with specialists.'
  },
  {
    id: 'gal-2',
    src: '/gallery2.jpg',
    alt: 'Friendly active support programs',
    category: 'gym',
    caption: 'Our clean, safe obstacle courses designed for children with autism.'
  },
  {
    id: 'gal-3',
    src: '/gallery3.jpg',
    alt: 'Rehabilitation training setup',
    category: 'gym',
    caption: 'Wheelchair-accessible gym station equipped with adjustable weights.'
  },
  {
    id: 'gal-4',
    src: '/gallery4.jpg',
    alt: 'Senior citizen fitness class',
    category: 'classes',
    caption: 'Gentle morning yoga and core stability session for older adults.'
  },
  {
    id: 'gal-5',
    src: '/gallery5.jpg',
    alt: 'Therapeutic and sensory guidance',
    category: 'sensory',
    caption: 'One-on-one sensory playground guided by supportive therapists.'
  },
  {
    id: 'gal-6',
    src: '/gallery6.jpg',
    alt: 'Hydrotherapeutics guidance',
    category: 'therapy',
    caption: 'Our heated hydrotherapy tank designed for gait exercise and rehabilitation.'
  }
];

export const COACHES: Coach[] = [
  {
    name: 'STEVAK.M',
    role: 'Senior TFC Coach',
    specialty: 'National Handball Player',
    image: '/coach1.jpg'
  },
  {
    name: 'PRADEEP.U',
    role: 'TFC Coach',
    specialty: 'National Handball Player',
    image: '/coach2.jpg'
  },
  {
    name: 'NAVEEN PRANESH.M',
    role: 'TFC Coach',
    specialty: 'National Handball Player',
    image: '/coach3.jpg'
  },
  {
    name: 'KAVIARASAN.R',
    role: 'TFC Coach',
    specialty: 'National Handball Player',
    image: '/coach4.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Nandha Kumar S., M.Pharm (Pharmacology)',
    relation: 'Parent of 7yo Kavin (Autism Spectrum)',
    quote: 'Finding a place where therapists understand and genuinely care for kids with learning difficulties is rare in Pollachi. TFC has changed Kavin’s coordination completely. He loves the sensory obstacles!',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'NAVEEN KUMAR S',
    relation: 'Senior Member (Age 68)',
    quote: 'My arthritis made simple steps painful. Since starting Hydro Therapy and the Fall Prevention exercises here, I walk with absolute confidence. TFC is truly Pollachi’s blessing.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'GANESH',
    relation: 'Consulting Orthopedic Practitioner',
    quote: 'I highly recommend TFC to my rehabilitation patients. Their accessibility layout, professional harness gantries, and licensed sports therapists provide unmatched safety guidelines.',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Does Together Fitness Centre offer specialized equipment for wheelchair-bound individuals?',
    a: 'Yes, TFC is 100% architecturally accessible. We have step-free ramps, wide pathways, sliding toilet entries, custom pulleys, and safety chest-harness gantries that enable wheelchair athletes to perform secure upper and lower body training.'
  },
  {
    q: 'How does the booking system for trial classes work?',
    a: 'You can reserve a real-time slot through our integrated digital matrix. Once selected, it formats a WhatsApp inquiry with your preferred date and session. You can send it directly to our manager to lock in the confirmation.'
  },
  {
    q: 'Are coaches certified to train children with sensory or cognitive differences?',
    a: 'Absolutely. Our physical educators work alongside certified pediatric physiotherapists. We maintain a patient, encouraging 1-on-1 atmosphere using clear visual schedules and highly rewarding step goals.'
  },
  {
    q: 'What are TFC’s operation hours in Pollachi?',
    a: 'We are open Monday to Saturday from 6:00 AM to 11:30 AM (Morning Batch) and 4:00 PM to 9:00 PM (Evening Batch). Sunday is reserved for intensive deep sanitization.'
  }
];

export const TFC_LOCATION = {
  // Edit these coordinates to update the Google Maps pointer and directions!
  latitude: '10.6623944',
  longitude: '77.0241621',

  // Edit this address to update it across the entire website instantly!
  address: 'TFC home, near Saibaba Kovil, Vinayaga garden, Rathinasabapathy Puram, Pollachi, Tamil Nadu 642001',

  // Edit these numbers to change phone/WhatsApp info globally
  phone: '+91 63696 41419',
  email: 'tfchome2026@gmail.com',
  whatsappNumber: '918754311419',
  instagram: 'https://www.instagram.com/together_fitness_centre_tfc?igsh=MWh0NWI4YzFsZGdqZw=='
};

