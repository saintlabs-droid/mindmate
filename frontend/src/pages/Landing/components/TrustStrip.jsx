/**
 * TrustStrip: Grayscale logo marquee for institutional credibility.
 */
const TrustStrip = () => {
    return (
        <div className="py-12 bg-white/50 border-y border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <p className="text-[11px] font-black text-neutral-warm uppercase tracking-[0.3em] mb-8">
                    Trusted by student wellness systems <span className="text-primary">across Kenya</span>
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
                    {/* Simplified placeholders representing university/health bodies */}
                    <div className="text-2xl font-bold text-text-main flex items-center gap-2">
                        <span className="material-icons-outlined">school</span>
                        UoN Student Affairs
                    </div>
                    <div className="text-2xl font-bold text-text-main flex items-center gap-2">
                        <span className="material-icons-outlined">local_hospital</span>
                        MOH Wellness Div.
                    </div>
                    <div className="text-2xl font-bold text-text-main flex items-center gap-2">
                        <span className="material-icons-outlined">verified_user</span>
                        KenU Counseling
                    </div>
                    <div className="text-2xl font-bold text-text-main flex items-center gap-2">
                        <span className="material-icons-outlined">group</span>
                        NGAO Coalition
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
