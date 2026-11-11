# Mohamed EL MACHHOUNE — Portfolio

A premium, multi-page developer portfolio built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **shadcn/ui** (Base UI) and **Aceternity UI**. It presents the professional identity of a Software Engineer / Full Stack Developer with a dark-first, minimal, developer-oriented design.

## Tech Stack

| Layer         | Technology                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| UI            | [React](https://react.dev) 19 + JSX                                         |
| Routing       | [React Router](https://reactrouter.com) 7 (`react-router-dom`)              |
| Build tool    | [Vite](https://vite.dev) 8                                                  |
| Styling       | [Tailwind CSS](https://tailwindcss.com) v4 (CSS variables, OKLCH tokens)    |
| Components    | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com)         |
| Effects       | [Aceternity UI](https://ui.aceternity.com) components + [Motion](https://motion.dev) |
| Icons         | [lucide-react](https://lucide.dev) + [@tabler/icons-react](https://tabler.io/icons) |
| Font          | [Geist Variable](https://vercel.com/font) via Fontsource                    |
| Utilities     | `class-variance-authority`, `clsx`, `tailwind-merge`                        |
| Linting       | [oxlint](https://oxc.rs/docs/guide/usage/linter.html)                       |

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** (or your preferred package manager)

### Install

```bash
npm install
```

### Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR                 |
| `npm run build`    | Build for production into `dist/`                  |
| `npm run preview`  | Preview the production build                       |
| `npm run lint`     | Lint the codebase with oxlint (React rules)        |

## Routes

| Route         | Page                                   |
| ------------- | -------------------------------------- |
| `/`           | Home — hero + tech stack + previews + CTA |
| `/about`      | About — profile, philosophy, skills    |
| `/experience` | Experience — chronological timeline    |
| `/education`  | Education — degrees & certifications   |
| `/projects`   | Projects — Aceternity Carousel         |
| `/contact`    | Contact — validated contact form       |

All routes except `/` are lazy-loaded via `React.lazy` and wrapped in `Suspense`. A 404 fallback is provided for unknown paths.

## Highlights

- **Aceternity Keyboard** — full interactive Mac-style keyboard (with sound) is the key visual element of the hero; press any key on the home page.
- **Aceternity Carousel** — featured projects showcase with parallax tilt, project images, tech badges and GitHub / Live Demo buttons.
- **Spotlight** effect and subtle scroll-reveal animations (motion) that respect `prefers-reduced-motion`.
- **Dark/light mode** — dark is the default, persisted in `localStorage`, applied before paint to avoid FOUC.
- **Fully responsive** with a Base UI `Sheet` mobile navigation.
- **Data-driven** — all content (projects, experience, education, skills, social links) lives in `src/data/`, separate from the UI.

## Project Structure

```
portfolio-react-new/
├── public/
│   ├── icon.png                      # Favicon
│   └── sounds/                       # Keyboard mechanical-key sound sprite
│       ├── sound.ogg
│       └── config.json
├── src/
│   ├── App.jsx                       # Router: BrowserRouter, Routes, lazy pages
│   ├── main.jsx                      # Entry point — mounts React into #root
│   ├── index.css                     # Tailwind v4 theme (light/dark tokens, accent)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx            # Shell: Navbar + Outlet + Footer + ScrollToTop
│   │   │   ├── Navbar.jsx            # Sticky navbar, blur, active route indicator
│   │   │   ├── MobileNavigation.jsx  # Base UI Sheet menu (mobile)
│   │   │   ├── Footer.jsx            # Brand, nav, social links, dynamic year
│   │   │   ├── ThemeToggle.jsx       # Dark/light switch
│   │   │   └── PageHeader.jsx        # Reusable inner-page header
│   │   ├── sections/
│   │   │   ├── Hero.jsx              # Name, role cycler, CTA, socials + Keyboard
│   │   │   ├── TechStack.jsx         # Skill groups as badge cards
│   │   │   ├── FeaturedProjects.jsx  # 3 featured project cards
│   │   │   ├── ExperiencePreview.jsx # Home career teaser
│   │   │   ├── EducationPreview.jsx  # Home education teaser
│   │   │   └── CTA.jsx               # Call-to-action banner
│   │   ├── projects/
│   │   │   └── ProjectCard.jsx       # Reusable project card
│   │   └── ui/                       # shadcn/ui + Aceternity primitives
│   │       ├── button.jsx
│   │       ├── badge.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       ├── textarea.jsx
│   │       ├── separator.jsx
│   │       ├── sheet.jsx
│   │       ├── tooltip.jsx
│   │       ├── keyboard.jsx          # Aceternity Keyboard
│   │       ├── carousel.jsx          # Aceternity Carousel (project slides)
│   │       ├── spotlight.jsx         # Aceternity Spotlight
│   │       └── Reveal.jsx            # Scroll reveal wrapper (motion)
│   ├── data/                         # Content lives here — edit to update site
│   │   ├── social.js                 # Identity, roles, GitHub/LinkedIn/Email
│   │   ├── skills.js                 # Skill groups
│   │   ├── projects.js               # Projects (+ generated SVG placeholders)
│   │   ├── experience.js             # Work history
│   │   └── education.js              # Education & certifications
│   ├── lib/
│   │   ├── utils.js                  # cn() helper (clsx + tailwind-merge)
│   │   └── theme.js                  # useTheme hook (persisted dark/light)
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Experience.jsx
│       ├── Education.jsx
│       ├── Projects.jsx
│       └── Contact.jsx
├── index.html                        # SEO metadata, theme bootstrap script
├── components.json                   # shadcn/ui configuration
├── jsconfig.json                     # Path alias @/* → src/*
├── vite.config.js                    # Vite config: React, Tailwind, @ alias
├── .oxlintrc.json                    # oxlint rules (react plugin)
└── package.json
```

### Key conventions

- **Path alias**: `@/` resolves to `src/` (configured in `vite.config.js` and `jsconfig.json`). Import with `import { cn } from "@/lib/utils"`.
- **Content is data**: never hardcode portfolio content in JSX. Edit the files in `src/data/` to update projects, experience, education, skills or social links.
- **Placeholders over fabrication**: any missing professional data (companies, dates, links, images) is shown as a clearly marked placeholder rather than invented. Swap them with real values in `src/data/`.
- **Theming**: color tokens are CSS variables in `src/index.css` (`:root` / `.dark`), mapped to Tailwind via `@theme inline`. Dark mode is the default.
- **Base UI rendering**: `Button` renders a native `<button>` by default; when composing it as a link pass `nativeButton={false}` and a `render` prop, e.g. `render={<Link to="/projects" />}`.
- **Reusable UI**: add shadcn components with `npx shadcn@latest add <component>`; they land in `src/components/ui/`.

## Customizing Your Content

1. **Identity & socials** — `src/data/social.js` (name, roles, GitHub/LinkedIn/Email, location).
2. **Skills** — `src/data/skills.js` (grouped badge lists).
3. **Projects** — `src/data/projects.js` (title, description, image, technologies, github, demo, featured). Without an image, a themed SVG placeholder is generated automatically.
4. **Experience** — `src/data/experience.js` (company, role, period, location, description, technologies).
5. **Education** — `src/data/education.js` (institution, degree, period, description, technologies).

## Notes

- Keyboard sounds load from `/sounds/sound.ogg`; the hero enables them, with a graceful no-op if the file is missing.
- Route pages are code-split for performance; the main bundle stays lean.
- No backend is required — the contact form performs client-side validation only.