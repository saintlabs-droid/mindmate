import { memo } from 'react';
import { Card } from '../../../shared/components';

/**
 * HelplineCard Component
 * Memoized for performance.
 */
const HelplineCard = memo(({ title, description, buttonColor, badgeColor, badgeText, callNumber, timeInfo }) => {
    const getIcon = () => {
        if (title.includes('Befrienders')) return 'volunteer_activism';
        if (title.includes('Red Cross')) return 'emergency_share';
        return 'shield_person';
    };

    return (
        <Card hover className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                    <h3 className="font-black text-text-main dark:text-white text-xl tracking-tight mb-3">{title}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl ${badgeColor}`}>
                        {badgeText}
                    </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/10 flex items-center justify-center text-neutral-warm/40 ml-4 group-hover:scale-110 transition-transform">
                    <span className="material-icons-outlined text-xl">{getIcon()}</span>
                </div>
            </div>

            <p className="text-sm text-neutral-warm font-medium leading-relaxed mb-10 italic flex-1">
                "{description}"
            </p>

            <button 
                className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white flex items-center justify-center gap-3 mb-6 shadow-lg hover:brightness-110 active:scale-95 transition-all ${buttonColor}`}
                type="button"
                aria-label={`Call ${title}`}
            >
                <span className="material-icons-outlined text-sm">call</span>
                {callNumber}
            </button>

            <div className="flex items-center gap-3 text-[10px] font-black text-neutral-warm/50 uppercase tracking-widest pt-6 border-t border-gray-50 dark:border-white/5">
                <span className="material-icons-outlined text-sm">schedule</span>
                {timeInfo}
            </div>
        </Card>
    );
});

HelplineCard.displayName = 'HelplineCard';

export default HelplineCard;
