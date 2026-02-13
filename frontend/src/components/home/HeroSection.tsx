import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0F172A 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left – Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-active" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Now serving your city
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Professional Help{' '}
              <span className="relative">
                <span className="text-emerald-500">Within 15 Minutes</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8 C 50 2, 100 2, 150 6 S 250 10, 298 4"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Book trusted home services instantly — from plumbing to salon at
              home. Our verified professionals arrive at your doorstep in under
              15 minutes. No waiting, no hassle.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
              >
                Book a Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 border-2 border-slate-200 hover:border-slate-300 rounded-xl transition-colors"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-emerald-500" />
                15-min arrival
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-emerald-500" />
                Verified pros
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Star className="w-4 h-4 text-emerald-500" />
                4.9★ rated
              </div>
            </div>
          </motion.div>

          {/* Right – Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-8 border border-slate-100">
                <div className="space-y-4">
                  {/* Mock booking card */}
                  <div className="bg-slate-50 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-lg">
                        🔧
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Plumbing</p>
                        <p className="text-xs text-slate-400">Pipe leak repair</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">₹349</span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-active" />
                        Provider arriving
                      </span>
                    </div>
                  </div>

                  {/* ETA */}
                  <div className="text-center py-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      Estimated Arrival
                    </p>
                    <p className="text-4xl font-extrabold text-emerald-500">
                      08:42
                    </p>
                    <p className="text-xs text-slate-400 mt-1">minutes remaining</p>
                  </div>

                  {/* Provider info */}
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                      RK
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Ramesh Kumar</p>
                      <p className="text-xs text-slate-400">⭐ 4.8 • 340 jobs</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge top-right */}
              <div className="absolute -top-4 -right-4 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 shadow-sm">
                <p className="text-xs font-semibold text-amber-700">🔒 Verified Pro</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
