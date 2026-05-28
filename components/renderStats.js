import { escapeHtml } from "../utils/helpers.js";

export function renderStats(container, stats = []) {
  if (!container) return;

  container.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-item section-fade">
          <div class="stat-num">${escapeHtml(stat.value)}</div>
          <div class="stat-label">${escapeHtml(stat.label)}</div>
        </div>
      `,
    )
    .join("");
}
