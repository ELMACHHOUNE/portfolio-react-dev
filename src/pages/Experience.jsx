import { Briefcase, Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { CTA } from "@/components/sections/CTA";
import { experience, experiencePlaceholder } from "@/data/experience";

export default function Experience() {
  return (
    <div className="pb-8">
      <PageHeader
        eyebrow="~/experience"
        title="Professional experience"
        description="A chronological look at where I've worked and what I built."
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {experience.length === 0 ? (
          <Reveal>
            <p className="text-muted-foreground">
              No experience entries yet. Add your history to{" "}
              <code className="rounded bg-muted px-1">src/data/experience.js</code>.
            </p>
          </Reveal>
        ) : (
          <ol className="relative space-y-10 border-l border-border pl-8">
            {experience.map((item, index) => (
              <li key={index} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] flex size-6 items-center justify-center rounded-full border bg-background text-accent">
                  <Briefcase className="size-3" />
                </span>
                <Reveal delay={index * 0.05}>
                  <article className="rounded-xl border bg-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-heading text-lg font-medium">
                        {item.role || "[Role]"}
                      </h2>
                      {item.period && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                          <Calendar className="size-3.5" />
                          {item.period}
                        </span>
                      )}
                    </div>
                    {(item.company || item.location) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.company && (
                          <span className="text-foreground">{item.company}</span>
                        )}
                        {item.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="mx-1 size-3.5" />
                            {item.location}
                          </span>
                        )}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <TechBadge key={tech} tech={tech} variant="outline" />
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
        {experiencePlaceholder && (
          <Reveal delay={0.1}>
            <p className="mt-6 text-xs text-muted-foreground">
              Note: experience data is currently a placeholder. Edit{" "}
              <code className="rounded bg-muted px-1">src/data/experience.js</code>{" "}
              to add your real work history. No companies or dates have been
              invented.
            </p>
          </Reveal>
        )}
      </section>

      <CTA />
    </div>
  );
}