import React from 'react';

/**
 * HeroSection: Primary mission statement and high-impact CTA.
 * Designed to build trust through student-focused imagery and testimonials.
 */
const HeroSection = () => {
    return (
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
            <div className="space-y-8 md:pr-8 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Mental Wellness for Students
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-text-main dark:text-white">
                    Your Student Journey,{" "}
                    <span className="text-primary relative inline-block">
                        Balanced.
                        <svg
                            className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 10"
                        >
                            <path
                                d="M0 5 Q 50 10 100 5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                            ></path>
                        </svg>
                    </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                    Navigating university life in Kenya can be overwhelming.
                    MindMate is your safe space to track your mood, reflect on your
                    day, and find resources tailored just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                        href="/signup/"
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-lg"
                    >
                        Start Your Journey
                        <span className="material-icons text-sm">arrow_forward</span>
                    </a>
                    <button className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-lg">
                        <span className="material-icons text-primary">
                            play_circle
                        </span>
                        See How It Works
                    </button>
                </div>
                <div className="flex items-center gap-4 pt-8">
                    <div className="flex -space-x-4">
                        {[1, 2, 3].map((i) => (
                            <img
                                key={i}
                                alt={`Student avatar ${i}`}
                                className="w-12 h-12 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            />
                        ))}
                    </div>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        Trusted by students across{" "}
                        <span className="font-semibold text-text-main dark:text-gray-200">
                            12 campuses
                        </span>
                    </p>
                </div>
            </div>

            <div className="relative h-full min-h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-700">
                <img
                    alt="University students"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    src="https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
                    <div className="flex items-start gap-4">
                        <span className="material-icons text-primary text-4xl">
                            format_quote
                        </span>
                        <div>
                            <p className="text-base text-gray-700 dark:text-gray-200 italic mb-3">
                                "It's easier to focus on my studies when I'm not carrying
                                all my stress alone. MindMate helps me unpack my day."
                            </p>
                            <p className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
                                — Sarah O., UoN
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
