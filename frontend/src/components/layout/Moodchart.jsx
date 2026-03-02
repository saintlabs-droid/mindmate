/**
 * =============================================================================
 * MoodChart Component - Mood Timeline Visualization
 * =============================================================================
 *
 * PURPOSE:
 * Displays a line chart showing mood levels across the week (Mon–Sun).
 * Includes category tabs (Mood, Sleep, Social, Exercise) for future filtering.
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace the `moodData` array with data from an API endpoint.
 *   Example: GET /api/insights/timeline?range=7d&category=mood
 * - When a tab is clicked, fetch data for that category and update the chart.
 *
 * HOW TO CONNECT BACKEND:
 * - Use React Query: const { data } = useQuery(['timeline', category, range], fetchTimeline);
 * - Map API response to { day, value } shape for Recharts.
 *
 * CHART LIBRARY:
 * Uses Recharts (already installed). The chart is responsive via ResponsiveContainer.
 *
 * LAYOUT:
 * - Full-width card with tabs at the top and chart below.
 * - Chart height is fixed at 250px for consistency.
 * =============================================================================
 */

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/**
 * Static mood timeline data for one week.
 * TO MAKE DYNAMIC: Fetch from API and replace this array.
 * The `value` field maps to mood levels: 1=Bad, 2=Low, 3=Okay, 4=Good, 5=Great
 */
const moodData = [
  { day: "Mon", value: 4.5 },
  { day: "Tue", value: 4.2 },
  { day: "Wed", value: 3.8 },
  { day: "Thu", value: 3.2 },
  { day: "Fri", value: 3.5 },
  { day: "Sat", value: 3.0 },
  { day: "Sun", value: 3.4 },
];

/** Category tabs for the chart */
const categories = ["Mood", "Sleep", "Social", "Exercise"];

/** Maps numeric mood values to readable labels for the Y-axis */
const moodLabels = {
  1: "Bad",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

const MoodChart = () => {
  // Currently active chart category tab
  const [activeTab, setActiveTab] = useState("Mood");

  return (
    <article
      className="rounded-xl bg-card border border-border p-5 shadow-sm"
      role="region"
      aria-label="Mood timeline chart"
    >
      {/* --- Card Header with Tabs --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-base font-semibold text-foreground">
          Your Mood Timeline
        </h2>

        {/*
         * Category tabs (static).
         * TO MAKE FUNCTIONAL:
         * - On tab click, fetch new data for that category.
         * - Update chart data state accordingly.
         */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Recharts Area Chart --- */}
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={moodData}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            {/* Grid lines for readability */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220 14% 92%)"
              vertical={false}
            />

            {/* X-axis: days of the week */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }}
            />

            {/* Y-axis: mood level labels */}
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(val) => moodLabels[val] || ""}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
              width={45}
            />

            {/* Tooltip on hover */}
            <Tooltip
              contentStyle={{
                background: "hsl(0 0% 100%)",
                border: "1px solid hsl(220 14% 90%)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
  moodLabels[Math.round(value)] || value,
  "Mood",
]}
              labelStyle={{ fontWeight: 600 }}
            />

            {/* Gradient fill under the line */}
            <defs>
              <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(14 80% 56%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(14 80% 56%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* Area + Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(14 80% 56%)"
              strokeWidth={2.5}
              fill="url(#moodGradient)"
              dot={{ r: 4, fill: "hsl(14 80% 56%)", strokeWidth: 2, stroke: "white" }}
              activeDot={{ r: 6, fill: "hsl(14 80% 56%)", strokeWidth: 2, stroke: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default MoodChart;
