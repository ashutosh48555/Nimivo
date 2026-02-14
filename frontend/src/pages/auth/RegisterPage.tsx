import { useSearchParams, Link } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import { User, Briefcase, ArrowLeft, Shield, TrendingUp, IndianRupee, CalendarCheck } from 'lucide-react';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'customer';
  const isProvider = role === 'provider';

  return (
    <div className="min-h-[85vh] flex">
      {/* Left – Visual Panel (desktop only) */}
      <div className={`hidden lg:flex flex-1 items-center justify-center ${isProvider ? 'bg-gradient-to-br from-fp-blue-900 to-slate-900' : 'bg-gradient-to-br from-slate-900 to-fp-blue-900'}`}>
        <div className="text-center px-12 max-w-md">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isProvider ? 'bg-fp-orange-500/20' : 'bg-fp-blue-600/20'}`}>
            {isProvider
              ? <Briefcase className="w-10 h-10 text-fp-orange-400" />
              : <img src="/logo.png" alt="FastPAYS" className="w-12 h-12 object-contain" />
            }
          </div>

          <h2 className="text-3xl font-bold text-white font-heading mb-3">
            {isProvider ? 'Start earning with FastPAYS' : 'Join FastPAYS today'}
          </h2>
          <p className="text-slate-400 max-w-sm mx-auto mb-8">
            {isProvider
              ? 'Register as a service provider and start receiving job requests in your area.'
              : 'Create your free account and start booking professional home services in under a minute.'
            }
          </p>

          <div className="flex flex-col gap-3 max-w-xs mx-auto text-left">
            {(isProvider
              ? [
                { icon: TrendingUp, text: 'Earn ₹25,000–₹60,000/month' },
                { icon: CalendarCheck, text: 'Flexible work schedule' },
                { icon: IndianRupee, text: 'Instant payouts to your bank' },
                { icon: Shield, text: 'Full insurance & support coverage' },
              ]
              : [
                { icon: Shield, text: '15-minute guaranteed arrival' },
                { icon: User, text: 'Verified & rated professionals' },
                { icon: IndianRupee, text: 'Transparent pricing, no hidden fees' },
              ]
            ).map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-fp-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to role selection */}
          <Link
            to="/access"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fp-blue-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to role selection
          </Link>

          {/* Role indicator */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isProvider ? 'bg-fp-orange-100' : 'bg-fp-blue-50 border border-fp-blue-100'}`}>
              {isProvider
                ? <Briefcase className="w-5 h-5 text-fp-orange-600" />
                : <User className="w-5 h-5 text-fp-blue-700" />
              }
            </div>
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full ${isProvider ? 'text-fp-orange-600 bg-fp-orange-50 border border-fp-orange-100' : 'text-fp-blue-700 bg-fp-blue-50 border border-fp-blue-100'}`}>
              {isProvider ? 'Provider Registration' : 'Customer'}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-fp-blue-900 font-heading mb-1">
            {isProvider ? 'Apply as Service Provider' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            {isProvider
              ? 'Fill in your details to join the FastPAYS provider network'
              : 'Get started for free — no credit card required'
            }
          </p>

          {isProvider && (
            <div className="p-3 bg-fp-orange-50 rounded-lg border border-fp-orange-100 mb-6">
              <p className="text-xs text-fp-orange-700">
                <strong>Note:</strong> After registration, your profile will be reviewed by our team. You'll be able to start accepting jobs once verified (usually within 24 hours).
              </p>
            </div>
          )}

          {/* Clerk Sign Up */}
          <SignUp
            signInUrl={`/login?role=${role}`}
            forceRedirectUrl={isProvider ? '/provider' : '/'}
            unsafeMetadata={{ role: isProvider ? 'provider' : 'customer' }}
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
              to={`/register?role=${isProvider ? 'customer' : 'provider'}`}
              className="text-xs text-slate-400 hover:text-fp-blue-600 transition-colors"
            >
              {isProvider ? '← Register as Customer instead' : 'Want to become a Service Provider? →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
