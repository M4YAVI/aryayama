import { sql } from 'drizzle-orm';
import { integer, sqliteTable as table, text } from 'drizzle-orm/sqlite-core';

export const posts = table('posts', {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text(),
  title: text(),
  content: text(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date()
  ),
});

export const views = table('views', {
  slug: text('slug').primaryKey(),
  count: integer('count').notNull(),
});

export const tags = table('tags', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // Each tag name should be unique
});

export const postTags = table('post_tags', {
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
});

export const goals = table('goals', {
  id: integer('id').primaryKey(),
  goal: text('goal').notNull(),
  year: integer('year').notNull(),
  isComplete: integer('is_complete', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
