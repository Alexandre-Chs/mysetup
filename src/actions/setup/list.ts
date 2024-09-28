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
        with: {
          media: true,
        },
      },
    },
  });

  setups.forEach((setup) => {
    setup.setupPhotos.sort((a, b) => {
      console.log(setup.thumbnailId, a.id, b.id);
      if (a.id === setup.thumbnailId) return -1;
      if (b.id === setup.thumbnailId) return 1;
      return 0;
    });
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
