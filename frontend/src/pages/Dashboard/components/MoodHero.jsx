import React from 'react';

const MoodHero = ({ firstName, moods }) => {
    return (
        <section className="bg-white dark:bg-surface-dark rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left max-w-lg">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-2">Daily Check-in</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">Jambo {firstName}, how are you feeling right now?</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">Take a moment to reflect. Tracking your mood helps you understand your patterns better.</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {moods.map((m) => (
                            <button key={m.label} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/5 transition-all w-16 group/btn">
                                <div className="text-xl transform group-hover/btn:scale-110 transition-transform">{m.emoji}</div>
                                <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover/btn:text-primary">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block">
                    <img className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-surface-dark shadow-md rotate-2 hover:rotate-0 transition-transform duration-500" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" alt="Mood decoration" />
                </div>
            </div>
        </section>
    );
};

export default MoodHero;
