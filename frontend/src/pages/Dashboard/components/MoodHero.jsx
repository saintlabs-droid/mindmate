import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MoodHero Component
 * Restored to exact mockup specifications.
 */
const MoodHero = ({ moods }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left max-w-lg">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">Daily Check-in</span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">How are you feeling right now?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Take a moment to reflect. Tracking your mood helps you understand your patterns better.</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {moods.map((m) => (
                            <button
                                key={m.label}
                                onClick={() => navigate('/journal')}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/5 transition-all w-20 group/btn"
                            >
                                <div className="text-3xl transform group-hover/btn:scale-110 transition-transform">{m.emoji}</div>
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover/btn:text-primary">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        className="w-48 h-48 object-cover rounded-full border-4 border-white dark:border-surface-dark shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvkKf7TBApEs7GyS2M_NGMrncnqBiLbQ9mMuJP35l4QJu2zytasn9Ede0IeV9RKq2JvOCkK-UjWtp3HZU6qvpN5E5Os2_Sk8wIbE54m0XSe8vnYp66We7Jdzs7xD9GN-GLK2VqavXzUjmI8Uxk8xdqQNeXPekIlxhsqjLL3eeEKYovrZHK1G7bYMPe0DvTT3tlP98porQhAOHPfxxNtm6MAJC0ROuTW0ann7czD-wev-469CBBKLuHDeWdndytdIW-70R9ktnVA70"
                        alt="Abstract calmness"
                    />
                </div>
            </div>
        </section>
    );
};

export default MoodHero;


