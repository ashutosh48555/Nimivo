import { useSearchParams, Link } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import { User, Briefcase, ArrowLeft, Shield, TrendingUp, IndianRupee, CalendarCheck, Clock, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

/* ──────────────── animation variants ──────────────── */
const panelSlide: Variants = {
  initial: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 } },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0, transition: { duration: 0.25 } }),
};

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ──────────────── form panel ──────────────── */
function FormPanel({ isProvider, role }: { isProvider: boolean; role: string }) {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center px-4 py-12"
      key={`form-${role}`}
      custom={isProvider ? 1 : -1}
      variants={panelSlide}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-md">
        {/* Back */}
        <Link
          to="/access"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fp-blue-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to role selection
        </Link>

        {/* Role pill */}
        <motion.div className="flex items-center gap-3 mb-6" variants={fadeUp}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${
              isProvider ? 'bg-fp-orange-100' : 'bg-fp-blue-50 border border-fp-blue-100'
            }`}
          >
            {isProvider ? (
              <Briefcase className="w-5 h-5 text-fp-orange-600" />
            ) : (
              <User className="w-5 h-5 text-fp-blue-700" />
            )}
          </div>
          <span
            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full transition-colors duration-500 ${
              isProvider
                ? 'text-fp-orange-600 bg-fp-orange-50 border border-fp-orange-100'
                : 'text-fp-blue-700 bg-fp-blue-50 border border-fp-blue-100'
            }`}
          >
            {isProvider ? 'Provider Registration' : 'Customer'}
          </span>
        </motion.div>

        <motion.h1 className="text-2xl font-bold text-fp-blue-900 font-heading mb-1" variants={fadeUp}>
          {isProvider ? 'Apply as Service Provider' : 'Create your account'}
        </motion.h1>
        <motion.p className="text-sm text-slate-500 mb-8" variants={fadeUp}>
          {isProvider
            ? 'Fill in your details to join the FastPAYS provider network'
            : 'Get started for free — no credit card required'}
        </motion.p>

        {isProvider && (
          <motion.div
            className="p-3 bg-fp-orange-50 rounded-lg border border-fp-orange-100 mb-6"
            variants={fadeUp}
          >
            <p className="text-xs text-fp-orange-700">
              <strong>Note:</strong> After registration, your profile will be reviewed by our team. You'll be able to start accepting jobs once verified (usually within 24 hours).
            </p>
          </motion.div>
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
              socialButtonsBlockButton: 'rounded-xl border-slate-200 hover:bg-slate-50 h-11',
              socialButtonsBlockButtonText: 'text-sm font-medium text-slate-700',
              dividerLine: 'bg-slate-200',
              dividerText: 'text-slate-400 text-xs uppercase',
              footerActionLink: isProvider
                ? 'text-fp-orange-500 hover:text-fp-orange-600 font-semibold'
                : 'text-fp-blue-600 hover:text-fp-blue-700 font-semibold',
              formFieldAction: isProvider
                ? 'text-fp-orange-500 hover:text-fp-orange-600 text-sm'
                : 'text-fp-blue-600 hover:text-fp-blue-700 text-sm',
              identityPreviewEditButtonIcon: isProvider ? 'text-fp-orange-500' : 'text-fp-blue-600',
            },
          }}
        />

        {/* Switch role */}
        <div className="mt-6 text-center">
          <Link
            to={`/register?role=${isProvider ? 'customer' : 'provider'}`}
            className={`text-xs transition-colors ${
              isProvider
                ? 'text-slate-400 hover:text-fp-orange-500'
                : 'text-slate-400 hover:text-fp-blue-600'
            }`}
          >
            {isProvider ? '← Register as Customer instead' : 'Want to become a Service Provider? →'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────── visual / banner panel ──────────────── */
function VisualPanel({ isProvider, role }: { isProvider: boolean; role: string }) {
  const features = isProvider
    ? [
        { icon: TrendingUp, text: 'Earn ₹25,000–₹60,000/month' },
        { icon: CalendarCheck, text: 'Flexible work schedule' },
        { icon: IndianRupee, text: 'Instant payouts to your bank' },
        { icon: Shield, text: 'Full insurance & support coverage' },
      ]
    : [
        { icon: Clock, text: '15-minute guaranteed arrival' },
        { icon: Shield, text: 'Verified & background-checked pros' },
        { icon: Star, text: '4.9★ rated service quality' },
        { icon: IndianRupee, text: 'Transparent pricing, no hidden fees' },
      ];

  return (
    <motion.div
      className={`hidden lg:flex flex-1 items-center justify-center relative overflow-hidden ${
        isProvider
          ? 'bg-gradient-to-br from-fp-orange-500 via-fp-orange-600 to-fp-orange-700'
          : 'bg-gradient-to-br from-fp-blue-700 to-fp-blue-900'
      }`}
      key={`visual-${role}`}
      custom={isProvider ? -1 : 1}
      variants={panelSlide}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Decorative circles */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10 ${
          isProvider ? 'bg-white' : 'bg-fp-orange-400'
        }`}
      />
      <div
        className={`absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10 ${
          isProvider ? 'bg-white' : 'bg-fp-orange-400'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/3 w-40 h-40 rounded-full opacity-5 ${
          isProvider ? 'bg-white' : 'bg-white'
        }`}
      />

      <motion.div className="text-center px-12 max-w-md relative z-10" variants={stagger} initial="initial" animate="animate">
        {/* Logo */}
        <motion.div
          className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
            isProvider
              ? 'bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg shadow-white/5'
              : 'bg-white/20 backdrop-blur-sm border border-white/15 shadow-lg shadow-white/5'
          }`}
          variants={fadeUp}
        >
          <img src="/logo.png" alt="FastPAYS" className="w-14 h-14 object-contain drop-shadow-lg" />
        </motion.div>

        <motion.h2 className="text-3xl font-bold text-white font-heading mb-3" variants={fadeUp}>
          {isProvider ? 'Start earning with FastPAYS' : 'Join FastPAYS today'}
        </motion.h2>
        <motion.p className="text-white/75 max-w-sm mx-auto mb-8" variants={fadeUp}>
          {isProvider
            ? 'Register as a service provider and start receiving job requests in your area.'
            : 'Create your free account and start booking professional home services in under a minute.'}
        </motion.p>

        {/* Feature list */}
        <motion.div className="flex flex-col gap-3 max-w-xs mx-auto text-left" variants={fadeUp}>
          {features.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                isProvider
                  ? 'hover:bg-white/10'
                  : 'hover:bg-white/10'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isProvider
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-white/15 backdrop-blur-sm'
                }`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-white/90">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust badge */}
        <motion.div
          className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
            isProvider
              ? 'bg-white/15 text-white/80 border border-white/15'
              : 'bg-white/10 text-white/70 border border-white/10'
          }`}
          variants={fadeUp}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          {isProvider ? '10,000+ active providers across India' : '50,000+ happy customers trust FastPAYS'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────── main page ──────────────── */
export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'customer';
  const isProvider = role === 'provider';

  return (
    <div className="min-h-[85vh] flex overflow-hidden">
      <AnimatePresence mode="wait" custom={isProvider ? 1 : -1}>
        {isProvider ? (
          <>
            {/* Provider: Banner LEFT → Form RIGHT */}
            <VisualPanel key="visual-provider" isProvider role={role} />
            <FormPanel key="form-provider" isProvider role={role} />
          </>
        ) : (
          <>
            {/* Customer: Form LEFT → Banner RIGHT */}
            <FormPanel key="form-customer" isProvider={false} role={role} />
            <VisualPanel key="visual-customer" isProvider={false} role={role} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
