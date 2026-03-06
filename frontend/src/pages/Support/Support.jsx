import { useState } from 'react';
import CounselingCard from './components/CounselingCard';
import HelplineCard from './components/HelplineCard';

/**
 * Support Directory Page
 * Clean design matching Landing page aesthetic.
 */
const Support = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex-1 overflow-y-auto pb-16 bg-background-light dark:bg-background-dark">

            {/* Emergency Banner */}
            <div className="bg-secondary/5 border-b border-secondary/10 px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-secondary">
                    <span className="material-icons-outlined text-lg">emergency</span>
                    <p className="text-sm font-medium">In immediate danger? Please don't wait.</p>
                </div>
                {/* Sharp-edged emergency CTA */}
                <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors">
                    <span className="material-icons-outlined text-sm">call</span>
                    Call 999 Now
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 space-y-6">

                {/* Search Bar */}
                <div className="flex justify-end">
                    <div className="relative w-full max-w-md">
                        <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <label htmlFor="support-search" className="sr-only">Search counselor or helpline</label>
                        <input
                            id="support-search"
                            type="text"
                            placeholder="Search counselor, helpline..."
                            className="w-full pl-12 pr-6 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Campus Counseling */}
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-1 h-8 bg-primary"></div>
                        <div>
                            <h2 className="text-xl font-normal text-text-main dark:text-white flex items-center gap-3">
                                Campus Counseling
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium">Internal</span>
                            </h2>
                            <p className="text-neutral-warm text-sm mt-1">Verified university mental health professionals</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* National Helplines */}
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-1 h-8 bg-secondary"></div>
                        <div>
                            <h2 className="text-xl font-normal text-text-main dark:text-white flex items-center gap-3">
                                National Helplines (Kenya)
                                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium">External</span>
                            </h2>
                            <p className="text-neutral-warm text-sm mt-1">Free, anonymous, and always available</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            badgeColor="bg-purple-100 text-purple-600"
                            description="Specialized medical and psychosocial support for survivors of gender-based violence."
                            buttonColor="bg-purple-600"
                            callNumber="Call Toll-Free"
                            timeInfo="Available 24/7"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Support;


