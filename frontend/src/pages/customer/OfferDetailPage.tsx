import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, CheckCircle, Zap, Tag, ChevronRight } from 'lucide-react';
import {
  MOST_BOOKED, CLEANING_SERVICES, APPLIANCE_SERVICES,
  REPAIR_SERVICES, SALON_MEN, SALON_WOMEN,
} from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';

/* ── Offer definitions ────────────────────────────── */
interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  textColor: string;
  discount?: string;
  validTill: string;
  terms: string[];
  services: ServiceItem[];
}

const OFFERS: Offer[] = [
  {
    id: 'spotless-home',
    title: 'Spotless homes, zero stress.',
    subtitle: 'Professional deep cleaning at unbeatable prices',
    description: 'Get your home professionally cleaned from top to bottom. Our verified cleaners use eco-friendly products and industrial-grade equipment to ensure every corner sparkles. Available for 1 BHK to 5 BHK homes.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-[#F5F0EB] to-[#E8DDD3]',
    textColor: 'text-slate-900',
    discount: 'Starting ₹499',
    validTill: 'Valid till 28 Feb 2026',
    terms: [
      'Professional arrives within 15 minutes',
      'Eco-friendly cleaning products included',
      'All equipment provided by us',
      'Free re-clean if not satisfied',
      'Available 7 days a week',
    ],
    services: CLEANING_SERVICES,
  },
  {
    id: 'instant-help',
    title: 'Instant Help on Demand',
    subtitle: 'Trained professionals at your doorstep in 15 minutes',
    description: 'Whether it\'s a leaking pipe, a broken switch, or a faulty appliance — our verified repair experts are just a tap away. Available 24/7 across all major cities with our 15-minute arrival guarantee.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-fp-blue-700 to-fp-blue-600',
    textColor: 'text-white',
    validTill: 'Always available',
    terms: [
      '15-minute guaranteed arrival',
      'Skilled and verified professionals',
      'Transparent pricing — no hidden fees',
      'Real-time tracking available',
      '24/7 availability',
    ],
    services: [...REPAIR_SERVICES, ...APPLIANCE_SERVICES],
  },
  {
    id: 'weekend-special',
    title: 'Weekend Special Packages',
    subtitle: 'Curated service combos for a productive weekend',
    description: 'Make the most of your weekend with our specially curated packages. Combine cleaning, salon, and repair services at flat 25% off. Perfect for getting your home and yourself weekend-ready.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-rose-600 to-pink-600',
    textColor: 'text-white',
    discount: '25% OFF',
    validTill: 'Every weekend',
    terms: [
      'Valid on Saturday & Sunday bookings',
      'Combine any 2+ services for discount',
      'Flat 25% off on package total',
      'Professional arrives within 15 minutes',
      'Cannot be combined with other offers',
    ],
    services: [...MOST_BOOKED, ...SALON_WOMEN, ...SALON_MEN].slice(0, 8),
  },
];

export default function OfferDetailPage() {
  const { offerId } = useParams();
  const offer = OFFERS.find((o) => o.id === offerId);

  if (!offer) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Offer Not Found</h2>
        <p className="text-slate-500 mb-6">This offer may have expired or doesn't exist.</p>
        <Link to="/" className="text-fp-blue-700 font-semibold hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-fp-blue-700 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${offer.bgColor} mb-10`}
      >
        <div className="relative z-10 p-8 sm:p-12 max-w-[60%]">
          {offer.discount && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 backdrop-blur-sm text-xs font-bold rounded-full mb-4 ${offer.textColor === 'text-white' ? 'bg-white/20 text-white' : 'bg-slate-900/10 text-slate-800'}`}>
              <Tag className="w-3 h-3" />
              {offer.discount}
            </span>
          )}
          <h1 className={`text-3xl sm:text-4xl font-extrabold ${offer.textColor} leading-tight mb-3`}>
            {offer.title}
          </h1>
          <p className={`text-lg ${offer.textColor === 'text-white' ? 'text-white/80' : 'text-slate-600'} mb-4`}>
            {offer.subtitle}
          </p>
          <div className={`flex items-center gap-4 text-sm ${offer.textColor === 'text-white' ? 'text-white/70' : 'text-slate-500'}`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {offer.validTill}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              15 min arrival
            </span>
          </div>
        </div>
        <img
          src={offer.image}
          alt=""
          className="absolute right-0 top-0 w-[45%] h-full object-cover"
        />
        <div className={`absolute right-0 top-0 w-[50%] h-full bg-gradient-to-r ${offer.bgColor} opacity-60 z-[1]`} />
      </motion.div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: About + Terms */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-3">About This Offer</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{offer.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-3">Terms & Details</h2>
            <div className="space-y-2">
              {offer.terms.map((term) => (
                <div key={term} className="flex items-start gap-2.5 p-3 rounded-xl bg-green-50/50 border border-green-100/60">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{term}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 15-Min Guarantee */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-fp-blue-700 to-fp-blue-600 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">15-Min Guarantee</p>
              <p className="text-xs text-white/80">Provider arrives within 15 min of selected time</p>
            </div>
          </div>
        </div>

        {/* Right: Available Services */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Available Services
              <span className="text-slate-400 font-normal ml-2 text-sm">({offer.services.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {offer.services.map((svc, idx) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  <Link
                    to={`/service/${svc.id}`}
                    className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-fp-blue-700 transition-colors">
                        {svc.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-semibold text-slate-700">{svc.rating.toFixed(2)}</span>
                        <span className="text-xs text-slate-400">({svc.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-sm font-bold text-slate-900">₹{svc.price}</span>
                        {svc.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{svc.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-fp-blue-500 transition-colors flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
