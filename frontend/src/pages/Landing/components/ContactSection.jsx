import React from 'react';
import SectionHeader from './SectionHeader';

const ContactSection = () => {
    return (
        <section id="contact" className="py-12 animate-in fade-in duration-1000">
            <div className="grid lg:grid-cols-3 gap-20 items-start">
                <div className="lg:col-span-2 space-y-12">
                    <SectionHeader
                        title="Let's Talk Wellness"
                        subtitle="Whether you're a student seeking help, a university partner, or a wellness advocate, your voice matters to us. Reach out today."
                    />

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-white dark:bg-surface-dark rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-premium">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest pl-2 font-display">Full Name</label>
                            <input
                                type="text"
                                placeholder="Amani Kamau"
                                className="w-full bg-background-light dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest pl-2 font-display">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@university.ac.ke"
                                className="w-full bg-background-light dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest pl-2 font-display">Inquiry Type</label>
                            <select className="w-full bg-background-light dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer">
                                <option>General Inquiry</option>
                                <option>University Partnership</option>
                                <option>Support Feedback</option>
                                <option>Crisis Follow-up</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-text-main uppercase tracking-widest pl-2 font-display">Message</label>
                            <textarea
                                rows="5"
                                placeholder="How can we help?"
                                className="w-full bg-background-light dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                            />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button className="w-full bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-premium hover:brightness-105 active:scale-95 transition-all text-[11px] uppercase tracking-[0.2em]">
                                Send Message to Team
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-12">
                    <div className="p-10 bg-primary/5 dark:bg-primary/10 rounded-[2rem] border border-primary/10 space-y-8">
                        <h4 className="text-xs font-black text-primary uppercase tracking-[0.25em]">University Direct</h4>
                        <div className="space-y-6">
                            {[
                                { univ: "UoN (Counseling)", phone: "+254 711 000 000" },
                                { univ: "KenU (Life Support)", phone: "+254 722 000 000" },
                                { univ: "Strathmore (Wellness)", phone: "+254 733 000 000" },
                            ].map((u, i) => (
                                <div key={i} className="group">
                                    <p className="text-xs font-black text-text-main uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{u.univ}</p>
                                    <p className="text-lg font-bold text-neutral-warm font-mono tracking-tighter">{u.phone}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-primary/10">
                            <p className="text-[10px] font-bold text-neutral-warm italic leading-relaxed">Lines are monitored 24/7 by campus security and counseling departments.</p>
                        </div>
                    </div>

                    <div className="px-6 space-y-6">
                        <h4 className="text-[10px] font-black text-text-main uppercase tracking-[0.3em]">MindMate Socials</h4>
                        <div className="flex gap-4">
                            {[
                                { icon: "facebook", label: "Facebook" },
                                { icon: "camera_alt", label: "Instagram" },
                                { icon: "alternate_email", label: "X / Twitter" }
                            ].map((social, idx) => (
                                <div key={idx} className="w-14 h-14 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-neutral-warm hover:text-white hover:bg-primary hover:border-primary transition-all duration-500 cursor-pointer shadow-sm">
                                    <span className="material-icons-outlined text-xl">{social.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
