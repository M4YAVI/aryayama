// actions.ts
'use server';

import { db } from '@/db/db';
import { bookmarks } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function addBookmark(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : url;

    const bookmark = {
      id: nanoid(),
      url,
      title,
      createdAt: new Date(),
    };

    await db.insert(bookmarks).values(bookmark);
    return { success: true, bookmark };
  } catch (error) {
    return { success: false, error: 'Failed to add bookmark' };
  }
}

export async function getBookmarks(search: string = '') {
  if (!search) {
    return await db.select().from(bookmarks).orderBy(bookmarks.createdAt);
  }

  const searchLower = `%${search.toLowerCase()}%`;
  return await db
    .select()
    .from(bookmarks)
    .where(
      or(like(bookmarks.title, searchLower), like(bookmarks.url, searchLower))
    )
    .orderBy(bookmarks.createdAt);
}

export async function updateBookmark(
  id: string,
  data: { title: string; url: string }
) {
  try {
    await db.update(bookmarks).set(data).where(eq(bookmarks.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update bookmark' };
  }
}

export async function deleteBookmark(id: string) {
  try {
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete bookmark' };
  }
}
