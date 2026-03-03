/**
 * =============================================================================
 * InfluenceCards Component - Positive Influences & Stress Factors
 * =============================================================================
 *
 * PURPOSE:
 * Displays two side-by-side cards showing factors that positively or negatively
 * affect the user's mood, each with a progress bar indicating correlation strength.
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace static arrays with API data.
 *   Example: GET /api/insights/influences
 *   Response: { positive: [...], stress: [...] }
 *
 * HOW TO CONNECT BACKEND:
 * - Use React Query to fetch and cache influence data.
 * - Progress bar `value` (0–100) represents correlation strength from the backend.
 *
 * LAYOUT:
 * - Two cards side by side on desktop, stacked on mobile.
 * - Each card contains a list of factors with color-coded progress bars.
 * =============================================================================
 */

import { Sun, BookOpen, FileText, Moon } from "lucide-react";

/**
 * Static influence data.
 * TO MAKE DYNAMIC: Fetch from /api/insights/influences
 * Shape: { icon, label, value (0-100), color }
 */
const positiveInfluences = [
  { icon: Sun, label: "Morning Run", value: 72, color: "bg-success" },
  { icon: BookOpen, label: "Study Group", value: 58, color: "bg-secondary" },
];

const stressFactors = [
  { icon: FileText, label: "Assignments", value: 65, color: "bg-primary" },
  { icon: Moon, label: "Late Nights", value: 48, color: "bg-foreground" },
];

/**
 * Reusable progress bar sub-component.
 * Renders a horizontal bar filled to the given percentage.
 */
const ProgressBar = ({ value, colorClass }) => (
  <div
    className="h-2 w-full rounded-full bg-muted overflow-hidden"
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className={`h-full rounded-full ${colorClass} transition-all duration-500`}
      style={{ width: `${value}%` }}
    />
  </div>
);

const InfluenceCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* --- Positive Influences Card --- */}
      <article
        className="rounded-xl bg-card border border-border p-5 shadow-sm"
        role="region"
        aria-label="Positive influences on mood"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Positive Influences
        </h3>
        <div className="space-y-4">
          {positiveInfluences.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground min-w-[100px]">
                {item.label}
              </span>
              <div className="flex-1">
                <ProgressBar value={item.value} colorClass={item.color} />
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* --- Stress Factors Card --- */}
      <article
        className="rounded-xl bg-card border border-border p-5 shadow-sm"
        role="region"
        aria-label="Stress factors affecting mood"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Stress Factors
        </h3>
        <div className="space-y-4">
          {stressFactors.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground min-w-[100px]">
                {item.label}
              </span>
              <div className="flex-1">
                <ProgressBar value={item.value} colorClass={item.color} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default InfluenceCards;
