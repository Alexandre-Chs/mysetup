"use server";

import { db } from "@/db/db";
import {
  equipmentsTable,
  mediaTable,
  setupPhotoTable,
  setupTable,
  upVoteTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { count, eq } from "drizzle-orm";
import { ThumbsDown } from "lucide-react";
import { revalidatePath } from "next/cache";

export async function getSetup(id: string, username: string) {
  const setup = (await db.query.setupTable.findFirst({
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
      user: true,
    },
  })) as any;

  if (setup?.user.username !== username) return undefined;

  const thumbnailId = setup?.thumbnailId;

  if (setup) {
    setup.setupPhotos.sort((a: any, b: any) => {
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

export async function getThumbnailPhoto(thumbnailId: string) {
  const result = await db
    .select()
    .from(setupPhotoTable)
    .leftJoin(mediaTable, eq(setupPhotoTable.mediaId, mediaTable.id))
    .where(eq(setupPhotoTable.id, thumbnailId));
  return result[0]?.media?.url;
}
