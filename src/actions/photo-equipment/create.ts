"use server";

import { db } from "@/db/db";
import {
  equipmentsTable,
  photoEquipmentTable,
  setupPhotoTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";

export async function createPhotoEquipment(
  setupPhotoId: string,
  equipmentId: string,
  x: number,
  y: number
) {
  const { user } = await validateRequest();

  if (!user) return;
  // get setupPhoto
  const setupPhoto = await db.query.setupPhotoTable.findFirst({
    where: eq(setupPhotoTable.id, setupPhotoId),
    with: {
      setup: {
        with: {
          user: true,
        },
      },
    },
  });

  if (!setupPhoto || setupPhoto.setup.userId !== user.id) return;

  const equipment = await db.query.equipmentsTable.findFirst({
    where: eq(equipmentsTable.id, equipmentId),
    with: {
      setup: {
        with: {
          user: true,
        },
      },
    },
  });

  if (!equipment || equipment.setup?.userId !== user.id) return;

  await db.insert(photoEquipmentTable).values({
    id: generateIdFromEntropySize(10),
    setupPhotoId,
    equipmentId,
    x,
    y,
  });

  revalidatePath(`/${setupPhoto.setup.userId}/${setupPhoto.setup.id}`);
}
