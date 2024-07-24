"use server";

import { db } from "@/db/db";
import { equipmentsTable, setupPhotoTable, setupTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

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

export async function getEquipmentsSetup(id: string) {
  return await db.query.equipmentsTable.findMany({
    where: eq(equipmentsTable.setupId, id),
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
