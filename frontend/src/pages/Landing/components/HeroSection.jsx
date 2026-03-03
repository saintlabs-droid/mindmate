import React from 'react';

/**
 * HeroSection: Primary mission statement and high-impact CTA.
 * Designed to build trust through student-focused imagery and testimonials.
 */
const HeroSection = () => {
    return (
        <section className="grid md:grid-cols-2 gap-16 items-center min-h-[600px] py-16">
            <div className="space-y-10 md:pr-12 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    University Wellness Gateway
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] text-text-main">
                    Your Academic Journey, Balanced.
                </h1>
                <p className="text-lg md:text-xl text-neutral-warm leading-relaxed max-w-lg">
                    University life in Kenya is a marathon. MindMate provides the quiet space you need to track your energy, reflect on your wins, and connect with clinical support when it matters most.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                    <a
                        href="/signup/"
                        className="bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-bold shadow-premium transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
                    >
                        Start Growing
                        <span className="material-icons-outlined text-sm">east</span>
                    </a>
                    <button className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-text-main px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3 text-lg group">
                        <span className="material-icons-outlined text-secondary group-hover:scale-110 transition-transform">
                            play_circle_filled
                        </span>
                        The MindMate Story
                    </button>
                </div>
                <div className="flex items-center gap-6 pt-10">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <img
                                key={i}
                                alt="Kenyan university student using MindMate"
                                className="w-14 h-14 rounded-full border-4 border-white dark:border-background-dark object-cover shadow-sm bg-primary/5"
                                src={`https://i.pravatar.cc/100?img=${i + 20}`}
                            />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-neutral-warm">
                        Supporting{" "}
                        <span className="font-bold text-text-main">
                            15,000+ students
                        </span>
                        {" "}across campuses nationwide.
                    </p>
                </div>
            </div>

            <div className="relative h-full min-h-[550px] w-full rounded-3xl overflow-hidden shadow-premium bg-primary/5 animate-in fade-in slide-in-from-right-8 duration-700">
                <img
                    alt="Serene campus environment in Kenya"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                    src="https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=1200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-premium">
                    <div className="flex items-start gap-5">
                        <span className="material-icons-outlined text-primary text-5xl opacity-40">
                            format_quote
                        </span>
                        <div>
                            <p className="text-lg text-text-main dark:text-gray-200 italic mb-4 leading-relaxed font-medium">
                                "My academic performance actually improved once I started journaling. It stopped the mental noise."
                            </p>
                            <p className="text-xs font-black text-primary uppercase tracking-[0.3em]">
                                — Wanjiku M., Engineering Student
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default HeroSection;
