"use server";

import { db } from "@/db/db";
import { setupPhotoTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function updateSetupPhoto(items: any) {
    await Promise.all(items.map(async (item: any) => {
        await db.update(setupPhotoTable).set({
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
        }).where(eq(setupPhotoTable.id, item.id));
    }));
}