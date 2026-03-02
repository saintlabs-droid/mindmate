import React from 'react';
import { Link } from 'react-router-dom';

const JournalPreview = ({ entries }) => (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3 border-b border-gray-50 dark:border-gray-800 pb-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Journal</h3>
            <Link className="text-primary text-[10px] font-bold uppercase hover:underline" to="/journal">All Entries</Link>
        </div>
        <div className="relative pl-3 border-l-2 border-primary/20 space-y-4">
            {entries.map((entry, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[16px] top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-surface-dark"></div>
                    <p className="text-[10px] text-gray-400 mb-0.5">{entry.time}</p>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{entry.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 italic leading-tight">{entry.preview}</p>
                </div>
            ))}
        </div>
        <Link
            to="/log-mood"
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-[11px] font-bold uppercase tracking-wider"
        >
            <span className="material-icons-outlined text-sm">edit</span>
            Log Mood
        </Link>
    </div>
);

export default JournalPreview;
