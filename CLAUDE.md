# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal cybersecurity portfolio site — vanilla HTML/CSS/JS, no build tools. Data-driven MVC-lite pattern. Dark deep-sea theme.

## Commands

No build step — files run directly in browser. Serve locally:

```bash
# Python (any version)
python -m http.server 8000

# OR Node.js (requires npx)
npx serve .
```

Then open `http://localhost:8000`.

## Architecture

```
data/          → Content (edit these to customize)
  profile.js     - Identity, about text, terminal info
  projects.js    - Project cards (type: tool|writeup)
  certs.js       - Certifications (category: certification|bootcamp|competition)
  skills.js      - Radar chart + skill bars (name + percentage)
  blog.js        - Blog/writeup entries

components/    → Render functions (data → HTML)
  renderSkills.js
  renderCerts.js
  renderProjects.js
  renderBlog.js
  renderStats.js   (unused)

utils/         → Behavior
  animations.js    - Nav scroll, intersection observer reveals, skill bar fill
  chart.js         - Chart.js radar chart init
  filters.js       - Project filter buttons (show/hide by data-category)
  helpers.js       - escapeHtml, toTitleCase, formatStatNumber
  particles.js     - Canvas bubble + fish ambient background

app.js         → Bootstrap: hydrates content, inits animations/filters/chart/particles
index.html     → Static shell with mount points + nav + contact
style.css      → All styles (CSS custom properties, responsive, animations)
```

## Data Flow

1. `data/*.js` exports arrays/objects
2. `components/*.js` imports data, generates HTML via `.map().join("")`, sets `innerHTML`
3. `app.js` orchestrates: imports everything, calls render/hydrate/init functions
4. All render components use `escapeHtml()` from `helpers.js` for XSS safety

## Adding Content

1. Add data entry to relevant `data/*.js` file
2. If adding a new section type: create component in `components/`, mount in `index.html`, wire in `app.js`

## Certificates Gallery

Paginated + filterable by category. State managed in `app.js` (`certsState` object). `CERTS_PER_PAGE = 4`. Filter buttons have `data-cert-filter` attribute; cert entries match via `category` field.

## Notes

- **No package.json, no linter, no tests.** CI/CD is manual push + GitHub Pages.
- `plan.md` has detailed theme/structure documentation (developer reference).
- `script.js` is a redundant shim that re-imports `app.js` — kept for compatibility.
- `renderStats.js` and `initGaugeTicks()` are vestigial (no mount points in HTML).
- Particles respect `prefers-reduced-motion`. Responsive breakpoints: 900px, 600px.
- Language: Indonesian (`lang="id"`). Navigation sections: Hero → About → Expertise → Credentials → Projects → Blog → Contact.
