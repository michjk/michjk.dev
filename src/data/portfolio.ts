export interface Identity {
  name: string;
  handle: string;
  role: string;
  comment: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  blog: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  team: string;
  dates: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  specialization: string;
  dates: string;
  gpa: string;
  location: string;
}

export interface LinkItem {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "external" | "pen";
}

export const identity: Identity = {
  name: "Michael Jonathan",
  handle: "michjk.dev",
  role: "Backend & Data Engineer",
  comment: "// backend & data engineer",
  location: "Singapore",
  github: "https://github.com/michjk",
  linkedin: "https://linkedin.com/in/mijonathan",
  portfolio: "#",
  blog: "#",
};

export const about: string[] = [
  "I build backend systems and data infrastructure that teams can rely on. Currently working on marketing data platforms and ad-tech pipelines at Traveloka.",
  "Previously at Sea Limited, where I built IT Center 2.0 — an internal ticketing and asset management system used across Garena, Shopee, SeaMoney, and SeaBank.",
  "NTU Computer Science graduate. I care about correctness, observable systems, and shipping things that work.",
];

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Traveloka",
    team: "AdTech Team",
    dates: "Jun 2025 — Mar 2026",
    location: "Singapore",
    description:
      "Improved marketing data platform for sending marketing signals and inventory data to external ad partners, directly driving user acquisition growth.",
    bullets: [
      "Contributed to 23% quarter-over-quarter transaction increase from key ad partner as of 2026 Q1.",
      "Reduced dispute resolution time with ad partners from 1 week to within 1 day through robust logging and auditability.",
      "Reduced incidents related to the data platform through robust observability.",
    ],
    tags: ["Java", "Python", "BigQuery", "Dataflow", "Pub/Sub", "Apache Beam", "Airflow", "Terraform"],
  },
  {
    role: "Software Engineer",
    company: "Sea Limited",
    team: "MIS Team",
    dates: "Apr 2021 — Feb 2025",
    location: "Singapore",
    description:
      "Created and maintained backend of IT Center 2.0 — an internal ticketing and asset management system used across Sea and its subsidiaries (Garena, Shopee, SeaMoney, SeaBank).",
    bullets: [
      "Improved efficiency of IT agents to process tickets and improve trackability of company assets.",
      "Delivered key modules: ticketing, asset management, user management, service account management, announcement, FAQ, SLA.",
    ],
    tags: ["Python", "Django", "Celery", "MySQL", "Redis", "Elasticsearch", "Docker", "Kubernetes"],
  },
  {
    role: "Software Engineer",
    company: "UCARE.AI",
    team: "Development Team",
    dates: "Jan 2020 — Apr 2021",
    location: "Singapore",
    description: "Designed and implemented machine learning platform on Kubernetes for healthcare analytics.",
    bullets: ["Delivered core components: dataset management, feature store, and authentication."],
    tags: ["Python", "Flask", "Go", "PostgreSQL", "Elasticsearch", "GCP", "Azure"],
  },
  {
    role: "Software Engineer in Test",
    company: "Autodesk",
    team: "Vault Team",
    dates: "Aug 2018 — Oct 2019",
    location: "Singapore",
    description: "Developed automation testing tools and code coverage pipelines for Autodesk Vault.",
    bullets: [
      "Built automation testing tools using C# and C++ for Autodesk Vault add-ins to reduce QA effort in manual testing.",
      "Developed a pipeline to gather code coverage information of the entire Autodesk Vault codebase.",
    ],
    tags: ["C#", "C++"],
  },
  {
    role: "Software Engineer Intern",
    company: "Traveloka",
    team: "Backend Team",
    dates: "May 2017 — Aug 2017",
    location: "Jakarta",
    description: "Researched and evaluated AWS Elastic Beanstalk for achieving immutable infrastructure.",
    bullets: [],
    tags: ["AWS"],
  },
  {
    role: "Software Engineer Intern",
    company: "Autodesk",
    team: "User Experience Team",
    dates: "Jan 2017 — May 2017",
    location: "Singapore",
    description: "Developed an AutoCAD Mechanical plugin in C# using ObjectARX for recommending commands to users.",
    bullets: [],
    tags: ["C#"],
  },
];

export const education: Education = {
  school: "Nanyang Technological University (NTU)",
  degree: "B.Eng in Computer Science",
  specialization: "Information System and Intelligence System",
  dates: "2014 — 2018",
  gpa: "4.48 / 5.0 — Second Class Honors",
  location: "Singapore",
};

export const skills: SkillGroup[] = [
  { group: "Languages",        items: ["Python", "Go", "Java", "TypeScript", "JavaScript", "C#", "C++"] },
  { group: "Backend",          items: ["Django", "Flask", "Spring", "Gin", "Echo", "Celery"] },
  { group: "Data Engineering", items: ["Apache Beam", "Airflow", "BigQuery", "Dataflow", "Pub/Sub"] },
  { group: "Databases",        items: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch"] },
  { group: "Infrastructure",   items: ["Docker", "Kubernetes", "Terraform", "AWS", "GCP"] },
  { group: "Observability",    items: ["Prometheus", "Grafana", "Datadog"] },
];

export const links: LinkItem[] = [
  { label: "GitHub",    url: "https://github.com/michjk",          icon: "github" },
  { label: "LinkedIn",  url: "https://linkedin.com/in/mijonathan", icon: "linkedin" },
  { label: "Portfolio", url: "#",                                   icon: "external" },
  { label: "Blog",      url: "#",                                   icon: "pen" },
];
