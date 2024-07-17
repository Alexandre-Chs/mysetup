import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { setupTable } from "./setup";
import { mediaTable } from "./media";

export const setupPhotoTable = pgTable("setup_photo", {
  id: text("id").primaryKey(),
  setupId: text("setup_id")
    .notNull()
    .references(() => setupTable.id),
  mediaId: text("media_id").notNull().references(() => mediaTable.id),
  height: integer("height").notNull().default(1),
  width: integer("width").notNull().default(1),
  x: integer("x").notNull(),
  y: integer("y").notNull()
});

export type SetupPhoto = typeof setupPhotoTable.$inferSelect;