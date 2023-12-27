import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import * as auth from "./schema/auth";
import * as post from "./schema/post";
export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "./schema/_table";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const connection = createConnection(`${process.env.DATABASE_URL}`);

export * from "drizzle-orm";

export const db = drizzle(connection, {
  schema: schema,
  mode: "default",
});

