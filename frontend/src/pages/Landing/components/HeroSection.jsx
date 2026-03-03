import React from 'react';
import heroImage from '../../../assets/hero.png';

/**
 * HeroSection: Exact replica of Wysa's hero design
 */
const HeroSection = () => {
    return (
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-8 lg:py-12">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="space-y-4">
                    <h1 className="text-5xl lg:text-6xl font-normal leading-tight text-text-main">
                        Student wellness,
                    </h1>
                    <h1 className="text-5xl lg:text-6xl font-normal leading-tight text-text-main">
                        reimagined
                    </h1>
                </div>

                <p className="text-lg font-semibold text-text-main pt-4">
                    Private. Judgment-free. Always accessible.
                </p>

                <div className="space-y-4 max-w-xl pt-2">
                    <p className="text-base text-text-main leading-relaxed">
                        From your first conversation to ongoing wellness, MindMate provides trusted, research-backed mental health support designed specifically for university life.
                    </p>
                    <p className="text-base text-text-main leading-relaxed">
                        Whether you need someone to talk to, professional guidance, or immediate help, MindMate is here for every step of your journey.
                    </p>
                </div>

                <div className="pt-6">
                    <a
                        href="/signup/"
                        className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-95"
                    >
                        Get started
                    </a>
                </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 flex justify-center lg:justify-end">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg w-full max-w-md h-[28rem]">
                    <img
                        alt="Person using mental health support"
                        className="w-full h-full object-cover"
                        src={heroImage}
                    />
                </div>
            </div>
        </section>
    );
};


export default HeroSection;

