import React from 'react';
import { useUser } from '../../context/UserContext';
import MoodHero from './components/MoodHero';
import WeekReviewChart from './components/WeekReviewChart';
import DailyQuote from './components/DailyQuote';
import JournalPreview from './components/JournalPreview';

/**
 * Dashboard Page
 * Provides a comprehensive overview of the user's wellness metrics.
 */
const Dashboard = () => {
    const { user } = useUser();
    const firstName = user?.fullName?.split(' ')[0] || 'there';

    // Mock data for UI demonstration
    const weekData = [
        { day: 'Mon', h: '60%' },
        { day: 'Tue', h: '40%' },
        { day: 'Wed', h: '80%' },
        { day: 'Thu', h: '55%' },
        { day: 'Fri', h: '70%' },
        { day: 'Sat', h: '45%' },
        { day: 'Sun', h: '75%', bold: true }
    ];

    const journalEntries = [
        {
            time: '8:30 PM Yesterday',
            title: 'Feeling tired',
            preview: 'Three deadlines next week...'
        }
    ];

    const moods = [
        { emoji: '😄', label: 'Great' },
        { emoji: '🙂', label: 'Good' },
        { emoji: '😐', label: 'Okay' },
        { emoji: '😔', label: 'Low' },
        { emoji: '😣', label: 'Bad' }
    ];

    const dailyQuote = "You are capable of amazing things, even when you're tired.";

    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
            <div className="max-w-6xl mx-auto space-y-4">

                {/* Desktop Header Area */}
                <div className="hidden md:flex items-center justify-between py-4">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Jambo, {firstName} 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Here's your daily well-being overview.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                            <span className="material-icons-outlined text-lg">notifications</span>
                            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-primary rounded-full border border-background-light dark:border-background-dark"></span>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                            <span className="material-icons-outlined text-lg">settings</span>
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <MoodHero firstName={firstName} moods={moods} />

                {/* Grid Layout for Charts & Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Chart Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <WeekReviewChart data={weekData} />

                        {/* Recommended Resources (Static) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 hover:shadow-md transition-all cursor-pointer">
                                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-icons-outlined text-xl">school</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Exam Stress?</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Proven anxiety techniques.</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 hover:shadow-md transition-all cursor-pointer">
                                <div className="h-10 w-10 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-green-600 dark:text-green-400">
                                    <span className="material-icons-outlined text-xl">self_improvement</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Meditation</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">10-minute mind reset.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Widgets Column */}
                    <div className="space-y-4">
                        <DailyQuote quote={dailyQuote} />
                        <JournalPreview entries={journalEntries} />

                        {/* Tip of the Day */}
                        <div className="bg-primary-light dark:bg-gray-800/50 rounded-xl p-4 border border-primary/10 dark:border-gray-700 shadow-sm">
                            <div className="flex items-start gap-3">
                                <span className="material-icons-outlined text-primary text-xl">lightbulb</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-[11px]">Tip of the Day</h4>
                                    <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">
                                        Hydration affects mood. Take a sip right now!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
