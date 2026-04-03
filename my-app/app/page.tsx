import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto mt-20 flex flex-col items-center gap-8 text-center px-4">
      <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center text-muted-foreground text-sm">
        <Image src="/logo.png" alt="Dinoplush" width={128} height={128} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Annuaire Future Legends</h1>
        <p className="text-muted-foreground">
          Annuaire et plateforme de gestion des indépendants, clients et
          prestations. <br /> Retrouvez ici l&apos; ensemble des freelances
          portés, des entreprises partenaires et des missions.
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/independants">Indépendants</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/clients">Clients</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/prestations">Prestations</Link>
        </Button>
      </div>
    </div>
  );
}
