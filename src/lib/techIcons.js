import { IconBrandOpenai } from "@tabler/icons-react";
import {
  SiDocker,
  SiExpress,
  SiGithub,
  SiGit,
  SiGooglegemini,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

export const techIcons = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "currentColor" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  Vite: { Icon: SiVite, color: "#646CFF" },
  Redux: { Icon: SiRedux, color: "#764ABC" },
  "React Router": { Icon: SiReactrouter, color: "#CA4245" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { Icon: SiExpress, color: "currentColor" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Mongoose: { Icon: SiMongoose, color: "#880000" },
  "OpenAI API": { Icon: IconBrandOpenai, color: "#412991" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75B2" },
  LangChain: { Icon: SiLangchain, color: "#1C3C3C" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "currentColor" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Vercel: { Icon: SiVercel, color: "currentColor" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
};

export function getTechIcon(tech) {
  return techIcons[tech] ?? null;
}