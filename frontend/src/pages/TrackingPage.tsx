import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookingStore } from '@/store/bookingStore';
import StatusBadge from '@/components/shared/StatusBadge';
import Button from '@/components/shared/Button';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ArrowLeft,
  Navigation,
  CheckCircle,
  User,
} from 'lucide-react';

export default function TrackingPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { currentBooking, fetchBooking, isLoading, cancelBooking } =
    useBookingStore();
  const [eta, setEta] = useState(12);

  useEffect(() => {
    if (bookingId) fetchBooking(bookingId);
  }, [bookingId, fetchBooking]);

  // Simulated countdown
  useEffect(() => {
    if (
      currentBooking?.status === 'en_route' ||
      currentBooking?.status === 'confirmed'
    ) {
      const timer = setInterval(() => {
        setEta((prev) => (prev > 0 ? prev - 1 : 0));
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [currentBooking?.status]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-fp-blue-200 border-t-fp-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentBooking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-500">Booking not found</p>
        <Link to="/history">
          <Button variant="outline">Go to My Bookings</Button>
        </Link>
      </div>
    );
  }

  const b = currentBooking;
  const isActive = ['pending', 'confirmed', 'en_route', 'in_progress'].includes(
    b.status
  );

  const statusSteps = [
    { key: 'pending', label: 'Booking Placed', icon: CheckCircle },
    { key: 'confirmed', label: 'Provider Assigned', icon: User },
    { key: 'en_route', label: 'Provider En Route', icon: Navigation },
    { key: 'in_progress', label: 'Service In Progress', icon: Clock },
    { key: 'completed', label: 'Completed', icon: Star },
  ];

  const currentStepIndex = statusSteps.findIndex((s) => s.key === b.status);

  return (
    <div className="py-10 bg-slate-50 min-h-[80vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <Link
          to="/history"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          My Bookings
        </Link>

        {/* Status card */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {/* Top banner with ETA */}
          {isActive && (
            <div className="bg-gradient-to-r from-fp-blue-700 to-fp-blue-600 px-6 py-6 text-center text-white">
              <p className="text-xs uppercase tracking-wider text-fp-blue-50 mb-1">
                Estimated Arrival
              </p>
              <p className="text-5xl font-extrabold">
                {eta < 10 ? `0${eta}` : eta}
                <span className="text-2xl font-medium ml-1">min</span>
              </p>
              <p className="text-sm text-fp-blue-50 mt-1">
                Provider is on the way!
              </p>
            </div>
          )}

          {/* Status + Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-slate-400">Booking #{b.id?.slice(0, 8)}</p>
                <h2 className="text-lg font-semibold text-slate-900 mt-0.5">
                  {b.service?.name || 'Service'}
                </h2>
              </div>
              <StatusBadge status={b.status} />
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <div className="space-y-0">
                {statusSteps.map((step, i) => {
                  const isPast = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex gap-3">
                      {/* Line + Dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isPast
                              ? 'bg-fp-blue-600 text-white'
                              : 'bg-slate-100 text-slate-400'
                          } ${isCurrent ? 'ring-4 ring-fp-blue-100' : ''}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-8 ${
                              isPast ? 'bg-fp-blue-600' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pb-6">
                        <p
                          className={`text-sm font-medium ${
                            isPast ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                {b.address || '123, Main Street, Mumbai'}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                {b.scheduledDate
                  ? `${formatDate(b.scheduledDate)} at ${formatTime(b.scheduledTime || '')}`
                  : 'Today'}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500">Total</span>
                <span className="font-bold text-slate-900">
                  {formatPrice(b.totalAmount || b.service?.basePrice || 0)}
                </span>
              </div>
            </div>

            {/* Provider card */}
            {b.provider && (
              <div className="mt-4 flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4">
                <div className="w-12 h-12 bg-fp-blue-50 rounded-full flex items-center justify-center text-sm font-bold text-fp-blue-700">
                  {b.provider.user?.fullName
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || 'P'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {b.provider.user?.fullName || 'Provider'}
                  </p>
                  <p className="text-xs text-slate-400">
                    ⭐ {b.provider.averageRating?.toFixed(1) || '4.8'} •{' '}
                    {b.provider.completedJobs || 0} jobs
                  </p>
                </div>
                <a
                  href={`tel:${b.provider.user?.phone || ''}`}
                  className="w-10 h-10 bg-fp-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-fp-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Cancel button */}
            {isActive && b.status !== 'in_progress' && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cancelBooking(b.id)}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  Cancel Booking
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
