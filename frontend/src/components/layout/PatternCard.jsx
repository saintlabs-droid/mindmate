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
 * - Uses gradient background with primary color for visual emphasis
 * - Includes decorative blur element for depth
 * - Fully responsive and accessible
 * =============================================================================
 */

import { memo } from "react";
import { Lightbulb } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Button } from "../../shared/components";

const PatternCard = memo(() => {
  const { user } = useUser();
  const firstName = user?.fullName?.split(' ')[0] || 'Wanjiku';

  return (
    <article
      className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-surface-dark p-5 relative overflow-hidden group"
      role="region"
      aria-label="Pattern detection insight"
    >
      {/* Decorative blur element */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 blur-2xl" />

      {/* Title with icon */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-primary animate-pulse" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Pattern Detected
        </h3>
      </div>

      {/*
       * Pattern message.
       * TO MAKE DYNAMIC: Replace with data.message from the API response.
       */}
      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed mb-4 relative z-10">
        <span className="font-semibold">Hey {firstName},</span> it looks like your mood dips slightly every Tuesday. This
        correlates with your reported{" "}
        <span className="font-semibold text-primary">'Heavy Workload'</span>{" "}
        tags.
      </p>

      {/*
       * Recommendation section.
       * TO MAKE DYNAMIC: Replace with data.recommendation from API.
       */}
      <div className="mt-4 rounded-lg bg-white/60 dark:bg-black/20 backdrop-blur-sm border border-primary/10 p-3 relative z-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          Recommendation
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Consider scheduling a short "chai break" or walk on Tuesday afternoons
          to reset.
        </p>
      </div>

      {/*
       * Feedback button (non-functional).
       * TO MAKE FUNCTIONAL:
       * - On click, POST feedback to /api/insights/patterns/:id/feedback
       * - Show a toast confirmation: "Thanks for your feedback!"
       */}
      <div className="mt-4 relative z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-primary font-medium hover:underline transition-all"
          aria-label="Rate this pattern as helpful"
        >
          Is this helpful?
        </Button>
      </div>
    </article>
  );
});

PatternCard.displayName = 'PatternCard';

export default PatternCard;
