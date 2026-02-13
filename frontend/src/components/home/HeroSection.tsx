import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Star, ArrowRight, Sparkles, Users } from 'lucide-react';
import { MOCK_SERVICES, SERVICE_CATEGORIES } from '@/lib/constants';
import { useRef } from 'react';

// Take 6 services for the hero grid
const heroServices = MOCK_SERVICES.slice(0, 6);

// High-quality, reliable images with labels
const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&q=80&w=800',
    label: 'Home Cleaning',
    tag: 'Most Booked',
  },
  {
    src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    label: 'Electrical Work',
    tag: null,
  },
  {
    src: 'https://images.unsplash.com/photo-1585747860019-8c947e2e7c78?auto=format&fit=crop&q=80&w=800',
    label: 'Plumbing',
    tag: 'Express',
  },
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    label: 'Salon at Home',
    tag: 'Popular',
  },
  {
    src: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    label: 'Carpentry',
    tag: null,
  },
];

// Category icon backgrounds for "What are you looking for"
const CATEGORY_STYLES: Record<string, { bg: string; text: string; shadow: string }> = {
  cleaning:   { bg: 'bg-pink-50',    text: 'text-pink-600',    shadow: 'shadow-pink-100' },
  plumbing:   { bg: 'bg-cyan-50',    text: 'text-cyan-600',    shadow: 'shadow-cyan-100' },
  electrical: { bg: 'bg-amber-50',   text: 'text-amber-600',   shadow: 'shadow-amber-100' },
  carpentry:  { bg: 'bg-violet-50',  text: 'text-violet-600',  shadow: 'shadow-violet-100' },
  painting:   { bg: 'bg-orange-50',  text: 'text-orange-600',  shadow: 'shadow-orange-100' },
  salon:      { bg: 'bg-purple-50',  text: 'text-purple-600',  shadow: 'shadow-purple-100' },
};

/* Animation variants */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-white via-slate-50/50 to-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">

      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ─── Left Content ─── */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fp-blue-50 border border-fp-blue-100 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-fp-blue-600" />
              <span className="text-xs font-semibold text-fp-blue-700 tracking-wide">#1 Home Services Platform</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 leading-[1.05] mb-5 tracking-tight">
              Home services{' '}
              <br className="hidden sm:block" />
              at your{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fp-blue-700 via-fp-blue-600 to-fp-blue-500">
                  doorstep
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-fp-orange-500 to-fp-orange-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
              Book verified professionals for cleaning, repairs, salon & more — guaranteed arrival in{' '}
              <span className="font-semibold text-fp-orange-500">15 minutes</span>.
            </motion.p>

            {/* What are you looking for - service grid */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                What are you looking for?
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {heroServices.map((service, idx) => {
                  const style = CATEGORY_STYLES[service.category] || CATEGORY_STYLES.cleaning;
                  const cat = SERVICE_CATEGORIES.find(c => c.value === service.category);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={`/book/${service.id}`}
                        className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/80 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-200 hover:-translate-y-0.5"
                      >
                        <div className={`w-14 h-14 mb-2.5 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${style.bg} ${style.shadow} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                          {cat?.icon || '🔧'}
                        </div>
                        <span className="text-xs font-semibold text-slate-600 group-hover:text-fp-blue-700 text-center leading-tight transition-colors">
                          {service.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-medium">Verified Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <span className="font-medium">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-fp-blue-600" />
                </div>
                <span className="font-medium">10L+ Users</span>
              </div>
              <Link to="/book" className="flex items-center gap-1 text-fp-orange-500 font-bold hover:text-fp-orange-600 transition-colors ml-auto group">
                View all services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ─── Right Content: Dynamic Image Mosaic ─── */}
          <div className="relative hidden lg:block h-[560px]">

            {/* Decorative animated blob */}
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 w-[130%] h-[130%] rounded-full pointer-events-none"
              style={{
                x: '-50%',
                y: '-50%',
                rotate: blobRotate,
                background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.06) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)',
              }}
            />

            {/* Image 1 — Large left */}
            <motion.div
              className="absolute top-0 left-0 w-[52%] h-[55%] group"
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: y1 }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-2 ring-white/80 border-2 border-slate-200/60">
                <img
                  src={HERO_IMAGES[0].src}
                  alt={HERO_IMAGES[0].label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {HERO_IMAGES[0].tag && (
                    <span className="inline-block px-2.5 py-0.5 bg-fp-orange-500 text-white text-[10px] font-bold rounded-full mb-2 tracking-wider uppercase">
                      {HERO_IMAGES[0].tag}
                    </span>
                  )}
                  <p className="text-white font-bold text-lg">{HERO_IMAGES[0].label}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-white/80 text-xs font-medium">4.9 • 2.3M bookings</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image 2 — Top right */}
            <motion.div
              className="absolute top-2 right-0 w-[44%] h-[38%] group"
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: y2 }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-2 ring-white/80 border-2 border-slate-200/60">
                <img
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-base">{HERO_IMAGES[1].label}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white/80 text-[11px] font-medium">4.8 • 1.1M bookings</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image 3 — Bottom left */}
            <motion.div
              className="absolute bottom-0 left-[5%] w-[38%] h-[40%] group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: y3 }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-2 ring-white/80 border-2 border-slate-200/60">
                <img
                  src={HERO_IMAGES[3].src}
                  alt={HERO_IMAGES[3].label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {HERO_IMAGES[3].tag && (
                    <span className="inline-block px-2.5 py-0.5 bg-fp-blue-600 text-white text-[10px] font-bold rounded-full mb-1.5 tracking-wider uppercase">
                      {HERO_IMAGES[3].tag}
                    </span>
                  )}
                  <p className="text-white font-bold text-base">{HERO_IMAGES[3].label}</p>
                </div>
              </div>
            </motion.div>

            {/* Image 4 — Bottom right */}
            <motion.div
              className="absolute bottom-4 right-0 w-[50%] h-[48%] group"
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: y1 }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 ring-2 ring-white/80 border-2 border-slate-200/60">
                <img
                  src={HERO_IMAGES[4].src}
                  alt={HERO_IMAGES[4].label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-base">{HERO_IMAGES[4].label}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white/80 text-[11px] font-medium">4.7 • 800K bookings</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
