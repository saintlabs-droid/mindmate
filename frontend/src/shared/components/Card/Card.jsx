/**
 * Card Component
 * Reusable card container with consistent styling across the app.
 */
const Card = ({ 
    children, 
    className = '', 
    padding = 'lg',
    hover = false,
    onClick = null
}) => {
    const baseClasses = 'bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-premium border border-gray-50 dark:border-white/5';
    
    const paddingClasses = {
        none: '',
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-10'
    };

    const hoverClasses = hover ? 'hover:translate-y-[-4px] transition-all duration-500 cursor-pointer' : '';
    
    const Component = onClick ? 'button' : 'div';

    return (
        <Component 
            className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
            onClick={onClick}
            type={onClick ? 'button' : undefined}
        >
            {children}
        </Component>
    );
};

export default Card;
