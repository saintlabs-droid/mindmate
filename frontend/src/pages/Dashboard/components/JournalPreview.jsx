import React from 'react';
import { Link } from 'react-router-dom';

/**
 * JournalPreview Component
 * Restored to exact mockup specifications with Material Icons.
 */
const JournalPreview = ({ entries = [] }) => (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Recent Journal</h3>
            <Link className="text-primary text-xs font-semibold uppercase hover:underline" to="/journal">
                View All
            </Link>
        </div>

        <div className="relative pl-4 border-l-2 border-primary/20 space-y-6 flex-grow">
            {entries.length > 0 ? entries.map((entry, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
                    <p className="text-xs text-gray-400 mb-1">{entry.time}</p>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{entry.title}</h4>
                    {entry.preview && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.preview}</p>
                    )}
                </div>
            )) : (
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark"></div>
                    <p className="text-xs text-gray-400 mb-1">No recent entries</p>
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Start your journey today</h4>
                </div>
            )}
        </div>

        <Link
            to="/log-mood"
            className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
        >
            <span className="material-icons-outlined text-sm">edit</span>
            New Entry
        </Link>
    </div>
);

export default JournalPreview;


