import React from 'react';

/**
 * LandingFooter: Structured foundation for the landing page.
 * Includes sitemap, university partners, and critical crisis links.
 */
const LandingFooter = () => {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-primary/10 dark:border-primary/20">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-sm">spa</span>
                            </div>
                            <span className="font-bold text-primary text-lg">MindMate</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            Your dedicated companion for mental wellness journey in university.
                            Built for students, by students.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-text-main dark:text-white uppercase tracking-widest text-[10px]">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/about">About Us</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/support">Resources</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-text-main dark:text-white uppercase tracking-widest text-[10px]">Contact & Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a className="hover:text-primary transition-colors" href="mailto:support@mindmate.ke">support@mindmate.ke</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">University Liaisons</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">General Inquiry</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4 border-l-2 border-crisis/10 pl-6">
                        <h4 className="font-bold text-crisis uppercase tracking-widest text-[10px]">Crisis Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li className="font-bold text-crisis/80">Helpline: +254 700 000000</li>
                            <li><a className="hover:text-crisis transition-colors font-medium" href="/support">View Crisis Contacts</a></li>
                            <li className="text-[10px] leading-tight opacity-70">Available 24/7 for student emergencies.</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 MindMate Kenya. All rights reserved.</p>
                    <div className="flex gap-6 font-medium">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
