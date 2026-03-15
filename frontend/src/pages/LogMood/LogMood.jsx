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
<<<<<<< HEAD
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
=======
    const [note, setNote] = useState('');
>>>>>>> 0c03dc4cec3fd516e9669103368782fccd43cffb

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

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            let audioChunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunks.push(e.data);
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
                // Also stop the tracks to release the mic
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const discardAudio = () => {
        setAudioURL(null);
    };

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

<<<<<<< HEAD
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 uppercase tracking-wider" htmlFor="notes">Personal Note</label>
                    <textarea
                        className="w-full rounded-lg border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-all resize-none p-3 text-sm mb-4"
                        id="notes"
                        placeholder="Write down any thoughts..."
                        rows="2"
                    ></textarea>

                    <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                <span className="material-icons-outlined text-primary text-sm">mic</span>
                                Add Voice Note
                            </label>
                            {isRecording && (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 animate-pulse uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Recording
                                </span>
                            )}
                        </div>

                        {!audioURL && !isRecording && (
                            <button
                                onClick={startRecording}
                                className="w-full py-3 rounded-lg border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-bold flex items-center justify-center gap-2"
                            >
                                <span className="material-icons-outlined">radio_button_checked</span>
                                Tap to Record Audio
                            </button>
                        )}

                        {isRecording && (
                            <button
                                onClick={stopRecording}
                                className="w-full py-3 rounded-lg border-2 border-red-200 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all text-sm font-bold flex items-center justify-center gap-2"
                            >
                                <span className="material-icons-outlined text-red-500">stop_circle</span>
                                Stop Recording
                            </button>
                        )}

                        {audioURL && (
                            <div className="flex items-center gap-3 bg-white dark:bg-surface-dark p-2 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
                                <audio src={audioURL} controls className="flex-grow h-10 w-full rounded" />
                                <button
                                    onClick={discardAudio}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                                    title="Discard recording"
                                >
                                    <span className="material-icons-outlined text-lg">delete</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
=======
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
>>>>>>> 0c03dc4cec3fd516e9669103368782fccd43cffb

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



