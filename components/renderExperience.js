import { escapeHtml } from "../utils/helpers.js";

let activeExpFilter = "all";

export function renderExperience(container, experience = [], organizations = []) {
  if (!container) return;

  const allItems = [...experience, ...organizations];
  const filterButtons = document.querySelectorAll("[data-exp-filter]");

  function buildCard(item) {
    const category = escapeHtml(item.category || "profesional");
    const typeLabel = escapeHtml(item.typeLabel || "Profesional");
    const role = escapeHtml(item.role);
    const company = escapeHtml(item.company || item.org);
    const period = escapeHtml(item.period);
    const bullets = (item.bullets || [])
      .map((b) => `<li>${escapeHtml(b)}</li>`)
      .join("");
    const tags = (item.tags || [])
      .map((t) => `<span class="exp-tag">${escapeHtml(t)}</span>`)
      .join("");

    return `
      <article class="exp-card section-fade" data-category="${category}">
        <div class="exp-card-header">
          <div class="project-type">
            <span class="project-tag">${typeLabel}</span>
          </div>
          <div class="exp-period">${period}</div>
        </div>
        <div class="exp-card-body">
          <h3 class="exp-role">${role}</h3>
          <p class="exp-company">${company}</p>
          <ul class="exp-bullets">
            ${bullets}
          </ul>
        </div>
        <div class="exp-tags">
          ${tags}
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = activeExpFilter === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeExpFilter);

    container.innerHTML = filtered.map(buildCard).join("");

    // Sync filter buttons
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.expFilter === activeExpFilter;
      btn.classList.toggle("active", isActive);
    });

    window.requestAnimationFrame(() => {
      container.querySelectorAll(".section-fade").forEach((node) => {
        node.classList.add("is-visible");
      });
    });

    document.dispatchEvent(new CustomEvent("projects:rendered"));
  }

  // Bind filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeExpFilter = btn.dataset.expFilter || "all";
      render();
    });
  });

  render();
}
