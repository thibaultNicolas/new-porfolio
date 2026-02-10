// Refined by Gemini for nicolasthibault@hotmail.ca
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

/**
 * SEO Dynamique : Génère le titre de l'onglet selon le projet
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Nicolas Thibault`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

/**
 * Build-time generation : Prévient l'erreur de chunking et booste la performance
 */
export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  routing.locales.forEach((locale) => {
    projects.forEach((project) => {
      params.push({ locale, id: project.id });
    });
  });
  return params;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("projects");

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) notFound();

  // Navigation infinie : retourne au premier projet après le 50ème
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="bg-white min-h-screen pb-20">
      <section className="pt-32 pb-20 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Navigation : Back Link */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-jet-black/40 hover:text-burnt-peach transition-colors font-jakarta font-bold text-sm uppercase tracking-widest"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-2 duration-300">
              ←
            </span>
            {t("backToProjects")}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <span className="text-burnt-peach font-jakarta font-bold uppercase tracking-[0.2em] text-sm">
            {project.role}
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold text-jet-black font-jakarta tracking-tighter leading-[0.9]">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-jet-black/60 font-medium leading-relaxed pt-4">
            {project.impact}
          </p>
        </div>

        {/* Placeholder pour Image / Mockup */}
        <div className="mt-20 aspect-[16/8] bg-[#F8F9FA] rounded-[40px] overflow-hidden border border-jet-black/5 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-burnt-peach/5 to-transparent" />
          {/* Note : Utilise <Image /> de next/image ici quand tes assets seront prêts 
            pour profiter de l'optimisation automatique de Next.js.
          */}
        </div>

        {/* Content Grid */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar : Stack & Links */}
          <aside className="lg:col-span-4 space-y-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-jet-black/30 mb-4">
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-jet-black/5 text-jet-black text-xs font-bold rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jet-black font-bold border-b border-jet-black/20 pb-1 hover:border-burnt-peach transition-colors inline-block w-fit"
                >
                  Live Preview ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jet-black/40 font-medium text-sm hover:text-jet-black transition-colors inline-block w-fit"
                >
                  View Source Code
                </a>
              )}
            </div>
          </aside>

          {/* Main Content : Long Description */}
          <article className="lg:col-span-8">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-jet-black/30 mb-6">
              About the project
            </h4>
            <div className="prose prose-xl font-jakarta text-jet-black/80 leading-relaxed max-w-none">
              <p className="whitespace-pre-line">
                {project.longDescription || project.description}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Infinite Scroll Footer */}
      <section className="mt-32 border-t border-jet-black/10">
        <Link
          href={`/projects/${nextProject.id}`}
          className="group block py-40 px-6 text-center hover:bg-jet-black/[0.01] transition-colors"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-jet-black/40 group-hover:text-burnt-peach transition-colors">
            Next Project
          </span>
          <h2 className="text-5xl md:text-8xl font-extrabold text-jet-black font-jakarta tracking-tighter mt-4 group-hover:scale-105 transition-transform duration-500 ease-out">
            {nextProject.title} →
          </h2>
        </Link>
      </section>
    </main>
  );
}
