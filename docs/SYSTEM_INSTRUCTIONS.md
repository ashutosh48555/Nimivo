# Nimivo — System Instructions for AI Builders

> **This document is the single source of truth.** Any AI agent, developer, or tool building Nimivo must follow these instructions exactly. Read this entire file before writing a single line of code.

---

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| **Name** | Nimivo |
| **Tagline** | "Get Professional Help Within 15 Minutes" |
| **UVP** | Lightning-fast home services with guaranteed arrival in 15 minutes |
| **Brand Positioning** | Fast + Professional + At Your Service |
| **Domain** | Instant home service booking (cleaning, plumbing, electrical, carpentry, painting, salon) |
| **Currency** | INR (₹) |
| **Market** | India |

---

## 2. PROBLEM STATEMENT

**Hackathon Problem Statement 7: Instant Service Booking System**

Users need a fast and simple way to book house help services like cleaning, plumbing, electrician, cooking, etc. The system should allow instant booking and show estimated arrival time.

### Requirements (Non-Negotiable)
- User registration & login
- Service category selection
- Instant booking option
- Booking confirmation with unique ID
- Estimated arrival time display
- Booking history section

### Objective
Create a system where users can book house help services and receive assistance within 15 minutes using smart automation.

---

## 3. THE THREE PANELS

### 3.1 Customer Panel (PRIMARY FOCUS — Build This First)

| Page | Priority | Description |
|---|---|---|
| Login / Register | P0 | Email + password auth. Split-screen layout. Multi-step register form. |
| Dashboard (Home) | P0 | Hero section with location search, service grid (6 cards), "How It Works" steps, testimonials, trust signals |
| Service Catalog | P0 | Filterable grid of all services. Sidebar filters (category, price range, availability). Sort by price/rating/duration |
| Service Detail | P0 | Full service info, image gallery, pricing tab, reviews tab, sticky booking sidebar |
| Instant Booking Flow | P0 | 3-step form: (1) Service confirmation → (2) Location + Contact → (3) Review + Confirm. Zod validation. |
| Booking Confirmation | P0 | Success animation, booking ID (BK + YYYYMMDD + 4 random chars), provider card, ETA countdown, "Track Live" CTA |
| Live Tracking | P0 | Google Maps embed (60% height), provider location pin, route polyline, ETA countdown, status timeline, swipe-up detail card |
| Booking History | P0 | Tabs: All / Active / Completed / Cancelled. Card list with booking ID, service, provider, status badge, price. Infinite scroll. |
| Payment Gateway | P1 | Stripe integration. Price breakdown (base + tax). Payment confirmation. |
| Ratings & Reviews | P1 | 1-5 star rating + text review after service completion. |
| Profile & Settings | P1 | Photo upload, saved addresses, payment methods, notification preferences |

### 3.2 Service Provider Panel (SECONDARY — Build After Backend)

| Page | Priority | Description |
|---|---|---|
| Provider Login | P0 | Reuse auth system with role=provider |
| Dashboard | P0 | Availability toggle (prominent), today's earnings, jobs completed, rating, active booking card, pending request list |
| Incoming Request Modal | P0 | Full-screen overlay with 30s countdown timer, service details, distance, payment amount, Accept/Reject buttons |
| Active Job View | P0 | Map (top 50%) + job detail card (bottom 50%). Status update buttons: "I've Arrived" → "Start Service" → "Complete Service". Navigation button. |
| Job History | P1 | Past jobs list with earnings |
| Earnings Overview | P1 | Balance, daily/weekly/monthly breakdown, transaction history, withdrawal |

### 3.3 Admin Panel (BASIC ONLY — Build Last)

| Page | Priority | Description |
|---|---|---|
| Dashboard | P1 | Stats cards (bookings today, active providers, revenue, avg rating). Line chart (bookings trend). Bar chart (revenue by service). Recent bookings table. Activity feed. |
| Bookings Management | P1 | Full data table with filters (status, date, service). Sortable columns. Booking detail modal with status timeline. |
| Provider Management | P1 | Provider list with verification status. Approve/Reject verification. Suspend/Activate accounts. |
| Services Management | P2 | Service CRUD. Add/edit service with name, category, price, duration, description. |
| User Management | P2 | User list with search. View user details and booking history. |
| Pricing Management | P2 | Surge pricing rules. Discount/promo code management. |

---

## 4. TECH STACK (MANDATORY)

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool (NOT Create React App) |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Pre-built accessible component library |
| Zustand | State management (NOT Redux) |
| React Router DOM | Client-side routing |
| Socket.IO Client | Real-time updates |
| Google Maps API / Mapbox | Maps, distance, ETA |
| Lucide React | Icons |
| Zod | Form validation |
| Axios | HTTP client |
| React Hook Form | Form management |
| Framer Motion | Animations (subtle only) |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 20 | Runtime |
| Express.js | HTTP framework |
| TypeScript | Type safety |
| Drizzle ORM | Database ORM (type-safe, no runtime overhead) |
| PostgreSQL | Primary database |
| Redis (Upstash) | Cache, pub/sub, sessions, job queue |
| Socket.IO | Real-time server |
| Clerk | Managed authentication |
| Zod | Input validation |
| BullMQ | Background job queue |
| Cloudinary | File/image upload |

### External Services
| Service | Purpose |
|---|---|
| Google Maps Distance Matrix API | Dynamic ETA calculation |
| Twilio | SMS notifications |
| SendGrid | Email notifications |
| Firebase Cloud Messaging | Push notifications (Phase 2) |
| Stripe | Payments (Phase 2) |

### Hosting & Infrastructure
| Component | Host |
|---|---|
| Frontend | Vercel |
| Backend | Railway.app or Render.com |
| Database | Supabase PostgreSQL or Railway PostgreSQL |
| Redis | Upstash (serverless) |
| CDN | Cloudflare |

---

## 5. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│   React 18 + Vite + Tailwind + shadcn/ui                │
│   ┌──────────┐  ┌────────────┐  ┌──────────────────┐   │
│   │  Pages   │  │ Socket.IO  │  │  Google Maps     │   │
│   │  + Zustand│  │  Client    │  │  (Distance/ETA)  │   │
│   └────┬─────┘  └─────┬──────┘  └────────┬─────────┘   │
└────────┼───────────────┼──────────────────┼──────────────┘
         │ REST API      │ WebSocket        │ API
┌────────▼───────────────▼──────────────────▼──────────────┐
│                    BACKEND                                │
│   Express.js + TypeScript                                │
│   ┌────────────┐  ┌──────────┐  ┌───────────────────┐   │
│   │ Auth       │  │ Booking  │  │ Dispatch Engine   │   │
│   │ (Clerk)    │  │ Router   │  │ (Auto-assign)     │   │
│   └────────────┘  └──────────┘  └───────────────────┘   │
└────────┬───────────────┬──────────────────┬──────────────┘
         │               │                  │
┌────────▼───────────────▼──────────────────▼──────────────┐
│                    DATA LAYER                             │
│   ┌──────────────┐  ┌──────────┐  ┌─────────────────┐   │
│   │ PostgreSQL   │  │  Redis   │  │  Socket.IO      │   │
│   │ (Drizzle)    │  │ (Upstash)│  │  (Real-time)    │   │
│   │ Users        │  │ Sessions │  │  Live ETA       │   │
│   │ Bookings     │  │ Job Queue│  │  Status Updates │   │
│   │ Providers    │  │ Location │  │  Notifications  │   │
│   │ Services     │  │ Cache    │  │                 │   │
│   └──────────────┘  └──────────┘  └─────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Data Flow — Instant Booking
```
1. User clicks "Book Now"           → POST /api/bookings
2. Server validates + creates       → Save to PostgreSQL (status: pending)
3. Dispatch Engine triggers          → Find nearest provider (Redis cache, PostGIS within 5km)
4. Calculate ETA                     → Haversine formula (static) or Google Maps (dynamic)
5. Assign provider                   → Update booking (status: assigned), mark provider busy
6. Emit real-time events             → Redis pub/sub → Socket.IO → User sees "Provider assigned, ETA: 12 min"
7. Send notifications (async)        → BullMQ queue → Twilio SMS + SendGrid email
8. 30s timeout                       → If provider doesn't accept → auto-reassign to next best
```

---

## 6. DATABASE SCHEMA

### Tables

**users** — `id` (UUID PK), `email` (unique), `phone` (unique), `full_name`, `role` (customer|provider|admin), `password_hash`, `created_at`, `updated_at`

**services** — `id` (UUID PK), `name`, `description`, `category`, `base_price` (decimal), `estimated_duration_minutes` (int), `icon_url`, `is_active` (bool), `created_at`

**providers** — `id` (UUID PK), `user_id` (FK→users), `service_ids` (UUID[]), `current_latitude`, `current_longitude`, `is_available` (bool), `status` (available|busy|offline), `rating` (decimal), `total_jobs` (int), `verification_status` (pending|verified|rejected), `last_location_update`, `created_at`

**bookings** — `id` (UUID PK), `booking_code` (unique, format: BK + YYYYMMDD + 4 random alphanumeric), `user_id` (FK→users), `service_id` (FK→services), `provider_id` (FK→providers, nullable), `service_address`, `service_latitude`, `service_longitude`, `contact_phone`, `special_instructions`, `status` (pending|assigned|in_transit|arrived|in_progress|completed|cancelled), `base_price`, `distance_charge`, `surge_multiplier`, `total_price`, `estimated_arrival_minutes`, `provider_assigned_at`, `provider_arrived_at`, `service_started_at`, `service_completed_at`, `created_at`, `updated_at`, `cancelled_at`, `cancellation_reason`

**booking_status_log** — `id` (UUID PK), `booking_id` (FK→bookings), `status`, `notes`, `created_at`

**notifications** — `id` (UUID PK), `user_id` (FK→users), `booking_id` (FK→bookings), `type`, `channel` (email|sms|push), `status` (pending|sent|failed), `content`, `sent_at`, `created_at`

**ratings** — `id` (UUID PK), `booking_id` (FK→bookings, unique), `user_id` (FK→users), `provider_id` (FK→providers), `rating` (1-5), `review`, `created_at`

### Indexes
```sql
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_providers_status ON providers(status);
CREATE INDEX idx_providers_location ON providers(current_latitude, current_longitude);
```

### Seed Data — 6 Core Services
| Name | Category | Price (₹) | Duration (min) |
|---|---|---|---|
| Deep Cleaning | cleaning | 499 | 120 |
| Plumbing | plumbing | 349 | 60 |
| Electrician | electrical | 399 | 90 |
| Carpentry | carpentry | 599 | 150 |
| Painting | painting | 799 | 180 |
| Salon at Home | salon | 449 | 90 |

---

## 7. API ENDPOINTS

### Auth (`/api/auth`)
| Method | Path | Description |
|---|---|---|
| POST | `/register` | Register user (email, phone, fullName, password, role) |
| POST | `/login` | Login (email, password) → returns JWT |
| POST | `/refresh` | Refresh access token |
| GET | `/profile` | Get current user profile (auth required) |
| PUT | `/profile` | Update profile (auth required) |

### Services (`/api/services`)
| Method | Path | Description |
|---|---|---|
| GET | `/` | List all active services. Query: `?category=cleaning&sort=price` |
| GET | `/:id` | Get single service details |

### Bookings (`/api/bookings`)
| Method | Path | Description |
|---|---|---|
| POST | `/` | Create booking (auth required). Body: serviceId, address, lat, lng, phone, notes |
| GET | `/` | Get user's bookings (auth required). Query: `?status=active&limit=10&offset=0` |
| GET | `/:id` | Get booking details (auth required, must be owner) |
| PATCH | `/:id/status` | Update booking status (auth required). Body: status, notes |
| POST | `/:id/cancel` | Cancel booking (auth required). Body: reason |
| POST | `/:id/rate` | Rate completed booking (auth required). Body: rating (1-5), review |

### Providers (`/api/providers`)
| Method | Path | Description |
|---|---|---|
| GET | `/available` | Find available providers near location. Query: `?lat=x&lng=y&serviceId=z&radius=5` |
| PATCH | `/:id/status` | Update availability (auth required, role=provider). Body: status |
| PATCH | `/:id/location` | Update location (auth required, role=provider). Body: lat, lng |
| GET | `/:id/earnings` | Get earnings summary (auth required, role=provider) |
| GET | `/:id/jobs` | Get job history (auth required, role=provider) |

### Admin (`/api/admin`)
| Method | Path | Description |
|---|---|---|
| GET | `/dashboard` | Dashboard stats (auth required, role=admin) |
| GET | `/bookings` | All bookings with filters (auth required, role=admin) |
| GET | `/providers` | All providers (auth required, role=admin) |
| PATCH | `/providers/:id/verify` | Approve/reject provider verification (auth required, role=admin) |
| GET | `/users` | All users (auth required, role=admin) |

---

## 8. REAL-TIME SYSTEM (Socket.IO)

### Connection
- Authenticate socket via JWT token on connection
- Attach `userId` to socket instance

### Rooms
- `booking:{bookingId}` — joined by customer + assigned provider
- `user:{userId}` — personal notification channel
- `provider:{providerId}` — provider-specific events
- `admin` — admin dashboard live feed

### Events Emitted (Server → Client)
| Event | Payload | Description |
|---|---|---|
| `booking_created` | `{ bookingId, bookingCode, service, eta }` | New booking confirmed |
| `provider_assigned` | `{ bookingId, provider: { name, photo, rating, phone }, eta }` | Provider matched |
| `eta_updated` | `{ bookingId, estimatedMinutes, providerLocation: { lat, lng } }` | Every 30 seconds |
| `status_changed` | `{ bookingId, oldStatus, newStatus, timestamp }` | Booking status transition |
| `provider_location` | `{ bookingId, lat, lng }` | Live provider position |
| `notification` | `{ type, title, body, bookingId, timestamp }` | In-app notification |
| `new_booking_request` | `{ bookingId, service, customer, distance, payment, timeoutSeconds }` | To provider |

### Events Listened (Client → Server)
| Event | Payload | Description |
|---|---|---|
| `join_booking` | `{ bookingId }` | User joins booking room |
| `leave_booking` | `{ bookingId }` | User leaves booking room |
| `update_location` | `{ lat, lng }` | Provider sends location updates |
| `accept_booking` | `{ bookingId }` | Provider accepts request |
| `reject_booking` | `{ bookingId, reason }` | Provider rejects request |

---

## 9. DISPATCH ENGINE

### Algorithm: `dispatchProvider(booking)`

```
1. FIND nearby providers
   → WHERE status = 'available'
   → AND booking.serviceId IN provider.service_ids
   → AND distance ≤ 5km (PostGIS ST_DWithin)
   → ORDER BY rating DESC, distance ASC
   → LIMIT 10

2. IF none found → expand radius to 10km → retry

3. IF still none → throw NO_PROVIDER_AVAILABLE error → notify user

4. CALCULATE ETA for each provider
   → Haversine distance → distance / 20 km/h * 60 + 5 min prep
   → Filter to providers where ETA ≤ 15 minutes

5. SCORE each viable provider
   → score = (rating × 0.6) + ((15 - eta) × 0.4)
   → Select highest score

6. ASSIGN best provider
   → Update provider status → 'busy'
   → Update booking → provider_id, estimated_arrival_minutes, status: 'assigned'

7. NOTIFY provider
   → Redis publish('new_booking', { providerId, bookingId })
   → Socket.IO emit to provider room

8. SET 30-second timeout
   → If provider doesn't accept → reassign to next best provider
   → Repeat up to 3 times → then fail gracefully
```

### ETA Calculation

```javascript
// Haversine formula for straight-line distance
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)² + Math.cos(toRad(lat1)) × Math.cos(toRad(lat2)) × Math.sin(dLng/2)²;
  return R × 2 × Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Static ETA (MVP)
function calculateETA(providerLat, providerLng, serviceLat, serviceLng) {
  const distance = getDistanceKm(providerLat, providerLng, serviceLat, serviceLng);
  const travelMinutes = (distance / 20) * 60; // 20 km/h avg city speed
  const prepMinutes = 5;
  return Math.min(Math.ceil(travelMinutes + prepMinutes), 15); // Cap at 15 min
}
```

---

## 10. NOTIFICATION SYSTEM

### Channels
| Channel | Service | When |
|---|---|---|
| In-App | Socket.IO | Always (real-time) |
| Email | SendGrid | Booking confirmed, service completed |
| SMS | Twilio | Provider assigned (with ETA), provider arrived |
| Push | Firebase (Phase 2) | All events |

### Notification Types
| Type | Message Template |
|---|---|
| `booking_confirmed` | "Your booking #{bookingCode} is confirmed!" |
| `provider_assigned` | "{providerName} is on the way. ETA: {eta} min" |
| `provider_in_transit` | "Your provider is en route" |
| `provider_arrived` | "Your provider has arrived!" |
| `service_started` | "Service in progress" |
| `service_completed` | "Service completed! Rate your experience" |
| `booking_cancelled` | "Booking #{bookingCode} has been cancelled" |

### Queue (BullMQ)
- Notifications are sent via background queue
- 3 retries with exponential backoff (2s, 4s, 8s)
- Failures are logged, never thrown to user

---

## 11. SECURITY

| Measure | Implementation |
|---|---|
| HTTPS | Enforced by Vercel/Railway |
| Rate Limiting | Auth: 5 req/min, Booking: 10 req/min, General: 100 req/min |
| Input Validation | Zod schemas on every endpoint |
| SQL Injection | Parameterized queries via Drizzle ORM |
| XSS Protection | Helmet.js middleware |
| CORS | Whitelist frontend domain only |
| Password Hashing | bcrypt with 10 salt rounds |
| JWT | 15 min access token, 7 day refresh token |
| Environment Vars | Never committed. `.env` in `.gitignore` |

---

## 12. NON-FUNCTIONAL REQUIREMENTS

| Metric | Target |
|---|---|
| API Response Time | < 200ms (p95) |
| Database Query Time | < 50ms (p95) |
| Booking Creation | < 2 seconds end-to-end |
| Real-time Latency | < 100ms |
| Frontend FCP | < 2 seconds |
| Lighthouse Score | > 80 (mobile) |
| Uptime | 99.5% |
| Error Rate | < 1% |

---

## 13. BUILD PRIORITY ORDER

```
Phase 1: CUSTOMER PANEL (Hours 1-8)     ← BUILD FIRST — Demo showpiece
Phase 2: BACKEND APIs    (Hours 9-12)    ← Makes everything functional
Phase 3: PROVIDER PANEL  (Hours 13-14)   ← Completes ecosystem
Phase 4: ADMIN PANEL     (Hour 15)       ← Basic monitoring only
```

### Phase 1 Detail:
1. Project setup (Vite + React + TS + Tailwind + shadcn/ui)
2. Auth pages (Login, Register)
3. Home/Landing page (Hero, Service Grid, How It Works, Testimonials)
4. Service Catalog + Service Detail
5. Booking Flow (3-step form)
6. Booking Confirmation
7. Live Tracking page
8. Booking History
9. Profile & Settings

### Phase 2 Detail:
1. Express server + middleware
2. Drizzle ORM schema + PostgreSQL
3. Auth endpoints (register, login, JWT)
4. Service endpoints
5. Booking endpoints + Dispatch Engine
6. Socket.IO real-time
7. Notification service

### Phase 3 Detail:
1. Provider Dashboard
2. Incoming Request Modal
3. Active Job View
4. Earnings page

### Phase 4 Detail:
1. Admin Dashboard (stats + charts)
2. Bookings table
3. Provider management

---

## 14. CRITICAL DESIGN MANDATE — DO NOT MAKE AN AI-LOOKING WEBSITE

> **The #1 design requirement is that Nimivo must NOT look like a typical AI-generated website.** Follow the design patterns from https://home.utilita.co.uk/ (Utilita Home).

### What Makes a Website Look AI-Generated (AVOID ALL OF THESE):
- Perfectly symmetric 3-column card grids with identical padding
- Generic purple/blue/gradient hero sections
- Overuse of rounded-full badges everywhere
- Cookie-cutter "Features" sections with 3 icons in a row
- Bland, emotionless stock photography feeling
- Every section centered with identical spacing
- Generic border-radius on everything
- "Get Started" / "Learn More" buttons with no personality
- Raleway + Inter font combo
- Rainbow gradients or glassmorphism for no reason
- Every card having the same exact structure
- Overly minimal to the point of looking empty

### What Utilita Home Does Right (COPY THESE PATTERNS):
- **Bold, confident hero** with large imagery occupying 60%+ of viewport
- **Section sub-labels** like "SOLAR MADE SIMPLE", "WHY CHOOSE US", "TESTIMONIALS" — small uppercase text above section headings
- **Asymmetric layouts** — text left / image right, then reversed in next section
- **Real testimonials** with customer names, locations, and photos
- **Sticky navigation** with logo left, links center, CTA button right
- **Trust signals** — verified badges, ratings, "25-year warranty" style callouts
- **FAQ accordion** at bottom of pages
- **CTA bar** — bold call-to-action sections between content blocks
- **Footer** with organized link columns (Services, Discover, Support)
- **Human, conversational copy** — "We're here for you", not "Our platform provides"
- **Layered visual depth** — overlapping elements, subtle shadows, section backgrounds alternating white/light gray
- **Service category cards** with individual accent colors, not all the same
- **Animated carousel** for testimonials
- **Video/photo backgrounds** in hero, not flat gradients

### Detailed reference: See DESIGN_REFERENCE.md

---

## 15. SUCCESS CRITERIA

### MVP is Complete When:
- [ ] User can register and login
- [ ] User can browse 6 services with filters
- [ ] User can book a service in < 3 clicks
- [ ] Booking generates unique ID (BK + date + random)
- [ ] ETA displays (5-15 minutes range)
- [ ] Provider auto-assigned by dispatch engine
- [ ] Real-time status updates via Socket.IO
- [ ] Booking history displays with filters
- [ ] Provider can accept/reject bookings
- [ ] Provider can update job status
- [ ] Admin can view all bookings and stats
- [ ] Deployed to production (Vercel + Railway)
- [ ] Mobile responsive (375px, 768px, 1920px)
- [ ] Lighthouse score > 80

### 5-Minute Demo Script:
1. (0-1 min) Intro — "Nimivo: Professional help within 15 minutes"
2. (1-2 min) Register + browse services + select "Deep Cleaning"
3. (2-3 min) Enter address → "Book Now" → booking created in < 2 seconds → provider auto-assigned → ETA shown
4. (3-4 min) Show live tracking — ETA countdown, provider location on map, status timeline
5. (4-5 min) Show booking history → highlight: 15-min guarantee, auto-dispatch, real-time updates, transparency
