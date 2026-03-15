import React, { useState } from 'react';

const LogMood = () => {
    const [selectedMood, setSelectedMood] = useState(3);
    const [selectedInfluences, setSelectedInfluences] = useState(['Academics']);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const moods = [
        { level: 1, emoji: '😔', label: 'Struggling' },
        { level: 2, emoji: '😕', label: 'Low' },
        { level: 3, emoji: '😐', label: 'Okay' },
        { level: 4, emoji: '🙂', label: 'Good' },
        { level: 5, emoji: '😁', label: 'Thriving' },
    ];

    const influences = [
        { name: 'Academics', icon: 'school' },
        { name: 'Finances', icon: 'account_balance_wallet' },
        { name: 'Relationships', icon: 'favorite' },
        { name: 'Family', icon: 'home' },
        { name: 'Career', icon: 'work' },
    ];

    const toggleInfluence = (name) => {
        if (selectedInfluences.includes(name)) {
            setSelectedInfluences(selectedInfluences.filter(i => i !== name));
        } else {
            setSelectedInfluences([...selectedInfluences, name]);
        }
    };

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
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary ring-1 ring-inset ring-primary/20 mb-3 uppercase tracking-wider">
                    Step 1 of 2
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Hi Imani, how are you feeling right now?</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Take a moment to check in with yourself.</p>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5 p-5 sm:p-8">
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">Rate your mood (1-5)</label>
                    <div className="grid grid-cols-5 gap-2 sm:gap-4">
                        {moods.map((m) => (
                            <button
                                key={m.level}
                                onClick={() => setSelectedMood(m.level)}
                                className="group flex flex-col items-center gap-2 p-1.5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl transition-all ${selectedMood === m.level
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-110 ring-4 ring-primary/20'
                                    : 'bg-gray-100 dark:bg-white/5'
                                    }`}>
                                    {m.emoji}
                                </div>
                                <span className={`text-[11px] transition-colors ${selectedMood === m.level ? 'font-bold text-primary dark:text-primary' : 'font-medium text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {m.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-8"></div>

                <div className="mb-8">
                    <div className="flex justify-between items-end mb-4">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">What's influencing your mood?</label>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">Pick all that apply</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {influences.map((inf) => {
                            const isSelected = selectedInfluences.includes(inf.name);
                            return (
                                <button
                                    key={inf.name}
                                    onClick={() => toggleInfluence(inf.name)}
                                    className={`group relative p-3 h-28 flex flex-col justify-between items-start rounded-lg border-2 transition-all text-left focus:outline-none ${isSelected
                                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                        : 'border-gray-100 dark:border-white/5 bg-white dark:bg-surface-dark hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-white dark:bg-surface-dark text-primary' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        <span className="material-icons-round text-base">{inf.icon}</span>
                                    </div>
                                    <span className={`block text-sm transition-colors ${isSelected ? 'font-bold text-primary' : 'font-medium text-gray-600 dark:text-gray-300'
                                        }`}>
                                        {inf.name}
                                    </span>
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                                            <span className="material-icons-round text-white text-[10px]">check</span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

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

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest">Cancel</button>
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
