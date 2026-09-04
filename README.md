# Portfolio Website

A simple, professional portfolio site for showcasing AI applications. Built from a Banani design export, deployed as a static site on Vercel.

## Edit content

All site copy, images, and contact info live in one file:

```
content/site.json
```

Update your name, bio, projects, and contact details there. Drop your own images into `images/` and reference them as `/images/your-photo.jpg`.

No build step required — just edit and push.

## Run locally

```bash
npx serve .
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio site"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo.

3. Leave build settings as defaults (no build command, output directory: `.`).

4. Deploy. Vercel auto-redeploys on every push to `main`.

## Project structure

```
index.html          # Page shell
css/styles.css      # Styles (Banani design tokens)
js/main.js          # Loads content.json and renders the page
content/site.json   # ← Edit this file to update the site
images/             # Your photos and project screenshots
```
