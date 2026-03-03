import React from 'react';

/**
 * AboutSection: Deep-dive into the MindMate mission.
 * Focuses on psychological safety, clinical grounding, and campus community.
 */
const AboutSection = () => {
    return (
        <section id="about" className="space-y-16 animate-in fade-in duration-1000">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden shadow-2xl bg-primary/5 aspect-square md:aspect-auto md:h-full">
                    <img
                        alt="MindMate vision: Support every student"
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>
                </div>

                <div className="order-1 md:order-2 space-y-8">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                        Our Mission
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-main dark:text-white leading-tight">
                        Ending the Silent Struggle on <span className="text-primary">Campus.</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        MindMate was born from the realization that university life is more than just grades—it's about surviving the transition to adulthood. In Kenya,
                        where thousands of students face academic pressure alone, we provide a digital safety net.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-6 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                            <h4 className="text-2xl font-bold text-primary mb-1 tracking-tight">85%</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-[9px]">Of users report better emotional clarity</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                            <h4 className="text-2xl font-bold text-primary mb-1 tracking-tight">24/7</h4>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-[9px]">Always-on support via MindAI</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* High-Trust Counselor Network Preview */}
            <div className="space-y-8">
                <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-text-main dark:text-white">Expert Guidance You Can Trust</h3>
                    <p className="text-sm text-gray-500 max-w-xl mx-auto font-medium">We collaborate with certified mental health professionals from top Kenyan universities to ensure every resource is clinically grounded.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "Dr. Amani K.", title: "Clinical Psychologist (UoN)", img: "https://i.pravatar.cc/100?img=32" },
                        { name: "Prof. Otieno", title: "Student Counselor (KenU)", img: "https://i.pravatar.cc/100?img=12" },
                        { name: "Ms. Zawadi M.", title: "Mental Health Advocate", img: "https://i.pravatar.cc/100?img=45" },
                        { name: "Dr. Kamau P.", title: "Campus Wellness Lead", img: "https://i.pravatar.cc/100?img=8" },
                    ].map((pro, idx) => (
                        <div key={idx} className="group p-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center space-y-3">
                            <div className="relative mx-auto w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                                <img src={pro.img} alt={pro.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{pro.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{pro.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
