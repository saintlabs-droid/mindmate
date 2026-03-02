import React, { useState } from 'react';

const CounselingCard = ({ title, subtitle, location, locationNote, time, type }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'health' ? 'bg-orange-50 text-orange-500' :
                    type === 'peer' ? 'bg-blue-50 text-blue-500' :
                        'bg-purple-50 text-purple-500'
                    }`}>
                    <span className="material-icons-round">
                        {type === 'health' ? 'medical_services' : type === 'peer' ? 'groups' : 'psychology'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="opacity-10 dark:opacity-20 flex">
                        <span className="material-icons-round text-5xl">
                            {type === 'health' ? 'school' : type === 'peer' ? 'diversity_3' : 'person'}
                        </span>
                    </div>
                    <span className={`material-icons-round text-gray-400 Transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{title}</h3>

            {isOpen && (
                <div className="mt-4 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <span className="material-icons-round text-gray-400 text-sm mt-0.5">location_on</span>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{location}</p>
                                <p className="text-xs text-gray-400">{locationNote}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-icons-round text-gray-400 text-sm">schedule</span>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{time}</p>
                        </div>
                    </div>

                    <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${type === 'peer'
                        ? 'bg-white border border-orange-500/20 text-orange-500 hover:bg-orange-50 dark:bg-transparent dark:hover:bg-orange-500/10'
                        : 'bg-primary hover:bg-primary-dark text-white'
                        }`}>
                        {type === 'peer' ? (
                            <>
                                <span className="material-icons-round text-[18px]">info</span>
                                View Schedule
                            </>
                        ) : (
                            <>
                                <span className="material-icons-round text-[18px]">event</span>
                                Book Appointment
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CounselingCard;
