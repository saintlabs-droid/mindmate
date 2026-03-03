import React from "react";
import { Link } from "react-router-dom";

/**
 * RecentLogs: Restored to exact mockup specifications.
 */
const RecentLogs = ({ logs: data }) => {
  const logs = data || [
    {
      month: "OCT",
      day: "24",
      mood: "Feeling confident",
      icon: "sentiment_satisfied",
      iconColor: "text-yellow-500",
      preview: "Finally finished the project for CS. The team was great...",
      active: true
    },
    {
      month: "OCT",
      day: "23",
      mood: "A bit tired",
      icon: "sentiment_neutral",
      iconColor: "text-blue-400",
      preview: "Long lectures today. Need to sleep early."
    },
  ];

  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-primary/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">Recent Logs</h3>
        <Link className="text-xs font-semibold text-primary hover:text-primary-dark" to="/journal">
          View Journal
        </Link>
      </div>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex gap-4 p-3 hover:bg-background-light dark:hover:bg-background-dark/50 rounded-xl transition-colors cursor-pointer group"
          >
            <div className={`flex flex-col items-center justify-center min-w-[50px] rounded-lg py-2 ${log.active ? 'bg-primary/10' : 'bg-neutral-warm/10'}`}>
              <span className={`text-xs font-bold ${log.active ? 'text-primary' : 'text-neutral-warm'}`}>{log.month}</span>
              <span className="text-lg font-bold text-gray-800 dark:text-white">{log.day}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`material-icons-outlined ${log.iconColor} text-sm`}>mood</span>
                <span className="font-semibold text-sm text-gray-900 dark:text-white">{log.mood}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{log.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLogs;

