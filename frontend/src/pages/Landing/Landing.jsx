import React from "react";
import LandingHeader from "./components/LandingHeader";
import HeroSection from "./components/HeroSection";
import StepsSection from "./components/StepsSection";
import MindAISection from "./components/MindAISection";
import ArticlesSection from "./components/ArticlesSection";
import AboutSection from "./components/AboutSection";

import LandingFooter from "./components/LandingFooter";
import WhyUsSection from "./components/WhyUsSection";

/**
 * Landing Page: 
 * modular components into an ambitious "Redefining Wellness" journey.
 */
const Landing = () => {
    return (
        <div className="font-display bg-background-light text-text-main antialiased min-h-screen selection:bg-primary/20 selection:text-primary">
            <LandingHeader />

            <main className="flex-1 pt-16">
                {/* Hero is handled separately for full-bleed background effects if needed */}
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <HeroSection />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <StepsSection />
                </div>

                <MindAISection />

                <WhyUsSection />

                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <AboutSection />
                    <ArticlesSection />
                </div>
            </main>

            <LandingFooter />
        </div>
    );
};


export default Landing;
