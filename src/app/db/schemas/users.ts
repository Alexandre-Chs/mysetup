import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
});
