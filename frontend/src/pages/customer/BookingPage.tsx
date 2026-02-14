import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingSchema } from '@/lib/validators';
import type { BookingFormValues } from '@/lib/validators';
import { useBookingStore } from '@/store/bookingStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useCartStore } from '@/store/cartStore';
import { useLocationStore } from '@/store/locationStore';
import {
  MOCK_SERVICES,
  SERVICE_CATEGORIES,
  MOST_BOOKED,
  CLEANING_SERVICES,
  APPLIANCE_SERVICES,
  REPAIR_SERVICES,
  SALON_MEN,
  SALON_WOMEN,
} from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import type { Service } from '@/types';
import {
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Phone,
  Shield,
  Zap,
  Star,
  ShoppingCart,
  Search,
  ChevronRight,
  Sparkles,
  BadgeCheck,
  Timer,
  CreditCard,
  Home,
  IndianRupee,
  X,
} from 'lucide-react';

/* ─── Build unified service catalogue ─────────────────────────── */
const ALL_SERVICE_ITEMS: ServiceItem[] = [
  ...MOST_BOOKED,
  ...CLEANING_SERVICES,
  ...APPLIANCE_SERVICES,
  ...REPAIR_SERVICES,
  ...SALON_MEN,
  ...SALON_WOMEN,
];

const UNIQUE_ITEMS = Array.from(
  new Map(ALL_SERVICE_ITEMS.map((i) => [i.id, i])).values()
);

function guessCategory(id: string): string {
  if (id.startsWith('cl-') || id.startsWith('mb-')) return 'cleaning';
  if (id.startsWith('ap-')) return 'electrical';
  if (id.startsWith('rp-')) return 'plumbing';
  if (id.startsWith('sm-')) return 'salon';
  if (id.startsWith('sw-')) return 'salon';
  return 'cleaning';
}

/* Map ServiceItem => something the booking form can use */
function resolveService(serviceId: string): {
  item: ServiceItem | null;
  service: Service | null;
} {
  const item = UNIQUE_ITEMS.find((i) => i.id === serviceId) || null;
  const mock = MOCK_SERVICES.find((s) => s.id === serviceId) || null;

  if (mock) {
    return { item: null, service: mock as Service };
  }

  if (item) {
    const category = guessCategory(item.id);
    const fakeService: Service = {
      id: item.id,
      name: item.name,
      description: `Professional ${item.name.toLowerCase()} service at your doorstep.`,
      category: category as Service['category'],
      basePrice: item.price,
      estimatedDurationMinutes: 60,
      iconUrl: '',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    return { item, service: fakeService };
  }

  return { item: null, service: null };
}

/* ─── Category tabs config ────────────────────────────────────── */
const CATEGORY_TABS = [
  { key: 'all', label: 'All Services', icon: '✨' },
  ...SERVICE_CATEGORIES.map((c) => ({
    key: c.value,
    label: c.label,
    icon: c.icon,
  })),
];

/* ─── Step labels ─────────────────────────────────────────────── */
const STEP_LABELS = [
  { num: 1, label: 'Select Service', icon: Sparkles },
  { num: 2, label: 'Schedule & Address', icon: Calendar },
  { num: 3, label: 'Review & Pay', icon: CreditCard },
];

/* ─── Animation variants ──────────────────────────────────────── */
const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

/* ═══════════════════════════════════════════════════════════════ */
export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const createBooking = useBookingStore((s) => s.createBooking);
  const isLoading = useBookingStore((s) => s.isLoading);
  const addToast = useNotificationStore((s) => s.addToast);
  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.totalPrice);
  const addItem = useCartStore((s) => s.addItem);
  const userLat = useLocationStore((s) => s.lat);
  const userLng = useLocationStore((s) => s.lng);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: serviceId || '',
    },
  });

  const watchedServiceId = watch('serviceId');

  /* ── Auto-select from URL parameter ─────────────── */
  useEffect(() => {
    if (serviceId) {
      const { item, service } = resolveService(serviceId);
      if (service) {
        setSelectedService(service);
        setSelectedItem(item);
        setValue('serviceId', serviceId);
        setStep(2); // Skip service selection since we already have it
      }
    }
  }, [serviceId, setValue]);

  /* ── Sync selection when manually picked ────────── */
  useEffect(() => {
    if (watchedServiceId && watchedServiceId !== serviceId) {
      const { item, service } = resolveService(watchedServiceId);
      if (service) {
        setSelectedService(service);
        setSelectedItem(item);
      }
    }
  }, [watchedServiceId, serviceId]);

  /* ── Filter services for grid ───────────────────── */
  const filteredServices = useMemo(() => {
    let items: ServiceItem[];
    if (activeCategory === 'all') {
      items = [...UNIQUE_ITEMS];
    } else {
      items = UNIQUE_ITEMS.filter((i) => guessCategory(i.id) === activeCategory);
    }

    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q));
    }

    return items;
  }, [activeCategory, searchQ]);

  /* ── Determine if we're booking from cart ────────── */
  const isCartBooking = !serviceId && cartItems.length > 0 && !selectedService;

  /* ── Form submit ────────────────────────────────── */
  const onSubmit = async (values: BookingFormValues) => {
    try {
      const booking = await createBooking({
        serviceId: values.serviceId,
        address: values.address,
        latitude: userLat ?? 19.076,
        longitude: userLng ?? 72.8777,
        scheduledDate: values.scheduledDate,
        scheduledTime: values.scheduledTime,
        notes: values.notes ? `Phone: ${values.phone} | ${values.notes}` : `Phone: ${values.phone}`,
      });
      addToast({
        type: 'success',
        title: 'Booking Confirmed! 🎉',
        message: 'A verified professional will be assigned shortly.',
      });
      navigate(`/track/${booking.id}`);
    } catch {
      addToast({
        type: 'error',
        title: 'Booking failed',
        message: 'Please try again.',
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  /* ── Helper: select a service from the grid ─────── */
  function pickService(item: ServiceItem) {
    const { service } = resolveService(item.id);
    if (service) {
      setSelectedService(service);
      setSelectedItem(item);
      setValue('serviceId', item.id);
    }
  }

  /* ── Helper: generate time slots ────────────────── */
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 7; h <= 21; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      if (h < 21) slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const watchedDate = watch('scheduledDate');
  const watchedTime = watch('scheduledTime');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* ── Breadcrumb ───────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-fp-blue-700 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {selectedService && (
              <>
                <Link to={`/service/${selectedService.id}`} className="hover:text-fp-blue-700 transition-colors">
                  {selectedService.name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="text-fp-blue-700 font-medium">Book Now</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Header ─────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fp-orange-500 to-fp-orange-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-fp-orange-600 uppercase tracking-widest">
                New Booking
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                {selectedService
                  ? `Book ${selectedService.name}`
                  : isCartBooking
                    ? `Checkout (${cartItems.length} services)`
                    : 'Choose & Book a Service'}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Progress Stepper ────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center">
            {STEP_LABELS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex items-center flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (isDone) setStep(s.num);
                    }}
                    className={`flex items-center gap-2.5 transition-all ${
                      isDone ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-fp-blue-700 to-fp-blue-800 text-white shadow-lg shadow-fp-blue-700/30 scale-110'
                          : isDone
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p
                        className={`text-xs font-medium ${
                          isActive
                            ? 'text-fp-blue-700'
                            : isDone
                              ? 'text-green-600'
                              : 'text-slate-400'
                        }`}
                      >
                        Step {s.num}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          isActive || isDone ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </p>
                    </div>
                  </button>
                  {idx < STEP_LABELS.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            isDone
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : 'bg-slate-100'
                          }`}
                          initial={{ width: '0%' }}
                          animate={{ width: isDone ? '100%' : '0%' }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 15‑Minute Guarantee Banner ─────────── */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-fp-blue-800 via-fp-blue-700 to-fp-blue-900 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-white shadow-xl shadow-fp-blue-900/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-fp-orange-400" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base sm:text-lg">
              ⚡ 15-Minute Arrival Guarantee
            </p>
            <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
              Your verified professional arrives within 15 minutes of booking confirmation.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <Timer className="w-4 h-4 text-fp-orange-400" />
            <span className="font-bold text-sm">15 MIN</span>
          </div>
        </motion.div>

        {/* ── Main Layout: Form + Sidebar ─────────── */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Form Area (2 cols) */}
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* ══════════ STEP 1: Choose Service ══════════ */}
                {step === 1 && (
                  <motion.div key="step1" {...fadeSlide}>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                      {/* Search & Filter Header */}
                      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-fp-blue-700" />
                          Choose Your Service
                        </h2>

                        {/* Search Bar */}
                        <div className="relative mb-4">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={searchQ}
                            onChange={(e) => setSearchQ(e.target.value)}
                            placeholder="Search services..."
                            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500 transition-all"
                          />
                          {searchQ && (
                            <button
                              type="button"
                              onClick={() => setSearchQ('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Category Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                          {CATEGORY_TABS.map((tab) => (
                            <button
                              type="button"
                              key={tab.key}
                              onClick={() => setActiveCategory(tab.key)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                activeCategory === tab.key
                                  ? 'bg-fp-blue-700 text-white shadow-md shadow-fp-blue-700/20'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <span>{tab.icon}</span>
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Grid */}
                      <div className="p-5 sm:p-6">
                        {filteredServices.length === 0 ? (
                          <div className="text-center py-12">
                            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">
                              No services found
                            </p>
                            <p className="text-slate-400 text-sm mt-1">
                              Try a different search or category
                            </p>
                          </div>
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-3">
                            {filteredServices.map((item) => {
                              const isSelected = watchedServiceId === item.id;
                              const cat = SERVICE_CATEGORIES.find(
                                (c) => c.value === guessCategory(item.id)
                              );
                              return (
                                <motion.button
                                  type="button"
                                  key={item.id}
                                  onClick={() => pickService(item)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`relative flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all group ${
                                    isSelected
                                      ? 'border-fp-blue-600 bg-fp-blue-50/60 shadow-md shadow-fp-blue-100/50 ring-1 ring-fp-blue-200'
                                      : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
                                  }`}
                                >
                                  {/* Service Image */}
                                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>

                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1">
                                      {item.name}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                      <span className="text-xs font-medium text-slate-700">
                                        {item.rating}
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        ({item.reviewCount})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1.5">
                                      <span className="text-sm font-bold text-fp-blue-700">
                                        {formatPrice(item.price)}
                                      </span>
                                      {item.originalPrice && (
                                        <span className="text-xs text-slate-400 line-through">
                                          {formatPrice(item.originalPrice)}
                                        </span>
                                      )}
                                    </div>
                                    {cat && (
                                      <span
                                        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full mt-1.5"
                                        style={{
                                          backgroundColor: `${cat.color}12`,
                                          color: cat.color,
                                        }}
                                      >
                                        {cat.icon} {cat.label}
                                      </span>
                                    )}
                                  </div>

                                  {/* Check */}
                                  {isSelected && (
                                    <div className="absolute top-2 right-2">
                                      <div className="w-6 h-6 rounded-full bg-fp-blue-600 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  )}

                                  {/* Badge */}
                                  {item.badge && (
                                    <span className="absolute -top-2 left-3 bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                      {item.badge}
                                    </span>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        )}

                        {errors.serviceId && (
                          <p className="text-xs text-red-500 mt-3 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.serviceId.message}
                          </p>
                        )}

                        <div className="mt-6 flex justify-end">
                          <Button
                            type="button"
                            disabled={!watchedServiceId}
                            onClick={() => setStep(2)}
                            size="lg"
                          >
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ══════════ STEP 2: Address & Schedule ══════════ */}
                {step === 2 && (
                  <motion.div key="step2" {...fadeSlide}>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                      {/* Selected Service Mini-Card */}
                      {(selectedItem || selectedService) && (
                        <div className="p-4 sm:p-5 bg-gradient-to-r from-fp-blue-50 to-white border-b border-slate-100">
                          <div className="flex items-center gap-4">
                            {selectedItem?.image && (
                              <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-16 h-16 rounded-xl object-cover ring-2 ring-white shadow-md"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm text-fp-blue-600 font-semibold">
                                Selected Service
                              </p>
                              <p className="font-bold text-slate-900 text-lg">
                                {selectedService?.name}
                              </p>
                              <div className="flex items-center gap-3 mt-0.5">
                                {selectedItem && (
                                  <span className="flex items-center gap-1 text-xs text-slate-500">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    {selectedItem.rating} ({selectedItem.reviewCount})
                                  </span>
                                )}
                                <span className="text-sm font-bold text-fp-blue-700">
                                  {formatPrice(selectedService?.basePrice || 0)}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setStep(1);
                                setValue('serviceId', '');
                                setSelectedService(null);
                                setSelectedItem(null);
                              }}
                              className="text-xs text-fp-blue-600 hover:text-fp-blue-800 font-medium underline underline-offset-2"
                            >
                              Change
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-fp-blue-700" />
                          Where & When
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                          Tell us your location and preferred schedule
                        </p>

                        <div className="space-y-5">
                          {/* Address */}
                          <div className="relative">
                            <MapPin className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                            <Input
                              label="Delivery Address"
                              placeholder="House no., Street, Locality, City"
                              className="pl-10"
                              error={errors.address?.message}
                              {...register('address')}
                            />
                          </div>

                          {/* Phone */}
                          <div className="relative">
                            <Phone className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                            <Input
                              label="Contact Number"
                              type="tel"
                              placeholder="Enter 10-digit mobile number"
                              className="pl-10"
                              maxLength={10}
                              error={errors.phone?.message}
                              {...register('phone')}
                            />
                          </div>

                          {/* Date & Time */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Preferred Date
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <input
                                  type="date"
                                  min={today}
                                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500 ${
                                    errors.scheduledDate
                                      ? 'border-red-300'
                                      : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                  {...register('scheduledDate')}
                                />
                              </div>
                              {errors.scheduledDate && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors.scheduledDate.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Preferred Time
                              </label>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <select
                                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500 appearance-none ${
                                    errors.scheduledTime
                                      ? 'border-red-300'
                                      : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                  {...register('scheduledTime')}
                                >
                                  <option value="">Select a time slot</option>
                                  {timeSlots.map((slot) => {
                                    const [h, m] = slot.split(':');
                                    const hour = parseInt(h);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const displayHour =
                                      hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                                    return (
                                      <option key={slot} value={slot}>
                                        {displayHour}:{m} {ampm}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              {errors.scheduledTime && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors.scheduledTime.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                              Special Instructions{' '}
                              <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <textarea
                              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500 resize-none hover:border-slate-300 transition-colors"
                              rows={3}
                              placeholder="e.g. Ring the bell twice, bring extra cleaning supplies, parking available in basement..."
                              {...register('notes')}
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setStep(1)}
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                          </Button>
                          <Button type="button" onClick={async () => {
                            const valid = await trigger(['address', 'phone', 'scheduledDate', 'scheduledTime']);
                            if (valid) setStep(3);
                          }} size="lg">
                            Review Order
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ══════════ STEP 3: Review & Confirm ══════════ */}
                {step === 3 && selectedService && (
                  <motion.div key="step3" {...fadeSlide}>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="p-5 sm:p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                          <BadgeCheck className="w-5 h-5 text-fp-blue-700" />
                          Review Your Booking
                        </h2>

                        {/* Service Card */}
                        <div className="bg-gradient-to-br from-fp-blue-50/70 to-white rounded-xl border border-fp-blue-100 p-5 mb-5">
                          <div className="flex items-start gap-4">
                            {selectedItem?.image && (
                              <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-20 h-20 rounded-xl object-cover ring-2 ring-white shadow-md"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-bold text-lg text-slate-900">
                                {selectedService.name}
                              </p>
                              {selectedItem && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                  <span className="text-sm font-medium text-slate-700">
                                    {selectedItem.rating}
                                  </span>
                                  <span className="text-xs text-slate-400">
                                    ({selectedItem.reviewCount} reviews)
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                                  <Zap className="w-3 h-3" /> 15-min arrival
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-fp-blue-700 text-xs font-semibold rounded-full">
                                  <Shield className="w-3 h-3" /> Verified Pro
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="space-y-4">
                          <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                              Booking Details
                            </p>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">Address</p>
                                  <p className="text-sm font-medium text-slate-800">
                                    {watch('address') || '—'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">Contact</p>
                                  <p className="text-sm font-medium text-slate-800">
                                    +91 {watch('phone') || '—'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">
                                    Date & Time
                                  </p>
                                  <p className="text-sm font-medium text-slate-800">
                                    {watchedDate
                                      ? new Date(
                                          watchedDate + 'T00:00:00'
                                        ).toLocaleDateString('en-IN', {
                                          weekday: 'long',
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                        })
                                      : '—'}
                                    {watchedTime && (
                                      <>
                                        {' '}
                                        at{' '}
                                        {(() => {
                                          const [h, m] = watchedTime.split(':');
                                          const hour = parseInt(h);
                                          const ampm = hour >= 12 ? 'PM' : 'AM';
                                          const dh =
                                            hour > 12
                                              ? hour - 12
                                              : hour === 0
                                                ? 12
                                                : hour;
                                          return `${dh}:${m} ${ampm}`;
                                        })()}
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                              {watch('notes') && (
                                <div className="flex items-start gap-3">
                                  <Sparkles className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-slate-400">Notes</p>
                                    <p className="text-sm text-slate-700">
                                      {watch('notes')}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Price Breakdown */}
                          <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                              Price Summary
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">
                                  {selectedService.name}
                                </span>
                                <span className="text-sm font-medium text-slate-800">
                                  {formatPrice(selectedService.basePrice)}
                                </span>
                              </div>
                              {selectedItem?.originalPrice && (
                                <div className="flex items-center justify-between text-green-600">
                                  <span className="text-sm">Discount</span>
                                  <span className="text-sm font-medium">
                                    −{formatPrice(selectedItem.originalPrice - selectedItem.price)}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">
                                  Service fee
                                </span>
                                <span className="text-sm font-medium text-green-600">
                                  FREE
                                </span>
                              </div>
                              <hr className="border-slate-200" />
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-base font-bold text-slate-900">
                                  Total
                                </span>
                                <span className="text-2xl font-bold text-fp-blue-700">
                                  {formatPrice(selectedItem?.price ?? selectedService.basePrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-amber-600" />
                            <p className="text-sm font-semibold text-amber-800">
                              Payment Options
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash'].map(
                              (m) => (
                                <span
                                  key={m}
                                  className="px-3 py-1 bg-white border border-amber-200 rounded-full text-xs font-medium text-amber-700"
                                >
                                  {m}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setStep(2)}
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                          </Button>
                          <Button type="submit" isLoading={isLoading} size="lg">
                            Confirm & Book
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-fp-blue-50 to-white border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-fp-blue-700" />
                    Order Summary
                  </h3>
                </div>
                <div className="p-5">
                  {selectedService ? (
                    <div className="space-y-4">
                      {/* Service mini card */}
                      <div className="flex items-start gap-3">
                        {selectedItem?.image ? (
                          <img
                            src={selectedItem.image}
                            alt={selectedItem.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-fp-blue-50 flex items-center justify-center text-xl">
                            {SERVICE_CATEGORIES.find(
                              (c) => c.value === selectedService.category
                            )?.icon || '📦'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm line-clamp-2">
                            {selectedService.name}
                          </p>
                          {selectedItem && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span className="text-xs text-slate-500">
                                {selectedItem.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <hr className="border-slate-100" />

                      {/* Price */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Service</span>
                          <span className="font-medium text-slate-800">
                            {formatPrice(selectedService.basePrice)}
                          </span>
                        </div>
                        {selectedItem?.originalPrice && (
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600">Savings</span>
                            <span className="font-medium text-green-600">
                              −{formatPrice(selectedItem.originalPrice - selectedItem.price)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Platform fee</span>
                          <span className="font-medium text-green-600">FREE</span>
                        </div>
                        <hr className="border-slate-100" />
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-xl font-bold text-fp-blue-700">
                            {formatPrice(selectedService.basePrice)}
                          </span>
                        </div>
                      </div>

                      {/* Trust badges */}
                      <div className="space-y-2 pt-2">
                        {[
                          {
                            icon: Zap,
                            text: '15-min guaranteed arrival',
                            color: 'text-amber-600',
                          },
                          {
                            icon: Shield,
                            text: 'Verified professionals',
                            color: 'text-green-600',
                          },
                          {
                            icon: IndianRupee,
                            text: 'No hidden charges',
                            color: 'text-fp-blue-600',
                          },
                        ].map((badge) => (
                          <div
                            key={badge.text}
                            className="flex items-center gap-2"
                          >
                            <badge.icon
                              className={`w-3.5 h-3.5 ${badge.color}`}
                            />
                            <span className="text-xs text-slate-600">
                              {badge.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="pt-4 space-y-2.5 border-t border-slate-100 mt-3">
                        {step === 1 ? (
                          <button
                            type="button"
                            disabled={!watchedServiceId}
                            onClick={() => setStep(2)}
                            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 text-white hover:shadow-lg hover:shadow-fp-orange-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : step === 2 ? (
                          <button
                            type="button"
                            onClick={async () => {
                              const valid = await trigger(['address', 'phone', 'scheduledDate', 'scheduledTime']);
                              if (valid) setStep(3);
                            }}
                            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 text-white hover:shadow-lg hover:shadow-fp-orange-500/30 hover:scale-[1.02] active:scale-95"
                          >
                            Review & Book <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (formRef.current) formRef.current.requestSubmit();
                            }}
                            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 text-white hover:shadow-lg hover:shadow-fp-orange-500/30 hover:scale-[1.02] active:scale-95"
                          >
                            <CheckCircle className="w-4 h-4" /> Confirm & Book Now
                          </button>
                        )}
                        {selectedItem && step < 3 && (
                          <button
                            type="button"
                            onClick={() => {
                              addItem(selectedItem);
                              addToast({ type: 'success', title: 'Added to cart!', message: `${selectedItem.name} added.` });
                            }}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-fp-blue-200 text-fp-blue-700 hover:bg-fp-blue-50 active:bg-fp-blue-100 transition-all flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  ) : isCartBooking ? (
                    <div className="space-y-3">
                      {cartItems.map((ci) => (
                        <div
                          key={ci.id}
                          className="flex items-center gap-3 py-2"
                        >
                          <img
                            src={ci.image}
                            alt={ci.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 line-clamp-1">
                              {ci.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              Qty: {ci.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {formatPrice(ci.price * ci.quantity)}
                          </span>
                        </div>
                      ))}
                      <hr className="border-slate-100" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-900">
                          Total
                        </span>
                        <span className="text-lg font-bold text-fp-blue-700">
                          {formatPrice(cartTotal())}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                        <ShoppingCart className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-500">
                        No service selected yet
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Pick a service to see pricing
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Coupon / Promo */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  Have a promo code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-semibold text-fp-blue-700 bg-fp-blue-50 rounded-lg hover:bg-fp-blue-100 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-br from-fp-blue-800 to-fp-blue-900 rounded-2xl p-5 text-white">
                <h4 className="font-bold mb-1">Need Help?</h4>
                <p className="text-blue-200 text-xs mb-3">
                  Our support team is available 24/7 to assist you.
                </p>
                <div className="flex gap-2">
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/25 transition-colors"
                  >
                    <Phone className="w-3 h-3" /> Call Us
                  </a>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/25 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" /> Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
