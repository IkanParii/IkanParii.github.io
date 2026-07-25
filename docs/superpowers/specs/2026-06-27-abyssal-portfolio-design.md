# Abyssal Portfolio — Design Spec

**Date:** 2026-06-27
**Project:** ikanparii CyberSecurity Portfolio Refinement
**Theme:** Abyssal — scroll-driven depth narrative

---

## 1. Concept

Refine existing deep-sea portfolio into a scroll-driven depth journey. Each section represents a depth layer (surface → twilight → midnight → abyssal → hadal → floor). A fixed depth meter tracks descent in meters as user scrolls. Visual palette darkens progressively down the page. Bioluminescent cyan (#2EFFBC) as primary accent, warm orange (#FF8C5A) for CTAs.

No new files. All changes in-place in existing structure.

---

## 2. Color System

### Depth Layers

| Layer | Sections | Background | Accent |
|-------|----------|------------|--------|
| Surface (0m) | Hero | `#0D1B2A` | `#2EFFBC` |
| Twilight (200m) | About | `#0A1626` | `#2EFFBC` |
| Midnight (500m) | Skills | `#081221` | `#41E4C0` |
| Deep (1000m) | Certs | `#060E1C` | `#41E4C0` |
| Abyssal (2000m) | Projects | `#040A15` | `#5ADBB5` |
| Hadal (3000m) | Blog | `#020710` | `#5ADBB5` |
| Floor (4000m) | Contact / Footer | `#01040A` | `#2EFFBC` |

### Primary Swatch

- `#2EFFBC` — bioluminescence glow (accents, borders, hover)
- `#0A7E9C` — secondary teal (subtle elements)
- `#FF8C5A` — warm contrast (CTAs, highlights, sparingly)
- `#1A2A3A` — card surface (elevated elements)
- `#0D1B2A` — base surface (hero bg)

---

## 3. Typography

| Role | Face | Weights | Usage |
|------|------|---------|-------|
| Display | **Sora** | 600, 700, 800 | Hero headline, section titles, big numbers |
| Body | **Inter** | 300, 400, 500, 600 | Paragraphs, descriptions, navigation |
| Mono | **JetBrains Mono** | 300, 400, 500 | Terminal, tags, data, code elements |

### Type Scale

```
Hero headline:   Sora 800, 3.5rem → 2.2rem (mobile)
Section title:   Sora 700, 2.5rem → 1.75rem
Section tag:     JetBrains Mono 400, 0.75rem, uppercase, letter-spacing 0.15em
Body:            Inter 400, 1rem / 1.6 line-height
Small:           Inter 300, 0.875rem
Caption:         JetBrains Mono 400, 0.75rem
```

---

## 4. Layout

### Depth Meter

Fixed right sidebar (desktop-only, 768px+):

```
┌─────────┐
│   DEPTH  │
│ ┌─────┐ │
│ │  0  │ │  ← number updates on scroll
│ │ ██  │ │  ← gradient bar: cyan→teal→black
│ │ 200 │ │
│ │ ██  │ │
│ │ 500 │ │
│ │ ██  │ │
│ │ 1000│ │
│ │ ██  │ │
│ │ 2000│ │
│ │ ██  │ │
│ │ 3000│ │
│ │ ██  │ │
│ │ 4000│ │
│ └─────┘ │
│   METERS  │
└─────────┘
```

- Smooth counter animation on depth number
- Gradient bar scrolls proportional to page progress
- Mobile: hidden (section depth labels suffice)

### Section Depth Labels

Replace numbered tags (`01 - Profile`) with depth-based labels:

- `DEPTH: 200m · ABOUT`
- `DEPTH: 500m · EXPERTISE`
- `DEPTH: 1000m · CREDENTIALS`
- `DEPTH: 2000m · PROJECTS`
- `DEPTH: 3000m · WRITEUPS`
- `SURFACE CALL · CONTACT` (contact stays at surface)

### Grid & Spacing

Maintain existing responsive breakpoints (900px, 600px). No layout restructure — keep current section grids. Add consistent section padding using CSS custom properties.

---

## 5. Copy Refinements

### Hero
- Title: **ASLI** — "Exploring the Deep Sea of Cyber Security."
- Description (update `profile.summary`):
  > "Blue Team Analyst & CTF enthusiast — ngulik log, forensic, dan threat detection. Suka sama yang namanya DFIR, SIEM, dan tantangan security."

### Section Tags
Change `"01 - Profile"` → `"DEPTH: 200m · ABOUT"` pattern (see above).

### Terminal Widget
- Prompt: `"ikanparii@deep-sea:~$"`
- Keep structure, content from `profile.js`

### Contact / Footer
- Footer: Update "Depth: [current scroll depth]m" instead of static `1200m`
- Contact copy: keep existing tone

---

## 6. Motion

### Scroll Reveals
- Section headers: fade-up (opacity 0→1, translateY 20→0)
- Cards: stagger reveal (100ms between cards, max 3 delay tiers)
- Duration: 500ms ease-out

### Bioluminescent Cursor Trail (Hero only, desktop)
- Mouse movement spawns cyan glow ring near cursor
- Fade out over 1.5s, radius ~60px
- Respects `prefers-reduced-motion` — skip entirely
- Touch devices: no equivalent

### Skill Bars
- Fill from 0% → target %, duration proportional to value (80% = 0.8s)

### Depth Meter Counter
- Smooth easing from current value to target
- 300ms transition, ease-out

### Cert Gallery Pagination
- Slide transition on prev/next (translateX 300ms ease-out)

---

## 7. Component Changes

| File | Changes |
|------|---------|
| `index.html` | Add depth meter container (`#depth-meter`). Update section tag text. Add depth attributes to sections (`data-depth`, `data-depth-label`). |
| `style.css` | Add depth meter styles. Update palette variables. Depth-layer background classes. Refine card/button hover states. Cursor trail styles. |
| `app.js` | Init depth meter. Wire scroll listener. Update section tag rendering. Update particle config for glow. |
| `utils/particles.js` | Add mouse-tracking glow trail mode. Accept config for interaction radius. |
| `utils/animations.js` | Add `initDepthMeter()` — reads `data-depth` from sections, updates meter on scroll. Add `initCursorGlow()` — canvas overlay for glow trail. |
| `data/profile.js` | Update `summary` (hero desc) — shorter, sharper. No other changes. |

---

## 8. Responsive

### Desktop (900px+)
- Depth meter visible
- Full particle system
- Cursor glow active

### Tablet (600-899px)
- Depth meter hidden
- Particles reduced count
- All layouts as-is

### Mobile (<600px)
- Depth meter hidden
- Particles minimal
- Stack layouts single column
- Touch — no cursor glow

### Accessibility
- `prefers-reduced-motion`: skip all animations (reveals, cursor glow, depth counter, skill fills)
- `prefers-color-scheme`: dark only (site is dark-only)
- Keyboard nav: visible focus states on all interactive elements
- Depth values provided as text — not purely visual

---

## 9. Files Summary

**Modified (7 files):**

```
index.html
style.css
app.js
data/profile.js
utils/particles.js
utils/animations.js
```

**No files added. No files deleted.** `script.js` (shim) left untouched.
