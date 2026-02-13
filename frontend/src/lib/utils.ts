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
    pending: { text: '#F59E0B', bg: '#FEF3C7' },
    assigned: { text: '#3B82F6', bg: '#DBEAFE' },
    in_transit: { text: '#8B5CF6', bg: '#EDE9FE' },
    arrived: { text: '#06B6D4', bg: '#CFFAFE' },
    in_progress: { text: '#6366F1', bg: '#E0E7FF' },
    completed: { text: '#10B981', bg: '#D1FAE5' },
    cancelled: { text: '#EF4444', bg: '#FEE2E2' },
  };
  return colors[status] || { text: '#64748B', bg: '#F1F5F9' };
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    assigned: 'Assigned',
    in_transit: 'On the Way',
    arrived: 'Arrived',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}
