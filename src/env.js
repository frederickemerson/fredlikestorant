import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    POSTGRES_URL: z.string().url(),
    MASTER_USER_ID:z.string(),
    SPOTIFY_CLIENT_ID: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
    SPOTIFY_REFRESH_TOKEN: z.string(),
    SPOTIFY_URL:z.string(),
    TABLE_PRE:z.string(),
    STORAGE_ACCESS:z.string(),
    TELEGRAM_BOT_TOKEN:z.string(),
    TELEGRAM_CHAT_ID:z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    MASTER_USER_ID: process.env.MASTER_USER_ID,
    SPOTIFY_CLIENT_ID:process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET:process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN:process.env.SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_URL:process.env.SPOTIFY_URL,
    TABLE_PRE:process.env.TABLE_PRE,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    STORAGE_ACCESS: process.env.STORAGE_ACCESS,
    TELEGRAM_BOT_TOKEN:process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID:process.env.TELEGRAM_CHAT_ID,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
