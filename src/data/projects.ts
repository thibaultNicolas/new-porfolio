import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "High-performance e-commerce solution with real-time inventory management.",
    longDescription:
      "Built a scalable e-commerce platform handling 10K+ daily transactions. Implemented advanced caching strategies, optimized database queries, and created an intuitive admin dashboard.",
    image: "/images/project-1.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    role: "Lead Full Stack Developer",
    impact: "Increased conversion rate by 35% and reduced page load time by 60%",
    link: "https://example.com",
    github: "https://github.com/example",
    featured: true,
  },
  {
    id: "project-2",
    title: "SaaS Dashboard",
    description: "Analytics dashboard for B2B SaaS with real-time data visualization.",
    longDescription:
      "Developed a comprehensive analytics dashboard with custom charts, real-time updates, and advanced filtering. Built with performance in mind, handling millions of data points.",
    image: "/images/project-2.jpg",
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "MongoDB"],
    role: "Senior Frontend Developer",
    impact: "Enabled data-driven decisions for 500+ enterprise customers",
    link: "https://example.com",
    featured: true,
  },
  {
    id: "project-3",
    title: "Mobile App Backend",
    description: "Scalable REST API and real-time features for mobile application.",
    longDescription:
      "Architected and built a robust backend system supporting 100K+ active users. Implemented real-time notifications, file uploads, and comprehensive API documentation.",
    image: "/images/project-3.jpg",
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "WebSocket"],
    role: "Backend Architect",
    impact: "Achieved 99.9% uptime and sub-100ms API response times",
    link: "https://example.com",
    featured: false,
  },
];
