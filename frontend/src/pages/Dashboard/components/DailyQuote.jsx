import React from 'react';

const DailyQuote = ({ quote }) => (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white shadow-md relative overflow-hidden">
        <span className="material-icons-outlined absolute top-2 right-2 text-white/20 text-3xl">format_quote</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-3 block text-center">Daily Quote</span>
        <blockquote className="text-sm font-medium leading-relaxed mb-4 italic text-center px-1">
            "{quote}"
        </blockquote>
        <div className="flex justify-center gap-2">
            <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors backdrop-blur-sm">
                <span className="material-icons-outlined text-xs">favorite_border</span>
            </button>
            <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors backdrop-blur-sm">
                <span className="material-icons-outlined text-xs">share</span>
            </button>
        </div>
    </div>
);

export default DailyQuote;
