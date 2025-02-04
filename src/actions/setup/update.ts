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

export async function updateSetupPublished(setupId: string, isPublished: boolean) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ isPublished })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}

export async function updateSetupName(setupId: string, name: string) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ name })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}

export async function setThumbnail(setupId: string, setupPhotoId: string) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ thumbnailId: setupPhotoId })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}
