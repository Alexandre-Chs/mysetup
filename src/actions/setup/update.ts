"use server";

import { db } from "@/db/db";
import { equipmentsTable, setupTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateSetupDescription(
  setupId: string,
  description: string
) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ description })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}
