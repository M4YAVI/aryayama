'use client';
import { useState } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillRadarProps {
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
  colors: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className=" shadow-xl ">
        <p className="text-white text-lg font-semibold">{label}</p>
        <p className="text-white/80 text-base">Level: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export const SkillRadar = ({ data, colors }: SkillRadarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-[500px] p-8">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ffffff20" strokeWidth={0.5} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: '#fff',
              fontSize: 16,
              fontWeight: 500,
              fontFamily: 'system-ui',
            }}
            strokeWidth={0}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{
              fill: '#fff',
              fontSize: 14,
              fontFamily: 'system-ui',
            }}
            stroke="#ffffff20"
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke={colors[0]}
            fill={colors[0]}
            fillOpacity={0.6}
            //@ts-ignore
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
