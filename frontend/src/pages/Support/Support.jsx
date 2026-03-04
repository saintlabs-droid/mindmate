import React, { useState } from 'react';
import CounselingCard from './components/CounselingCard';
import HelplineCard from './components/HelplineCard';

/**
 * Support Directory Page
 * Restored to exact mockup specifications.
 */
const Support = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex-1 overflow-y-auto pb-16 scroll-smooth bg-background-light dark:bg-background-dark">

            {/* --- Emergency Banner --- */}
            <div className="bg-secondary/10 border-b border-secondary/20 px-8 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-secondary">
                    <span className="material-icons-outlined text-lg">emergency</span>
                    <p className="text-sm font-black uppercase tracking-widest">In immediate danger? Please don't wait.</p>
                </div>
                <button className="bg-secondary hover:brightness-110 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95">
                    <span className="material-icons-outlined text-sm">call</span>
                    Call 999 Now
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 space-y-16">

                {/* --- Header & Search --- */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Wellness Network</p>
                        <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tight mb-3">
                            Support Directory
                        </h1>
                        <p className="text-neutral-warm font-medium max-w-2xl leading-relaxed">
                            You are never alone. Connect with trusted campus counselors or access national helplines — always confidential, always free.
                        </p>
                    </div>

                    <div className="relative w-full lg:w-96">
                        <span className="material-icons-outlined absolute left-5 top-1/2 -translate-y-1/2 text-neutral-warm/60 text-lg">search</span>
                        <label htmlFor="support-search" className="sr-only">Search counselor or helpline</label>
                        <input
                            id="support-search"
                            type="text"
                            placeholder="Search counselor, helpline..."
                            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-surface-dark border border-gray-50 dark:border-white/10 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none shadow-premium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- Internal Resources: Campus Counseling --- */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight flex items-center gap-4">
                                Campus Counseling
                                <span className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Internal</span>
                            </h2>
                            <p className="text-neutral-warm text-sm font-medium mt-1">Verified university mental health professionals</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CounselingCard
                            type="health"
                            title="University Health Center"
                            subtitle="General mental health support & professional triage."
                            location="Block B, Room 102"
                            locationNote="Main Campus"
                            time="Mon - Fri, 8:00 AM - 5:00 PM"
                        />
                        <CounselingCard
                            type="peer"
                            title="Peer Counseling Group"
                            subtitle="Student-led, empathy-first support sessions."
                            location="Student Center"
                            locationNote="Lounge Area 3"
                            time="Tue & Thu, 4:00 PM - 6:00 PM"
                        />
                        <CounselingCard
                            type="psychologist"
                            title="Dr. Amina Njoroge"
                            subtitle="Senior Clinical Psychologist — UoN Certified."
                            location="Admin Block, Room 405"
                            locationNote="By Appointment Only"
                            time="Wed & Fri, 9:00 AM - 1:00 PM"
                        />
                    </div>
                </section>

                {/* --- External Resources: National Helplines --- */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight flex items-center gap-4">
                                National Helplines (Kenya)
                                <span className="px-4 py-1.5 rounded-xl bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest">External · 24/7</span>
                            </h2>
                            <p className="text-neutral-warm text-sm font-medium mt-1">Free, anonymous, and always available</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <HelplineCard
                            title="Befrienders Kenya"
                            badgeText="Free & Confidential"
                            badgeColor="bg-primary/10 text-primary"
                            description="Offering compassionate emotional support to those in distress or at risk of suicide."
                            buttonColor="bg-primary"
                            callNumber="Call Now"
                            timeInfo="Available 8:00 AM - 5:00 PM"
                        />
                        <HelplineCard
                            title="Red Cross Kenya"
                            badgeText="Crisis Response"
                            badgeColor="bg-secondary/10 text-secondary"
                            description="Emergency counseling services and immediate crisis intervention for all Kenyans."
                            buttonColor="bg-secondary"
                            callNumber="Call 1199"
                            timeInfo="Available 24/7"
                        />
                        <HelplineCard
                            title="Gender Violence RC"
                            badgeText="Recovery Center"
                            badgeColor="bg-purple-100 text-purple-600 dark:bg-purple-900/20"
                            description="Specialized medical and psychosocial support for survivors of gender-based violence."
                            buttonColor="bg-purple-600"
                            callNumber="Call Toll-Free"
                            timeInfo="Available 24/7"
                        />
                    </div>
                </section>

                {/* Footer Spacer */}
                <div className="h-10"></div>
            </div>
        </div>
    );
};

export default Support;


