export const experience = [
  {
    company: "",
    role: "Full Stack Developer",
    period: "",
    location: "",
    description:
      "[Placeholder] Professional experience details will be added here. This section is data-driven — update this file to reflect your real work history.",
    technologies: [],
  },
];

export const experiencePlaceholder = experience.some(
  (item) => !item.company && !item.period,
);