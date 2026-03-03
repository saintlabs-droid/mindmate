import React from 'react';
import { Link } from 'react-router-dom';

/**
 * JournalPreview Component
 * Restored to exact mockup specifications with Material Icons.
 */
const JournalPreview = ({ entries = [] }) => (
    <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 shadow-premium border border-gray-50 dark:border-gray-800 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl text-text-main dark:text-white tracking-tight">Recent Journal</h3>
            <Link className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline" to="/journal">
                View All
            </Link>
        </div>

        <div className="relative pl-6 border-l-2 border-primary/10 space-y-8 flex-grow">
            {entries.length > 0 ? entries.map((entry, index) => (
                <div key={index} className="relative group cursor-pointer">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-primary ring-8 ring-white dark:ring-surface-dark group-hover:scale-125 transition-transform"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-warm/60 mb-2">{entry.time}</p>
                    <h4 className="text-sm font-black text-text-main dark:text-gray-200 line-clamp-1 group-hover:text-primary transition-colors">{entry.title}</h4>
                    {entry.preview && (
                        <p className="text-sm text-neutral-warm font-medium mt-2 line-clamp-2 leading-relaxed italic">"{entry.preview}"</p>
                    )}
                </div>
            )) : (
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-gray-100 dark:bg-gray-600 ring-8 ring-white dark:ring-surface-dark"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-warm/60 mb-2">No recent entries</p>
                    <h4 className="text-sm font-black text-text-main dark:text-gray-200">Start your journey today</h4>
                </div>
            )}
        </div>

        <Link
            to="/log-mood"
            className="mt-10 w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-[11px] font-black uppercase tracking-widest shadow-sm hover:shadow-md"
        >
            <span className="material-icons-outlined text-sm">edit_note</span>
            Write Entry
        </Link>
    </div>
);

export default JournalPreview;


