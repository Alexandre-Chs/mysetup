import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { setupTable } from "./setup";

export const equipmentsTable = pgTable("equipments", {
  id: text("id").primaryKey(),
  setupId: text("setup_id")
    .notNull()
    .references(() => setupTable.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type EquipmentsTable = typeof equipmentsTable.$inferSelect;
