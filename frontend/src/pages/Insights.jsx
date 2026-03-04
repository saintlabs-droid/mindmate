import StatsCards from '../components/layout/StatsCards';
import MoodChart from '../components/layout/Moodchart';
import PatternCard from '../components/layout/PatternCard';
import RecentLogs from '../components/layout/Recentlogs';
import InfluenceCards from '../components/layout/InfluenceCards';
import { IconButton } from '../shared/components';

/**
 * Insights Page
 * Restored to exact mockup specifications.
 */
const Insights = () => {
  return (
    <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-background-light">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-black text-text-main dark:text-white tracking-tight">Emotional Insights</h2>
          <p className="text-neutral-warm font-medium mt-2">Discover patterns in your wellness journey and grow stronger.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Date Range Picker */}
          <div className="relative group flex-grow md:flex-grow-0">
            <button className="w-full flex items-center justify-between md:justify-start gap-4 bg-white dark:bg-surface-dark px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all outline-none">
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary text-sm font-black">calendar_today</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-main">Past 7 Days</span>
              </div>
              <span className="material-icons-outlined text-neutral-warm text-sm ml-4 transition-transform group-hover:translate-y-[-2px]">expand_more</span>
            </button>
          </div>
          {/* Export Button */}
          <IconButton 
            icon="download" 
            label="Export data" 
            variant="primary" 
            size="lg"
            className="h-14 w-14"
          />
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Stats Grid */}
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Charts & Detailed Stats */}
          <div className="lg:col-span-8 space-y-12">

            {/* Main Mood Timeline Chart */}
            <MoodChart />

            {/* Influence Breakdown */}
            <InfluenceCards />
          </div>

          {/* Right Column: AI & Recent Items */}
          <aside className="lg:col-span-4 space-y-10">

            {/* Pattern Recognition Card */}
            <PatternCard />

            {/* Recent Logs List */}
            <RecentLogs />

            {/* Resource CTA */}
            <button 
              type="button"
              className="bg-primary text-white p-10 rounded-[2.5rem] shadow-premium relative overflow-hidden group cursor-pointer border border-white/10 hover:translate-y-[-4px] transition-all text-left w-full"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10 space-y-6">
                <span className="bg-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full border border-white/10 inline-block uppercase tracking-widest">Editor's Pick</span>
                <div>
                  <h3 className="font-black text-2xl mb-3 tracking-tight">Campus Survival Guide</h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed">Master the art of maintaining mental balance during Kenyan university semesters.</p>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3 group/btn">
                  Read Module <span className="material-icons-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </span>
              </div>
            </button>
          </aside>
        </div>

        {/* Footer Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Insights;

