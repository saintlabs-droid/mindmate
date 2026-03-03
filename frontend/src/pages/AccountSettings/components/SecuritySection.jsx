import React from 'react';

/**
 * SecuritySection Component
 * Restored to exact mockup specifications.
 */
const SecuritySection = () => (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-icons text-primary text-xl">lock</span>
                Password & Security
            </h2>
        </div>
        <form className="space-y-4 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="currentPassword">Current Password</label>
                <input
                    className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="newPassword">New Password</label>
                    <input
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                        id="newPassword"
                        name="newPassword"
                        type="password"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                    />
                </div>
            </div>
            <div className="pt-2">
                <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors" type="button">
                    Update Password
                </button>
            </div>
        </form>
    </div>
);

export default SecuritySection;


