import { Header, Footer } from "@/components/layout";
import {
  Hero,
  About,
  TechStack,
  Experience,
  Projects,
  Process,
  Contact,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
