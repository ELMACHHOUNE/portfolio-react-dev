# Create a Modern Multi-Page Developer Portfolio — React + Vite + Tailwind + shadcn/ui + Aceternity UI

You are an expert frontend engineer and UI/UX designer specializing in modern developer portfolios.

I already have an existing React portfolio project. Your task is to **redesign and restructure it into a premium, modern, responsive, multi-page developer portfolio** while preserving my existing professional information and using the existing project as the starting point.

The final result should feel like a **high-end software engineer / AI engineer portfolio**, not like a generic template.

---

## 1. Existing Project

The current project uses:

- React 19
- Vite 8
- JSX
- Tailwind CSS v4
- shadcn/ui
- Base UI
- lucide-react
- Geist Variable font
- clsx
- tailwind-merge
- class-variance-authority
- oxlint

Existing structure:

```text
portfolio-react-new/
├── public/
│   └── icon.png
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ui/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   └── Projects.jsx
│   └── lib/
│       └── utils.js
├── index.html
├── components.json
├── jsconfig.json
├── vite.config.js
├── .oxlintrc.json
└── package.json
```

Do not throw away the project unnecessarily.

First inspect the existing architecture and reuse useful components, styles, utilities, and data where appropriate.

---

# 2. IMPORTANT — USE CONTEXT7

Before implementing components, APIs, or library-specific code, use **Context7** to retrieve the latest documentation/examples for:

- React 19
- Vite 8
- Tailwind CSS v4
- shadcn/ui
- Base UI
- Aceternity UI
- Any Aceternity component being implemented

Do NOT rely on outdated implementation examples.

In particular, verify the current implementation of these Aceternity components:

### Keyboard

https://ui.aceternity.com/components/keyboard

### Carousel

https://ui.aceternity.com/components/carousel

Use the current API and implementation recommended by the official documentation.

If Context7 provides a newer implementation than examples found elsewhere, follow Context7.

---

# 3. Main Objective

Transform the current portfolio into a **multi-page personal developer portfolio**.

The website should communicate:

> Mohamed EL MACHHOUNE — Software Engineer, Full Stack Developer & Instructor

The visual identity should combine:

- Modern SaaS design
- Developer portfolio aesthetics
- Minimalism
- Subtle futuristic/AI feeling
- Clean typography
- Dark/light mode
- Elegant animations
- Glassmorphism used carefully
- Subtle gradients
- Interactive UI
- Strong visual hierarchy
- Professional corporate appearance

Avoid:

- Excessive animations
- Excessive gradients
- Overly colorful designs
- Generic portfolio templates
- Huge unnecessary text
- Random decorative elements
- Excessive glassmorphism
- Poor mobile layouts

The website should look professional enough to be used when applying for software engineering positions.

---

# 4. Multi-Page Architecture

Do NOT make everything a single giant page.

Create proper routes/pages.

Recommended structure:

```text
/
├── Home
├── About
├── Experience
├── Education
├── Projects
└── Contact
```

Use a proper React routing solution.

If React Router is appropriate for the current project, use:

```text
react-router-dom
```

Create a clean routing architecture.

Example:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── MobileNavigation.jsx
│   │
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Skills.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── ExperiencePreview.jsx
│   │   ├── EducationPreview.jsx
│   │   └── CTA.jsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCarousel.jsx
│   │   └── ProjectDetails.jsx
│   │
│   └── ui/
│       └── ...
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
│
├── data/
│   ├── projects.js
│   ├── experience.js
│   ├── education.js
│   ├── skills.js
│   └── social.js
│
├── lib/
│   └── utils.js
│
└── App.jsx
```

Keep components modular and reusable.

---

# 5. Global Design System

Create a consistent design system.

Use:

- Geist Variable
- Tailwind CSS v4
- shadcn/ui
- Aceternity UI
- lucide-react

Use CSS variables for:

- background
- foreground
- card
- border
- muted
- primary
- secondary
- accent

Support:

```text
Light Mode
Dark Mode
```

The dark theme should be the visually dominant/default experience.

Use a sophisticated developer-oriented dark theme.

Do not make the background completely black everywhere.

Use subtle variations between:

```text
background
cards
sections
navigation
footer
```

---

# 6. Navbar

Create a modern sticky navbar.

Desktop:

```text
Logo / Mohamed
Home
About
Experience
Education
Projects
Contact
Theme Toggle
```

The navbar should:

- remain visible while scrolling
- have subtle backdrop blur
- have a thin border
- change slightly when scrolling
- contain active route indication
- work perfectly on mobile

Mobile:

Use a responsive menu / Sheet / Drawer from shadcn/ui.

The mobile menu must be clean and accessible.

---

# 7. HOME PAGE

The Home page should immediately communicate who I am.

Structure:

```text
Hero
↓
Tech Stack
↓
Featured Projects
↓
Experience Preview
↓
Education Preview
↓
Call To Action
```

---

# 8. HERO SECTION — IMPORTANT

Use the Aceternity UI **Keyboard** component:

https://ui.aceternity.com/components/keyboard

Retrieve the latest implementation through Context7 before using it.

The keyboard component should be integrated naturally into the hero.

Do not simply place the component randomly.

The concept should communicate:

> Developer / Software Engineer / Builder

For example, create an interactive keyboard-inspired hero where keys represent:

```text
⌘
K
>
/
React
Node
JS
TS
AI
```

or similar developer-oriented shortcuts.

The keyboard should support the visual storytelling of the hero.

The hero should contain:

### Main heading

```text
Mohamed EL MACHHOUNE
```

### Professional title

```text
Software Engineer
Full Stack Developer
```

Potential animated secondary text:

```text
Building scalable web applications
with modern technologies.
```

Use a subtle animated text effect if appropriate.

Do not over-animate the hero.

---

# 9. HERO CTA

Create two primary actions:

```text
View Projects
Contact Me
```

Optionally add:

```text
Download CV
```

Use shadcn Button components.

Use lucide-react icons.

Buttons should have subtle hover animations.

---

# 10. HERO SOCIAL LINKS

Include:

- GitHub
- LinkedIn
- Email

Use icon buttons with accessible tooltips.

Do not invent URLs.

Use placeholders where information is not available:

```javascript
const socialLinks = {
  github: "",
  linkedin: "",
  email: "",
};
```

---

# 11. TECH STACK SECTION

Create a compact technology section.

Show technologies such as:

### Frontend

- React
- Next.js
- JavaScript
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools

- Git
- GitHub
- Docker
- Vercel

### AI

- Generative AI
- OpenAI API
- Gemini API
- Prompt Engineering
- RAG
- LangChain

Do not exaggerate expertise.

Present the technologies in an elegant grid or badge layout.

Use shadcn Badge where appropriate.

---

# 12. ABOUT PAGE

Create a dedicated `/about` page.

Structure:

```text
Page Header
↓
Introduction
↓
Professional Profile
↓
Technical Skills
↓
Development Philosophy
↓
What I Do
↓
CTA
```

The About page should present me as:

- Software Engineer
- Full Stack Developer
- MERN Stack Developer
- Instructor / Technical Trainer
- Freelancer

Use cards and subtle visual sections.

---

# 13. EXPERIENCE PAGE

Create `/experience`.

Use a modern timeline.

Display professional experience chronologically.

Use:

- timeline
- cards
- badges
- technology tags
- company information

Each experience entry should support:

```javascript
{
  company: "",
  role: "",
  period: "",
  location: "",
  description: "",
  technologies: []
}
```

Do not invent missing employment details.

Use existing portfolio information when available.

---

# 14. EDUCATION PAGE

Create `/education`.

Use elegant education cards/timeline.

Include:

- degrees
- diplomas
- certifications
- professional training

Each entry should support:

```javascript
{
  institution: "",
  degree: "",
  period: "",
  description: "",
  technologies: []
}
```

Include certificates when appropriate.

---

# 15. PROJECTS PAGE — IMPORTANT

Create `/projects`.

This should be one of the most visually impressive pages.

Use the Aceternity UI **Carousel** component:

https://ui.aceternity.com/components/carousel

Again, retrieve the current implementation from Context7.

Use the carousel for featured projects.

The carousel should support:

- project image
- project title
- description
- technologies
- GitHub button
- Live Demo button

Example:

```text
┌───────────────────────────────────────────────┐
│                                               │
│               PROJECT IMAGE                   │
│                                               │
├───────────────────────────────────────────────┤
│ Project Name                                  │
│ Short description                             │
│                                               │
│ React • Node • MongoDB • Tailwind             │
│                                               │
│ [ GitHub ] [ Live Demo ]                      │
└───────────────────────────────────────────────┘
```

---

# 16. PROJECT DATA ARCHITECTURE

Do not hardcode all project information directly into JSX.

Create:

```text
src/data/projects.js
```

Example:

```javascript
export const projects = [
  {
    id: 1,
    title: "",
    description: "",
    image: "",
    technologies: [],
    github: "",
    demo: "",
    featured: true,
  },
];
```

The UI should map over this data.

Make the project component reusable.

---

# 17. PROJECT DETAILS

If appropriate, allow each project to have its own details page:

```text
/projects/project-name
```

or use a reusable project details section/modal.

A project detail should support:

```text
Overview
Problem
Solution
Features
Technologies
Architecture
Screenshots
Links
```

Do not create unnecessary complexity if the project does not require it.

---

# 18. OTHER ACETERNITY COMPONENTS

Do not limit the implementation to Keyboard and Carousel.

Review the available Aceternity UI components and select additional components that naturally fit this portfolio.

Potential components to consider:

- Spotlight
- Background Beams
- Text Generate Effect
- Typewriter Effect
- Moving Border
- Meteors
- Infinite Moving Cards
- Card Hover Effect
- Wobble Card
- Bento Grid
- Floating Dock
- Timeline
- Glowing Stars

However:

**Do not use all of them.**

Only use components that improve the design.

The final website should feel coherent rather than like a showcase of every Aceternity component.

---

# 19. COMPONENT MATCHING

Use components according to the purpose of each section.

For example:

### Hero

Aceternity:

- Keyboard
- Spotlight
- subtle Text Generate Effect

### Skills

shadcn:

- Badge
- Card

Aceternity:

- subtle moving/hover effects if appropriate

### Projects

Aceternity:

- Carousel
- Card Hover Effect

### Experience

Aceternity:

- Timeline if appropriate

### Contact

shadcn:

- Card
- Input
- Textarea
- Label
- Button

### Navbar

shadcn:

- Sheet

Aceternity:

- Floating Dock if it fits the design

---

# 20. SHADCN/UI

Use shadcn/ui extensively for standard UI primitives.

Potential components:

```text
Button
Badge
Card
Input
Textarea
Label
Separator
Sheet
Tooltip
Tabs
Dialog
Avatar
Breadcrumb
```

Only install components that are actually needed.

Use the current shadcn implementation compatible with the existing project.

Do not replace shadcn components with custom implementations unless necessary.

---

# 21. ANIMATIONS

Use animation carefully.

The website should feel alive but professional.

Recommended animations:

- fade-in
- slide-up
- subtle scale
- hover elevation
- border glow
- text reveal
- staggered cards

Animations should be short and smooth.

Avoid:

- constant bouncing
- excessive spinning
- distracting particle effects
- huge movement
- animation on every element

Respect:

```text
prefers-reduced-motion
```

Users who disable motion should receive a comfortable static experience.

---

# 22. RESPONSIVE DESIGN

The website MUST be fully responsive.

Test:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Pay particular attention to:

- Hero typography
- Keyboard component
- Carousel
- Navbar
- Timeline
- Cards
- Footer
- Buttons

No horizontal overflow.

No broken components on mobile.

---

# 23. ACCESSIBILITY

Follow accessibility best practices.

Use:

- semantic HTML
- proper heading hierarchy
- accessible buttons
- aria-labels
- keyboard navigation
- visible focus states
- sufficient contrast
- alt text
- reduced-motion support

Do not use clickable `<div>` elements when a button/link is appropriate.

---

# 24. PERFORMANCE

Keep the website fast.

Avoid:

- unnecessary dependencies
- huge images
- unnecessary JavaScript
- excessive animations
- duplicated components

Use:

- lazy loading where appropriate
- optimized images
- reusable components
- clean data-driven rendering

Make sure the production build succeeds with:

```bash
npm run build
```

---

# 25. SEO

Improve the base HTML metadata.

Update:

```text
title
description
keywords
Open Graph metadata
favicon
theme color
```

Suggested title:

```text
Mohamed EL MACHHOUNE | Software Engineer & Full Stack Developer
```

Suggested description:

```text
Portfolio of Mohamed EL MACHHOUNE, Software Engineer and Full Stack Developer specialized in modern web applications, MERN, React, Node.js, Next.js and AI integration.
```

Do not claim technologies or expertise that are not represented in the actual portfolio.

---

# 26. FOOTER

Create a professional footer.

Include:

```text
Mohamed EL MACHHOUNE

Software Engineer · Full Stack Developer

Navigation
Home
About
Experience
Education
Projects
Contact

Social
GitHub
LinkedIn
Email

© 2026 Mohamed EL MACHHOUNE
```

Use the actual current year dynamically instead of hardcoding it if possible.

---

# 27. CONTACT PAGE

Create `/contact`.

Structure:

```text
Contact Header
↓
Short introduction
↓
Contact information
↓
Contact form
↓
Social links
```

Form fields:

```text
Name
Email
Subject
Message
```

Use shadcn:

- Input
- Textarea
- Label
- Button

At this stage, the form does not need a backend unless one already exists.

Implement clean client-side validation.

Display success/error states elegantly.

---

# 28. DARK MODE

Dark mode should look excellent.

Use:

```text
background: deep neutral
cards: slightly lighter neutral
borders: subtle
text: high contrast
muted text: soft gray
accent: restrained modern color
```

Avoid making everything glow.

The accent color should be used primarily for:

- links
- active navigation
- buttons
- small highlights
- important interactive elements

---

# 29. DATA SEPARATION

Keep content separate from UI.

Create:

```text
src/data/
├── projects.js
├── experience.js
├── education.js
├── skills.js
└── social.js
```

Components should consume the data.

This will make it easy to update my CV/portfolio later.

---

# 30. CODE QUALITY

Follow these rules:

- functional React components
- hooks only when needed
- no unnecessary state
- no duplicated JSX
- reusable components
- clean naming
- small components
- avoid giant files
- use `@/` alias
- preserve ESLint/Oxlint compatibility
- avoid unnecessary `useEffect`
- avoid unnecessary dependencies

Use modern React 19 patterns where appropriate.

---

# 31. EXISTING TECHNICAL CONSTRAINTS

Preserve:

```text
React 19
Vite 8
Tailwind CSS v4
shadcn/ui
Base UI
lucide-react
Geist Variable
```

Do not downgrade React.

Do not downgrade Tailwind.

Do not migrate the project to Next.js.

Do not replace Vite.

Do not introduce a backend.

---

# 32. INSTALLATION

If a dependency is required, install it using the appropriate command.

For example, if routing is not currently installed:

```bash
npm install react-router-dom
```

For shadcn components, use the current shadcn CLI:

```bash
npx shadcn@latest add <component>
```

For Aceternity components, follow the current official implementation retrieved through Context7.

Do not blindly copy dependencies from old tutorials.

---

# 33. VISUAL DIRECTION

The final design should feel like a combination of:

```text
Modern Developer Portfolio
+
Premium SaaS Dashboard
+
Minimalist Apple/Vercel-inspired UI
+
Subtle AI/Technology aesthetic
```

The design should be:

```text
Premium
Minimal
Technical
Modern
Elegant
Responsive
Fast
Professional
```

It should NOT look:

```text
Generic
Over-designed
Template-like
Childish
Too colorful
Too animated
```

---

# 34. PAGE TRANSITIONS

If appropriate, implement subtle page transitions.

Transitions should be:

```text
fast
subtle
professional
```

Do not make navigation feel slow.

---

# 35. MOBILE NAVIGATION

On mobile, use a shadcn Sheet or another appropriate shadcn component.

The navigation should:

- open smoothly
- close after selecting a route
- have clear active state
- be accessible
- not cover the entire screen unnecessarily

---

# 36. ERROR HANDLING

Create a simple fallback/error state where appropriate.

If an image fails to load, display a graceful placeholder.

If project data has no image, the project card should still look good.

If a GitHub/demo URL is missing, don't display a broken link.

---

# 37. IMPORTANT — DO NOT INVENT DATA

Use my existing portfolio information.

My professional profile includes:

```text
Mohamed EL MACHHOUNE

Software Engineer
Full Stack Developer
MERN Stack Developer
Technical Instructor
Freelance Developer
```

Relevant technologies include:

```text
MongoDB
Express.js
React
Node.js
Next.js
TypeScript
JavaScript
Tailwind CSS
Vite
Redux
React Router
Docker
Git
GitHub
OpenAI API
Gemini API
LangChain
RAG
Prompt Engineering
```

Only display technologies that make sense for the relevant experience/project.

Do not invent companies, clients, projects, dates, degrees, certifications, URLs, or job titles.

If information is missing, create a clearly marked placeholder in the data file instead of fabricating it.

---

# 38. PROJECT IMAGES

Use project screenshots/images when available.

If no project image exists, create a visually attractive placeholder using the project's technology/theme.

Do not use random unrelated stock photos.

The visual representation should communicate that the projects are software products.

---

# 39. FINAL PROJECT STRUCTURE

The target architecture should approximately look like:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── MobileNavigation.jsx
│   │
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── TechStack.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── ExperiencePreview.jsx
│   │   ├── EducationPreview.jsx
│   │   └── CTA.jsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectCarousel.jsx
│   │   └── ProjectDetails.jsx
│   │
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── badge.jsx
│       ├── sheet.jsx
│       ├── tooltip.jsx
│       └── ...
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
│
├── data/
│   ├── projects.js
│   ├── experience.js
│   ├── education.js
│   ├── skills.js
│   └── social.js
│
├── lib/
│   └── utils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 40. IMPLEMENTATION PROCESS

Follow this process:

### Step 1 — Inspect

Inspect the existing project structure and identify:

- existing components
- existing pages
- existing styling
- existing dependencies
- reusable code
- existing portfolio information

### Step 2 — Documentation

Use Context7 to verify the latest APIs and examples for:

- shadcn/ui
- Aceternity UI
- Keyboard
- Carousel
- any additional Aceternity components selected

### Step 3 — Architecture

Create the multi-page routing architecture.

### Step 4 — Design System

Update the global Tailwind/theme configuration and CSS variables.

### Step 5 — Layout

Implement:

```text
Navbar
Layout
Footer
Mobile navigation
```

### Step 6 — Home

Implement:

```text
Hero
Keyboard
Tech Stack
Featured Projects
Experience Preview
Education Preview
CTA
```

### Step 7 — Internal Pages

Implement:

```text
About
Experience
Education
Projects
Contact
```

### Step 8 — Interactions

Add:

- hover states
- keyboard interaction
- carousel interaction
- navigation transitions
- dark mode
- responsive menu

### Step 9 — Responsive

Test all major breakpoints.

### Step 10 — Quality

Run:

```bash
npm run lint
npm run build
```

Fix all errors.

---

# 41. ACCEPTANCE CRITERIA

The implementation is complete only if:

- [ ] The application runs successfully.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds.
- [ ] React 19 is preserved.
- [ ] Vite 8 is preserved.
- [ ] Tailwind CSS v4 is preserved.
- [ ] shadcn/ui is properly integrated.
- [ ] Aceternity UI is properly integrated.
- [ ] Context7 documentation was consulted.
- [ ] Keyboard component is used in the Hero.
- [ ] Carousel component is used on Projects.
- [ ] Additional Aceternity components are used only where they improve the UI.
- [ ] The website has separate routes/pages.
- [ ] Dark mode works.
- [ ] Mobile navigation works.
- [ ] The site is responsive.
- [ ] No horizontal scrolling occurs.
- [ ] Project data is separated from UI.
- [ ] Experience data is separated from UI.
- [ ] Education data is separated from UI.
- [ ] Social links are data-driven.
- [ ] Accessibility is considered.
- [ ] Animations respect reduced-motion preferences.
- [ ] No fake professional information is introduced.
- [ ] No broken links are created.
- [ ] No unnecessary dependencies are introduced.

---

# 42. FINAL INSTRUCTION

Do not just create a visually attractive landing page.

Build a **complete, production-quality personal portfolio application**.

Prioritize:

1. Professional visual identity
2. Excellent UX
3. Clean architecture
4. Reusable components
5. Responsive behavior
6. Accessibility
7. Performance
8. Maintainability

Use Aceternity UI for visually impressive interactive sections and shadcn/ui for reliable reusable UI primitives.

The Keyboard component must be a key visual element of the Hero.

The Carousel component must be a key visual element of the Projects page.

Use other Aceternity components selectively based on the visual context.

The final result should make a recruiter immediately understand:

**Who Mohamed EL MACHHOUNE is, what he does, what technologies he works with, what he has built, and how to contact him.**
