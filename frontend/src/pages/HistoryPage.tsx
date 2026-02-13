import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBookingStore } from '@/store/bookingStore';
import StatusBadge from '@/components/shared/StatusBadge';
import SectionLabel from '@/components/shared/SectionLabel';
import Button from '@/components/shared/Button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Calendar, ArrowRight, Clock, FileText } from 'lucide-react';

export default function HistoryPage() {
  const { bookings, fetchMyBookings, isLoading } = useBookingStore();

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <SectionLabel label="History" />
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              My Bookings
            </h1>
          </div>
          <Link to="/book">
            <Button size="sm">
              New Booking <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No bookings yet
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Book your first service and it will appear here.
            </p>
            <Link to="/book">
              <Button>Book a Service</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <Link
                key={b.id}
                to={`/track/${b.id}`}
                className="block bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-sm">
                      {b.service?.category === 'cleaning' && '🏠'}
                      {b.service?.category === 'plumbing' && '🔧'}
                      {b.service?.category === 'electrical' && '⚡'}
                      {b.service?.category === 'carpentry' && '🪚'}
                      {b.service?.category === 'painting' && '🎨'}
                      {b.service?.category === 'salon' && '✂️'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {b.service?.name || 'Service'}
                      </p>
                      <p className="text-xs text-slate-400">
                        #{b.id?.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} size="sm" />
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {b.scheduledDate
                      ? formatDate(b.scheduledDate)
                      : formatDate(b.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {b.service?.estimatedDurationMinutes
                      ? `${b.service.estimatedDurationMinutes} min`
                      : '—'}
                  </span>
                  <span className="ml-auto font-semibold text-sm text-slate-900">
                    {formatPrice(b.totalAmount || b.service?.basePrice || 0)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
