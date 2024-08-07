"use server";

import { db } from "@/db/db";
import { mediaTable } from "@/db/schemas";

export async function getAllSetupsPhotos() {
  return await db.select({ url: mediaTable.url }).from(mediaTable);
}
