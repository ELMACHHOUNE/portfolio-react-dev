import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Mail, Command } from "lucide-react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { Keyboard } from "@/components/ui/keyboard";
import { Reveal } from "@/components/ui/Reveal";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { identity, socialLinks } from "@/data/social";

const roles = identity.roles;

const velocityTech = [
  "React",
  "Next.js",
  "TypeScript",
  "MongoDB",
  "OpenAI",
  "Gemini",
  "Docker",
  "Vercel",
];

const socials = [
  { label: "LinkedIn", href: socialLinks.linkedin, Icon: IconBrandLinkedin },
  { label: "Facebook", href: socialLinks.facebook, Icon: IconBrandFacebook },
  { label: "GitHub", href: socialLinks.github, Icon: IconBrandGithub },
  { label: "WhatsApp", href: socialLinks.whatsapp, Icon: IconBrandWhatsapp },
  { label: "Instagram", href: socialLinks.instagram, Icon: IconBrandInstagram },
  { label: "Email", href: socialLinks.email ? `mailto:${socialLinks.email}` : "", Icon: Mail },
];

function RoleCycler() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="flex flex-wrap items-center gap-x-3 text-lg font-medium text-stone-400 sm:text-xl">
      <span className="font-mono text-amber-200/80">$</span>
      <span>{roles[index]}</span>
    </div>
  );
}

export function HeroOutro() {
  return (
    <section
      aria-label="Let's build something together"
      className="relative overflow-hidden bg-[#05070b] text-stone-100">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:pb-20 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* copy */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-stone-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {identity.availability ? "Open to new work" : "Currently booked"}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-[clamp(2.25rem,6vw,4.25rem)] font-light leading-[1.02] tracking-[-0.03em]">
                Have an idea
                <br />
                worth{" "}
                <em className="italic text-amber-100/90">building?</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-5">
                <RoleCycler />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-400">
                I&apos;m open to freelance projects, full-time roles and
                technical collaborations. If you want a product that feels fast,
                looks sharp and ships on time — let&apos;s make it real.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2.5 text-sm font-medium text-[#05070b] transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60">
                  Get in touch
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-stone-100 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60">
                  View projects
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex items-center gap-1">
                {socials.map(({ label, href, Icon }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex size-9 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-colors hover:border-white/25 hover:text-stone-100">
                      <Icon className="size-4" />
                    </a>
                  ) : null
                )}
              </div>
            </Reveal>
          </div>

          {/* interactive keyboard */}
          <Reveal delay={0.15}>
            <div className="relative flex justify-center lg:justify-end">
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 rounded-full bg-amber-400/5 blur-3xl"
              />
              <div>
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-stone-500">
                  <Command className="size-3.5 text-amber-200/70" />
                  <span>press any key</span>
                </div>
                <Keyboard enableSound showPreview />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee */}
      <ScrollVelocityContainer className="relative border-t border-white/5 py-6">
        <ScrollVelocityRow baseVelocity={5} direction={1}>
          <div className="flex items-center">
            {roles.map((role) => (
              <Fragment key={role}>
                <span className="font-serif text-2xl font-light tracking-tight text-stone-200 sm:text-4xl">
                  {role}
                </span>
                <span className="mx-6 text-amber-200/50">✦</span>
              </Fragment>
            ))}
          </div>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={5} direction={-1}>
          <div className="flex items-center">
            {velocityTech.map((tech) => (
              <Fragment key={tech}>
                <span className="font-mono text-sm uppercase tracking-[0.3em] text-stone-500 sm:text-lg">
                  {tech}
                </span>
                <span className="mx-6 text-stone-700">/</span>
              </Fragment>
            ))}
          </div>
        </ScrollVelocityRow>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05070b] to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05070b] to-transparent sm:w-32"
        />
      </ScrollVelocityContainer>
    </section>
  );
}
