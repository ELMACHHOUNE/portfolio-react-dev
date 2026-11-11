import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/15 via-card to-card px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something great together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Have a project in mind, or looking for a full stack developer? I&apos;m
            open to freelance work and new opportunities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="group"
              nativeButton={false}
              render={<Link to="/contact" />}>
              Get in touch
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link to="/projects" />}>
              View projects
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}