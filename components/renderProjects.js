import { escapeHtml } from "../utils/helpers.js";

export function renderProjects(container, projects = []) {
  if (!container) return;

  container.innerHTML = projects
    .map((project, index) => {
      const num = String(index + 1).padStart(2, "0");
      const tagClass = project.category === "offense" ? "project-tag offense" : "project-tag";
      const cardClass = `project-card section-fade project-card--${project.category || "default"}`;
      const tags = (project.tags || [])
        .map((tag) => `<span class="ptag">${escapeHtml(tag)}</span>`)
        .join("");

      return `
        <article class="${cardClass}" data-category="${escapeHtml(project.category)}">
          <div class="project-type">
            <span class="${tagClass}">${escapeHtml(project.type)}</span>
            <span class="project-num">${num}</span>
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
    })
    .join("");
}
