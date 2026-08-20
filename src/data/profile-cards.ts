export const EXPERIENCE_IDS = [
  "exp-1",
  "exp-2",
  "exp-3",
  "exp-4",
  "exp-5",
  "exp-6",
] as const;

export const FEATURED_EXPERIENCE_IDS = [
  "exp-1",
  "exp-2",
  "exp-3",
  "exp-4",
] as const;

export type ExperienceId = (typeof EXPERIENCE_IDS)[number];
export type FeaturedExperienceId = (typeof FEATURED_EXPERIENCE_IDS)[number];

export const EDUCATION_IDS = ["edu-4", "edu-3", "edu-2", "edu-1"] as const;

export type EducationId = (typeof EDUCATION_IDS)[number];
