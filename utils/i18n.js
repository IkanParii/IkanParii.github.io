import {
  translations,
  profileNarratives,
  projectsEn,
  experienceEn,
  organizationsEn,
} from "../data/i18n.js";
import { profile } from "../data/profile.js";
import { projects as projectsId } from "../data/projects.js";
import {
  experience as expId,
  organizations as orgId,
} from "../data/experience.js";

let currentLang = "en";
let langChangeListeners = [];

export function getLang() {
  return currentLang;
}

export function onLanguageChange(fn) {
  if (typeof fn === "function") {
    langChangeListeners.push(fn);
  }
}

export function getTranslatedProjects(lang = currentLang) {
  return lang === "en" ? projectsEn : projectsId;
}

export function getTranslatedExperience(lang = currentLang) {
  return lang === "en" ? experienceEn : expId;
}

export function getTranslatedOrganizations(lang = currentLang) {
  return lang === "en" ? organizationsEn : orgId;
}

export function getTranslatedProfile(lang = currentLang) {
  const narrative = profileNarratives[lang] || profileNarratives.id;
  return {
    ...profile,
    summary: narrative.summary,
    about: narrative.about,
    aboutSecond: narrative.aboutSecond,
  };
}

export function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "id";
  try {
    localStorage.setItem("portfolio_lang", currentLang);
  } catch (e) {
    /* ignore storage errors */
  }

  document.documentElement.lang = currentLang;

  // 1. Update all static data-i18n elements
  const dict = translations[currentLang] || translations.id;
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // 2. Update placeholders with data-i18n-placeholder
  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // 3. Update lang toggle button active indicators
  const langOptions = document.querySelectorAll(".lang-opt");
  langOptions.forEach((opt) => {
    const optLang = opt.dataset.lang;
    const isActive = optLang === currentLang;
    opt.classList.toggle("active", isActive);
  });

  // 4. Update About Bio and Hero Desc directly
  const heroDesc = document.querySelector(".hero-desc");
  if (heroDesc) {
    heroDesc.textContent = dict.hero_desc;
  }

  const aboutBio = document.querySelector(".about-bio");
  if (aboutBio) {
    const narrative = profileNarratives[currentLang];
    aboutBio.innerHTML = `
      <p>${narrative.about}</p>
      <p>${narrative.aboutSecond}</p>
    `;
  }

  // 5. Notify all listeners (re-renders projects, experience, certs, etc.)
  langChangeListeners.forEach((fn) => {
    try {
      fn(currentLang);
    } catch (err) {
      console.warn("Language change listener error:", err);
    }
  });
}

export function initI18n(onLangChange) {
  if (onLangChange) {
    onLanguageChange(onLangChange);
  }

  // Determine initial language: localStorage -> default "en"
  let initial = "en";
  try {
    const stored = localStorage.getItem("portfolio_lang");
    if (stored === "en" || stored === "id") {
      initial = stored;
    }
  } catch (e) {
    initial = "en";
  }

  // Bind toggle click
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = currentLang === "id" ? "en" : "id";
      setLanguage(next);
    });
  }

  // Also support clicking individual options (ID / EN)
  const langOptions = document.querySelectorAll(".lang-opt");
  langOptions.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetLang = opt.dataset.lang;
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Initial apply
  setLanguage(initial);
}
