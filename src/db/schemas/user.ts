import { pgTable, text, boolean, AnyPgColumn } from "drizzle-orm/pg-core";
import { mediaTable } from "./media";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  password_hash: text("password"),
  email: text("email").unique(),
  email_verified: boolean("email_verified").default(false).notNull(),
  is_first_visit: boolean("is_first_visit").default(true).notNull(),
  pictureId: text("picture_id").references((): AnyPgColumn => mediaTable.id),
});

export type User = typeof userTable.$inferSelect;
