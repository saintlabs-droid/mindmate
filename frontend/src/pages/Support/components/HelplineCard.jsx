import React from 'react';

/**
 * HelplineCard Component
 * Restored to exact mockup specifications.
 */
const HelplineCard = ({ title, description, buttonColor, badgeColor, badgeText, callNumber, timeInfo, type }) => {
    const getIcon = () => {
        if (title.includes('Befrienders')) return 'favorite';
        if (title.includes('Red Cross')) return 'add_box';
        return 'shield';
    };

    const sideColor = title.includes('Befrienders') ? 'border-l-green-500' :
        title.includes('Red Cross') ? 'border-l-red-500' :
            'border-l-purple-500';

    return (
        <div className={`bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 border-l-4 ${sideColor} flex flex-col h-full hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${badgeColor}`}>
                        {badgeText}
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400">
                    <span className="material-icons text-xl">{getIcon()}</span>
                </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 italic flex-1">
                {description}
            </p>

            <button className={`w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mb-4 shadow-lg ${buttonColor} hover:brightness-110 transition-all`}>
                <span className="material-icons text-sm">call</span>
                {callNumber}
            </button>

            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50 dark:border-white/5">
                <span className="material-icons text-sm">schedule</span>
                {timeInfo}
            </div>
        </div>
    );
};

export default HelplineCard;


