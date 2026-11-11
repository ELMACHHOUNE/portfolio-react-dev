export const skillGroups = [
  {
    title: "Frontend",
    description: "Building responsive, accessible user interfaces.",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Redux",
      "React Router",
    ],
  },
  {
    title: "Backend",
    description: "Designing robust APIs and data layers.",
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
  },
  {
    title: "AI / Emerging",
    description: "Integrating intelligence into products.",
    skills: [
      "Generative AI",
      "OpenAI API",
      "Gemini API",
      "LangChain",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Shipping and maintaining reliable software.",
    skills: ["Git", "GitHub", "Docker", "Vercel"],
  },
];

export const allSkills = skillGroups.flatMap((group) => group.skills);