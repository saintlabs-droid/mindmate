/**
 * =============================================================================
 * StatsCards Component - Summary Metric Cards
 * =============================================================================
 *
 * PURPOSE:
 * Renders three summary cards at the top of the Insights page:
 * 1. Average Mood (with percentage change)
 * 2. Longest Streak (journaling streak)
 * 3. Top Emotion (most logged emotion)
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace the `stats` array with data fetched from an API.
 *   Example endpoint: GET /api/insights/summary?range=7d
 * - Each card's value, label, and change can be dynamic props.
 *
 * HOW TO CONNECT BACKEND:
 * - Use React Query's useQuery to fetch stats:
 *   const { data } = useQuery(['stats', range], fetchStats);
 * - Map the response into the same shape as the `stats` array below.
 *
 * LAYOUT:
 * - Uses CSS Grid: 3 columns on desktop, stacks on mobile.
 * - Each card has a subtle shadow and hover lift effect.
 * =============================================================================
 */

import { Smile, Flame, Zap } from "lucide-react";

/**
 * Static stats data.
 * TO MAKE DYNAMIC: Replace with API response data.
 * Shape: { icon, iconBg, label, value, sub, change? }
 */
const stats = [
  {
    icon: Smile,
    iconBg: "bg-accent",
    iconColor: "text-primary",
    label: "Average Mood",
    value: "Good",
    change: "+12%",
    changePositive: true,
  },
  {
    icon: Flame,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    label: "Longest Streak",
    value: "5 Days",
    sub: "Journaling",
  },
  {
    icon: Zap,
    iconBg: "bg-accent",
    iconColor: "text-primary",
    label: "Top Emotion",
    value: "Productive",
    sub: "34% of logs",
  },
];

const StatsCards = () => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="region"
      aria-label="Mood statistics summary"
    >
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl bg-card border border-border p-5 shadow-sm
                     hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start gap-4">
            {/* Icon container */}
            <div
              className={`h-10 w-10 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}
            >
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>

            {/* Text content */}
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">
                  {stat.value}
                </span>
                {/* Percentage change badge */}
                {stat.change && (
                  <span
                    className={`text-xs font-semibold ${
                      stat.changePositive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
              {/* Sub-label (e.g., "Journaling", "34% of logs") */}
              {stat.sub && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.sub}
                </p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default StatsCards;
