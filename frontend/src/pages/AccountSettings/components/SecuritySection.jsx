import React from 'react';

const SecuritySection = () => (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-6">
            <span className="material-icons-round text-primary">lock</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Password & Security</h2>
        </div>

        <div className="space-y-6">
            <div className="space-y-1.5 max-w-md">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Password</label>
                <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                </div>
            </div>
            <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                Update Password
            </button>
        </div>
    </section>
);

export default SecuritySection;
