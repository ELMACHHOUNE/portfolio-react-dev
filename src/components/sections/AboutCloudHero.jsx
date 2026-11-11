import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { Button } from "@/components/ui/button";
import { identity } from "@/data/social";

// Theme-aware sky palettes that match the project's accent (oklch 0.62 0.165 259)
// Light: soft blue gradient used in Aceternity demo
// Dark: deep navy that blends with `dark` background (oklch 0.135 …)
const LIGHT_SKY = {
  top: "#2b5ea3",
  bottom: "#8cbfe8",
  cloud: "#fbf8f2",
};

const DARK_SKY = {
  top: "#0f2a4a",
  bottom: "#1d4d85",
  cloud: "#e8eef7",
};

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(el.classList.contains("dark"));
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    // also listen to prefers-color-scheme for systems without class toggle
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setIsDark(el.classList.contains("dark"));
    mql.addEventListener?.("change", onChange);
    return () => {
      observer.disconnect();
      mql.removeEventListener?.("change", onChange);
    };
  }, []);

  return isDark;
}

export function AboutCloudHero() {
  const reduceMotion = useReducedMotion();
  const isDark = useIsDark();
  const palette = isDark ? DARK_SKY : LIGHT_SKY;

  return (
    <section
      aria-label="About hero"
      className="relative w-full overflow-hidden bg-gradient-to-t from-[#8cbfe8] to-[#3876ba] dark:from-[#081428] dark:to-[#0f2a4a]">
      {/* Shader layer — half-res + scale-200 keeps 60fps; same trick as demo */}
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}>
        <div className="absolute h-1/2 w-1/2 origin-top-left scale-200">
          <CloudShader
            speed={0.7}
            count={6}
            cloudColor={palette.cloud}
            skyTopColor={palette.top}
            skyBottomColor={palette.bottom}
            className="absolute inset-0"
          />
        </div>
      </motion.div>

      {/* legibility overlays — strengthens contrast without muting clouds */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent dark:from-black/45 dark:via-black/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />

      {/* subtle wing accent — cropped, low opacity, drifts like demo but portfolio tone */}
      <motion.img
        src="https://assets.aceternity.com/components/plane-wing.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-0 hidden w-[62%] max-w-[720px] opacity-30 mix-blend-luminosity select-none md:block dark:opacity-20"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
        loading="eager"
        decoding="async"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl">
          <p className="inline-flex items-center gap-2 font-mono text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 backdrop-blur">
              <Sparkles className="size-3.5" />
              ~/about
            </span>
            <span className="hidden text-white/60 sm:inline">
              — Software Engineer · Full Stack
            </span>
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgba(15,42,67,0.35)] sm:text-5xl lg:text-6xl">
            About me
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_8px_rgba(15,42,67,0.25)] sm:text-lg">
            Software Engineer and Full Stack Developer focused on building
            modern, scalable web applications and teaching others to do the
            same. I ship with the MERN stack, modern React, and AI-powered
            workflows.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {identity.roles.slice(0, 4).map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/15">
                {role}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="group rounded-full bg-white text-black hover:bg-white/90 shadow-lg shadow-black/10"
              nativeButton={false}
              render={<Link to="/projects" />}>
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/15 hover:text-white"
              nativeButton={false}
              render={<Link to="/contact" />}>
              Get in touch
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/70">
            <span className="font-semibold text-white">Clarity over cleverness</span>
            {" · users first · simple by default"}
          </p>
        </motion.div>
      </div>

      {/* bottom fade into next section (page background) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
