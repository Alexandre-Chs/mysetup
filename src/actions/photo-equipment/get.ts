"use server";
import { db } from "@/db/db";
import { photoEquipmentTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getPhotoEquipments(setupPhotoId: string) {
  return await db.query.photoEquipmentTable.findMany({
    where: eq(photoEquipmentTable.setupPhotoId, setupPhotoId)
  });
}