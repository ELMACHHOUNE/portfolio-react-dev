import { useNavigate } from "react-router-dom";
import { AureliaHero } from "@/components/ui/aurelia-hero";
import { TechStack } from "@/components/sections/TechStack";
import { TechCubesSection } from "@/components/sections/TechCubesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HeroOutro } from "@/components/sections/HeroOutro";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <AureliaHero
        brand=""
        eyebrow="Full Stack Developer"
        titleLeft={["Building", "scalable"]}
        titleRight={["web", "experiences"]}
        paragraph="I design and ship fast, accessible products with React, Next.js, Node.js and AI — turning complex ideas into clean, reliable software."
        paragraphEyebrow="The engineer"
        ctaLabel="View work"
        scrollLabel="Scroll"
        onCtaClick={() => navigate("/projects")}
      />
      <TechStack />
      <TechCubesSection />
      <FeaturedProjects />
      <HeroOutro />
    </>
  );
}
