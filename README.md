# Harsh Venna — Data Analyst Portfolio

A premium, recruiter-focused portfolio website for **Harsh Veeraraghavalu Venna**, Data Analyst and Computer Science student. Built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, fully static and GitHub Pages ready.

**Live demo:** `[https://harshvenna.github.io/](https://harshvenna.github.io/personal-portfolio/)` *(after deployment — see below)*

---

## ✨ Features

- **Premium dark UI** — glassmorphism cards, gradient accents, animated blobs, and a subtle data-grid background inspired by Apple / Stripe / Linear / Vercel.
- **Fully responsive** — mobile-first, tested from 360px phones up to ultrawide desktops.
- **Rich interactions** — typing animation, scroll-reveal, animated KPI counters, filterable project grid, custom cursor (desktop), sticky navbar with active-link tracking.
- **Recruiter-first content structure** — Hero, About, Skills, Experience timeline, Featured Projects, Certifications, Education, Achievements dashboard, GitHub stats, Contact.
- **SEO optimized** — meta description/keywords, Open Graph, Twitter Cards, canonical URL, `Schema.org` JSON-LD (`Person`), semantic HTML, `robots.txt`, `sitemap.xml`.
- **Accessible** — semantic landmarks, `aria-label`s on icon-only controls, visible focus states, reduced-motion-friendly animations, sufficient color contrast.
- **Zero dependencies** — no React/Vue/Angular, no backend, no build tools. Works by opening `index.html` or deploying as static files.

---

## 📁 Folder Structure

```
portfolio/
│
├── index.html              # Main page (all sections)
├── style.css                # Design system + all component styles
├── script.js                 # All interactivity (vanilla JS)
├── README.md
├── robots.txt
├── sitemap.xml
├── favicon.svg
│
└── assets/
    ├── images/               # profile.jpg, og-cover.jpg (see README.txt inside)
    ├── icons/
    ├── certificates/         # certificate PDFs (see README.txt inside)
    │   └── thumbnails/
    ├── screenshots/          # project screenshots (optional)
    ├── resume/                # Harsh_Venna_Resume.pdf (see README.txt inside)
    └── fonts/                 # optional self-hosted font files
```

---

## 🚀 Getting Started

### 1. Preview locally
No build step required. Either:
- Double-click `index.html`, **or**
- Serve it locally for the best experience (some browsers restrict `fetch`/module behavior on `file://`):
  ```bash
  cd portfolio
  python3 -m http.server 8000
  # visit http://localhost:8000
  ```

### 2. Add your real content
Three folders contain a `README.txt` telling you exactly what to drop in and what filename to use:

| What | Where | Filename expected by the site |
|---|---|---|
| Professional photo | `assets/images/` | `profile.jpg` |
| Resume PDF | `assets/resume/` | `Harsh_Venna_Resume.pdf` |
| Certificate PDFs | `assets/certificates/` | see file inside for the 5 exact names |
| Open Graph cover image | `assets/images/` | `og-cover.jpg` (1200×630px) |

To wire in your photo, open `index.html`, find the Hero section's `.photo-frame-inner` `<div>`, and replace the placeholder monogram:
```html
<span class="avatar-monogram">HV</span>
```
with:
```html
<img src="assets/images/profile.jpg" alt="Harsh Veeraraghavalu Venna">
```

---

## 🎨 Customization

All design tokens live at the top of `style.css` under `:root`:
```css
:root {
  --primary: #0F172A;
  --accent: #06B6D4;
  --accent-violet: #818CF8;
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  /* ... */
}
```
Change these variables to re-theme the entire site — colors, radii, spacing, and shadows all reference this scale.

### Content
- **Projects** live in `#projectsGrid` inside `index.html` — duplicate a `.project-card` block to add more, and set `data-cat` to control which filter buttons show it.
- **Skills** progress bars use inline `style="--pct:90%"` on `.bar-fill` — edit the percentage per skill.
- **KPI counters** in the Achievements section use `data-count="6"` — the JS animates from 0 to that number when scrolled into view.
- **GitHub stats/repos** are static placeholders in the GitHub section — replace with real numbers, or wire up the GitHub REST API (`https://api.github.com/users/harshvenna`) if you want live data.

### Contact form
The form is **frontend-only** (this is a static GitHub Pages site with no backend). On submit, it validates fields client-side and opens the visitor's email client via a pre-filled `mailto:` link. If you want real form submissions without a backend, connect a service like Formspree, Getform, or EmailJS — swap the `fetch`/submit logic in `script.js`.

---

## 🌐 Deployment on GitHub Pages

1. Create a new GitHub repository (e.g. `harshvenna.github.io` for a user site, or any name for a project site).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/harshvenna/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose **Branch: `main`**, folder **`/ (root)`**, then **Save**.
6. Your site will be live at:
   - `https://harshvenna.github.io/` (if the repo is named `harshvenna.github.io`), or
   - `https://harshvenna.github.io/<repo-name>/` (for a project repo — update `og:url`, `canonical`, and `sitemap.xml` URLs to match).

---

## ⚡ Performance & Accessibility Notes

- Fonts are loaded via `@import` in `style.css` from Google Fonts with `display=swap` to avoid invisible text during load.
- All animations use `transform`/`opacity` (GPU-friendly) rather than layout-triggering properties.
- Scroll-based reveals use `IntersectionObserver`, not scroll-event polling.
- Custom cursor and heavy hover effects are disabled on touch devices via a `matchMedia('(pointer: coarse)')` check.
- Add real `width`/`height` or `aspect-ratio` to your uploaded images to prevent layout shift once you add `profile.jpg` and project screenshots.
- Run the deployed site through [PageSpeed Insights](https://pagespeed.web.dev/) and [WAVE](https://wave.webaim.org/) after adding your real images to catch anything specific to your final assets.

---

## 📄 License

Free to use and adapt for your own portfolio. No attribution required.

---

Built for **Harsh Veeraraghavalu Venna** — [GitHub](https://github.com/harshvenna) · [LinkedIn](https://www.linkedin.com/in/harsh-venna-a7a7a53a9) · harshvennaix@gmail.com
