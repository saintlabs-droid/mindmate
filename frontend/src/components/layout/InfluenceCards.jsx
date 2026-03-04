import { memo } from "react";
import { Card } from "../../shared/components";

/**
 * InfluenceCards: Restored to exact mockup specifications.
 */
const InfluenceCards = memo(() => {
  const data = {
    positive: [
      { icon: "fitness_center", label: "Morning Run", value: "85%", bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600", barColor: "bg-green-500" },
      { icon: "groups", label: "Study Group", value: "70%", bgColor: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-600", barColor: "bg-blue-500" },
    ],
    stress: [
      { icon: "school", label: "Assignments", value: "65%", bgColor: "bg-red-100 dark:bg-red-900/30", textColor: "text-red-600", barColor: "bg-red-500" },
      { icon: "bedtime", label: "Late Nights", value: "40%", bgColor: "bg-orange-100 dark:bg-orange-900/30", textColor: "text-orange-600", barColor: "bg-orange-500" },
    ]
  };

  const InfluenceSection = ({ title, items }) => (
    <Card padding="sm" className="rounded-2xl">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">{title}</h4>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${item.bgColor} rounded-lg ${item.textColor}`}>
                <span className="material-icons text-sm">{item.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            </div>
            <div className="h-2 w-24 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full ${item.barColor} transition-all duration-1000`} style={{ width: item.value }}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfluenceSection title="Positive Influences" items={data.positive} />
      <InfluenceSection title="Stress Factors" items={data.stress} />
    </div>
  );
});

InfluenceCards.displayName = 'InfluenceCards';

export default InfluenceCards;

