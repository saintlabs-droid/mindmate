import React from 'react';

/**
 * AboutSection: Deep-dive into the MindMate mission.
 * Focuses on psychological safety, clinical grounding, and campus community.
 */
const AboutSection = () => {
    return (
        <section id="about" className="py-24 animate-in fade-in duration-1000">
            <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
                <div className="order-2 md:order-1 relative rounded-[2.5rem] overflow-hidden shadow-premium bg-primary/5 aspect-square md:aspect-auto md:h-full">
                    <img
                        alt="MindMate vision: Support every Kenyan student"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
                </div>

                <div className="order-1 md:order-2 space-y-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                        Our Core Purpose
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-main leading-tight">
                        Ending the Silent Struggle on Campus.
                    </h2>
                    <p className="text-lg text-neutral-warm leading-relaxed font-medium">
                        MindMate was born from the realization that university life is more than just grades—it's about surviving the transition to adulthood. In Kenya,
                        where thousands of students face academic pressure alone, we provide a digital safety net.
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="p-8 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-white/5 shadow-premium">
                            <h4 className="text-3xl font-black text-primary mb-2 tracking-tight">85%</h4>
                            <p className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] leading-tight">User Emotional Clarity</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-white/5 shadow-premium">
                            <h4 className="text-3xl font-black text-primary mb-2 tracking-tight">24/7</h4>
                            <p className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] leading-tight">MindAI Counselor Access</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* High-Trust Counselor Network Preview */}
            <div className="space-y-12">
                <div className="text-center space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-text-main text-center">Expert Guidance You Can Trust</h3>
                    <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
                    <p className="text-lg text-neutral-warm max-w-2xl mx-auto font-medium">We collaborate with certified mental health professionals from top Kenyan universities to ensure every resource is clinically grounded.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: "Dr. Amani K.", title: "Clinical Psychologist (UoN)", img: "https://i.pravatar.cc/100?img=32" },
                        { name: "Prof. Otieno", title: "Student Counselor (KenU)", img: "https://i.pravatar.cc/100?img=12" },
                        { name: "Ms. Zawadi M.", title: "Mental Health Advocate", img: "https://i.pravatar.cc/100?img=45" },
                        { name: "Dr. Kamau P.", title: "Campus Wellness Lead", img: "https://i.pravatar.cc/100?img=8" },
                    ].map((pro, idx) => (
                        <div key={idx} className="group p-8 bg-white dark:bg-surface-dark rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-premium hover:-translate-y-2 transition-all duration-500 text-center space-y-6">
                            <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden border-4 border-primary/10 group-hover:border-primary transition-all duration-500">
                                <img src={pro.img} alt={`Professional portrait of ${pro.name}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors mb-1">{pro.name}</h4>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{pro.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
