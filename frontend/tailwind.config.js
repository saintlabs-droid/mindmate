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
                "background-light": "#F5F5F0",
                "background-dark": "#201412",
                "text-main": "#2D2D2D",
                "surface-light": "#FFFFFF",
                "surface-dark": "#2C2422",
                "terracotta": "#E2725B",
                "deep-charcoal": "#2D2D2D",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
