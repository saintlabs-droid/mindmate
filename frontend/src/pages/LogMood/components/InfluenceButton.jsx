import React from 'react';

const InfluenceButton = ({ influence, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`group relative p-3 h-28 flex flex-col justify-between items-start rounded-lg border-2 transition-all text-left focus:outline-none ${isSelected
            ? 'border-primary bg-primary/5 dark:bg-primary/10'
            : 'border-gray-100 dark:border-white/5 bg-white dark:bg-surface-dark hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
    >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-white dark:bg-surface-dark text-primary' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
            }`}>
            <span className="material-icons-round text-base">{influence.icon}</span>
        </div>
        <span className={`block text-sm transition-colors ${isSelected ? 'font-bold text-primary' : 'font-medium text-gray-600 dark:text-gray-300'
            }`}>
            {influence.name}
        </span>
        {isSelected && (
            <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons-round text-white text-[10px]">check</span>
            </div>
        )}
    </button>
);

export default InfluenceButton;
