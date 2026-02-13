import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import StatusBadge from '@/components/shared/StatusBadge';
import Button from '@/components/shared/Button';
import { formatPrice, formatDate } from '@/lib/utils';
import { useNotificationStore } from '@/store/notificationStore';
import type { Booking } from '@/types';
import {
  Users,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Activity,
  UserCheck,
} from 'lucide-react';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalProviders: number;
  activeBookings: number;
  todayBookings: number;
}

interface ProviderInfo {
  id: string;
  user: { fullName: string; email: string; phone: string };
  serviceCategory: string;
  isVerified: boolean;
  isAvailable: boolean;
  averageRating: number;
  completedJobs: number;
}

export default function AdminDashboard() {
  const addToast = useNotificationStore((s) => s.addToast);
  const [tab, setTab] = useState<'overview' | 'bookings' | 'providers'>(
    'overview'
  );
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProviders: 0,
    activeBookings: 0,
    todayBookings: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dashRes, bookRes, provRes] = await Promise.allSettled([
        adminApi.getDashboard(),
        adminApi.getAllBookings(),
        adminApi.getAllProviders(),
      ]);
      if (dashRes.status === 'fulfilled') setStats(dashRes.value.data.data);
      if (bookRes.status === 'fulfilled') setBookings(bookRes.value.data.data || []);
      if (provRes.status === 'fulfilled')
        setProviders(provRes.value.data.data || []);
    } catch {
      // Demo mode
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await adminApi.approveProvider(id);
      addToast({ type: 'success', title: 'Provider approved!' });
      setProviders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isVerified: true } : p))
      );
    } catch {
      addToast({ type: 'error', title: 'Failed to approve' });
    }
  };

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      label: 'Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      label: 'Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      label: 'Providers',
      value: stats.totalProviders,
      icon: ShieldCheck,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      label: 'Active Now',
      value: stats.activeBookings,
      icon: Activity,
      color: 'text-red-500 bg-red-50',
    },
    {
      label: 'Today',
      value: stats.todayBookings,
      icon: Calendar,
      color: 'text-cyan-500 bg-cyan-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-100 mb-6 w-fit">
          {(['overview', 'bookings', 'providers'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                tab === t
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-slate-100 p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-3 font-medium text-slate-500">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">
                      Service
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-slate-400"
                      >
                        No bookings yet
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b border-slate-50 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 text-slate-600">
                          #{b.id?.slice(0, 8)}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {b.service?.name || '—'}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {b.scheduledDate ? formatDate(b.scheduledDate) : '—'}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {formatPrice(b.totalAmount || b.service?.basePrice || 0)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={b.status} size="sm" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Providers Tab */}
        {tab === 'providers' && (
          <div className="space-y-3">
            {providers.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-100 p-10 text-center">
                <p className="text-slate-500">No providers registered yet</p>
              </div>
            ) : (
              providers.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                    {p.user.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">
                        {p.user.fullName}
                      </p>
                      {p.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {p.serviceCategory} • ⭐ {p.averageRating?.toFixed(1)} •{' '}
                      {p.completedJobs} jobs
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        p.isAvailable
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {p.isAvailable ? 'Online' : 'Offline'}
                    </span>
                    {!p.isVerified && (
                      <Button size="sm" onClick={() => handleApprove(p.id)}>
                        <UserCheck className="w-4 h-4 mr-1" /> Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
