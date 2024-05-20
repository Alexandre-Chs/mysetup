import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const example = pgTable("example", {
  id: serial("id").primaryKey().notNull(),
  name: text("name"),
  lastname: text("lastname"),
});
