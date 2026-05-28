import { escapeHtml } from "../utils/helpers.js";

function getStatusLabel(status) {
  return status === "done" ? "Completed" : "In Progress";
}

function getCardClass(cert) {
  const baseClass = cert.status === "done" ? "cred-card section-fade" : "cred-card in-progress section-fade";
  const badgeClass = String(cert.badge || "").toLowerCase().replace(/\s+/g, "-");
  return `${baseClass} cred-card--${badgeClass || "default"}`;
}

export function renderCerts(container, certs = []) {
  if (!container) return;

  if (!certs.length) {
    container.innerHTML = `<div class="cert-empty">No certificates match this filter yet.</div>`;
    return;
  }

  container.innerHTML = certs
    .map((cert) => {
      const category = String(cert.category || cert.badge || "general").toLowerCase().replace(/\s+/g, "-");
      return `
        <article class="${getCardClass(cert)}" data-category="${category}">
          <div class="cred-badge cred-badge--${escapeHtml(String(cert.badge || "").toLowerCase().replace(/\s+/g, "-"))}">
            ${escapeHtml(cert.badge)}
          </div>
          <div class="cred-issuer">${escapeHtml(cert.issuer)}</div>
          <div class="cred-name">${escapeHtml(cert.name)}</div>
          <div class="cred-related">${escapeHtml(cert.related || "")}</div>
          <div class="cred-status ${cert.status === "done" ? "done" : "wip"}">
            <span class="cred-status-dot"></span> ${getStatusLabel(cert.status)}
          </div>
        </article>
      `;
    })
    .join("");

  window.requestAnimationFrame(() => {
    container.querySelectorAll(".section-fade").forEach((node) => {
      node.classList.add("is-visible");
    });
  });
}
