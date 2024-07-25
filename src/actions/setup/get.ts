"use server";

import { db } from "@/db/db";
import { equipmentsTable, setupPhotoTable, setupTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSetup(id: string) {
  return await db.query.setupTable.findFirst({
    where: eq(setupTable.id, id),
    with: {
      setupPhotos: {
        with: {
          media: true,
          photoEquipments: {
            with: {
              equipment: true,
            },
          },
        },
      },
    },
  });
}

export async function getEquipmentsSetup(setupId: string) {
  return await db.query.equipmentsTable.findMany({
    where: eq(equipmentsTable.setupId, setupId),
  });
}

export async function getOneImageSetup(id: string) {
  return await db.query.setupPhotoTable.findFirst({
    where: eq(setupPhotoTable.setupId, id),
    with: {
      media: true,
    },
  });
}
