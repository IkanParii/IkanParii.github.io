export function initNavigation(nav) {
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

export function initGaugeTicks(container) {
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 36; i += 1) {
    const tick = document.createElement("div");
    tick.className = "gauge-tick";
    tick.style.transform = `rotate(${i * 10}deg) translateX(-50%)`;
    tick.style.opacity = i % 3 === 0 ? "0.5" : "0.15";
    if (i % 3 === 0) {
      tick.style.height = "12px";
    }
    container.appendChild(tick);
  }
}

export function initRevealAnimations() {
  const targets = document.querySelectorAll(
    ".section-header, .about-grid, .stats-row, .skills-grid, .creds-grid, .filter-bar, .certs-pagination, .experience-grid, .exp-card, .contact-layout, .contact-panel, .stat-item, .cred-card, .project-card, footer .footer-inner",
  );

  // If user prefers reduced motion, reveal immediately without animation
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => {
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    });
    return;
  }

  targets.forEach((target) => {
    target.classList.add("section-fade");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  targets.forEach((target) => observer.observe(target));
}

export function initSkillAnimations(scope = document) {
  const skillItems = scope.querySelectorAll(".skill-item");
  const fills = scope.querySelectorAll(".skill-fill");

  if (!skillItems.length) return;

  // If user prefers reduced motion, show all immediately
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    skillItems.forEach((item, index) => {
      item.classList.add("is-visible");
      fills[index]?.classList.add("animated");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        skillItems.forEach((item, index) => {
          window.setTimeout(() => {
            item.classList.add("is-visible");
            fills[index]?.classList.add("animated");
          }, index * 90);
        });

        observer.disconnect();
      });
    },
    { threshold: 0.35 },
  );

  const anchor = document.getElementById("skills");
  if (anchor) {
    observer.observe(anchor);
  }
}

export function initDepthMeter() {
  const sections = document.querySelectorAll("[data-depth]");
  const depthValue = document.getElementById("depth-value");
  const depthBar = document.getElementById("depth-bar");
  const depthMeter = document.getElementById("depth-meter");
  const footerDepth = document.getElementById("footer-depth");

  if (!sections.length || !depthValue || !depthBar) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        depth = Math.round(parseInt(section.dataset.depth, 10) * (0.6 + ((center - top) / section.offsetHeight) * 0.4));
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

    if (reducedMotion) {
      currentDepth = targetDepth;
    } else {
      currentDepth += (targetDepth - currentDepth) * 0.12;
      if (Math.abs(currentDepth - targetDepth) < 0.5) {
        currentDepth = targetDepth;
      }
    }

    const display = Math.round(currentDepth);
    depthValue.textContent = display;
    if (footerDepth) footerDepth.textContent = display;

    const maxDepth = 4000;
    depthBar.style.height = `${Math.min(100, (currentDepth / maxDepth) * 100)}%`;

    if (!reducedMotion && Math.abs(currentDepth - targetDepth) > 0.5) {
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
    depthBar.style.height = `${Math.min(100, (currentDepth / 4000) * 100)}%`;
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
