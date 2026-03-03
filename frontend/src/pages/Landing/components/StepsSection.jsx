import React from 'react';

/**
 * StepsSection: Explains the 'Log-View-Reflect' framework for wellness.
 * Designed to provide a clear mental framework for new users.
 */
const StepsSection = () => {
    const steps = [
        {
            id: 1,
            title: "Log",
            icon: "edit",
            desc: "Take a moment each day to record your mood and thoughts in a private, secure journal.",
        },
        {
            id: 2,
            title: "View",
            icon: "bar_chart",
            desc: "Visualize your emotional patterns over the semester to understand your triggers better.",
        },
        {
            id: 3,
            title: "Reflect",
            icon: "self_improvement",
            desc: "Get personalized prompts and local support resources to help you regain your balance.",
        },
    ];

    return (
        <section id="how-it-works" className="py-12 border-t border-primary/10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-6">
                    Simple Steps to Balance
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Build a healthy routine with our proven 3-step framework
                    designed for the busy student lifestyle.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"></div>
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="group flex flex-col items-center text-center animate-in fade-in duration-700"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 shadow-md group-hover:shadow-xl group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center mb-8 relative z-10">
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-icons text-3xl">
                                    {step.icon}
                                </span>
                            </div>
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm border-2 border-white dark:border-background-dark">
                                {step.id}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-3">
                            {step.title}
                        </h3>
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StepsSection;
