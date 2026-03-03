/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#e2715a",
                "primary-dark": "#c55e49",
                "primary-light": "#fcecea",
                "background-light": "#f8f6f6",
                "background-dark": "#201412",
                "surface-light": "#ffffff",
                "surface-dark": "#2d2422",
                "crisis": "#e11d48",
                "neutral-warm": "#8a7e7a",
                "deep-charcoal": "#2d2d2d",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
