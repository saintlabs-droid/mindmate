import React from 'react';
import StatsCards from '../components/layout/StatsCards';
import MoodChart from '../components/layout/Moodchart';
import PatternCard from '../components/layout/PatternCard';
import RecentLogs from '../components/layout/Recentlogs';
import InfluenceCards from '../components/layout/InfluenceCards';

/**
 * Insights Page
 * Restored to exact mockup specifications.
 */
const Insights = () => {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Insights</h2>
          <p className="text-neutral-warm mt-1">Track your emotional journey and discover patterns.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Date Range Picker Placeholder */}
          <div className="relative group flex-grow md:flex-grow-0">
            <button className="w-full flex items-center justify-between md:justify-start gap-2 bg-white dark:bg-surface-dark px-4 py-2.5 rounded-xl border border-primary/10 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2">
                <span className="material-icons text-primary text-sm">calendar_today</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Last 7 Days</span>
              </div>
              <span className="material-icons text-gray-400 text-sm ml-2">expand_more</span>
            </button>
          </div>
          {/* Export Button */}
          <button className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/10 flex items-center justify-center">
            <span className="material-icons text-lg">download</span>
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Stats Grid */}
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Charts & Detailed Stats */}
          <div className="lg:col-span-8 space-y-8">

            {/* Main Mood Timeline Chart */}
            <MoodChart />

            {/* Influence Breakdown */}
            <InfluenceCards />
          </div>

          {/* Right Column: AI & Recent Items */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Pattern Recognition Card */}
            <PatternCard />

            {/* Recent Logs List */}
            <RecentLogs />

            {/* NEW RESOURCE CTA */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer mt-4">
              <div className="absolute inset-0 bg-primary/20 opacity-30 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded mb-3 inline-block uppercase italic">New Resource</span>
                <h3 className="font-bold text-lg mb-2">Exam Stress Management</h3>
                <p className="text-gray-300 text-sm mb-4">Learn techniques to stay calm during finals week.</p>
                <button className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Read Article <span className="material-icons text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Insights;

