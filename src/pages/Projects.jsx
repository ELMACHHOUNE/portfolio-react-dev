import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DraggableProjectCard } from "@/components/projects/DraggableProjectCard";
import { projects, projectPreviews } from "@/data/projects";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const demoTimelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 10,
  },
];

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
      </section>

      {/* Work Experience Radial Orbit Timeline */}
      <RadialOrbitalTimeline timelineData={demoTimelineData} />
    </div>
  );
}
