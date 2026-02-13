import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full mb-6">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Ready to get started?
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Get professional help at your doorstep
          <br />
          <span className="text-emerald-400">in under 15 minutes</span>
        </h2>

        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          Join thousands of happy customers who rely on FastPAYS for quick,
          reliable home services. No subscription, no commitment — just fast help.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
          >
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
