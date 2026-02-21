# Nimivo — Project Structure Reference

> Complete folder structure, file descriptions, environment setup, and infrastructure reference for the Nimivo project.

---

## 1. REPOSITORY LAYOUT

```
Nimivo/
│
├── SYSTEM_INSTRUCTIONS.md          # AI builder master reference
├── DESIGN_REFERENCE.md             # Design bible (colors, layout, components)
├── PROJECT_STRUCTURE.md            # This file
├── plan.md                         # Original hackathon plan
│
├── frontend/                       # React 18 + Vite + TypeScript
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── og-image.png            # Social share image
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui components (auto-generated)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   └── separator.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx       # Sticky nav with logo, links, CTA
│   │   │   │   ├── Footer.tsx       # 3-column footer (navy bg)
│   │   │   │   ├── MobileNav.tsx    # Hamburger slide-in menu
│   │   │   │   └── Layout.tsx       # Main layout wrapper (header + outlet + footer)
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx  # Hero with location search + CTA
│   │   │   │   ├── ServiceGrid.tsx  # 6 service cards grid
│   │   │   │   ├── HowItWorks.tsx   # 3-step process section
│   │   │   │   ├── WhyChooseUs.tsx  # Alternating text+icon value props
│   │   │   │   ├── Testimonials.tsx # Auto-scrolling carousel
│   │   │   │   ├── CTABanner.tsx    # Navy background CTA strip
│   │   │   │   └── FAQ.tsx          # Accordion FAQ section
│   │   │   ├── services/
│   │   │   │   ├── ServiceCard.tsx  # Individual service card (colored left border)
│   │   │   │   ├── ServiceFilter.tsx # Sidebar filters (category, price, sort)
│   │   │   │   └── ServiceDetail.tsx # Full service page (tabs, booking sidebar)
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm.tsx   # 3-step booking wizard
│   │   │   │   ├── StepService.tsx   # Step 1: Service confirmation
│   │   │   │   ├── StepLocation.tsx  # Step 2: Address + contact
│   │   │   │   ├── StepReview.tsx    # Step 3: Review + confirm
│   │   │   │   ├── BookingConfirmation.tsx  # Success modal with confetti
│   │   │   │   └── PriceBreakdown.tsx # Price calculation display
│   │   │   ├── tracking/
│   │   │   │   ├── TrackingMap.tsx    # Google Maps with markers + route
│   │   │   │   ├── ETACountdown.tsx   # Large countdown display
│   │   │   │   ├── StatusTimeline.tsx  # Vertical status tracker
│   │   │   │   └── ProviderCard.tsx    # Provider info + call/message
│   │   │   ├── history/
│   │   │   │   ├── BookingList.tsx     # Paginated booking list
│   │   │   │   ├── BookingCard.tsx     # Individual booking history card
│   │   │   │   ├── BookingDetail.tsx   # Booking detail modal
│   │   │   │   └── BookingFilters.tsx  # Status tabs + date filter
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx       # Email + password form
│   │   │   │   ├── RegisterForm.tsx    # Multi-step registration
│   │   │   │   ├── MarketingPanel.tsx  # Right-side brand panel
│   │   │   │   └── ProtectedRoute.tsx  # Auth guard wrapper
│   │   │   ├── profile/
│   │   │   │   ├── ProfilePage.tsx     # User info + edit
│   │   │   │   ├── AddressList.tsx     # Saved addresses
│   │   │   │   └── NotificationPrefs.tsx # Notification settings
│   │   │   ├── provider/
│   │   │   │   ├── ProviderDashboard.tsx  # Main provider view
│   │   │   │   ├── AvailabilityToggle.tsx # Large on/off toggle
│   │   │   │   ├── IncomingRequest.tsx    # Full-screen booking request modal
│   │   │   │   ├── ActiveJob.tsx          # Map + job details
│   │   │   │   ├── JobStatusButtons.tsx   # "Arrived" / "Start" / "Complete"
│   │   │   │   └── EarningsPage.tsx       # Earnings overview
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout.tsx        # Sidebar + content area
│   │   │   │   ├── AdminDashboard.tsx     # Stats + charts + recent tables
│   │   │   │   ├── BookingsTable.tsx      # All bookings data table
│   │   │   │   ├── ProvidersTable.tsx     # Provider management table
│   │   │   │   └── StatsCards.tsx         # Dashboard stat cards
│   │   │   └── shared/
│   │   │       ├── StatusBadge.tsx         # Colored status pill
│   │   │       ├── LoadingSkeleton.tsx     # Shimmer loading state
│   │   │       ├── EmptyState.tsx          # "No results" illustration
│   │   │       ├── SectionLabel.tsx        # Uppercase emerald sub-label
│   │   │       ├── NotificationToast.tsx   # Toast notification component
│   │   │       └── ErrorBoundary.tsx       # Error boundary wrapper
│   │   ├── pages/
│   │   │   ├── HomePage.tsx          # Assembles home sections
│   │   │   ├── ServicesPage.tsx      # Service catalog with filters
│   │   │   ├── ServiceDetailPage.tsx # Individual service page
│   │   │   ├── BookingPage.tsx       # Booking flow wizard
│   │   │   ├── TrackingPage.tsx      # Live booking tracking
│   │   │   ├── HistoryPage.tsx       # Booking history list
│   │   │   ├── LoginPage.tsx         # Login split-screen
│   │   │   ├── RegisterPage.tsx      # Register split-screen
│   │   │   ├── ProfilePage.tsx       # User profile & settings
│   │   │   ├── ProviderPage.tsx      # Provider dashboard
│   │   │   └── AdminPage.tsx         # Admin dashboard
│   │   ├── hooks/
│   │   │   ├── useAuth.ts            # Auth state + actions
│   │   │   ├── useBooking.ts         # Booking actions + state
│   │   │   ├── useSocket.ts          # Socket.IO connection + events
│   │   │   ├── useServices.ts        # Service data fetching
│   │   │   ├── useETA.ts             # ETA countdown logic
│   │   │   ├── useGeolocation.ts     # Browser geolocation API
│   │   │   └── useMediaQuery.ts      # Responsive breakpoint detection
│   │   ├── store/
│   │   │   ├── authStore.ts          # Zustand: user, token, login/logout
│   │   │   ├── bookingStore.ts       # Zustand: active booking, history
│   │   │   ├── serviceStore.ts       # Zustand: service catalog
│   │   │   └── notificationStore.ts  # Zustand: toast notifications
│   │   ├── lib/
│   │   │   ├── api.ts                # Axios instance with interceptors
│   │   │   ├── socket.ts             # Socket.IO client instance
│   │   │   ├── utils.ts              # Helper functions (formatPrice, formatDate, etc.)
│   │   │   ├── constants.ts          # App-wide constants (service categories, status labels)
│   │   │   └── validators.ts         # Zod schemas (booking form, login, register)
│   │   ├── types/
│   │   │   ├── index.ts              # All TypeScript interfaces (User, Service, Booking, Provider, etc.)
│   │   │   └── socket.ts             # Socket event type definitions
│   │   ├── App.tsx                   # Router setup
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Tailwind directives + custom CSS variables
│   ├── components.json               # shadcn/ui config
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── postcss.config.js
│
├── backend/                          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts           # Drizzle ORM + PostgreSQL pool setup
│   │   │   ├── redis.ts              # Redis/Upstash connection
│   │   │   ├── socket.ts             # Socket.IO server setup + events
│   │   │   └── env.ts                # Environment variable validation (Zod)
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Register, Login, RefreshToken, GetProfile
│   │   │   ├── booking.controller.ts # CreateBooking, GetBookings, GetById, UpdateStatus, Cancel, Rate
│   │   │   ├── service.controller.ts # GetAllServices, GetServiceById
│   │   │   ├── provider.controller.ts # UpdateAvailability, UpdateLocation, GetEarnings, GetJobs
│   │   │   └── admin.controller.ts   # DashboardStats, AllBookings, AllProviders, VerifyProvider
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts     # JWT verification + req.user attachment
│   │   │   ├── role.middleware.ts     # Role-based access (customer, provider, admin)
│   │   │   ├── validation.middleware.ts # Zod schema validation wrapper
│   │   │   ├── error.middleware.ts    # Global error handler
│   │   │   └── rateLimiter.middleware.ts # Express rate limiter (Redis store)
│   │   ├── models/
│   │   │   └── schema.ts             # Drizzle schema (all tables + relations)
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # /api/auth/*
│   │   │   ├── booking.routes.ts     # /api/bookings/*
│   │   │   ├── service.routes.ts     # /api/services/*
│   │   │   ├── provider.routes.ts    # /api/providers/*
│   │   │   └── admin.routes.ts       # /api/admin/*
│   │   ├── services/
│   │   │   ├── dispatch.service.ts   # Provider dispatch algorithm (15-min guarantee)
│   │   │   ├── eta.service.ts        # ETA calculator (Haversine + Google Maps)
│   │   │   ├── notification.service.ts # Multi-channel notifications (email/SMS/push/in-app)
│   │   │   └── booking.service.ts    # Booking business logic
│   │   ├── utils/
│   │   │   ├── helpers.ts            # generateBookingCode, formatCurrency, etc.
│   │   │   ├── validators.ts         # Zod schemas for request validation
│   │   │   └── logger.ts             # Structured logging
│   │   ├── app.ts                    # Express app (middleware + routes)
│   │   └── server.ts                 # Server entry point (HTTP + Socket.IO)
│   ├── package.json
│   ├── tsconfig.json
│   └── drizzle.config.ts             # Drizzle ORM migration config
│
├── database/
│   ├── migrations/
│   │   ├── 0001_init.sql             # Create all tables + indexes
│   │   └── 0002_seed_services.sql    # Insert 6 core services
│   └── seed.ts                       # TypeScript seed script (services + mock providers)
│
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── docker-compose.yml                # Local dev: PostgreSQL + Redis
├── package.json                      # Root workspace (npm workspaces)
└── README.md                         # Project readme
```

---

## 2. ENVIRONMENT VARIABLES

### `.env.example`
```env
# ═══════════════════════════════════════════
# Nimivo Environment Configuration
# Copy this file to .env and fill in values
# ═══════════════════════════════════════════

# ── Server ─────────────────────────────────
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# ── Database (PostgreSQL) ──────────────────
DATABASE_URL=postgresql://admin:password@localhost:5432/nimivo

# ── Redis ──────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── Authentication ─────────────────────────
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-change-in-production
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ── Google Maps ────────────────────────────
GOOGLE_MAPS_API_KEY=AIza...

# ── Twilio (SMS) ───────────────────────────
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# ── SendGrid (Email) ──────────────────────
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@nimivo.in

# ── Cloudinary (File Upload) ──────────────
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# ── Frontend (Vite env vars) ──────────────
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=AIza...
```

---

## 3. NPM SCRIPTS

### Root `package.json`
```json
{
  "name": "nimivo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    "db:migrate": "cd backend && npm run db:migrate",
    "db:seed": "cd backend && npm run db:seed",
    "db:studio": "cd backend && npm run db:studio",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

### Backend `package.json` scripts
```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:migrate": "drizzle-kit push",
    "db:seed": "tsx database/seed.ts",
    "db:studio": "drizzle-kit studio",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  }
}
```

### Frontend `package.json` scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## 4. DOCKER COMPOSE (Local Development)

### `docker-compose.yml`
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: nimivo-db
    environment:
      POSTGRES_DB: nimivo
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d nimivo"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: nimivo-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

### Usage
```bash
# Start databases
docker-compose up -d

# Verify running
docker-compose ps

# View logs
docker-compose logs -f postgres
docker-compose logs -f redis

# Stop
docker-compose down

# Stop + delete data
docker-compose down -v
```

---

## 5. DATABASE MIGRATIONS

### `database/migrations/0001_init.sql`
Creates all 7 tables: users, services, providers, bookings, booking_status_log, notifications, ratings. Plus all indexes.

### `database/migrations/0002_seed_services.sql`
Inserts the 6 core services:

```sql
INSERT INTO services (name, category, base_price, estimated_duration_minutes, description, icon_url) VALUES
('Deep Cleaning',  'cleaning',    499, 120, 'Professional deep cleaning for your entire home. Includes kitchen, bathrooms, bedrooms, and living areas.',  '/icons/cleaning.svg'),
('Plumbing',       'plumbing',    349,  60, 'Expert plumbing services for leaks, clogs, pipe repairs, and installations.',                                '/icons/plumbing.svg'),
('Electrician',    'electrical',  399,  90, 'Licensed electricians for wiring, repairs, installations, and safety inspections.',                           '/icons/electrical.svg'),
('Carpentry',      'carpentry',   599, 150, 'Skilled carpenters for furniture repair, woodwork, installations, and custom builds.',                        '/icons/carpentry.svg'),
('Painting',       'painting',    799, 180, 'Professional interior and exterior painting with premium paints and clean finishes.',                          '/icons/painting.svg'),
('Salon at Home',  'salon',       449,  90, 'Professional beauty and grooming services at your doorstep. Haircuts, facials, and more.',                    '/icons/salon.svg');
```

---

## 6. KEY DEPENDENCIES

### Frontend
```
react, react-dom          — UI framework
react-router-dom          — Client routing
@tanstack/react-query     — Server state management
zustand                   — Client state
axios                     — HTTP client
socket.io-client          — Real-time
tailwindcss               — Styling
@radix-ui/*               — Accessible primitives (via shadcn/ui)
class-variance-authority  — Component variants
clsx, tailwind-merge      — Class utilities
lucide-react              — Icons
zod                       — Schema validation
react-hook-form           — Form management
@hookform/resolvers       — Zod + React Hook Form bridge
framer-motion             — Animations
recharts                  — Charts (admin dashboard)
@react-google-maps/api    — Google Maps React
date-fns                  — Date formatting
```

### Backend
```
express                   — HTTP framework
cors                      — CORS middleware
helmet                    — Security headers
express-rate-limit        — Rate limiting
dotenv                    — Env vars
drizzle-orm               — ORM
@neondatabase/serverless  — PostgreSQL driver (or pg)
ioredis                   — Redis client
socket.io                 — Real-time server
jsonwebtoken              — JWT auth
bcryptjs                  — Password hashing
zod                       — Input validation
bullmq                    — Background job queue
@sendgrid/mail            — Email
twilio                    — SMS
cloudinary                — File upload
tsx                       — TypeScript runner (dev)
nodemon                   — Auto-restart (dev alt)
drizzle-kit               — Migration tool
```

---

## 7. QUICK START GUIDE

```bash
# 1. Clone the repo
git clone https://github.com/Pankaj-Bashera/Nimivo.git
cd Nimivo

# 2. Start local databases
docker-compose up -d

# 3. Install all dependencies
npm install               # Root workspace
cd frontend && npm install
cd ../backend && npm install
cd ..

# 4. Configure environment
cp .env.example .env
# Edit .env with your API keys

# 5. Run database migrations + seed
npm run db:migrate
npm run db:seed

# 6. Start development servers
npm run dev
# Frontend → http://localhost:5173
# Backend  → http://localhost:5000

# 7. Open in browser
open http://localhost:5173
```

---

## 8. DEPLOYMENT

### Frontend → Vercel
1. Connect GitHub repo
2. Set root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables (VITE_*)

### Backend → Railway
1. Connect GitHub repo
2. Set root directory: `backend`
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add all environment variables
6. Add PostgreSQL + Redis services

### Database → Supabase or Railway PostgreSQL
- Run migrations via Drizzle Kit
- Seed initial data

### Redis → Upstash
- Create serverless Redis instance
- Copy connection URL to REDIS_URL

---

## 9. DEVELOPMENT WORKFLOW

1. **Branch from `main`** for each feature
2. **Frontend-first**: Build UI with mock data → connect to API later
3. **One page at a time**: Complete a page fully (responsive + loading + error states) before moving to next
4. **Test on mobile**: Every page must work at 375px width before shipping
5. **Commit frequently**: Small, focused commits with descriptive messages
6. **Environment parity**: Use Docker Compose locally to match production databases
