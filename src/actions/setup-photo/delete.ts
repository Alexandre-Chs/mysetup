"use server";

import { db } from "@/db/db";
import {
  mediaTable,
  photoEquipmentTable,
  setupPhotoTable,
  setupTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq, is } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { deleteMedia } from "../media/delete";

export async function deleteSetupPhoto(id: string) {
  const { user } = await validateRequest();
  if (!user) return;

  const isOwner = await db
    .select({
      setupId: setupPhotoTable.setupId,
      mediaId: setupPhotoTable.mediaId,
    })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .where(and(eq(setupPhotoTable.id, id), eq(setupTable.userId, user.id)));

  if (isOwner.length === 0) return;


  await db.transaction(async (tx) => {
    await tx
      .delete(photoEquipmentTable)
      .where(eq(photoEquipmentTable.setupPhotoId, id));
    await tx.delete(setupPhotoTable).where(eq(setupPhotoTable.id, id));
  });

  await deleteMedia(isOwner[0].mediaId);

  revalidatePath(`/${user!.username}/${isOwner[0].setupId}`);
}

export async function deleteTagOnPhoto(idTag: string, idPhoto: string) {
  const { user } = await validateRequest();
  if (!user) return;

  const isOwner = await db
    .select({ setupId: setupPhotoTable.setupId })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(
      photoEquipmentTable,
      eq(photoEquipmentTable.setupPhotoId, setupPhotoTable.id)
    )
    .where(
      and(
        eq(photoEquipmentTable.setupPhotoId, idPhoto),
        eq(setupTable.userId, user.id),
        eq(photoEquipmentTable.id, idTag)
      )
    );

  if (isOwner.length === 0) return;
  await db.delete(photoEquipmentTable).where(eq(photoEquipmentTable.id, idTag));
  revalidatePath(`/${user.username}/${isOwner[0].setupId}`);
}
