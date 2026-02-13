import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  decimal,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['customer', 'provider', 'admin']);
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'confirmed',
  'en_route',
  'in_progress',
  'completed',
  'cancelled',
  'no_show',
]);
export const serviceCategoryEnum = pgEnum('service_category', [
  'cleaning',
  'plumbing',
  'electrical',
  'carpentry',
  'painting',
  'salon',
]);

// ─── Users ───────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 15 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('customer').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Services ────────────────────────────────────────────────────
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description').notNull(),
  category: serviceCategoryEnum('category').notNull(),
  basePrice: integer('base_price').notNull(),
  estimatedDurationMinutes: integer('estimated_duration_minutes').notNull(),
  iconUrl: text('icon_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Providers ───────────────────────────────────────────────────
export const providers = pgTable('providers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull()
    .unique(),
  serviceCategory: serviceCategoryEnum('service_category').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  isAvailable: boolean('is_available').default(false).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
  completedJobs: integer('completed_jobs').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Bookings ────────────────────────────────────────────────────
export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id')
    .references(() => users.id)
    .notNull(),
  serviceId: uuid('service_id')
    .references(() => services.id)
    .notNull(),
  providerId: uuid('provider_id').references(() => providers.id),
  status: bookingStatusEnum('status').default('pending').notNull(),
  address: text('address').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  scheduledDate: varchar('scheduled_date', { length: 10 }).notNull(),
  scheduledTime: varchar('scheduled_time', { length: 5 }).notNull(),
  totalAmount: integer('total_amount').notNull(),
  notes: text('notes'),
  etaMinutes: integer('eta_minutes'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Ratings ─────────────────────────────────────────────────────
export const ratings = pgTable('ratings', {
  id: uuid('id').defaultRandom().primaryKey(),
  bookingId: uuid('booking_id')
    .references(() => bookings.id)
    .notNull()
    .unique(),
  customerId: uuid('customer_id')
    .references(() => users.id)
    .notNull(),
  providerId: uuid('provider_id')
    .references(() => providers.id)
    .notNull(),
  score: integer('score').notNull(),
  review: text('review'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Notifications ───────────────────────────────────────────────
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
