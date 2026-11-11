import { GraduationCap, Calendar, Award } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { Card, CardContent } from "@/components/ui/card";
import { CTA } from "@/components/sections/CTA";
import { education, educationPlaceholder } from "@/data/education";

export default function Education() {
  return (
    <div className="pb-8">
      <PageHeader
        eyebrow="~/education"
        title="Education & certifications"
        description="Degrees, diplomas, certifications and professional training."
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {education.length === 0 ? (
          <Reveal>
            <p className="text-muted-foreground">
              No education entries yet. Add your background to{" "}
              <code className="rounded bg-muted px-1">src/data/education.js</code>.
            </p>
          </Reveal>
        ) : (
          <ol className="relative space-y-8 border-l border-border pl-8">
            {education.map((item, index) => (
              <li key={index} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] flex size-6 items-center justify-center rounded-full border bg-background text-accent">
                  <GraduationCap className="size-3" />
                </span>
                <Reveal delay={index * 0.05}>
                  <Card className="h-full">
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="font-heading text-lg font-medium">
                          {item.degree || "[Degree]"}
                        </h2>
                        {item.period && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                            <Calendar className="size-3.5" />
                            {item.period}
                          </span>
                        )}
                      </div>
                      {item.institution && (
                        <p className="mt-1 text-sm text-foreground">
                          {item.institution}
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
                    </CardContent>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
        {educationPlaceholder && (
          <Reveal delay={0.1}>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="size-4" />
              Note: education data is currently a placeholder. Edit{" "}
              <code className="rounded bg-muted px-1">src/data/education.js</code>{" "}
              to add your real background. No institutions, degrees or dates have
              been invented.
            </p>
          </Reveal>
        )}
      </section>

      <CTA />
    </div>
  );
}