import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/db/schemas",
  out: "./src/app/db/migrations",
  dbCredentials: {
    url: "postgresql://postgres:root@localhost:5432/mysetup",
  },
});
