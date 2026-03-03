import React from 'react';

/**
 * DailyQuote Component
 * Restored to "Daily Affirmation" spec with Material Icons.
 */
const DailyQuote = ({ quote }) => (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
        <span className="material-icons-outlined absolute top-4 right-4 text-white/30 text-5xl">format_quote</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-4 block">Daily Affirmation</span>

        <blockquote className="text-lg font-medium leading-relaxed mb-4 relative z-10">
            "{quote || "You are capable of amazing things, even on the days you feel tired. One step at a time."}"
        </blockquote>

        <div className="flex items-center gap-2 mt-auto relative z-10">
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                <span className="material-icons-outlined text-sm">favorite_border</span>
            </button>
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                <span className="material-icons-outlined text-sm">share</span>
            </button>
        </div>
    </div>
);

export default DailyQuote;


