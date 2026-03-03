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
        <div className="font-display bg-background-light dark:bg-background-dark text-text-main dark:text-gray-100 antialiased overflow-x-hidden min-h-screen">
            <LandingHeader />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 md:px-12 space-y-32 md:space-y-48">
                    <HeroSection />
                    <StepsSection />
                    <ArticlesSection />
                    <AboutSection />
                    <ContactSection />
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Landing;
