import { useState } from "react";
import logger from "../../shared/utils/logger";

/**
 * Header Component: Contextual title & temporal scope controls.
 */
const Header = ({ title = "Dashboard", subtitle = "Your mental wellness overview." }) => {
  const dateRanges = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-gray-100 dark:border-border/40">
      <div className="space-y-2 min-w-0">
        <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tight truncate">{title}</h1>
        <p className="text-sm text-neutral-warm font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Temporal Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-text-main hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md outline-none"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span className="material-icons-outlined text-sm text-primary">calendar_today</span>
            {selectedRange}
            <span className="material-icons-outlined text-sm transition-transform duration-300 group-hover:translate-y-0.5">expand_more</span>
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-3 w-56 rounded-3xl border border-gray-50 bg-white shadow-premium z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 p-2">
              {dateRanges.map((range) => (
                <li
                  key={range}
                  className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all ${range === selectedRange ? "bg-primary text-white shadow-md shadow-primary/20" : "text-neutral-warm hover:bg-gray-50"
                    }`}
                  onClick={() => { setSelectedRange(range); setDropdownOpen(false); }}
                >
                  {range}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI Insight Trigger */}
        <button
          className="rounded-2xl bg-primary text-white px-6 py-4 shadow-premium hover:brightness-105 active:scale-95 transition-all flex items-center gap-3 font-black text-[11px] uppercase tracking-widest"
          onClick={() => logger.info('[User Engagement] Manual AI recalc triggered.')}
        >
          <span className="material-icons-outlined text-sm">smart_toy</span>
          <span className="hidden sm:inline">Daily Recap</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

