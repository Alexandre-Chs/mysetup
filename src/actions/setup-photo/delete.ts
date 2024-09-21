"use server";

import { db } from "@/db/db";
import {
  photoEquipmentTable,
  setupPhotoTable,
  setupTable,
  userTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteSetupPhoto(id: string) {
  const { user } = await validateRequest();

  const photoUser = await db.query.setupPhotoTable.findFirst({
    with: {
      setup: true,
    },
    where: (setupPhotoTable, { eq }) => eq(setupPhotoTable.id, id),
  });

  console.log({ photoUser, user });
  if (photoUser?.setup.userId !== user!.id) {
    throw new Error("Unauthorized");
  }

  await db.delete(setupPhotoTable).where(eq(setupPhotoTable.id, id));

  revalidatePath(`/${user!.username}/${photoUser.setup.id}`);
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

  if (!isOwner) return;
  await db.delete(photoEquipmentTable).where(eq(photoEquipmentTable.id, idTag));
  revalidatePath(`/${user.username}/${isOwner[0].setupId}`);
}
