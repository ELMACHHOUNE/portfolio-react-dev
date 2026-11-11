import {
  SiAnthropic,
  SiDebian,
  SiDocker,
  SiForgejo,
  SiGit,
  SiGithub,
  SiGo,
  SiGooglegemini,
  SiLinux,
  SiNestjs,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiWireshark,
} from "react-icons/si";
import { Cube } from "./Cube";
import "./techCubes.css";

/* -------------------------------------------------------------------------- */
/* Inline fallbacks                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Simple Icons no longer ships an OpenAI mark, so we use this tiny inline
 * outline as the fallback allowed by the brief. It inherits `currentColor`.
 */
function OpenAIMark(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11.217 19.384a3.501 3.501 0 0 0 6.783-1.217v-5.167l-6-3.35" />
      <path d="M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34-2.534v-6.946" />
      <path d="M6 7.63c-1.391-.236-2.787.395-3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514 6-3.348" />
      <path d="M12.783 4.616a3.501 3.501 0 0 0-6.783 1.217v5.067l6 3.45" />
      <path d="M18.786 8.986a3.501 3.501 0 0 0-4.446-5.266l-4.34 2.534v6.946" />
      <path d="M18 16.302c1.391.236 2.787-.395 3.534-1.689a3.474 3.474 0 0 0-1.271-4.745l-4.308-2.514-5.955 3.42" />
    </svg>
  );
}

/** A small multi-colour Chrome mark (Simple Icons only offers a flat glyph). */
function ChromeMark(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {/* Outer ring split into three 120° colour segments */}
      <g fill="none" strokeWidth="10">
        <circle
          cx="24"
          cy="24"
          r="17"
          stroke="#EA4335"
          strokeDasharray="36 70.81"
          transform="rotate(-90 24 24)"
        />
        <circle
          cx="24"
          cy="24"
          r="17"
          stroke="#FBBC05"
          strokeDasharray="36 70.81"
          transform="rotate(30 24 24)"
        />
        <circle
          cx="24"
          cy="24"
          r="17"
          stroke="#34A853"
          strokeDasharray="36 70.81"
          transform="rotate(150 24 24)"
        />
      </g>
      {/* White separator + blue centre */}
      <circle cx="24" cy="24" r="12.4" fill="#fff" />
      <circle cx="24" cy="24" r="9.8" fill="#4285F4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* The editable cube list                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Layout data — 16 cubes in 5 staggered rows (2 / 3 / 4 / 3 / 4).
 *
 * x  → horizontal position in tile units (0.5 steps create the stagger).
 * y  → row index in row-step units (back rows first).
 * height → side-face depth multiplier; front rows are taller.
 *
 * Swap a technology by replacing one entry, e.g.:
 *   { id: "react", icon: SiReact, color: "#61DAFB", label: "React",
 *     row: 3, col: 1, x: 0.5, y: 2, height: 1.26 }
 */
export const defaultCubes = [
  // Row 1 — back
  {
    id: "claude",
    icon: SiAnthropic,
    color: "#D97757",
    label: "Claude / Anthropic",
    row: 1,
    col: 1,
    x: 1.5,
    y: 0,
    height: 1.02,
  },
  {
    id: "openai",
    icon: OpenAIMark,
    color: "#EDEDED",
    label: "OpenAI",
    row: 1,
    col: 2,
    x: 2.5,
    y: 0,
    height: 0.98,
  },

  // Row 2
  {
    id: "docker",
    icon: SiDocker,
    color: "#2496ED",
    label: "Docker",
    row: 2,
    col: 1,
    x: 1,
    y: 1,
    height: 1.14,
  },
  {
    id: "node",
    icon: SiNodedotjs,
    color: "#5FA04E",
    label: "Node.js",
    row: 2,
    col: 2,
    x: 2,
    y: 1,
    height: 1.08,
  },
  {
    id: "go",
    icon: SiGo,
    color: "#00ADD8",
    label: "Go",
    row: 2,
    col: 3,
    x: 3,
    y: 1,
    height: 1.18,
  },

  // Row 3
  {
    id: "wireshark",
    icon: SiWireshark,
    color: "#1679A7",
    label: "Wireshark",
    row: 3,
    col: 1,
    x: 0.5,
    y: 2,
    height: 1.28,
  },
  {
    id: "git",
    icon: SiGit,
    color: "#F05032",
    label: "Git",
    row: 3,
    col: 2,
    x: 1.5,
    y: 2,
    height: 1.22,
  },
  {
    id: "github",
    icon: SiGithub,
    color: "#C9D1D9",
    label: "GitHub",
    row: 3,
    col: 3,
    x: 2.5,
    y: 2,
    height: 1.3,
  },
  {
    id: "python",
    icon: SiPython,
    color: "#3776AB",
    label: "Python",
    row: 3,
    col: 4,
    x: 3.5,
    y: 2,
    height: 1.24,
  },

  // Row 4
  {
    id: "gemini",
    icon: SiGooglegemini,
    color: "#8E75B2",
    label: "Google Gemini",
    row: 4,
    col: 1,
    x: 1,
    y: 3,
    height: 1.42,
  },
  {
    id: "chrome",
    icon: ChromeMark,
    color: "#4285F4",
    label: "Google Chrome",
    row: 4,
    col: 2,
    x: 2,
    y: 3,
    height: 1.36,
  },
  {
    id: "rust",
    icon: SiRust,
    color: "#F74C00",
    label: "Rust",
    row: 4,
    col: 3,
    x: 3,
    y: 3,
    height: 1.46,
  },

  // Row 5 — front
  {
    id: "debian",
    icon: SiDebian,
    color: "#D70A53",
    label: "Debian",
    row: 5,
    col: 1,
    x: 0.5,
    y: 4,
    height: 1.58,
  },
  {
    id: "forgejo",
    icon: SiForgejo,
    color: "#B22746",
    label: "Forgejo / Gitea",
    row: 5,
    col: 2,
    x: 1.5,
    y: 4,
    height: 1.5,
  },
  {
    id: "nest",
    icon: SiNestjs,
    color: "#5FA04E",
    label: "NestJS",
    row: 5,
    col: 3,
    x: 2.5,
    y: 4,
    height: 1.56,
  },
  {
    id: "linux",
    icon: SiLinux,
    color: "#F0C419",
    label: "Linux",
    row: 5,
    col: 4,
    x: 3.5,
    y: 4,
    height: 1.5,
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * TechCubes
 *
 * @param {Array}  cubes      Override the default 16-cube layout.
 * @param {number} size       Base cube size in px (everything else scales from it).
 * @param {boolean} float     Enable the slow idle floating animation.
 * @param {string} className  Extra class names for the outer wrapper.
 */
export function TechCubes({
  cubes = defaultCubes,
  size = 72,
  float = true,
  className = "",
}) {
  const rootClassName = [
    "tech-cubes",
    float ? "tech-cubes--float" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClassName}
      style={{ "--cube-size-base": `${size}px` }}
      role="img"
      aria-label="Technology stack"
    >
      <div className="tech-cubes__stage">
        {cubes.map((cube, index) => (
          <Cube key={cube.id} {...cube} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TechCubes;
