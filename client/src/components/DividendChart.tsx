import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { DividendRecord } from '@shared/types';

interface DividendChartProps {
  data: DividendRecord[];
  year: string;
  showTimeline?: boolean;
}

export default function DividendChart({ data, year, showTimeline = false }: DividendChartProps) {
  const chartData = useMemo(() => {
    if (showTimeline) {
      return data.map(record => ({
        name: record.ticker,
        '2023': record.dividends['2023'] || 0,
        '2024': record.dividends['2024'] || 0,
        '2025': record.dividends['2025'] || 0,
      }));
    }
    
    return data.map(record => ({
      name: record.ticker,
      dividend: record.dividends[year] || 0
    }));
  }, [data, year, showTimeline]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {showTimeline ? (
          <>
            <Bar dataKey="2023" fill="#8884d8" />
            <Bar dataKey="2024" fill="#82ca9d" />
            <Bar dataKey="2025" fill="#ffc658" />
          </>
        ) : (
          <Bar dataKey="dividend" fill="#8884d8" />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
