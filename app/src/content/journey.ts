export interface JourneyItem {
  title: string;
  date: string;
  company: string;
  role: string;
  description: string;
}

export const journeyData: JourneyItem[] = [
  {
    title: "The Spark",
    date: "Jan '21 - Jun '21",
    company: "Piaggio Vietnam",
    role: "Marketing Intern",
    description: "My career began with the iconic Vespa brand, where I discovered the power of brand storytelling and community. This internship ignited my passion and set the course for my journey in marketing.",
  },
  {
    title: "The Bird's-Eye View",
    date: "Nov '21 - Sep '22",
    company: "MSB",
    role: "CMO Secretary",
    description: "In this unique hybrid role, I supported the CMO with high-level departmental operations and annual budget management, while also proactively taking on Brand Team responsibilities. This allowed me to build a strong foundation in brand strategy and led directly to my promotion.",
  },
  {
    title: "The Proving Ground",
    date: "Sep '22 - Oct '24",
    company: "MSB",
    role: "Brand Management Executive",
    description: "In this role, I put strategic knowledge into practice, owning brand campaigns from start to finish. It was my proving ground for translating vision into tangible results and leading projects with confidence.",
  },
  {
    title: "The Agency Leap",
    date: "Dec '24 - Present",
    company: "Kim Chi Agency",
    role: "Account Executive",
    description: "Currently, as an Account Executive, I leverage my deep client-side expertise to manage end-to-end projects for a diverse portfolio of brands, acting as the strategic bridge between client needs and creative execution.",
  },
];
