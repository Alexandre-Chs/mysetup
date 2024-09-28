"use server";

import { db } from "@/db/db";
import {
  equipmentsTable,
  setupPhotoTable,
  setupTable,
  upVoteTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { count, eq } from "drizzle-orm";
import { ThumbsDown } from "lucide-react";
import { revalidatePath } from "next/cache";

export async function getSetup(id: string) {
  const setup = await db.query.setupTable.findFirst({
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
      equipments: true,
      upVotes: true,
    },
  });

  const thumbnailId = setup?.thumbnailId;

  if (setup) {
    setup.setupPhotos.sort((a, b) => {
      if (a.id === thumbnailId) return -1;
      if (b.id === thumbnailId) return 1;
      return 0;
    });
  }

  return setup;
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
