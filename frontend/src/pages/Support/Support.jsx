import React, { useState } from 'react';

const CounselingCard = ({ title, subtitle, location, locationNote, time, type }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${type === 'health' ? 'bg-orange-50 text-orange-500' :
                    type === 'peer' ? 'bg-blue-50 text-blue-500' :
                        'bg-purple-50 text-purple-500'
                    }`}>
                    <span className="material-icons-outlined">
                        {type === 'health' ? 'medical_services' : type === 'peer' ? 'groups' : 'psychology'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="opacity-10 dark:opacity-20 flex">
                        <span className="material-icons text-5xl">
                            {type === 'health' ? 'school' : type === 'peer' ? 'diversity_3' : 'person'}
                        </span>
                    </div>
                    <span className={`material-icons text-gray-400 transition-transform ${isOpen ? '-rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{title}</h3>

            {isOpen && (
                <div className="mt-4 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <span className="material-icons-outlined text-gray-400 text-sm mt-0.5">
                                {type === 'peer' ? 'location_on' : 'location_on'}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{location}</p>
                                <p className="text-xs text-gray-400">{locationNote}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-icons-outlined text-gray-400 text-sm">schedule</span>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{time}</p>
                        </div>
                    </div>

                    <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${type === 'peer'
                        ? 'bg-white border border-orange-500/20 text-orange-500 hover:bg-orange-50 dark:bg-transparent dark:hover:bg-orange-500/10'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}>
                        {type === 'peer' ? (
                            <>
                                <span className="material-icons-outlined text-[18px]">info</span>
                                View Schedule
                            </>
                        ) : (
                            <>
                                <span className="material-icons-outlined text-[18px]">event</span>
                                Book Appointment
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

const HelplineCard = ({ title, status, description, buttonColor, badgeColor, badgeText, callNumber, timeInfo, isEmergency }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`bg-white dark:bg-surface-dark border-l-4 rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden cursor-pointer ${title.includes('Befrienders') ? 'border-l-green-500 border-y border-r border-gray-100 dark:border-gray-800' :
                title.includes('Red Cross') ? 'border-l-red-600 border-y border-r border-gray-100 dark:border-gray-800' :
                    'border-l-purple-500 border-y border-r border-gray-100 dark:border-gray-800'
                }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight mb-2">{title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${badgeColor}`}>
                        {badgeText}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <span className="material-icons-outlined text-[18px]">
                            {title.includes('Befrienders') ? 'favorite' :
                                title.includes('Red Cross') ? 'local_hospital' :
                                    'shield'}
                        </span>
                    </div>
                    <span className={`material-icons text-gray-400 transition-transform ${isOpen ? '-rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="mt-4 animate-fade-in cursor-default" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {description}
                    </p>

                    <button className={`w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-colors flex items-center justify-center gap-2 mb-4 ${buttonColor}`}>
                        <span className="material-icons text-[18px]">phone</span>
                        {callNumber}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="material-icons-outlined text-[14px]">schedule</span>
                        {timeInfo}
                    </div>
                </div>
            )}
        </div>
    );
};


const Support = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in pb-24">

            {/* Emergency Banner */}
            <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-lg p-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                    <span className="material-icons-outlined">warning</span>
                    <p className="font-medium text-sm">In immediate danger? Please don't wait.</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
                    <span className="material-icons text-[18px]">phone</span>
                    Call 999
                </button>
            </div>

            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                    Support Directory
                </h1>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                        You are not alone. Connect with trusted campus counselors or access national helplines anonymously. Help is just a call away.
                    </p>

                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-icons-outlined text-gray-400">search</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none shadow-sm text-gray-900 dark:text-white placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Campus Counseling Section */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        Campus Counseling
                        <span className="bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                            Internal
                        </span>
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
            </div>

            {/* National Helplines Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        National Helplines (Kenya)
                        <span className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                            External • 24/7
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HelplineCard
                        title="Befrienders Kenya"
                        badgeText="Free & Confidential"
                        badgeColor="bg-green-50 text-green-700"
                        description="Offering emotional support to those who are in distress or at risk of suicide."
                        buttonColor="bg-[#0f9d58] hover:bg-[#0b8043]"
                        callNumber="Call Now"
                        timeInfo="Available 8:00 AM - 5:00 PM"
                    />
                    <HelplineCard
                        title="Red Cross Kenya"
                        badgeText="Emergency"
                        badgeColor="bg-red-50 text-red-700"
                        description="Emergency counseling services and immediate crisis intervention."
                        buttonColor="bg-[#d93025] hover:bg-[#b3291f]"
                        callNumber="Call 1199"
                        timeInfo="Available 24/7"
                    />
                    <HelplineCard
                        title="Gender Violence RC"
                        badgeText="Recovery Center"
                        badgeColor="bg-purple-50 text-purple-700"
                        description="Specialized medical and psychosocial support for survivors of gender-based violence."
                        buttonColor="bg-[#9333ea] hover:bg-[#7e22ce]"
                        callNumber="Call Toll-Free"
                        timeInfo="Available 24/7"
                    />
                </div>
            </div>

        </div>
    );
};

export default Support;
