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
            icon: "history_edu",
            desc: "Take a moment each day to record your mood and thoughts in a private, secure journal.",
        },
        {
            id: 2,
            title: "View",
            icon: "insights",
            desc: "Visualize your emotional patterns over the semester to understand your triggers better.",
        },
        {
            id: 3,
            title: "Reflect",
            icon: "psychology",
            desc: "Get personalized prompts and local support resources to help you regain your balance.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 animate-in fade-in duration-700">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-main">A Simple Framework for Balance</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
                <p className="text-lg text-neutral-warm max-w-2xl mx-auto">
                    We've designed MindMate to fit effortlessly into your campus routine, providing structure where there’s often chaos.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className="group relative p-10 bg-white dark:bg-surface-dark rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-premium hover:-translate-y-2 transition-all duration-500"
                    >
                        {/* Connecting Line (Desktop) */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-[25%] -right-10 w-20 h-px border-t-2 border-dashed border-primary/20 z-0"></div>
                        )}

                        <div className="w-24 h-24 rounded-3xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                            <span className="material-icons-outlined text-4xl">
                                {step.icon}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-text-main">{step.title}</h3>
                        <p className="text-neutral-warm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StepsSection;
