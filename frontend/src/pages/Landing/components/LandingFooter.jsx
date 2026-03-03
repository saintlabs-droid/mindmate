import React from 'react';

/**
 * LandingFooter: Structured foundation for the landing page.
 * Includes sitemap, university partners, and critical crisis links.
 */
const LandingFooter = () => {
    return (
        <footer className="bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-premium">
                                <span className="material-icons-outlined text-xl">psychology</span>
                            </div>
                            <span className="font-bold text-text-main text-2xl tracking-tight">MindMate</span>
                        </div>
                        <p className="text-sm text-neutral-warm leading-relaxed max-w-xs font-medium">
                            Your dedicated companion for the mental wellness journey in university. Built for Kenyan students, by students.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[10px]">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-all flex items-center gap-2 group" href="/"><span className="w-1 h-1 rounded-full bg-primary/20 group-hover:w-3 transition-all"></span>Home</a></li>
                            <li><a className="hover:text-primary transition-all flex items-center gap-2 group" href="#about"><span className="w-1 h-1 rounded-full bg-primary/20 group-hover:w-3 transition-all"></span>About Us</a></li>
                            <li><a className="hover:text-primary transition-all flex items-center gap-2 group" href="#resources"><span className="w-1 h-1 rounded-full bg-primary/20 group-hover:w-3 transition-all"></span>Resources</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black text-text-main uppercase tracking-[0.2em] text-[10px]">Contact & Support</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm font-medium">
                            <li><a className="hover:text-primary transition-all" href="mailto:support@mindmate.ke">hello@mindmate.co.ke</a></li>
                            <li><a className="hover:text-primary transition-all" href="#">University Liaisons</a></li>
                            <li><a className="hover:text-primary transition-all" href="#">General Inquiry</a></li>
                        </ul>
                    </div>

                    <div className="p-8 bg-secondary/5 rounded-3xl border border-secondary/10 space-y-6">
                        <h4 className="font-black text-secondary uppercase tracking-[0.2em] text-[10px]">Emergency Support</h4>
                        <ul className="space-y-4 text-sm text-neutral-warm">
                            <li className="font-black text-secondary text-lg font-mono">24/7 Helpline: +254 700 000</li>
                            <li><a className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md" href="/support">View Crisis Contacts</a></li>
                            <li className="text-[10px] leading-tight font-bold italic text-secondary/60">Monitored by medical professionals.</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-black uppercase tracking-widest text-neutral-warm/60">
                    <p>© 2026 MindMate Kenya. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
