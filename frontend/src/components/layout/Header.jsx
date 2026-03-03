/**
 * =============================================================================
 * Header Component - Mood Insights Page Header
 * =============================================================================
 *
 * PURPOSE:
 * Displays the page title, subtitle, and a date-range filter dropdown.
 * Also includes a user avatar button on the right.
 *
 * HOW TO MAKE DYNAMIC:
 * - The date filter dropdown is currently static. To make it functional:
 *   1. Lift `selectedRange` state to the parent (Insights page).
 *   2. Pass it as a prop along with an `onRangeChange` callback.
 *   3. Use the selected range to filter chart/log data via API or local filter.
 *
 * HOW TO CONNECT BACKEND:
 * - When the filter changes, call an API like:
 *   GET /api/insights?range=7d
 *   and update the dashboard data accordingly.
 * =============================================================================
 */

import { useState } from "react";
import { CalendarDays, ChevronDown, Bell } from "lucide-react";

/**
 * Static filter options for the date range dropdown.
 * TO MAKE DYNAMIC: These could come from a config or be kept static.
 */
const dateRanges = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

const Header = () => {
  // Currently selected date range (static, non-functional filter)
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* --- Title & Subtitle --- */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mood Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your emotional journey and discover patterns.
        </p>
      </div>

      {/* --- Right side controls --- */}
      <div className="flex items-center gap-3">
        {/*
         * Date Range Dropdown
         * TO MAKE FUNCTIONAL:
         * - On selection, call props.onRangeChange(range)
         * - Parent should re-fetch/filter data based on the new range.
         */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted transition-colors"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            {selectedRange}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {dropdownOpen && (
            <ul
              className="absolute right-0 mt-1 w-full rounded-lg border border-border bg-card shadow-lg z-10"
              role="listbox"
            >
              {dateRanges.map((range) => (
                <li
                  key={range}
                  role="option"
                  aria-selected={range === selectedRange}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors
                    ${
                      range === selectedRange
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-foreground hover:bg-muted"
                    }
                    first:rounded-t-lg last:rounded-b-lg
                  `}
                  onClick={() => {
                    setSelectedRange(range);
                    setDropdownOpen(false);
                  }}
                >
                  {range}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notification bell (decorative) */}
        <button
          className="rounded-full bg-primary p-2.5 shadow-sm hover:opacity-90 transition-opacity"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
