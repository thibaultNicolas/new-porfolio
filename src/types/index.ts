/**
 * Types TypeScript pour le portfolio
 */

export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  category: "frontend" | "backend" | "tools" | "other";
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string[];
}
