// app/page.tsx
import { getAllGoalsSummary, getYearlyGoals } from '@/actions/goalsAction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const yearlyGoals = await getYearlyGoals();
  const allGoals = await getAllGoalsSummary();

  const totalGoals = allGoals.length;
  const completedGoalsTotal = allGoals.filter((goal) => goal.isComplete).length;
  const notCompletedGoalsTotal = totalGoals - completedGoalsTotal;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between">
              <span>Total Goals:</span>
              <span>{totalGoals}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed:</span>
              <span>{completedGoalsTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Not Completed:</span>
              <span>{notCompletedGoalsTotal}</span>
            </div>
            {totalGoals > 0 && (
              <div>
                <Progress
                  value={(completedGoalsTotal / totalGoals) * 100}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground text-right">
                  {((completedGoalsTotal / totalGoals) * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {Object.entries(yearlyGoals)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, goals]) => {
            const completedGoals = goals.filter(
              (goal) => goal.isComplete
            ).length;
            const notCompletedGoals = goals.length - completedGoals;
            const progress =
              goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

            return (
              <Card key={year}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/goals/${year}`} className="hover:underline">
                      {year}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span>Total Goals:</span>
                      <span>{goals.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span>{completedGoals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Not Completed:</span>
                      <span>{notCompletedGoals}</span>
                    </div>
                    {goals.length > 0 && (
                      <div>
                        <Progress value={progress} className="mb-2" />
                        <p className="text-sm text-muted-foreground text-right">
                          {progress.toFixed(0)}%
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
