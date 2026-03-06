/**
 * SectionHeader: A reusable component to standardize heading styles across the landing page.
 * Supports badges, titles, subtitles, and optional actions (like "View All" links).
 */
const SectionHeader = ({
    title,
    subtitle,
    badge,
    centered = false,
    actions,
    asH1 = false,
    className = ""
}) => {
    const HeadingTag = asH1 ? 'h1' : 'h2';

    return (
        <div className={`
            ${centered ? 'text-center mx-auto' : 'flex flex-col md:flex-row justify-between items-end gap-6'} 
            ${className}
        `}>
            <div className={`${centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'} space-y-6`}>
                {badge && (
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                        {badge}
                    </div>
                )}

                <HeadingTag className="text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tight text-text-main">
                    {title}
                </HeadingTag>

                {subtitle && (
                    <p className="text-lg text-neutral-warm leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {actions && !centered && (
                <div className="pb-2">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default SectionHeader;
