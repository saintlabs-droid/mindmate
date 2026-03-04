import { useState, useCallback } from 'react';
import { useUser } from '../../context/UserContext';
import { MOODS, INFLUENCES } from '../../constants/wellness';
import MoodButton from './components/MoodButton';
import InfluenceButton from './components/InfluenceButton';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from '../../shared/components';

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

    const toggleInfluence = useCallback((name) => {
        setSelectedInfluences(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    }, []);

    const handleLogEntry = useCallback(() => {
        // Logic for logging entry to backend can be added here
        navigate('/dashboard');
    }, [navigate]);

    const handleNoteChange = useCallback((e) => {
        setNote(e.target.value);
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth">
            <main className="container max-w-4xl mx-auto px-6 py-12 sm:py-20">
                {/* Header Section */}
                <div className="text-center mb-14 animate-in fade-in slide-in-from-top-6 duration-1000">
                    <span className="inline-flex items-center rounded-2xl bg-primary/10 px-6 py-2 text-[10px] font-black text-primary border border-primary/20 mb-8 uppercase tracking-[0.25em] shadow-sm">
                        Step 1 of 2
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-text-main dark:text-white mb-4 tracking-tight leading-tight">
                        Hi {firstName}, how are you feeling today?
                    </h1>
                    <p className="text-neutral-warm font-medium text-lg">Take a moment to check in with yourself. It matters.</p>
                </div>

                {/* Form Card */}
                <Card padding="lg" className="p-10 sm:p-16 animate-in fade-in zoom-in-95 duration-1000">

                    {/* Section 1: Mood Scale */}
                    <fieldset className="mb-16">
                        <legend className="block text-[11px] font-black text-text-main dark:text-gray-200 mb-8 uppercase tracking-[0.25em]">
                            How would you rate your mood today?
                        </legend>
                        <div className="grid grid-cols-5 gap-4 sm:gap-6">
                            {MOODS.map((m) => (
                                <MoodButton
                                    key={m.level}
                                    mood={m}
                                    isSelected={selectedMood === m.level}
                                    onClick={() => setSelectedMood(m.level)}
                                />
                            ))}
                        </div>
                    </fieldset>

                    {/* Divider */}
                    <div className="h-px bg-gray-50 dark:bg-white/10 w-full mb-14"></div>

                    {/* Section 2: Influence Categories */}
                    <fieldset className="mb-14">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
                            <legend className="block text-[11px] font-black text-text-main dark:text-gray-200 uppercase tracking-[0.25em]">
                                What's shaping your mood?
                            </legend>
                            <span className="text-[10px] font-black text-neutral-warm/50 uppercase tracking-widest">Select all that apply</span>
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
                    </fieldset>

                    {/* Optional: Notes Field */}
                    <div className="mb-14">
                        <label className="block text-[11px] font-black text-text-main dark:text-gray-200 mb-4 uppercase tracking-[0.25em]" htmlFor="notes">
                            Add a private note (optional)
                        </label>
                        <textarea
                            id="notes"
                            className="w-full rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white placeholder-neutral-warm/40 focus:border-primary focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary/20 transition-all resize-none p-6 text-sm font-medium outline-none leading-relaxed"
                            placeholder="Anything specific happening? E.g. 'Upcoming exams are stressing me out...'"
                            rows="4"
                            value={note}
                            onChange={handleNoteChange}
                        ></textarea>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-white/10">
                        <Link
                            className="text-[11px] font-black text-neutral-warm/50 hover:text-text-main dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-widest"
                            to="/dashboard"
                        >
                            Cancel
                        </Link>
                        <Button onClick={handleLogEntry} size="lg" icon="arrow_forward">
                            Save Entry
                        </Button>
                    </div>
                </Card>

                {/* Supportive Text */}
                <div className="mt-12 text-center animate-in fade-in duration-1000 delay-700">
                    <p className="text-[10px] font-black text-neutral-warm/40 dark:text-gray-500 flex items-center justify-center gap-2 uppercase tracking-[0.3em]">
                        <span className="material-icons-outlined text-sm">lock</span>
                        Your entries are 100% private and encrypted.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LogMood;



