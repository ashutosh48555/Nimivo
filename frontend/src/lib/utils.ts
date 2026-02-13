import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)}, ${formatTime(dateString)}`;
}

export function generateBookingCode(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK${date}${random}`;
}

export function getServiceCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    cleaning: '#EC4899',
    plumbing: '#06B6D4',
    electrical: '#F59E0B',
    carpentry: '#8B5CF6',
    painting: '#F97316',
    salon: '#A855F7',
  };
  return colors[category] || '#64748B';
}

export function getStatusColor(status: string): { text: string; bg: string } {
  const colors: Record<string, { text: string; bg: string }> = {
    pending: { text: 'text-amber-600', bg: 'bg-amber-50' },
    confirmed: { text: 'text-blue-600', bg: 'bg-blue-50' },
    assigned: { text: 'text-blue-600', bg: 'bg-blue-50' },
    en_route: { text: 'text-violet-600', bg: 'bg-violet-50' },
    in_transit: { text: 'text-violet-600', bg: 'bg-violet-50' },
    arrived: { text: 'text-cyan-600', bg: 'bg-cyan-50' },
    in_progress: { text: 'text-indigo-600', bg: 'bg-indigo-50' },
    completed: { text: 'text-green-600', bg: 'bg-green-50' },
    cancelled: { text: 'text-red-600', bg: 'bg-red-50' },
    no_show: { text: 'text-slate-600', bg: 'bg-slate-100' },
  };
  return colors[status] || { text: 'text-slate-600', bg: 'bg-slate-100' };
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    assigned: 'Assigned',
    en_route: 'On the Way',
    in_transit: 'On the Way',
    arrived: 'Arrived',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_show: 'No Show',
  };
  return labels[status] || status;
}
