# FastPAYS — Design Reference Bible (Premium Edition)

> **Every page, component, and pixel decision must follow this file.** This ensures FastPAYS looks like a $10k+ custom-built product.

---

## 1. DESIGN PHILOSOPHY: "Corporate Prestige"

**Concept**: A trusted, high-velocity service platform. 
**Visuals**: Deep royal blues for trust, vibrant orange for immediate action. 
**Feel**: Smooth, weighted, and expensive. "Glass" overlays, subtle parallax, and magnetic interactions.

### Core Principles
1.  **Trust through Depth** — Use high-quality drop shadows and "glassmorphism" (backdrop-blur) on sticky elements.
2.  **Action through Color** — Orange is ONLY for "Book" or "Continue". It captures the eye instantly.
3.  **Motion conveys Quality** — Elements don't just appear; they slide up, fade in, or scale gently.
4.  **Typography is Voice** — Bold, geometric headers (Outfit) speak with confidence.

---

## 2. COLOR PALETTE (Blue & Orange)

### Primary Brand (Trust)
```css
/* The Deep Royal Blue - Headers, Navbars, primary brand elements */
--fp-blue-900: #1E3A8A;  /* Darkest Navy (Footer) */
--fp-blue-700: #1D4ED8;  /* Primary Blue (H1, Icons) */
--fp-blue-600: #2563EB;  /* Vivid Blue (Active States) */
--fp-blue-50:  #EFF6FF;  /* Very Light Blue (Section Backgrounds) */
```

### Secondary Accent (Action)
```css
/* The Vibrant Orange - STRICTLY for conversion buttons */
--fp-orange-500: #F97316; /* Primary Button */
--fp-orange-600: #EA580C; /* Button Hover */
--fp-orange-100: #FFEDD5; /* Badges / Highlights */
```

### Neutrals (Premium Foundations)
```css
--fp-white:    #FFFFFF;   /* Cards, Main Backgrounds */
--fp-slate-50: #F8FAFC;   /* Alternative Section Background */
--fp-slate-900:#0F172A;   /* Primary Text */
--fp-slate-500:#64748B;   /* Secondary/Muted Text */
```

### Usage Rules
*   **Hero Section**: White background with huge Blue text OR Deep Blue background with White text.
*   **Buttons**: Solid Orange with White text. Rounded full (pill shape) for primary actions.
*   **Shadows**: `box-shadow: 0 10px 40px -10px rgba(30, 58, 138, 0.15);` (Blue-tinted shadow).

---

## 3. TYPOGRAPHY (Premium Stack)

We are ditching standard system fonts for a "Fintech/Startup" look.

### Headers: **Outfit**
*Modern, geometric, bold.*
*   **H1**: Weight 700 / Tight tracking (-0.02em).
*   **H2/H3**: Weight 600.

### Body: **Plus Jakarta Sans**
*Clean, legible, tech-forward.*
*   **Body**: Weight 400 / Line-height 1.6.
*   **Labels/Buttons**: Weight 600.

```css
/* Tailwind Config Preview */
fontFamily: {
  heading: ['Outfit', 'sans-serif'],
  body:    ['Plus Jakarta Sans', 'sans-serif'],
}
```

---

## 4. COMPONENT STYLES

### 4.1 Buttons ("The Magnet")
*   **Primary**: Gradient Orange to Red-Orange `bg-gradient-to-r from-orange-500 to-orange-600`.
*   **Shape**: Full Pill (`rounded-full`).
*   **Interaction**: `hover:scale-105 active:scale-95` (Bouncy).
*   **Shadow**: `shadow-lg shadow-orange-500/30` (Glow effect).

### 4.2 Cards ("The Glass Sheet")
*   **Background**: White.
*   **Border**: 1px solid `slate-100`.
*   **Hover**: Lift up `translate-y-[-5px]`.
*   **Accent**: Top border or icon in Blue-700.

### 4.3 Inputs
*   **Style**: Large, comfortable touch targets (50px+ height).
*   **Focus**: Thick Blue ring `ring-2 ring-blue-500/20`.
*   **Icon**: Deep Blue icon inside the input.

---

## 5. ANIMATION & EFFECTS (Framer Motion)

### 5.1 Scroll Reveal
Every section heading and card must **stagger fade-up**.
*   **Initial**: `opacity: 0, y: 20`
*   **WhileInView**: `opacity: 1, y: 0`
*   **Transition**: `duration: 0.6, ease: easeOut`

### 5.2 Parallax Hero
*   Background elements (blobs/shapes) move slower than foreground text.
*   Hero image has a subtle "floating" animation (`y: [0, -10, 0]`) infinitely.

### 5.3 Page Transition
*   New pages slide up from bottom slightly `y: 20 -> 0` + `opacity: 0 -> 1`.

---

## 6. LAYOUT PATTERNS (Dual Portal)

### 6.1 Customer Portal (Luxury Service)
*   **Nav**: Transparent glass on top, turns solid White on scroll.
*   **Hero**: Split screen. Left: Bold Value Prop. Right: High-res cutout image of a pro or a 3D element.
*   **Services**: "Bento Grid" style - not just a list. varied sizes.

### 6.2 Provider Portal (Business Command)
*   **Nav**: Sidebar (Left).
*   **Dashboard**: Data-dense but clean. Charts, maps, and lists.
*   **Color Theme**: darker blues, focused on "Earnings" (Green charts).

---

## 7. ANTI-TEMPLATE CHECKLIST
1.  [ ] No default Tailwind blue/gray. Use our defined `blue-700` and `slate-50`.
2.  [ ] No generic pure black (`#000`). Use `#0F172A`.
3.  [ ] Buttons are strictly **Orange**.
4.  [ ] Everything has a subtle entry animation.
5.  [ ] Fonts are loaded correctly (Outfit / Plus Jakarta).
