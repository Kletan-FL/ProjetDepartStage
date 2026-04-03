import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annuaire Future Legends",
  description: "Annuaire de gestion pour Future Legends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <nav className="border-b px-6 py-3 flex items-center gap-8">
          <Link href="/" className="font-bold text-lg">
            Future Legends
          </Link>
          <div className="flex gap-6">
            <Link href="/independants" className="text-sm hover:underline">
              Indépendants
            </Link>
            <Link href="/clients" className="text-sm hover:underline">
              Clients
            </Link>
            <Link href="/prestations" className="text-sm hover:underline">
              Prestations
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
