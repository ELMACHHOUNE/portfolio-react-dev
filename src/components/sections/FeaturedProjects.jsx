import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { DraggableProjectCard } from "@/components/projects/DraggableProjectCard";
import { featuredProjects, projectPreviews } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-mono text-sm text-accent"># featured-work</h2>
              <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Selected projects
              </h3>
              <p className="mt-3 text-muted-foreground">
                A snapshot of what I build. Visit the projects page for the full
                list.
              </p>
            </div>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link to="/projects" />}>
              All projects
              <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <Reveal key={project.id} delay={index * 0.07}>
              <DraggableProjectCard
                project={project}
                image={projectPreviews[index]}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
            psst — try dragging the cards around
          </p>
        </Reveal>
      </div>
    </section>
  );
}