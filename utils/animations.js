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
    ".section-header, .about-grid, .stats-row, .skills-grid, .creds-grid, .filter-bar, .certs-pagination, .contact-layout, .contact-panel, .stat-item, .cred-card, .project-card, footer .footer-inner",
  );

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
