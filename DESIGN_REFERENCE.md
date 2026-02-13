# FastPAYS — Design Reference Bible

> **Every page, component, and pixel decision must follow this file.** This ensures FastPAYS looks like a hand-crafted, premium product — never like an AI-generated template.

---

## 1. DESIGN PHILOSOPHY

FastPAYS follows the visual language of **https://home.utilita.co.uk/** (Utilita Home) — a bold, confident, human-first design. The website feels like it was built by a talented agency, not spat out by a prompt.

### Core Principles
1. **Bold over bland** — Large typography, saturated accent colors, confident CTAs
2. **Asymmetric over symmetric** — Break the grid. Stagger text and images.
3. **Human over corporate** — Conversational copy, real names, real photos
4. **Layered over flat** — Subtle shadows, overlapping elements, alternating section backgrounds
5. **Purposeful over decorative** — Every animation serves UX, not vanity

---

## 2. COLOR PALETTE

### Primary Brand Colors
```css
--fp-navy:          #0F172A;   /* Deep navy — primary brand, headers, text */
--fp-navy-light:    #1E293B;   /* Lighter navy — cards, elevated surfaces */
--fp-emerald:       #10B981;   /* Emerald green — CTA buttons, success, "go" actions */
--fp-emerald-hover: #059669;   /* Darker emerald — button hover states */
--fp-emerald-light: #D1FAE5;   /* Very light emerald — success backgrounds, badges */
```

### Neutral Colors
```css
--fp-white:         #FFFFFF;   /* Page background */
--fp-surface:       #F8FAFC;   /* Alternate section backgrounds (light gray) */
--fp-surface-warm:  #F1F5F9;   /* Cards, input backgrounds */
--fp-border:        #E2E8F0;   /* Borders, dividers */
--fp-text:          #0F172A;   /* Primary text (same as navy) */
--fp-text-muted:    #64748B;   /* Secondary text, captions */
--fp-text-light:    #94A3B8;   /* Placeholder text, disabled */
```

### Status Colors
```css
--fp-success:       #10B981;   /* Completed, available, confirmed */
--fp-warning:       #F59E0B;   /* Pending, caution */
--fp-error:         #EF4444;   /* Failed, cancelled, declined */
--fp-info:          #3B82F6;   /* Informational, assigned, in-transit */
```

### Service Category Colors (Each service has its own identity)
```css
--fp-cleaning:      #EC4899;   /* Hot pink */
--fp-plumbing:      #06B6D4;   /* Cyan */
--fp-electrical:    #F59E0B;   /* Amber */
--fp-carpentry:     #8B5CF6;   /* Purple */
--fp-painting:      #F97316;   /* Orange */
--fp-salon:         #A855F7;   /* Violet */
```

### Usage Rules
- **Hero backgrounds:** Navy (#0F172A) or white with navy text — NEVER generic gradients
- **CTA buttons:** Emerald (#10B981) with white text — always. No outline buttons for primary actions
- **Section alternation:** White → Light gray (#F8FAFC) → White → Light gray (like Utilita)
- **Service cards:** White card with left-border colored by service category
- **NEVER use:** Purple-to-blue gradients, pastel rainbow backgrounds, glassmorphism, neon accents

---

## 3. TYPOGRAPHY

### Font Stack
```css
/* Primary — Used for everything */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Mono — Booking codes, IDs only */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Hero headline | 48px / 3rem (mobile: 32px) | 800 (ExtraBold) | 1.1 | -0.02em |
| Section headline | 36px / 2.25rem (mobile: 28px) | 700 (Bold) | 1.2 | -0.01em |
| Section sub-label | 12px / 0.75rem | 600 (SemiBold) | 1 | 0.1em (wide) |
| Card title | 20px / 1.25rem | 600 | 1.3 | 0 |
| Body text | 16px / 1rem | 400 (Regular) | 1.6 | 0 |
| Small / Caption | 14px / 0.875rem | 400 | 1.4 | 0 |
| Button text | 16px / 1rem | 600 | 1 | 0.02em |
| Price | 24px / 1.5rem | 700 | 1 | 0 |
| Booking code | 14px / 0.875rem | 500 (mono) | 1 | 0.05em |

### Rules
- **Section sub-labels** (like Utilita's "SOLAR MADE SIMPLE", "WHY CHOOSE US") are ALWAYS:
  - UPPERCASE
  - 12px, weight 600, letter-spacing 0.1em
  - Color: emerald (#10B981)
  - Placed ABOVE the section headline with 8px gap
- **Hero headline:** Maximum 2 lines. Bold, punchy. No period at end.
- **Body copy:** Conversational tone. "We'll get someone to you in minutes" not "Our platform facilitates connection"
- **NEVER use:** Raleway, Poppins+Montserrat combo, or any "AI template" font pairing

---

## 4. LAYOUT PATTERNS (Adapted from Utilita Home)

### 4.1 Navigation (Sticky)
```
┌─────────────────────────────────────────────────────────────┐
│  [FastPAYS Logo]    Home  Services  How It Works  Login  │ [Book Now ►] │
└─────────────────────────────────────────────────────────────┘
```
- **Sticky on scroll** with subtle backdrop blur + shadow
- Logo on left, nav links center, CTA button right
- Mobile: hamburger menu (slide-in from right)
- Background: white, border-bottom: 1px #E2E8F0
- CTA: emerald button, always visible

### 4.2 Hero Section (Home Page)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   INSTANT HOME SERVICES               [Large Photo         │
│                                         of smiling          │
│   Get Professional Help                 service             │
│   Within 15 Minutes                     professional        │
│                                         at door]            │
│   Professional cleaning, plumbing,                          │
│   electrical & more — delivered fast.                       │
│                                                             │
│   [📍 Enter your location  ]  [Book Now ►]                 │
│                                                             │
│   ✓ 15-min arrival  ✓ Verified pros  ✓ Transparent pricing │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
- **Split layout:** Text 45% left, Image 55% right (NOT centered text)
- **Sub-label** "INSTANT HOME SERVICES" in emerald, uppercase, above headline
- **Trust badges** below the CTA (inline, horizontal)
- **Background:** White or very subtle (#F8FAFC), NO gradients
- **Image:** A real-looking photo of a service professional, NOT an illustration
- Mobile: Stack vertically (text on top, image below)

### 4.3 Service Grid
```
POPULAR SERVICES                           ← emerald sub-label

Choose from our most booked services       ← section headline

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ▌ 🏠         │  │ ▌ 🔧         │  │ ▌ ⚡         │
│ Deep Cleaning │  │ Plumbing     │  │ Electrician  │
│ Professional  │  │ Expert pipe  │  │ Safe wiring  │
│ deep clean    │  │ & drain fix  │  │ & repair     │
│               │  │              │  │              │
│ ₹499 · 120min│  │ ₹349 · 60min│  │ ₹399 · 90min│
│ [Book Now ►]  │  │ [Book Now ►] │  │ [Book Now ►] │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ▌ 🪚         │  │ ▌ 🎨         │  │ ▌ ✂️         │
│ Carpentry    │  │ Painting     │  │ Salon at Home│
│ ...          │  │ ...          │  │ ...          │
└──────────────┘  └──────────────┘  └──────────────┘
```
- **3 columns** on desktop, 2 on tablet, 1 on mobile
- Each card has a **colored left border** matching its service category color
- Cards are NOT identical height — they can vary slightly (this looks natural)
- Hover: card lifts (translateY -4px) + shadow deepens
- **"▌"** represents the 4px left accent border on the card

### 4.4 How It Works Section
```
HOW IT WORKS                               ← emerald sub-label

Simple as 1, 2, 3                          ← headline

[1]──────────[2]──────────[3]
 ↓             ↓             ↓

Choose        Get Matched    Service
Your          With a Pro     at Your
Service       Near You       Doorstep

Browse our     We find the    Your expert
catalog and    nearest        arrives and
pick what      verified       gets the
you need.      professional.  job done.
```
- **Connected by a horizontal line** between numbers (NOT a plain number grid)
- Numbers in emerald circles
- Each step has an icon ABOVE the title
- Background: light gray (#F8FAFC) section

### 4.5 Testimonials Section (Carousel)
```
WHAT OUR CUSTOMERS SAY                     ← emerald sub-label

Real people, real experiences              ← headline

 ◄  ┌──────────────────────────────────┐  ►
    │                                  │
    │  "FastPAYS saved my weekend!     │
    │   The plumber arrived in 11      │
    │   minutes and fixed my leak      │
    │   in no time. Incredible."       │
    │                                  │
    │  [Photo] Priya Sharma            │
    │          Mumbai  ⭐⭐⭐⭐⭐           │
    │                                  │
    └──────────────────────────────────┘

    ● ○ ○ ○ ○                          ← dot indicators
```
- **Auto-scrolling carousel** (pause on hover)
- Show 1 testimonial at a time on mobile, 3 on desktop
- Each has: quote, photo, name, city, star rating
- Background: white section
- **Quotes feel real** — mention specific services, time, experience

### 4.6 CTA Banner (Between Sections)
```
┌─────────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│                                                             │
│   Ready to get started?                                     │
│   Book a service and we'll be there in 15 minutes.          │
│                                                             │
│                  [Book Your First Service ►]                │
│                                                             │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────────────────────────────────────────────┘
```
- **Background: Navy (#0F172A)** with white text
- **Single CTA button** — emerald, large
- Used between content sections for rhythm (like Utilita does)
- Centered text, generous padding (80px+ vertical)

### 4.7 Why Choose FastPAYS Section
```
WHY CHOOSE US                              ← emerald sub-label

The FastPAYS difference                    ← headline

┌─────────────────────────────────────┐
│  [Icon]  15-Minute Guarantee        │  ← staggered cards
│          We promise arrival within  │     (left-aligned, right-aligned,
│          15 minutes or it's free.   │      alternating)
├─────────────────────────────────────┤
│          Verified Professionals [Icon]│
│          Every provider is background │
│          checked and skill-verified.  │
├─────────────────────────────────────┤
│  [Icon]  Transparent Pricing        │
│          No hidden fees. See your   │
│          total before you book.     │
├─────────────────────────────────────┤
│          Real-Time Tracking  [Icon] │
│          Watch your provider's      │
│          live location on the map.  │
└─────────────────────────────────────┘
```
- **Alternating left/right alignment** (icon+text swap sides) — like Utilita
- Background: white
- Each value prop has: icon, headline (bold), description (muted text)
- Generous spacing between items (48px+)

### 4.8 FAQ Accordion
```
FREQUENTLY ASKED QUESTIONS                 ← emerald sub-label

Got questions? We've got answers.          ← headline

┌─────────────────────────────────────────┐
│ ▸ How fast will my service provider arrive?  │
├─────────────────────────────────────────┤
│ ▾ What services does FastPAYS offer?         │
│                                              │
│   We offer 6 core services: Deep Cleaning,   │
│   Plumbing, Electrician, Carpentry, Painting,│
│   and Salon at Home. Each service is         │
│   performed by verified professionals.       │
│                                              │
├─────────────────────────────────────────┤
│ ▸ How is the pricing calculated?             │
├─────────────────────────────────────────┤
│ ▸ Can I cancel a booking?                    │
├─────────────────────────────────────────┤
│ ▸ How are providers vetted?                  │
└─────────────────────────────────────────┘
```
- shadcn/ui Accordion component
- Max 6-8 questions
- Chevron rotates on expand (smooth)
- Background: light gray (#F8FAFC)

### 4.9 Footer
```
┌─────────────────────────────────────────────────────────────┐
│  Background: Navy (#0F172A)                                 │
│                                                             │
│  [FastPAYS Logo]                                            │
│  Get professional help within 15 minutes.                   │
│                                                             │
│  SERVICES         COMPANY          SUPPORT                  │
│  Deep Cleaning    About Us         Help Center              │
│  Plumbing         How It Works     Contact Us               │
│  Electrician      Careers          Privacy Policy            │
│  Carpentry        Blog             Terms of Service          │
│  Painting         Press            Refund Policy             │
│  Salon            Partners                                   │
│                                                             │
│  ─────────────────────────────────────────────────          │
│  [FB] [TW] [IG] [LI]          © 2026 FastPAYS              │
└─────────────────────────────────────────────────────────────┘
```
- Navy background, white text
- 3-column link grid (mobile: stack)
- Social icons (subtle, not flashy)
- Copyright at bottom

---

## 5. COMPONENT DESIGN SPECS

### 5.1 Service Card
```
┌────────────────────────────────┐
│ ▌                              │  ← 4px left border (service color)
│ ▌  [Service Icon]              │
│ ▌                              │
│ ▌  Deep Cleaning               │  ← 20px, weight 600
│ ▌  Professional home           │  ← 14px, muted text
│ ▌  deep cleaning service       │
│ ▌                              │
│ ▌  ⏱ 120 min    ₹499          │  ← duration + price row
│ ▌                              │
│ ▌  [  Book Now  ►  ]           │  ← emerald button, full width
│ ▌                              │
└────────────────────────────────┘
```
- White background, subtle shadow (0 1px 3px rgba(0,0,0,0.1))
- 4px left border in service category color
- Hover: translateY(-4px), shadow increases
- Border-radius: 12px
- Padding: 24px

### 5.2 Booking Status Badge
| Status | Color | Background | Label |
|---|---|---|---|
| pending | #F59E0B (amber) | #FEF3C7 | Pending |
| assigned | #3B82F6 (blue) | #DBEAFE | Assigned |
| in_transit | #8B5CF6 (purple) | #EDE9FE | On the Way |
| arrived | #06B6D4 (cyan) | #CFFAFE | Arrived |
| in_progress | #6366F1 (indigo) | #E0E7FF | In Progress |
| completed | #10B981 (emerald) | #D1FAE5 | Completed |
| cancelled | #EF4444 (red) | #FEE2E2 | Cancelled |

- 14px, weight 500
- Border-radius: 9999px (full pill)
- Padding: 4px 12px

### 5.3 Provider Card
```
┌────────────────────────────────────────┐
│  [Photo]  Rahul Kumar     ⭐ 4.8      │
│           Plumbing Expert              │
│           234 jobs completed           │
│                                        │
│  [📞 Call]        [💬 Message]         │
└────────────────────────────────────────┘
```
- Circular photo (48px diameter)
- Name: 16px bold, rating: emerald text
- Subtitle: 14px muted
- Action buttons: outline style

### 5.4 ETA Countdown
```
┌────────────────────────┐
│   ⏱                    │
│   Arriving in          │  ← 14px muted
│   12 minutes           │  ← 36px bold, navy
│   ████████░░░░ (67%)   │  ← progress bar, emerald
└────────────────────────┘
```
- Large number for minutes
- Progress bar: emerald fill on gray track
- Updates every 30 seconds (Socket.IO)

### 5.5 Status Timeline (Tracking Page)
```
  ✓ Booking confirmed     9:30 AM    ← emerald checkmark, emerald text
  │
  ✓ Provider assigned     9:31 AM    ← emerald checkmark
  │
  ● On the way            9:35 AM    ← emerald pulsing dot (ACTIVE)
  │
  ○ Arrived               —          ← gray circle
  │
  ○ Service in progress   —          ← gray circle
  │
  ○ Completed             —          ← gray circle
```
- Vertical line connecting steps (2px, #E2E8F0)
- Active step has a pulsing emerald dot
- Completed steps: emerald checkmark
- Future steps: gray empty circle

### 5.6 Booking Card (History)
```
┌────────────────────────────────────────────────────────┐
│  BK20260213A1B2          [Completed ✓]                │  ← code (mono) + badge
│                                                        │
│  🏠 Deep Cleaning        Rahul Kumar ⭐ 4.8           │  ← service + provider
│  📍 Sector 15, Noida     13 Feb 2026, 9:30 AM         │  ← address + date
│                                                        │
│  ₹499                   [View Details]  [Rebook ↻]    │  ← price + actions
└────────────────────────────────────────────────────────┘
```
- White card, subtle border (#E2E8F0)
- Booking code in monospace
- Status badge (top right)
- Two-row layout with service info
- Bottom row: price left, buttons right

---

## 6. PAGE-SPECIFIC DESIGNS

### 6.1 Login Page
- **Split screen**: Form (40% left) + Marketing panel (60% right, navy background with brand messaging)
- Form has: logo, "Welcome back" h2, email input, password input (show/hide toggle), "Remember me", "Forgot password?", "Login" button, "Don't have account?" link
- Marketing panel: Large tagline "Get help within 15 minutes", key stats (500+ pros, 10K+ bookings, 4.8 avg rating)
- Mobile: Full-width form, no marketing panel

### 6.2 Register Page
- **Multi-step form** (3 steps):
  - Step 1: Full Name + Email
  - Step 2: Phone + Password (with strength indicator)
  - Step 3: Review & Create
- Progress indicator (step bubbles connected by line)
- Same split-screen layout as login

### 6.3 Booking Flow
- **3-step wizard** centered on page (max-width: 640px)
- Prominent progress bar at top
- Step 1: Service summary card (confirm selection)
- Step 2: Google Places autocomplete for address + phone + notes
- Step 3: Price breakdown table + "Confirm Booking" button
- On confirm: shake animation on button → confetti → confirmation modal

### 6.4 Live Tracking Page
- **Map occupies top 60%** of viewport
- **Detail card** slides up from bottom (40%)
- On mobile: card is draggable (swipe-up gesture)
- Map shows: user pin (blue), provider pin (green pulse), route polyline
- Card shows: provider info, ETA countdown, status timeline, action buttons

### 6.5 Provider Dashboard
- **Mobile-first** (this is used on phones)
- Large availability toggle at top (ON = green, OFF = gray)
- Stats cards: Today's Earnings (₹), Jobs Completed, Rating, Response Rate
- Active booking card (if any) with customer info + navigation button
- Pending requests list with countdown timers

### 6.6 Admin Dashboard
- **Desktop-only** layout
- Sidebar navigation (navy, 240px wide)
- 4 stats cards at top
- Two charts: bookings trend (line) + revenue by service (bar)
- Recent bookings table (10 rows)
- Live activity feed (right sidebar or below charts)

---

## 7. ANIMATION GUIDELINES

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Page transitions | Fade in + slide up (20px) | 300ms | ease-out |
| Card hover | translateY(-4px) + shadow increase | 200ms | ease |
| Button hover | Background darken + slight scale(1.02) | 150ms | ease |
| Modal open | Backdrop fade + scale(0.95 → 1) | 250ms | spring |
| Status badge change | Pulse once | 500ms | ease-in-out |
| ETA counter update | Number rolls (like a counter) | 400ms | ease-out |
| Notification toast | Slide in from top right | 300ms | ease-out |
| Skeleton loading | Shimmer gradient sweep | 1500ms | linear, infinite |
| Booking confirmed | Checkmark draw + confetti burst | 600ms | spring |
| Provider pin on map | Pulse ring expand | 2000ms | ease-out, infinite |

### Rules
- **NEVER** use bounce animations on text
- **NEVER** use more than 1 animation at a time on the same element
- **NEVER** animate for more than 600ms (except infinite pulses)
- **Respect prefers-reduced-motion** media query — disable all non-essential animations
- Use **Framer Motion** for React animations — not raw CSS keyframes (except skeleton shimmer)

---

## 8. RESPONSIVE BREAKPOINTS

| Breakpoint | Tailwind | Layout |
|---|---|---|
| Mobile | Default (< 640px) | Single column, bottom nav, stacked cards |
| Mobile Landscape | `sm:` (≥ 640px) | 2-column service grid |
| Tablet | `md:` (≥ 768px) | Sidebar toggleable, 2-column grids |
| Desktop | `lg:` (≥ 1024px) | Full sidebar, 3-column grids, split layouts |
| Large Desktop | `xl:` (≥ 1280px) | Max-width container (1280px), centered |

### Mobile-First Rules
- Default styles are mobile
- Add complexity at larger breakpoints
- Touch targets: minimum 44x44px
- Container max-width: 1280px centered with auto margins
- Page padding: 16px mobile, 24px tablet, 32px desktop

---

## 9. ACCESSIBILITY (WCAG 2.1 AA)

| Requirement | Implementation |
|---|---|
| Color Contrast | All text ≥ 4.5:1 ratio against background. Navy on white = 15.4:1 ✓ |
| Focus Indicators | 2px outline in emerald on all interactive elements. Never `outline: none` |
| Keyboard Navigation | Full tab navigation. Enter/Space to activate. Escape to close modals |
| Screen Reader | Semantic HTML (nav, main, section, article). ARIA labels on icons and images |
| Form Labels | Every input has a visible label. Error messages linked with `aria-describedby` |
| Alt Text | All images have descriptive alt text. Decorative images use `alt=""` |
| Loading States | `aria-busy="true"` on loading sections. `aria-live="polite"` for dynamic updates |
| Skip Link | "Skip to main content" link — first focusable element |

---

## 10. COPY / WRITING TONE

### Do ✓
- "We'll get someone to you in minutes"
- "Your plumber is on the way"
- "No hidden fees, ever"
- "Trusted by thousands of happy customers"
- "Book in 30 seconds, help in 15 minutes"

### Don't ✗
- "Our platform facilitates connection between users and service providers"
- "Leveraging AI-powered algorithms for optimal provider matching"
- "Experience seamless integration of booking and tracking modules"
- "Empower yourself with our cutting-edge solution"

### Tone: **Friendly neighbor who happens to run a really efficient company.**

---

## 11. ANTI-AI-LOOK CHECKLIST

Before shipping any page, verify:

- [ ] **No symmetric 3-column icon grids** that look auto-generated
- [ ] **No purple-to-blue gradients** on hero sections
- [ ] **No glassmorphism** cards with blurred backgrounds
- [ ] **No rainbow color schemes** or neon accents
- [ ] **Cards have varying content lengths** — not all identical heights
- [ ] **Text is left-aligned** in most sections (not everything centered)
- [ ] **At least 2 sections use asymmetric text+image layout** (not all centered)
- [ ] **Section sub-labels exist** (like "POPULAR SERVICES" above headlines)
- [ ] **Testimonials have real-sounding names and cities** (Indian names)
- [ ] **Copy reads conversationally** — no corporate jargon
- [ ] **Buttons say something specific** — "Book Deep Cleaning" not "Get Started"
- [ ] **Footer has 3+ organized link columns** — not a single line of links
- [ ] **There are trust signals** — "✓ Verified Pros", "✓ 15-Min Arrival", "✓ Money-Back Guarantee"
- [ ] **Page has visual rhythm** — alternating white/gray backgrounds between sections
- [ ] **At least one navy-background CTA banner** exists between content sections
- [ ] **Mobile experience feels native** — no tiny horizontal scroll, no desktop-shrunken layouts
