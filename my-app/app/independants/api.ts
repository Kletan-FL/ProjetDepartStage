"use server";

import { redirect } from "next/navigation";
import {
  IndependantFormData,
  independantSchema,
} from "@/lib/independantSchema";
import { revalidatePath } from "next/cache";

export async function createIndependant(data: IndependantFormData) {
  const parsed = independantSchema.parse(data);

  await fetch("http://localhost:3000/api/independants", {
    method: "POST",
    body: JSON.stringify(parsed),
  });

  revalidatePath("/independants");

  redirect("/independants");
}

export async function updateIndependant(id: number, data: IndependantFormData) {
  const parsed = independantSchema.parse(data);

  await fetch(`http://localhost:3000/api/independants/${id}`, {
    method: "PUT",
    body: JSON.stringify(parsed),
  });

  revalidatePath(`/independants/${id}`);
  revalidatePath("/independants");

  redirect(`/independants/${id}`);
}
