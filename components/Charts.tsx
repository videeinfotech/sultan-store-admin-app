
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const areaData = [
  { time: '6AM', value: 400 },
  { time: '10AM', value: 800 },
  { time: '2PM', value: 600 },
  { time: '6PM', value: 1100 },
  { time: '10PM', value: 900 },
];

const barData = [
  { day: 'M', value: 40 },
  { day: 'T', value: 65 },
  { day: 'W', value: 45 },
  { day: 'T', value: 85 },
  { day: 'F', value: 55 },
  { day: 'S', value: 30 },
  { day: 'S', value: 20 },
];

export const RevenueAreaChart: React.FC<{ data?: any[] }> = ({ data }) => {
  const chartData = data && data.length > 0 ? data.map(item => ({ time: item.name, value: item.val })) : areaData;
  return (
    <div className="h-[160px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#135bec" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#616f89', fontWeight: 'bold' }}
            dy={10}
          />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#135bec"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrderVolumeBarChart: React.FC = () => {
  return (
    <div className="h-[120px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#616f89', fontWeight: 'bold' }}
            dy={5}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.day === 'T' ? '#135bec' : '#135bec33'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
