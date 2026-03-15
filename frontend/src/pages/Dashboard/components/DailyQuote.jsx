import { memo } from 'react';
import { IconButton } from '../../../shared/components';

/**
 * DailyQuote Component
 * Sharp-edged design matching Landing page aesthetic.
 */
const DailyQuote = memo(({ quote }) => (
    <div className="bg-primary rounded-none p-6 text-white shadow-sm relative overflow-hidden">
        <span className="material-icons-outlined absolute top-6 right-6 text-white/10 text-6xl pointer-events-none">format_quote</span>

        <div className="relative z-10 space-y-4">
            <span className="text-xs font-medium uppercase tracking-wide text-white/70 block">Daily Affirmation</span>

            <blockquote className="text-lg font-normal leading-relaxed">
                "{quote || "You are resilient, capable, and exactly where you need to be to grow."}"
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
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
