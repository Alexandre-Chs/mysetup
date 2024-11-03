"use server";

import { db, pool } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigrations() {
  console.log("Exécution des migrations...");
  try {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
  } catch (error) {
    console.error("Erreur lors de l'exécution des migrations :", error);
  } finally {
    await pool.end();
  }
}

runMigrations();
