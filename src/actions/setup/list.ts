"use server";

import { db } from "@/db/db";
import {
  setupPhotoTable,
  userTable,
  setupTable,
  mediaTable,
} from "@/db/schemas";
import { desc, eq, and } from "drizzle-orm";

export async function listUserSetup(username: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, username),
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const setups = await db.query.setupTable.findMany({
    where: eq(setupTable.userId, user.id),
    orderBy: [desc(setupTable.createdAt)],
    with: {
      setupPhotos: {
        limit: 1,
        with: {
          media: true,
        },
      },
    },
  });

  return setups.map((setup) => ({
    ...setup,
    photo: setup.setupPhotos[0]?.media ?? { url: "" },
    user: {
      id: user.id,
      username: user.username,
    },
    setupId: setup.id,
  }));
}
