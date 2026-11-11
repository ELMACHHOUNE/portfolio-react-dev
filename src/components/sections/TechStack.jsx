import { createRef, forwardRef, useMemo, useRef } from "react";
import { Terminal } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { getTechIcon } from "@/lib/techIcons";
import { allSkills } from "@/data/skills";
import { identity } from "@/data/social";
import { cn } from "@/lib/utils";

const Circle = forwardRef(function Circle({ className, children, title }, ref) {
  return (
    <div
      ref={ref}
      title={title}
      className={cn(
        "z-10 flex size-11 items-center justify-center rounded-full border border-border/80 bg-card/90 shadow-lg shadow-black/5 backdrop-blur sm:size-12",
        className,
      )}>
      {children}
    </div>
  );
});

const TechNode = forwardRef(function TechNode({ tech, className }, ref) {
  const entry = getTechIcon(tech);
  if (!entry) {
    return (
      <Circle ref={ref} title={tech} className={className}>
        <span className="text-[10px] font-semibold text-muted-foreground">
          {tech}
        </span>
      </Circle>
    );
  }
  const { Icon, color } = entry;
  return (
    <Circle ref={ref} title={tech} className={className}>
      <Icon
        aria-hidden="true"
        className="size-5 sm:size-6"
        style={{ color }}
      />
    </Circle>
  );
});

const leftSkills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Vite",
];

const rightSkills = [
  "Node.js",
  "MongoDB",
  "Express.js",
  "OpenAI API",
  "Gemini API",
  "LangChain",
];

const beamSkills = new Set([...leftSkills, ...rightSkills]);
const remainingSkills = allSkills.filter((skill) => !beamSkills.has(skill));

const curvatures = [75, 40, 10, -10, -40, -75];
const yOffsets = [-14, -7, 0, 0, 7, 14];

export function TechStack() {
  const containerRef = useRef(null);
  const hubRef = useRef(null);
  const leftRefs = useMemo(() => leftSkills.map(() => createRef()), []);
  const rightRefs = useMemo(() => rightSkills.map(() => createRef()), []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <h2 className="font-mono text-sm text-accent"># tech-stack</h2>
          <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I work with
          </h3>
          <p className="mt-3 text-muted-foreground">
            A focused, modern toolchain used to build reliable products end to
            end.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative overflow-hidden rounded-3xl border bg-muted/30">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
          />

          <div
            ref={containerRef}
            className="relative flex h-[420px] items-center justify-center overflow-hidden p-8 sm:h-[520px] sm:p-12">
            <div className="flex w-full max-w-xl items-stretch justify-between gap-4 sm:gap-8">
              <div className="flex flex-col justify-center gap-3">
                {leftSkills.map((skill, i) => (
                  <TechNode key={skill} tech={skill} ref={leftRefs[i]} />
                ))}
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <Circle
                  ref={hubRef}
                  className="size-20 border-accent/40 bg-gradient-to-br from-accent/20 to-violet-600/20 sm:size-24">
                  <Terminal className="size-8 text-accent sm:size-10" />
                </Circle>
                <div className="text-center">
                  <p className="text-sm font-semibold leading-tight">
                    {identity.firstName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Full-Stack · AI
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                {rightSkills.map((skill, i) => (
                  <TechNode key={skill} tech={skill} ref={rightRefs[i]} />
                ))}
              </div>
            </div>

            {leftSkills.map((_, i) => (
              <AnimatedBeam
                key={`left-${i}`}
                containerRef={containerRef}
                fromRef={leftRefs[i]}
                toRef={hubRef}
                curvature={curvatures[i]}
                endYOffset={yOffsets[i]}
                duration={6}
                delay={i * 0.35}
                pathColor="gray"
                pathOpacity={0.15}
                gradientStartColor="#22d3ee"
                gradientStopColor="#3b82f6"
              />
            ))}
            {rightSkills.map((_, i) => (
              <AnimatedBeam
                key={`right-${i}`}
                containerRef={containerRef}
                fromRef={hubRef}
                toRef={rightRefs[i]}
                curvature={curvatures[i]}
                endYOffset={yOffsets[i]}
                reverse
                duration={6}
                delay={i * 0.35}
                pathColor="gray"
                pathOpacity={0.15}
                gradientStartColor="#f472b6"
                gradientStopColor="#8b5cf6"
              />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col items-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            And more
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {remainingSkills.map((skill) => (
              <TechBadge key={skill} tech={skill} variant="outline" />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}