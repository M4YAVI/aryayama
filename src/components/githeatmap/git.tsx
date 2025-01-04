// app/components/GitHubHeatmap.tsx
'use client';

import { UserData, fetchGitHubData } from '@/actions/gitAction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { BookIcon, Loader2, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const USERNAME = 'SangeethChejerla';
const CELL_SIZE = 12;
const CELL_GAP = 2;
const DAYS_IN_WEEK = 7;

// Calculate weeks from start of current year to now
const getCurrentYearWeeks = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diffTime = Math.abs(now.getTime() - startOfYear.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
};

const WEEKS_IN_YEAR = getCurrentYearWeeks();

const themes = {
  neon: ['#000000', '#ff0055', '#ff0088', '#ff00cc', '#ff00ff'],
  arctic: ['#000000', '#004466', '#006699', '#0088cc', '#00aaff'],
  volcanic: ['#000000', '#660000', '#990000', '#cc0000', '#ff0000'],
  emerald: ['#000000', '#004d40', '#00796b', '#009688', '#00bfa5'],
  plasma: ['#000000', '#4a0072', '#7b1fa2', '#9c27b0', '#e040fb'],
} as const;

type ThemeKey = keyof typeof themes;

const GitHubHeatmap = () => {
  const [theme, setTheme] = useState<ThemeKey>('neon');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGitHubData(USERNAME);
        setUserData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Rest of the component remains the same...
  const getColor = (count: number): string => {
    const themeColors = themes[theme];
    if (count === 0) return themeColors[0];
    if (count < 5) return themeColors[1];
    if (count < 10) return themeColors[2];
    if (count < 15) return themeColors[3];
    return themeColors[4];
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderHeatmap = () => {
    if (!userData?.contributions) return null;

    const cells = [];
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);

    for (let week = 0; week < WEEKS_IN_YEAR; week++) {
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const date = new Date(
          startDate.getTime() + (week * 7 + day) * 24 * 60 * 60 * 1000
        );
        const dateString = date.toISOString().split('T')[0];
        const contribution = userData.contributions.find(
          (c) => c.date === dateString
        );
        const count = contribution ? contribution.count : 0;

        cells.push(
          <TooltipProvider key={`${week}-${day}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.rect
                  x={week * (CELL_SIZE + CELL_GAP)}
                  y={day * (CELL_SIZE + CELL_GAP)}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  rx={2}
                  fill={getColor(count)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: (week * DAYS_IN_WEEK + day) * 0.005,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="p-3 rounded-lg shadow-xl">
                <div className="space-y-1">
                  <p className="font-medium">{formatDate(dateString)}</p>
                  <p>
                    {count} contribution{count !== 1 ? 's' : ''}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    }

    return cells;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg">Loading GitHub data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-900/50 text-red-100 p-4 rounded-lg">
          Error loading GitHub data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <StarIcon size={24} className="text-yellow-400" />
            <span className="text-lg">{userData?.totalStars || 0} stars</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookIcon size={24} className="text-blue-400" />
            <span className="text-lg">{userData?.publicRepos || 0} repos</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Select
            onValueChange={(value) => setTheme(value as ThemeKey)}
            defaultValue={theme}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(themes).map((key) => (
                <SelectItem key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-xl shadow-xl overflow-x-auto">
          <svg
            width={WEEKS_IN_YEAR * (CELL_SIZE + CELL_GAP) + CELL_GAP}
            height={DAYS_IN_WEEK * (CELL_SIZE + CELL_GAP) + CELL_GAP}
            className="mx-auto"
          >
            {renderHeatmap()}
          </svg>
        </div>

        <div className="flex justify-center items-center space-x-3">
          <span className="text-sm">Less</span>
          {themes[theme].map((color, index) => (
            <motion.div
              key={index}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
          ))}
          <span className="text-sm">More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
