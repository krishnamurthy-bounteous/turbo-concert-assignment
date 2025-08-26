
import env from "@/env";

import * as schema from "./schemas";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

function createDb() {
  const databaseUrl = env.DATABASE_URL;

  if (!databaseUrl || databaseUrl.trim().length === 0) {
    throw new Error(
      "DATABASE_URL is not set. Please define it in your environment (e.g., .env)."
    );
  }

  try {
    const pool = new Pool({
      connectionString: databaseUrl,
    });
    
    return drizzle(pool, { schema });
  } catch (error) {
    throw new Error("Failed to initialize database connection", {
      cause: error as unknown,
    });
  }
}

export const db = createDb();

export default db;
