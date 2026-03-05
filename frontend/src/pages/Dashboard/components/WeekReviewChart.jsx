import { memo } from 'react';
import { Card, Button } from '../../../shared/components';

/**
 * WeekReviewChart Component
 * Sharp-edged design matching Landing page aesthetic.
 */
const WeekReviewChart = memo(({ data }) => (
    <Card>
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-normal text-text-main dark:text-white">Wellness Progress</h3>
            <div className="relative">
                <label htmlFor="week-range-select" className="sr-only">Select time range</label>
                <select 
                    id="week-range-select"
                    className="appearance-none text-sm border border-gray-200 dark:border-gray-700 rounded-none bg-white dark:bg-gray-800 text-neutral-warm py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer outline-none"
                >
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
                <span className="material-icons-outlined absolute right-2 top-1/2 -translate-y-1/2 text-sm text-neutral-warm pointer-events-none">expand_more</span>
            </div>
        </div>

        <div className="h-64 w-full flex items-end justify-between px-2 gap-2">
            {data.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                    <div className="w-full max-w-[40px] bg-primary/20 rounded-t-lg relative h-32 group-hover:bg-primary/30 transition-colors">
                        <div
                            className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all"
                            style={{ height: d.h }}
                        />
                    </div>
                    <span className={`text-xs font-medium ${d.bold ? 'text-text-main dark:text-white font-bold' : 'text-gray-500'}`}>
                        {d.day}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
            <span className="text-gray-500">Average Mood: <span className="font-semibold text-text-main dark:text-white">Good</span></span>
            <Button variant="ghost" size="sm" icon="arrow_forward">
                View Detailed Report
            </Button>
        </div>
    </Card>
));

WeekReviewChart.displayName = 'WeekReviewChart';

export default WeekReviewChart;


