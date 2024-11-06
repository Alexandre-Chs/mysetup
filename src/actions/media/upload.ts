"use server";
import fs from "fs";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db/db";
import { validateRequest } from "@/lib/auth/validate-request";
import { Media, mediaTable, setupTable, userTable } from "@/db/schemas";
import { S3 } from "@aws-sdk/client-s3";
import { setupPhotoTable } from "@/db/schemas";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { discordLog, formatBytes } from "../utils";

export async function uploadFile(file: File, prefix?: string) {
  const { user } = await validateRequest();

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = file.name.split(".").pop();

  const id = generateIdFromEntropySize(10);
  let url: string;
  const key = prefix ? prefix + "/" + id + "." + ext : id + "." + ext;

  try {
    if (process.env.NODE_ENV === "development") {
      const res = fs.readdirSync('.')

      if (!fs.existsSync(`./public/uploads/${prefix}`)) fs.mkdirSync(`./public/uploads/${prefix}`, { recursive: true });
      fs.writeFileSync(`./public/uploads/${key}`, buffer);
      url = `http://localhost:3000/uploads/${key}`;
    } else {
      console.log("Uploading to cloud");
      const s3 = new S3({
        credentials: {
          accessKeyId: process.env.S3_KEY!,
          secretAccessKey: process.env.S3_SECRET!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT!,
        tls: true,
      });

      // get the size of the bucket
      const { Contents } = await s3.listObjectsV2({
        Bucket: process.env.S3_BUCKET!,
      });

      const fileSizes = Contents?.reduce((acc, file) => acc + file.Size!, 0);
      // if file size is greater than 50GB, return error
      if (fileSizes! > 53687091200) {
        await discordLog("@everyone Bucket size exceeded: " + formatBytes(fileSizes!) + " (" + fileSizes + " bytes)");

        return { status: "error", message: "Bucket size exceeded" };
      }

      const object = await s3
        .putObject({
          Bucket: process.env.S3_BUCKET!,
          Key: key,
          Body: buffer,
          ACL: "public-read",
        })
        .catch((error) => {
          console.log("Error while uploading to s3", error);
        });

      url = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.scw.cloud/`;
      if (prefix) {
        url += prefix + "/";
      }
      url += id + "." + ext;

      console.log("Upload to cloud :", object);
    }
  } catch (error) {
    console.log("Error while uploading file", error);
    return { status: "error", message: "Error while uploading file" };
  }

  const medias: Media[] = (await db
    .insert(mediaTable)
    .values({
      id,
      userId: user!.id,
      size: file.size,
      key,
      url,
      name: file.name,
      type: file.type,
    })
    .returning()) as Media[];

  return medias[0];
}

export async function uploadSetupPicture(formData: FormData) {
  const { user } = await validateRequest();

  const file = formData.get("file") as File;
  const setupId = formData.get("setupId") as string;

  const setup = await db.query.setupTable.findFirst({
    where: (setup, { eq }) => eq(setup.id, setupId),
  });

  if (!setup || setup.userId !== user!.id) {
    console.log("User is not the owner of the setup");
    return { status: "error", message: "You are not the owner of this setup" };
  }

  const media = await uploadFile(file, `users/${user!.id}/setups/${setupId}`);

  if (!media) {
    return { status: "error", message: "Error while uploading file" };
  }

  const newPhotoId = generateIdFromEntropySize(10);

  await db.transaction(async (trx) => {
    await trx.insert(setupPhotoTable).values({
      id: newPhotoId,
      setupId,
      mediaId: (media as Media).id,
      x: 0,
      y: 0,
    });

    const updatedSetup = await trx.query.setupTable.findFirst({
      where: (setup, { eq }) => eq(setup.id, setupId),
    });

    if (!updatedSetup?.thumbnailId) {
      await trx
        .update(setupTable)
        .set({ thumbnailId: newPhotoId })
        .where(eq(setupTable.id, setupId));
    }
  });

  revalidatePath(`/setup/${setupId}`);
}

export async function uploadUserPicture(formData: FormData) {
  const { user } = await validateRequest();

  const file = formData.get("file") as File;

  const media = await uploadFile(file, `users/${user!.id}`);

  if (!media || "status" in media) {
    return { status: "error", message: "Error while uploading file" };
  }

  await db
    .update(userTable)
    .set({ pictureId: media.id })
    .where(eq(userTable.id, user!.id));

  revalidatePath(`/${user!.id}`);
}
