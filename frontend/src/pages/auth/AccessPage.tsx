import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Briefcase, User, ArrowRight, Shield, Clock, Star, IndianRupee, TrendingUp, CalendarCheck } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AccessPage() {
  return (
    <div className="min-h-[85vh] flex flex-col">
      {/* Top brand bar */}
      <div className="text-center pt-10 pb-6">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Nimivo"
            className="w-10 h-10 rounded-xl object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-bold text-fp-blue-900 font-heading tracking-tight">
            Nimi<span className="text-fp-orange-500">vo</span>
          </span>
        </Link>
      </div>

      {/* Main split */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">

        {/* LEFT — Customer Portal */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 lg:py-16 lg:border-r border-slate-200"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="w-16 h-16 bg-fp-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-fp-blue-100">
            <User className="w-8 h-8 text-fp-blue-700" />
          </div>

          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-fp-blue-700 bg-fp-blue-50 rounded-full border border-fp-blue-100 mb-4">
            Customer
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-fp-blue-900 font-heading mb-3">
            For Customers
          </h2>

          <p className="text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
            Book verified home service professionals in under 60 seconds. From plumbing to salon — we've got you covered.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-3 mb-8 text-left max-w-xs w-full">
            {[
              { icon: Clock, text: '15-minute guaranteed arrival' },
              { icon: Shield, text: 'Verified & background-checked pros' },
              { icon: Star, text: '4.9★ rated service quality' },
              { icon: IndianRupee, text: 'Transparent pricing, no surprises' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-fp-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-fp-blue-600" />
                </div>
                <span className="text-sm text-slate-600">{text}</span>
              </div>
            ))}
          </div>

          <Link
            to="/login?role=customer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-fp-blue-900 hover:bg-fp-blue-700 rounded-full transition-all duration-300 shadow-lg shadow-fp-blue-900/20 hover:shadow-fp-blue-900/40 hover:-translate-y-0.5 mb-4 w-full max-w-xs justify-center"
          >
            Login as Customer
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register?role=customer" className="font-semibold text-fp-orange-500 hover:text-fp-orange-600 transition-colors">
              Sign up free
            </Link>
          </p>
        </motion.div>

        {/* Vertical Divider — Desktop */}
        <div className="hidden lg:flex items-center">
          <div className="w-px h-2/3 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        </div>

        {/* Horizontal Divider — Mobile */}
        <div className="lg:hidden flex items-center justify-center py-6">
          <div className="w-16 h-px bg-slate-200" />
          <span className="mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">or</span>
          <div className="w-16 h-px bg-slate-200" />
        </div>

        {/* RIGHT — Provider Portal */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 lg:py-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <div className="w-16 h-16 bg-fp-orange-100 rounded-2xl flex items-center justify-center mb-6 border border-fp-orange-200">
            <Briefcase className="w-8 h-8 text-fp-orange-600" />
          </div>

          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-fp-orange-600 bg-fp-orange-50 rounded-full border border-fp-orange-100 mb-4">
            Service Provider
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-fp-blue-900 font-heading mb-3">
            For Service Providers
          </h2>

          <p className="text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
            Join India's fastest-growing home services network. Get job requests, manage your schedule, and grow your business.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-3 mb-8 text-left max-w-xs w-full">
            {[
              { icon: TrendingUp, text: 'Earn ₹25,000–₹60,000/month' },
              { icon: CalendarCheck, text: 'Flexible schedule, you decide' },
              { icon: IndianRupee, text: 'Instant payouts to your bank' },
              { icon: Shield, text: 'Insurance & professional support' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-fp-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-fp-orange-500" />
                </div>
                <span className="text-sm text-slate-600">{text}</span>
              </div>
            ))}
          </div>

          <Link
            to="/login?role=provider"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 hover:shadow-lg hover:shadow-fp-orange-500/30 rounded-full transition-all duration-300 hover:-translate-y-0.5 mb-4 w-full max-w-xs justify-center"
          >
            Login as Provider
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-sm text-slate-500">
            Want to become a provider?{' '}
            <Link to="/register?role=provider" className="font-semibold text-fp-orange-500 hover:text-fp-orange-600 transition-colors">
              Apply now
            </Link>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
