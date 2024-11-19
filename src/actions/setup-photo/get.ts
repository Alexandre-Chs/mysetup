"use server";

import { db } from "@/db/db";
import {
  mediaTable,
  setupPhotoTable,
  setupTable,
  userTable,
} from "@/db/schemas";
import { desc, eq, and, sql } from "drizzle-orm";

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
    .where(and(
      eq(setupTable.thumbnailId, setupPhotoTable.id),
      eq(setupTable.isPublished, true),
    ))
    .orderBy(desc(mediaTable.createdAt));
}

export async function getPaginatedSetupPhotos(page: number, limit: number = 20) {
  const data = await db
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
    .where(and(
      eq(setupTable.thumbnailId, setupPhotoTable.id),
      eq(setupTable.isPublished, true),
    ))
    .orderBy(desc(mediaTable.createdAt))
    .limit(limit)
    .offset(page * limit);

  const count = await db
    .select({
      count: sql<number>`CAST(COUNT(*) AS INTEGER)`,
    })
    .from(mediaTable)
    .innerJoin(setupPhotoTable, eq(mediaTable.id, setupPhotoTable.mediaId))
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(userTable, eq(setupTable.userId, userTable.id))
    .where(and(
      eq(setupTable.thumbnailId, setupPhotoTable.id),
      eq(setupTable.isPublished, true),
    ));

  console.log(count[0].count);
  console.log(Math.ceil(count[0].count / limit));
  const totalPage = Math.ceil(count[0].count / limit);
  return { page, limit, totalPage, data };
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
