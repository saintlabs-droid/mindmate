import { useNavigate } from 'react-router-dom';

/**
 * MoodHero Component
 * Sharp-edged design matching Landing page aesthetic.
 */
const MoodHero = ({ moods }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-white dark:bg-surface-dark rounded-none p-6 shadow-sm border border-gray-100 dark:border-gray-800 inline-block">
            <span className="inline-block px-3 py-1 rounded-none bg-primary/10 text-primary text-xs font-medium uppercase tracking-wide mb-3">Wellness Check-in</span>
            <h2 className="text-2xl font-normal text-text-main dark:text-white mb-2">How are you feeling today?</h2>
            <p className="text-sm text-neutral-warm mb-4">Take a moment to log your feelings and track your wellness journey.</p>

            <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                    <button
                        key={m.label}
                        onClick={() => navigate('/journal')}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-none bg-gray-50 hover:bg-primary/10 transition-all w-16 group/btn border border-gray-100 hover:border-primary/20"
                    >
                        <div className="text-2xl transform group-hover/btn:scale-110 transition-transform">{m.emoji}</div>
                        <span className="text-xs text-neutral-warm group-hover/btn:text-primary transition-colors">{m.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default MoodHero;


