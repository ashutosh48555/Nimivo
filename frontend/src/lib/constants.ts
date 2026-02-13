import type { ServiceCategory } from '@/types';

export const APP_NAME = 'FastPAYS';
export const APP_TAGLINE = 'Get Professional Help Within 15 Minutes';
export const APP_DESCRIPTION =
  'Lightning-fast home services with guaranteed arrival in 15 minutes. Book cleaning, plumbing, electrical & more.';

export const SERVICE_CATEGORIES: {
  value: ServiceCategory;
  label: string;
  icon: string;
  color: string;
}[] = [
  { value: 'cleaning', label: 'Deep Cleaning', icon: '🏠', color: '#EC4899' },
  { value: 'plumbing', label: 'Plumbing', icon: '🔧', color: '#06B6D4' },
  { value: 'electrical', label: 'Electrician', icon: '⚡', color: '#F59E0B' },
  { value: 'carpentry', label: 'Carpentry', icon: '🪚', color: '#8B5CF6' },
  { value: 'painting', label: 'Painting', icon: '🎨', color: '#F97316' },
  { value: 'salon', label: 'Salon at Home', icon: '✂️', color: '#A855F7' },
];

export const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Deep Cleaning',
    description:
      'Professional deep cleaning for your entire home. Includes kitchen, bathrooms, bedrooms, and living areas.',
    category: 'cleaning' as ServiceCategory,
    basePrice: 499,
    estimatedDurationMinutes: 120,
    iconUrl: '/icons/cleaning.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Plumbing',
    description:
      'Expert plumbing services for leaks, clogs, pipe repairs, and installations.',
    category: 'plumbing' as ServiceCategory,
    basePrice: 349,
    estimatedDurationMinutes: 60,
    iconUrl: '/icons/plumbing.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Electrician',
    description:
      'Licensed electricians for wiring, repairs, installations, and safety inspections.',
    category: 'electrical' as ServiceCategory,
    basePrice: 399,
    estimatedDurationMinutes: 90,
    iconUrl: '/icons/electrical.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Carpentry',
    description:
      'Skilled carpenters for furniture repair, woodwork, installations, and custom builds.',
    category: 'carpentry' as ServiceCategory,
    basePrice: 599,
    estimatedDurationMinutes: 150,
    iconUrl: '/icons/carpentry.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Painting',
    description:
      'Professional interior and exterior painting with premium paints and clean finishes.',
    category: 'painting' as ServiceCategory,
    basePrice: 799,
    estimatedDurationMinutes: 180,
    iconUrl: '/icons/painting.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Salon at Home',
    description:
      'Professional beauty and grooming services at your doorstep. Haircuts, facials, and more.',
    category: 'salon' as ServiceCategory,
    basePrice: 449,
    estimatedDurationMinutes: 90,
    iconUrl: '/icons/salon.svg',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Priya Sharma',
    city: 'Mumbai',
    rating: 5,
    text: 'FastPAYS saved my weekend! The plumber arrived in 11 minutes and fixed my leak in no time. Incredible service.',
    avatar: '',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    city: 'Delhi',
    rating: 5,
    text: 'Booked an electrician at 9 PM when my power went out. Someone was at my door in 13 minutes. Lifesaver!',
    avatar: '',
  },
  {
    id: '3',
    name: 'Ananya Patel',
    city: 'Bangalore',
    rating: 5,
    text: 'The deep cleaning team was professional and thorough. My apartment looks brand new. Will definitely book again.',
    avatar: '',
  },
  {
    id: '4',
    name: 'Vikram Singh',
    city: 'Noida',
    rating: 4,
    text: 'Great carpentry work on my bookshelf. The provider was skilled and finished ahead of schedule. Very happy.',
    avatar: '',
  },
  {
    id: '5',
    name: 'Meera Iyer',
    city: 'Hyderabad',
    rating: 5,
    text: 'Salon at home was such a treat. No more waiting in queues! The stylist was talented and friendly.',
    avatar: '',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Choose Your Service',
    description:
      'Browse our catalog and pick the service you need. From cleaning to electrical — we have you covered.',
  },
  {
    step: 2,
    title: 'Get Matched With a Pro',
    description:
      'Our smart system finds the nearest verified professional and assigns them to your booking instantly.',
  },
  {
    step: 3,
    title: 'Service at Your Doorstep',
    description:
      'Track your provider in real-time. They arrive within 15 minutes and get the job done right.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: '15-Minute Guarantee',
    description:
      'We promise your service provider will arrive within 15 minutes of booking. Speed is our superpower.',
    icon: 'clock',
  },
  {
    title: 'Verified Professionals',
    description:
      'Every provider is background-checked, skill-verified, and rated by real customers. Your safety matters.',
    icon: 'shield-check',
  },
  {
    title: 'Transparent Pricing',
    description:
      'No hidden fees, no surprises. See your total before you book. What you see is what you pay.',
    icon: 'indian-rupee',
  },
  {
    title: 'Real-Time Tracking',
    description:
      "Watch your provider's live location on the map. Know exactly when they'll arrive at your door.",
    icon: 'map-pin',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How fast will my service provider arrive?',
    answer:
      'We guarantee arrival within 15 minutes of booking confirmation. Our smart dispatch system finds the nearest available verified professional and assigns them to your booking instantly.',
  },
  {
    question: 'What services does FastPAYS offer?',
    answer:
      'We offer 6 core services: Deep Cleaning (₹499), Plumbing (₹349), Electrician (₹399), Carpentry (₹599), Painting (₹799), and Salon at Home (₹449). Each service is performed by verified professionals.',
  },
  {
    question: 'How is the pricing calculated?',
    answer:
      'Our pricing is transparent and upfront. Each service has a base price that includes the standard scope of work. There are no hidden fees — the price you see at booking is what you pay.',
  },
  {
    question: 'Can I cancel a booking?',
    answer:
      'Yes, you can cancel a booking anytime before the provider arrives at your location. There are no cancellation charges for cancellations made before provider arrival.',
  },
  {
    question: 'How are service providers vetted?',
    answer:
      'All our service providers undergo thorough background checks, skill assessments, and identity verification. They are continuously rated by customers, and we maintain a minimum 4.0 star rating standard.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major payment methods including UPI, credit/debit cards, net banking, and cash on delivery. Payments are processed securely through our payment gateway.',
  },
];

export const TRUST_BADGES = [
  '15-Min Arrival',
  'Verified Pros',
  'Transparent Pricing',
  'Money-Back Guarantee',
];
