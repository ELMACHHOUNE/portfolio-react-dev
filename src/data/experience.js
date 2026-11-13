export const experience = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "TechCorp",
    date: "Jan 2024 - Present",
    period: "Jan 2024 - Present",
    description:
      "Lead full-stack development of web applications, building responsive user interfaces with React and TypeScript, and implementing robust backend solutions with Node.js and MongoDB.",
    category: "Development",
    relatedIds: [2],
    status: "in-progress",
    energy: 85,
    clientLogo: "Folder",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "DesignCo",
    date: "Feb 2024 - Mar 2024",
    period: "Feb 2024 - Mar 2024",
    description:
      "Designed intuitive user interfaces and created design systems for multiple client projects, focusing on accessibility and seamless user experiences.",
    category: "Design",
    relatedIds: [1, 3],
    status: "completed",
    energy: 95,
    clientLogo: "Palette",
  },
  {
    id: 3,
    title: "React Developer",
    company: "WebDev Agency",
    date: "Mar 2024 - Apr 2024",
    period: "Mar 2024 - Apr 2024",
    description:
      "Developed and maintained enterprise-level React applications, optimized performance, and implemented complex state management solutions using Redz and Context API.",
    category: "Development",
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 70,
    clientLogo: "Server",
  },
  {
    id: 4,
    title: "QA Tester",
    company: "Quality Labs",
    date: "Apr 2024 - May 2024",
    period: "Apr 2024 - May 2024",
    description:
      "Conducted comprehensive testing of web applications, identified bugs, and collaborated with development teams to improve software quality and user satisfaction.",
    category: "Testing",
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
    clientLogo: "Clipboard",
  },
  {
    id: 5,
    title: "Release Coordinator",
    company: "StartupXYZ",
    date: "May 2024 - Present",
    period: "May 2024 - Present",
    description:
      "Coordinate release cycles, manage deployments to production, and ensure smooth handoffs between development and operations teams.",
    category: "Release",
    relatedIds: [4],
    status: "pending",
    energy: 30,
    clientLogo: "Tag",
  },
];

export const experiencePlaceholder = experience.some(
  (item) => !item.company && !item.period,
);