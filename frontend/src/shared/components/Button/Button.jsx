/**
 * Button Component
 * Reusable button with consistent styling variants.
 * Primary buttons use sharp edges (rounded-none) to match Landing page design.
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
        primary: 'bg-primary hover:bg-primary-dark text-white rounded-none',
        secondary: 'bg-secondary hover:brightness-110 text-white shadow-lg shadow-secondary/20 rounded-2xl',
        outline: 'border border-gray-200 text-text-main hover:border-primary hover:text-primary rounded-2xl',
        ghost: 'text-neutral-warm hover:text-primary hover:bg-primary/5 rounded-xl',
        danger: 'bg-crisis/10 text-crisis hover:bg-crisis hover:text-white rounded-2xl'
    };

    const sizes = {
        sm: 'py-2.5 px-5 text-xs',
        md: 'py-3 px-6 text-sm',
        lg: 'py-4 px-8 text-sm'
    };

    const iconElement = icon && (
        <span className="material-icons-outlined text-base">{icon}</span>
    );

    return (
        <button
            className={`
                font-medium transition-all active:scale-[0.98] 
                flex items-center justify-center gap-2
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
