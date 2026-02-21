import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Clock, Shield, CheckCircle, ShoppingCart,
  ChevronRight, Zap, Users, IndianRupee, MapPin, ThumbsUp,
} from 'lucide-react';
import {
  MOCK_SERVICES, SERVICE_CATEGORIES,
  MOST_BOOKED, CLEANING_SERVICES, APPLIANCE_SERVICES,
  REPAIR_SERVICES, SALON_MEN, SALON_WOMEN,
} from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

/* ── Build a catalogue lookup ─────────────────────── */
const ALL_SERVICE_ITEMS: ServiceItem[] = [
  ...MOST_BOOKED, ...CLEANING_SERVICES, ...APPLIANCE_SERVICES,
  ...REPAIR_SERVICES, ...SALON_MEN, ...SALON_WOMEN,
];

// Deduplicate
const UNIQUE_ITEMS = Array.from(
  new Map(ALL_SERVICE_ITEMS.map((i) => [i.id, i])).values()
);

/* ── Details per category ─────────────────────────── */
const CATEGORY_DETAILS: Record<string, {
  features: string[];
  whatIncluded: string[];
  safetyMeasures: string[];
  image: string;
}> = {
  cleaning: {
    features: ['Professional-grade equipment', 'Eco-friendly cleaning agents', 'Deep sanitization', 'Corner-to-corner cleaning'],
    whatIncluded: ['Floor mopping & scrubbing', 'Window & glass cleaning', 'Bathroom deep clean', 'Kitchen degreasing', 'Dusting & cobweb removal'],
    safetyMeasures: ['Background-verified staff', 'Fully insured service', 'COVID-safe protocols'],
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80',
  },
  plumbing: {
    features: ['Licensed professionals', 'Genuine spare parts', 'Leak detection tools', 'Same-day fix guarantee'],
    whatIncluded: ['Pipe repair & replacement', 'Drain unclogging', 'Tap & faucet fixing', 'Water tank cleaning', 'Flush mechanism repair'],
    safetyMeasures: ['Certified plumbers', 'Fully insured', 'No-damage guarantee'],
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
  },
  electrical: {
    features: ['Licensed electricians', 'Safety-first approach', 'Multimeter & thermal imaging', 'Fire-safe wiring'],
    whatIncluded: ['Wiring & rewiring', 'Switchboard repair', 'Fan & light installation', 'Inverter setup', 'Safety inspection'],
    safetyMeasures: ['Licensed & insured', 'Circuit breaker testing', 'Earthing verification'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  carpentry: {
    features: ['Skilled craftsmen', 'Premium wood & materials', 'Precision tools', 'Custom designs available'],
    whatIncluded: ['Furniture repair', 'Door & window fixing', 'Shelf & cabinet installation', 'Bed & wardrobe assembly', 'Custom woodwork'],
    safetyMeasures: ['Verified carpenters', 'Tool safety protocols', 'Damage protection'],
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
  },
  painting: {
    features: ['Premium paints used', 'Color consultation included', 'Surface preparation', 'Clean finish guaranteed'],
    whatIncluded: ['Interior wall painting', 'Exterior painting', 'Texture & accent walls', 'Primer & putty work', 'Furniture painting'],
    safetyMeasures: ['Low-VOC paints', 'Dust-free sanding', 'Furniture protection'],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
  },
  salon: {
    features: ['Branded products only', 'Hygienic single-use kits', 'Experienced stylists', 'At-home comfort'],
    whatIncluded: ['Haircut & styling', 'Facials & cleanup', 'Manicure & pedicure', 'Waxing', 'Bridal & party makeup'],
    safetyMeasures: ['Sanitized equipment', 'Disposable supplies', 'Health-screened staff'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
};

/* ── Fake reviews ─────────────────────────────────── */
const REVIEWS = [
  { name: 'Priya S.', rating: 5, text: 'Professional arrived in 12 minutes. Excellent work, very polite. Will book again!', date: '2 days ago' },
  { name: 'Rahul M.', rating: 5, text: 'Best service experience ever. Clean, fast, and affordable. Highly recommend Nimivo.', date: '5 days ago' },
  { name: 'Ananya K.', rating: 4, text: 'Good service overall. The provider was skilled and completed the job on time.', date: '1 week ago' },
];

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  // Find service — check ServiceItem catalogue first, then MOCK_SERVICES
  const serviceItem = UNIQUE_ITEMS.find((i) => i.id === serviceId);
  const mockService = MOCK_SERVICES.find((s) => s.id === serviceId);

  // Determine category
  const category = mockService?.category || guessCategory(serviceId || '');
  const cat = SERVICE_CATEGORIES.find((c) => c.value === category);
  const details = CATEGORY_DETAILS[category] || CATEGORY_DETAILS.cleaning;

  // If neither found, show 404-like
  if (!serviceItem && !mockService) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Service Not Found</h2>
        <p className="text-slate-500 mb-6">The service you're looking for doesn't exist.</p>
        <Link to="/" className="text-fp-blue-700 font-semibold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const name = serviceItem?.name || mockService?.name || 'Service';
  const description = mockService?.description || `Professional ${name.toLowerCase()} service delivered to your doorstep within 15 minutes. Our verified experts ensure top-quality results with complete satisfaction guaranteed.`;
  const price = serviceItem?.price || mockService?.basePrice || 499;
  const originalPrice = serviceItem?.originalPrice;
  const rating = serviceItem?.rating || 4.8;
  const reviewCount = serviceItem?.reviewCount || '50K';
  const image = serviceItem?.image || details.image;
  const duration = mockService?.estimatedDurationMinutes || 60;

  // Related services from same category
  const relatedItems = UNIQUE_ITEMS
    .filter((i) => i.id !== serviceId)
    .filter((i) => {
      // Get items from same category arrays
      const sameCategory = [...(category === 'cleaning' ? [...CLEANING_SERVICES, ...MOST_BOOKED] : []),
        ...(category === 'electrical' ? APPLIANCE_SERVICES : []),
        ...(category === 'plumbing' ? REPAIR_SERVICES : []),
        ...(category === 'salon' ? [...SALON_MEN, ...SALON_WOMEN] : []),
      ];
      return sameCategory.some((sc) => sc.id === i.id);
    })
    .slice(0, 4);

  const handleAddToCart = () => {
    if (serviceItem) {
      addItem(serviceItem);
    } else if (mockService) {
      addItem({
        id: mockService.id,
        name: mockService.name,
        image: details.image,
        rating: 4.8,
        reviewCount: '50K',
        price: mockService.basePrice,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/" className="hover:text-fp-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/#services" className="hover:text-fp-blue-600 transition-colors">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-medium">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* ─── Left: Details (3 cols) ─── */}
        <div className="lg:col-span-3 space-y-8">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{cat?.icon}</span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full">
                  {cat?.label}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{name}</h1>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              { icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />, label: 'Rating', value: rating.toFixed(2) },
              { icon: <Users className="w-4 h-4 text-fp-blue-600" />, label: 'Reviews', value: reviewCount },
              { icon: <Clock className="w-4 h-4 text-green-600" />, label: 'Arrives in', value: '15 min' },
              { icon: <Zap className="w-4 h-4 text-fp-orange-500" />, label: 'Duration', value: `~${duration} min` },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{stat.label}</p>
                  <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-2">About this Service</h2>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </motion.div>

          {/* 15-Min Guarantee Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-fp-blue-700 to-fp-blue-600 text-white"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">15-Minute Arrival Guarantee</h3>
              <p className="text-sm text-white/80">Your professional will arrive within 15 minutes of your selected time slot. If we're late, you get 20% off.</p>
            </div>
          </motion.div>

          {/* What's Included */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What's Included</h2>
            <div className="space-y-2">
              {details.whatIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50 border border-green-100/60">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {details.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3 p-3 rounded-xl bg-fp-blue-50/50 border border-fp-blue-100/60">
                  <ThumbsUp className="w-4 h-4 text-fp-blue-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Safety */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Safety & Trust</h2>
            <div className="flex flex-wrap gap-3">
              {details.safetyMeasures.map((m) => (
                <div key={m} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50 border border-amber-100">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-800">{m}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Customer Reviews</h2>
            <div className="space-y-3">
              {REVIEWS.map((rv) => (
                <div key={rv.name} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-fp-blue-100 flex items-center justify-center text-xs font-bold text-fp-blue-700">
                      {rv.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{rv.name}</p>
                      <p className="text-[10px] text-slate-400">{rv.date}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {Array.from({ length: rv.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{rv.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Right: Sticky Booking Card (2 cols) ─── */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-slate-900">₹{price}</span>
                {originalPrice && (
                  <span className="text-lg text-slate-400 line-through">₹{originalPrice}</span>
                )}
              </div>
              {originalPrice && (
                <p className="text-xs font-bold text-green-600 mb-4">
                  You save ₹{originalPrice - price} ({Math.round(((originalPrice - price) / originalPrice) * 100)}% off)
                </p>
              )}
              {!originalPrice && <div className="mb-4" />}

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-fp-blue-600" />
                  <span>Professional arrives in <strong className="text-slate-900">15 minutes</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Zap className="w-4 h-4 text-fp-orange-500" />
                  <span>Service duration: <strong className="text-slate-900">~{duration} min</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Verified & insured professionals</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <IndianRupee className="w-4 h-4 text-slate-500" />
                  <span>No hidden charges</span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 mb-3 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {added ? (
                  <><CheckCircle className="w-4 h-4" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                )}
              </button>

              {/* Book Now */}
              <Link
                to={`/book/${mockService?.id || serviceId}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-fp-blue-700 hover:bg-fp-blue-800 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Book Now — ₹{price}
              </Link>

              <p className="text-[10px] text-center text-slate-400 mt-3">
                Free cancellation before provider arrival
              </p>
            </motion.div>

            {/* Location Info */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-fp-blue-600" />
                <span className="text-sm font-semibold text-slate-800">Service at Your Doorstep</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our professional will come directly to your home or office. No need to travel anywhere — just book and relax.
              </p>
            </div>

            {/* Related Services */}
            {relatedItems.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <h3 className="text-sm font-bold text-slate-800 mb-3">You Might Also Need</h3>
                <div className="space-y-2">
                  {relatedItems.map((item) => (
                    <Link
                      key={item.id}
                      to={`/service/${item.id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400">₹{item.price}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper to guess category from service item ID prefix */
function guessCategory(id: string): string {
  if (id.startsWith('cl-') || id.startsWith('mb-')) return 'cleaning';
  if (id.startsWith('ap-')) return 'electrical';
  if (id.startsWith('rp-')) return 'plumbing';
  if (id.startsWith('sm-') || id.startsWith('sw-')) return 'salon';
  return 'cleaning';
}
