import { pgTable, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const setupTable = pgTable("setup", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name"),
  description: text("description"),
});

export type Setup = typeof setupTable.$inferSelect;
