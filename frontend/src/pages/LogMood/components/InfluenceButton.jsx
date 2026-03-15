import { memo } from 'react';

/**
 * InfluenceButton Component
 * Memoized for performance - only re-renders when props change.
 */
const InfluenceButton = memo(({ influence, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`select-card group relative p-4 h-32 flex flex-col justify-between items-start rounded-lg border-2 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            ${isSelected
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
        aria-pressed={isSelected}
        type="button"
    >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
            ${isSelected
                ? 'bg-white dark:bg-surface-dark text-primary'
                : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:text-primary group-hover:bg-primary/10'
            }`}>
            <span className="material-icons-round text-lg">{influence.icon}</span>
        </div>

        <div>
            <span className={`block text-sm transition-colors duration-300 
                ${isSelected
                    ? 'font-bold text-primary'
                    : 'font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                {influence.name}
            </span>
        </div>

        {isSelected && (
            <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons-round text-white text-[10px]">check</span>
            </div>
        )}
    </button>
));

InfluenceButton.displayName = 'InfluenceButton';

export default InfluenceButton;
