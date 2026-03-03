import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

migrate(db, { migrationsFolder: "./drizzle" }).then(() => {
  console.log("Migrations applied successfully");
}).catch((err) => {
  console.error("Migration failed", err);
});
