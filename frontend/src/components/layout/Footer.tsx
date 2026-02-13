import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Fast<span className="text-emerald-400">PAYS</span>
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
              {[
                'Deep Cleaning',
                'Plumbing',
                'Electrician',
                'Carpentry',
                'Painting',
                'Salon at Home',
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/book"
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {s}
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
                { label: 'Careers', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
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
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                support@fastpays.in
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} FastPAYS. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with ❤️ for India&apos;s fastest home services
          </p>
        </div>
      </div>
    </footer>
  );
}
