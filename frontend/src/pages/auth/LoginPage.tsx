import { useSearchParams, Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { User, Briefcase, ArrowLeft, Shield, Clock, TrendingUp, Star } from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'customer';
  const isProvider = role === 'provider';

  return (
    <div className="min-h-[85vh] flex">
      {/* Left – Form Side */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to role selection */}
          <Link
            to="/access"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fp-blue-700 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to role selection
          </Link>

          {/* Role indicator pill */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isProvider ? 'bg-fp-orange-100' : 'bg-fp-blue-50 border border-fp-blue-100'}`}>
              {isProvider
                ? <Briefcase className="w-5 h-5 text-fp-orange-600" />
                : <User className="w-5 h-5 text-fp-blue-700" />
              }
            </div>
            <div>
              <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full ${isProvider ? 'text-fp-orange-600 bg-fp-orange-50 border border-fp-orange-100' : 'text-fp-blue-700 bg-fp-blue-50 border border-fp-blue-100'}`}>
                {isProvider ? 'Service Provider' : 'Customer'}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-fp-blue-900 font-heading mb-1">
            {isProvider ? 'Provider Sign In' : 'Welcome back'}
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            {isProvider
              ? 'Access your provider dashboard and manage jobs'
              : 'Sign in to your account to book services'
            }
          </p>

          {/* Clerk Sign In */}
          <SignIn
            signUpUrl={`/register?role=${role}`}
            forceRedirectUrl={isProvider ? '/provider' : '/'}
            appearance={{
              variables: {
                colorPrimary: isProvider ? '#F97316' : '#1D4ED8',
                colorText: '#0F172A',
                colorTextSecondary: '#64748B',
                colorBackground: '#FFFFFF',
                colorInputBackground: '#F8FAFC',
                colorInputText: '#0F172A',
                borderRadius: '0.75rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              },
              elements: {
                rootBox: 'w-full',
                cardBox: 'shadow-none w-full',
                card: 'shadow-none p-0 w-full',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formButtonPrimary: isProvider
                  ? 'bg-gradient-to-r from-fp-orange-500 to-fp-orange-600 hover:shadow-lg hover:shadow-fp-orange-500/30 text-white rounded-full h-12 text-sm font-bold'
                  : 'bg-fp-blue-900 hover:bg-fp-blue-700 text-white rounded-full h-12 text-sm font-bold shadow-lg shadow-fp-blue-900/20',
                formFieldInput:
                  'rounded-xl border-slate-200 bg-fp-slate-50 focus:ring-2 focus:ring-fp-blue-600 h-11',
                formFieldLabel: 'text-sm font-medium text-slate-700',
                socialButtonsBlockButton:
                  'rounded-xl border-slate-200 hover:bg-slate-50 h-11',
                socialButtonsBlockButtonText:
                  'text-sm font-medium text-slate-700',
                dividerLine: 'bg-slate-200',
                dividerText: 'text-slate-400 text-xs uppercase',
                footerActionLink:
                  'text-fp-orange-500 hover:text-fp-orange-600 font-semibold',
                formFieldAction:
                  'text-fp-blue-600 hover:text-fp-blue-700 text-sm',
                identityPreviewEditButtonIcon: 'text-fp-blue-600',
              },
            }}
          />

          {/* Switch role */}
          <div className="mt-6 text-center">
            <Link
              to={`/login?role=${isProvider ? 'customer' : 'provider'}`}
              className="text-xs text-slate-400 hover:text-fp-blue-600 transition-colors"
            >
              {isProvider ? '← Login as Customer instead' : 'Are you a Service Provider? →'}
            </Link>
          </div>
        </div>
      </div>

      {/* Right – Visual Panel (desktop only) */}
      <div className={`hidden lg:flex flex-1 items-center justify-center ${isProvider ? 'bg-gradient-to-br from-fp-blue-900 to-slate-900' : 'bg-gradient-to-br from-fp-blue-700 to-fp-blue-900'}`}>
        <div className="text-center px-12 max-w-md">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isProvider ? 'bg-fp-orange-500/20' : 'bg-white/15'}`}>
            {isProvider
              ? <Briefcase className="w-10 h-10 text-fp-orange-400" />
              : <img src="/logo.png" alt="FastPAYS" className="w-12 h-12 object-contain" />
            }
          </div>

          <h2 className="text-3xl font-bold text-white font-heading mb-3">
            {isProvider ? 'Grow your business with FastPAYS' : 'Professional help in minutes'}
          </h2>
          <p className="text-fp-blue-50/80 max-w-sm mx-auto mb-8">
            {isProvider
              ? 'Join India\'s fastest-growing home services network. Access jobs, manage your schedule, track earnings.'
              : 'Get verified service professionals at your doorstep within 15 minutes. Every time.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {isProvider ? (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <TrendingUp className="w-5 h-5 text-fp-orange-400 mb-2" />
                  <p className="text-2xl font-bold text-white">₹45K+</p>
                  <p className="text-xs text-slate-300">Avg. monthly earnings</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <Star className="w-5 h-5 text-fp-orange-400 mb-2" />
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-xs text-slate-300">Active providers</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <Clock className="w-5 h-5 text-fp-orange-400 mb-2" />
                  <p className="text-2xl font-bold text-white">15 min</p>
                  <p className="text-xs text-slate-300">Average arrival time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <Shield className="w-5 h-5 text-fp-orange-400 mb-2" />
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-xs text-slate-300">Verified professionals</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
