import { getGoalsByYear } from '@/actions/goalsAction';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

interface GoalItemProps {
  goal: string;
  isComplete: boolean;
}

const GoalItem = ({ goal, isComplete }: GoalItemProps) => (
  <div className="flex items-center gap-3 py-2">
    <div
      className={`w-4 h-4 rounded-full ${
        isComplete ? 'bg-green-500' : 'bg-gray-200'
      }`}
    />
    <span className={isComplete ? 'line-through text-gray-500' : ''}>
      {goal}
    </span>
  </div>
);

const ITEMS_PER_PAGE = 5;

export default async function YearPage({ params, searchParams }: PageProps) {
  const paramsData = await params;
  const searchParamsData = await searchParams;

  const year = parseInt(paramsData.slug);

  // Validate year
  if (isNaN(year) || year < 2020 || year > 2100) {
    notFound();
  }

  const currentPage = parseInt(searchParamsData.page || '1');

  // Get goals for the current page
  const { items: goals, totalCount } = await getGoalsByYear(
    year,
    currentPage,
    ITEMS_PER_PAGE
  );

  if (goals.length === 0 && currentPage === 1) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">{year}</h1>
        <p className="text-gray-500">No goals found for this year.</p>
      </div>
    );
  }

  // Calculate pagination values
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const completedGoals = goals.filter((goal) => goal.isComplete).length;
  const progress = (completedGoals / goals.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{year}</h1>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="divide-y">
              {goals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal.goal}
                  isComplete={goal.isComplete}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  //@ts-ignore
                  href={`/goals/${year}?page=${currentPage - 1}`}
                  asChild
                >
                  <a>Previous</a>
                </Button>
                <Button
                  variant="outline"
                  disabled={currentPage >= totalPages}
                  //@ts-ignore
                  href={`/goals/${year}?page=${currentPage + 1}`}
                  asChild
                >
                  <a>Next</a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
