'use server';

import { db } from '@/db/db';
import { mediaTable, photoEquipmentTable, setupPhotoTable, setupTable, upVoteTable, userTable } from '@/db/schemas';
import { validateRequest } from '@/lib/auth/validate-request';
import { and, desc, eq, is, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { deleteMedia } from '../../media/actions';
import { generateIdFromEntropySize } from 'lucia';

//
//#region deleteSetupPhoto
//

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
    await tx.delete(photoEquipmentTable).where(eq(photoEquipmentTable.setupPhotoId, id));
    await tx.delete(setupPhotoTable).where(eq(setupPhotoTable.id, id));
  });

  await deleteMedia(isOwner[0].mediaId);

  revalidatePath(`/${user!.username}/${isOwner[0].setupId}`);
}

//
//#region deleteTagOnPhoto
//

export async function deleteTagOnPhoto(idTag: string, idPhoto: string) {
  const { user } = await validateRequest();
  if (!user) return;

  const isOwner = await db
    .select({ setupId: setupPhotoTable.setupId })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(photoEquipmentTable, eq(photoEquipmentTable.setupPhotoId, setupPhotoTable.id))
    .where(and(eq(photoEquipmentTable.setupPhotoId, idPhoto), eq(setupTable.userId, user.id), eq(photoEquipmentTable.id, idTag)));

  if (isOwner.length === 0) return;
  await db.delete(photoEquipmentTable).where(eq(photoEquipmentTable.id, idTag));
  revalidatePath(`/${user.username}/${isOwner[0].setupId}`);
}

//
//#region getPaginatedsetupMedias
//

export async function getPaginatedsetupMedias(page: number, limit: number = 20) {
  const data = await db
    .select({
      mediaId: mediaTable.id,
      url: mediaTable.url,
      userId: userTable.id,
      username: userTable.username,
      setupId: setupTable.id,
      title: setupTable.name,
      createdAt: mediaTable.createdAt,
    })
    .from(mediaTable)
    .innerJoin(setupPhotoTable, eq(mediaTable.id, setupPhotoTable.mediaId))
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(userTable, eq(setupTable.userId, userTable.id))
    .where(and(eq(setupTable.thumbnailId, setupPhotoTable.id), eq(setupTable.isPublished, true)))
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
    .where(and(eq(setupTable.thumbnailId, setupPhotoTable.id), eq(setupTable.isPublished, true)));

  const totalPage = Math.ceil(count[0].count / limit);
  return { page, limit, totalPage, data };
}

//
//#region ifPhotoAsThumbnail
//

export async function ifPhotoAsThumbnail(photoId: string) {
  return await db
    .select({
      thumbnailId: setupTable.thumbnailId,
    })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .where(eq(setupPhotoTable.id, photoId));
}

//
//#region updateSetupPhoto
//

export async function updateSetupPhoto(items: any) {
  await Promise.all(
    items.map(async (item: any) => {
      await db
        .update(setupPhotoTable)
        .set({
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        })
        .where(eq(setupPhotoTable.id, item.id));
    }),
  );
}

//
//#region toggleUpVote
//

export const toggleUpVote = async (setupId: string) => {
  const { user } = await validateRequest();

  if (!user) {
    return;
  }

  const upVote = await db.query.upVoteTable.findFirst({
    where: and(eq(upVoteTable.setupId, setupId), eq(upVoteTable.userId, user.id)),
  });

  if (upVote) {
    await db.delete(upVoteTable).where(eq(upVoteTable.id, upVote.id));
  } else {
    await db
      .insert(upVoteTable)
      .values({
        id: generateIdFromEntropySize(10),
        setupId,
        userId: user.id,
      })
      .execute();
  }

  const setup = await db.query.setupTable.findFirst({ where: eq(upVoteTable.id, setupId) });

  revalidatePath(`/${setup?.userId}/${setup?.id}`);
};

//
//#region getSetupUpVotes
//

export const getSetupUpVotes = async (setupId: string) => {
  return await db.query.upVoteTable.findMany({
    where: eq(upVoteTable.setupId, setupId),
  });
};

//
//#region hasUserUpVotedSetup
//
export const hasUserUpVotedSetup = async (setupId: string) => {
  const { user } = await validateRequest();
  if (!user) {
    return false;
  }

  const upvote = await db.query.upVoteTable.findFirst({
    where: and(eq(upVoteTable.setupId, setupId), eq(upVoteTable.userId, user.id)),
  });

  return !!upvote;
};
