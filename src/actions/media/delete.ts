"use server";

import { db } from "@/db/db";
import { mediaTable, userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";

export async function deleteMedia(mediaId: string) {
  const { user } = await validateRequest();

  const media = await db.query.mediaTable.findFirst({
    where: (media, { eq, and }) => and(eq(media.id, mediaId), eq(media.userId, user!.id)),
  });

  if (!media) return { status: "error", message: "Media not found" };

  await db.delete(mediaTable).where(eq(mediaTable.id, mediaId));

  if (process.env.NODE_ENV === "development") {
    try {
      fs.unlinkSync(`./public/uploads/${media.key}`);
    } catch (error) {
      console.error("Error deleting file", error);
    }
  } else {
    const s3 = new S3({
      credentials: {
        accessKeyId: process.env.S3_KEY!,
        secretAccessKey: process.env.S3_SECRET!,
      },
      region: process.env.S3_REGION!,
      endpoint: process.env.S3_ENDPOINT!,
      tls: true,
    });

    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET!,
      Key: media.key,
    });
  }
}

export async function deleteUserPicture() {
  const { user } = await validateRequest();

  const completeUser = await db.query.userTable.findFirst({
    where: eq(userTable.id, user!.id),
  });

  await db
    .update(userTable)
    .set({ pictureId: null })
    .where(eq(userTable.id, user!.id));

  await deleteMedia(completeUser!.pictureId!);

  revalidatePath(`/user/${user!.id}`);
}
