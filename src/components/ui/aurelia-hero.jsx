"use client";

import { Fragment, useEffect, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Workspace scene (light / dark)                                            */
/* -------------------------------------------------------------------------- */

function useDarkMode() {
  return useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => mo.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => true
  );
}

const SCREEN_ROWS = [
  [
    [0, 84, "p"],
    [92, 46, "s"],
    [146, 26, "a"],
  ],
  [
    [0, 52, "p"],
    [60, 70, "s"],
  ],
  [],
  [
    [0, 64, "s"],
    [72, 94, "p"],
    [174, 38, "a"],
  ],
  [
    [14, 56, "s"],
    [78, 108, "p"],
  ],
  [
    [14, 90, "p"],
    [112, 52, "s"],
  ],
  [
    [0, 38, "s"],
    [46, 82, "a"],
  ],
  [],
  [[14, 116, "p"]],
];

const LEAVES = [
  { deg: -60, len: 0.8, w: 9 },
  { deg: -42, len: 1.02, w: 11 },
  { deg: -24, len: 0.88, w: 10 },
  { deg: -6, len: 1.2, w: 12 },
  { deg: 14, len: 0.94, w: 10 },
  { deg: 34, len: 1.04, w: 11 },
  { deg: 52, len: 0.82, w: 9 },
  { deg: 22, len: 1.3, w: 12 },
];

const SCENE = {
  dark: {
    shell: "#070a11",
    sky: ["#060910", "#0a111d", "#080d15"],
    desk: ["#111a27", "#0a101a", "#04070c"],
    glass: ["#12203a", "#1a2b45", "#0d1626"],
    screen: ["#0e1a2c", "#091120"],
    lid: ["#0b1119", "#151e2b", "#0a0f17"],
    bloom: "#6f9fe8",
    bloomOpacity: [0.12, 0.2, 0.12],
    bars: { p: "#6f9fe8", s: "#c9d8ee", a: "#e8c08e" },
    barOpacity: 0.55,
    edge: "rgba(255,255,255,0.09)",
    hairline: "rgba(255,255,255,0.06)",
    topEdge: "rgba(255,255,255,0.14)",
    trackpad: "rgba(255,255,255,0.035)",
    glow: "#8ab4ff",
    glowOpacity: 0.4,
    warm: "#ffcf9b",
    warmOpacity: 0.3,
    vignette: "#000000",
    vignetteOpacity: 0.5,
    plant: { pot: "#0e1620", rim: "#0b121b", stem: "#1d2e26", leaf: "#182920", lit: "#22382c" },
    mug: {
      body: "#0d1521",
      rim: "#101a28",
      inner: "#1b2b40",
      handle: "rgba(255,255,255,0.1)",
      steam: "#cfe0ff",
      steamOpacity: 0.3,
    },
    frame: "rgba(255,255,255,0.07)",
    mullion: "rgba(255,255,255,0.06)",
    skyline: ["#ffd9a8", "#9dc2ff"],
    skylineOpacity: [0.55, 0.4],
    orb: "#dfe9ff",
    orbGlow: "#cfe0ff",
    orbOpacity: 0.5,
    clouds: 0.04,
    cloud: "#ffffff",
    deskWash: "#9dc2ff",
    deskWashOpacity: 0.03,
    castShadow: "#7fa8ff",
    castShadowOpacity: 0.07,
    caret: "#f2c98f",
  },
  light: {
    shell: "#f5f0e6",
    sky: ["#fdfaf3", "#f8f1e4", "#f2e8d8"],
    desk: ["#f0dfc3", "#e7d1ae", "#d5bc96"],
    glass: ["#e2f2ff", "#cfe7fb", "#b7d7f0"],
    screen: ["#fdfeff", "#eef5fc"],
    lid: ["#d7dce4", "#f7f8fb", "#c6cdd8"],
    bloom: "#fff3d8",
    bloomOpacity: [0.4, 0.55, 0.4],
    bars: { p: "#4f7ec0", s: "#8fa4bb", a: "#bd8547" },
    barOpacity: 0.55,
    edge: "rgba(58,46,32,0.18)",
    hairline: "rgba(58,46,32,0.12)",
    topEdge: "rgba(58,46,32,0.2)",
    trackpad: "rgba(58,46,32,0.06)",
    glow: "#ffe7bd",
    glowOpacity: 0.6,
    warm: "#ffd7a3",
    warmOpacity: 0.35,
    vignette: "#8a6b47",
    vignetteOpacity: 0.16,
    plant: { pot: "#e8dbc4", rim: "#dbccb1", stem: "#5d8a58", leaf: "#7aa772", lit: "#93bf87" },
    mug: {
      body: "#f7f2e9",
      rim: "#fbf8f2",
      inner: "#e6dccb",
      handle: "rgba(58,46,32,0.22)",
      steam: "#ffffff",
      steamOpacity: 0.55,
    },
    frame: "rgba(58,46,32,0.14)",
    mullion: "rgba(58,46,32,0.1)",
    skyline: ["#a9bccd", "#93a9bd"],
    skylineOpacity: [0.55, 0.5],
    orb: "#ffdf8f",
    orbGlow: "#ffe7a8",
    orbOpacity: 0.95,
    clouds: 0.6,
    cloud: "#ffffff",
    deskWash: "#ffe9c4",
    deskWashOpacity: 0.3,
    castShadow: "#a3855c",
    castShadowOpacity: 0.2,
    caret: "#bd8547",
  },
};

function WorkspaceScene({ animate, dark }) {
  const p = SCENE[dark ? "dark" : "light"];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-colors duration-500",
        dark ? "bg-[#070a11]" : "bg-[#f5f0e6]"
      )}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ws-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="0.5" stopColor={p.sky[1]} />
            <stop offset="1" stopColor={p.sky[2]} />
          </linearGradient>
          <linearGradient id="ws-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.desk[0]} />
            <stop offset="0.4" stopColor={p.desk[1]} />
            <stop offset="1" stopColor={p.desk[2]} />
          </linearGradient>
          <linearGradient id="ws-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.glass[0]} />
            <stop offset="0.62" stopColor={p.glass[1]} />
            <stop offset="1" stopColor={p.glass[2]} />
          </linearGradient>
          <linearGradient id="ws-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.screen[0]} />
            <stop offset="1" stopColor={p.screen[1]} />
          </linearGradient>
          <linearGradient id="ws-lid" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={p.lid[0]} />
            <stop offset="0.5" stopColor={p.lid[1]} />
            <stop offset="1" stopColor={p.lid[2]} />
          </linearGradient>
          <radialGradient id="ws-glow">
            <stop offset="0" stopColor={p.glow} stopOpacity={p.glowOpacity} />
            <stop offset="0.45" stopColor={p.glow} stopOpacity={p.glowOpacity * 0.35} />
            <stop offset="1" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ws-warm">
            <stop offset="0" stopColor={p.warm} stopOpacity={p.warmOpacity} />
            <stop offset="1" stopColor={p.warm} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ws-vignette" cx="50%" cy="52%" r="78%">
            <stop offset="0.42" stopColor={p.vignette} stopOpacity="0" />
            <stop offset="1" stopColor={p.vignette} stopOpacity={p.vignetteOpacity} />
          </radialGradient>
          <filter id="ws-blur-lg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
          <filter id="ws-blur-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* room */}
        <rect width="1600" height="900" fill="url(#ws-sky)" />

        {/* window */}
        <g opacity="0.92">
          <rect
            x="1050"
            y="92"
            width="420"
            height="404"
            rx="10"
            fill="url(#ws-glass)"
            stroke={p.frame}
            strokeWidth="2"
          />
          <path d={`M1260 92 V496 M1050 294 H1470`} stroke={p.mullion} strokeWidth="3" />

          {/* distant skyline */}
          <g fill={p.skyline[0]} opacity={p.skylineOpacity[0]}>
            <rect x="1094" y="430" width="6" height="16" rx="1" />
            <rect x="1112" y="416" width="5" height="30" rx="1" />
            <rect x="1128" y="438" width="7" height="12" rx="1" />
            <rect x="1160" y="424" width="5" height="24" rx="1" />
            <rect x="1178" y="440" width="6" height="10" rx="1" />
            <rect x="1214" y="432" width="5" height="18" rx="1" />
          </g>
          <g fill={p.skyline[1]} opacity={p.skylineOpacity[1]}>
            <rect x="1146" y="440" width="6" height="10" rx="1" />
            <rect x="1196" y="428" width="5" height="22" rx="1" />
            <rect x="1300" y="426" width="6" height="22" rx="1" />
            <rect x="1332" y="438" width="5" height="12" rx="1" />
            <rect x="1370" y="430" width="6" height="18" rx="1" />
            <rect x="1402" y="442" width="5" height="8" rx="1" />
          </g>

          {/* clouds */}
          <g opacity={p.clouds} fill={p.cloud} filter="url(#ws-blur-sm)">
            <ellipse cx="1150" cy="182" rx="78" ry="17" />
            <ellipse cx="1212" cy="203" rx="52" ry="13" />
            <ellipse cx="1348" cy="152" rx="62" ry="15" />
          </g>

          {/* moon / sun */}
          <ellipse
            cx="1372"
            cy="172"
            rx="92"
            ry="72"
            fill={p.orbGlow}
            opacity={p.orbOpacity * 0.3}
            filter="url(#ws-blur-lg)"
          />
          <circle cx="1372" cy="172" r="19" fill={p.orb} opacity={p.orbOpacity} />
        </g>

        {/* ambient glows */}
        <ellipse cx="800" cy="440" rx="520" ry="330" fill="url(#ws-glow)" />
        <ellipse cx="1220" cy="610" rx="260" ry="150" fill="url(#ws-warm)" />

        {/* desk */}
        <rect x="0" y="636" width="1600" height="270" fill="url(#ws-desk)" />
        <rect x="0" y="634" width="1600" height="2" fill={p.topEdge} />
        <ellipse
          cx="1180"
          cy="720"
          rx="420"
          ry="220"
          fill={p.deskWash}
          opacity={p.deskWashOpacity}
          filter="url(#ws-blur-lg)"
        />

        {/* plant */}
        <g transform="translate(370 640) rotate(-5)">
          <path
            d="M-48 0 h96 l-13 -76 h-70 z"
            fill={p.plant.pot}
            stroke={p.hairline}
            strokeWidth="2"
          />
          <ellipse cx="0" cy="-76" rx="35" ry="6" fill={p.plant.rim} />
          {LEAVES.map(({ deg, len, w }, i) => (
            <g key={`${deg}-${i}`} transform={`rotate(${deg})`}>
              <path
                d={`M0 -6 C -3 ${-34 * len} -4 ${-48 * len} 0 ${-70 * len}`}
                stroke={p.plant.stem}
                strokeWidth="2"
                fill="none"
              />
              <ellipse
                cx="0"
                cy={-60 * len}
                rx={w}
                ry={26 * len}
                fill={len > 1.15 ? p.plant.lit : p.plant.leaf}
              />
            </g>
          ))}
        </g>

        {/* laptop */}
        <g>
          <motion.rect
            x="620"
            y="304"
            width="366"
            height="296"
            rx="20"
            fill={p.bloom}
            animate={animate ? { opacity: p.bloomOpacity } : { opacity: p.bloomOpacity[1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#ws-blur-lg)"
          />

          <rect
            x="604"
            y="292"
            width="392"
            height="320"
            rx="18"
            fill="url(#ws-lid)"
            stroke={p.edge}
            strokeWidth="2"
          />
          <rect x="621" y="309" width="358" height="286" rx="8" fill="url(#ws-screen)" />

          {SCREEN_ROWS.map((row, ri) => (
            <g key={ri} transform={`translate(0 ${346 + ri * 24})`}>
              {row.map(([x, w, key], si) => (
                <rect
                  key={si}
                  x={644 + x}
                  y="0"
                  width={w}
                  height="7"
                  rx="3.5"
                  fill={p.bars[key]}
                  opacity={p.barOpacity}
                />
              ))}
            </g>
          ))}

          <motion.rect
            x="782"
            y="536"
            width="6"
            height="14"
            rx="1"
            fill={p.caret}
            animate={animate ? { opacity: [1, 1, 0, 0] } : { opacity: 0.85 }}
            transition={{ duration: 1.3, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
          />

          <path
            d="M600 612 H1000 L1030 654 H570 Z"
            fill="url(#ws-lid)"
            stroke={p.hairline}
            strokeWidth="2"
          />
          <path d="M600 612 H1000" stroke={p.topEdge} strokeWidth="2" />
          <path d="M770 632 H830 L836 644 H764 Z" fill={p.trackpad} />

          <ellipse
            cx="800"
            cy="664"
            rx="300"
            ry="22"
            fill={p.castShadow}
            opacity={p.castShadowOpacity}
            filter="url(#ws-blur-sm)"
          />
        </g>

        {/* mug */}
        <g transform="translate(72 0)">
          <path
            d="M1108 566 h86 v62 a20 20 0 0 1 -20 20 h-46 a20 20 0 0 1 -20 -20 z"
            fill={p.mug.body}
            stroke={p.hairline}
            strokeWidth="2"
          />
          <path d="M1196 584 a24 24 0 0 1 0 44" fill="none" stroke={p.mug.handle} strokeWidth="7" />
          <ellipse
            cx="1151"
            cy="567"
            rx="43"
            ry="9"
            fill={p.mug.rim}
            stroke={p.hairline}
            strokeWidth="2"
          />
          <ellipse cx="1151" cy="566" rx="31" ry="5.5" fill={p.mug.inner} opacity="0.75" />

          <g
            filter="url(#ws-blur-sm)"
            stroke={p.mug.steam}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity={p.mug.steamOpacity}
          >
            {[0, 1.6, 3.2].map((delay, i) => (
              <motion.path
                key={delay}
                d={`M${1134 + i * 18} 548 c -9 -16 7 -24 0 -40`}
                animate={animate ? { y: [0, -7, 0] } : undefined}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay }}
              />
            ))}
          </g>
        </g>

        {/* vignette */}
        <rect width="1600" height="900" fill="url(#ws-vignette)" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                             */
/* -------------------------------------------------------------------------- */

function useCompact() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function Word({ children, progress, start, end, reduce }) {
  const opacity = useTransform(progress, [start, end], [reduce ? 1 : 0.12, 1]);
  const y = useTransform(progress, [start, end], [reduce ? 0 : 10, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export function AureliaHero({
  className,
  brand = "Aurelia",
  eyebrow = "Travel film studio",
  titleLeft = ["Stories", "from the"],
  titleRight = ["edge of", "the map"],
  paragraph = "Twelve films. Six continents. One crew that never stops moving.",
  paragraphEyebrow = "The studio",
  ctaLabel = "Showreel",
  scrollLabel = "Scroll",
  onCtaClick = noop,
}) {
  const heroRef = useRef(null);
  const grainRef = useRef(null);
  const reduce = useReducedMotion() ?? false;
  const compact = useCompact();
  const dark = useDarkMode();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.35 });
  const progress = reduce ? scrollYProgress : spring;

  const grow = useTransform(progress, [0, 0.55], [0, 1], { ease: easeInOut });
  const slide = useTransform(progress, [0, 0.42], [0, 1], { ease: easeInOut });

  const edgeX = useTransform(grow, (v) => `calc((50% - var(--hw)) * ${(1 - v).toFixed(4)})`);
  const edgeY = useTransform(grow, (v) => `calc((50% - var(--hh)) * ${(1 - v).toFixed(4)})`);
  const frameX = useTransform(grow, (v) => `calc((50% - var(--hw)) * ${(1 - v).toFixed(4)} - 14px)`);
  const frameY = useTransform(grow, (v) => `calc((50% - var(--hh)) * ${(1 - v).toFixed(4)} - 14px)`);
  const radius = useTransform(grow, (v) => `${((1 - v) * 20).toFixed(2)}px`);
  const frameRadius = useTransform(grow, (v) => `${((1 - v) * 20 + 10).toFixed(2)}px`);
  const borderColorLight = useTransform(grow, (v) => `rgba(58,46,32,${(0.18 * (1 - v)).toFixed(3)})`);
  const borderColorDark = useTransform(grow, (v) => `rgba(255,255,255,${(0.2 * (1 - v)).toFixed(3)})`);
  const borderColor = dark ? borderColorDark : borderColorLight;
  const frameOpacity = useTransform(grow, [0, 0.3], [1, 0]);
  const innerScale = useTransform(grow, [0, 1], [reduce ? 1 : 1.08, 1]);

  const titleOpacity = useTransform(progress, [0.02, 0.34], [1, 0]);
  const leftX = useTransform(slide, [0, 1], ["0vw", reduce ? "0vw" : "-30vw"]);
  const rightX = useTransform(slide, [0, 1], ["0vw", reduce ? "0vw" : "30vw"]);
  const topY = useTransform(slide, [0, 1], ["0vh", reduce ? "0vh" : "-18vh"]);
  const bottomY = useTransform(slide, [0, 1], ["0vh", reduce ? "0vh" : "18vh"]);

  const scrim = useTransform(progress, [0.58, 0.8], [0, 1]);
  const paraOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  /* film grain tile, generated in code */
  useEffect(() => {
    const el = grainRef.current;
    if (!el) return;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    if (!g) return;
    const img = g.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    el.style.backgroundImage = `url(${c.toDataURL("image/png")})`;
  }, []);

  const parsedSentences = paragraph
    .replace(/([.!?])\s+/g, "$1\u0000")
    .split("\u0000")
    .map((s) => s.trim())
    .filter(Boolean);
  const sentences = parsedSentences.length ? parsedSentences : [paragraph];
  const totalWords = Math.max(
    1,
    sentences.reduce((n, s) => n + s.split(/\s+/).length, 0)
  );
  let wordIndex = 0;

  return (
    <section
      aria-label={`${brand} hero`}
      className={cn(
        "relative w-full overflow-x-clip bg-[#f5f0e6] text-stone-900 dark:bg-[#05070b] dark:text-stone-100",
        className
      )}
    >
      <div ref={heroRef} className="relative h-[300svh]">
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#f5f0e6] [--hh:20cqh] [--hw:36cqw] [container-type:size] dark:bg-[#05070b] md:[--hh:clamp(9rem,26cqh,17rem)] md:[--hw:clamp(7rem,15cqw,13rem)]">
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(214,178,124,0.26),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(110,140,190,0.10),transparent_70%)]"
          />

          {/* outer hairline frame */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 border border-stone-900/10 dark:border-white/10"
            style={{
              top: frameY,
              bottom: frameY,
              left: frameX,
              right: frameX,
              borderRadius: frameRadius,
              opacity: frameOpacity,
            }}
          />

          {/* media panel */}
          <motion.div
            className="absolute z-10 overflow-hidden border bg-[#f5f0e6] shadow-[0_36px_90px_-38px_rgba(120,88,52,0.5)] dark:bg-[#05070b] dark:shadow-[0_0_90px_-24px_rgba(120,160,220,0.28)]"
            style={{
              top: edgeY,
              bottom: edgeY,
              left: edgeX,
              right: edgeX,
              borderRadius: radius,
              borderColor,
            }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute will-change-transform"
              style={{
                width: "100cqw",
                height: "100cqh",
                left: "calc(50% - 50cqw)",
                top: "calc(50% - 50cqh)",
                scale: innerScale,
              }}
            >
              <WorkspaceScene animate={!reduce} dark={dark} />
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(120,92,58,0.22)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(2,4,8,0.62)_100%)]"
            />
            <div
              ref={grainRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay dark:opacity-[0.09]"
            />
          </motion.div>

          {/* split title */}
          <h1 className="pointer-events-none absolute inset-0 z-20 flex flex-col px-6 py-16 font-serif text-[clamp(2.25rem,11vw,3.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-stone-900 [text-shadow:0_2px_30px_rgba(255,252,244,0.7)] md:flex-row md:items-center md:px-10 md:py-0 md:text-[clamp(2.4rem,6.4vw,7.5rem)] dark:text-stone-50 dark:[text-shadow:0_2px_40px_rgba(0,0,0,0.55)]">
            <motion.span
              className="flex min-h-0 flex-1 items-end justify-center text-center md:items-center md:justify-end md:text-right"
              style={{ x: compact ? 0 : leftX, y: compact ? topY : 0, opacity: titleOpacity }}
            >
              <span className="block">
                {titleLeft.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </motion.span>

            <span
              aria-hidden="true"
              className="block h-[calc(var(--hh)_*_2_+_2.5rem)] w-full shrink-0 md:h-auto md:w-[calc(var(--hw)_*_2_+_3rem)]"
            />

            <motion.span
              className="flex min-h-0 flex-1 items-start justify-center text-center md:items-center md:justify-start md:text-left"
              style={{ x: compact ? 0 : rightX, y: compact ? bottomY : 0, opacity: titleOpacity }}
            >
              <span className="block">
                {titleRight.map((line, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block",
                      i === titleRight.length - 1 && "italic text-amber-700 dark:text-amber-100/90"
                    )}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </motion.span>
          </h1>

          {/* scrim */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: scrim }}
            className="pointer-events-none absolute inset-0 z-[25] bg-[radial-gradient(ellipse_at_center,rgba(246,241,231,0.94)_0%,rgba(246,241,231,0.72)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(5,7,11,0.92)_0%,rgba(5,7,11,0.62)_100%)]"
          />

          {/* paragraph */}
          <motion.div
            style={{ opacity: paraOpacity }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.34em] text-amber-700/80 dark:text-amber-200/70">
              <span className="h-px w-8 bg-amber-700/30 dark:bg-amber-200/40" />
              {paragraphEyebrow}
              <span className="h-px w-8 bg-amber-700/30 dark:bg-amber-200/40" />
            </span>
            <p className="max-w-4xl font-serif text-[clamp(1.5rem,3.6vw,3rem)] font-light leading-[1.14] tracking-[-0.02em] text-stone-900 [text-shadow:0_2px_30px_rgba(255,252,244,0.7)] dark:text-stone-50 dark:[text-shadow:0_2px_40px_rgba(0,0,0,0.6)]">
              {sentences.map((sentence, si) => {
                const isLast = si === sentences.length - 1;
                const dashAt = isLast ? sentence.indexOf(" — ") : -1;
                const italicFrom =
                  dashAt > 0 ? sentence.slice(0, dashAt).split(/\s+/).length : -1;

                return (
                  <span key={si} className="block">
                    {sentence.split(/\s+/).map((word, wi) => {
                      const i = wordIndex++;
                      const start = 0.66 + (i / totalWords) * 0.18;
                      return (
                        <Fragment key={wi}>
                          {wi > 0 && " "}
                          <Word progress={progress} start={start} end={start + 0.08} reduce={reduce}>
                            {italicFrom >= 0 && wi >= italicFrom ? (
                              <em className="italic text-amber-700 dark:text-amber-100/90">{word}</em>
                            ) : (
                              word
                            )}
                          </Word>
                        </Fragment>
                      );
                    })}
                  </span>
                );
              })}
            </p>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-stone-600 dark:text-stone-400"
          >
            <span>{scrollLabel}</span>
            <motion.span
              className="block h-8 w-px origin-top bg-gradient-to-b from-stone-900/45 to-transparent dark:from-white/60"
              animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* header */}
          <header className="absolute inset-x-0 top-0 z-40 grid grid-cols-2 items-center px-6 py-5 md:grid-cols-3 md:px-10 md:py-7">
            <span className="text-xs font-medium uppercase tracking-[0.42em] text-stone-900 dark:text-stone-100">
              {brand}
            </span>
            <span className="hidden text-center text-[11px] uppercase tracking-[0.3em] text-stone-600 md:block dark:text-stone-400">
              {eyebrow}
            </span>
            <button
              id="aurelia-hero-showreel"
              type="button"
              onClick={onCtaClick}
              className="inline-flex cursor-pointer items-center gap-2 justify-self-end rounded-full border border-stone-900/15 bg-white/70 px-4 py-2 text-xs tracking-wide text-stone-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/50 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-100 dark:hover:bg-white/10 dark:focus-visible:ring-amber-200/60"
            >
              <Play className="size-3 fill-current" aria-hidden="true" />
              {ctaLabel}
            </button>
          </header>
        </div>
      </div>
    </section>
  );
}

export default AureliaHero;
