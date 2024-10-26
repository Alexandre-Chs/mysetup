"use server";
import { db } from "@/db/db";
import { userTable } from "@/db/schemas";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { S3 } from "@aws-sdk/client-s3";

export async function deleteUserPicture() {
  const { user } = await validateRequest();

  await db
    .update(userTable)
    .set({ pictureId: null })
    .where(eq(userTable.id, user!.id));

  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.S3_KEY!,
      secretAccessKey: process.env.S3_SECRET!,
    },
    region: process.env.S3_REGION!,
    endpoint: process.env.S3_ENDPOINT!,
    tls: true,
  });

  revalidatePath(`/user/${user!.id}`);
}