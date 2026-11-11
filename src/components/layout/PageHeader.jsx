import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({ eyebrow, title, description }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:pt-16">
        <p className="font-mono text-sm text-accent">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </div>
    </Reveal>
  );
}