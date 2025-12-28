import Image from "next/image";

import HeroCTA from "./HeroCTA";

export default function Hero() {
  return (
    <section className="hero-section relative h-screen overflow-hidden w-full bg-gradient-to-r from-[#0D1321] via-[#1D2D44] to-[#3E5C76]">
      {/* Hero inner */}
      <div className="hero-inner relative h-full flex overflow-hidden">
        <div className="w-layout-blockcontainer main-container container mx-auto px-6 md:px-12 lg:px-16">
          <div className="hero-content-block relative flex justify-between items-center gap-4 h-full">
            {/* Contenu texte à gauche */}
            <div className="hero-header-content flex flex-col flex-none justify-center items-start max-w-[415px] pb-[55px] z-10">
              {/* Header block */}
              <div className="header-block mb-6">
                <h1 className="display-header text-5xl md:text-6xl lg:text-7xl  text-[#F0EBD8] leading-[1.1]">
                  <span>Je transforme vos </span>
                  <span className="main-span italic">idées</span> en{" "}
                  <span className="main-span italic">solutions digitales.</span>
                </h1>
              </div>

              {/* Summary block */}
              <div className="summery-block top-20px mb-8">
                <p className="body-text-default text-lg md:text-xl text-[#F0EBD8]/90 font-light leading-[1.4]">
                  Développeur Full Stack passionné, je crée des applications web
                  modernes et performantes. De la conception à la mise en
                  production, je transforme vos besoins en expériences
                  utilisateur exceptionnelles.
                </p>
              </div>

              {/* Button block */}
              <div className="button-block top-52px">
                <HeroCTA />
              </div>
            </div>

            {/* Image block à droite */}
            <div className="hero-image-block relative z-10 w-[91%] transition-[filter] duration-400 h-full flex items-center">
              <div className="relative w-full h-full min-h-[500px]">
                <Image
                  src="/images/person-1.webp"
                  alt="Nicolas Thibault - Développeur Full Stack"
                  fill
                  priority
                  className="hero-image object-cover h-full static overflow-visible"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formes de fond décoratives */}
        <div className="hero-bg-shape left absolute top-0 left-0 w-1/2 h-full z-0 pointer-events-none">
          <div className="bg-circle w-full h-full rounded-full bg-gradient-to-r from-transparent via-[#748CAB]/20 to-[#748CAB]/30 blur-[80px]"></div>
        </div>
        <div className="hero-bg-shape right absolute top-0 w-[40%] h-full -right-[25%] z-0 pointer-events-none">
          <div className="bg-circle right w-full h-full rounded-full bg-gradient-to-l from-transparent via-[#F0EBD8]/20 to-[#F0EBD8]/30 blur-[80px]"></div>
        </div>
      </div>
    </section>
  );
}
