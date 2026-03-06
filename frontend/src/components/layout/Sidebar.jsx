import { useState, useCallback, memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../../shared/components';

const menuItems = [
    { name: 'Dashboard', icon: 'space_dashboard', path: '/dashboard' },
    { name: 'Journal', icon: 'history_edu', path: '/journal' },
    { name: 'MindAI Assistant', icon: 'smart_toy', path: '/ai-assistant' },
    { name: 'Insights', icon: 'analytics', path: '/insights' },
    { name: 'Resources', icon: 'auto_awesome_motion', path: '/support' },
];

/**
 * Sidebar Component
 * Clean, minimal design matching Landing page aesthetic.
 * Sharp-edged CTAs, light typography, consistent spacing.
 */
const Sidebar = () => {
    const { user, logout } = useUser();
    const [mobileOpen, setMobileOpen] = useState(false);

    const openMobile = useCallback(() => setMobileOpen(true), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary flex items-center justify-center text-white">
                        <span className="material-icons-outlined text-xl">psychology</span>
                    </div>
                    <span className="text-lg font-normal text-text-main dark:text-white">MindMate</span>
                </Link>
                <button
                    onClick={openMobile}
                    className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    aria-label="Open menu"
                >
                    <span className="material-icons-outlined text-2xl">menu</span>
                </button>
            </header>

            {/* Mobile spacer */}
            <div className="md:hidden h-[65px]" />

            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={closeMobile}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-surface-dark 
                border-r border-gray-100 dark:border-gray-800
                flex flex-col transition-transform duration-300 ease-out
                md:sticky md:top-0 md:translate-x-0
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Close button (mobile) */}
                <button
                    onClick={closeMobile}
                    className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
                    aria-label="Close menu"
                >
                    <span className="material-icons-outlined">close</span>
                </button>

                {/* Logo */}
                <div className="flex-shrink-0 p-6 flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary flex items-center justify-center text-white">
                        <span className="material-icons-outlined text-2xl">psychology</span>
                    </div>
                    <span className="text-xl font-normal text-text-main dark:text-white">MindMate</span>
                </div>

                {/* Scrollable area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 transition-colors ${
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                    }`
                                }
                            >
                                <span className="material-icons-outlined text-xl">{item.icon}</span>
                                <span className="text-sm font-normal">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="flex-shrink-0 p-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                        {/* Quick Help Card */}
                        <div className="bg-secondary/5 p-4 border border-secondary/10">
                            <div className="flex items-center gap-2 mb-2 text-secondary">
                                <span className="material-icons-outlined text-sm">emergency</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Quick Help</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                                Confidential support is always available.
                            </p>
                            {/* Sharp-edged CTA matching Landing page */}
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={closeMobile}
                                className="rounded-none"
                                to="/support"
                            >
                                Get Support
                            </Button>
                        </div>

                        {/* User Profile */}
                        <NavLink
                            to="/account"
                            onClick={closeMobile}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <img
                                className="h-10 w-10 object-cover border border-gray-200 dark:border-gray-700"
                                src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'U')}&background=6A8E7F&color=fff&rounded=true&size=128`}
                                alt={user?.fullName || 'Profile'}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {user?.fullName || 'Student'}
                                </p>
                                <p className="text-xs text-gray-400">View profile</p>
                            </div>
                        </NavLink>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                logout();
                                closeMobile();
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-400 hover:text-secondary transition-colors"
                        >
                            <span className="material-icons-outlined text-lg">logout</span>
                            Sign out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default memo(Sidebar);


