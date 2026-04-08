/**
 * Bouton permettant de supprimer un idnépendant.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteIndependant } from "@/lib/actions/independants";
import { Button } from "@/components/ui/button";

export default function DeleteIndependantButton({
  independantId,
}: {
  independantId: number;
}) {
  const router = useRouter();

  // Stocke un message d'erreur si la suppression échoue
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      setError(null); // Réinitialise l'erreur avant une nouvelle tentative
      await deleteIndependant(independantId); // Suppression de l'indépendant
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
