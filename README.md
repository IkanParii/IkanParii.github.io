# Cybersecurity Portfolio Website — Fachri Rasyiq Pramana

A high-performance, modular, and cinematic personal portfolio website for **Fachri Rasyiq Pramana** (Cybersecurity Enthusiast | Web Penetration Tester | CTF Player | SOC Analyst L1).

Built with semantic HTML5, Vanilla CSS3 (Cyberpunk Deep-Sea Dark Theme), and modular ES6 JavaScript.

---

## 🌊 Key Features & Design System

- **Deep Sea Cyberpunk Aesthetic**: Sleek dark gradient background, frosted glassmorphism cards (`backdrop-filter`), glowing cyan accents (`#00D4FF`), particle canvas effects, and an interactive depth gauge meter.
- **Interactive Animations**:
  - **Magnetic 3D Tilt**: Physics-based tilt effect on cards (`.cred-card`, `.project-card`, `.exp-card`).
  - **Hover Glow Lines**: Animated cyan line indicators on card headers.
  - **Animated Gradient Hero Text**: Seamless color shift and entrance animations for hero titles.
  - **Cursor Glow**: Smooth ambient cursor glow tracking mouse movements.
- **Standardized Card & Pagination System**:
  - All cards across **Credentials**, **Projects**, **Writeups/Blog**, and **Experience** share the exact same aesthetic (sharp corners, 1px border, inset glow shadow).
  - **Paginated Cards**: Rendered with **4 items per slide** using matching `PREV` / `Slide X / Y` / `NEXT` navigation controls.
  - **Tab Filtering**: Interactive filters on Credentials, Projects, and Experience (`All`, `Profesional`, `Organisasi`, `Internship`).
- **Humanized Prose (/humanizer Standard)**:
  - Concise, articulate, professional narrative written in natural Indonesian/English.
  - Zero AI-generated clichés or buzzwords.
  - Strict privacy enforcement: **No phone numbers** displayed anywhere.

---

## 📁 Repository Structure

```text
├── index.html                   # Main HTML structure & section mounts
├── style.css                    # Complete CSS design system & keyframe animations
├── app.js                       # Entry point: hydration, component mounts, and event listeners
├── .gitignore                   # Version control exclusions
├── README.md                    # Project documentation
│
├── data/                        # Decoupled Data Modules
│   ├── profile.js               # Core identity, hero summary, and about copy
│   ├── skills.js                # Technical skill levels & chart categories
│   ├── certs.js                 # Certifications, bootcamps, and CTF awards
│   ├── projects.js              # Security tools, web apps, and dork generators
│   ├── blog.js                  # Live writeup entries scraped from just-blog
│   ├── experience.js            # Professional and organizational experience data
│   └── contact.js               # Official contact links (GitHub, LinkedIn, Blog, Email)
│
├── components/                  # Modular Component Renderers
│   ├── renderSkills.js          # Renders skill category bars
│   ├── renderCerts.js           # Renders certification cards with pagination
│   ├── renderProjects.js        # Renders project cards with pagination
│   ├── renderBlog.js            # Renders writeup/blog cards with pagination
│   ├── renderExperience.js      # Renders experience cards with filter tabs
│   └── renderContact.js         # Renders contact links & fastest route panel
│
└── utils/                       # Animation & Chart Utilities
    ├── animations.js            # Scroll reveals, depth meter, navigation
    ├── animationsExtra.js       # Magnetic 3D tilt, ripple buttons, shimmer, cursor glow
    ├── chart.js                 # Radar chart initialization via Chart.js
    ├── particles.js             # HTML5 Canvas background particle system
    ├── filters.js               # Utility filtering helpers
    └── helpers.js               # String escape & DOM helpers
```

---

## 🛠️ How to Customize Data

All website content is 100% data-driven. To update your information, simply edit the files inside the `data/` directory:

1. **Personal Bio**: Update `data/profile.js` for headline, summary, and About copy.
2. **Skills & Radar Chart**: Update `data/skills.js` to add/edit skills or radar categories.
3. **Certifications & CTFs**: Update `data/certs.js` to add new certificates or competition wins.
4. **Projects & Tools**: Update `data/projects.js` to add new repositories or web tools.
5. **Writeups & Blog**: Update `data/blog.js` to add new article writeups.
6. **Experience & Organizations**: Update `data/experience.js` to edit work or organizational roles.
7. **Contact Links**: Update `data/contact.js` for email, LinkedIn, GitHub, or blog URLs.

---

## 🚀 Local Development & Deployment

### Running Locally
No build step or bundler is required. Simply serve the workspace with any static HTTP server or VS Code Live Server:

```bash
# Example using Python built-in HTTP server
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Deployment (GitHub Pages)
This repository is configured for deployment to **GitHub Pages**:
1. Commit and push all changes to your `main` or `gh-pages` branch.
2. Go to **Repository Settings** -> **Pages**.
3. Set the source branch to `main` (or root `/`) and click **Save**.
4. Your portfolio will be live at `https://<username>.github.io`.

---

## 📝 License & Attribution

Built for **Fachri Rasyiq Pramana** ([@IkanParii](https://github.com/IkanParii)). Free for personal portfolio use.
