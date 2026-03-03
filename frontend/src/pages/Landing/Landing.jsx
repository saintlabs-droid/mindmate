import React from "react";
import LandingHeader from "./components/LandingHeader";
import HeroSection from "./components/HeroSection";
import StepsSection from "./components/StepsSection";
import ArticlesSection from "./components/ArticlesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import LandingFooter from "./components/LandingFooter";

/**
 * Landing Page: Primary trust-building boundary for the student wellness platform.
 * Assembles modular components into a high-fidelity "Resource Hub" experience.
 * Establoys psychological safety and platform integrity through a refined visual identity.
 */
const Landing = () => {
    return (
        <div className="font-display bg-background-light text-text-main antialiased overflow-x-hidden min-h-screen selection:bg-primary/20 selection:text-primary">
            <LandingHeader />

            <main className="flex-1">
                {/* Hero is handled separately for full-bleed background effects if needed */}
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <HeroSection />
                </div>

                {/* Standardized Section Spacing Wrapper */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 mb-32">
                    <StepsSection />
                    <AboutSection />
                    <ArticlesSection />
                    <ContactSection />
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Landing;
