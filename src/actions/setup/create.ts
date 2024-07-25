"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { equipmentsTable } from "@/db/schemas/equipments";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSetup() {
  const { user } = await validateRequest();
  const setupId = generateIdFromEntropySize(10);

  await db
    .insert(setupTable)
    .values({
      id: setupId,
      userId: user!.id,
    })
    .returning();

  redirect(`/${user!.username}/${setupId}`);
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

export async function createNewEquipments(
  setupId: string,
  equipments: {
    type: "equipments" | "accessories" | "desk" | "others";
    name: string;
    url?: string | undefined;
  }
) {
  const { user } = await validateRequest();

  const currentSetup = await db
    .select({ userId: setupTable.userId })
    .from(setupTable)
    .where(eq(setupTable.id, setupId));

  if (!currentSetup || currentSetup[0].userId !== user!.id) {
    console.log("User is not the owner of the setup");
    return { status: "error", message: "You are not the owner of this setup" };
  }

  await db.insert(equipmentsTable).values({
    id: generateIdFromEntropySize(10),
    setupId: setupId,
    name: equipments.name,
    type: equipments.type,
    url: equipments.url,
  });

  revalidatePath(`/${user!.username}/${setupId}`);
}
