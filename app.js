import { profile } from "./data/profile.js";
import { skills } from "./data/skills.js";
import { certs } from "./data/certs.js";
import { projects } from "./data/projects.js";
import { blogEntries } from "./data/blog.js";
import { renderSkills } from "./components/renderSkills.js";
import { renderCerts } from "./components/renderCerts.js";
import { renderProjects } from "./components/renderProjects.js";
import { renderBlog } from "./components/renderBlog.js";
import { initSkillsChart } from "./utils/chart.js";
import { setupProjectFilters } from "./utils/filters.js";
import { initParticles } from "./utils/particles.js";
import {
  initGaugeTicks,
  initNavigation,
  initRevealAnimations,
  initSkillAnimations,
} from "./utils/animations.js";

const CERTS_PER_PAGE = 4;
const certsState = {
  filter: "all",
  page: 1,
};

function hydrateProfileContent() {
  const aboutBio = document.querySelector(".about-bio");
  const heroDesc = document.querySelector(".hero-desc");
  const terminalOutputs = document.querySelectorAll(".t-output");
  const terminalPrompt = document.querySelectorAll(".t-prompt");
  const terminalTitle = document.querySelector(".terminal-title");

  if (heroDesc) {
    heroDesc.textContent = profile.summary;
  }

  if (aboutBio) {
    // Keep the About copy data-driven so you only edit the profile file for future updates.
    aboutBio.innerHTML = `
      <p>${profile.about}</p>
      <p>${profile.aboutSecond}</p>
    `;
  }

  if (terminalTitle) {
    terminalTitle.textContent = `DIAGNOSTICS_CON - ${profile.username}`;
  }

  if (terminalPrompt.length) {
    terminalPrompt.forEach((node) => {
      node.textContent = `${profile.username}@sec-lab`;
    });
  }

  if (terminalOutputs.length >= 5) {
    terminalOutputs[0].textContent = `${profile.headline.split("|")[0].trim()} / ${profile.nick}`;
    terminalOutputs[1].innerHTML = `<span class="t-key">LOCATION</span> &nbsp;&nbsp;${profile.location}`;
    terminalOutputs[2].innerHTML = `<span class="t-key">INSTITUTION</span> &nbsp;&nbsp;${profile.institution}`;
    terminalOutputs[3].innerHTML = `<span class="t-key">TOOLS</span> &nbsp;&nbsp;&nbsp;&nbsp;${profile.tools.join(", ")}`;
    terminalOutputs[4].innerHTML = `<span class="t-key">FOCUS</span> &nbsp;&nbsp;&nbsp;&nbsp;${profile.focus.join(", ")}`;
  }

}

function hydrateCollections() {
  // Render the main content sections from data modules to keep the page easy to maintain.
  renderSkills(document.getElementById("skills-list"), skills);
  renderProjects(document.getElementById("projects-grid"), projects);
  renderBlog(document.getElementById("blog-grid"), blogEntries);
  initCertsGallery(document.getElementById("certs-grid"), certs);
}

function getCertFilter(cert) {
  return String(cert.category || cert.badge || "general").toLowerCase();
}

function getFilteredCerts(source = []) {
  if (certsState.filter === "all") return source;
  return source.filter((cert) => getCertFilter(cert) === certsState.filter);
}

function initCertsGallery(container, sourceCerts = []) {
  if (!container) return;

  const filterButtons = document.querySelectorAll("[data-cert-filter]");
  const prevButton = document.getElementById("certs-prev");
  const nextButton = document.getElementById("certs-next");
  const pageInfo = document.getElementById("certs-page-info");

  function syncButtons() {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.certFilter === certsState.filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderPage() {
    const filtered = getFilteredCerts(sourceCerts);
    const totalPages = Math.max(1, Math.ceil(filtered.length / CERTS_PER_PAGE));
    certsState.page = Math.min(Math.max(certsState.page, 1), totalPages);

    const start = (certsState.page - 1) * CERTS_PER_PAGE;
    const pageItems = filtered.slice(start, start + CERTS_PER_PAGE);

    renderCerts(container, pageItems);

    if (pageInfo) {
      pageInfo.textContent = `Slide ${certsState.page} / ${totalPages}`;
    }

    if (prevButton) {
      prevButton.disabled = certsState.page <= 1;
    }

    if (nextButton) {
      nextButton.disabled = certsState.page >= totalPages;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      certsState.filter = button.dataset.certFilter || "all";
      certsState.page = 1;
      syncButtons();
      renderPage();
    });
  });

  prevButton?.addEventListener("click", () => {
    certsState.page -= 1;
    renderPage();
  });

  nextButton?.addEventListener("click", () => {
    certsState.page += 1;
    renderPage();
  });

  syncButtons();
  renderPage();
}

function initApp() {
  hydrateProfileContent();
  hydrateCollections();

  initParticles(document.getElementById("particles"));
  initNavigation(document.getElementById("nav"));
  initGaugeTicks(document.getElementById("ticks-container"));
  initRevealAnimations();
  initSkillAnimations();
  setupProjectFilters({
    buttons: document.querySelectorAll(".filter-btn"),
    cards: document.querySelectorAll(".project-card"),
  });
  initSkillsChart(document.getElementById("skillsChart"), skills);
}

initApp();
