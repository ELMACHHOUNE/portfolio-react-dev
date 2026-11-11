import { TechBadge } from "@/components/ui/TechBadge";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { cn } from "@/lib/utils";

export function DraggableProjectCard({ project, image, className }) {
  return (
    <DraggableCardContainer className="h-full">
      <DraggableCardBody className={cn("h-full border border-border/60", className)}>
        <div className="pointer-events-none flex h-full flex-col">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={image}
              alt={project.title}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col pt-4">
            {project.title.startsWith("[Placeholder]") && (
              <span className="mb-1.5 inline-flex w-fit rounded-md bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                placeholder
              </span>
            )}
            <h3 className="font-heading text-lg font-semibold leading-snug">
              {project.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <TechBadge key={tech} tech={tech} variant="outline" />
              ))}
            </div>
          </div>
        </div>
      </DraggableCardBody>
    </DraggableCardContainer>
  );
}