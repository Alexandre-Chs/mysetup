'use server';

import { db } from '@/db/db';
import { generateIdFromEntropySize } from 'lucia';
import { redirect } from 'next/navigation';
import { equipmentsTable, mediaTable, setupPhotoTable, setupTable, userTable } from '@/db/schemas';
import { validateRequest } from '@/lib/auth/validate-request';
import { DeleteObjectsCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { and, desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { discordLog } from '../(utils)/actions';

//
// #region SetupById
//

export async function SetupById(setupId: string) {
  return await db.query.setupTable.findFirst({
    where: eq(setupTable.id, setupId),
  });
}

//
//#region createSetup
//

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

  await discordLog(`🖥️ Nouveau setup par ${user?.username} !`);

  redirect(`/${user!.username}/${setupId}`);
}

//
//#region createSetup
//

export async function createNewSetup(name: string, equipments: any, description: string) {
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
          category: equipments[i].category,
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

//
//#region createNewEquipments
//

export async function createNewEquipments(
  setupId: string,
  equipments: {
    category: string;
    type: string;
    name: string;
    url?: string | undefined;
  },
) {
  const { user } = await validateRequest();

  const currentSetup = await db.select({ userId: setupTable.userId }).from(setupTable).where(eq(setupTable.id, setupId));

  if (!currentSetup || currentSetup[0].userId !== user!.id) {
    console.log('User is not the owner of the setup');
    return { status: 'error', message: 'You are not the owner of this setup' };
  }

  await db.insert(equipmentsTable).values({
    id: generateIdFromEntropySize(10),
    setupId: setupId,
    name: equipments.name,
    category: equipments.category,
    type: equipments.type,
    url: equipments.url,
  });

  revalidatePath(`/${user!.username}/${setupId}`);
}

// export async function createSetup(setupId: string) {
//   const { user } = await validateRequest();

//   return await db.delete(setupTable).where(eq(setupTable.id, setupId));
// }

//
//#region deleteOneEquipment
//

export async function deleteOneEquipment(elementName: string, setupId: string) {
  const { user } = await validateRequest();

  const currentSetup = await db.select({ userId: setupTable.userId }).from(setupTable).where(eq(setupTable.id, setupId));

  if (currentSetup[0].userId !== user!.id) {
    return { status: 'error', message: 'You are not the owner of this setup' };
  }

  await db.delete(equipmentsTable).where(and(eq(equipmentsTable.setupId, setupId), eq(equipmentsTable.name, elementName)));

  revalidatePath(`/${user!.username}/${setupId}`);
}

//
//#region deleteSetup
//

export async function deleteSetup(setupId: string) {
  const { user } = await validateRequest();

  await db.transaction(async (tx) => {
    const setupMedias = await tx.select({ mediaId: setupPhotoTable.mediaId }).from(setupPhotoTable).where(eq(setupPhotoTable.setupId, setupId));

    await tx
      .update(setupTable)
      .set({ thumbnailId: null })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));

    await tx.delete(equipmentsTable).where(eq(equipmentsTable.setupId, setupId));

    await tx.delete(setupPhotoTable).where(eq(setupPhotoTable.setupId, setupId));

    await tx.delete(setupTable).where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));

    for (const photo of setupMedias) {
      await tx.delete(mediaTable).where(eq(mediaTable.id, photo.mediaId));
    }
  });

  await deleteS3Folder(user!.id, setupId);

  revalidatePath(`/${user!.username}`);
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_SECRET!,
  },
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  tls: true,
});

//
//#region deleteSetup
//

async function deleteS3Folder(userId: string, setupId: string) {
  const folderKey = `users/${userId}/setups/${setupId}/`;

  const listParams = {
    Bucket: process.env.S3_BUCKET!,
    Prefix: folderKey,
  };

  try {
    const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));
    if (!listedObjects.Contents || listedObjects.Contents.length === 0) return;

    const deleteParams = {
      Bucket: process.env.S3_BUCKET!,
      Delete: { Objects: listedObjects.Contents.map(({ Key }) => ({ Key })) },
    };

    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    if (listedObjects.IsTruncated) await deleteS3Folder(userId, setupId);
  } catch (error) {
    console.error('Error deleting S3 folder:', error);
    throw error;
  }
}

//
//#region getSetup
//

export async function getSetup(id: string, username: string) {
  const setup = (await db.query.setupTable.findFirst({
    where: eq(setupTable.id, id),
    with: {
      setupMedias: {
        with: {
          media: true,
          photoEquipments: {
            with: {
              equipment: true,
            },
          },
        },
      },
      equipments: true,
      upVotes: true,
      user: true,
    },
  })) as any;

  if (setup?.user.username !== username) return undefined;

  const thumbnailId = setup?.thumbnailId;

  if (setup) {
    setup.setupMedias.sort((a: any, b: any) => {
      if (a.id === thumbnailId) return -1;
      if (b.id === thumbnailId) return 1;
      return 0;
    });
  }

  return setup;
}

//
//#region getEquipmentsSetup
//

export async function getEquipmentsSetup(setupId: string) {
  return await db.query.equipmentsTable.findMany({
    where: eq(equipmentsTable.setupId, setupId),
  });
}

//
//#region getOneImageSetup
//

export async function getOneImageSetup(id: string) {
  return await db.query.setupPhotoTable.findFirst({
    where: eq(setupPhotoTable.setupId, id),
    with: {
      media: true,
    },
  });
}

//
//#region getThumbnailPhoto
//

export async function getThumbnailPhoto(thumbnailId: string) {
  const result = await db.select().from(setupPhotoTable).leftJoin(mediaTable, eq(setupPhotoTable.mediaId, mediaTable.id)).where(eq(setupPhotoTable.id, thumbnailId));
  return result[0]?.media?.url;
}

//
//#region UserSetups
//

export async function UserSetups(username: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, username),
  });

  if (!user?.id) {
    throw new Error('User not found');
  }

  const setups = await db.query.setupTable.findMany({
    where: eq(setupTable.userId, user.id),
    orderBy: [desc(setupTable.createdAt)],
    with: {
      setupMedias: {
        with: {
          media: true,
        },
      },
    },
  });

  setups.forEach((setup) => {
    setup.setupMedias.sort((a, b) => {
      if (a.id === setup.thumbnailId) return -1;
      if (b.id === setup.thumbnailId) return 1;
      return 0;
    });
  });

  return setups.map((setup) => ({
    ...setup,
    photo: setup.setupMedias[0]?.media ?? { url: '' },
    user: {
      id: user.id,
      username: user.username,
    },
    setupId: setup.id,
  }));
}

//
//#region reportSetup
//

export async function reportSetup(setupId: string, reason: string, explication?: string) {
  const { user } = await validateRequest();

  await discordLog(`🚨 Signal du setup ${setupId} par ${user?.username} !\nRaison : ${reason}\nComplément :\n\`\`\`${explication}\`\`\``);
}

//
//#region updateSetupDescription
//

export async function updateSetupDescription(setupId: string, description: string) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ description })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}

//
//#region updateSetupPublished
//

export async function updateSetupPublished(setupId: string, isPublished: boolean) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ isPublished })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}

//
//#region updateSetupName
//

export async function updateSetupName(setupId: string, name: string) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ name })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}

//
//#region setThumbnail
//

export async function setThumbnail(setupId: string, setupPhotoId: string) {
  const { user } = await validateRequest();

  try {
    await db
      .update(setupTable)
      .set({ thumbnailId: setupPhotoId })
      .where(and(eq(setupTable.id, setupId), eq(setupTable.userId, user!.id)));
  } catch (e) {
    console.log(e);
  }

  revalidatePath(`/${user!.username}/${setupId}`);
}
