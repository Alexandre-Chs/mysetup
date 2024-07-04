"use server";
import fs from "fs";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db/db";
import { validateRequest } from "@/lib/auth/validate-request";
import { mediaTable } from "@/db/schemas";
import { S3 } from "@aws-sdk/client-s3";

export async function uploadFile(formData: FormData) {
    const { user } = await validateRequest();
    
    const file = formData.get("file") as File;
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
                Key: id+"."+ext,
                Body: buffer,
            })

            url = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${id}.${ext}`;

            console.log("Upload to cloud :", object)
        }
    } catch (error) {
        return { status: "error", message: "Error while uploading file" };
    }

    return await db.insert(mediaTable).values({
        id,
        userId: user!.id,
        size: file.size,
        name: file.name,
        type: file.type,
    }).returning();
}