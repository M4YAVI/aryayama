import { cn } from '@/lib/utils';
import { Goal } from '@/types';
import { Check } from 'lucide-react';

interface PublicGoalItemProps {
  goal: Goal;
}

export default function PublicGoalItem({ goal }: PublicGoalItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        {goal.isComplete && <Check className="h-5 w-5 text-green-500" />}
        <div>
          <p
            className={cn(
              'font-medium text-3xl transition-all duration-300',
              goal.isComplete
                ? 'text-muted-foreground line-through' // Apply line-through if goal is complete
                : 'text-foreground',
              'hover:underline hover:text-white' // Prevent line-through on hover
            )}
          >
            {goal.goal}
          </p>
        </div>
      </div>
    </div>
  );
}
