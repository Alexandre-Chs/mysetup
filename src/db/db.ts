import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas";

declare global {
  var drizzle: NodePgDatabase<typeof schema> | undefined;
}

export const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "mysetup",
});

export const db = global.drizzle || drizzle(pool, { schema });
