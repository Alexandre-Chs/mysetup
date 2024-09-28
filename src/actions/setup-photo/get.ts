"use server";

import { db } from "@/db/db";
import {
  mediaTable,
  setupPhotoTable,
  setupTable,
  userTable,
} from "@/db/schemas";
import { desc, eq } from "drizzle-orm";

export async function getAllSetupsPhotos() {
  return await db
    .select({
      mediaId: mediaTable.id,
      url: mediaTable.url,
      userId: userTable.id,
      username: userTable.username,
      setupId: setupTable.id,
      createdAt: mediaTable.createdAt,
    })
    .from(mediaTable)
    .innerJoin(setupPhotoTable, eq(mediaTable.id, setupPhotoTable.mediaId))
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(userTable, eq(setupTable.userId, userTable.id))
    .where(eq(setupTable.thumbnailId, setupPhotoTable.id))
    .orderBy(desc(mediaTable.createdAt));
}

export async function ifPhotoAsThumbnail(photoId: string) {
  return await db
    .select({
      thumbnailId: setupTable.thumbnailId,
    })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .where(eq(setupPhotoTable.id, photoId));
}
