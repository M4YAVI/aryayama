// components/ContributionsHeatmap.tsx
'use client';

import { UserData } from '@/actions/gitAction';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ContributionsHeatmapProps {
  data: UserData;
}

const Heatmap = ({ data }: ContributionsHeatmapProps) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Group contributions by week
  const weeks = data.contributions.reduce<Array<typeof data.contributions>>(
    (acc, curr, i) => {
      const weekIndex = Math.floor(i / 7);
      if (!acc[weekIndex]) acc[weekIndex] = [];
      acc[weekIndex].push(curr);
      return acc;
    },
    []
  );

  // Get intensity color based on contribution count
  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-zinc-950';
    if (count <= 3) return 'bg-emerald-900';
    if (count <= 6) return 'bg-emerald-700';
    if (count <= 9) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  const handleMouseMove = (
    event: React.MouseEvent,
    contribution: UserData['contributions'][0]
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 40,
    });
    setTooltipContent(
      `${contribution.count} contribution${
        contribution.count !== 1 ? 's' : ''
      } on ${format(new Date(contribution.date), 'MMMM d, yyyy')}`
    );
  };

  return (
    <div className="relative">
      {/* Stats Overview */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-zinc-200">
          {data.contributions.reduce((sum, curr) => sum + curr.count, 0)} Total
          Contributions This Year
        </h2>
        <div className="flex gap-6 text-sm text-zinc-400">
          <span>⭐️ {data.totalStars} Stars</span>
          <span>📦 {data.publicRepos} Repositories</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <motion.div
                key={day.date}
                className={`h-3 w-3 rounded-sm ${getIntensityColor(
                  day.count
                )} cursor-pointer transition-colors duration-200 hover:ring-2 hover:ring-emerald-400 hover:ring-offset-2 hover:ring-offset-black`}
                onMouseEnter={(e) => handleMouseMove(e, day)}
                onMouseLeave={() => setTooltipContent(null)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: weekIndex * 0.02 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="pointer-events-none absolute z-10 rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-200 shadow-lg"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%)',
          }}
        >
          {tooltipContent}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-zinc-400">
        <span>Less</span>
        {[
          'bg-zinc-950',
          'bg-emerald-900',
          'bg-emerald-700',
          'bg-emerald-500',
          'bg-emerald-400',
        ].map((color) => (
          <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
