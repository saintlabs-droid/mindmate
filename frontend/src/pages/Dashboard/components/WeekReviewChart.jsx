import React from 'react';

/**
 * WeekReviewChart Component
 * Restored to exact mockup specifications with Material Icons.
 */
const WeekReviewChart = ({ data }) => (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Your Week in Review</h3>
            <select className="text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 pl-3 pr-8 focus:ring-primary focus:border-primary">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
            </select>
        </div>

        <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
            {data.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                    <div className="w-full max-w-[40px] bg-primary/20 rounded-t-lg relative h-32 group-hover:bg-primary/30 transition-colors">
                        <div
                            className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500"
                            style={{ height: d.h }}
                        ></div>
                    </div>
                    <span className={`text-xs font-medium ${d.bold ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500'}`}>
                        {d.day}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
            <span className="text-gray-500 text-xs">Average Mood: <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Good</span></span>
            <button className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
                View Detailed Report
                <span className="material-icons-outlined text-sm">arrow_forward</span>
            </button>
        </div>
    </div>
);

export default WeekReviewChart;


