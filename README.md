# CyberSecurity Portfolio Portal

A clean, data-driven cybersecurity portfolio built with HTML, CSS, Vanilla JavaScript, and Chart.js. The layout is designed to feel cinematic, lightweight, and easy to customize.

## Preview

- Hero section with ambient particles and depth-gauge styling
- About section with editable profile copy
- Skills section with radar chart and skill bars
- Credentials section with certificate cards
- Projects section with filterable cards
- Blog section for writeups and notes
- Contact section with social links

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Chart.js

## Project Structure

```text
index.html
style.css
app.js
plan.md
README.md
data/
components/
utils/
```

## How To Customize

1. Edit `data/profile.js` to change your name, nickname, summary, and About text.
2. Edit `data/projects.js` to add or remove projects.
3. Edit `data/certs.js` to update certificates and competitions.
4. Edit `data/skills.js` to adjust the radar chart and skill bars.
5. Edit `data/blog.js` to show your own writeups or notes.
6. Edit the contact links in `index.html` if you want to replace GitHub, Blog, LinkedIn, or Email.

## Adding New Content

Each data file is structured to be easy to extend.

- `profile.js` for personal identity and About copy
- `projects.js` for project cards
- `certs.js` for credential cards
- `skills.js` for chart and skill bars
- `blog.js` for blog cards

## Notes For Editing

- Keep the content short and readable.
- Use the comments in `data/*.js` as a guide for the format of each item.
- If you add a new section, follow the same pattern:
  - add data in `data/`
  - render it in `components/`
  - mount it in `index.html`
  - initialize it in `app.js` if needed

## Deployment

This project is ready for GitHub Pages. After updating the content, push the files to your repository and enable Pages from the repository settings.

## Personal Use

If you want to make a version for someone else, start by editing:

- `data/profile.js`
- `data/projects.js`
- `data/certs.js`
- `data/skills.js`
- `data/blog.js`

Then update the social and contact links in `index.html`.
