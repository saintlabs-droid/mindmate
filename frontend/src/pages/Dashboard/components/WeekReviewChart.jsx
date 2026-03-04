import React, { memo } from 'react';
import { Card, Button } from '../../../shared/components';

/**
 * WeekReviewChart Component
 * Restored to exact mockup specifications with Material Icons.
 */
const WeekReviewChart = memo(({ data }) => (
    <Card>
        <div className="flex items-center justify-between mb-10">
            <h3 className="font-black text-xl text-text-main dark:text-white tracking-tight">Wellness Progress</h3>
            <div className="relative group">
                <label htmlFor="week-range-select" className="sr-only">Select time range</label>
                <select 
                    id="week-range-select"
                    className="appearance-none text-[11px] font-black uppercase tracking-widest border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-neutral-warm py-2.5 pl-4 pr-10 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer outline-none"
                >
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
            <Button variant="ghost" size="sm" icon="arrow_forward">
                Full Analysis
            </Button>
        </div>
    </Card>
));

WeekReviewChart.displayName = 'WeekReviewChart';

export default WeekReviewChart;


