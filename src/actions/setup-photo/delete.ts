"use server";

import { db } from "@/db/db";
import {
  mediaTable,
  photoEquipmentTable,
  setupPhotoTable,
  setupTable,
} from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { and, eq, is } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

  const media = await db
    .select({ type: mediaTable.type, mediaId: mediaTable.id })
    .from(mediaTable)
    .where(eq(mediaTable.id, isOwner[0].mediaId));
  const type = media[0].type.split("/")[1];
  const fileName = media[0].mediaId + "." + type;

  await db.transaction(async (tx) => {
    await tx
      .delete(photoEquipmentTable)
      .where(eq(photoEquipmentTable.setupPhotoId, id));
    await tx.delete(setupPhotoTable).where(eq(setupPhotoTable.id, id));
    await deleteSingleS3Photo(user.id, isOwner[0].setupId, fileName);
  });

  revalidatePath(`/${user!.username}/${isOwner[0].setupId}`);
}

export async function deleteTagOnPhoto(idTag: string, idPhoto: string) {
  const { user } = await validateRequest();
  if (!user) return;

  const isOwner = await db
    .select({ setupId: setupPhotoTable.setupId })
    .from(setupPhotoTable)
    .innerJoin(setupTable, eq(setupPhotoTable.setupId, setupTable.id))
    .innerJoin(
      photoEquipmentTable,
      eq(photoEquipmentTable.setupPhotoId, setupPhotoTable.id)
    )
    .where(
      and(
        eq(photoEquipmentTable.setupPhotoId, idPhoto),
        eq(setupTable.userId, user.id),
        eq(photoEquipmentTable.id, idTag)
      )
    );

  if (isOwner.length === 0) return;
  await db.delete(photoEquipmentTable).where(eq(photoEquipmentTable.id, idTag));
  revalidatePath(`/${user.username}/${isOwner[0].setupId}`);
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

async function deleteSingleS3Photo(
  userId: string,
  setupId: string,
  photoFilename: string
) {
  const photoKey = `users/${userId}/setups/${setupId}/${photoFilename}`;

  const deleteParams = {
    Bucket: process.env.S3_BUCKET!,
    Key: photoKey,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted photo: ${photoKey}`);
  } catch (error) {
    console.error("Error deleting S3 photo:", error);
    throw error;
  }
}
