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
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12 scroll-smooth bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* --- Emergency Banner --- */}
                <div className="bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20 -mx-4 md:-mx-8 px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <span className="material-icons text-lg">report_problem</span>
                        <p className="text-sm font-medium">In immediate danger? Please don't wait.</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all active:scale-95">
                        <span className="material-icons text-sm">call</span>
                        Call 999
                    </button>
                </div>

                <div className="pt-6">
                    {/* --- Header & Search --- */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Support Directory
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm md:text-base">
                                You are not alone. Connect with trusted campus counselors or access national helplines anonymously. Help is just a call away.
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                            <input
                                type="text"
                                placeholder="Search for help..."
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- Internal Resources: Campus Counseling --- */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 bg-primary rounded-full"></div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                Campus Counseling
                                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Internal</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CounselingCard
                                type="health"
                                title="University Health Center"
                                subtitle="General mental health support & triage."
                                location="Block B, Room 102"
                                locationNote="Main Campus"
                                time="Mon - Fri, 8:00 AM - 5:00 PM"
                            />
                            <CounselingCard
                                type="peer"
                                title="Peer Counseling Group"
                                subtitle="Student-led support sessions."
                                location="Student Center"
                                locationNote="Lounge Area 3"
                                time="Tue & Thu, 4:00 PM - 6:00 PM"
                            />
                            <CounselingCard
                                type="psychologist"
                                title="Dr. Amina Njoroge"
                                subtitle="Senior Clinical Psychologist."
                                location="Admin Block, Room 405"
                                locationNote="By Appointment Only"
                                time="Wed & Fri, 9:00 AM - 1:00 PM"
                            />
                        </div>
                    </section>

                    {/* --- External Resources: National Helplines --- */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 bg-primary rounded-full"></div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                National Helplines (Kenya)
                                <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">External • 24/7</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <HelplineCard
                                title="Befrienders Kenya"
                                badgeText="Free & Confidential"
                                badgeColor="bg-green-50 text-green-600 dark:bg-green-900/20"
                                description="Offering emotional support to those who are in distress or at risk of suicide."
                                buttonColor="bg-green-600"
                                callNumber="Call Now"
                                timeInfo="Available 8:00 AM - 5:00 PM"
                            />
                            <HelplineCard
                                title="Red Cross Kenya"
                                badgeText="Emergency"
                                badgeColor="bg-red-50 text-red-600 dark:bg-red-900/20"
                                description="Emergency counseling services and immediate crisis intervention."
                                buttonColor="bg-red-600"
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
                </div>

                {/* Footer Spacer */}
                <div className="h-10"></div>
            </div>
        </div>
    );
};

export default Support;


