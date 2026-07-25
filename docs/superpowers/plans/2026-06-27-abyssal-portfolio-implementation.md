# Abyssal Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine existing deep-sea portfolio with depth-narrative scroll journey, new palette, depth meter, cursor glow, and refined copy.

**Architecture:** All changes in-place across 7 existing files. No new files. Depth meter reads `data-depth` attributes from sections and updates a fixed sidebar element. Particles module extended with mouse-reactive glow mode. CSS palette expanded with depth-layer background classes.

**Tech Stack:** Vanilla JS (ES modules), CSS3, HTML5, Chart.js (unchanged).

## Global Constraints

- **No build step** — files run directly in browser
- **Hero title must remain unchanged** — "Exploring the Deep Sea of Cyber Security."
- **prefers-reduced-motion** must be respected everywhere
- **Depth meter hidden below 768px** — use `@media (max-width: 767px)`
- **Cursor glow is desktop only** — skip on touch devices
- **All existing content preserved** — only visual/structural refinements
- **Language stays Indonesian** (`lang="id"` in HTML)

---

### Task 1: CSS Foundation — Palette, Depth Backgrounds, Typeface

**Files:**
- Modify: `style.css` (variables, depth backgrounds, depth meter styles, glow)

- [ ] **Step 1: Update `:root` variables**

Replace existing `:root` block:

```css
:root {
  /* Depth palette */
  --surface: #0D1B2A;
  --twilight: #0A1626;
  --midnight: #081221;
  --deep: #060E1C;
  --abyssal: #040A15;
  --hadal: #020710;
  --floor: #01040A;

  /* Core colors */
  --bioluminescence: #2EFFBC;
  --bioluminescence-dim: rgba(46, 255, 188, 0.45);
  --teal-secondary: #0A7E9C;
  --warm-contrast: #FF8C5A;
  --card-surface: #1A2A3A;

  /* Text */
  --text-main: #f8fafc;
  --text-muted: #c0cad8;

  /* Glow */
  --glow-accent: var(--bioluminescence);
  --glow-primary: var(--bioluminescence);
  --glow-secondary: #41E4C0;

  /* Borders */
  --border: rgba(148, 163, 184, 0.24);
  --border-hover: rgba(46, 255, 188, 0.35);

  /* Typography */
  --font-display: "Sora", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

- [ ] **Step 2: Update body gradient to get progressively darker**

Replace the body `background` linear-gradient to use new depth-layer colors:

```css
body {
  background:
    radial-gradient(
      circle at 50% -5%,
      rgba(46, 255, 188, 0.18) 0%,
      rgba(46, 255, 188, 0.06) 14%,
      transparent 36%
    ),
    radial-gradient(
      circle at 50% 18%,
      rgba(6, 182, 212, 0.06) 0,
      transparent 28%
    ),
    linear-gradient(180deg,
      #0D1B2A 0%,
      #0A1626 14%,
      #081221 28%,
      #060E1C 48%,
      #040A15 72%,
      #020710 88%,
      #01040A 100%
    );
  /* rest unchanged */
}
```

Also update `body::before` background gradient colors to use new palette values (replace `#0a2033` etc. with `#0D1B2A` etc.).

- [ ] **Step 3: Update hero background layers**

In `#hero::before`, update `rgba(186, 230, 253, …)` to use bioluminescence `rgba(46, 255, 188, …)`.

- [ ] **Step 4: Update gradient-text class**

Change `.hero-title .gradient-text` background to use bioluminescence + teal:

```css
.hero-title .gradient-text {
  background: linear-gradient(to right, var(--bioluminescence), var(--glow-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 5: Depth meter CSS**

Add before the `@media` section:

```css
/* Depth Meter */
#depth-meter {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

#depth-meter.is-visible {
  opacity: 1;
}

.depth-meter-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.depth-meter-value {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--bioluminescence);
  line-height: 1;
  transition: none;
}

.depth-meter-bar-wrap {
  width: 2px;
  height: 200px;
  background: rgba(148, 163, 184, 0.15);
  position: relative;
  overflow: hidden;
}

.depth-meter-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0%;
  background: linear-gradient(to top, var(--bioluminescence), var(--teal-secondary), transparent);
  transition: height 0.2s ease-out;
}

.depth-meter-unit {
  font-family: var(--font-mono);
  font-size: 0.45rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  opacity: 0.6;
}

@media (max-width: 767px) {
  #depth-meter {
    display: none;
  }
}
```

- [ ] **Step 6: Update section-tag font**

Change `.section-tag` font-family to use `var(--font-mono)` (already is monospace — keep as is). No change needed.

- [ ] **Step 7: Add glow border on cred-card hover**

In `.cred-card:hover`, change `border-color` to `var(--border-hover)` and add subtle glow:

```css
.cred-card:hover {
  border-color: rgba(46, 255, 188, 0.35);
  transform: translateY(-4px);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 16px 40px rgba(0, 0, 0, 0.28),
    0 0 20px rgba(46, 255, 188, 0.06);
}
```

- [ ] **Step 8: Cursor glow styles**

Add before `@media`:

```css
#cursor-glow {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 255, 188, 0.12) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

#cursor-glow.is-visible {
  opacity: 1;
}
```

- [ ] **Step 9: Update font import in HTML to include Sora**

In `index.html`, update Google Fonts link to include Sora:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Sora:wght@600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
```

(Keep Plus Jakarta Sans in the URL — removing it won't hurt but keeping it avoids a diff that could affect anything referencing it. However, since we changed `--font-display` to Sora, Plus Jakarta Sans is unused but harmless.)

- [ ] **Step 10: Verify**

Open `index.html` in browser. Check:
- Body uses new depth gradient
- Text renders in Sora (hero title, section titles)
- Bioluminescence cyan appears on gradient text
- No JS errors in console

---

### Task 2: HTML Structure — Depth Labels, Attributes, Meter Container

**Files:**
- Modify: `index.html` (section tags, depth meter, data attributes, footer)

- [ ] **Step 1: Add depth meter container**

After `<nav>` closing tag, add:

```html
<div id="depth-meter" aria-hidden="true">
  <span class="depth-meter-label">Depth</span>
  <span class="depth-meter-value" id="depth-value">0</span>
  <div class="depth-meter-bar-wrap">
    <div class="depth-meter-bar" id="depth-bar"></div>
  </div>
  <span class="depth-meter-unit">meters</span>
</div>

<div id="cursor-glow" aria-hidden="true"></div>
```

- [ ] **Step 2: Update section tags**

Replace all `.section-tag` texts:

```diff
- <div class="section-tag">01 - Profile</div>
+ <div class="section-tag">DEPTH: 200m · ABOUT</div>

- <div class="section-tag">02 - Expertise</div>
+ <div class="section-tag">DEPTH: 500m · EXPERTISE</div>

- <div class="section-tag">03 - Credentials</div>
+ <div class="section-tag">DEPTH: 1000m · CREDENTIALS</div>

- <div class="section-tag">04 - Work</div>
+ <div class="section-tag">DEPTH: 2000m · PROJECTS</div>

- <div class="section-tag">05 - Blog</div>
+ <div class="section-tag">DEPTH: 3000m · WRITEUPS</div>

- <div class="section-tag">06 - Contact</div>
+ <div class="section-tag">SURFACE CALL · CONTACT</div>
```

- [ ] **Step 3: Add data-depth attributes to sections**

To each section element, add depth data:

```diff
- <section id="about">
+ <section id="about" data-depth="200" data-depth-label="ABOUT">

- <section id="skills">
+ <section id="skills" data-depth="500" data-depth-label="EXPERTISE">

- <section id="certs">
+ <section id="certs" data-depth="1000" data-depth-label="CREDENTIALS">

- <section id="projects">
+ <section id="projects" data-depth="2000" data-depth-label="PROJECTS">

- <section id="blog">
+ <section id="blog" data-depth="3000" data-depth-label="WRITEUPS">

- <section id="contact">
+ <section id="contact" data-depth="4000" data-depth-label="CONTACT">
```

- [ ] **Step 4: Update footer depth text**

In the footer `.footer-mark`, replace the static depth:

```diff
- <span class="footer-mark">Built by <span>ikanparii</span> - Depth: 1200m</span>
+ <span class="footer-mark">Built by <span>ikanparii</span> - <span id="footer-depth">0</span>m</span>
```

- [ ] **Step 5: Verify**

Open `index.html` in browser. Check:
- Section tags display depth labels (e.g., "DEPTH: 200m · ABOUT")
- All sections have `data-depth` attributes in DOM inspector
- Depth meter container exists in DOM
- Footer has `#footer-depth` span

---

### Task 3: Copy & Data Refinement

**Files:**
- Modify: `data/profile.js` (hero summary)
- No changes to: `app.js` (it reads `profile.summary` dynamically, no wiring needed)

- [ ] **Step 1: Update hero summary**

```diff
- summary:
-   "Cybersecurity enthusiast yang tertarik pada Blue Team Operations, Digital Forensics, dan eksplorasi threat analysis lewat CTF dan praktik langsung",
+ summary:
+   "Blue Team Analyst & CTF enthusiast — ngulik log, forensic, dan threat detection. Suka sama yang namanya DFIR, SIEM, dan tantangan security.",
```

- [ ] **Step 2: Verify**

Open browser. Hero description text updated. Terminal widget prompt still reads from `profile.username` — verify it shows `ikanparii@sec-lab`.

---

### Task 4: Depth Meter Logic — animations.js

**Files:**
- Modify: `utils/animations.js` (add `initDepthMeter`, leave existing functions intact)

- [ ] **Step 1: Add `initDepthMeter` function**

Append to `utils/animations.js`:

```javascript
export function initDepthMeter() {
  const sections = document.querySelectorAll("[data-depth]");
  const depthValue = document.getElementById("depth-value");
  const depthBar = document.getElementById("depth-bar");
  const depthMeter = document.getElementById("depth-meter");
  const footerDepth = document.getElementById("footer-depth");

  if (!sections.length || !depthValue || !depthBar) return;

  let currentDepth = 0;
  let targetDepth = 0;
  let rafId = 0;

  function getCurrentDepth() {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const scrollBottom = scrollY + viewportH;
    const docHeight = document.documentElement.scrollHeight;
    const progress = Math.min(1, scrollBottom / docHeight);

    // Find which section the viewport center is in
    const center = scrollY + viewportH * 0.4;
    let depth = 0;

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (center >= top && center <= bottom) {
        depth = parseInt(section.dataset.depth, 10) || 0;
        // Linear interpolation within section
        const sectionProgress = (center - top) / section.offsetHeight;
        const prevDepth = parseInt(sections[0]?.dataset.depth || "0", 10);
        // Simple: just use section depth
        depth = Math.round(parseInt(section.dataset.depth, 10) * (0.6 + sectionProgress * 0.4));
        break;
      }
    }

    // Fallback: use full-page progress * max depth
    if (depth === 0) {
      const maxDepth = parseInt(sections[sections.length - 1]?.dataset.depth || "4000", 10);
      depth = Math.round(progress * maxDepth);
    }

    return Math.min(depth, 9999);
  }

  function animateDepth() {
    targetDepth = getCurrentDepth();
    currentDepth += (targetDepth - currentDepth) * 0.12;

    if (Math.abs(currentDepth - targetDepth) < 0.5) {
      currentDepth = targetDepth;
    }

    const display = Math.round(currentDepth);
    depthValue.textContent = display;
    if (footerDepth) footerDepth.textContent = display;

    const maxDepth = 4000;
    const barPct = Math.min(100, (currentDepth / maxDepth) * 100);
    depthBar.style.height = `${barPct}%`;

    if (Math.abs(currentDepth - targetDepth) > 0.5) {
      rafId = window.requestAnimationFrame(animateDepth);
    }
  }

  function onScroll() {
    if (!rafId) {
      rafId = window.requestAnimationFrame(animateDepth);
    }
  }

  function onScrollEnd() {
    window.cancelAnimationFrame(rafId);
    rafId = 0;
    // Snap to final
    currentDepth = getCurrentDepth();
    const display = Math.round(currentDepth);
    depthValue.textContent = display;
    if (footerDepth) footerDepth.textContent = display;
    const maxDepth = 4000;
    depthBar.style.height = `${Math.min(100, (currentDepth / maxDepth) * 100)}%`;
  }

  // Show meter after short delay
  window.setTimeout(() => {
    depthMeter?.classList.add("is-visible");
  }, 800);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scrollend", onScrollEnd, { passive: true });

  // Initial render
  currentDepth = getCurrentDepth();
  depthValue.textContent = Math.round(currentDepth);
  if (footerDepth) footerDepth.textContent = Math.round(currentDepth);
  depthBar.style.height = `${Math.min(100, (currentDepth / 4000) * 100)}%`;
}
```

- [ ] **Step 2: Verify**

Open browser. Scroll page. Check:
- Depth meter number updates smoothly
- Depth bar fills from bottom
- Footer depth updates in sync
- Meter fades in after page load
- On mobile (<768px), meter is hidden

---

### Task 5: Bioluminescent Cursor Glow — particles.js

**Files:**
- Modify: `utils/particles.js` (add mouse-tracking glow overlay)

- [ ] **Step 1: Add mouse tracking + glow ring to `initParticles`**

At the end of `initParticles`, before the cleanup `return` statement, add mouse tracking:

```javascript
  // Bioluminescent cursor glow (desktop only)
  const cursorGlow = document.getElementById("cursor-glow");
  let cursorX = -999;
  let cursorY = -999;
  let isTouchDevice = false;

  function onPointerMove(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (cursorGlow) {
      cursorGlow.style.left = `${cursorX}px`;
      cursorGlow.style.top = `${cursorY}px`;
      if (!cursorGlow.classList.contains("is-visible")) {
        cursorGlow.classList.add("is-visible");
      }
    }
  }

  function onPointerLeave() {
    if (cursorGlow) cursorGlow.classList.remove("is-visible");
  }

  function onTouchStart() {
    isTouchDevice = true;
    if (cursorGlow) cursorGlow.classList.remove("is-visible");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
  }

  // Only add pointer tracking if not reduced motion and cursor-glow element exists
  if (!reducedMotion && cursorGlow) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
  }

  // Update cleanup to remove new listeners
  const origCleanup = cleanupRef;
```

Wait — need to handle the cleanup function properly. Let me restructure using a ref pattern.

Better approach: modify the return function at the bottom:

Since `initParticles` currently returns a cleanup function at line 247, I need to store the new listeners so they get cleaned up too. Let me rewrite the pattern:

```javascript
  const cleanupFns = [];

  // ... existing code stays unchanged ...

  // Bioluminescent cursor glow (desktop only)
  const cursorEl = document.getElementById("cursor-glow");
  if (!reducedMotion && cursorEl) {
    const onMove = (e) => {
      cursorEl.style.left = `${e.clientX}px`;
      cursorEl.style.top = `${e.clientY}px`;
      if (!cursorEl.classList.contains("is-visible")) {
        cursorEl.classList.add("is-visible");
      }
    };
    const onLeave = () => cursorEl.classList.remove("is-visible");
    const onTouch = () => cursorEl.classList.remove("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });

    cleanupFns.push(
      () => window.removeEventListener("pointermove", onMove),
      () => window.removeEventListener("pointerleave", onLeave),
      () => window.removeEventListener("touchstart", onTouch),
    );
  }

  return () => {
    window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", handleResize);
    cleanupFns.forEach((fn) => fn());
  };
```

This preserves the existing return pattern while adding cleanup for the new listeners.

- [ ] **Step 2: Verify**

Open browser on desktop. Move mouse. Check:
- Cyan glow ring follows cursor on hero section
- Glow fades on pointerleave
- On mobile/touch, glow never appears
- With `prefers-reduced-motion`, glow doesn't appear
- Cleanup works (no console errors)

---

### Task 6: App Bootstrap Wiring — app.js

**Files:**
- Modify: `app.js` (import + init depth meter, update comments)

- [ ] **Step 1: Add depth meter import**

Add alongside other animation imports:

```diff
import {
  initGaugeTicks,
  initNavigation,
  initRevealAnimations,
  initSkillAnimations,
+ initDepthMeter,
} from "./utils/animations.js";
```

- [ ] **Step 2: Add `initDepthMeter()` call to `initApp()`**

Add after `initRevealAnimations()`:

```diff
function initApp() {
  hydrateProfileContent();
  hydrateCollections();

  initParticles(document.getElementById("particles"));
  initNavigation(document.getElementById("nav"));
- initGaugeTicks(document.getElementById("ticks-container"));
+ // initGaugeTicks(document.getElementById("ticks-container")); — vestigial, replaced by depth meter
  initRevealAnimations();
+ initDepthMeter();
  initSkillAnimations();
  setupProjectFilters({
    buttons: document.querySelectorAll(".filter-btn"),
    cards: document.querySelectorAll(".project-card"),
  });
  initSkillsChart(document.getElementById("skillsChart"), skills);
}
```

Note: Keep `initGaugeTicks` commented out rather than removing it — the function is still exported from animations.js.

- [ ] **Step 3: Verify**

Open browser. Console should show no errors. All features:
- Particles render with bubbles + fish
- Depth meter updates on scroll
- Cursor glow (desktop) tracks pointer
- Section-tag animations fire on scroll
- Skill bars animate on scroll
- Certs gallery paginates and filters
- Projects filter works
- Chart renders
- Footer depth updates

---

### Self-Review Checklist

Run through after writing:

1. **Spec coverage:** Does every spec requirement have a corresponding task?
   - Color palette: ✓ Task 1
   - Depth labels replacing numbered tags: ✓ Task 2
   - Depth meter: ✓ Task 4 + Task 1 (CSS) + Task 6 (wiring)
   - Cursor glow: ✓ Task 5 + Task 1 (CSS) + Task 6
   - Copy (summary): ✓ Task 3
   - Typography (Sora): ✓ Task 1
   - Hero title preserved: ✓ Task 2 (no change to hero title in HTML)
   - Footer depth dynamic: ✓ Task 4

2. **Placeholder scan:** Any "TBD", "TODO", missing code? All steps have actual code blocks.

3. **Type consistency:** All function names match between definition (Task 4, `initDepthMeter`) and import/usage (Task 6). All CSS classes match between HTML (Task 2) and CSS (Task 1) and JS (Task 4).

4. **Scope check:** All changes are in-place refinements. No new pages, no new sections, no structural reorganization.
