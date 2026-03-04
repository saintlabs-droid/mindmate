const ImpactMetrics = () => {
    const stats = [
        { value: "15K+", label: "Active Students", desc: "Across 12 campuses" },
        { value: "250K+", label: "Check-ins", desc: "Safe, anonymous logs" },
        { value: "98%", label: "Privacy Rating", desc: "Student trust score" },
        { value: "24/7", label: "Availability", desc: "On-demand AI support" }
    ];

    return (
        <section className="py-24 bg-primary/5 rounded-[4rem] px-8 md:px-16 my-32 mx-6 md:mx-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="text-center space-y-4">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight">
                            {stat.value}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black text-text-main uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <p className="text-[11px] font-medium text-neutral-warm uppercase tracking-widest opacity-80">
                                {stat.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImpactMetrics;
