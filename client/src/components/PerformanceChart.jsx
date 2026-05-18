import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from 'recharts';
import { getScoreColor } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs">
        <p className="text-dark-300 mb-1">{label}</p>
        <p className="text-primary-400 font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Bar chart for department performance or single employee
const PerformanceChart = ({ data, type = 'bar', title = 'Performance' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-dark-500 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h3 className="section-title mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={220}>
        {type === 'radar' ? (
          <RadarChart data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
            <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
            <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
