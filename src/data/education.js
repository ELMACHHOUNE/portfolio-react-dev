export const education = [
  {
    institution: "",
    degree: "",
    period: "",
    description:
      "[Placeholder] Education and certification details will be added here. This section is data-driven — update this file to reflect your real background.",
    technologies: [],
  },
];

export const educationPlaceholder = education.some(
  (item) => !item.institution && !item.degree && !item.period,
);