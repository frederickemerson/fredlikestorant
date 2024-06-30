// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { env } from "~/env";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${env.TABLE_PRE}_${name}`);

export const posts = createTable(
  "blogpost",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    contenturl: varchar("contenturl", { length: 255 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    slug: varchar("slug",{length: 256}).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.title),
  })
);

export const comments = createTable("comments",
  {
    c_id: serial("c_id").primaryKey(),
    name: varchar("name",{length:256}).notNull(),
    comment:varchar("comment",{length: 2000}).notNull(),
    linkId: varchar("linkId",{length:512}).notNull(),
    imageurl:varchar("imageurl",{length:255}),
    createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
)
