import React from 'react';

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

    return (
        <section id="resources" className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-text-main dark:text-white">
                    Recent Articles
                </h2>
                <a
                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                    href="#"
                >
                    View All Resources{" "}
                    <span className="material-icons text-sm">arrow_forward</span>
                </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                    <div
                        key={idx}
                        className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col group"
                    >
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            <img
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src={article.img}
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">
                                {article.category}
                            </div>
                            <h3 className="text-xl font-semibold text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-base text-gray-500 dark:text-gray-400 mb-6 flex-1 text-sm leading-relaxed">
                                {article.desc}
                            </p>
                            <a
                                className="text-sm font-bold text-text-main dark:text-gray-200 hover:text-primary flex items-center gap-2"
                                href="#"
                            >
                                Read more{" "}
                                <span className="material-icons text-xs">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ArticlesSection;
