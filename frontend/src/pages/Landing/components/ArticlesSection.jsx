import React from 'react';
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
            desc: "Practical breathing techniques to help you stay calm during finals week.",
            img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Finding Your Tribe",
            category: "Community",
            desc: "How connecting with peers can improve your mental resilience on campus.",
            img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
        },
        {
            title: "Sleep Better",
            category: "Wellness",
            desc: "Why sleep is critical for memory retention and emotional regulation.",
            img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
        },
    ];

    const viewAllLink = (
        <a href="#" className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all group">
            View All Resources
            <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">east</span>
        </a>
    );

    return (
        <section id="resources" className="py-12 animate-in fade-in duration-700">
            <SectionHeader
                title="Resources for Your Growth"
                subtitle="Curated articles and practical guides designed to help you navigate the unique challenges of Kenyan university life."
                actions={viewAllLink}
                className="mb-16"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {articles.map((article, idx) => (
                    <article
                        key={idx}
                        className="group bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-premium hover:-translate-y-2 transition-all duration-500 flex flex-col"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={article.img}
                                alt={`Illustration for: ${article.title}`}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-primary/95 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-sm shadow-lg">
                                    {article.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-10 flex-1 flex flex-col space-y-6">
                            <h3 className="text-2xl font-bold text-text-main leading-snug group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-neutral-warm leading-relaxed line-clamp-2 text-sm">
                                {article.desc}
                            </p>
                            <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                <span className="text-[10px] font-black text-secondary uppercase tracking-widest">5 min read</span>
                                <a
                                    className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group/btn"
                                    href="#"
                                >
                                    Read Article{" "}
                                    <span className="material-icons-outlined text-xs group-hover/btn:translate-x-1 transition-transform">
                                        east
                                    </span>
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default ArticlesSection;
