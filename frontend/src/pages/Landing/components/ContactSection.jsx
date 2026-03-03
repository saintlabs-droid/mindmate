import React from 'react';
import SectionHeader from './SectionHeader';

const ContactSection = () => {
    return (
        <section id="contact" className="py-12 animate-in fade-in duration-1000 max-w-4xl mx-auto">
            <div className="space-y-12">
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
        </section>
    );
};

export default ContactSection;
