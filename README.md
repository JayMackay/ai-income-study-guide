# AI Income Study Studio

A calm, interactive study companion for the AI Income Challenge. Built with **Next.js**, React and hand crafted CSS, inspired by Apple style Liquid Glass surfaces.

## Experience

- Five day learning library with a floating glass navigation menu. Days 1 and 2 each have seven focused chapters. Day 2 combines the supplied VIP transcript, Granola summary, and free main-session transcript into two switchable sets of lessons. Days 3 through 5 are reserved for future session notes.
- Bento style landing area with learning progress and a shortcut to the Develop, Distribute, Deliver framework.
- Purposeful parallax, hover lighting, view transitions and an animated reading progress indicator.
- Interactive diagrams, recall flashcards, practical prompts and a simple revenue illustration.
- Focus mode, light and dark themes, keyboard friendly navigation and reduced motion support.
- Personal notes and weekly checklists stored locally in the browser. Use **Export my notes** to save a text backup. They are not synced to GitHub or across devices.

## Local development

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Visit http://localhost:3000.

Next.js uses **static export**, so no backend is required. To build for hosting:

```sh
npm run build
```

The site appears in `out/`.

## Deployment

The workflow in `.github/workflows/deploy-next.yml` builds and publishes the Next.js export to GitHub Pages. To use it, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (not "Deploy from a branch").

After a successful workflow, browse to:

https://jaymackay.github.io/ai-income-study-guide/

The `basePath` in `next.config.mjs` is configured for this repository name.

## Adding other days

Study content lives in `lib/content.js`. The day selection interface, learning components and diagrams are defined in `app/page.jsx`. Styling is in `app/globals.css`.

Day 2 has seven VIP lessons covering the five digital unlocks and interactive product promise builder, plus five lessons distilled from the free main session on profitable pockets, research synthesis, MVP packaging, distribution and commercial claims. Days 3 to 5 remain placeholders.

## Privacy and limitations

This study tool is hosted publicly on GitHub Pages. Personal notes are stored in browser localStorage and are not automatically transmitted to the repository, but local storage is not suitable for sensitive information and may be cleared by the browser.

The revenue calculator is illustrative and not a forecast. Speaker claims should be evaluated independently.

## Project structure

```text
app/
  layout.jsx          App metadata and layout
  page.jsx            Interactive client application
  globals.css         Responsive design system
lib/
  content.js          Day and lesson content
public/
  favicon.svg         Brand icon
.github/workflows/
  deploy-next.yml     Static export and Pages deployment
next.config.mjs       Static export configuration
package.json          Dependencies and scripts
```
