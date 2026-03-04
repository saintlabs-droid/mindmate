/**
 * PageHeader Component
 * Consistent page header styling across all logged-in pages.
 * Matches Landing page design system with light font weights.
 */
const PageHeader = ({
    badge,
    title,
    subtitle,
    actions,
    className = ''
}) => {
    return (
        <header className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${className}`}>
            <div className="flex-1">
                {badge && (
                    <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">
                        {badge}
                    </p>
                )}
                <h1 className="text-4xl lg:text-5xl font-normal text-text-main dark:text-white tracking-tight leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg text-neutral-warm mt-3 leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-4">
                    {actions}
                </div>
            )}
        </header>
    );
};

export default PageHeader;
