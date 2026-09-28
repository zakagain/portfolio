# Portfolio

Personal portfolio site. React 19 + TypeScript + Vite + React Router, deployed to
GitHub Pages. No UI framework — just CSS, so there is nothing to unlearn when you
restyle it.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script            | Does                                       |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Dev server with hot reload                 |
| `npm run build`   | Typecheck, then build to `dist/`           |
| `npm run preview` | Serve the production build locally         |
| `npm run lint`    | Lint with oxlint                           |

## Pages

Each nav item is a real route:

| Path         | Renders      | Component                  |
| ------------ | ------------ | -------------------------- |
| `/`          | Hero         | `components/Hero.tsx`      |
| `/work`      | Projects     | `components/Projects.tsx`  |
| `/about`     | About        | `components/About.tsx`     |
| `/skills`    | Skills       | `components/Skills.tsx`    |
| `/experience`| Experience   | `components/Experience.tsx`|
| `/contact`   | Contact      | `components/Contact.tsx`   |
| anything else| 404          | `components/NotFound.tsx`  |

To add a page: drop a component in `src/components`, then add a `<Route>` to
`src/App.tsx` and an entry to `navLinks` in `src/data/portfolio.ts`. The nav picks
it up automatically.

## The one file you will edit most

**`src/data/portfolio.ts` holds all the content** — name, links, about text,
projects, experience, skills. No component contains any of your actual copy, so
you can rewrite the site without touching JSX.

Delete anything you don't want. Lists render nothing when empty, except the hero
and contact pages, which always render.

## Layout

```
src/
  App.tsx                  route table
  main.tsx                 BrowserRouter + entry point
  index.css                all styling
  data/portfolio.ts        ← your content lives here
  components/
    Layout.tsx             nav + grid backdrop + footer, wraps every route
    PageHeader.tsx         title + lede block used by each page
  hooks/
    useTheme.ts            light/dark toggle + the view-transition wipe
    usePageMeta.ts         sets document.title per page
404.html                   GitHub Pages deep-link fallback
```

## Making it yours

**Text and links** — `src/data/portfolio.ts`. Project `status` badges are
`live` / `in-progress` / `archived`; `featured: true` pins a project to the top.

**Colours, fonts, spacing** — the `--*` custom properties at the top of
`src/index.css`. Everything else references those variables, so changing the
accent colour re-themes the whole site, dark mode included.

**The animated grid** — `.grid-bg` in `src/index.css`. It is a fixed layer behind
the content whose `--reveal` custom property animates from `0%` to `125%` on page
load, wiping in from the top-right towards the bottom-left. Change
`background-size` for the grid spacing, `--grid-line` for its colour, or the
`grid-reveal` keyframes for the motion. `@property` is what makes the percentage
interpolate, so keep it. It is disabled automatically under
`prefers-reduced-motion: reduce`.

**The theme transition** — clicking the toggle uses the [View Transitions
API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API). The
browser snapshots the outgoing and incoming frames itself, then
`::view-transition-new(root)` is revealed by an expanding `circle()` centred on
the button. Duration is the `1s` in the `theme-wipe` keyframes (keep it in sync
with `THEME_WIPE_MS` in `hooks/useTheme.ts`, which throttles repeat clicks).
Snapshots matter here: an opaque overlay cannot repaint the foreground
underneath it, which left body text dark-on-dark for the length of the sweep.
The button itself spins on click via `toggle-spin`.

On browsers without the API the theme just switches instantly rather than
animating — deliberately, since that is better than the glitchy version. Add a
cross-fade to `::view-transition-old/new(root)` if you want a fallback
animation later.

**Page titles and meta** — `index.html`. `public/favicon.svg` is the icon.

**Light/dark mode** — follows your OS setting by default, and any choice you
make with the nav toggle is remembered. The initial value is set in `index.html`
before first paint (so there is no flash) and read again by `readInitialTheme()`
in `hooks/useTheme.ts` — keep those two in sync.

## Deploying

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml`
(GitHub Pages, Actions → Pages → Source: GitHub Actions). To turn that off,
delete the workflow.

Deep links like `/work` work on refresh. GitHub Pages has no rewrite rules, so it
serves `404.html` for any path it cannot resolve — while the browser's location
stays on the requested URL. `404.html` therefore hands the path to the app as
`?redirect=/work` and sends the browser to the site root, where `index.html`
restores the clean URL before React mounts. `404.html` is a real Vite entry, so
`%BASE_URL%` is substituted at build time and the same file works unchanged at a
root domain or under `/repo/`.

Two things to check once:

- `vite.config.ts` has `base: '/'`, correct for your custom domain. If you ever
  publish to `zakagain.github.io/portfolio` without the domain, change it to
  `'/portfolio/'`.
- `public/CNAME` sets the custom domain. If you configure the domain in repo
  Settings instead, this file is redundant and can be deleted.

## Licence

See [LICENSE.md](./LICENSE.md). All rights reserved.
