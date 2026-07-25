import { escapeHtml } from "../utils/helpers.js";

export function renderContact(container, profile = {}) {
  if (!container) return;

  const email = escapeHtml(profile.email || "frasyiqpramana@gmail.com");
  const github = escapeHtml(profile.github || "https://github.com/IkanParii");
  const linkedin = escapeHtml(profile.linkedin || "https://www.linkedin.com/in/fachri-rasyiq-pramana");
  const website = escapeHtml(profile.website || "https://ikanparii.github.io");

  container.innerHTML = `
    <div>
      <p class="contact-info-desc">
        Terbuka untuk diskusi mengenai penetration testing, analisis insiden keamanan, kolaborasi proyek, maupun peluang kerja sama profesional. Anda dapat menghubungi saya melalui saluran berikut:
      </p>
      <div class="contact-links">
        <a href="${github}" target="_blank" rel="noreferrer" class="contact-link-item">
          <span class="link-platform">GitHub</span>
          <span class="link-label">github.com/IkanParii</span>
          <span class="link-arrow">-&gt;</span>
        </a>
        <a href="${linkedin}" target="_blank" rel="noreferrer" class="contact-link-item">
          <span class="link-platform">LinkedIn</span>
          <span class="link-label">linkedin.com/in/fachri-rasyiq-pramana</span>
          <span class="link-arrow">-&gt;</span>
        </a>
        <a href="${website}/just-blog/" target="_blank" rel="noreferrer" class="contact-link-item">
          <span class="link-platform">Blog</span>
          <span class="link-label">ikanparii.github.io/just-blog</span>
          <span class="link-arrow">-&gt;</span>
        </a>
        <a href="mailto:${email}" class="contact-link-item">
          <span class="link-platform">Email</span>
          <span class="link-label">${email}</span>
          <span class="link-arrow">-&gt;</span>
        </a>
      </div>
    </div>
    <div class="contact-panel section-fade">
      <div class="contact-panel-title">Fastest Route</div>
      <p class="contact-panel-desc">
        Terbuka untuk peluang kolaborasi, konsultasi keamanan, atau sekadar diskusi teknis. Kirim sinyal — saya akan merespons.
      </p>
      <div class="contact-panel-note">
        <span class="contact-panel-label">Preferred</span>
        <span class="contact-panel-value">LinkedIn or GitHub</span>
      </div>
      <div class="contact-panel-note">
        <span class="contact-panel-label">Email</span>
        <span class="contact-panel-value">${email}</span>
      </div>
      <div class="contact-panel-note">
        <span class="contact-panel-label">Best for</span>
        <span class="contact-panel-value">Collab, security consult, CTF talk</span>
      </div>
    </div>
  `;

  window.requestAnimationFrame(() => {
    container.querySelectorAll(".section-fade").forEach((node) => {
      node.classList.add("is-visible");
    });
  });
}
