import { useState, useCallback } from 'react';
import { useUser } from '../../context/UserContext';
import { MOODS, INFLUENCES } from '../../constants/wellness';
import MoodButton from './components/MoodButton';
import InfluenceButton from './components/InfluenceButton';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from '../../shared/components';

/**
 * LogMood Page
 * Clean design matching Landing page aesthetic.
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
        navigate('/dashboard');
    }, [navigate]);

    const handleNoteChange = useCallback((e) => {
        setNote(e.target.value);
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <main className="container max-w-3xl mx-auto px-6 py-8">
                {/* Form Card */}
                <Card padding="lg" className="p-8 sm:p-10">
                    {/* Mood Scale */}
                    <fieldset className="mb-10">
                        <legend className="block text-sm font-medium text-text-main dark:text-gray-200 mb-6">
                            How would you rate your mood?
                        </legend>
                        <div className="grid grid-cols-5 gap-3 sm:gap-4">
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
                    <div className="h-px bg-gray-100 dark:bg-gray-800 w-full mb-10"></div>

                    {/* Influences */}
                    <fieldset className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
                            <legend className="block text-sm font-medium text-text-main dark:text-gray-200">
                                What's shaping your mood?
                            </legend>
                            <span className="text-xs text-gray-400">Select all that apply</span>
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
                    </fieldset>

                    {/* Notes */}
                    <div className="mb-10">
                        <label className="block text-sm font-medium text-text-main dark:text-gray-200 mb-3" htmlFor="notes">
                            Add a private note (optional)
                        </label>
                        <textarea
                            id="notes"
                            className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-text-main dark:text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none p-5 text-sm outline-none leading-relaxed"
                            placeholder="Anything specific happening? E.g. 'Upcoming exams are stressing me out...'"
                            rows="4"
                            value={note}
                            onChange={handleNoteChange}
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                        <Link
                            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            to="/dashboard"
                        >
                            Cancel
                        </Link>
                        <Button onClick={handleLogEntry} icon="arrow_forward">
                            Save Entry
                        </Button>
                    </div>
                </Card>

                {/* Privacy Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                        <span className="material-icons-outlined text-sm">lock</span>
                        Your entries are 100% private and encrypted.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LogMood;



