'use server';

import { db } from '@/db/db';
import { mediaTable, socialLinksTable, userProfileTable, userTable } from '@/db/schemas';
import { validateRequest } from '@/lib/auth/validate-request';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function User() {
  const { user } = await validateRequest();
  if (!user) {
    return null;
  }
  return user;
}

//
//#region setFirstVisit
//

export async function setFirstVisit() {
  const { user } = await validateRequest();
  if (!user) return;

  await db.update(userTable).set({ is_first_visit: false }).where(eq(userTable.id, user.id));
}

//
//#region getFirstVisit
//

export async function getFirstVisit() {
  const { user } = await validateRequest();
  if (!user) return;

  const isFirstVisit = await db.select().from(userTable).where(eq(userTable.id, user.id));

  return isFirstVisit[0].is_first_visit;
}

//
//#region UserInfos
//

export async function UserInfos(username: string) {
  if (!username) return null;

  const user = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1);

  if (user.length === 0) return null;

  const media = user[0].pictureId ? await db.select().from(mediaTable).where(eq(mediaTable.id, user[0].pictureId)).limit(1) : [];

  const userProfile = await db.select().from(userProfileTable).where(eq(userProfileTable.userId, user[0].id)).limit(1);

  const socialLinks = await db.select().from(socialLinksTable).where(eq(socialLinksTable.userId, user[0].id));

  return {
    media: media[0] || null,
    profile: userProfile[0] || null,
    socialLinks: socialLinks,
  };
}

//
//#region updateProfile
//

export async function updateProfile(data: any) {
  const { user } = await validateRequest();
  if (!user) return;

  await db.transaction(async (tx) => {
    try {
      const existingProfile = await tx.select().from(userProfileTable).where(eq(userProfileTable.userId, user.id)).limit(1);

      if (existingProfile.length > 0) {
        await tx.update(userProfileTable).set({ profileDescription: data.profileDescription }).where(eq(userProfileTable.userId, user.id));
      } else {
        await tx.insert(userProfileTable).values({
          id: crypto.randomUUID(),
          userId: user.id,
          profileDescription: data.profileDescription,
        });
      }

      await tx.delete(socialLinksTable).where(eq(socialLinksTable.userId, user.id));

      for (const link of data.socialLinks) {
        await tx.insert(socialLinksTable).values({
          id: crypto.randomUUID(),
          userId: user.id,
          socialName: link.socialName,
          link: link.link,
        });
      }
    } catch (e) {
      console.error('Error when updating profile', e);
      throw e;
    } finally {
      revalidatePath(`/${user.username}`);
    }
  });
}
