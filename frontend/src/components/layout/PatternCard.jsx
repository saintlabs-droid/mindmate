/**
 * =============================================================================
 * PatternCard Component - AI Pattern Detection Insight
 * =============================================================================
 *
 * PURPOSE:
 * Displays an AI-generated pattern insight about the user's mood trends.
 * Includes a recommendation and a feedback link.
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace the hardcoded message and recommendation with API data.
 *   Example: GET /api/insights/patterns
 *   Response: { message: "...", recommendation: "...", patternType: "weekly_dip" }
 *
 * HOW TO CONNECT BACKEND:
 * - Use React Query to fetch pattern data.
 * - The "Is this helpful?" link can POST feedback:
 *   POST /api/insights/patterns/:id/feedback { helpful: true }
 *
 * STYLING:
 * - Uses a distinct warm background (pattern-bg token) to stand out.
 * - Visually separated from other cards for emphasis.
 * =============================================================================
 */

import { Lightbulb } from "lucide-react";

const PatternCard = () => {
  return (
    <article
      className="rounded-xl border border-pattern-border bg-pattern p-5"
      role="region"
      aria-label="Pattern detection insight"
    >
      {/* --- Title --- */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-primary">Pattern Detected</h3>
      </div>

      {/*
       * Pattern message.
       * TO MAKE DYNAMIC: Replace with data.message from the API response.
       */}
      <p className="text-sm text-pattern-foreground leading-relaxed">
        Hey Wanjiku, it looks like your mood dips slightly every Tuesday. This
        correlates with your reported{" "}
        <span className="font-semibold text-primary">'Heavy Workload'</span>{" "}
        tags.
      </p>

      {/*
       * Recommendation section.
       * TO MAKE DYNAMIC: Replace with data.recommendation from API.
       */}
      <div className="mt-4 rounded-lg bg-primary/5 p-3">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          Recommendation
        </p>
        <p className="text-sm text-pattern-foreground leading-relaxed">
          Consider scheduling a short "chai break" or walk on Tuesday afternoons
          to reset.
        </p>
      </div>

      {/*
       * Feedback link (non-functional).
       * TO MAKE FUNCTIONAL:
       * - On click, POST feedback to /api/insights/patterns/:id/feedback
       * - Show a toast confirmation: "Thanks for your feedback!"
       */}
      <button
        className="mt-3 text-xs text-primary font-medium hover:underline transition-all"
        aria-label="Rate this pattern as helpful"
      >
        Is this helpful?
      </button>
    </article>
  );
};

export default PatternCard;
