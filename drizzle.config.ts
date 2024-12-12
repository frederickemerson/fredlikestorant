import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  out: './drizzle',
  schema: "./src/server/db/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["fredlikestorant_*"],
} satisfies Config;
