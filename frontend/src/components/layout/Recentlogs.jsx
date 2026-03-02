/**
 * =============================================================================
 * RecentLogs Component - Recent Journal Log Entries
 * =============================================================================
 *
 * PURPOSE:
 * Displays a compact list of recent mood journal entries with date, mood
 * indicator, title, and preview text.
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace the static `logs` array with data from an API.
 *   Example: GET /api/journal/recent?limit=3
 * - Map each log entry to the shape: { date, month, day, mood, moodColor, title, preview }
 *
 * HOW TO CONNECT BACKEND:
 * - Use React Query: const { data } = useQuery(['recentLogs'], fetchLogs);
 * - Each log could link to a full journal entry page: /journal/:id
 *
 * LAYOUT:
 * - Vertical stack of compact cards with date badges on the left.
 * =============================================================================
 */

/**
 * Static recent log data.
 * TO MAKE DYNAMIC: Fetch from /api/journal/recent and map to this shape.
 */
const logs = [
  {
    month: "OCT",
    day: 24,
    mood: "Feeling confident",
    moodColor: "bg-success",
    preview: "Finally finished the project for CS. The team was...",
  },
  {
    month: "OCT",
    day: 23,
    mood: "A bit tired",
    moodColor: "bg-warning",
    preview: "Long lectures today. Need to sleep early.",
  },
];

const RecentLogs = () => {
  return (
    <article
      className="rounded-xl bg-card border border-border p-5 shadow-sm"
      role="region"
      aria-label="Recent journal logs"
    >
      {/* --- Header with link --- */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Logs</h3>
        {/*
         * "View Journal" link.
         * TO ADD ROUTING: Change href to /journal and use <Link> from react-router-dom.
         */}
        <a
          href="#"
          className="text-xs text-primary font-medium hover:underline"
        >
          View Journal
        </a>
      </div>

      {/* --- Log entries list --- */}
      <div className="space-y-3">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Date badge */}
            <div className="flex flex-col items-center bg-muted rounded-lg px-2.5 py-1.5 min-w-[48px]">
              <span className="text-[10px] font-semibold text-primary uppercase">
                {log.month}
              </span>
              <span className="text-lg font-bold text-foreground leading-tight">
                {log.day}
              </span>
            </div>

            {/* Log content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {/* Mood indicator dot */}
                <div className={`h-2 w-2 rounded-full ${log.moodColor}`} />
                <p className="text-sm font-medium text-foreground">
                  {log.mood}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {log.preview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default RecentLogs;
