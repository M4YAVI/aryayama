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

  // Calculate total contributions
  const totalContributions = data.contributions.reduce(
    (sum, curr) => sum + curr.count,
    0
  );

  // Neon-inspired color palette for max coolness
  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-black'; // Pure black for zero
    if (count <= 3) return 'bg-cyan-950'; // Dark cyan glow
    if (count <= 6) return 'bg-cyan-800'; // Mid-tone cyan
    if (count <= 9) return 'bg-cyan-600'; // Bright cyan
    return 'bg-cyan-400'; // Neon cyan for max impact
  };

  // Handle tooltip with improved positioning directly beside the hovered element
  const handleMouseMove = (
    event: React.MouseEvent,
    contribution: UserData['contributions'][0]
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Position tooltip directly to the right of the hovered day
    setTooltipPosition({
      x: rect.right + 10, // 10px to the right of the element
      y: rect.top - 5, // Slightly above the top to align better
    });
    
    setTooltipContent(
      `${contribution.count} contribution${
        contribution.count !== 1 ? 's' : ''
      } on ${format(new Date(contribution.date), 'MMM d, yyyy')}`
    );
  };

  return (
    <div className="relative bg-black p-8 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.1)] border border-cyan-900/50">
      {/* Stats Overview */}
      <div className="mb-10 flex items-center justify-between">
        <motion.h2
          className="text-4xl font-black text-white tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {totalContributions} Commits
        </motion.h2>
        <div className="flex gap-8 text-base text-cyan-300">
          <motion.span
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-cyan-400">⭐️</span> {data.totalStars}
          </motion.span>
          <motion.span
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-cyan-400">📦</span> {data.publicRepos}
          </motion.span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-2">
            {week.map((day) => (
              <motion.div
                key={day.date}
                className={`h-5 w-5 rounded-lg ${getIntensityColor(
                  day.count
                )} cursor-pointer transition-all duration-200 hover:scale-135 hover:shadow-[0_0_15px_rgba(0,255,255,0.8)]`}
                onMouseEnter={(e) => handleMouseMove(e, day)}
                onMouseLeave={() => setTooltipContent(null)}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: weekIndex * 0.015, type: 'spring' }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip - Fixed positioning directly beside the element */}
      {tooltipContent && (
        <motion.div
          className="fixed z-50 rounded-lg bg-black/80 px-4 py-2 text-sm text-white shadow-[0_0_10px_rgba(0,255,255,0.5)] border border-cyan-600/50 backdrop-blur-md"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            width: '200px',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="block text-cyan-300 font-semibold">
            {tooltipContent.split(' on ')[0]}
          </span>
          <span className="block text-cyan-100">
            on {tooltipContent.split(' on ')[1]}
          </span>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-8 flex items-center justify-end gap-3 text-sm text-cyan-400">
        <span className="font-medium">Low</span>
        {['bg-black', 'bg-cyan-950', 'bg-cyan-800', 'bg-cyan-600', 'bg-cyan-400'].map(
          (color) => (
            <div
              key={color}
              className={`h-4 w-4 rounded-md ${color} shadow-[0_0_5px_rgba(0,255,255,0.3)]`}
            />
          )
        )}
        <span className="font-medium">High</span>
      </div>
    </div>
  );
};

export default Heatmap;