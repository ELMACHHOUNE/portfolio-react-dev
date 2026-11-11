import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Mail, Command } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Keyboard } from "@/components/ui/keyboard";
import { Spotlight } from "@/components/ui/spotlight";
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
    <div className="flex flex-wrap items-center gap-x-3 text-lg font-medium text-muted-foreground sm:text-xl">
      <span className="font-mono text-accent">$</span>
      <span>{roles[index]}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden">
      <Spotlight className="left-[-20%] top-[-10%]" />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-20 lg:pt-20">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Available for new opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {identity.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-3">
            <RoleCycler />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {identity.tagline}{" "}
            <span className="font-mono text-sm text-muted-foreground/80">
              &gt; MERN · Next.js · TypeScript · AI integration
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="group"
              nativeButton={false}
              render={<Link to="/projects" />}>
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link to="/contact" />}>
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mt-8 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) =>
              href ? (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  nativeButton={false}
                  render={<a href={href} target="_blank" rel="noreferrer" />}
                  aria-label={label}
                  title={label}>
                  <Icon />
                </Button>
              ) : (
                <span
                  key={label}
                  title={`${label} — add this link in src/data/social.js`}
                  className="flex size-8 cursor-help items-center justify-center rounded-md text-muted-foreground/50">
                  <Icon className="size-4" />
                </span>
              ),
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="order-1 flex justify-center lg:order-2">
          <div className="relative w-fit">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Command className="size-3.5 text-accent" />
              <span>press any key</span>
            </div>
            <Keyboard enableSound showPreview />
          </div>
        </motion.div>
      </div>

      <ScrollVelocityContainer className="relative z-10 pb-10">
        <ScrollVelocityRow baseVelocity={6} direction={1}>
          <div className="flex items-center">
            {roles.map((role) => (
              <Fragment key={role}>
                <span className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {role}
                </span>
                <span className="mx-6 text-2xl text-accent sm:text-4xl">
                  ✦
                </span>
              </Fragment>
            ))}
          </div>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1}>
          <div className="flex items-center">
            {velocityTech.map((tech) => (
              <Fragment key={tech}>
                <span className="font-mono text-lg uppercase tracking-[0.3em] text-muted-foreground sm:text-2xl">
                  {tech}
                </span>
                <span className="mx-6 text-muted-foreground/30">/</span>
              </Fragment>
            ))}
          </div>
        </ScrollVelocityRow>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32"
        />
      </ScrollVelocityContainer>
    </section>
  );
}