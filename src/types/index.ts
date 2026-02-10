// Types globaux du projet

export interface Project {
  id: string;
  title: string;
  descriptionKey: string;
  longDescriptionKey: string;
  roleKey: string;
  impactKey: string;
  image: string;
  technologies: string[];
  link: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}
