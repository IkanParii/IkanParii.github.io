import { escapeHtml } from "../utils/helpers.js";

const PAGE_SIZE = 4;

export function renderBlog(container, entries = []) {
  if (!container) return;

  let currentPage = 0;
  const totalPages = Math.ceil(entries.length / PAGE_SIZE);

  function getPageItems() {
    const start = currentPage * PAGE_SIZE;
    return entries.slice(start, start + PAGE_SIZE);
  }

  function buildCard(entry) {
    return `
      <article class="project-card section-fade project-card--writeup">
        <div class="project-type">
          <span class="project-tag">${escapeHtml(entry.category || "Writeup")}</span>
        </div>
        <h3 class="project-title">${escapeHtml(entry.title)}</h3>
        <p class="project-desc">${escapeHtml(entry.summary)}</p>
        <a href="${escapeHtml(entry.link)}" target="_blank" rel="noreferrer" class="project-link">
          Read Post
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
        <button class="cert-page-btn" id="blog-prev" type="button"${prevDisabled}>Prev</button>
        <span class="cert-page-info">Slide ${currentPage + 1} / ${totalPages}</span>
        <button class="cert-page-btn" id="blog-next" type="button"${nextDisabled}>Next</button>
      </div>
    `;
  }

  function render() {
    const cards = getPageItems().map(buildCard).join("");
    container.innerHTML = `
      <div class="projects-grid-inner" id="blog-grid-inner">
        ${cards}
      </div>
      ${buildPagination()}
    `;

    const prev = container.querySelector("#blog-prev");
    const next = container.querySelector("#blog-next");
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

    document.dispatchEvent(new CustomEvent("projects:rendered"));
  }

  render();
}
