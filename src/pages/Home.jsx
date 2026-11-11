import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { TechCubesSection } from "@/components/sections/TechCubesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <TechCubesSection />
      <FeaturedProjects />
    </>
  );
}