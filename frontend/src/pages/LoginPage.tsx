import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validators';
import type { LoginFormValues } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { Zap, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const addToast = useNotificationStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      addToast({ type: 'success', title: 'Welcome back!' });
      navigate('/');
    } catch (error: any) {
      addToast({
        type: 'error',
        title: 'Login failed',
        message: error.response?.data?.message || 'Invalid credentials',
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Left – Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Fast<span className="text-emerald-500">PAYS</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Sign in to your account to book services
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
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

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-500">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-500 hover:text-emerald-600"
            >
              Create one
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Demo Credentials
            </p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>
                <span className="font-medium">Customer:</span> customer@demo.com /
                demo123
              </p>
              <p>
                <span className="font-medium">Provider:</span> provider@demo.com /
                demo123
              </p>
              <p>
                <span className="font-medium">Admin:</span> admin@demo.com / demo123
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right – Visual (desktop only) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center">
        <div className="text-center px-12">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Professional help in minutes
          </h2>
          <p className="text-emerald-100 max-w-sm mx-auto">
            Join FastPAYS and get verified service professionals at your
            doorstep within 15 minutes. Every time.
          </p>
        </div>
      </div>
    </div>
  );
}
