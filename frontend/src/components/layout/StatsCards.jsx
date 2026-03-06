import { memo } from 'react';
import { Card } from '../../shared/components';

/**
 * StatsCards Component: Restored to exact mockup specifications.
 */
const StatsCards = memo(({ data }) => {
  const stats = data || [
    {
      icon: "mood",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      label: "Average Mood",
      value: "Good",
      change: "+12%",
      changePositive: true,
    },
    {
      icon: "workspace_premium",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      label: "Longest Streak",
      value: "5 Days",
      sub: "Journaling",
    },
    {
      icon: "psychology",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      label: "Top Emotion",
      value: "Productive",
      sub: "34% of logs",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} padding="sm" className="flex items-center gap-4">
          <div className={`w-12 h-12 ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
            <span className="material-icons-outlined">{stat.icon}</span>
          </div>
          <div>
            <p className="text-sm text-neutral-warm font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">{stat.value}</h3>
              {stat.change && (
                <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5">
                  {stat.change}
                </span>
              )}
              {stat.sub && (
                <span className="text-xs text-neutral-warm">{stat.sub}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
