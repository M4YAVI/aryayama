// app/actions/goalsAction.ts
'use server';

import { db } from '@/db/db';
import { goals } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type Goal = typeof goals.$inferSelect;

export async function addGoal(data: {
  goal: string;
  year: number;
  isComplete: boolean;
}) {
  await db.insert(goals).values(data);
  revalidatePath('/goals/edit');
}

export async function updateGoal(
  id: number,
  data: {
    goal: string;
    year: number;
    isComplete: boolean;
  }
) {
  await db.update(goals).set(data).where(eq(goals.id, id));
  revalidatePath('/goals/edit');
}

export async function deleteGoal(id: number) {
  await db.delete(goals).where(eq(goals.id, id));
  revalidatePath('/goals/edit');
}

export async function getYearlyGoals() {
  const allGoals = await db.select().from(goals).orderBy(goals.year);

  return allGoals.reduce((acc: Record<number, Goal[]>, goal) => {
    if (!acc[goal.year]) {
      acc[goal.year] = [];
    }
    acc[goal.year].push(goal);
    return acc;
  }, {});
}

export async function getGoalsByYear(
  year: number,
  page: number = 1,
  limit: number = 5
) {
  // Ensure page is a valid number within the action
  const currentPage =
    typeof page === 'number' && !isNaN(page) && page >= 1
      ? Math.floor(page)
      : 1;

  const offset = (currentPage - 1) * limit;
  const items = await db
    .select()
    .from(goals)
    .where(eq(goals.year, year))
    .limit(limit)
    .offset(offset)
    .orderBy(goals.id);

  const totalCountResult = await db
    .select({ count: count() })
    .from(goals)
    .where(eq(goals.year, year));

  return { items, totalCount: totalCountResult[0]?.count || 0 };
}

export async function getMoreGoals(year: number, offset: number = 0) {
  return await db
    .select()
    .from(goals)
    .where(eq(goals.year, year))
    .limit(5)
    .offset(offset)
    .orderBy(goals.id);
}

export async function getAllGoalsSummary() {
  return await db.select().from(goals);
}
