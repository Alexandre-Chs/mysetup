"use server";

import { db } from "@/db/db";
import { setupTable } from "@/db/schemas";
import { equipmentsTable } from "@/db/schemas/equipments";
import { validateRequest } from "@/lib/auth/validate-request";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSetup() {
  const { user } = await validateRequest();
  const setupId = generateIdFromEntropySize(10);

  await db
    .insert(setupTable)
    .values({
      id: setupId,
      userId: user!.id,
      createdAt: new Date(),
    })
    .returning();

  redirect(`/${user!.username}/${setupId}`);
}

export async function createNewSetup(
  name: string,
  equipments: any,
  description: string
) {
  const { user } = await validateRequest();
  let setupId;
  try {
    setupId = generateIdFromEntropySize(10);
    await db
      .insert(setupTable)
      .values({
        id: setupId,
        userId: user!.id,
        name,
        description,
      })
      .returning();

    for (let i = 0; i < equipments.length; i++) {
      await db
        .insert(equipmentsTable)
        .values({
          id: generateIdFromEntropySize(10),
          setupId: setupId,
          name: equipments[i].name,
          type: equipments[i].type,
          url: equipments[i].url,
        })
        .returning();
    }
  } catch (e) {
    console.log(e);
  }

  redirect(`/${user!.username}/${setupId}`);
}

export async function createNewEquipments(
  setupId: string,
  equipments: {
    type: "equipments" | "accessories" | "desk" | "wallpaper" | "others";
    name: string;
    url?: string | undefined;
  }
) {
  const { user } = await validateRequest();

  const currentSetup = await db
    .select({ userId: setupTable.userId })
    .from(setupTable)
    .where(eq(setupTable.id, setupId));

  if (!currentSetup || currentSetup[0].userId !== user!.id) {
    console.log("User is not the owner of the setup");
    return { status: "error", message: "You are not the owner of this setup" };
  }

  const affiliateUrl = await transformUrlToAffiliate(equipments.url as string);

  await db.insert(equipmentsTable).values({
    id: generateIdFromEntropySize(10),
    setupId: setupId,
    name: equipments.name,
    type: equipments.type,
    url: equipments.url,
    affiliateUrl,
  });

  revalidatePath(`/${user!.username}/${setupId}`);
}

async function transformUrlToAffiliate(
  url: string,
  country: string = "FR"
): Promise<string> {
  const apiKey = process.env.OPTIMHUB_API_KEY;
  try {
    const params = new URLSearchParams({ url, country });
    const response = await fetch(
      `https://api.optimhub.com/api/link-builder?${params}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey as string,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.url || "";
  } catch (e) {
    console.error("Error while transform url:", e);
    return "";
  }
}
