/**
 * Bouton permettant de supprimer un client.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteClient } from "@/lib/actions/clients";
import { Button } from "@/components/ui/button";

export default function DeleteClientButton({ clientId }: { clientId: number }) {
  const router = useRouter();

  // Stocke un message d'erreur si la suppression échoue
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      setError(null); // Réinitialise l'erreur avant une nouvelle tentative
      await deleteClient(clientId); // Suppression du client
      router.refresh();
    } catch (err) {
      // Gestion d'erreur
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  return (
    <div className="inline-block">
      {/* Bouton de suppression */}
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Supprimer
      </Button>

      {/* Affichage du message d'erreur si nécessaire */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
