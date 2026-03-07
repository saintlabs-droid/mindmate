/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Shadcn/UI Style Tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6A8E7F", // Serene Sage Green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E2725B", // Terracotta (Accent)
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // MindMate Branding Tokens (Main Branch)
        "primary-dark": "#506B60",
        "primary-light": "#E8EFEC",
        "background-light": "#FBF9F7",
        "background-dark": "#1A2421",
        "surface-light": "#FFFFFF",
        "surface-dark": "#242D2A",
        "text-main": "#2D2D2D",
        crisis: "#E11D48",
        "neutral-warm": "#7A8A83",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "0.75rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(106, 142, 127, 0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-left": "scroll-left 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
