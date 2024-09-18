import { AnyPgColumn, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { setupPhotoTable } from "./setup_photo";

export const setupTable = pgTable("setup", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  thumbnailId: text("thumbnail_id").references((): AnyPgColumn => setupPhotoTable.id),
  name: text("name"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Setup = typeof setupTable.$inferSelect;
