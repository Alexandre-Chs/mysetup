"use server";

import { db } from "@/db/db";
import {
  equipmentsTable,
  mediaTable,
  setupPhotoTable,
  setupTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createSetup(setupId: string) {
  const { user } = await validateRequest();

  return await db.delete(setupTable).where(eq(setupTable.id, setupId));
}

export async function deleteOneEquipment(elementName: string, setupId: string) {
  const { user } = await validateRequest();

  const currentSetup = await db
    .select({ userId: setupTable.userId })
    .from(setupTable)
    .where(eq(setupTable.id, setupId));

  if (currentSetup[0].userId !== user!.id) {
    return { status: "error", message: "You are not the owner of this setup" };
  }

  await db
    .delete(equipmentsTable)
    .where(
      and(
        eq(equipmentsTable.setupId, setupId),
        eq(equipmentsTable.name, elementName)
      )
    );

  revalidatePath(`/${user!.username}/${setupId}`);
}

export async function deleteSetup(setupId: string) {
  const { user } = await validateRequest();

  await db.transaction(async (tx) => {
    const setupPhotos = await tx
      .select({ mediaId: setupPhotoTable.mediaId })
      .from(setupPhotoTable)
      .where(eq(setupPhotoTable.setupId, setupId));

    await tx
      .update(setupTable)
      .set({ thumbnailId: null })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));

    await tx
      .delete(equipmentsTable)
      .where(eq(equipmentsTable.setupId, setupId));

    await tx
      .delete(setupPhotoTable)
      .where(eq(setupPhotoTable.setupId, setupId));

    await tx
      .delete(setupTable)
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));

    for (const photo of setupPhotos) {
      await tx.delete(mediaTable).where(eq(mediaTable.id, photo.mediaId));
    }
  });

  await deleteS3Folder(user!.id, setupId);

  revalidatePath(`/${user!.username}`);
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_SECRET!,
  },
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  tls: true,
});

async function deleteS3Folder(userId: string, setupId: string) {
  const folderKey = `users/${userId}/setups/${setupId}/`;

  const listParams = {
    Bucket: process.env.S3_BUCKET!,
    Prefix: folderKey,
  };

  try {
    const listedObjects = await s3Client.send(
      new ListObjectsV2Command(listParams)
    );
    if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

    const deleteParams = {
      Bucket: process.env.S3_BUCKET!,
      Delete: { Objects: listedObjects.Contents.map(({ Key }) => ({ Key })) },
    };

    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    if (listedObjects.IsTruncated) await deleteS3Folder(userId, setupId);
  } catch (error) {
    console.error("Error deleting S3 folder:", error);
    throw error;
  }
}
