/**
 * FocusAreas Component
 * Displays focus areas as actionable items
 * 
 * @param {Object} props
 * @param {Array<string>} props.focusAreas - List of focus areas from AI
 */
const FocusAreas = ({ focusAreas }) => {
    if (!focusAreas || focusAreas.length === 0) return null;

    return (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-semibold text-amber-900 mb-3">Areas to Focus On</h4>
            <ul className="space-y-2">
                {focusAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1 flex-shrink-0">🎯</span>
                        <span className="text-amber-800">{area}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FocusAreas;
