import SectionHeader from './SectionHeader';

/**
 * ArticlesSection: Resource previews for the wellness ecosystem.
 * Highlights community-driven content and expert study/wellness tips.
 */
const ArticlesSection = () => {
    const articles = [
        {
            title: "Managing Exam Anxiety",
            category: "Study Tips",
            desc: "Practical breathing techniques to help you stay calm during finals week. Accelerating student access to clinically proven AI.",
            img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Finding Your Tribe",
            category: "Community",
            desc: "How connecting with peers can improve your mental resilience on campus. Finding the right support system early.",
            img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Sleep Better",
            category: "Wellness",
            desc: "Why sleep is critical for memory retention and emotional regulation. Evidence-based protocols for better rest.",
            img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        },
    ];

    const viewAllLink = (
        <a href="#" className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all group">
            View All Resources
            <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">east</span>
        </a>
    );

    return (
        <section id="resources" className="pt-24 pb-12 animate-in fade-in duration-700">
            <SectionHeader
                title="Resources for Your Growth"
                subtitle="Curated articles and practical guides designed to help you navigate the unique challenges of Kenyan university life."
                actions={viewAllLink}
                className="mb-16"
            />

            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    {articles.map((article, idx) => (
                        <article key={idx} className="flex flex-col space-y-5 group">
                            {/* Image Container */}
                            <div className="aspect-[16/10] rounded-[1.25rem] overflow-hidden bg-gray-50 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                                <img
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-neutral-warm/60 leading-snug">
                                    {article.category} • MindMate Clinical Insights
                                </p>

                                <a
                                    href="#"
                                    className="block text-xl font-bold text-primary underline decoration-[2.5px] underline-offset-[7px] hover:text-primary-dark transition-colors leading-tight"
                                >
                                    {article.title}
                                </a>

                                <p className="text-[13px] text-neutral-warm leading-relaxed line-clamp-3">
                                    {article.desc}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;
