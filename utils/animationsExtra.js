/**
 * animationsExtra.js
 * Interactive animation layer — runs after DOM is ready.
 * Handles: magnetic tilt, ripple, scramble, sparkles, orbs, experience stagger
 */

/* ── 1. MAGNETIC 3D TILT on cards ─────────────────────────── */
export function initMagneticTilt() {
  const TILT_MAX = 10; // degrees

  function bindTilt(cards) {
    cards.forEach((card) => {
      // Avoid double-binding
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotX = -dy * TILT_MAX;
        const rotY = dx * TILT_MAX;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      });
    });
  }

  function bindAll() {
    const cards = document.querySelectorAll(".cred-card, .project-card, .exp-card");
    cards.forEach((card) => card.classList.add("is-visible"));
    bindTilt(cards);
  }

  bindAll();

  // Re-bind whenever the projects grid re-renders (pagination page change)
  document.addEventListener("projects:rendered", bindAll);
}

/* ── 2. RIPPLE EFFECT on buttons ──────────────────────────── */
export function initRippleButtons() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ── 3. TEXT SCRAMBLE on section tags ─────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*·:–";

function scrambleText(el, finalText, duration = 900) {
  let frame = 0;
  const totalFrames = Math.floor(duration / 40);
  el.classList.add("scramble-active");

  const interval = setInterval(() => {
    const progress = frame / totalFrames;
    const revealCount = Math.floor(progress * finalText.length);

    el.textContent = finalText
      .split("")
      .map((char, i) => {
        if (char === " " || char === "·") return char;
        if (i < revealCount) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");

    frame++;
    if (frame >= totalFrames) {
      clearInterval(interval);
      el.textContent = finalText;
      el.classList.remove("scramble-active");
    }
  }, 40);
}

export function initSectionTagScramble() {
  const tags = document.querySelectorAll(".section-tag");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const original = el.dataset.originalText || el.textContent;
          el.dataset.originalText = original;
          scrambleText(el, original, 1000);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );

  tags.forEach((tag) => observer.observe(tag));
}

/* ── 4. HERO SPARKLE PARTICLES ────────────────────────────── */
export function initHeroSparkles() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const COUNT = 12;
  for (let i = 0; i < COUNT; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "hero-sparkle";
    sparkle.style.setProperty("--dur", `${2.5 + Math.random() * 3}s`);
    sparkle.style.setProperty("--delay", `${Math.random() * 3}s`);
    sparkle.style.left = `${10 + Math.random() * 80}%`;
    sparkle.style.bottom = `${10 + Math.random() * 40}%`;
    // Random sizes
    const size = 2 + Math.random() * 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    // Some sparkles in a different color
    if (Math.random() > 0.6) {
      sparkle.style.background = "var(--glow-secondary)";
      sparkle.style.boxShadow = "0 0 6px var(--glow-secondary)";
    }
    hero.appendChild(sparkle);
  }
}

/* ── 5. AMBIENT FLOATING ORBS per section ─────────────────── */
export function initAmbientOrbs() {
  const sections = ["#about", "#skills", "#experience", "#certs"];

  sections.forEach((sel, idx) => {
    const section = document.querySelector(sel);
    if (!section) return;

    section.style.position = "relative";
    section.style.overflow = "hidden";

    // Orb A
    const orbA = document.createElement("div");
    orbA.className = "ambient-orb ambient-orb-a";
    orbA.style.animationDelay = `${idx * 2}s`;
    section.appendChild(orbA);

    // Orb B (every other section)
    if (idx % 2 === 0) {
      const orbB = document.createElement("div");
      orbB.className = "ambient-orb ambient-orb-b";
      orbB.style.animationDelay = `${idx * 1.5 + 3}s`;
      section.appendChild(orbB);
    }
  });
}

/* ── 6. EXPERIENCE CARDS STAGGERED ENTRANCE ───────────────── */
export function initExperienceStagger() {
  const grid = document.getElementById("experience-grid");
  if (!grid) return;

  const columns = grid.querySelectorAll(".exp-column");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          columns.forEach((col, i) => {
            setTimeout(() => col.classList.add("anim-in"), i * 120);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(grid);
}

/* ── 7. HERO FLOATING BADGE ───────────────────────────────── */
export function injectHeroBadge() {
  // Badge removed per design update — user doesn't want the capsule element
}

/* ── 8. CURSOR GLOW TRAIL ─────────────────────────────────── */
export function initCursorTrail() {
  const trail = document.getElementById("cursor-glow");
  if (!trail) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx;
  let cy = my;
  let raf;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    cx = lerp(cx, mx, 0.1);
    cy = lerp(cy, my, 0.1);
    trail.style.left = `${cx}px`;
    trail.style.top = `${cy}px`;
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
}

/* ── 9. COUNTER ANIMATION for stat numbers ────────────────── */
export function initCounters() {
  const stats = document.querySelectorAll(".stat-num");
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const rawText = el.textContent.trim();
        const num = parseInt(rawText.replace(/\D/g, ""), 10);
        const suffix = rawText.replace(/[\d]/g, "");
        if (isNaN(num)) return;

        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * num);
          el.textContent = `${current}${suffix}`;
          el.classList.add("counting");
          if (progress < 1) requestAnimationFrame(step);
          else {
            el.textContent = `${num}${suffix}`;
            el.classList.remove("counting");
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((s) => observer.observe(s));
}

/* ── 10. SCROLL PROGRESS BAR ─────────────────────────────── */
export function initScrollProgress() {
  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, var(--glow-primary), var(--glow-secondary));
    z-index: 9999;
    transition: width 0.05s linear;
    box-shadow: 0 0 8px var(--glow-primary);
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (scrolled / total) * 100);
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

/* ── 11. PROJECT STAGGER ─────────────────────────────────────
   Disabled: pagination re-renders cards on page change,
   so stagger conflicts. Cards use section-fade from IntersectionObserver instead.
*/
export function initProjectStagger() {}


/* ── INIT ALL ─────────────────────────────────────────────── */
export function initAllAnimations() {
  // Short delay so DOM is fully painted
  requestAnimationFrame(() => {
    injectHeroBadge();
    initHeroSparkles();
    initCursorTrail();
    initScrollProgress();
    initRippleButtons();
    initSectionTagScramble();
    initAmbientOrbs();
    initExperienceStagger();
    initCounters();
    initProjectStagger();
    // Tilt last — needs cards to be visible
    setTimeout(initMagneticTilt, 200);
  });
}
