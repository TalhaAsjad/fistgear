import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  // Connect better-auth to your Neon database via Drizzle
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  // Enable email + password authentication
  emailAndPassword: {
    enabled: true,
  },
});
