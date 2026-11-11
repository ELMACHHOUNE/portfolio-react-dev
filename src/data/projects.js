const encodeSvg = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const colorPair = (index) => {
  const pairs = [
    ["#22d3ee", "#3b82f6"],
    ["#a78bfa", "#6366f1"],
    ["#34d399", "#0ea5e9"],
    ["#f472b6", "#8b5cf6"],
  ];
  return pairs[index % pairs.length];
};

const codeLines = ["const app = createApp()", "await app.serve()", "result.ok => 200", "db.connect()", "render(<App />)"];

const placeholderSvg = (title, techs, index) => {
  const [c1, c2] = colorPair(index);
  const tech = techs.slice(0, 3).join(" · ");
  const lines = codeLines
    .map(
      (line, i) =>
        `<text x="32" y="${68 + i * 26}" fill="rgba(255,255,255,0.55)" font-family="monospace" font-size="15">${line}</text>`,
    )
    .join("");
  return encodeSvg(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${c2}" stop-opacity="0.22"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.35" r="0.7">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="760" fill="#0b0d12"/>
    <rect width="1200" height="760" fill="url(#bg)"/>
    <rect width="1200" height="760" fill="url(#glow)"/>
    <rect x="28" y="28" width="1144" height="704" rx="20" fill="none" stroke="rgba(255,255,255,0.10)"/>
    <text x="48" y="54" fill="rgba(255,255,255,0.85)" font-family="monospace" font-size="13">~/${title?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.dev</text>
    ${lines}
    <text x="32" y="660" fill="rgba(255,255,255,0.9)" font-family="monospace" font-size="16" font-weight="600">${tech}</text>
    <circle cx="1200" cy="0" r="220" fill="${c1}" opacity="0.12"/>
  </svg>
`);
};

export const projects = [
  {
    id: 1,
    title: "[Placeholder] Project Name",
    description:
      "[Placeholder] Short description of this project will live here. Backed by the projects data file, ready for your real work.",
    image: "${PLACEHOLDER}",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "",
    demo: "",
    featured: true,
  },
  {
    id: 2,
    title: "[Placeholder] Featured Project",
    description:
      "[Placeholder] Another spot reserved for a full-stack or AI-powered project. Edit src/data/projects.js to publish your work.",
    image: "${PLACEHOLDER}",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "",
    demo: "",
    featured: true,
  },
  {
    id: 3,
    title: "[Placeholder] Side Project",
    description:
      "[Placeholder] A future open-source build. Replace the placeholder image and links in the data file.",
    image: "${PLACEHOLDER}",
    technologies: ["Express.js", "MongoDB", "Mongoose"],
    github: "",
    demo: "",
    featured: true,
  },
  {
    id: 4,
    title: "[Placeholder] AI Experiment",
    description:
      "[Placeholder] A generative-AI integration planned for this slot — OpenAI, LangChain or Gemini powered.",
    image: "${PLACEHOLDER}",
    technologies: ["React", "OpenAI API", "LangChain", "RAG"],
    github: "",
    demo: "",
    featured: false,
  },
];

export const projectsWithImages = projects.map((project, index) => ({
  ...project,
  image: placeholderSvg(project.title, project.technologies, index),
}));

export const featuredProjects = projectsWithImages.filter(
  (project) => project.featured,
);

export const projectPreviews = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
];