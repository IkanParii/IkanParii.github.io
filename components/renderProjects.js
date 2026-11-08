import { escapeHtml } from "../utils/helpers.js";

const PAGE_SIZE = 6;

export function renderProjects(container, projects = []) {
  if (!container) return;

  let currentFilter = "all";
  let currentPage = 0;
  const filterButtons = document.querySelectorAll("[data-filter]");

  function normalize(str) {
    return String(str || "").toLowerCase().trim().replace(/[\s-_]/g, "").replace(/s$/, "");
  }

  function getFilteredProjects() {
    if (!currentFilter || currentFilter === "all") return projects;
    const target = normalize(currentFilter);
    return projects.filter((project) => normalize(project.category) === target);
  }

  function syncFilterButtons() {
    const target = normalize(currentFilter);
    filterButtons.forEach((btn) => {
      const btnFilter = normalize(btn.dataset.filter || "all");
      const isActive = currentFilter === "all" ? btnFilter === "all" : btnFilter === target;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function buildCard(project) {
    const tagClass =
      project.category === "offense" ? "project-tag offense" : "project-tag";
    const cardClass = `project-card section-fade project-card--${project.category || "default"}`;
    const tags = (project.tags || [])
      .map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`)
      .join("");

    return `
      <article class="${cardClass}" data-category="${escapeHtml(project.category || "default")}">
        <div class="project-type">
          <span class="${tagClass}">${escapeHtml(project.type)}</span>
        </div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.desc)}</p>
        <div class="project-tags">${tags}</div>
        <a
          href="${escapeHtml(project.link)}"
          target="_blank"
          rel="noreferrer"
          class="project-link"
        >
          ${escapeHtml(project.cta || "Open")}
        </a>
      </article>
    `;
  }

  function buildPagination(filteredCount, totalPages) {
    if (totalPages <= 1) return "";
    const prevDisabled = currentPage === 0 ? " disabled" : "";
    const nextDisabled = currentPage === totalPages - 1 ? " disabled" : "";

    return `
      <div class="certs-pagination">
        <button class="cert-page-btn" id="proj-prev" type="button"${prevDisabled}>Prev</button>
        <span class="cert-page-info">Slide ${currentPage + 1} / ${totalPages}</span>
        <button class="cert-page-btn" id="proj-next" type="button"${nextDisabled}>Next</button>
      </div>
    `;
  }

  function render() {
    const filtered = getFilteredProjects();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(currentPage, 0), totalPages - 1);

    const start = currentPage * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="projects-grid-inner" id="projects-grid-inner">
          <div class="cert-empty">Belum ada project di kategori ini.</div>
        </div>
      `;
    } else {
      const cards = pageItems.map(buildCard).join("");
      container.innerHTML = `
        <div class="projects-grid-inner" id="projects-grid-inner">
          ${cards}
        </div>
        ${buildPagination(filtered.length, totalPages)}
      `;
    }

    // Bind pagination events
    const prev = container.querySelector("#proj-prev");
    const next = container.querySelector("#proj-next");
    if (prev) {
      prev.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          render();
        }
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
          currentPage++;
          render();
        }
      });
    }

    window.requestAnimationFrame(() => {
      container.querySelectorAll(".section-fade").forEach((node) => {
        node.classList.add("is-visible");
      });
    });

    // Let animationsExtra re-bind tilt/shimmer on newly rendered cards
    document.dispatchEvent(new CustomEvent("projects:rendered"));
  }

  // Bind filter button clicks
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentFilter = btn.dataset.filter || "all";
      currentPage = 0;
      syncFilterButtons();
      render();
    });
  });

  syncFilterButtons();
  render();
}
