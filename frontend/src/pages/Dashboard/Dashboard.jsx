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
    const firstName = user?.fullName?.split(' ')[0] || 'Student';

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
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light">
            {/* Desktop Header Area */}
            <div className="hidden md:flex items-center justify-between px-10 py-10">
                <div>
                    <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tight">Jambo, {firstName} 👋</h1>
                    <p className="text-neutral-warm font-medium mt-2">Here's your daily well-being overview.</p>
                </div>
                <div className="flex items-center gap-6">
                    <button className="relative p-4 text-neutral-warm hover:text-primary transition-all rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-50">
                        <span className="material-icons-outlined text-xl">notifications</span>
                        <span className="absolute top-4 right-4 h-2 w-2 bg-secondary rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-4 text-neutral-warm hover:text-primary transition-all rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-50">
                        <span className="material-icons-outlined text-xl">settings</span>
                    </button>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-16">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* Hero Section: Mood Check-in */}
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <MoodHero moods={moods} />
                    </div>

                    {/* Grid Layout for Charts & Widgets */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Main Chart Section (Spans 2 columns) */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Mood Summary Chart */}
                            <div className="animate-in fade-in zoom-in-95 duration-1000 delay-100">
                                <WeekReviewChart data={weekData} />
                            </div>

                            {/* Recommended Resources */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-premium flex flex-col gap-6 hover:translate-y-[-4px] transition-all cursor-pointer group">
                                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <span className="material-icons-outlined text-3xl">local_library</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-text-main text-lg mb-2">Academic Wellness</h4>
                                        <p className="text-sm text-neutral-warm font-medium leading-relaxed">Learn 5 proven techniques to manage anxiety during campus finals.</p>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-premium flex flex-col gap-6 hover:translate-y-[-4px] transition-all cursor-pointer group">
                                    <div className="h-16 w-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                        <span className="material-icons-outlined text-3xl">self_improvement</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-text-main text-lg mb-2">Mindful Reset</h4>
                                        <p className="text-sm text-neutral-warm font-medium leading-relaxed">A specialized 10-minute session to reset your focus between lectures.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Side Widgets Column */}
                        <div className="space-y-10">

                            {/* MindAI Companion Shortcut Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 border border-primary/10 shadow-premium relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all animate-in fade-in slide-in-from-right-6 duration-1000" onClick={() => navigate('/ai-assistant')}>
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                        <span className="material-icons-outlined text-white text-3xl">smart_toy</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">AI Companion</p>
                                        <h4 className="text-2xl font-black text-text-main mb-2">Need to talk?</h4>
                                        <p className="text-sm text-neutral-warm font-medium">MindAI is ready to listen and provide support anytime.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Daily Affirmation Card */}
                            <div className="animate-in fade-in slide-in-from-right-6 duration-1000 delay-200">
                                <DailyQuote quote="You are resilient, capable, and exactly where you need to be to grow. Trust the process." />
                            </div>

                            {/* Recent Journal */}
                            <div className="animate-in fade-in slide-in-from-right-6 duration-1000 delay-300">
                                <JournalPreview entries={journalEntries} />
                            </div>

                            {/* Quick Daily Tip */}
                            <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                                <div className="flex flex-col gap-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                        <span className="material-icons-outlined text-xl">lightbulb</span>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-text-main text-sm uppercase tracking-widest mb-3">Campus Insight</h4>
                                        <p className="text-sm text-neutral-warm font-medium leading-relaxed italic">
                                            "Taking a 5-minute walk around the campus green spaces can reduce cortisol levels by up to 15%."
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
                className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group overflow-hidden"
                aria-label="Chat with MindAI"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <span className="material-icons-outlined text-3xl relative z-10">psychology</span>
            </button>
        </div>
    );
};

export default Dashboard;


