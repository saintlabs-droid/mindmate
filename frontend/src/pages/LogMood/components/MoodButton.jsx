import { memo } from 'react';

/**
 * MoodButton Component
 * Memoized for performance - only re-renders when props change.
 */
const MoodButton = memo(({ mood, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className="group flex flex-col items-center gap-3 p-2 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-pressed={isSelected}
        type="button"
    >
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl transition-all 
            ${isSelected
                ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-110 ring-4 ring-primary/20'
                : 'bg-gray-100 dark:bg-white/5 grayscale-[0.5] opacity-80 group-hover:scale-110'
            }`}>
            <span role="img" aria-label={mood.label}>
                {mood.emoji}
            </span>
        </div>
        <span className={`text-xs transition-colors ${isSelected ? 'font-bold text-primary dark:text-primary' : 'font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary'}`}>
            {mood.label}
        </span>
    </button>
));

MoodButton.displayName = 'MoodButton';

export default MoodButton;
