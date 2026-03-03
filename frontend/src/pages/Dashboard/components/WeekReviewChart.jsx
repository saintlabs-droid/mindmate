import React from 'react';

/**
 * WeekReviewChart Component
 * Restored to exact mockup specifications with Material Icons.
 */
const WeekReviewChart = ({ data }) => (
    <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 shadow-premium border border-gray-50 dark:border-gray-800">
        <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-xl text-text-main dark:text-white tracking-tight">Wellness Progress</h3>
            <div className="relative group">
                <select className="appearance-none text-[11px] font-black uppercase tracking-widest border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-neutral-warm py-2.5 pl-4 pr-10 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
                <span className="material-icons-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-warm pointer-events-none transition-transform group-hover:translate-y-[-40%]">expand_more</span>
            </div>
        </div>

        <div className="h-64 w-full flex items-end justify-between px-4 gap-4">
            {data.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-4 w-full group cursor-pointer">
                    <div className="w-full max-w-[48px] bg-primary/5 rounded-t-2xl relative h-full transition-all duration-500 overflow-hidden">
                        <div
                            className="absolute bottom-0 w-full bg-primary rounded-t-2xl transition-all duration-700 shadow-lg shadow-primary/20 group-hover:brightness-110"
                            style={{ height: d.h }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
                        </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${d.bold ? 'text-primary' : 'text-neutral-warm/60 group-hover:text-text-main'}`}>
                        {d.day}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-neutral-warm text-[10px] font-black uppercase tracking-widest">Growth: <span className="text-text-main">Positive</span></span>
            </div>
            <button className="text-primary hover:text-primary-dark font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group transition-all">
                Full Analysis
                <span className="material-icons-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
        </div>
    </div>
);

export default WeekReviewChart;


