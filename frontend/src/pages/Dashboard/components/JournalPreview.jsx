import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../../shared/components';

/**
 * JournalPreview Component
 * Sharp-edged design matching Landing page aesthetic.
 */
const JournalPreview = memo(({ entries = [] }) => (
    <Card>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-normal text-text-main dark:text-white">Recent Journal</h3>
            <Link className="text-primary text-sm hover:underline" to="/journal">
                View All
            </Link>
        </div>

        <div className="relative pl-4 border-l-2 border-primary/20 space-y-4">
            {entries.length > 0 ? entries.map((entry, index) => (
                <div key={index} className="relative group cursor-pointer">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-primary group-hover:scale-125 transition-transform"></div>
                    <p className="text-xs text-neutral-warm mb-1">{entry.time}</p>
                    <h4 className="text-sm font-medium text-text-main dark:text-gray-200 line-clamp-1 group-hover:text-primary transition-colors">{entry.title}</h4>
                    {entry.preview && (
                        <p className="text-sm text-neutral-warm mt-1 line-clamp-2 leading-relaxed">"{entry.preview}"</p>
                    )}
                </div>
            )) : (
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-gray-200 dark:bg-gray-600"></div>
                    <p className="text-xs text-neutral-warm mb-1">No recent entries</p>
                    <h4 className="text-sm font-medium text-text-main dark:text-gray-200">Start your journey today</h4>
                </div>
            )}
        </div>

        <Link to="/log-mood" className="mt-6">
            <Button variant="outline" fullWidth icon="edit_note" iconPosition="left">
                Write Entry
            </Button>
        </Link>
    </Card>
));

JournalPreview.displayName = 'JournalPreview';

export default JournalPreview;


