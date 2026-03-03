import React from "react";
import { useUser } from "../../context/UserContext";

/**
 * PatternCard: Restored to exact mockup specifications.
 */
const PatternCard = () => {
  const { user } = useUser();
  const firstName = user?.fullName?.split(' ')[0] || 'Wanjiku';

  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-surface-dark border border-primary/20 p-6 rounded-2xl relative overflow-hidden group">
      {/* Decor element */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <span className="material-icons text-primary animate-pulse text-lg">auto_awesome</span>
        <h3 className="font-bold text-gray-900 dark:text-white">Pattern Detected</h3>
      </div>

      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4 relative z-10">
        <span className="font-semibold">Hey {firstName},</span> it looks like your mood dips slightly every Tuesday. This correlates with your reported <span className="text-primary font-medium">'Heavy Workload'</span> tags.
      </p>

      <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-primary/10 relative z-10">
        <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Recommendation</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">Consider scheduling a short "chai break" or walk on Tuesday afternoons to reset.</p>
      </div>

      <div className="mt-4 flex gap-2 relative z-10">
        <button className="text-xs text-neutral-warm hover:text-primary underline">Is this helpful?</button>
      </div>
    </div>
  );
};

export default PatternCard;

