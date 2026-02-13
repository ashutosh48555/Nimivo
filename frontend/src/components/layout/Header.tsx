import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { Menu, X, Zap, LogOut, ChevronDown, Search } from 'lucide-react';
import LocationPicker from '@/components/shared/LocationPicker';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'How It Works', href: '/#how-it-works' },
    ...(isAuthenticated
      ? [
        { label: 'Book Now', href: '/book' },
        { label: 'My Bookings', href: '/history' },
      ]
      : []),
  ];

  const isActive = (href: string) => {
    if (href.includes('#')) return location.pathname === '/' && location.hash === href.replace('/', '');
    return location.pathname === href;
  };

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    if (href.includes('#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/', { replace: false });
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  }, [location.pathname, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-fp-blue-700 rounded-lg flex items-center justify-center group-hover:bg-fp-blue-600 transition-colors shadow-lg shadow-fp-blue-700/20">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-2xl font-bold text-fp-blue-900 font-heading tracking-tight">
              Fast<span className="text-fp-orange-500">PAYS</span>
            </span>
          </Link>


          {/* Central Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 gap-4">
            <LocationPicker />

            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-fp-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-slate-100 text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-fp-blue-600 focus:shadow-lg transition-all text-sm"
                placeholder="Search for 'AC Repair'..."
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.filter(link => !['My Bookings', 'Book Now'].includes(link.label)).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-fp-blue-700',
                    isActive(link.href) ? 'text-fp-blue-700 font-semibold' : 'text-slate-600'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* User Profile / Auth Buttons */}
            <div className="flex items-center gap-3">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9 ring-2 ring-fp-blue-100',
                      userButtonPopoverCard: 'shadow-xl border border-slate-100 rounded-xl',
                      userButtonPopoverActionButton: 'hover:bg-slate-50',
                      userButtonPopoverActionButtonText: 'text-sm text-slate-700',
                      userButtonPopoverActionButtonIcon: 'text-slate-500',
                      userButtonPopoverFooter: 'hidden',
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    {user?.role === 'provider' && (
                      <UserButton.Link
                        label="Provider Dashboard"
                        labelIcon={<Zap className="w-4 h-4" />}
                        href="/provider"
                      />
                    )}
                    {user?.role === 'admin' && (
                      <UserButton.Link
                        label="Admin Panel"
                        labelIcon={<Zap className="w-4 h-4" />}
                        href="/admin"
                      />
                    )}
                    <UserButton.Link
                      label="My Bookings"
                      labelIcon={<Search className="w-4 h-4" />}
                      href="/history"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </SignedIn>
              <SignedOut>
                <Link
                  to="/access"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/access"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 hover:shadow-lg hover:shadow-fp-orange-500/30 hover:scale-105 rounded-full transition-all duration-300 transform"
                >
                  Get Started
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive(link.href)
                    ? 'text-fp-blue-700 bg-fp-blue-50'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            <SignedIn>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/access"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/access"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 hover:shadow-lg hover:shadow-fp-orange-500/30 rounded-lg text-center"
                >
                  Get Started
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
