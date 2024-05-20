"use server";

import { db, client } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./src/app/db/migrations" });
  } catch (error) {
    console.error("Erreur lors de l'exécution des migrations :", error);
  } finally {
    await client.end();
  }
}

runMigrations();
