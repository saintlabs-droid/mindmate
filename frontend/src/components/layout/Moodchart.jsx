import { useState, memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card } from "../../shared/components";

const moodData = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 3.5 },
  { day: "Wed", value: 4.5 },
  { day: "Thu", value: 3.2 },
  { day: "Fri", value: 4.8 },
  { day: "Sat", value: 3.6 },
  { day: "Sun", value: 4.2 },
];

const categories = ["Mood", "Sleep", "Social", "Exercise"];

const moodLabels = {
  5: "Great",
  4: "Good",
  3: "Okay",
  2: "Low",
  1: "Bad",
};

/**
 * MoodChart: Restored to exact mockup specifications.
 */
const MoodChart = memo(() => {
  const [activeTab, setActiveTab] = useState("Mood");

  return (
    <Card padding="md" className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="font-medium text-lg text-gray-900 dark:text-white">Your Mood Timeline</h3>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Chart categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-200
                ${activeTab === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={moodData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2715a" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#e2715a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#e5e7eb"
              vertical={false}
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 500, fill: "#8a7e7a" }}
              dy={10}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(val) => moodLabels[val] || ""}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 500, fill: "#8a7e7a" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "0",
                border: "none",
                color: "#fff",
                fontSize: "12px"
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: '#e2715a', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#e2715a"
              strokeWidth={3}
              fill="url(#chartGradient)"
              animationDuration={1500}
              dot={{ r: 4, fill: "#fff", stroke: "#e2715a", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#e2715a", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});

MoodChart.displayName = 'MoodChart';

export default MoodChart;
