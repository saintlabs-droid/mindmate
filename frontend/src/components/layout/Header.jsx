import React, { useState } from "react";
import { CalendarDays, ChevronDown, Bell, Zap } from "lucide-react";

/**
 * Header Component: Contextual title & temporal scope controls.
 */
const Header = ({ title = "Dashboard", subtitle = "Your mental wellness overview." }) => {
  const dateRanges = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40">
      <div className="space-y-1.5 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white truncate">{title}</h1>
        <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Temporal Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-foreground shadow-soft hover:bg-muted transition-all duration-200 ring-1 ring-transparent hover:ring-primary/20"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <CalendarDays className="h-4 w-4 text-primary" />
            {selectedRange}
            <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {dateRanges.map((range) => (
                <li
                  key={range}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/5 transition-colors ${range === selectedRange ? "bg-primary/10 text-primary font-bold" : "text-foreground"
                    }`}
                  onClick={() => { setSelectedRange(range); setDropdownOpen(false); }}
                >
                  {range}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI Insight Trigger (Observability Signal) */}
        <button
          className="rounded-xl bg-primary text-white p-2.5 shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 px-4 font-bold text-sm"
          onClick={() => console.info('[User Engagement] Manual AI recalc triggered.')}
        >
          <Zap className="h-4 w-4 fill-current" />
          <span className="hidden sm:inline">Daily Recap</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

