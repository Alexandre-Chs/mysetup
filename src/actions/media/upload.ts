"use server";
import fs from "fs";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db/db";
import { validateRequest } from "@/lib/auth/validate-request";
import { Media, mediaTable } from "@/db/schemas";
import { S3 } from "@aws-sdk/client-s3";
import { setupPhotoTable } from "@/db/schemas";

export async function uploadFile(file: File, prefix?: string) {
    console.log("Uploading file", file, prefix);
    const { user } = await validateRequest();
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split(".").pop();

    const id = generateIdFromEntropySize(10);
    let url: string;

    try {
        if (process.env.NODE_ENV !== "development") {
            fs.writeFileSync(`./public/uploads/${id}.${ext}`, buffer);
            url = `http://localhost:3000/uploads/${id}.${ext}`;
        } else {
            const s3 = new S3({
                credentials: {
                    accessKeyId: process.env.S3_KEY!,
                    secretAccessKey: process.env.S3_SECRET!
                },
                region: process.env.S3_REGION!,
                endpoint: process.env.S3_ENDPOINT!,
                tls: true
            });

            const object = await s3.putObject({
                Bucket: process.env.S3_BUCKET!,
                Key: prefix+'/'+id+"."+ext,
                Body: buffer,
            }).catch((error) => {
                console.log("Error while uploading to s3", error);
            });

            url = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${id}.${ext}`;

            console.log("Upload to cloud :", object)
        }
    } catch (error) {
        return { status: "error", message: "Error while uploading file" };
    }

    const medias = await db.insert(mediaTable).values({
        id,
        userId: user!.id,
        size: file.size,
        url,
        name: file.name,
        type: file.type,
    }).returning();

    return medias[0];
}

export async function uploadSetupPicture(formData: FormData) {
    console.log("Uploading setup picture");
    const { user } = await validateRequest();

    const file = formData.get("file") as File;
    const setupId = formData.get("setupId") as string;

    // Check if the user is the owner of the setup
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

    await db.insert(setupPhotoTable).values({
        id: generateIdFromEntropySize(10),
        setupId,
        mediaId: media.id,
    }).returning();
}