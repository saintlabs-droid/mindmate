/**
 * =============================================================================
 * Insights Page - Mood Insights Dashboard
 * =============================================================================
 *
 * PURPOSE:
 * Main page component that composes all dashboard sections into a cohesive
 * layout. This is the entry point for the /insights route.
 *
 * PAGE STRUCTURE:
 * ┌──────────┬────────────────────────────────────────────┐
 * │          │  Header (title + date filter)              │
 * │          ├────────────────────────────────────────────┤
 * │ Sidebar  │  Stats Cards (3 metric cards)              │
 * │          ├──────────────────────┬─────────────────────┤
 * │          │  Mood Chart          │  Pattern Card       │
 * │          │                      │  Recent Logs        │
 * │          ├──────────────────────┴─────────────────────┤
 * │          │  Influence Cards (positive + stress)       │
 * └──────────┴────────────────────────────────────────────┘
 */

import { memo } from 'react';
import Header from '../components/layout/Header';
import StatsCards from '../components/layout/StatsCards';
import MoodChart from '../components/layout/Moodchart';
import PatternCard from '../components/layout/PatternCard';
import RecentLogs from '../components/layout/Recentlogs';
import InfluenceCards from '../components/layout/InfluenceCards';

/**
 * Insights Page: Data visualization and AI patterns.
 */
const Insights = memo(() => {
  return (
    <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto bg-background-light dark:bg-background-dark">
      <Header
        title="Mood Insights"
        subtitle="Track your emotional journey and discover patterns."
      />

      <div className="max-w-7xl mx-auto space-y-10 mt-10">
        {/* Top Tier: Critical Metrics */}
        <section aria-label="Summary Statistics">
          <StatsCards />
        </section>

        {/* Second Tier: Timeline and Patterns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2" aria-label="Mood Timeline">
            <MoodChart />
          </section>
          <section aria-label="AI Pattern Recognition">
            <PatternCard />
          </section>
        </div>

        {/* Third Tier: Deep Dives */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1" aria-label="Recent Journal Entries">
            <RecentLogs />
          </section>
          <section className="lg:col-span-2" aria-label="Behavioral Influences">
            <InfluenceCards />
          </section>
        </div>
      </div>
    </div>
  );
});

export default Insights;
