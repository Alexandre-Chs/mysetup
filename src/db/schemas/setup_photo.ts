import { pgTable, text } from "drizzle-orm/pg-core";
import { setupTable } from "./setup";
import { mediaTable } from "./media";

export const setupPhotoTable = pgTable("setup_photo", {
  id: text("id").primaryKey(),
  setupId: text("user_id")
    .notNull()
    .references(() => setupTable.id),
  mediaId: text("media_id").notNull().references(() => mediaTable.id),
});

export type SetupPhoto = typeof setupPhotoTable.$inferSelect;