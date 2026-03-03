import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { MOODS, INFLUENCES } from '../../constants/wellness';
import MoodButton from './components/MoodButton';
import InfluenceButton from './components/InfluenceButton';
import { useNavigate, Link } from 'react-router-dom';

/**
 * LogMood Page
 * Restored to exact mockup specifications with refined interactions.
 */
const LogMood = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selectedMood, setSelectedMood] = useState(3);
    const [selectedInfluences, setSelectedInfluences] = useState(['Academics']);
    const [note, setNote] = useState('');

    const firstName = user?.fullName?.split(' ')[0] || 'there';

    const toggleInfluence = (name) => {
        setSelectedInfluences(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    };

    const handleLogEntry = () => {
        // Logic for logging entry to backend can be added here
        navigate('/dashboard');
    };

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
            <main className="container max-w-4xl mx-auto px-4 py-8 sm:py-12">
                {/* Header Section */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4 uppercase tracking-wider">
                        Step 1 of 2
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Hi {firstName}, how are you feeling right now?
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium opacity-80">Take a moment to check in with yourself.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-700">

                    {/* Section 1: Mood Scale */}
                    <div className="mb-12">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-6 uppercase tracking-widest">
                            Rate your mood (1-5)
                        </label>
                        <div className="grid grid-cols-5 gap-2 sm:gap-4">
                            {MOODS.map((m) => (
                                <MoodButton
                                    key={m.level}
                                    mood={m}
                                    isSelected={selectedMood === m.level}
                                    onClick={() => setSelectedMood(m.level)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-10"></div>

                    {/* Section 2: Influence Categories */}
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-widest">
                                What's influencing your mood?
                            </label>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Select all that apply</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {INFLUENCES.map((inf) => (
                                <InfluenceButton
                                    key={inf.name}
                                    influence={inf}
                                    isSelected={selectedInfluences.includes(inf.name)}
                                    onClick={() => toggleInfluence(inf.name)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Optional: Notes Field */}
                    <div className="mb-10">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2" htmlFor="notes">
                            Add a quick note (optional)
                        </label>
                        <textarea
                            id="notes"
                            className="w-full rounded-lg border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-all resize-none p-3 text-sm outline-none"
                            placeholder="Anything specific happening? E.g. 'Upcoming exams are stressing me out...'"
                            rows="3"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                        <Link
                            className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-widest"
                            to="/dashboard"
                        >
                            Cancel
                        </Link>
                        <button
                            onClick={handleLogEntry}
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/30 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 uppercase tracking-widest text-xs"
                        >
                            <span>Log Entry</span>
                            <span className="material-icons-round text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Supportive Text */}
                <div className="mt-8 text-center animate-in fade-in duration-1000 delay-500">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1 uppercase tracking-[0.2em]">
                        <span className="material-icons-round text-sm">lock</span>
                        Your entries are private and secure.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LogMood;



