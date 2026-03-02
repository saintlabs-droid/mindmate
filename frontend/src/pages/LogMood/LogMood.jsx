import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { MOODS, INFLUENCES } from '../../constants/wellness';
import MoodButton from './components/MoodButton';
import InfluenceButton from './components/InfluenceButton';

/**
 * LogMood Page
 * Allows users to track their emotional state and influencing factors.
 */
const LogMood = () => {
    const { user } = useUser();
    const [selectedMood, setSelectedMood] = useState(3);
    const [selectedInfluences, setSelectedInfluences] = useState(['Academics']);

    const firstName = user?.fullName?.split(' ')[0] || 'there';

    const toggleInfluence = (name) => {
        setSelectedInfluences(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    };

    return (
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary ring-1 ring-inset ring-primary/20 mb-3 uppercase tracking-wider">
                    Step 1 of 2
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Hi {firstName}, how are you feeling right now?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Take a moment to check in with yourself.</p>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-5 sm:p-8">
                {/* Mood Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">
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

                <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-8"></div>

                {/* Influence Selection */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                            What's influencing your mood?
                        </label>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">Pick all that apply</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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

                {/* Personal Notes */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 uppercase tracking-wider" htmlFor="notes">
                        Personal Note
                    </label>
                    <textarea
                        className="w-full rounded-lg border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-all resize-none p-3 text-sm"
                        id="notes"
                        placeholder="Write down any thoughts..."
                        rows="2"
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest">
                        Cancel
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-6 rounded-lg shadow-md shadow-primary/20 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 uppercase tracking-wider">
                        <span>Log Entry</span>
                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
                    <span className="material-icons-outlined text-sm">lock</span>
                    Your entries are private and secure.
                </p>
            </div>
        </main>
    );
};

export default LogMood;
