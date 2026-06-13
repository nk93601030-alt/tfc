export interface Service {
  id: string;
  title: string;
  category: 'specialized' | 'child' | 'therapeutic' | 'general';
  tag: string;
  description: string;
  fullDetails: string;
  benefits: string[];
  equipment: string[];
  image: string;
}

export interface Coach {
  name: string;
  role: string;
  specialty: string;
  experience?: string;
  image: string;
}

export interface TimeSlot {
  time: string;
  isOccupied: boolean;
  notes?: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceId: string;
  status: 'Pending WhatsApp Confirmation' | 'Confirmed';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'all' | 'gym' | 'sensory' | 'classes' | 'therapy';
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  relation: string; // e.g., "Parent of Kavitha", "Senior Member"
  quote: string;
  rating: number;
}
