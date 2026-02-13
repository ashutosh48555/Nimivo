import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@/lib/validators';
import type { BookingFormValues } from '@/lib/validators';
import { useBookingStore } from '@/store/bookingStore';
import { useNotificationStore } from '@/store/notificationStore';
import { MOCK_SERVICES } from '@/lib/constants';
import { formatPrice, formatDuration, getServiceCategoryColor } from '@/lib/utils';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import SectionLabel from '@/components/shared/SectionLabel';
import type { Service } from '@/types';
import { MapPin, Clock, Calendar, CheckCircle, ArrowLeft, ArrowRight, Phone } from 'lucide-react';

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const createBooking = useBookingStore((s) => s.createBooking);
  const isLoading = useBookingStore((s) => s.isLoading);
  const addToast = useNotificationStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: serviceId || '',
    },
  });

  const watchedServiceId = watch('serviceId');

  useEffect(() => {
    if (serviceId) {
      const svc = MOCK_SERVICES.find((s) => s.id === serviceId);
      if (svc) {
        setSelectedService(svc as Service);
        setValue('serviceId', serviceId);
        setStep(2);
      }
    }
  }, [serviceId, setValue]);

  useEffect(() => {
    if (watchedServiceId) {
      const svc = MOCK_SERVICES.find((s) => s.id === watchedServiceId);
      if (svc) setSelectedService(svc as Service);
    }
  }, [watchedServiceId]);

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const booking = await createBooking({
        serviceId: values.serviceId,
        address: values.address,
        latitude: 19.076,
        longitude: 72.8777,
        scheduledDate: values.scheduledDate,
        scheduledTime: values.scheduledTime,
        notes: values.notes,
      });
      addToast({ type: 'success', title: 'Booking created!', message: 'A provider will be assigned shortly.' });
      navigate(`/track/${booking.id}`);
    } catch {
      addToast({ type: 'error', title: 'Booking failed', message: 'Please try again.' });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="py-10 bg-slate-50 min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <SectionLabel label="New Booking" />
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Book a Service
          </h1>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  s <= step
                    ? 'bg-fp-blue-700 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-0.5 rounded ${
                    s < step ? 'bg-fp-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Choose Service */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Choose a service
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {MOCK_SERVICES.map((svc) => {
                  const color = getServiceCategoryColor(svc.category);
                  const isSelected = watchedServiceId === svc.id;
                  return (
                    <button
                      type="button"
                      key={svc.id}
                      onClick={() => {
                        setValue('serviceId', svc.id);
                        setSelectedService(svc as Service);
                      }}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-fp-blue-600 bg-fp-blue-50/50'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        {svc.category === 'cleaning' && '🏠'}
                        {svc.category === 'plumbing' && '🔧'}
                        {svc.category === 'electrical' && '⚡'}
                        {svc.category === 'carpentry' && '🪚'}
                        {svc.category === 'painting' && '🎨'}
                        {svc.category === 'salon' && '✂️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">{svc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <span>{formatPrice(svc.basePrice)}</span>
                          <span>•</span>
                          <span>{formatDuration(svc.estimatedDurationMinutes)}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-fp-blue-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.serviceId && (
                <p className="text-xs text-red-500 mt-2">{errors.serviceId.message}</p>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  disabled={!watchedServiceId}
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Address & Schedule */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Where & When
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                  <Input
                    label="Your Address"
                    placeholder="Enter your full address"
                    className="pl-9"
                    error={errors.address?.message}
                    {...register('address')}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                  <Input
                    label="Contact Number"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="pl-9"
                    maxLength={10}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                    <Input
                      label="Date"
                      type="date"
                      min={today}
                      className="pl-9"
                      error={errors.scheduledDate?.message}
                      {...register('scheduledDate')}
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-[39px] w-4 h-4 text-slate-400" />
                    <Input
                      label="Preferred Time"
                      type="time"
                      className="pl-9"
                      error={errors.scheduledTime?.message}
                      {...register('scheduledTime')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Notes (optional)
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fp-blue-500/20 focus:border-fp-blue-500 resize-none"
                    rows={3}
                    placeholder="Any special instructions for the provider..."
                    {...register('notes')}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Review <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && selectedService && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Review & Confirm
              </h2>

              <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Service</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Duration</span>
                  <span className="text-sm font-medium text-slate-700">
                    {formatDuration(selectedService.estimatedDurationMinutes)}
                  </span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-fp-blue-700">
                    {formatPrice(selectedService.basePrice)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button type="submit" isLoading={isLoading} size="lg">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
