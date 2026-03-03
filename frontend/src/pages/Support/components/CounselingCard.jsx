import React from 'react';

/**
 * CounselingCard Component
 * Restored to exact mockup specifications.
 */
const CounselingCard = ({ title, subtitle, location, locationNote, time, type }) => {
    const getIcon = () => {
        switch (type) {
            case 'health': return { name: 'local_hospital', color: 'bg-primary/10 text-primary' };
            case 'peer': return { name: 'diversity_3', color: 'bg-secondary/10 text-secondary' };
            case 'psychologist': return { name: 'psychology', color: 'bg-primary/10 text-primary' };
            default: return { name: 'school', color: 'bg-gray-100 text-neutral-warm' };
        }
    };

    const iconData = getIcon();

    return (
        <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 shadow-premium border border-gray-50 dark:border-white/5 relative overflow-hidden group hover:translate-y-[-4px] transition-all duration-500">
            {/* Background Icon Accent */}
            <div className="absolute -right-6 -top-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="material-icons-outlined text-[120px] rotate-12">{iconData.name}</span>
            </div>

            <div className="flex items-start gap-5 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconData.color} group-hover:scale-110 transition-transform duration-500`}>
                    <span className="material-icons-outlined text-2xl">{iconData.name}</span>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-black text-text-main dark:text-white text-xl tracking-tight mb-2">{title}</h3>
                <p className="text-sm text-neutral-warm font-medium leading-relaxed italic mb-8">
                    {subtitle}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-neutral-warm">
                        <span className="material-icons-outlined text-primary text-base">place</span>
                        <span className="font-medium">{location}</span>
                    </div>
                    {locationNote && (
                        <p className="text-[10px] uppercase font-black text-neutral-warm/50 pl-9 -mt-2 tracking-widest">
                            {locationNote}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-neutral-warm">
                        <span className="material-icons-outlined text-primary text-base">schedule</span>
                        <span className="font-medium">{time}</span>
                    </div>
                </div>
            </div>

            {type === 'peer' ? (
                <button className="w-full flex items-center justify-center gap-3 py-4 border-2 border-primary/20 text-primary rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-primary/5 transition-all">
                    <span className="material-icons-outlined text-sm">event_note</span>
                    View Schedule
                </button>
            ) : (
                <button className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                    <span className="material-icons-outlined text-sm">calendar_today</span>
                    Book Appointment
                </button>
            )}
        </div>
    );
};

export default CounselingCard;


