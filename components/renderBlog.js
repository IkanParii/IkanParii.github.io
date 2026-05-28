import { escapeHtml } from "../utils/helpers.js";

export function renderBlog(container, entries = []) {
  if (!container) return;

  container.innerHTML = entries
    .map(
      (entry) => `
        <article class="project-card section-fade">
          <div class="project-type">
            <span class="project-tag">${escapeHtml(entry.category || "Latest")}</span>
            <span class="project-num">BLOG</span>
          </div>
          <h3 class="project-title">${escapeHtml(entry.title)}</h3>
          <p class="project-desc">${escapeHtml(entry.summary)}</p>
          <a href="${escapeHtml(entry.link)}" target="_blank" rel="noreferrer" class="project-link">
            Read Post
          </a>
        </article>
      `,
    )
    .join("");
}
