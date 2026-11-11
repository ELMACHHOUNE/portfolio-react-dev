import { Code2, Layers, GraduationCap, Handshake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/ui/TechBadge";
import { CTA } from "@/components/sections/CTA";
import { AboutCloudHero } from "@/components/sections/AboutCloudHero";
import { identity } from "@/data/social";
import { skillGroups } from "@/data/skills";

const whatIDo = [
  {
    icon: Layers,
    title: "Full Stack Development",
    description:
      "Building end-to-end web applications with the MERN stack — from API design to polished interfaces.",
  },
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "Crafting responsive, accessible, high-performance interfaces with React, Next.js and TypeScript.",
  },
  {
    icon: GraduationCap,
    title: "Technical Instruction",
    description:
      "Explaining complex software concepts clearly to students and junior developers.",
  },
  {
    icon: Handshake,
    title: "Freelance Delivery",
    description:
      "Shipping reliable software for clients, with clear communication and measurable outcomes.",
  },
];

export default function About() {
  return (
    <div className="pb-8">
      <AboutCloudHero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="font-mono text-sm text-accent"># profile</h2>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                {identity.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {identity.roles.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a software engineer who enjoys the full journey of a
                product: understanding the problem, designing the architecture,
                writing clean code, and shipping something reliable.
              </p>
              <p>
                My day-to-day work centers on the MERN stack and modern React
                tooling, with a growing focus on integrating generative AI into
                real applications — prompt engineering, RAG pipelines, and the
                OpenAI and Gemini APIs.
              </p>
              <p>
                I also teach and mentor, because explaining engineering clearly
                makes the whole team (and the ecosystem) better.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <h2 className="font-mono text-sm text-accent"># what-i-do</h2>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">
              What I do
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whatIDo.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <item.icon className="size-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <h2 className="font-mono text-sm text-accent"># skills</h2>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            Technical skills
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <TechBadge key={skill} tech={skill} variant="outline" />
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="font-mono text-sm text-accent"># philosophy</h2>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                Development philosophy
              </h3>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Clarity over cleverness.</strong>{" "}
                  Code is read far more often than it&apos;s written. I favor
                  readable, well-named, testable code over unnecessary
                  complexity.
                </p>
                <p>
                  <strong className="text-foreground">Users first, always.</strong>{" "}
                  Performance, accessibility and responsive design are not
                  afterthoughts — they&apos;re part of the definition of done.
                </p>
                <p>
                  <strong className="text-foreground">Simple by default.</strong>{" "}
                  I introduce new tools and abstractions only when they solve a
                  real problem, keeping apps fast and maintainable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </div>
  );
}