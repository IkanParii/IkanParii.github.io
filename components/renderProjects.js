import { escapeHtml } from "../utils/helpers.js";

const PAGE_SIZE = 4;

export function renderProjects(container, projects = []) {
  if (!container) return;

  let currentPage = 0;
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);

  function getPageItems() {
    const start = currentPage * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }

  function buildCard(project) {
    const tagClass =
      project.category === "offense" ? "project-tag offense" : "project-tag";
    const cardClass = `project-card section-fade project-card--${project.category || "default"}`;
    const tags = (project.tags || [])
      .map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`)
      .join("");

    return `
      <article class="${cardClass}" data-category="${escapeHtml(project.category)}">
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

  function buildPagination() {
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
    const cards = getPageItems().map(buildCard).join("");
    container.innerHTML = `
      <div class="projects-grid-inner" id="projects-grid-inner">
        ${cards}
      </div>
      ${buildPagination()}
    `;

    // Bind pagination events
    const prev = container.querySelector("#proj-prev");
    const next = container.querySelector("#proj-next");
    if (prev) {
      prev.addEventListener("click", () => {
        if (currentPage > 0) { currentPage--; render(); }
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        if (currentPage < totalPages - 1) { currentPage++; render(); }
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

  render();
}
