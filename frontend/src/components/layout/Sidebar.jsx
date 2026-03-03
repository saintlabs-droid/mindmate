import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

/**
 * Sidebar Component: Restored to exact mockup specifications.
 */
const Sidebar = () => {
    const { user, logout } = useUser();
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'Journal', icon: 'edit_note', path: '/journal', secure: true },
        { name: 'MindAI Assistant', icon: 'psychology', path: '/ai-assistant' },
        { name: 'Insights', icon: 'insights', path: '/insights' },
        { name: 'Resources', icon: 'extension', path: '/support' },
    ];

    return (
        <>
            {/* -- Mobile Header -- */}
            <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">M</div>
                    <span className="font-bold text-gray-900 dark:text-white">MindMate</span>
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                    <span className="material-icons">menu</span>
                </button>
            </header>

            {/* -- Mobile Backdrop -- */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-white/5
                flex flex-col transition-transform duration-300 ease-in-out
                md:translate-x-0 md:sticky md:z-20
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Branding Section */}
                <div className="p-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">M</div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MindMate</span>
                </div>

                {/* Primary Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                                }`
                            }
                        >
                            <span className="material-icons-outlined text-[20px]">{item.icon}</span>
                            <span className="flex-1">{item.name}</span>
                            {item.secure && (
                                <span className="material-icons-outlined text-xs opacity-50">lock</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
                    {/* Help CTA */}
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <span className="material-icons-outlined text-sm">support_agent</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Need Help?</span>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-3 leading-tight">Speak to a counselor anonymously.</p>
                        <Link
                            to="/support"
                            className="w-full text-center block text-[10px] bg-white dark:bg-surface-dark border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors py-2 rounded-lg font-medium"
                        >
                            Call Helpline
                        </Link>
                    </div>

                    {/* User Profile Card */}
                    <NavLink
                        to="/account"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                        <img
                            className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                            src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'U')}&background=E2725B&color=fff`}
                            alt={user?.fullName || 'Profile'}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.fullName || 'Guest'}</p>
                            <p className="text-xs text-gray-500 truncate">View Profile</p>
                        </div>
                        <span className="material-icons text-gray-400 text-sm group-hover:text-primary transition-colors">settings</span>
                    </NavLink>

                    <button
                        onClick={logout}
                        className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-crisis transition-colors"
                    >
                        <span className="material-icons text-sm">logout</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;


