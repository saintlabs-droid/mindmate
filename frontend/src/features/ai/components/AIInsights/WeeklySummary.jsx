/**
 * WeeklySummary Component
 * Displays the AI-generated weekly summary text
 * 
 * @param {Object} props
 * @param {string} props.summary - Weekly summary text from AI
 */
const WeeklySummary = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-3">Weekly Summary</h4>
            <p className="text-indigo-800 leading-relaxed">{summary}</p>
        </div>
    );
};

export default WeeklySummary;
