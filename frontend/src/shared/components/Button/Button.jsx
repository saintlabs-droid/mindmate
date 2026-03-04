/**
 * Button Component
 * Reusable button with consistent styling variants.
 */
const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    className = '',
    icon = null,
    iconPosition = 'right',
    fullWidth = false,
    ...props 
}) => {
    const variants = {
        primary: 'bg-primary hover:brightness-105 text-white shadow-premium shadow-primary/20',
        secondary: 'bg-secondary hover:brightness-110 text-white shadow-lg shadow-secondary/20',
        outline: 'border-2 border-primary/20 text-primary hover:bg-primary hover:text-white',
        ghost: 'text-neutral-warm hover:text-primary hover:bg-primary/5',
        danger: 'bg-secondary/60 hover:bg-secondary text-white'
    };

    const sizes = {
        sm: 'py-2 px-4 text-[10px]',
        md: 'py-4 px-6 text-[11px]',
        lg: 'py-5 px-10 text-[11px]'
    };

    const iconElement = icon && (
        <span className="material-icons-outlined text-sm">{icon}</span>
    );

    return (
        <button
            className={`
                font-black uppercase tracking-widest rounded-2xl transition-all
                active:scale-95 flex items-center justify-center gap-3
                ${variants[variant]} ${sizes[size]} 
                ${fullWidth ? 'w-full' : ''}
                ${className}
            `}
            {...props}
        >
            {iconPosition === 'left' && iconElement}
            {children}
            {iconPosition === 'right' && iconElement}
        </button>
    );
};

export default Button;
