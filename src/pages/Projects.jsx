import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DraggableProjectCard } from "@/components/projects/DraggableProjectCard";
import { projects, projectPreviews } from "@/data/projects";

export default function Projects() {
  return (
    <div className="pb-8">
      <PageHeader
        eyebrow="~/projects"
        title="Projects"
        description="A selection of things I've built — full stack apps, open-source work and AI experiments."
      />

      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <DraggableProjectCard
                project={project}
                image={projectPreviews[index % projectPreviews.length]}
                className="min-h-[26rem]"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
            psst — try dragging the cards around · data lives in{" "}
            <code className="rounded bg-muted px-1">src/data/projects.js</code> —
            add images, links and details for each project.
          </p>
        </Reveal>
      </section>
    </div>
  );
}