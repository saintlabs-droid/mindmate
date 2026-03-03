import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import MoodHero from './components/MoodHero';
import WeekReviewChart from './components/WeekReviewChart';
import DailyQuote from './components/DailyQuote';
import JournalPreview from './components/JournalPreview';

/**
 * Dashboard Page
 * Restored to exact mockup specifications.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const firstName = user?.fullName?.split(' ')[0] || 'Imani';

    // Mock data matching mockup visuals
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
            time: 'Yesterday, 8:30 PM',
            title: 'Feeling overwhelmed by assignments',
            preview: 'I have three deadlines next week and I\'m not sure where to start...'
        },
        {
            time: '2 days ago',
            title: 'Had a great chat with mom'
        }
    ];

    const moods = [
        { emoji: '😄', label: 'Great' },
        { emoji: '🙂', label: 'Good' },
        { emoji: '😐', label: 'Okay' },
        { emoji: '😔', label: 'Low' },
        { emoji: '😣', label: 'Bad' }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Desktop Header Area */}
            <div className="hidden md:flex items-center justify-between px-8 py-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jambo, {firstName} 👋</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Here's your daily well-being overview.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                        <span className="material-icons-outlined">notifications</span>
                        <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                        <span className="material-icons-outlined">settings</span>
                    </button>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-10">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Hero Section: Mood Check-in */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <MoodHero moods={moods} />
                    </div>

                    {/* Grid Layout for Charts & Widgets */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Main Chart Section (Spans 2 columns) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Mood Summary Chart */}
                            <div className="animate-in fade-in zoom-in-95 duration-700 delay-100">
                                <WeekReviewChart data={weekData} />
                            </div>

                            {/* Recommended Resources */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="h-16 w-16 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-icons-outlined text-3xl">school</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Exam Stress?</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">Learn 5 proven techniques to manage anxiety during finals week.</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="h-16 w-16 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400">
                                        <span className="material-icons-outlined text-3xl">self_improvement</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Guided Meditation</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">A 10-minute session to reset your mind between lectures.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Widgets Column */}
                        <div className="space-y-6">

                            {/* MindAI Companion Shortcut Card */}
                            <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 border border-primary/10 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all animate-in fade-in slide-in-from-right-4 duration-700" onClick={() => navigate('/ai-assistant')}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform"></div>
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#ff9f8a] flex items-center justify-center shadow-lg shadow-primary/20">
                                        <span className="material-icons text-white">auto_awesome</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">MindAI Companion</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Feeling overwhelmed? Let's chat.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Daily Affirmation Card */}
                            <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                                <DailyQuote quote="You are capable of amazing things, even on the days you feel tired. One step at a time." />
                            </div>

                            {/* Recent Journal */}
                            <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                                <JournalPreview entries={journalEntries} />
                            </div>

                            {/* Quick Daily Tip */}
                            <div className="bg-primary-light dark:bg-gray-800/50 rounded-2xl p-5 border border-primary/10 dark:border-gray-700">
                                <div className="flex items-start gap-3">
                                    <span className="material-icons-outlined text-primary mt-1">lightbulb</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Tip of the Day</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                            Hydration affects mood. Drink a glass of water right now if you haven't in the last hour.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Spacer */}
                    <div className="h-10"></div>
                </div>
            </div>

            {/* Floating Action Button for MindAI */}
            <button
                onClick={() => navigate('/ai-assistant')}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group overflow-hidden"
                aria-label="Chat with MindAI"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <span className="material-icons text-2xl relative z-10">psychology</span>
            </button>
        </div>
    );
};

export default Dashboard;


