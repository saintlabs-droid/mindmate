import SectionHeader from './SectionHeader';

/**
 * StepsSection: Explains the 'Log-View-Reflect' framework for wellness.
 * Designed to provide a clear mental framework for new users.
 */
const StepsSection = () => {
    const tools = [
        {
            title: "Log Mood",
            desc: "Track your daily emotions and mental state with quick check-ins. Build awareness of your patterns over time.",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
            label: "Daily Tracking",
            theme: "bg-primary/5 text-primary"
        },
        {
            title: "Insights",
            desc: "Visualize your mental health journey with personalized analytics and mood trends. Understand what affects your wellbeing.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            label: "Analytics",
            theme: "bg-secondary/5 text-secondary"
        },
        {
            title: "MindAI",
            desc: "Chat with our AI companion for instant support, coping strategies, and guided exercises anytime you need.",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
            label: "AI Support",
            theme: "bg-[#7A8A83]/5 text-[#7A8A83]"
        },
        {
            title: "Account",
            desc: "Manage your profile, privacy settings, and preferences. Your data stays secure and under your control.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
            label: "Your Space",
            theme: "bg-primary/5 text-primary"
        }
    ];

    return (
        <section id="how-it-works" className="py-12">
            <SectionHeader
                centered
                className="mb-24"
                title="Tools that work the way campus life does."
                subtitle="Whether you need a quick chat after a lecture or a clinical referral, we support you across the entire continuum of care."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tools.map((tool) => (
                    <div key={tool.title} className="group flex flex-col items-center text-center">
                        <div className="mb-8 relative">
                            {/* Leaf-shaped Mask - Wysa Style */}
                            <div className="w-56 h-56 rounded-full rounded-tr-none overflow-hidden shadow-premium group-hover:scale-[1.03] transition-transform duration-700 bg-gray-50">
                                <img
                                    src={tool.image}
                                    alt={tool.title}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${tool.theme} backdrop-blur-sm border border-white/20`}>
                                {tool.label}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-text-main">{tool.title}</h3>
                        <p className="text-sm text-neutral-warm leading-relaxed px-4">{tool.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default StepsSection;
