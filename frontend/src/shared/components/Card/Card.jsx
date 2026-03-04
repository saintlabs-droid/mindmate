/**
 * Card Component
 * Reusable card container with sharp edges matching Landing page design.
 */
const Card = ({ 
    children, 
    className = '', 
    padding = 'lg',
    hover = false,
    onClick = null
}) => {
    const baseClasses = 'bg-white dark:bg-surface-dark rounded-none shadow-sm border border-gray-100 dark:border-white/5';
    
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer' : '';
    
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
