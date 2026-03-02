import React, { useState } from 'react';

const HelplineCard = ({ title, description, buttonColor, badgeColor, badgeText, callNumber, timeInfo }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`bg-white dark:bg-surface-dark border-l-4 rounded-xl p-5 hover:shadow-md transition-all relative overflow-hidden cursor-pointer ${title.includes('Befrienders') ? 'border-l-green-500 border-y border-r border-gray-100 dark:border-gray-800' :
                title.includes('Red Cross') ? 'border-l-red-600 border-y border-r border-gray-100 dark:border-gray-800' :
                    'border-l-purple-500 border-y border-r border-gray-100 dark:border-gray-800'
                }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight mb-2">{title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${badgeColor}`}>
                        {badgeText}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400">
                        <span className="material-icons-round text-[18px]">
                            {title.includes('Befrienders') ? 'favorite' :
                                title.includes('Red Cross') ? 'local_hospital' :
                                    'shield'}
                        </span>
                    </div>
                    <span className={`material-icons-round text-gray-400 transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="mt-4 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {description}
                    </p>

                    <button className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-colors flex items-center justify-center gap-2 mb-4 ${buttonColor}`}>
                        <span className="material-icons text-[18px]">phone</span>
                        {callNumber}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="material-icons-round text-[14px]">schedule</span>
                        {timeInfo}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelplineCard;
