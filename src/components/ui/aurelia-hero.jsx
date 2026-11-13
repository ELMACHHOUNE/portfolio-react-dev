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
/*  Generative landscape                                                      */
/* -------------------------------------------------------------------------- */

const TAU = Math.PI * 2;
const FOG = [74, 88, 108];
const mixRGB = (a, b, k) => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];
const rgb = (c) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;

const hash = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return s - Math.floor(s);
};
const noise = (x, seed) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  const o = seed * 53.7;
  return hash(i + o) * (1 - u) + hash(i + 1 + o) * u;
};
const fbm = (x, seed) => {
  let a = 0.5;
  let f = 1;
  let s = 0;
  for (let o = 0; o < 5; o++) {
    s += a * noise(x * f, seed + o * 7.31);
    f *= 2.07;
    a *= 0.5;
  }
  return s;
};

const RAW_LAYERS = [
  { base: 0.54, amp: 0.13, f: 3.2, speed: 3, color: [44, 57, 76], fog: 0.5, seed: 1, rim: 0.34, mist: 0.07 },
  { base: 0.6, amp: 0.14, f: 4.0, speed: 6, color: [32, 43, 60], fog: 0.42, seed: 2, rim: 0.26, mist: 0.09 },
  { base: 0.67, amp: 0.15, f: 5.0, speed: 11, color: [22, 31, 44], fog: 0.3, seed: 3, rim: 0.16, mist: 0.08 },
  { base: 0.75, amp: 0.15, f: 6.5, speed: 18, color: [14, 20, 30], fog: 0.18, seed: 4, rim: 0.08, mist: 0.06 },
  { base: 0.84, amp: 0.13, f: 8.5, speed: 28, color: [8, 12, 18], fog: 0.08, seed: 5, rim: 0, mist: 0 },
  { base: 0.94, amp: 0.1, f: 11, speed: 42, color: [4, 6, 10], fog: 0, seed: 6, rim: 0, mist: 0 },
].map((l) => ({
  ...l,
  top: rgb(l.color),
  bottom: rgb(mixRGB(l.color, FOG, l.fog)),
}));

const STARS = Array.from({ length: 130 }, (_, i) => ({
  x: hash(i * 3.1 + 1),
  y: Math.pow(hash(i * 5.7 + 2), 1.6) * 0.55,
  r: 0.6 + hash(i * 7.3 + 3) * 1.1,
  a: 0.25 + hash(i * 11.1 + 4) * 0.6,
  f: 0.3 + hash(i * 13.7 + 5) * 1.2,
  p: hash(i * 17.3 + 6) * TAU,
}));

const MOTES = Array.from({ length: 34 }, (_, i) => ({
  x: hash(i * 2.3 + 40),
  y: 0.4 + hash(i * 4.1 + 41) * 0.55,
  vx: 2 + hash(i * 6.7 + 42) * 5,
  vy: 1.5 + hash(i * 8.9 + 43) * 4,
  r: 1 + hash(i * 9.9 + 44) * 1.1,
  a: 0.18 + hash(i * 12.3 + 45) * 0.32,
  f: 0.2 + hash(i * 14.1 + 46) * 0.6,
  p: hash(i * 15.7 + 47) * TAU,
}));

function Landscape({ animate }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let time = 26;
    let running = false;

    const mist = (yc, seed, alpha, t) => {
      for (let k = 0; k < 3; k++) {
        const rx = w * (0.38 + 0.1 * hash(seed + k));
        const ry = h * 0.045;
        const span = w + rx * 2;
        const cx = ((hash(seed * 3 + k) * span + t * (5 + seed * 2)) % span) - rx;
        ctx.save();
        ctx.translate(cx, yc + (k - 1) * h * 0.012);
        ctx.scale(1, ry / rx);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        g.addColorStop(0, `rgba(140,156,180,${alpha})`);
        g.addColorStop(1, "rgba(140,156,180,0)");
        ctx.fillStyle = g;
        ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
        ctx.restore();
      }
    };

    const draw = (t) => {
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      const unit = Math.min(Math.max(w, 600), 1400);
      const sunX = w * 0.5;
      const sunY = h * (0.45 - 0.012 * Math.sin(t * 0.05));
      const R = Math.min(w, h) * 0.05 + 6;
      const pulse = 0.94 + 0.06 * Math.sin(t * 0.35);

      /* sky */
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#04060b");
      sky.addColorStop(0.3, "#0a1220");
      sky.addColorStop(0.5, "#1c293b");
      sky.addColorStop(0.62, "#37455a");
      sky.addColorStop(0.82, "#252f3f");
      sky.addColorStop(1, "#141a24");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      /* stars */
      ctx.fillStyle = "#e8eefc";
      for (const s of STARS) {
        const x = ((s.x + t * 0.0003) % 1) * w;
        const y = s.y * h;
        const tw = 0.65 + 0.35 * Math.sin(t * s.f + s.p);
        const fade = 1 - Math.min(1, y / (h * 0.5));
        ctx.globalAlpha = s.a * tw * fade;
        ctx.fillRect(x, y, s.r, s.r);
      }
      ctx.globalAlpha = 1;

      /* sun halo, disk and anamorphic streak */
      ctx.globalCompositeOperation = "screen";
      const halo = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, R * 11);
      halo.addColorStop(0, `rgba(255,196,140,${0.5 * pulse})`);
      halo.addColorStop(0.12, `rgba(240,160,110,${0.26 * pulse})`);
      halo.addColorStop(0.4, `rgba(150,110,100,${0.09 * pulse})`);
      halo.addColorStop(1, "rgba(80,90,120,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.scale(1, 0.02);
      const rr = w * 0.5;
      const streak = ctx.createRadialGradient(0, 0, 0, 0, 0, rr);
      streak.addColorStop(0, `rgba(255,205,160,${0.55 * pulse})`);
      streak.addColorStop(1, "rgba(255,205,160,0)");
      ctx.fillStyle = streak;
      ctx.fillRect(-rr, -rr, rr * 2, rr * 2);
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";

      const disk = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, R);
      disk.addColorStop(0, "rgba(255,240,218,0.95)");
      disk.addColorStop(1, "rgba(255,207,160,0.9)");
      ctx.fillStyle = disk;
      ctx.beginPath();
      ctx.arc(sunX, sunY, R, 0, TAU);
      ctx.fill();

      /* ridges */
      const step = Math.max(3, Math.ceil(w / 320));
      for (const L of RAW_LAYERS) {
        const base = L.base * h;
        const amp = L.amp * h;
        const shift = t * L.speed;

        const top = new Path2D();
        for (let x = 0; x <= w + step; x += step) {
          const n = fbm(((x + shift) / unit) * L.f + L.seed * 19.7, L.seed);
          const y = base - amp * (n * 1.35 - 0.45);
          if (x === 0) top.moveTo(x, y);
          else top.lineTo(x, y);
        }
        const area = new Path2D(top);
        area.lineTo(w + step, h + 2);
        area.lineTo(0, h + 2);
        area.closePath();

        const g = ctx.createLinearGradient(0, base - amp * 0.85, 0, base + amp * 1.4);
        g.addColorStop(0, L.top);
        g.addColorStop(1, L.bottom);
        ctx.fillStyle = g;
        ctx.fill(area);

        if (L.rim > 0) {
          const rg = ctx.createLinearGradient(sunX - w * 0.5, 0, sunX + w * 0.5, 0);
          rg.addColorStop(0, "rgba(255,196,140,0)");
          rg.addColorStop(0.5, `rgba(255,196,140,${L.rim * pulse})`);
          rg.addColorStop(1, "rgba(255,196,140,0)");
          ctx.strokeStyle = rg;
          ctx.lineWidth = 1.2;
          ctx.stroke(top);
        }

        if (L.mist > 0) mist(base - amp * 0.1, L.seed, L.mist, t);
      }

      /* drifting dust */
      ctx.fillStyle = "#ffd9b0";
      for (const m of MOTES) {
        const x = (((m.x * w + t * m.vx) % w) + w) % w;
        const y = (((m.y * h - t * m.vy) % h) + h) % h;
        const edge = Math.min(1, (y - h * 0.38) / (h * 0.12));
        if (edge <= 0) continue;
        ctx.globalAlpha = m.a * edge * (0.5 + 0.5 * Math.sin(t * m.f + m.p));
        ctx.fillRect(x, y, m.r, m.r);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;
      const cap = cw * ch > 1_200_000 ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, cap);
      w = cw;
      h = ch;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      draw(time);
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      time += dt;
      draw(time);
    };
    const start = () => {
      if (running || !animate) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [animate]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
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

function Timecode({ animate }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const pad = (n) => String(n).padStart(2, "0");
    const start = performance.now() - 252_000;
    const id = window.setInterval(() => {
      const e = (performance.now() - start) / 1000;
      const f = Math.floor((e % 1) * 24);
      const s = Math.floor(e) % 60;
      const m = Math.floor(e / 60) % 60;
      el.textContent = `00:${pad(m)}:${pad(s)}:${pad(f)}`;
    }, 84);
    return () => window.clearInterval(id);
  }, [animate]);
  return <span ref={ref}>00:04:12:00</span>;
}

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
  const borderColor = useTransform(grow, (v) => `rgba(255,255,255,${(0.2 * (1 - v)).toFixed(3)})`);
  const frameOpacity = useTransform(grow, [0, 0.3], [1, 0]);
  const labelOpacity = useTransform(grow, [0, 0.22], [1, 0]);
  const innerScale = useTransform(grow, [0, 1], [reduce ? 1 : 1.4, 1]);

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

  const sentences = paragraph.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [paragraph];
  const totalWords = Math.max(
    1,
    sentences.reduce((n, s) => n + s.split(/\s+/).length, 0)
  );
  let wordIndex = 0;

  return (
    <section
      aria-label={`${brand} hero`}
      className={cn("relative w-full overflow-x-clip bg-[#05070b] text-stone-100", className)}
    >
      <div ref={heroRef} className="relative h-[300svh]">
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] w-full overflow-hidden bg-[#05070b] [--hh:20cqh] [--hw:36cqw] [container-type:size] md:[--hh:clamp(9rem,26cqh,17rem)] md:[--hw:clamp(7rem,15cqw,13rem)]">
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(110,140,190,0.10),transparent_70%)]"
          />

          {/* outer hairline frame */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 border border-white/10"
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
            className="absolute z-10 overflow-hidden border bg-[#05070b] shadow-[0_0_90px_-24px_rgba(120,160,220,0.28)]"
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
              <Landscape animate={!reduce} />
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,8,0.6)_100%)]"
            />
            <div
              ref={grainRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            />

            <motion.div
              aria-hidden="true"
              style={{ opacity: labelOpacity }}
              className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-[9px] uppercase tracking-[0.24em] text-stone-200/80 md:p-4 md:text-[10px]"
            >
              <span>Reel 01 / 12</span>
              <span className="self-end tabular-nums">
                <Timecode animate={!reduce} />
              </span>
            </motion.div>
          </motion.div>

          {/* split title */}
          <h1 className="pointer-events-none absolute inset-0 z-20 flex flex-col px-6 py-16 font-serif text-[clamp(2.25rem,11vw,3.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-stone-50 [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] md:flex-row md:items-center md:px-10 md:py-0 md:text-[clamp(2.4rem,6.4vw,7.5rem)]">
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
                      i === titleRight.length - 1 && "italic text-amber-100/90"
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
            className="pointer-events-none absolute inset-0 z-[25] bg-[radial-gradient(ellipse_at_center,rgba(5,7,11,0.92)_0%,rgba(5,7,11,0.62)_100%)]"
          />

          {/* paragraph */}
          <motion.div
            style={{ opacity: paraOpacity }}
            className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.34em] text-amber-200/70">
              <span className="h-px w-8 bg-amber-200/40" />
              {paragraphEyebrow}
              <span className="h-px w-8 bg-amber-200/40" />
            </span>
            <p className="max-w-5xl font-serif text-[clamp(1.75rem,4.6vw,3.75rem)] font-light leading-[1.12] tracking-[-0.02em] text-stone-50 [text-shadow:0_2px_40px_rgba(0,0,0,0.6)]">
              {sentences.map((sentence, si) => (
                <span
                  key={si}
                  className={cn(
                    "block",
                    si === sentences.length - 1 && si > 0 && "italic text-amber-100/90"
                  )}
                >
                  {sentence.split(/\s+/).map((word, wi) => {
                    const i = wordIndex++;
                    const start = 0.66 + (i / totalWords) * 0.18;
                    return (
                      <Fragment key={wi}>
                        {wi > 0 && " "}
                        <Word progress={progress} start={start} end={start + 0.08} reduce={reduce}>
                          {word}
                        </Word>
                      </Fragment>
                    );
                  })}
                </span>
              ))}
            </p>
          </motion.div>

          {/* scroll cue */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-stone-400"
          >
            <span>{scrollLabel}</span>
            <motion.span
              className="block h-8 w-px origin-top bg-gradient-to-b from-white/60 to-transparent"
              animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* header */}
          <header className="absolute inset-x-0 top-0 z-40 grid grid-cols-2 items-center px-6 py-5 md:grid-cols-3 md:px-10 md:py-7">
            <span className="text-xs font-medium uppercase tracking-[0.42em] text-stone-100">
              {brand}
            </span>
            <span className="hidden text-center text-[11px] uppercase tracking-[0.3em] text-stone-400 md:block">
              {eyebrow}
            </span>
            <button
              id="aurelia-hero-showreel"
              type="button"
              onClick={onCtaClick}
              className="inline-flex cursor-pointer items-center gap-2 justify-self-end rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs tracking-wide text-stone-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
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
