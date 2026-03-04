import { useNavigate } from 'react-router-dom';

/**
 * MoodHero Component
 * Restored to exact mockup specifications.
 */
const MoodHero = ({ moods }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-white dark:bg-surface-dark rounded-[2.5rem] p-10 md:p-12 shadow-premium border border-gray-50 dark:border-gray-800 relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[100px] transition-transform duration-1000 group-hover:scale-125"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="text-center md:text-left max-w-xl">
                    <span className="inline-block px-5 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm shadow-primary/5">Student Wellness Check-in</span>
                    <h2 className="text-4xl font-black text-text-main dark:text-white mb-4 tracking-tight">How are you feeling today?</h2>
                    <p className="text-neutral-warm font-medium mb-10 leading-relaxed">Your mental health matters. Take a brief moment to log your feelings and track your wellness journey over time.</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {moods.map((m) => (
                            <button
                                key={m.label}
                                onClick={() => navigate('/journal')}
                                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gray-50/50 hover:bg-primary/10 transition-all w-24 group/btn border border-transparent hover:border-primary/10 shadow-none hover:shadow-md"
                            >
                                <div className="text-4xl transform group-hover/btn:scale-110 transition-transform duration-500">{m.emoji}</div>
                                <span className="text-[10px] font-black text-neutral-warm/60 uppercase tracking-widest group-hover/btn:text-primary transition-colors">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
                    <img
                        className="w-56 h-56 object-cover rounded-[3rem] border-8 border-white dark:border-surface-dark shadow-2xl relative z-10 -rotate-3 hover:rotate-0 transition-all duration-700"
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
                        alt="High-fidelity representation of student mental wellness and serenity"
                    />
                </div>
            </div>
        </section>
    );
};

export default MoodHero;


