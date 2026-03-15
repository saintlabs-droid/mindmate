import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Page Header Component
 * Provides consistent header styling across all pages with sharp-edged design.
 */
const PageHeader = memo(({ 
    title, 
    subtitle, 
    badge, 
    badgeColor = 'bg-primary/10 text-primary',
    accentColor = 'bg-primary',
    children 
}) => {
    return (
        <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <div className={`w-1 h-8 ${accentColor}`}></div>
                <div>
                    <h2 className="text-xl font-normal text-text-main dark:text-white flex items-center gap-3">
                        {title}
                        {badge && (
                            <span className={`px-3 py-1 text-xs font-medium ${badgeColor}`}>
                                {badge}
                            </span>
                        )}
                    </h2>
                    {subtitle && (
                        <p className="text-neutral-warm text-sm mt-1">{subtitle}</p>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
});

PageHeader.displayName = 'PageHeader';

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    badge: PropTypes.string,
    badgeColor: PropTypes.string,
    accentColor: PropTypes.string,
    children: PropTypes.node
};

export default PageHeader;
