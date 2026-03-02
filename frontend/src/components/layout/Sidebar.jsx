/**
 * =============================================================================
 * Sidebar Component - MindMate Dashboard Navigation
 * =============================================================================
 *
 * PURPOSE:
 * Renders the left-hand navigation sidebar with logo, menu items, and user
 * profile card. Fixed on desktop, collapsible drawer on mobile.
 *
 * HOW TO MAKE DYNAMIC:
 * - Replace the static `menuItems` array with data from an API or config file.
 * - Use React Router's `NavLink` for real routing (currently uses static active state).
 * - User profile data (name, plan) can come from an auth context or user API.
 *
 * HOW TO ADD ROUTING:
 * - Wrap menu items in <NavLink to="/path"> from react-router-dom.
 * - The `active` field can be removed and replaced with NavLink's built-in
 *   `isActive` prop for automatic active styling.
 *
 * LAYOUT:
 * - Fixed width (240px) on desktop, hidden by default on mobile.
 * - Toggle button (hamburger) shows on mobile to open/close sidebar.
 * =============================================================================
 */

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  BookMarked,
  Lock,
  Menu,
  X,
} from "lucide-react";

/**
 * Static menu items for the sidebar.
 * TO MAKE DYNAMIC: Fetch from config or API and map over the result.
 */
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: BookOpen, label: "Journal", active: false },
  { icon: BarChart3, label: "Insights", active: true },
  { icon: Users, label: "Community", active: false },
  { icon: BookMarked, label: "Resources", active: false },
];

const Sidebar = () => {
  // Controls mobile sidebar visibility
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* --- Mobile hamburger toggle button --- */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-card p-2 shadow-md"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* --- Mobile overlay backdrop --- */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* --- Sidebar panel --- */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-60 bg-sidebar border-r border-sidebar-border
          flex flex-col justify-between transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto lg:min-h-screen
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* --- Logo / Brand --- */}
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2">
            {/* Brand icon circle */}
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-lg font-bold text-foreground">MindMate</span>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                }
              `}
              /**
               * TO ADD ROUTING:
               * Replace <a href="#"> with <NavLink to="/insights"> etc.
               * Use NavLink's className callback for active styling:
               * className={({ isActive }) => isActive ? activeClasses : defaultClasses}
               */
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* --- User Profile Card --- */}
        <div className="px-4 pb-5">
          {/*
           * TO MAKE DYNAMIC:
           * Pull user data from auth context (e.g., useAuth() hook).
           * Display user.name, user.plan, user.avatar.
           */}
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            {/* Avatar placeholder */}
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-accent-foreground">
              WK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Wanjiku K.
              </p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
          {/* Privacy indicator */}
          <div className="flex items-center gap-1.5 mt-3 px-1">
            <Lock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Private & Encrypted
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
