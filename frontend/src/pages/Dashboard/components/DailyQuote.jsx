import { memo } from 'react';
import { IconButton } from '../../../shared/components';

/**
 * DailyQuote Component
 * Memoized for performance - only re-renders when quote changes.
 */
const DailyQuote = memo(({ quote }) => (
    <div className="bg-primary rounded-[2.5rem] p-10 text-white shadow-premium relative overflow-hidden group border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px] group-hover:scale-110 transition-transform duration-1000"></div>
        <span className="material-icons-outlined absolute top-10 right-10 text-white/10 text-8xl pointer-events-none">format_quote</span>

        <div className="relative z-10 space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 block px-4 py-1.5 rounded-full bg-white/10 border border-white/5 w-fit">Daily Affirmation</span>

            <blockquote className="text-2xl font-black leading-tight tracking-tight italic">
                "{quote || "You are resilient, capable, and currently exactly where you need to be to grow. Trust your pace."}"
            </blockquote>

            <div className="flex items-center gap-4 pt-4">
                <IconButton 
                    icon="favorite" 
                    label="Save to favorites"
                    variant="surface"
                    size="sm"
                />
                <IconButton 
                    icon="share" 
                    label="Share quote"
                    variant="surface"
                    size="sm"
                />
            </div>
        </div>
    </div>
));

DailyQuote.displayName = 'DailyQuote';

export default DailyQuote;
