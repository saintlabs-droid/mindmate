/**
 * Achievements Component
 * Displays achievements with positive styling
 * 
 * @param {Object} props
 * @param {Array<string>} props.achievements - List of achievements from AI
 */
const Achievements = ({ achievements }) => {
    if (!achievements || achievements.length === 0) return null;

    return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">Achievements This Week</h4>
            <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1 flex-shrink-0">✨</span>
                        <span className="text-green-800">{achievement}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;
