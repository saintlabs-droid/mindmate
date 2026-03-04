/**
 * IconButton Component
 * Accessible icon-only button with aria-label requirement.
 */
const IconButton = ({ 
    icon, 
    label,
    variant = 'default',
    size = 'md',
    badge = false,
    className = '',
    ...props 
}) => {
    const variants = {
        default: 'text-neutral-warm hover:text-primary bg-white hover:bg-primary/5 border border-gray-50 hover:border-primary/10 shadow-sm hover:shadow-md',
        primary: 'bg-primary text-white hover:brightness-105 shadow-lg shadow-primary/20',
        secondary: 'bg-secondary text-white hover:brightness-110 shadow-lg shadow-secondary/20',
        ghost: 'text-gray-400 hover:text-primary hover:bg-primary/5',
        surface: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/5'
    };

    const sizes = {
        sm: 'p-2 rounded-lg',
        md: 'p-4 rounded-2xl',
        lg: 'p-5 rounded-2xl'
    };

    const iconSizes = {
        sm: 'text-sm',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    return (
        <button
            aria-label={label}
            className={`
                relative transition-all
                ${variants[variant]} ${sizes[size]} ${className}
            `}
            {...props}
        >
            <span className={`material-icons-outlined ${iconSizes[size]}`}>{icon}</span>
            {badge && (
                <span className="absolute top-3 right-3 h-2 w-2 bg-secondary rounded-full border-2 border-white" />
            )}
        </button>
    );
};

export default IconButton;
