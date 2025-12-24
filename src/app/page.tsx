import { Hero } from "@/components/sections";
import { Button } from "@/components/ui";

export default function Home() {
  return (
    <div className="pt-0 m-0 p-0">
      <main className="m-0 p-0">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">
            Exemple d&apos;utilisation
          </h2>
          <Button variant="primary">Bouton Principal</Button>
          <Button variant="secondary" className="ml-4">
            Bouton Secondaire
          </Button>
        </div>
      </main>
    </div>
  );
}
