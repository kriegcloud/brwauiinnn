import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as auth from "./schema/auth";
import * as post from "./schema/post";
export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export * from "drizzle-orm";

export const db = drizzle(pool, { schema });

