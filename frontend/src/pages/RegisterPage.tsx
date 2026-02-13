import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validators';
import type { RegisterFormValues } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { Zap, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const addToast = useNotificationStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      addToast({ type: 'success', title: 'Account created!' });
      navigate('/');
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Registration failed',
        message: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Left – Visual (desktop only) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center">
        <div className="text-center px-12">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Join FastPAYS today
          </h2>
          <p className="text-slate-400 max-w-sm mx-auto">
            Create your free account and start booking professional home
            services in under a minute.
          </p>

          <div className="mt-8 flex flex-col gap-3 max-w-xs mx-auto text-left">
            {['15-minute guaranteed arrival', 'Verified & rated professionals', 'Transparent pricing, no hidden fees'].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Fast<span className="text-emerald-500">PAYS</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Get started for free — no credit card required
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Priya Sharma"
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="9876543210"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-emerald-500 hover:text-emerald-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
