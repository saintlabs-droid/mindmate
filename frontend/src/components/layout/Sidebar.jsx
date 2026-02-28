import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'Journal', icon: 'book', path: '/log-mood' },
        { name: 'Insights', icon: 'analytics', path: '/insights' },
        { name: 'MindAI', icon: 'smart_toy', path: '/ai-assistant' },
        { name: 'Support', icon: 'spa', path: '/support' },
        { name: 'Account', icon: 'person', path: '/account' },
    ];

    return (
        <aside className="w-56 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex z-20 shadow-sm h-screen sticky top-0 transition-all duration-300">
            <div className="p-5 flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">M</div>
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">MindMate</span>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-sm ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            }`
                        }
                    >
                        <span className="material-icons-outlined text-[20px]">{item.icon}</span>
                        {item.name}
                        {item.name === 'Journal' && (
                            <span className="material-icons-outlined text-[10px] ml-auto opacity-50">lock</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 mt-auto border-t border-gray-200 dark:border-gray-800">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1.5 text-primary">
                        <span className="material-icons-outlined text-sm">support_agent</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">Need Help?</span>
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-2 leading-tight">Speak to a counselor anonymously.</p>
                    <button className="w-full text-[11px] bg-white dark:bg-surface-dark border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors py-1.5 rounded-md font-semibold">
                        Call Helpline
                    </button>
                </div>

                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ring-1 ring-transparent hover:ring-gray-200">
                    <img
                        className="h-7 w-7 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                        alt="User profile"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Imani O.</p>
                        <p className="text-xs text-gray-500 truncate">View Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
