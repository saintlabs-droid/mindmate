/**
 * LandingFooter: Structured foundation for the landing page.
 * Includes sitemap, university partners, and critical crisis links.
 */
const LandingFooter = () => {
    return (
        <footer className="bg-[#fcfbf9] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-10 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <span className="material-icons-outlined text-xl">psychology</span>
                            </div>
                            <span className="font-bold text-text-main text-2xl tracking-tight">MindMate</span>
                        </div>
                        <p className="text-base text-neutral-warm leading-relaxed max-w-sm">
                            Redefining student wellness in Kenya with evidence-based AI support and clinical integration.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[11px]">Features</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="/ai-assistant">AI Companion</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/journal">Mood Journal</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/insights">Wellness Insights</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/support">Support Hub</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[11px]">Platform</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="/dashboard">Dashboard</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/account">Profile</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/about">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-warm/40">
                    <p>© 2026 MindMate Clinical Systems.</p>
                    <div className="flex gap-8">
                        <a className="hover:text-primary transition-colors" href="#">Privacy & Anonymity</a>
                        <a className="hover:text-primary transition-colors" href="#">Clinical Governance</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default LandingFooter;
