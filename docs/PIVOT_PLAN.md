# Nimivo — Product Pivot Plan: From UC Clone to Provider-First Marketplace

> **Status:** Pre-Seed Product  
> **Last Updated:** 14 February 2026  
> **Purpose:** Complete product strategy, architecture, and implementation plan to transform Nimivo from an Urban Company clone into a fundamentally different, VC-fundable home services platform.

---

## Table of Contents

1. [Why We Must Pivot](#1-why-we-must-pivot)
2. [Market Opportunity](#2-market-opportunity)
3. [Core Philosophy: How We Differ From Urban Company](#3-core-philosophy-how-we-differ-from-urban-company)
4. [Business Model](#4-business-model)
5. [Feature Plan — What To Build](#5-feature-plan--what-to-build)
   - 5.1 Real-Time Bidding System
   - 5.2 Provider Business Tools (SaaS Layer)
   - 5.3 Provider Portfolio & Verified Work
   - 5.4 Transparent Pricing Engine
   - 5.5 Emergency SOS Mode
   - 5.6 Repeat Provider Booking ("My Pro")
   - 5.7 Neighborhood Trust Network
6. [What To Remove — Unrealistic / Fake Elements](#6-what-to-remove--unrealistic--fake-elements)
7. [What To Fix — Technical Debt That Breaks Production](#7-what-to-fix--technical-debt-that-breaks-production)
8. [Database Schema Changes](#8-database-schema-changes)
9. [API Endpoint Plan](#9-api-endpoint-plan)
10. [Frontend Page & Component Changes](#10-frontend-page--component-changes)
11. [Real-Time Architecture (Socket.IO)](#11-real-time-architecture-socketio)
12. [Revenue Model & Unit Economics](#12-revenue-model--unit-economics)
13. [VC Pitch Narrative](#13-vc-pitch-narrative)
14. [Competitive Landscape](#14-competitive-landscape)
15. [Go-To-Market Strategy](#15-go-to-market-strategy)
16. [Implementation Priority & Phases](#16-implementation-priority--phases)
17. [Success Metrics](#17-success-metrics)
18. [Risk Assessment](#18-risk-assessment)

---

## 1. Why We Must Pivot

### The Problem With Our Current Product

Our current Nimivo is structurally identical to Urban Company:

| Dimension | Our Current App | Urban Company |
|---|---|---|
| Pricing | Fixed prices, platform-controlled | Fixed prices, platform-controlled |
| Provider assignment | Platform assigns (planned, not even working) | Platform assigns automatically |
| Provider autonomy | Zero — providers are faceless labor | Zero — providers are faceless labor |
| Revenue model | None defined | 25-30% commission + subscription + forced product sales |
| Customer choice | None — take whoever is sent | None — take whoever is sent |
| Provider brand | Anonymous | Anonymous |
| Discovery model | Browse a service menu, add to cart | Browse a service menu, add to cart |

**Every investor, judge, and customer will see this in under 30 seconds.** There is zero defensible differentiation.

### Urban Company's Real Vulnerabilities (Documented)

These are not opinions — these are documented events:

1. **June 2023 (Gurugram):** Beauticians protested at UC office over arbitrary ID blocking. Minimum rating raised from 4.5 → 4.7 → 4.8 under "Mission Shakti." Workers blocked for taking 2-3 days off.

2. **June 2024 (Bengaluru):** Hundreds of women gig workers from GIPSWU (Gig and Platform Services Workers Union) protested. Union called conditions "horrific" and described "slavery-like situations." New policy: 4.8 minimum rating, auto-assign system, max 2 cancellations/month.

3. **2021 (Gurugram):** Earlier protests against subscription changes. UC **sued four of its own protesting workers**, calling the protests "illegal."

4. **Financial burden on providers:**
   - Pay up to ₹1,00,000 upfront for training and equipment before starting
   - Bear costs of ALL perishable materials/products
   - Mandatory subscription fee to stay on the platform
   - Re-deposit ₹25,000-30,000 security deposit to reopen blocked IDs
   - Triple-layered extraction: subscription fee + per-job commission + forced product purchases

5. **Al Jazeera (March 2024):** Reported UC "burdened gig workers with multiple qualifying fees, compulsory product purchases, and frequent account blockings."

6. **Off-platform leakage:** Providers actively take bookings outside the app to avoid commission. UC's model incentivizes its own disintermediation.

7. **Competitive threats:** Blinkit (Zomato) announced home services entry. Snabbit raised $5.5M for 10-minute home services in Mumbai. Deepinder Goyal (Zomato CEO) stepped down from UC's board when Blinkit announced these plans.

**These are structural fractures, not cosmetic issues.** We exploit them by building the opposite model.

---

## 2. Market Opportunity

### Market Size (India)

| Metric | Value | Source |
|---|---|---|
| Total Home Services Market (TAM) | **$60 billion** (₹5,100-5,210 billion) FY2025 | HDFC Research, Business Standard |
| Online Home Services (SAM) | **$500 million** (₹41-43 billion) FY2025 | Economic Times, Business Standard |
| Online Penetration | **< 1%** of total market | Industry reports |
| Projected Online Market by FY2030 | **₹85-88 billion** (~$1 billion) at 22% CAGR | Business Standard |
| Geographic concentration | **85-90%** of online demand in top 8 cities | Industry reports |
| Cities with 100K+ pop, zero organized services | **500+** | Census data |

### Why < 1% Penetration?

The market is massive and almost entirely undigitized because:

1. **Trust deficit:** People find service providers through apartment WhatsApp groups and neighbor recommendations — not apps
2. **Provider resentment:** The only major platform (UC) exploits providers, causing constant churn and off-platform leakage
3. **No provider tools:** Indian service professionals have zero digital infrastructure — no invoicing, no scheduling, no CRM, no portfolio
4. **Price rigidity:** Platform-set pricing doesn't reflect skill differences, experience, or local market conditions
5. **Tier 2/3 city absence:** UC has ~40,000 providers globally, concentrated only in top metros

### Global Models That Don't Exist in India

| Model | Company | Valuation/Revenue | India Equivalent |
|---|---|---|---|
| Lead-gen marketplace (provider sets prices) | **Thumbtack** (US) | $3.2B valuation, $400M revenue | **Does not exist** |
| SaaS for service providers | **Housecall Pro** (US) | 200K+ pros, $500M+ ARR category | **Does not exist** |
| SaaS + business enablement for pros | **Jobber** (Canada) | 300K+ pros, 50+ industries | **Does not exist** |
| Task-based marketplace (worker sets rate) | **TaskRabbit** (US, IKEA-owned) | 200K+ taskers, 8 countries | **Does not exist** |

**India has zero platforms that empower providers.** Every platform controls them. This is the whitespace.

---

## 3. Core Philosophy: How We Differ From Urban Company

### The Fundamental Difference

> **Urban Company treats providers as disposable gig workers who execute platform-controlled tasks at platform-controlled prices.**
>
> **Nimivo treats providers as independent professionals who run their own businesses, set their own prices, build their own brand, and choose their own customers.**

### Feature-by-Feature Comparison

| Dimension | Urban Company | Nimivo |
|---|---|---|
| **Who sets the price** | Platform dictates fixed prices | Provider sets their own price via competitive bidding |
| **Who chooses the provider** | Platform auto-assigns (customer has no choice) | Customer picks from competing bids based on price, rating, portfolio, ETA |
| **Provider identity** | Anonymous, interchangeable labor | Named professionals with portfolios, before/after photos, shareable profiles |
| **Commission model** | 25-30% per job + subscription + forced product purchase | Low flat fee per lead (₹20-50) OR small subscription (₹299-999/mo) |
| **Provider earnings visibility** | Opaque — providers don't know total billing | Full transparent breakdown — provider sees exactly what they earn per job |
| **Customer pricing visibility** | Opaque — customer doesn't know what provider earns | Full breakdown: base price + distance + GST + platform fee. "85% goes to your provider" |
| **Repeat booking** | UC deliberately prevents customer-provider relationships | "My Pro" feature — save your favorite provider, rebook directly |
| **Provider tools** | None. Providers use paper notebooks | Earnings analytics, GST invoicing, customer CRM, shareable profile link |
| **Provider brand** | All reputation stays on platform. Provider has no portable identity | Provider builds a portfolio, has a public profile page, can share via WhatsApp |
| **Emergency services** | "Insta Help" at ₹49 (unclear how they deliver in 15 min) | SOS mode with transparent surge pricing (provider gets the surge, not platform) |
| **Discovery model** | Browse a menu → platform assigns | Post a job → providers compete → customer picks the best offer |
| **Social proof** | Star ratings controlled by platform | Neighborhood trust: "12 people in your locality used this provider this month" |
| **Dispute resolution** | Platform-controlled, no appeals | Transparent resolution with documented evidence (before/after photos) |
| **Provider onboarding cost** | Up to ₹1,00,000 upfront | Zero upfront cost. Earn first, subscribe later |
| **Provider blocking** | Arbitrary — blocked for rating < 4.8, cancelled by customer, taking days off | Clear, documented policies. Providers warned, not surprise-blocked |
| **Off-platform incentive** | High — providers avoid 25% commission by transacting off-app | Low — provider's brand, portfolio, tools, and customer relationships live on the platform. Leaving means losing their digital identity |

### One-Line Pitch

**"We're Thumbtack + Housecall Pro for India — we don't employ service providers, we empower them to run their own businesses."**

---

## 4. Business Model

### Revenue Streams

| Stream | How it Works | Price Point | UC Equivalent |
|---|---|---|---|
| **Lead fee** | Provider pays a small fee per bid opportunity (not per job — per opportunity to bid) | ₹20-50 per lead | UC charges 25-30% of total job value |
| **Provider subscription** | Monthly subscription for business tools (invoicing, CRM, analytics, portfolio hosting, profile page) | ₹299 (Basic) / ₹599 (Pro) / ₹999 (Premium) per month | UC charges subscription + commission + product fees |
| **Premium placement** | Provider pays to appear first in bid results for high-demand categories | ₹99-499 per day per category | Does not exist |
| **Verified Pro badge** | Background verification + skill certification. One-time fee | ₹499 one-time | UC charges training fees up to ₹1L |
| **Emergency surge share** | Platform takes 10% of the surge premium on emergency bookings | 10% of surge amount only | UC keeps the spread |

### Why This Model Is Better for Everyone

**For providers:**
- Earn 85-90% of job value (vs. 70-75% on UC)
- Zero upfront cost to join (vs. up to ₹1L on UC)
- Control their own pricing (vs. take-it-or-leave-it)
- Build a portable brand

**For customers:**
- Competitive pricing (multiple providers bidding drives prices down)
- Provider choice (see portfolio, ratings, past work before choosing)
- Relationship continuity ("My Pro" — same provider every time)
- Price transparency (see exactly where every rupee goes)

**For us:**
- Lower customer acquisition cost (providers bring their own customers via shareable profiles)
- Higher provider retention (their portfolio/brand lives on our platform — switching cost is high)
- Lower operational cost (we don't train providers, manage inventory, or set prices)
- Multiple revenue streams (not dependent on single commission model)
- Defensible moat (provider data + neighborhood network effects)

### Unit Economics Target

| Metric | Target | UC Comparison |
|---|---|---|
| Average job value | ₹500-800 | ₹600-1000 |
| Platform revenue per job | ₹50-100 (lead fee + subscription amortized) | ₹150-300 (25-30% commission) |
| Provider take-home | ₹400-700 (85-90%) | ₹420-700 (70-75%) |
| Provider monthly subscription | ₹299-999 | ₹0 subscription alone but cumulative fees exceed this |
| Customer CAC | ₹200-400 (organic via provider sharing + neighborhood network) | ₹800-1500 (heavy advertising) |
| Provider CAC | ₹100-200 (word of mouth among providers, zero upfront cost) | ₹5000-10000 (training, onboarding, equipment) |

---

## 5. Feature Plan — What To Build

### 5.1 Real-Time Bidding System (THE Core Differentiator)

**This is the #1 thing that makes Nimivo not Urban Company.** Everything else is secondary.

#### How It Works

```
Customer Flow:
1. Customer selects a service category (e.g., "Deep Cleaning")
2. Customer fills in: address, preferred date/time, property size, special notes
3. Customer posts the job request (NOT "book now" — "request quotes")
4. System broadcasts the request to providers in that category within X km radius
5. Customer sees a live bid feed — bids arriving in real-time via WebSocket
6. Each bid shows: provider name, photo, rating, completed jobs, portfolio preview, 
   bid price, estimated arrival time, and a personal message
7. Customer taps "Accept" on their preferred bid
8. Booking is confirmed. Provider is assigned. Tracking begins.

Provider Flow:
1. Provider sees "Open Requests Near You" on their dashboard
2. Each request shows: service type, location (area only, not exact address), 
   date/time, customer's note
3. Provider taps a request → enters: their price, estimated arrival time, 
   optional message ("I specialize in 2BHK apartments, can bring my own supplies")
4. Provider waits for customer response
5. If accepted: provider sees full address, customer contact, navigation link
6. If another bid accepted: provider is notified ("Job taken by another provider")
```

#### Why This Isn't Just a Feature — It's a Different Market Mechanism

- **UC model:** Platform is the middleman that controls both sides. Price is fixed. Provider is assigned. Neither party has choice.
- **Nimivo model:** Platform is a marketplace that connects both sides. Price is discovered through competition. Customer chooses. Provider competes on quality + price.

This is the exact model that made Thumbtack worth $3.2 billion. It does not exist in India.

#### Database Schema

```sql
-- New table: bids
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  bid_amount DECIMAL(10,2) NOT NULL,
  estimated_arrival_minutes INTEGER NOT NULL,
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending | accepted | rejected | expired
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL -- auto-expire after 30 minutes
);
```

#### API Endpoints

```
POST   /api/bookings/:id/bid          -- Provider submits a bid
GET    /api/bookings/:id/bids         -- Customer fetches all bids for their job
POST   /api/bookings/:id/accept-bid/:bidId  -- Customer accepts a bid
POST   /api/bookings/:id/reject-bid/:bidId  -- Customer explicitly rejects a bid
GET    /api/provider/open-requests    -- Provider sees nearby open job requests
```

#### Socket.IO Events

```
Server → Providers:  'booking:new_request'     -- New job posted near them
Server → Customer:   'booking:new_bid'         -- A provider just bid on their job
Server → Customer:   'booking:bid_updated'     -- A provider modified their bid
Server → Provider:   'booking:bid_accepted'    -- Their bid was accepted
Server → Provider:   'booking:bid_rejected'    -- Their bid was rejected / job taken
Server → Providers:  'booking:closed'          -- Job is no longer accepting bids
```

#### Frontend Components

- **`BidSelectionPage.tsx`** (New) — Customer's live bid feed after posting a job. Shows bids arriving in real-time. Each bid is a card with: provider avatar, name, rating stars, jobs completed, mini portfolio (2-3 thumbnail photos), bid price (₹), ETA ("arrives in ~20 min"), message, and "Accept" button.
- **`OpenRequestsTab.tsx`** (New, in ProviderDashboard) — List of nearby open job requests. Each shows: service category icon, area name, date/time, customer's note. Tap → opens bid form.
- **`BidFormModal.tsx`** (New) — Provider enters their price, ETA, optional message. Submits bid.

---

### 5.2 Provider Business Tools (The SaaS Moat)

**What we give providers that no Indian platform gives them:**

#### a) Earnings Dashboard

- Daily / weekly / monthly earnings graph (use Recharts — already installed)
- Breakdown: total billed → platform fee → GST → net earnings
- Comparison with previous period ("↑ 12% vs last week")
- Job count, average job value, acceptance rate

#### b) Digital Invoicing (GST-Compliant)

- Auto-generated invoice after every completed job
- Includes: provider's name, GSTIN (if registered), customer details, service breakdown, amount, GST calculation, payment status
- Downloadable as PDF
- This is legally required for providers billing > ₹20L/year and nobody offers it

#### c) Customer CRM ("My Customers")

- List of all past customers with service history
- "Rebook" button — send a rebooking link to a past customer
- Customer preferences noted: "Mrs. Sharma prefers eco-friendly products", "Mr. Gupta's dog is in the bedroom during cleaning"
- This is how providers build repeat business — something UC prevents

#### d) Shareable Provider Profile

- Public URL: `nimivo.in/pro/rajesh-kumar-plumber-koramangala`
- Shows: name, photo, rating, jobs completed, service categories, portfolio (before/after photos), reviews, "Book This Provider" button
- Provider shares this link on WhatsApp, business cards, apartment notice boards
- This brings NEW customers to the platform organically (reduces our CAC)

#### Database Schema

```sql
-- Extend providers table
ALTER TABLE providers ADD COLUMN gstin VARCHAR(15);
ALTER TABLE providers ADD COLUMN bio TEXT;
ALTER TABLE providers ADD COLUMN slug VARCHAR(100) UNIQUE; -- for public profile URL
ALTER TABLE providers ADD COLUMN years_experience INTEGER DEFAULT 0;
ALTER TABLE providers ADD COLUMN languages TEXT[]; -- e.g., ['Hindi', 'English', 'Kannada']

-- Customer notes (provider's CRM)
CREATE TABLE customer_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id),
  customer_id UUID NOT NULL REFERENCES users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider_id, customer_id)
);
```

#### API Endpoints

```
GET    /api/provider/earnings?period=week|month|all   -- Earnings analytics
GET    /api/provider/invoices                          -- List generated invoices
GET    /api/provider/invoices/:id/pdf                  -- Download invoice as PDF
GET    /api/provider/customers                         -- CRM: past customers list
POST   /api/provider/customers/:id/note                -- Add/update customer note
GET    /api/pro/:slug                                  -- Public provider profile (no auth)
PUT    /api/provider/profile                           -- Update bio, GSTIN, languages, etc.
```

#### Frontend Pages

- **`ProviderEarningsTab.tsx`** — Recharts line/bar graph of earnings over time, stat cards (total earned, jobs this week, avg job value)
- **`ProviderInvoicesTab.tsx`** — List of invoices with download button
- **`ProviderCustomersTab.tsx`** — Past customers list with notes and rebook CTA
- **`ProviderProfileEditor.tsx`** — Edit bio, photo, GSTIN, languages, years experience
- **`PublicProviderPage.tsx`** — `/pro/:slug` — Public-facing profile with portfolio, reviews, "Book" button

---

### 5.3 Provider Portfolio & Verified Work

#### How It Works

1. Provider completes a job
2. App prompts: "Upload before/after photos of your work" (optional but incentivized — profiles with photos get 3x more bids accepted)
3. Photos are stored and become part of the provider's portfolio
4. When a provider bids on a job, their bid card shows a mini gallery of past work
5. Customer can tap to see full portfolio before accepting a bid

#### Database Schema

```sql
CREATE TABLE work_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id),
  booking_id UUID REFERENCES bookings(id),
  service_category service_category NOT NULL,
  before_image_url TEXT,
  after_image_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false, -- provider's chosen showcase items
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### API Endpoints

```
POST   /api/provider/portfolio              -- Upload work photos
GET    /api/provider/portfolio               -- Get own portfolio
GET    /api/pro/:slug/portfolio              -- Public portfolio (no auth)
PATCH  /api/provider/portfolio/:id/feature   -- Toggle featured status
DELETE /api/provider/portfolio/:id           -- Remove portfolio item
```

#### Image Upload

- Use **Cloudinary** (free tier: 25K transformations/month, 25GB storage)
- Install: `npm install cloudinary multer`
- Auto-resize to thumbnails for bid cards, full size for portfolio view
- Lazy load images on scroll for performance

---

### 5.4 Transparent Pricing Engine

#### How It Works

Every transaction shows a full, honest breakdown visible to BOTH customer AND provider:

```
┌─────────────────────────────────────────────┐
│        Price Breakdown                       │
│                                              │
│  Base Price (set by provider)    ₹ 500.00   │
│  Distance surcharge (3.2 km)    ₹  40.00   │
│  Time factor (peak hours 1.2x)  ₹ 100.00   │
│  ─────────────────────────────────────────  │
│  Subtotal                        ₹ 640.00   │
│  GST (18%)                       ₹ 115.20   │
│  Platform fee                    ₹  49.00   │
│  ─────────────────────────────────────────  │
│  Total                           ₹ 804.20   │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ 💚 ₹755.20 (93.9%) goes directly to   │ │
│  │    your service provider               │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

#### Pricing Components

| Component | Calculation | Notes |
|---|---|---|
| **Base Price** | Set by provider in their bid | Market-driven, not platform-dictated |
| **Distance Surcharge** | Haversine formula: if distance > 3km, add ₹15/km | Transparent, shows exact km |
| **Time Factor** | 1.0x normal, 1.2x peak (8-10am, 6-9pm), 1.5x late night (10pm-6am) | Clearly labeled |
| **GST** | 18% on services (SAC 9985 — Maintenance & Repair Services) | Legal requirement, must show |
| **Platform Fee** | Flat ₹49 (Basic) or ₹29 (for subscribed providers) | NOT a percentage. Flat and transparent |
| **Provider Earning** | Total - GST - Platform Fee | Shown prominently |

#### Implementation

```typescript
// backend/src/utils/pricing.ts
function calculatePricing(params: {
  basePrice: number;        // provider's bid amount
  distanceKm: number;       // Haversine from customer to provider
  scheduledHour: number;    // 0-23
  isEmergency: boolean;
  providerSubscriptionTier: 'free' | 'basic' | 'pro' | 'premium';
}) {
  const distanceSurcharge = params.distanceKm > 3 
    ? Math.round((params.distanceKm - 3) * 15) 
    : 0;
  
  let timeFactor = 1.0;
  if (params.scheduledHour >= 22 || params.scheduledHour < 6) timeFactor = 1.5;
  else if ((params.scheduledHour >= 8 && params.scheduledHour <= 10) || 
           (params.scheduledHour >= 18 && params.scheduledHour <= 21)) timeFactor = 1.2;
  
  const surgeFactor = params.isEmergency ? 1.5 : 1.0;
  
  const subtotal = (params.basePrice * timeFactor * surgeFactor) + distanceSurcharge;
  const gst = Math.round(subtotal * 0.18);
  const platformFee = params.providerSubscriptionTier === 'free' ? 49 : 29;
  const total = subtotal + gst + platformFee;
  const providerEarning = total - gst - platformFee;
  
  return { 
    basePrice: params.basePrice,
    distanceSurcharge, timeFactor, surgeFactor,
    subtotal, gst, platformFee, total, providerEarning,
    providerPercentage: Math.round((providerEarning / total) * 100)
  };
}
```

#### Frontend Component

- **`PriceBreakdown.tsx`** (Shared) — Shows the full breakdown with a green highlight bar: "X% goes directly to your provider"
- Used in: bid acceptance confirmation, booking confirmation, tracking page, receipt/invoice

---

### 5.5 Emergency SOS Mode

#### How It Works

```
Customer taps SOS → Picks emergency type → Confirms location → 
System broadcasts to ALL providers in category within 5km → 
First provider accepts (60-second window) → Booking confirmed with surge → 
Red-themed tracking page with countdown
```

#### Emergency Types

| Type | Icon | Category | Description |
|---|---|---|---|
| 💧 Water Emergency | droplet | plumbing | Pipe burst, flooding, water leak |
| ⚡ Electrical Hazard | zap | electrical | Short circuit, sparking, power failure |
| 🔥 Gas Leak | flame | plumbing | Gas smell, leaking cylinder/pipe |
| 🔒 Lock Emergency | lock | carpentry | Locked out, broken lock, security breach |
| 🔧 Appliance Breakdown | wrench | electrical | Fridge, AC, washing machine sudden failure |

#### Key Differences From UC's "Insta Help"

| UC "Insta Help" | Nimivo SOS |
|---|---|
| ₹49 flat rate (unclear how sustainable) | Transparent surge pricing (1.5x-2x, clearly shown before confirmation) |
| No clarity on provider availability | Provider must accept within 60 seconds or it cascades |
| Same provider pool for regular + instant | Dedicated "SOS-ready" toggle for providers who want emergency jobs |
| No differentiation by emergency type | Categorized emergencies → right specialist dispatched |

#### Database Schema Changes

```sql
-- Add to bookings table
ALTER TABLE bookings ADD COLUMN is_emergency BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN surge_factor DECIMAL(3,2) DEFAULT 1.00;
ALTER TABLE bookings ADD COLUMN emergency_type VARCHAR(30); -- water | electrical | gas | lock | appliance
```

#### API Endpoints

```
POST   /api/bookings/emergency     -- Create emergency booking (skips bidding, broadcasts to all)
POST   /api/provider/emergency/:id/accept  -- Provider accepts emergency job (60s window)
```

#### Socket Events

```
Server → Providers:  'emergency:new_request'    -- URGENT: new SOS request nearby
Server → Customer:   'emergency:provider_found'  -- A provider accepted your SOS
Server → Providers:  'emergency:taken'           -- SOS already accepted by someone else
```

#### Frontend Components

- **SOS Button** — Pulsing red button in Header (desktop) and bottom nav (mobile). Always visible.
- **`EmergencyModal.tsx`** — Full-screen overlay with 5 emergency type buttons. Tap one → shows surge price confirmation → "Confirm Emergency Request"
- **`EmergencyTrackingPage.tsx`** — Red-themed tracking page. Larger countdown timer. Provider details. Emergency type badge.

---

### 5.6 Repeat Provider Booking ("My Pro")

#### The Real-World Problem This Solves

> "I had an amazing cleaner come last week through the app. She was thorough, knew where everything was, and I didn't have to explain anything. This week they sent someone completely different. I have to start from scratch every time."

This is the #1 customer complaint about UC. They **deliberately prevent** customer-provider relationships because it lets them control both sides. We do the opposite.

#### How It Works

1. After a completed service, customer sees: "Save Rajesh as My Pro? Next time, book him directly."
2. Customer taps "Save" → Rajesh is added to their "My Pros" list
3. Next time customer needs plumbing, they go to "My Pros" → tap "Book Rajesh" → enters date/time/address → Rajesh gets a notification
4. Rajesh can accept or decline. If accepted → booking confirmed at Rajesh's standard rate. If declined → customer can post to open marketplace instead.

#### Database Schema

```sql
CREATE TABLE favorite_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  nickname VARCHAR(50),          -- customer's custom label, e.g., "Rajesh Electrician"
  notes TEXT,                    -- customer's private notes
  times_booked INTEGER DEFAULT 1,
  last_booked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(customer_id, provider_id)
);
```

#### API Endpoints

```
POST   /api/customer/favorites/:providerId        -- Save a provider as "My Pro"
GET    /api/customer/favorites                     -- List all saved providers
DELETE /api/customer/favorites/:providerId         -- Remove from favorites
POST   /api/customer/favorites/:providerId/book    -- Direct booking request to saved provider
```

#### Frontend Components

- **"Save as My Pro" button** — On the post-service rating screen and on TrackingPage after completion
- **`MyProsPage.tsx`** (New) — Grid of saved providers with photo, name, category, rating, "Book Again" button
- **Direct booking flow** — Simplified: pick My Pro → enter date/time/address → confirm. No bid selection needed.

---

### 5.7 Neighborhood Trust Network

#### The Insight

85-90% of home services in India are discovered through:
- Apartment WhatsApp groups ("anyone know a good electrician?")
- Neighbor recommendations ("use my guy, he's great")
- Building notice boards
- Word of mouth

No platform has captured this social trust layer. A provider rated 4.5 by strangers is less trusted than a provider your neighbor used and recommended.

#### How It Works

1. Nimivo groups users by locality (pincode or micro-area)
2. On the homepage and bid selection page, customers see:
   - "Popular in Koramangala: Deep Cleaning (23 bookings this week)"
   - "Rajesh Plumber — booked by 8 people in your building this month"
   - "Meena Cleaning — recommended by 3 of your neighbors"
3. Activity is anonymized: no names of neighbors revealed, just counts
4. Creates FOMO + social proof: "If 12 people in my area trust this provider, I should too"

#### Database Additions

```sql
-- Use existing booking data, aggregate by locality
-- No new table needed — compute from bookings + user locations

-- Optional: explicit recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommender_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  locality VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### API Endpoints

```
GET /api/neighborhood/popular?pincode=560034    -- Popular services/providers in area
GET /api/neighborhood/activity?pincode=560034   -- "23 bookings this week in your area"
GET /api/provider/:id/local-stats?pincode=560034 -- "Booked by 8 people near you"
```

#### Frontend Components

- **"Popular Near You" section** on HomePage — replaces the current hardcoded "Most Booked" row
- **"Trusted in Your Area" badge** on provider bid cards — "Used by 5 people near you"
- **Neighborhood activity ticker** — "12 people in Koramangala booked Deep Cleaning this week"

---

## 6. What To Remove — Unrealistic / Fake Elements

These items currently exist in the codebase and MUST be removed or replaced. They destroy credibility with investors, judges, and pilot customers.

### Fake Statistics & Social Proof

| What | Where | Problem | Action |
|---|---|---|---|
| Review counts "2.3M", "4.4M", "470K" | `frontend/src/lib/constants.ts` (MOST_BOOKED, CLEANING_SERVICES, etc.) | Completely fabricated. No real data behind these. | **Remove** review count strings. Show "New" for new services, or compute real counts from DB |
| "5000+ customers rate us 4.9/5 stars" | `frontend/src/components/home/Testimonials.tsx` line 72 | Fabricated. Zero real customers. | **Remove** the claim entirely. Replace with mission statement about provider empowerment |
| Fake testimonials (Priya Sharma, Rajesh Kumar, etc.) | `frontend/src/lib/constants.ts` MOCK_TESTIMONIALS | Fabricated reviews with fabricated names | **Remove** or clearly label as "Vision" / "What our users will say". Better: replace with provider stories when you have real ones |
| Fake star ratings (4.72-4.88) | All service constants | Invented precision to appear real | **Remove**. Show no rating for unrated services |
| Fake reviews on ServiceDetailPage | `frontend/src/pages/customer/ServiceDetailPage.tsx` REVIEWS array | 3 hardcoded fake reviews | **Remove**. Show "No reviews yet. Be the first!" |
| Cross-out prices (₹245→₹99) | Service constants in `constants.ts` | Fake "original prices" to simulate discounts | **Remove** strikethrough prices. Show only the real base price |

### Unrealistic Promises

| What | Where | Problem | Action |
|---|---|---|---|
| "15-Minute Arrival Guarantee" | HeroSection, WhyChooseUs, FAQ, ServiceDetailPage, HowItWorks | No geofencing, routing, or provider density to deliver this | **Change to:** "Fast arrival — providers compete on ETA. You pick who arrives fastest." |
| "If we're late, you get 20% off" | ServiceDetailPage | No backend refund logic exists | **Remove** entirely until you can actually enforce it |
| "Money-Back Guarantee" | constants.ts TRUST_BADGES | No refund system exists | **Remove** or change to "Satisfaction tracked — rate your provider after every service" |
| "Background-verified", "Licensed", "Fully insured" | WhyChooseUs, ServiceDetailPage | Only a boolean `isVerified` exists. No actual background check system | **Change to:** "Verified providers earn a trust badge through identity verification and work portfolio" |
| "UPI, credit/debit cards, net banking, cash on delivery" | FAQ | Zero payment integration exists | **Remove** until you integrate Razorpay. For MVP, use "Cash after service" as the only payment |
| Hardcoded offer discounts ("25% OFF") | OfferDetailPage | No discount logic, no expiration enforcement | **Remove** offer pages until you have real promotions |

### Simulated Features

| What | Where | Problem | Action |
|---|---|---|---|
| Fake ETA countdown (always starts at 12 min) | TrackingPage | Local JS timer, no real data | **Replace** with bid-provided ETA from accepted bid's `estimated_arrival_minutes` |
| Fake tracking page | TrackingPage | No map, no GPS, no provider location | **Simplify:** Show status steps + provider contact info. Don't pretend to track if you can't |
| Hardcoded "Arrives in 10 min" badge | Service constants | Static string, not computed | **Remove** badge. Instead show provider's actual ETA from their bid |

---

## 7. What To Fix — Technical Debt That Breaks Production

### CRITICAL: Authentication Mismatch

**The Problem:**
- Frontend uses **Clerk** (`@clerk/clerk-react`) for login/signup
- Backend uses **custom JWT** (`jsonwebtoken` + `bcrypt`) with secret `'nimivo-dev-secret-change-in-production'`
- Clerk issues JWTs signed with Clerk's keys. Backend verifies with a different custom secret.
- **Every authenticated API call will return 401 Unauthorized.**

**The Fix (Choose ONE):**

Option A — Keep Clerk frontend, verify Clerk JWTs on backend:
```bash
cd backend && npm install @clerk/express
```
Replace `backend/src/middleware/auth.ts` to use `clerkMiddleware()` from `@clerk/express`. Verify Clerk-issued JWTs with Clerk's public key (automatic with the SDK).

Option B — Drop Clerk, use custom JWT everywhere:
Remove Clerk from frontend. Build login/register forms that call your existing `/api/auth/login` and `/api/auth/register`. Store the returned JWT in localStorage/cookies.

**Recommendation:** Option A (keep Clerk). Clerk handles email verification, OAuth, session management, and security. Your custom JWT auth is a liability.

### CRITICAL: Frontend-Backend ID Mismatch

**The Problem:**
- Frontend constants use IDs like `'1'`, `'2'`, `'mb-1'`, `'cl-2'`
- Backend database uses auto-generated UUIDs
- Submitting a booking with `serviceId: 'mb-1'` fails because no such UUID exists in DB
- The cart is storing items with fake IDs that don't exist in any database

**The Fix:**
- Remove ALL hardcoded service data from `frontend/src/lib/constants.ts`
- Fetch services from API: `GET /api/services` → render dynamically
- Update seed data to include ALL 40+ services (currently only 6 are seeded)
- Ensure cart stores real service UUIDs from API responses

### CRITICAL: Role-Based Access Control

**The Problem:**
- `ProtectedRoute` in `App.tsx` only checks `isSignedIn`
- Any logged-in customer can navigate to `/provider` or `/admin` and see those dashboards

**The Fix:**
- Read user role from Clerk metadata (set during registration)
- Create `RoleProtectedRoute` component that checks `user.publicMetadata.role`
- Redirect unauthorized users to their correct dashboard

### HIGH: Cart System Misdesign

**The Problem:**
- Cart has `quantity` support (you can add "3 plumber visits")
- Services aren't quantity-based products — you need one plumber visit, not three
- Cart items can't be submitted as a batch — API accepts single `serviceId`

**The Fix:**
- Remove quantity from cart. Each service is a job request, not a product
- OR redesign as "Job List" — customer builds a list of services needed (cleaning + plumbing + AC repair) and submits as one multi-service booking
- If keeping multi-service, add `booking_services` join table and update API

### MEDIUM: Socket.IO Not Connected

**The Problem:**
- Socket.IO server runs but no route handler emits events
- Booking creation, status changes, provider assignment — none trigger socket events

**The Fix:**
- In every route handler that changes booking status, emit the relevant event:
```typescript
const io = req.app.get('io');
io.to(`booking:${bookingId}`).emit('booking:status_changed', { status: newStatus });
```

### MEDIUM: LocationPicker Missing API Key

**The Problem:**
- Google Places Autocomplete requires an API key
- Falls back to Nominatim (OpenStreetMap) which has strict rate limits (1 req/sec)
- Multiple users typing search queries will get the app's IP banned by Nominatim

**The Fix:**
- Get a Google Maps API key (free tier: $200/month credit, sufficient for MVP)
- Or implement debouncing (500ms minimum between Nominatim requests)
- Add a hard rate limiter on the client side

---

## 8. Database Schema Changes

### Complete New Schema (additions to existing)

```sql
-- ==============================
-- MODIFICATIONS TO EXISTING TABLES
-- ==============================

-- Bookings table additions
ALTER TABLE bookings ADD COLUMN is_emergency BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN surge_factor DECIMAL(3,2) DEFAULT 1.00;
ALTER TABLE bookings ADD COLUMN emergency_type VARCHAR(30);
ALTER TABLE bookings ADD COLUMN booking_type VARCHAR(20) DEFAULT 'bidding'; 
-- bidding | emergency | direct (My Pro rebooking)
ALTER TABLE bookings ADD COLUMN base_price DECIMAL(10,2);
ALTER TABLE bookings ADD COLUMN distance_surcharge DECIMAL(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN time_factor DECIMAL(3,2) DEFAULT 1.00;
ALTER TABLE bookings ADD COLUMN platform_fee DECIMAL(10,2) DEFAULT 49.00;
ALTER TABLE bookings ADD COLUMN gst_amount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN provider_earning DECIMAL(10,2);
ALTER TABLE bookings ADD COLUMN booking_code VARCHAR(20); -- human-readable ID: FP-20260214-A3X9

-- Providers table additions
ALTER TABLE providers ADD COLUMN gstin VARCHAR(15);
ALTER TABLE providers ADD COLUMN bio TEXT;
ALTER TABLE providers ADD COLUMN slug VARCHAR(100) UNIQUE;
ALTER TABLE providers ADD COLUMN years_experience INTEGER DEFAULT 0;
ALTER TABLE providers ADD COLUMN languages TEXT[];
ALTER TABLE providers ADD COLUMN accepts_emergency BOOLEAN DEFAULT false;
ALTER TABLE providers ADD COLUMN subscription_tier VARCHAR(20) DEFAULT 'free';
-- free | basic | pro | premium

-- ============================
-- NEW TABLES
-- ============================

-- Bids (core to bidding system)
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES providers(id),
  bid_amount DECIMAL(10,2) NOT NULL,
  estimated_arrival_minutes INTEGER NOT NULL,
  message TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  -- pending | accepted | rejected | expired | withdrawn
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  UNIQUE(booking_id, provider_id) -- one bid per provider per job
);

-- Work Portfolio (provider's before/after photos)
CREATE TABLE work_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id),
  booking_id UUID REFERENCES bookings(id),
  service_category service_category NOT NULL,
  before_image_url TEXT,
  after_image_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorite Providers ("My Pro")
CREATE TABLE favorite_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  nickname VARCHAR(50),
  notes TEXT,
  times_booked INTEGER DEFAULT 1,
  last_booked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(customer_id, provider_id)
);

-- Customer Notes (provider's CRM)
CREATE TABLE customer_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id),
  customer_id UUID NOT NULL REFERENCES users(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider_id, customer_id)
);

-- Neighborhood Recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommender_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID NOT NULL REFERENCES providers(id),
  locality VARCHAR(100) NOT NULL,
  pincode VARCHAR(10),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Booking Status Log (audit trail)
CREATE TABLE booking_status_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_status VARCHAR(20),
  to_status VARCHAR(20) NOT NULL,
  changed_by UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 9. API Endpoint Plan

### New Endpoints (Organized by Feature)

#### Bidding System
```
POST   /api/bookings                         -- Create job request (status: 'accepting_bids')
POST   /api/bookings/:id/bid                 -- Provider submits bid
GET    /api/bookings/:id/bids                -- Customer views bids on their job
POST   /api/bookings/:id/accept-bid/:bidId   -- Customer accepts a bid → booking confirmed
POST   /api/bookings/:id/reject-bid/:bidId   -- Customer rejects a bid
GET    /api/provider/open-requests            -- Provider sees nearby open jobs
PATCH  /api/provider/bids/:id                -- Provider updates/withdraws their bid
```

#### Emergency
```
POST   /api/bookings/emergency               -- Create SOS booking (broadcasts immediately)
POST   /api/provider/emergency/:id/accept    -- Provider accepts emergency (60s window)
```

#### Provider Business Tools
```
GET    /api/provider/earnings                 -- Earnings analytics (query: period, dateRange)
GET    /api/provider/invoices                 -- Invoice list
GET    /api/provider/invoices/:id/pdf         -- Download invoice PDF
GET    /api/provider/customers                -- CRM: customer list with history
POST   /api/provider/customers/:id/note       -- Add/update customer note
PUT    /api/provider/profile                  -- Update bio, GSTIN, languages, slug, etc.
```

#### Portfolio
```
POST   /api/provider/portfolio               -- Upload work photos (multipart/form-data)
GET    /api/provider/portfolio               -- Own portfolio
PATCH  /api/provider/portfolio/:id/feature   -- Toggle featured
DELETE /api/provider/portfolio/:id           -- Remove item
```

#### Favorites ("My Pro")
```
POST   /api/customer/favorites/:providerId   -- Save as My Pro
GET    /api/customer/favorites               -- List My Pros
DELETE /api/customer/favorites/:providerId   -- Remove
POST   /api/customer/favorites/:providerId/book  -- Direct booking to saved provider
```

#### Neighborhood
```
GET    /api/neighborhood/popular              -- Popular providers/services in area
GET    /api/neighborhood/activity             -- Booking activity in area
GET    /api/provider/:id/local-stats          -- Provider's stats in user's area
```

#### Public (No Auth Required)
```
GET    /api/pro/:slug                        -- Public provider profile
GET    /api/pro/:slug/portfolio              -- Public portfolio
GET    /api/pro/:slug/reviews                -- Public reviews
```

### Modified Existing Endpoints

```
-- Booking status enum expanded:
-- OLD:  pending | confirmed | en_route | in_progress | completed | cancelled | no_show
-- NEW:  accepting_bids | confirmed | en_route | in_progress | completed | cancelled | 
--       no_show | expired (no bids accepted in time)

GET    /api/bookings/:id                     -- Now includes pricing breakdown fields
GET    /api/provider/stats                   -- Now returns REAL computed stats (not hardcoded 0)
GET    /api/admin/dashboard                  -- Now includes: active bids count, emergency bookings 
                                             --   today, avg provider response time, revenue by day
```

---

## 10. Frontend Page & Component Changes

### New Pages

| Page | Route | Purpose |
|---|---|---|
| `BidSelectionPage.tsx` | `/jobs/:bookingId/bids` | Customer's real-time bid feed after posting a job |
| `MyProsPage.tsx` | `/my-pros` | Customer's saved providers list |
| `PublicProviderPage.tsx` | `/pro/:slug` | Public provider profile (no login required) |
| `EmergencyPage.tsx` | `/emergency` | SOS emergency type selection + confirmation |
| `ProviderProfileEditor.tsx` | `/provider/profile` | Provider edits their public profile |

### Modified Pages

| Page | Changes |
|---|---|
| `HomePage.tsx` | Remove hardcoded service rows. Fetch from API. Add SOS button. Add "Popular Near You" section. Remove fake "5000+ customers" claim |
| `BookingPage.tsx` | Rename "Book Now" to "Request Quotes". After submission → redirect to BidSelectionPage instead of TrackingPage. Remove cart-based quantity flow |
| `TrackingPage.tsx` | Remove fake 12-min countdown. Show actual ETA from accepted bid. Show pricing breakdown. Add "Save as My Pro" after completion |
| `ProviderDashboard.tsx` | Add tabs: Open Requests, My Bids, Earnings, Portfolio, Customers, Profile. Fix stats to use real data |
| `ServiceDetailPage.tsx` | Remove fake reviews. Remove fake review counts. Fetch real data from API. Change "Book Now" to "Get Quotes" |
| `AdminDashboard.tsx` | Add real charts (Recharts). Show bidding analytics, provider onboarding funnel, emergency response times |
| `Header.tsx` | Add SOS button (red, pulsing). Fix mobile search bar. Add "My Pros" link in user menu |

### Modified Components

| Component | Changes |
|---|---|
| `ServiceCard.tsx` | Remove fake review counts. Show "New" badge if no reviews. Remove strikethrough prices |
| `ServiceCategoryRow.tsx` | Fetch from API instead of hardcoded constants |
| `SpotlightCarousel.tsx` | Either make dynamic (from admin panel) or remove if no real offers |
| `Testimonials.tsx` | Remove entirely OR replace with "Provider Stories" — real provider onboarding testimonials |
| `WhyChooseUs.tsx` | Rewrite claims to be honest: provider empowerment, transparent pricing, customer choice |
| `HowItWorks.tsx` | Update steps: (1) Post your job, (2) Receive competing bids, (3) Choose your provider, (4) Track and pay |
| `CartDropdown.tsx` | Redesign as "Job List" or remove quantity controls |

### New Components

| Component | Purpose |
|---|---|
| `BidCard.tsx` | Individual bid in the bid feed: provider info, price, ETA, portfolio preview, accept button |
| `PriceBreakdown.tsx` | Transparent pricing table used across booking, tracking, and receipt views |
| `SOSButton.tsx` | Pulsing red emergency button for header and homepage |
| `EmergencyTypeSelector.tsx` | Emergency type grid (Water, Electrical, Gas, Lock, Appliance) |
| `ProviderMiniProfile.tsx` | Compact provider card for bid lists and "My Pro" grids |
| `PortfolioGallery.tsx` | Before/after photo gallery for provider profiles |
| `NeighborhoodActivity.tsx` | "Popular in your area" section with booking counts |
| `EarningsChart.tsx` | Recharts-based earnings graph for provider dashboard |

---

## 11. Real-Time Architecture (Socket.IO)

### Room Structure

```
booking:{bookingId}     -- Customer and assigned provider join this room
provider:{providerId}   -- Individual provider channel
category:{category}     -- All providers in a service category (for broadcasting new jobs)
emergency:{category}    -- Emergency broadcast channel per category
neighborhood:{pincode}  -- Local activity updates
```

### Event Flow: Normal Bidding

```
1. Customer creates job request
   Server emits → category:{category} → 'booking:new_request' 
   (payload: jobId, serviceType, area, date/time)

2. Provider submits bid
   Server emits → booking:{bookingId} → 'booking:new_bid'
   (payload: bidId, providerName, providerRating, bidAmount, ETA, message, portfolioPreview)

3. Customer accepts bid
   Server emits → provider:{winnerId} → 'booking:bid_accepted' (full booking details)
   Server emits → provider:{loserId1} → 'booking:bid_rejected'
   Server emits → provider:{loserId2} → 'booking:bid_rejected'
   Server emits → category:{category} → 'booking:closed' (jobId)

4. Provider status updates (en_route, in_progress, completed)
   Server emits → booking:{bookingId} → 'booking:status_changed' (newStatus, timestamp)

5. Provider location update (en route)
   Server emits → booking:{bookingId} → 'provider:location' (lat, lng)
```

### Event Flow: Emergency

```
1. Customer creates SOS request
   Server emits → emergency:{category} → 'emergency:new_request'
   (payload: jobId, emergencyType, area, surgePrice)

2. Provider accepts (must respond within 60 seconds)
   Server emits → booking:{bookingId} → 'emergency:provider_found' (provider details)
   Server emits → emergency:{category} → 'emergency:taken' (jobId)
   
3. If no provider responds in 60 seconds → auto-expand radius and re-broadcast
```

### Authentication for Sockets

```typescript
// backend: socket auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Verify Clerk JWT (or custom JWT)
  // Attach user data to socket
  // Join appropriate rooms based on user role
});
```

---

## 12. Revenue Model & Unit Economics

### Year 1 Targets (Single City — e.g., Bangalore)

| Metric | Month 1-3 | Month 4-6 | Month 7-12 |
|---|---|---|---|
| Providers on platform | 50 | 200 | 500 |
| Active customers (monthly) | 200 | 1,000 | 5,000 |
| Bookings/month | 100 | 800 | 4,000 |
| Avg booking value | ₹600 | ₹650 | ₹700 |
| Revenue/booking (lead fee) | ₹30 | ₹35 | ₹40 |
| Subscription revenue/month | ₹0 (free period) | ₹15,000 (50 paid subs) | ₹1,50,000 (300 paid subs) |
| Monthly revenue | ₹3,000 | ₹43,000 | ₹3,10,000 |
| Monthly burn (ops + tech) | ₹2,00,000 | ₹3,00,000 | ₹5,00,000 |

### Path to Profitability

- Break-even at ~2,000 paying provider subscribers (₹299/mo avg) + 10,000 bookings/month (₹40 lead fee avg)
- = ₹5,98,000 subscription + ₹4,00,000 leads = ₹9,98,000/month
- At 15,000 bookings/month → profitable with ₹12L+/month revenue

### Why This Is Better Than UC's Economics

| Metric | Urban Company | Nimivo |
|---|---|---|
| Revenue per booking | ₹150-300 (25-30% commission) | ₹40-50 (lead fee) + subscription amortized |
| Provider CAC | ₹5,000-10,000 (training, equipment) | ₹100-200 (zero onboarding cost) |
| Customer CAC | ₹800-1,500 (advertising heavy) | ₹200-400 (organic via provider profile sharing) |
| Provider churn | High (resentment, off-platform leakage) | Low (portfolio + tools lock-in) |
| Off-platform risk | Very high (providers avoid 25% commission) | Low (10% lead fee doesn't justify leaving; tools add value) |

---

## 13. VC Pitch Narrative

### The Pitch (2 minutes)

> **Problem:** India's home services market is $60 billion but less than 1% is online. The dominant player, Urban Company, controls both sides — they set prices, assign providers, and take 25-30% commission. This has caused provider strikes in 2021, 2023, and 2024, Al Jazeera reporting "slavery-like conditions," and massive off-platform leakage. Meanwhile, customers can't choose their provider or build ongoing relationships.
>
> **Insight:** The US home services market solved this differently. Thumbtack ($3.2B) lets providers compete on price. Housecall Pro gives providers business tools. Neither model exists in India.
>
> **Solution:** Nimivo is a provider-first home services marketplace. Three key differences:
>
> 1. **Providers bid competitively on jobs** — customers post a request, providers send their price and ETA. Customer picks the best offer. This creates market-driven pricing, not platform-dictated pricing.
>
> 2. **Providers build their own brand** — portfolios with before/after photos, public profile pages they can share on WhatsApp, and business tools (GST invoicing, earnings analytics, customer CRM). Their reputation is portable and visible.
>
> 3. **We charge ₹40 per lead, not 25% per job.** Providers keep 85-90% of the job value. This eliminates the incentive to go off-platform.
>
> **Market:** $60B total, < 1% online. 500+ cities with zero organized services.
>
> **Traction:** [Insert real numbers when you have them]
>
> **Ask:** ₹2 Cr seed round to launch in Bangalore with 500 providers across 6 categories. 18-month runway to prove unit economics and expand to 3 cities.

### Expected VC Questions & Answers

**Q: How is this different from Urban Company?**
> UC is a managed marketplace — they control pricing, assignment, and provider identity. We're an open marketplace — providers compete on price, customers choose, and providers build their own brand. The model is fundamentally different, like Uber vs. a taxi dispatch service.

**Q: Won't providers just use your platform to find customers and then go off-platform?**
> That's UC's problem because they take 25-30%. Our lead fee is ₹40. More importantly, the provider's portfolio, reviews, shareable profile, invoicing tools, and customer relationships all live on our platform. Going off-platform means losing their digital business identity.

**Q: How do you ensure quality without controlling providers?**
> Three mechanisms: (1) The portfolio system — before/after photos create accountability. (2) The bidding system — providers with bad ratings don't get bids accepted. (3) The neighborhood trust network — local social proof is more powerful than platform badges.

**Q: What stops UC from copying this?**
> UC can't adopt bidding without cannibalizing their 25-30% commission model. Their entire revenue depends on controlling prices. Letting providers set prices would destroy their unit economics. It's the classic innovator's dilemma.

**Q: What about quality control? UC trains their providers.**
> UC's training costs providers ₹1 lakh upfront and primarily exists to standardize labor for a controlled marketplace. We believe skill is demonstrated through work, not training certificates. Our portfolio system (verified before/after photos) is a more authentic signal of quality than a platform-issued badge.

**Q: How do you acquire providers?**
> Zero upfront cost is our hook. Any skilled service provider can join, list their services, and start bidding immediately. No ₹1L training fee. No forced product purchases. Word of mouth among providers is our primary acquisition channel — providers who earn more tell other providers.

**Q: How do you acquire customers?**
> Two organic channels: (1) Provider-shared profiles — every provider has a public profile link they share on WhatsApp, business cards, and apartment notice boards. This brings customers directly to our platform. (2) Neighborhood network effects — when 10 people in a building use Nimivo, the 11th person sees "popular in your area" and converts.

---

## 14. Competitive Landscape

```
                          Provider Autonomy
                    LOW ◄────────────────────► HIGH
                    │                              │
         HIGH      │  Urban Company    │  Nimivo │
    Platform       │  Blinkit Home     │  (target  │
    Control        │  Snabbit          │   position)│
                    │                  │            │
                    │──────────────────┼────────────│
                    │                  │            │
         LOW       │  WhatsApp Groups │  Thumbtack │
    Platform       │  JustDial        │  Housecall │
    Control        │  Word of mouth   │  Pro       │
                    │                  │            │
                    HIGH ◄─────────────────► LOW
                          Platform Commission
```

### Key Competitors

| Competitor | Model | Strength | Weakness |
|---|---|---|---|
| **Urban Company** | Managed marketplace, 25-30% commission | Brand recognition, 40K providers, Metro coverage | Provider resentment, strikes, off-platform leakage, high burn |
| **Blinkit Home** | Quick commerce extension | Massive distribution (Zomato network), speed | No home services expertise, same controlled model |
| **Snabbit** | 10-min services, VC-backed ($5.5M) | Speed, Mumbai focus | Very early, same controlled model, quality at speed is unreproved |
| **JustDial** | Lead-gen / directory | Huge database, brand recognition | No transaction layer, no quality control, directory not marketplace |
| **WhatsApp Groups** | Informal word-of-mouth | Trust (neighbor recommendations) | No accountability, no tracking, no standardization |
| **Independent providers** | Direct relationship | No commission, personalized | No discovery, no trust for new customers, no digital tools |

### Our Position

We compete DIFFERENTLY from all of the above:
- Unlike UC/Blinkit/Snabbit: providers have autonomy, not controlled
- Unlike JustDial: we have a transaction layer with bidding, tracking, and payments
- Unlike WhatsApp: we add accountability, portfolios, and business tools
- Unlike independent providers: we add discovery, trust (neighborhood data), and digital infrastructure

---

## 15. Go-To-Market Strategy

### Phase 1: Launch (Month 1-3) — Single City, Single Locality

**Geography:** One micro-market — e.g., Koramangala 4th Block, Bangalore

**Supply side (providers):**
1. Walk into local hardware stores, cleaning services, electrician shops
2. Pitch: "List your services for free. Get job requests from the neighborhood. No commission — just ₹30 per lead. And we give you a free digital business card you can share on WhatsApp."
3. Target: 50 providers across 6 categories (8-9 per category)
4. Onboard them in person — help them create profiles, take portfolio photos, set up the app

**Demand side (customers):**
1. Target 2-3 apartment complexes in Koramangala
2. Offer first booking free (platform absorbs lead fee)
3. Apartment WhatsApp group outreach: "Your neighbors are already using Nimivo. 8 people in your building booked cleaning last week."
4. After first booking, prompt: "Save your provider → share with neighbors"

**Success metric:** 100 bookings in month 3 with 60%+ customer return rate

### Phase 2: Expand (Month 4-6) — Multiple Localities

- Expand to 5-10 localities in Bangalore
- Launch provider subscription (₹299/month) for business tools
- Introduce emergency SOS mode
- Target: 200 providers, 1,000 monthly active customers

### Phase 3: City Coverage (Month 7-12)

- Full Bangalore coverage
- Prepare for 2nd city (likely Hyderabad or Pune — strong service provider communities)
- Target: 500 providers, 5,000 monthly active customers
- Raise seed round with proven unit economics

### Phase 4: Multi-City + SaaS (Year 2)

- Launch in 3-5 cities
- Scale provider SaaS tools (premium tier with advanced analytics, AI pricing suggestions)
- Introduce provider micro-loans (partnering with fintech)
- Build API for property management companies (bulk booking contracts)

---

## 16. Implementation Priority & Phases

### Phase 1: Foundation Fix (Week 1-2)

**Priority: Fix what's broken before adding what's new**

- [ ] Fix Clerk ↔ Backend auth mismatch (Option A: @clerk/express)
- [ ] Remove ALL fake data (review counts, testimonials, fake reviews, fake stats)
- [ ] Fetch services from API instead of hardcoded constants
- [ ] Seed database with complete service catalog (all 40+ services)
- [ ] Add role-based access control (customer can't access /provider or /admin)
- [ ] Fix cart: remove quantity, match IDs with database UUIDs
- [ ] Remove unrealistic promises (15-min guarantee, money-back, insurance claims)
- [ ] Update HowItWorks, WhyChooseUs, HeroSection to reflect bidding model
- [ ] Cash payment only (remove fake UPI/card/netbanking claims)

### Phase 2: Bidding System (Week 2-4)

**Priority: Build the core differentiator**

- [ ] Create `bids` table in database schema
- [ ] Add `accepting_bids` to booking status enum
- [ ] Build bid API endpoints (create bid, list bids, accept bid, reject bid)
- [ ] Build `GET /api/provider/open-requests` endpoint
- [ ] Integrate Socket.IO: broadcast new jobs, new bids, bid acceptance
- [ ] Build BidSelectionPage (customer's live bid feed)
- [ ] Build OpenRequestsTab in ProviderDashboard
- [ ] Build BidFormModal for providers
- [ ] Update booking flow: "Request Quotes" → bid selection → confirmation

### Phase 3: Provider Identity (Week 3-5)

**Priority: Build the tools that create lock-in**

- [ ] Extend providers table (bio, slug, languages, experience, GSTIN)
- [ ] Create `work_portfolio` table
- [ ] Build portfolio upload API with Cloudinary integration
- [ ] Build PublicProviderPage (`/pro/:slug`)
- [ ] Build ProviderProfileEditor
- [ ] Build PortfolioGallery component
- [ ] Add portfolio preview to BidCard component
- [ ] Build shareable profile link (WhatsApp share button)

### Phase 4: Transparent Pricing (Week 4-5)

**Priority: Build trust with both sides**

- [ ] Implement pricing engine (base + distance + time factor + GST + platform fee)
- [ ] Build PriceBreakdown component
- [ ] Show breakdown on bid acceptance, booking confirmation, tracking, and receipt
- [ ] Show provider earnings on ProviderDashboard
- [ ] Build basic EarningsChart with Recharts

### Phase 5: Emergency SOS (Week 5-6)

- [ ] Add emergency fields to bookings schema
- [ ] Build emergency API endpoints
- [ ] Build SOSButton, EmergencyTypeSelector, EmergencyModal
- [ ] Implement 60-second accept window with cascading broadcast
- [ ] Build emergency tracking page (red theme)
- [ ] Socket events for emergency flow

### Phase 6: My Pro + Neighborhood (Week 6-8)

- [ ] Create `favorite_providers` table
- [ ] Build favorites API endpoints
- [ ] Build MyProsPage
- [ ] Build "Save as My Pro" button on TrackingPage (post-completion)
- [ ] Build direct rebooking flow
- [ ] Build neighborhood popularity aggregation endpoint
- [ ] Build "Popular Near You" section on HomePage
- [ ] Build "Trusted in Your Area" badge on bid cards

### Phase 7: Provider SaaS Tools (Week 8-10)

- [ ] Build earnings analytics API (daily/weekly/monthly, with comparison)
- [ ] Build invoice generation (PDF) with GST calculation
- [ ] Build customer CRM (past customers, notes, rebook option)
- [ ] Build provider subscription tiers and payment (Razorpay)
- [ ] Build ProviderEarningsTab, ProviderInvoicesTab, ProviderCustomersTab

### Phase 8: Polish & Launch (Week 10-12)

- [ ] End-to-end testing of all flows
- [ ] Payment integration (Razorpay for customer payments + provider subscriptions)
- [ ] Real provider onboarding (in-person, Bangalore)
- [ ] Performance optimization (lazy loading, image optimization, API caching)
- [ ] Security audit (rate limiting, input validation, SQL injection, XSS)
- [ ] Deploy: Frontend on Vercel, Backend on Railway, DB on Railway PostgreSQL
- [ ] Monitoring: error tracking (Sentry), uptime (UptimeRobot), analytics (PostHog)

---

## 17. Success Metrics

### Product Metrics

| Metric | What It Measures | Target (6 months) |
|---|---|---|
| **Bid-to-accept ratio** | Are providers competitive and bids useful? | > 30% of bids accepted |
| **Avg bids per job** | Is there enough supply competition? | 3-5 bids per job request |
| **Time to first bid** | How fast providers respond | < 5 minutes |
| **Customer repeat rate** | Are customers coming back? | > 40% monthly |
| **"My Pro" save rate** | Are customers building provider relationships? | > 25% of completed bookings |
| **Provider monthly active** | Are providers staying on the platform? | > 60% of registered providers active monthly |
| **Portfolio upload rate** | Are providers building their brand? | > 30% of completed jobs get photos |
| **Off-platform leakage** | Are transactions happening outside the app? | < 10% (measured via rebooking patterns) |
| **Emergency response time** | How fast SOS jobs get accepted | < 90 seconds |
| **NPS (customer)** | Would they recommend us? | > 50 |
| **NPS (provider)** | Would they recommend us to other providers? | > 60 |

### Business Metrics

| Metric | Target (12 months) |
|---|---|
| Monthly bookings | 4,000 |
| Monthly revenue | ₹3,10,000 |
| Provider subscribers | 300 |
| Customer CAC | < ₹400 |
| Provider CAC | < ₹200 |
| Gross margin | > 70% |

---

## 18. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| **Not enough providers bid** → poor customer experience | High (early stage) | Critical | Guarantee minimum 3 bids or auto-assign. Seed market with onboarded providers. Incentivize first bids with 0 lead fee for first month |
| **Providers bid but don't show up** | Medium | High | Rating impact, portfolio visibility penalty, temporary suspension after 2 no-shows |
| **Customers accept cheapest bid always** → quality race to bottom | Medium | Medium | Show portfolio prominently alongside price. Surface "most reliable" badge. Educate customers that cheapest isn't always best |
| **UC launches similar bidding feature** | Low (cannibalization risk for them) | High | Move fast. Build provider lock-in through tools and portfolio. UC can't do this without destroying their commission model |
| **Payment fraud / disputes** | Medium | Medium | Escrow payment: customer pays upfront, provider gets paid after completion + 24hr dispute window |
| **Provider collusion on pricing** | Low | Medium | Monitor bid patterns algorithmically. Flag suspiciously identical bids |
| **Regulatory risk (gig worker classification)** | Medium (growing) | Medium | We're already on the right side — we don't classify providers as employees. They're independent professionals with full autonomy. India's Social Security Code 2020 favors this model |
| **Scaling quality control without centralized training** | High (at scale) | High | Portfolio system creates accountability. Neighborhood trust creates social pressure. Skill certification (optional, verified by us) builds credibility |

---

## Appendix A: What Nimivo Is NOT

To be crystal clear with investors, customers, and ourselves:

1. **We are NOT a managed marketplace** — We don't set prices, assign providers, or control the customer-provider relationship
2. **We are NOT a gig economy platform** — Providers are independent professionals, not gig workers. They set prices, choose jobs, and build brands
3. **We are NOT trying to be cheaper than UC** — We're trying to be more transparent, more fair, and more empowering
4. **We are NOT a training company** — We don't train providers. We showcase their existing skills through portfolios and let the market decide quality
5. **We are NOT a quick commerce company** — We don't promise 15-minute delivery. We promise competitive bidding, provider choice, and transparent pricing
6. **We are NOT a charity** — We charge for leads and subscriptions. But we charge fairly, transparently, and only for value delivered

---

## Appendix B: Tech Stack (Current → Target)

| Layer | Current | Keep/Change | Target |
|---|---|---|---|
| Frontend | React 19 + Vite 6 | Keep | Same |
| Styling | Tailwind CSS 4 + shadcn/ui | Keep | Same |
| State | Zustand 5 | Keep | Same |
| Auth (Frontend) | Clerk 5.60 | Keep | Same |
| Auth (Backend) | Custom JWT (broken) | **CHANGE** | @clerk/express (verify Clerk tokens) |
| Forms | React Hook Form + Zod | Keep | Same |
| Animation | Framer Motion 12 | Keep | Same |
| HTTP | Axios | Keep | Same |
| Routing | React Router DOM 7 | Keep | Same |
| Charts | Recharts 3.7 (unused) | **USE IT** | Provider earnings, admin analytics |
| Real-time | Socket.IO 4.8 | Keep, **CONNECT IT** | Wire to all booking/bid events |
| Backend | Express 4 + TypeScript | Keep | Same |
| ORM | Drizzle ORM 0.33 | Keep | Same |
| Database | PostgreSQL 16 (Docker) | Keep | Same + new tables |
| Image Upload | None | **ADD** | Cloudinary (free tier) |
| Payment | None | **ADD** | Razorpay (India) |
| PDF Generation | None | **ADD** | @react-pdf/renderer or pdfkit |
| Email | None | **ADD** | Resend (free tier: 3K emails/month) |
| Monitoring | None | **ADD** | Sentry (error tracking) + PostHog (analytics) |
| Deployment | None configured | **ADD** | Vercel (frontend) + Railway (backend + DB) |

---

*This document is the single source of truth for Nimivo product direction. Every feature, every implementation decision, and every line of code should trace back to one question: "Does this empower the provider and give the customer choice?"*

*If the answer is no, we're building Urban Company. And that's already been built.*
