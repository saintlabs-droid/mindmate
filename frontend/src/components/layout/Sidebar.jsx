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
        { name: 'Dashboard', icon: 'space_dashboard', path: '/dashboard' },
        { name: 'Journal', icon: 'history_edu', path: '/journal', secure: true },
        { name: 'MindAI Assistant', icon: 'smart_toy', path: '/ai-assistant' },
        { name: 'Insights', icon: 'analytics', path: '/insights' },
        { name: 'Resources', icon: 'auto_awesome_motion', path: '/support' },
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
                    <span className="material-icons-outlined">menu</span>
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
                fixed top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-white/5
                flex flex-col transition-transform duration-300 ease-in-out
                md:translate-x-0 md:sticky md:z-20
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Branding Section */}
                <div className="p-8 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-premium">
                        <span className="material-icons-outlined">psychology</span>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-text-main dark:text-white">MindMate</span>
                </div>

                {/* Primary Navigation */}
                <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                    ? 'bg-primary/10 text-primary font-black shadow-sm'
                                    : 'text-neutral-warm dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-text-main dark:hover:text-gray-100 font-bold'
                                }`
                            }
                        >
                            <span className="material-icons-outlined text-[22px]">{item.icon}</span>
                            <span className="flex-1 text-sm tracking-tight">{item.name}</span>
                            {item.secure && (
                                <span className="material-icons-outlined text-[10px] opacity-40">lock</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-6 mt-auto border-t border-gray-50 dark:border-gray-800 space-y-6">
                    {/* Help CTA */}
                    <div className="bg-secondary/5 dark:bg-secondary/10 rounded-3xl p-5 border border-secondary/10">
                        <div className="flex items-center gap-2 mb-3 text-secondary">
                            <span className="material-icons-outlined text-sm font-black">emergency</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quick Help</span>
                        </div>
                        <p className="text-[11px] text-neutral-warm dark:text-gray-400 mb-4 leading-relaxed font-bold italic">Confidential support is just one click away.</p>
                        <Link
                            to="/support"
                            className="w-full text-center block text-[10px] bg-secondary text-white hover:brightness-110 transition-all py-3 rounded-xl font-black uppercase tracking-widest shadow-md"
                        >
                            Get Support
                        </Link>
                    </div>

                    {/* User Profile Card */}
                    <div className="space-y-3">
                        <NavLink
                            to="/account"
                            className="flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group border border-transparent hover:border-gray-100 shadow-none hover:shadow-sm"
                        >
                            <img
                                className="h-10 w-10 rounded-2xl object-cover border-2 border-primary/20"
                                src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'U')}&background=6A8E7F&color=fff&bold=true&rounded=true&size=128`}
                                alt={user?.fullName || 'Profile'}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-text-main dark:text-white truncate tracking-tight">{user?.fullName || 'Student Guest'}</p>
                                <p className="text-[10px] font-bold text-neutral-warm/60 uppercase tracking-widest">Wellness Profile</p>
                            </div>
                        </NavLink>

                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-warm/40 hover:text-secondary transition-colors"
                        >
                            <span className="material-icons-outlined text-sm">logout</span>
                            Logout Session
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;


