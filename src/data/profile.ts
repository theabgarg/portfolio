export interface SocialLink {
  name: string;
  url: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: "Advanced" | "Intermediate";
}

export interface SkillGroup {
  id: "languages" | "frameworks" | "tools";
  title: string;
  items: SkillItem[];
}

export const PROFILE = {
  name: "Abhishek Garg",
  shortName: "Abhishek",
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  banner: "/template.avif",
  githubUsername: "theabgarg",
  blogUrl: "https://blog.theabgarg.com",
  resumeUrl:
    "https://drive.google.com/file/d/1OT9HUP44F-7CoGmz1KzFBlX0Lye4fCoS/view?usp=sharing",
  heroSummary:
    "Results-driven Software Engineer with over 5+ years of experience in architecting and optimizing high-performance web applications.",
  aboutIntro:
    "I build high-performance financial applications and trading platforms with React.js, Next.js, Node.js, and Golang.",
  about: [
    "I specialize in end-to-end architecture, bridging complex backend systems with highly optimized, real-time frontend interfaces to deliver scalable, production-ready applications.",
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/theabgarg" },
    { name: "LinkedIn", url: "https://linkedin.com/in/theabgarg" },
    { name: "Blog", url: "https://blog.theabgarg.com" },
  ] as SocialLink[],
};

export const ROTATING_TITLES = ["software engineer"];
export const SKILLS = [
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Golang",
  "React.js",
  "Next.js",
  "Gin",
  "Gorilla",
  "Echo",
  "Redux",
  "Node.js",
  "Express.js",
  "Material UI",
  "Tailwind CSS",
  "GraphQL",
  "Git",
  "GitHub",
  "Webpack",
  "Docker",
  "Jest",
  "React Testing Library",
  "Cypress",
  "Lighthouse",
  "React DevTools",
  "AWS",
  "Jira",
  "Confluence",
  "Figma",
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { name: "HTML", level: "Advanced" },
      { name: "CSS", level: "Advanced" },
      { name: "Javascript", level: "Advanced" },
      { name: "Typescript", level: "Advanced" },
      { name: "Golang", level: "Intermediate" },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    items: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Gin", level: "Intermediate" },
      { name: "Gorilla", level: "Intermediate" },
      { name: "Echo", level: "Intermediate" },
      { name: "Redux", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "Express.js", level: "Advanced" },
      { name: "Material UI", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "GraphQL", level: "Advanced" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    items: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced" },
      { name: "Webpack", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
      { name: "Jest", level: "Advanced" },
      { name: "React Testing Library", level: "Advanced" },
      { name: "Cypress", level: "Advanced" },
      { name: "Lighthouse", level: "Advanced" },
      { name: "React DevTools", level: "Advanced" },
      { name: "AWS", level: "Advanced" },
      { name: "Jira", level: "Advanced" },
      { name: "Confluence", level: "Advanced" },
      { name: "Figma", level: "Advanced" },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "MTS - II",
    company: "SMC Global Securities Pvt Ltd",
    location: "Delhi, India",
    type: "Permanent",
    period: "May 2023 - Present",
    description:
      "SMC Global provides end-to-end investment and trading solutions.",
    responsibilities: [
      "Built a real-time trading platform from scratch using React.js, Material UI, and Golang.",
      "Designed a reusable component library to speed up delivery and maintain UI consistency.",
      "Implemented Redux architecture and Golang WebSocket APIs for stable real-time workflows.",
      "Reduced bundle size by 73% and improved load time by 50%+ through targeted performance optimizations.",
      "Established Jest and React Testing Library practices, reducing critical production bugs by 35%.",
      "Contributed across deployment, security hardening, VAPT fixes, and observability with Sentry, Lighthouse, and Web Vitals.",
    ],
  },
  {
    title: "Application Developer",
    company: "National Informatics Centre",
    location: "Delhi, India",
    type: "Contract",
    period: "May 2022 - April 2023",
    description:
      "National Informatics Centre is the premier ICT organization of the Government of India.",
    responsibilities: [
      "Built an Electron.js + React.js desktop MVP with secure auth, deep links, and Parichay SSO.",
      "Enhanced Aarogya Setu with multilingual support, blood donation, hospital discovery, and UX improvements.",
      "Implemented unit and integration testing across major releases, reducing critical defects by 30%.",
      "Executed Cypress and Postman E2E testing for cross-platform releases, improving defect detection by 25%.",
    ],
  },
  {
    title: "Software Developer",
    company: "NamaSYS",
    location: "Delhi, India (Remote)",
    type: "Full-Time",
    period: "April 2021 - April 2022",
    description:
      "NamaSYS is a service-based company delivering software solutions across domains.",
    responsibilities: [
      "Built a scalable influencer marketing platform using React.js, Node.js, DynamoDB, AWS, and Google OAuth.",
      "Developed an annotation product with React.js, P5.js, and Azure.",
      "Delivered a responsive SEO-focused company website with PHP, CSS, and JavaScript.",
      "Contributed to a desktop accounting system using Electron.js, React.js, Node.js, SQLite, and MongoDB.",
      "Resolved 120+ frontend/backend issues and improved system throughput by 22% through performance tuning.",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Delhi Technical Campus",
    degree: "B.tech - computer science and engineering",
    period: "2016 - 2020",
    description: "completed b.tech in computer science major.",
  },
];
