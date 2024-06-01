import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "mysetup",
});

client.connect();
export const db = drizzle(client);
