import React from 'react';

const MoodButton = ({ mood, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="group flex flex-col items-center gap-2 p-1.5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none"
    >
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl transition-all ${isSelected
            ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-110 ring-4 ring-primary/20'
            : 'bg-gray-100 dark:bg-white/5'
            }`}>
            {mood.emoji}
        </div>
        <span className={`text-[11px] transition-colors ${isSelected ? 'font-bold text-primary dark:text-primary' : 'font-medium text-gray-500 dark:text-gray-400'
            }`}>
            {mood.label}
        </span>
    </button>
);

export default MoodButton;
