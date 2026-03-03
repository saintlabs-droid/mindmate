/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#6A8E7F", // Serene Sage Green
                "primary-dark": "#506B60",
                "primary-light": "#E8EFEC",
                "secondary": "#E2725B", // Terracotta (Accent only)
                "background-light": "#FBF9F7", // Warm Off-White
                "background-dark": "#1A2421",
                "surface-light": "#FFFFFF",
                "surface-dark": "#242D2A",
                "text-main": "#2D2D2D",
                "crisis": "#E11D48",
                "neutral-warm": "#7A8A83",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.75rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem", // 32px
                "3xl": "2.5rem", // 40px
                "full": "9999px"
            },
            boxShadow: {
                'premium': '0 20px 50px -12px rgba(106, 142, 127, 0.12)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
