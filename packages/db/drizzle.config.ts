import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: "../../.env",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./schema",
  driver: "mysql2",
  dbCredentials: {
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "password",
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "3306"),
    database: process.env.DB_NAME ?? "mydb",
  },
  tablesFilter: ["shaven_*"],
} satisfies Config;
