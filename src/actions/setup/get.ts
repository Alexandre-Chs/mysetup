"use server";

import { db } from "@/db/db";
import { equipmentsTable, setupTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getSetup(id: string) {
  return await db.query.setupTable.findFirst({
    where: eq(setupTable.id, id),
    with: {
      setupPhotos: {
        with: {
          media: true,
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
