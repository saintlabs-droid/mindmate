import React from 'react';

/**
 * ContactSection: Professional support and inquiry boundary.
 * Features a direct contact form and university-specific support links.
 */
const ContactSection = () => {
    return (
        <section id="contact" className="border-t border-primary/10 pt-16 animate-in fade-in duration-1000">
            <div className="grid md:grid-cols-3 gap-16 items-start">
                <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-text-main dark:text-white">Get in Touch</h2>
                        <p className="text-sm text-gray-500 max-w-lg font-medium">Whether you're a student seeking help, a university partner, or a wellness advocate, we'd love to hear from you.</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Amani Kamau"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@university.ac.ke"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Inquiry Type</label>
                            <select className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none">
                                <option>General Inquiry</option>
                                <option>University Partnership</option>
                                <option>Support Feedback</option>
                                <option>Crisis Follow-up</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="How can we help?"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                            />
                        </div>
                        <div className="md:col-span-2 pt-2">
                            <button className="w-full md:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-12 pt-16 md:pt-24">
                    <div className="p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 space-y-6">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest">University Direct</h4>
                        <div className="space-y-4">
                            {[
                                { univ: "UoN (Counseling)", phone: "+254 711 000 000" },
                                { univ: "KenU (Life Support)", phone: "+254 722 000 000" },
                                { univ: "Strathmore (Wellness)", phone: "+254 733 000 000" },
                            ].map((u, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-xs font-bold text-text-main dark:text-white uppercase tracking-tight">{u.univ}</p>
                                    <p className="text-[11px] font-bold text-gray-500 font-mono tracking-widest">{u.phone}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-primary/10">
                            <p className="text-[10px] font-bold text-gray-400 italic leading-tight">University lines are monitored by campus security and counseling departments.</p>
                        </div>
                    </div>

                    <div className="px-4 space-y-3">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">MindMate Socials</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <span className="material-icons text-xl">facebook</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <span className="material-icons text-xl">camera_alt</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <span className="material-icons text-xl">alternate_email</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
