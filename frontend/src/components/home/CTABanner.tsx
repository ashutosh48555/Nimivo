import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-fp-blue-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fp-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6 border border-white/10 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-fp-orange-400" />
          <span className="text-xs font-semibold text-fp-orange-100 uppercase tracking-wider">
            Ready to get started?
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight font-heading">
          Get professional help at your doorstep
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fp-orange-400 to-fp-orange-200">
            in under 15 minutes
          </span>
        </h2>

        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          Join thousands of happy customers who rely on FastPAYS for quick,
          reliable home services. No subscription, no commitment — just fast help.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-fp-orange-500 hover:bg-fp-orange-600 rounded-full transition-all duration-300 shadow-lg shadow-fp-orange-500/25 hover:shadow-fp-orange-500/40 hover:-translate-y-1"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-fp-blue-100 hover:text-white border border-fp-blue-700 hover:border-fp-blue-500 rounded-full transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
