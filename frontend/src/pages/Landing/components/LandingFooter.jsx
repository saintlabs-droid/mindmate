import React from 'react';

/**
 * LandingFooter: Structured foundation for the landing page.
 * Includes sitemap, university partners, and critical crisis links.
 */
const LandingFooter = () => {
    return (
        <footer className="bg-[#fcfbf9] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <span className="material-icons-outlined text-xl">psychology</span>
                            </div>
                            <span className="font-bold text-text-main text-2xl tracking-tight">MindMate</span>
                        </div>
                        <p className="text-base text-neutral-warm leading-relaxed max-w-sm">
                            Redefining student wellness across Kenya with evidence-based AI support, peer networks, and clinical integration.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'instagram', 'alternate_email'].map(icon => (
                                <div key={icon} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-neutral-warm hover:bg-primary hover:text-white transition-all cursor-pointer">
                                    <span className="material-icons-outlined text-lg">{icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[11px]">Platform</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">AI Companion</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Mood Journal</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Clinical Support</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Peer Support</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[11px]">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Wellness Guides</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Exam Stress Tips</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Clinical Blog</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">FAQs</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[11px]">Institution</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="#">Partner Universities</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Department Portal</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Research & Data</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 md:p-12 bg-secondary/5 rounded-[2.5rem] border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="font-black text-secondary uppercase tracking-[0.3em] text-[11px]">Immediate Crisis Support</h4>
                        <p className="text-sm font-medium text-neutral-warm">If you are in immediate danger, please reach out to our 24/7 clinical helpline.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="text-2xl font-black text-secondary font-mono tracking-tighter tabular-nums">
                            0700 000 000
                        </div>
                        <a href="/support" className="bg-secondary text-white px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-secondary/20 hover:brightness-105 active:scale-95 transition-all">
                            Emergency Contacts
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-warm/40">
                    <p>© 2026 MindMate Clinical Systems. Made with ❤️ in Kenya.</p>
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
