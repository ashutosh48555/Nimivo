# FastPays Execution Plan

## Phase 1: Foundation Upgrade
- [ ] **Install Dependencies**:
    - `npm install framer-motion clsx tailwind-merge lucide-react`
    - `npm install -D @tailwindcss/typography`
- [ ] **Configure Tailwind**:
    - Update `tailwind.config.js` with "Royal Blue" and "Vibrant Orange" palette.
    - Configure `fontFamily` with 'Outfit' and 'Plus Jakarta Sans'.
- [ ] **Setup Global Styles**:
    - Import fonts in `index.css`.
    - Add base animations (fade-up, float).

## Phase 2: Core Components (The Premium Kit)
- [ ] **Button Component**:
    - Variants: Primary (Orange Glow), Secondary (Blue Outline), Ghost.
    - Interaction: `scale` on click, `shadow` bloom on hover.
- [ ] **Input/Form Fields**:
    - Floating labels or premium large inputs with icons.
- [ ] **Service Card**:
    - "Glass" hover effect.
    - Image zoom on hover.
    - Icon animation.

## Phase 3: Customer Portal (Visuals)
- [ ] **Navbar**:
    - Sticky glassmorphism.
    - Logo: Blue House + Orange Arrow integration.
- [ ] **Hero Section**:
    - Split layout.
    - Animated text (typing effect or sliding words).
    - Floating 3D elements (if possible) or parallax images.
- [ ] **Service Grid**:
    - Asymmetric "Bento" layout.
- [ ] **Testimonials**:
    - Infinite scroll marquee.

## Phase 4: Provider Portal (Functionality)
- [ ] **Layout**:
    - Sidebar navigation (Collapsible).
- [ ] **Dashboard**:
    - Job Radar (Map view).
    - Earnings Chart (Recharts or simple CSS bars).

## Phase 5: Routing & Architecture
- [ ] Refactor `App.jsx` to support:
    - `/` (Customer Layout)
    - `/provider/*` (Provider Layout)
