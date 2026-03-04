import StatsCards from '../components/layout/StatsCards';
import MoodChart from '../components/layout/Moodchart';
import PatternCard from '../components/layout/PatternCard';
import RecentLogs from '../components/layout/Recentlogs';
import InfluenceCards from '../components/layout/InfluenceCards';
import { IconButton } from '../shared/components';

/**
 * Insights Page
 * Clean design matching Landing page aesthetic.
 */
const Insights = () => {
  return (
    <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto bg-background-light">
      {/* Header - Simple like Dashboard */}
      <div className="flex items-center justify-end gap-4 mb-8">
        <button className="flex items-center gap-3 bg-white px-5 py-3 border border-gray-200 hover:border-gray-300 transition-colors">
          <span className="material-icons-outlined text-primary text-sm">calendar_today</span>
          <span className="text-sm font-medium text-text-main">Past 7 Days</span>
          <span className="material-icons-outlined text-gray-400 text-sm">expand_more</span>
        </button>
        <IconButton icon="download" label="Export data" variant="primary" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-10">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            <MoodChart />
            <InfluenceCards />
          </div>

          {/* Right Column */}
          <aside className="lg:col-span-4 space-y-8">
            <PatternCard />
            <RecentLogs />

            {/* Resource CTA - Sharp edges */}
            <button 
              type="button"
              className="w-full text-left bg-primary text-white p-8 relative overflow-hidden group hover:brightness-105 transition-all"
            >
              <div className="space-y-4">
                <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1">
                  Editor's Pick
                </span>
                <div>
                  <h3 className="text-xl font-medium mb-2">Campus Survival Guide</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Master the art of maintaining mental balance during Kenyan university semesters.
                  </p>
                </div>
                <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Module 
                  <span className="material-icons-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Insights;

