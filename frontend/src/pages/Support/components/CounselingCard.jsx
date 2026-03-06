import { memo } from 'react';
import { Card, Button } from '../../../shared/components';

/**
 * CounselingCard Component
 * Memoized for performance.
 */
const CounselingCard = memo(({ title, subtitle, location, locationNote, time, type }) => {
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
        <Card hover className="relative overflow-hidden group">
            {/* Background Icon Accent */}
            <div className="absolute -right-6 -top-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="material-icons-outlined text-[120px] rotate-12">{iconData.name}</span>
            </div>

            <div className="flex items-start gap-5 mb-8">
                <div className={`w-14 h-14 flex items-center justify-center ${iconData.color} group-hover:scale-110 transition-transform duration-500`}>
                    <span className="material-icons-outlined text-2xl">{iconData.name}</span>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-medium text-text-main dark:text-white text-xl tracking-tight mb-2">{title}</h3>
                <p className="text-sm text-neutral-warm font-medium leading-relaxed italic mb-8">
                    {subtitle}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-neutral-warm">
                        <span className="material-icons-outlined text-primary text-base">place</span>
                        <span className="font-medium">{location}</span>
                    </div>
                    {locationNote && (
                        <p className="text-[10px] uppercase font-medium text-neutral-warm/50 pl-9 -mt-2 tracking-widest">
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
                <Button variant="outline" fullWidth icon="event_note" iconPosition="left">
                    View Schedule
                </Button>
            ) : (
                <Button variant="primary" fullWidth icon="calendar_today" iconPosition="left">
                    Book Appointment
                </Button>
            )}
        </Card>
    );
});

CounselingCard.displayName = 'CounselingCard';

export default CounselingCard;
