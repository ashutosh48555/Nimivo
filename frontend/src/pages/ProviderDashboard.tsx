import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import StatusBadge from '@/components/shared/StatusBadge';
import Button from '@/components/shared/Button';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import { providerApi } from '@/lib/api';
import type { Booking } from '@/types';
import { useNotificationStore } from '@/store/notificationStore';
import {
  MapPin,
  Clock,
  CheckCircle,
  Play,
  ToggleLeft,
  ToggleRight,
  Star,
  TrendingUp,
  Calendar,
  Zap,
} from 'lucide-react';

export default function ProviderDashboard() {
  const user = useAuthStore((s) => s.user);
  const addToast = useNotificationStore((s) => s.addToast);
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayJobs: 0,
    todayEarnings: 0,
    totalJobs: 0,
    rating: 4.8,
  });

  useEffect(() => {
    loadBookings();
    loadStats();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await providerApi.getAssignedBookings();
      setBookings(data.data || []);
    } catch {
      // Demo mode: show empty
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await providerApi.getStats();
      setStats(data.data);
    } catch {
      // Demo mode: use defaults
    }
  };

  const toggleAvailability = async () => {
    try {
      await providerApi.toggleAvailability();
      setIsAvailable(!isAvailable);
      addToast({
        type: 'info',
        title: isAvailable ? 'You are now offline' : 'You are now online',
      });
    } catch {
      setIsAvailable(!isAvailable);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      await providerApi.acceptBooking(id);
      addToast({ type: 'success', title: 'Booking accepted!' });
      loadBookings();
    } catch {
      addToast({ type: 'error', title: 'Failed to accept' });
    }
  };

  const handleStart = async (id: string) => {
    try {
      await providerApi.startService(id);
      addToast({ type: 'success', title: 'Service started!' });
      loadBookings();
    } catch {
      addToast({ type: 'error', title: 'Failed to start' });
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await providerApi.completeService(id);
      addToast({ type: 'success', title: 'Service completed!' });
      loadBookings();
    } catch {
      addToast({ type: 'error', title: 'Failed to complete' });
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Provider Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, {user?.fullName || 'Provider'}
            </p>
          </div>

          {/* Availability Toggle */}
          <button
            onClick={toggleAvailability}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              isAvailable
                ? 'bg-fp-blue-50 text-fp-blue-700 border border-fp-blue-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            {isAvailable ? (
              <ToggleRight className="w-5 h-5" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
            {isAvailable ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Today's Jobs",
              value: stats.todayJobs,
              icon: Calendar,
              color: 'text-blue-500 bg-blue-50',
            },
            {
              label: "Today's Earnings",
              value: formatPrice(stats.todayEarnings),
              icon: TrendingUp,
              color: 'text-fp-success bg-green-50',
            },
            {
              label: 'Total Jobs',
              value: stats.totalJobs,
              icon: Zap,
              color: 'text-purple-500 bg-purple-50',
            },
            {
              label: 'Rating',
              value: `${stats.rating} ⭐`,
              icon: Star,
              color: 'text-amber-500 bg-amber-50',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-100 p-4"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Bookings */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Assigned Bookings
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-fp-blue-200 border-t-fp-blue-600 rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-10 text-center">
            <p className="text-slate-500">
              {isAvailable
                ? 'No bookings assigned yet. Stay online to receive new bookings!'
                : 'Go online to start receiving bookings.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-slate-100 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {b.service?.name || 'Service'}
                    </p>
                    <p className="text-xs text-slate-400">#{b.id?.slice(0, 8)}</p>
                  </div>
                  <StatusBadge status={b.status} size="sm" />
                </div>

                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {b.address || 'Address'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {b.scheduledDate && formatDate(b.scheduledDate)}{' '}
                    {b.scheduledTime && `at ${formatTime(b.scheduledTime)}`}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <span className="font-bold text-slate-900">
                    {formatPrice(b.totalAmount || b.service?.basePrice || 0)}
                  </span>
                  <div className="flex gap-2">
                    {b.status === 'confirmed' && (
                      <Button size="sm" onClick={() => handleAccept(b.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Accept
                      </Button>
                    )}
                    {b.status === 'en_route' && (
                      <Button size="sm" onClick={() => handleStart(b.id)}>
                        <Play className="w-4 h-4 mr-1" /> Start Service
                      </Button>
                    )}
                    {b.status === 'in_progress' && (
                      <Button size="sm" onClick={() => handleComplete(b.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
