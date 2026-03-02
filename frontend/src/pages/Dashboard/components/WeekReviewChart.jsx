import React from 'react';

const WeekReviewChart = ({ data }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Your Week in Review</h3>
            <select className="text-[11px] border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 pl-2 pr-6 focus:ring-primary focus:border-primary">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
            </select>
        </div>
        <div className="h-44 w-full flex items-end justify-between px-1 gap-1.5">
            {data.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-1.5 w-full group cursor-pointer">
                    <div className="w-full max-w-[28px] bg-primary/20 rounded h-full group-hover:bg-primary/30 transition-colors relative">
                        <div className="absolute bottom-0 w-full bg-primary rounded" style={{ height: d.h }}></div>
                    </div>
                    <span className={`text-[10px] ${d.bold ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400 font-medium'}`}>{d.day}</span>
                </div>
            ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Average: <span className="font-bold text-primary">Good</span></span>
            <button className="text-primary hover:text-primary-dark font-bold flex items-center gap-1 transition-colors uppercase tracking-tight">
                Detailed Report <span className="material-icons-outlined text-[10px]">arrow_forward</span>
            </button>
        </div>
    </div>
);

export default WeekReviewChart;
