"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { equipmentsTable } from "@/db/schemas/equipments";
import { validateRequest } from "@/lib/auth/validate-request";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSetup(name: string, description?: string) {
  const { user } = await validateRequest();

  await db
    .insert(setupTable)
    .values({
      id: generateIdFromEntropySize(10),
      userId: user!.id,
      name,
      description,
    })
    .returning();

  revalidatePath("/profile/" + user!.username);
}

export async function createNewSetup(
  name: string,
  equipments: any,
  description: string
) {
  const { user } = await validateRequest();
  let setupId;
  try {
    setupId = generateIdFromEntropySize(10);
    await db
      .insert(setupTable)
      .values({
        id: setupId,
        userId: user!.id,
        name,
        description,
      })
      .returning();

    for (let i = 0; i < equipments.length; i++) {
      await db
        .insert(equipmentsTable)
        .values({
          id: generateIdFromEntropySize(10),
          setupId: setupId,
          name: equipments[i].name,
          type: equipments[i].type,
          url: equipments[i].url,
        })
        .returning();
    }
  } catch (e) {
    console.log(e);
  }

  redirect(`/${user!.username}/${setupId}`);
}
