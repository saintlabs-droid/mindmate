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
 * │ Sidebar  │  Stats Cards (3 metric cards)             │
 * │          ├──────────────────────┬─────────────────────┤
 * │          │  Mood Chart          │  Pattern Card       │
 * │          │                      │  Recent Logs        │
 * │          ├──────────────────────┴─────────────────────┤
 * │          │  Influence Cards (positive + stress)       │
 * └──────────┴────────────────────────────────────────────┘
 *
 * HOW TO ADD ROUTING:
 * - This page is rendered at "/" currently. To add proper routing:
 *   1. In App.tsx, add: <Route path="/insights" element={<Insights />} />
 *   2. Update Sidebar links to use <NavLink to="/insights">.
 *
 * HOW TO ADD GLOBAL STATE:
 * - Wrap the app with a context provider (e.g., MoodContext).
 * - Or use Redux: create a moodSlice with actions for fetching/filtering data.
 * - Pass shared state (like date range filter) down through context.
 *
 * HOW TO SECURE ROUTE:
 * - Wrap this route with a ProtectedRoute component that checks auth state.
 * - Example: <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
 *
 * PERFORMANCE TIPS:
 * - Use React.lazy() for code splitting: const MoodChart = lazy(() => import('./MoodChart'));
 * - Memoize expensive components with React.memo().
 * - Use React Query for server-state caching and background refetching.
 * =============================================================================
 */

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import MoodChart from "@/components/MoodChart";
import PatternCard from "@/components/PatternCard";
import RecentLogs from "@/components/RecentLogs";
import InfluenceCards from "@/components/InfluenceCards";

const Insights = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* --- Left Sidebar Navigation --- */}
      <Sidebar />

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 overflow-auto">
        {/* Spacer for mobile hamburger button */}
        <div className="h-10 lg:hidden" />

        {/* Page header with title and date filter */}
        <Header />

        {/* Summary stats cards */}
        <section className="mt-6">
          <StatsCards />
        </section>

        {/*
         * Main content grid: Chart + Pattern/Logs on the right.
         * Desktop: 2 columns (chart takes ~60%, right panel ~40%).
         * Mobile: stacked vertically.
         */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left: Mood Timeline Chart (spans 3 of 5 columns) */}
          <div className="lg:col-span-3">
            <MoodChart />
          </div>

          {/* Right: Pattern Card + Recent Logs (spans 2 of 5 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <PatternCard />
            <RecentLogs />
          </div>
        </section>

        {/* Bottom: Positive Influences & Stress Factors */}
        <section className="mt-4">
          <InfluenceCards />
        </section>
      </main>
    </div>
  );
};

export default Insights;
