import React from 'react';

/**
 * CounselingCard Component
 * Restored to exact mockup specifications.
 */
const CounselingCard = ({ title, subtitle, location, locationNote, time, type }) => {
    const getIcon = () => {
        switch (type) {
            case 'health': return { name: 'medical_services', color: 'bg-red-100 text-red-600' };
            case 'peer': return { name: 'groups', color: 'bg-blue-100 text-blue-600' };
            case 'psychologist': return { name: 'psychology', color: 'bg-purple-100 text-purple-600' };
            default: return { name: 'school', color: 'bg-gray-100 text-gray-600' };
        }
    };

    const iconData = getIcon();

    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background Icon Accent */}
            <div className="absolute -right-4 -top-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="material-icons text-[120px] rotate-12">{iconData.name}</span>
            </div>

            <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconData.color}`}>
                    <span className="material-icons text-2xl">{iconData.name}</span>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 italic mb-6">
                    {subtitle}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="material-icons text-primary text-sm">place</span>
                        <span>{location}</span>
                    </div>
                    {locationNote && (
                        <p className="text-[10px] uppercase font-bold text-gray-400 pl-7 -mt-2">
                            {locationNote}
                        </p>
                    )}
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="material-icons text-primary text-sm">schedule</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            {type === 'peer' ? (
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-colors">
                    <span className="material-icons text-sm">info</span>
                    View Schedule
                </button>
            ) : (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                    <span className="material-icons text-sm">calendar_today</span>
                    Book Appointment
                </button>
            )}
        </div>
    );
};

export default CounselingCard;


