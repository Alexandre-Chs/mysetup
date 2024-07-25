"use server";

import { db } from "@/db/db";
import { equipmentsTable, setupTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createSetup(setupId: string) {
  const { user } = await validateRequest();

  return await db.delete(setupTable).where(eq(setupTable.id, setupId));
}

export async function deleteOneEquipment(elementName: string, setupId: string) {
  const { user } = await validateRequest();

  const currentSetup = await db
    .select({ userId: setupTable.userId })
    .from(setupTable)
    .where(eq(setupTable.id, setupId));

  if (currentSetup[0].userId !== user!.id) {
    return { status: "error", message: "You are not the owner of this setup" };
  }

  await db
    .delete(equipmentsTable)
    .where(
      and(
        eq(equipmentsTable.setupId, setupId),
        eq(equipmentsTable.name, elementName)
      )
    );

  revalidatePath(`/${user!.username}/${setupId}`);
}
