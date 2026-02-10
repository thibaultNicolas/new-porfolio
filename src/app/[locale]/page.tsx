import {
  Hero,
  About,
  TechStack,
  Experience,
  Projects,
  Process,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Process />
      </main>
    </>
  );
}
