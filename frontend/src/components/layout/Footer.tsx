import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-fp-blue-900 text-white border-t border-fp-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="CraftGuild"
                className="w-10 h-10 rounded-xl object-contain group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-bold font-heading">
                Craft<span className="text-fp-orange-500">Guild</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Lightning-fast home services with guaranteed 15-minute arrival.
              Professional help at your doorstep, whenever you need it.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {MOCK_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/service/${s.id}`}
                    className="text-sm text-slate-300 hover:text-fp-orange-500 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Careers', href: '/#about' },
                { label: 'Privacy Policy', href: '/#about' },
                { label: 'Terms of Service', href: '/#about' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-slate-400 hover:text-fp-orange-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-fp-orange-500 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-fp-orange-500 flex-shrink-0" />
                support@craftguild.in
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-fp-orange-500 flex-shrink-0 mt-0.5" />
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} CraftGuild. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with ❤️ for India&apos;s fastest home services
          </p>
        </div>
      </div>
    </footer>
  );
}
