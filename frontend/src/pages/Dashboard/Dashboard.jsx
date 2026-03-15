import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { IconButton } from '../../shared/components';
import MoodHero from './components/MoodHero';
import WeekReviewChart from './components/WeekReviewChart';
import DailyQuote from './components/DailyQuote';
import JournalPreview from './components/JournalPreview';

/**
 * Dashboard Page
 * Clean design matching Landing page aesthetic.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const firstName = user?.fullName?.split(' ')[0] || 'Student';

    const handleNavigateToAI = useCallback(() => {
        navigate('/ai-assistant');
    }, [navigate]);

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
            {/* Header - Simple greeting on right */}
            <div className="hidden md:flex items-center justify-end gap-4 px-8 lg:px-12 py-6">
                <span className="text-sm text-neutral-warm">Hello, {firstName}</span>
                <IconButton icon="notifications" label="Notifications" badge={true} />
                <IconButton icon="settings" label="Settings" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 lg:px-12 pb-16">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* Top Row: Mood Check-in + MindAI Card */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <MoodHero moods={moods} />
                        
                        {/* MindAI Card */}
                        <button 
                            className="flex-1 text-left bg-white p-6 border border-gray-100 hover:shadow-lg transition-shadow group" 
                            onClick={handleNavigateToAI}
                        >
                            <div className="w-12 h-12 bg-primary flex items-center justify-center mb-4">
                                <span className="material-icons-outlined text-white text-xl">smart_toy</span>
                            </div>
                            <p className="text-xs font-medium uppercase tracking-wide text-primary mb-2">AI Companion</p>
                            <h4 className="text-xl font-medium text-text-main mb-2">Need to talk?</h4>
                            <p className="text-sm text-neutral-warm">MindAI is ready to listen and provide support anytime.</p>
                        </button>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <WeekReviewChart data={weekData} />

                            {/* Resource Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group">
                                    <div className="h-14 w-14 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-icons-outlined text-2xl">local_library</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-text-main mb-2">Academic Wellness</h4>
                                    <p className="text-sm text-neutral-warm leading-relaxed">
                                        Learn 5 proven techniques to manage anxiety during campus finals.
                                    </p>
                                </div>
                                <div className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer group">
                                    <div className="h-14 w-14 bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <span className="material-icons-outlined text-2xl">self_improvement</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-text-main mb-2">Mindful Reset</h4>
                                    <p className="text-sm text-neutral-warm leading-relaxed">
                                        A specialized 10-minute session to reset your focus between lectures.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Side Column */}
                        <div className="space-y-8">
                            <DailyQuote quote="You are resilient, capable, and exactly where you need to be to grow." />

                            <JournalPreview entries={journalEntries} />

                            {/* Daily Tip */}
                            <div className="bg-primary/5 p-6 border border-primary/10">
                                <div className="w-10 h-10 bg-white flex items-center justify-center text-primary mb-4">
                                    <span className="material-icons-outlined text-lg">lightbulb</span>
                                </div>
                                <h4 className="text-xs font-medium uppercase tracking-wide text-text-main mb-2">Campus Insight</h4>
                                <p className="text-sm text-neutral-warm leading-relaxed italic">
                                    "Taking a 5-minute walk around the campus green spaces can reduce cortisol levels by up to 15%."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/ai-assistant')}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-none shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors z-50"
                aria-label="Chat with MindAI"
            >
                <span className="material-icons-outlined text-2xl">psychology</span>
            </button>
        </div>
    );
};

export default Dashboard;


