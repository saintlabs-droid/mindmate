import React from 'react';
import SectionHeader from './SectionHeader';

const AboutSection = () => {
    return (
        <section id="about" className="py-12 animate-in fade-in duration-1000">
            <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
                <div className="order-2 md:order-1 relative rounded-full rounded-tr-none overflow-hidden shadow-premium bg-primary/5 aspect-square md:aspect-auto md:h-full group">
                    <img
                        alt="MindMate vision: Support every Kenyan student"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <div className="order-1 md:order-2 space-y-10">
                    <SectionHeader
                        badge="Our Core Purpose"
                        title="Ending the Silent Struggle on Campus."
                    />
                    <p className="text-lg text-neutral-warm leading-relaxed font-medium">
                        MindMate was born from the realization that university life is more than just grades—it's about surviving the transition to adulthood. In Kenya,
                        where thousands of students face academic pressure alone, we provide a digital safety net.
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="p-8 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-white/5 shadow-premium">
                            <h4 className="text-3xl font-black text-primary mb-2 tracking-tight">85%</h4>
                            <p className="text-[10px] font-black text-text-main uppercase tracking-widest leading-tight">User Emotional Clarity</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-white/5 shadow-premium">
                            <h4 className="text-3xl font-black text-primary mb-2 tracking-tight">24/7</h4>
                            <p className="text-[10px] font-black text-text-main uppercase tracking-widest leading-tight">MindAI Counselor Access</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wellbeing Support Section */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-4">
                    <p className="text-sm text-neutral-warm leading-relaxed">
                        MindMate is a clinically safe, trusted partner that helps students and universities scale support and improve outcomes. From self-help to care team support, MindMate makes wellbeing support easier to access and more engaging to use. Ready to see more?
                    </p>
                    <div>
                        <a
                            href="/login/"
                            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Login to start logging today
                        </a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg w-96 h-64">
                        <img
                            alt="Student wellbeing support"
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
