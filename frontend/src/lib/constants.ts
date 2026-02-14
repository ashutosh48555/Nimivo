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

// ─── Urban Company–Style Service Data ─────────────────────────────

export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: string;
  price: number;
  originalPrice?: number;
  badge?: string;
}

export const MOST_BOOKED: ServiceItem[] = [
  { id: 'mb-1', name: 'House Cleaning', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=400&q=80', rating: 4.80, reviewCount: '2.3M', price: 99, originalPrice: 245, badge: 'Arrives in 10 min' },
  { id: 'mb-2', name: 'Intense Bathroom Cleaning', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80', rating: 4.80, reviewCount: '4.4M', price: 419, originalPrice: 519 },
  { id: 'mb-3', name: 'Full Home Deep Cleaning', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', rating: 4.82, reviewCount: '4.4M', price: 838, originalPrice: 1038 },
  { id: 'mb-4', name: 'Haircut for Men', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80', rating: 4.87, reviewCount: '470K', price: 299 },
  { id: 'mb-5', name: 'Geyser Check-up', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=400&q=80', rating: 4.72, reviewCount: '112K', price: 249 },
  { id: 'mb-6', name: 'AC Service & Repair', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', rating: 4.77, reviewCount: '160K', price: 399 },
];

export const CLEANING_SERVICES: ServiceItem[] = [
  { id: 'cl-1', name: 'Intense Bathroom Cleaning', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80', rating: 4.80, reviewCount: '4.4M', price: 419, originalPrice: 519 },
  { id: 'cl-2', name: 'Full Home Deep Cleaning', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', rating: 4.82, reviewCount: '4.4M', price: 838, originalPrice: 1038 },
  { id: 'cl-3', name: 'Kitchen Deep Cleaning', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80', rating: 4.84, reviewCount: '169K', price: 399 },
  { id: 'cl-4', name: 'Fridge Cleaning', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80', rating: 4.83, reviewCount: '131K', price: 399 },
  { id: 'cl-5', name: 'Sofa & Upholstery Cleaning', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80', rating: 4.79, reviewCount: '142K', price: 549 },
];

export const APPLIANCE_SERVICES: ServiceItem[] = [
  { id: 'ap-1', name: 'AC Service & Repair', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', rating: 4.77, reviewCount: '160K', price: 399 },
  { id: 'ap-2', name: 'Geyser Check-up', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=400&q=80', rating: 4.72, reviewCount: '112K', price: 249 },
  { id: 'ap-3', name: 'Washing Machine Repair', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', rating: 4.77, reviewCount: '354K', price: 199 },
  { id: 'ap-4', name: 'TV Check-up & Repair', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80', rating: 4.77, reviewCount: '160K', price: 249 },
  { id: 'ap-5', name: 'Water Purifier Service', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&q=80', rating: 4.76, reviewCount: '82K', price: 599 },
  { id: 'ap-6', name: 'Microwave Repair', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=400&q=80', rating: 4.75, reviewCount: '86K', price: 199 },
];

export const REPAIR_SERVICES: ServiceItem[] = [
  { id: 'rp-1', name: 'Plumber Consultation', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=80', rating: 4.73, reviewCount: '109K', price: 49 },
  { id: 'rp-2', name: 'Electrician Visit', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', rating: 4.75, reviewCount: '88K', price: 49 },
  { id: 'rp-3', name: 'Carpenter Work', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80', rating: 4.83, reviewCount: '98K', price: 79 },
  { id: 'rp-4', name: 'Decor Installation', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80', rating: 4.79, reviewCount: '95K', price: 129 },
  { id: 'rp-5', name: 'Switchboard Repair', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', rating: 4.83, reviewCount: '54K', price: 99 },
  { id: 'rp-6', name: 'Door Lock Installation', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=400&q=80', rating: 4.79, reviewCount: '95K', price: 129 },
];

export const SALON_MEN: ServiceItem[] = [
  { id: 'sm-1', name: 'Haircut for Men', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80', rating: 4.87, reviewCount: '470K', price: 299 },
  { id: 'sm-2', name: 'Beard Trimming & Styling', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80', rating: 4.86, reviewCount: '140K', price: 249 },
  { id: 'sm-3', name: 'Haircut for Kids', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80', rating: 4.85, reviewCount: '105K', price: 299 },
  { id: 'sm-4', name: 'Clean Shave', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=400&q=80', rating: 4.84, reviewCount: '69K', price: 249 },
  { id: 'sm-5', name: 'Head, Neck & Shoulder Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80', rating: 4.82, reviewCount: '51K', price: 349 },
];

export const SALON_WOMEN: ServiceItem[] = [
  { id: 'sw-1', name: 'Facial & Cleanup', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80', rating: 4.85, reviewCount: '520K', price: 599, originalPrice: 799 },
  { id: 'sw-2', name: 'Hair Spa Treatment', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', rating: 4.83, reviewCount: '380K', price: 899 },
  { id: 'sw-3', name: 'Manicure & Pedicure', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80', rating: 4.81, reviewCount: '290K', price: 499 },
  { id: 'sw-4', name: 'Full Body Waxing', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80', rating: 4.80, reviewCount: '450K', price: 349 },
  { id: 'sw-5', name: 'Bridal Makeup', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=400&q=80', rating: 4.88, reviewCount: '89K', price: 4999 },
];
