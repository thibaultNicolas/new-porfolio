import { Experience } from "@/types";

/** Timeline entries shown in the Experience section (oldest → newest). */
export const FEATURED_EXPERIENCE_IDS = [
  "exp-4",
  "exp-3",
  "exp-2",
  "exp-1",
] as const;

export type FeaturedExperienceId = (typeof FEATURED_EXPERIENCE_IDS)[number];

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "InputKit",
    role: "Développeur Full Stack",
    period: "avr. 2025 - aujourd'hui",
    description: [
      "Développement et maintenance d'un SaaS de gestion de l'expérience client et employé",
      "Refonte complète de l'application en React, Node.js et Convex",
      "Lead dev de la refonte du site internet en Next.js",
      "Lead dev de Guide InputKit, une application Next.js et Convex",
      "Prompt engineering et intégration de modèles d'IA (OpenAI, Lovable, Cursor) pour la génération automatique de contenu spécifique",
    ],
    technologies: ["React", "Next.js", "Convex", "Node.js", "TypeScript"],
  },
  {
    id: "exp-2",
    company: "Desjardins",
    role: "Analyste-programmeur",
    period: "avr. 2024 - avr. 2025",
    description: [
      "Participation à la conception et au développement de projets complexes au sein des systèmes internes",
      "Développement backend (.NET, APIs) et frontend pour des applications robustes et performantes",
      "Accompagnement des stagiaires et collaboration avec l'équipe pour assurer la montée en compétences",
      "Réalisation de code reviews et mise en place de bonnes pratiques pour garantir la qualité et la maintenabilité du code",
      "Contribution à l'optimisation et à la scalabilité des systèmes",
    ],
    technologies: [".NET", "C#", "API", "Postman", "SQL Server", "JavaScript", "TypeScript"],
  },
  {
    id: "exp-3",
    company: "Desjardins",
    role: "Développeur",
    period: "avr. 2023 - avr. 2024",
    description: [
      "Exploitation, maintenance et développement des systèmes et des infrastructures",
      "Développement d'applications internes avec .NET",
      "Collaboration avec les équipes pour assurer la stabilité des systèmes",
    ],
    technologies: [".NET", "C#", "Git", "SQL Server"],
  },
  {
    id: "exp-4",
    company: "Imago Communication",
    role: "Développeur",
    period: "mai 2022 - avr. 2023",
    description: [
      "Développement et intégration de sites web sur WordPress, Shopify et Prestashop à partir de maquettes graphiques",
      "Gestion des serveurs et DNS, maintenance et mises à jour régulières des sites",
      "Collaboration avec les équipes pour livrer des projets web sur mesure et fonctionnels",
      "Optimisation des performances et résolution des problèmes techniques pour garantir la stabilité des sites",
    ],
    technologies: ["WordPress", "Shopify", "Prestashop", "PHP", "Bootstrap", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "exp-5",
    company: "Imago Communication",
    role: "Stagiaire en développement Web",
    period: "mars 2022 - mai 2022",
    description: [
      "Développement de sites internet WordPress",
      "Apprentissage des bonnes pratiques de développement web",
      "Collaboration avec l'équipe de développement",
    ],
    technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "exp-6",
    company: "Imago Communication",
    role: "Stagiaire en développement Web",
    period: "mars 2021 - mai 2021",
    description: [
      "Développement de sites internet WordPress",
      "Initiation au développement web et aux CMS",
      "Support aux développeurs seniors",
    ],
    technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
  },
];
