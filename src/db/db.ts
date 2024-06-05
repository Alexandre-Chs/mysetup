import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas/index";

declare global {
  var drizzle: NodePgDatabase<typeof schema> | undefined;
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: connectionString });
export const db = global.drizzle || drizzle(pool, { schema });
