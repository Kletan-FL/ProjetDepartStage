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
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    try {
      setError(null);
      await deleteIndependant(independantId);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  return (
    <div className="inline-block">
      <Button variant="destructive" size="sm" onClick={handleDelete}>
        Supprimer
      </Button>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
