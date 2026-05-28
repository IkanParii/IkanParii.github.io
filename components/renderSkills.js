import { escapeHtml } from "../utils/helpers.js";

export function renderSkills(container, skills = []) {
  if (!container) return;

  container.innerHTML = skills
    .map(
      (skill) => `
        <div class="skill-item section-fade" data-level="${Number(skill.level) || 0}">
          <div class="skill-meta">
            <span class="skill-name">${escapeHtml(skill.name)}</span>
            <span class="skill-pct">${Number(skill.level) || 0}%</span>
          </div>
          <div class="skill-bar">
            <div
              class="skill-fill"
              style="--skill-width: ${Number(skill.level) || 0}%"
            ></div>
          </div>
        </div>
      `,
    )
    .join("");
}
