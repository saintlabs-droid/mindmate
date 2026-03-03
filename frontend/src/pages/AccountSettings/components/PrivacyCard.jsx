import React from 'react';

/**
 * PrivacyCard Component
 * Restored to exact mockup specifications.
 */
const PrivacyCard = () => (
    <div className="bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 p-6 relative overflow-hidden">
        {/* Decorative bg element */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-primary">security</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Privacy Matters</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            At MindMate, we understand that seeking help takes courage. Your mental health journey is private. Here is how we protect you:
        </p>
        <div className="space-y-4">
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">University Independence</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">We do not share your chat logs or session details with university administration.</p>
                </div>
            </div>
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">End-to-End Encryption</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">All messages and video calls are encrypted. Only you and your counselor have access.</p>
                </div>
            </div>
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Anonymous Mode</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">You can choose to appear anonymous in community forums.</p>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary/20 space-y-3">
            <a href="#" className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary group bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                <span>Privacy Policy</span>
                <span className="material-icons text-slate-400 text-sm group-hover:text-primary">arrow_forward</span>
            </a>
            <a href="#" className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary group bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                <span>Terms of Service</span>
                <span className="material-icons text-slate-400 text-sm group-hover:text-primary">arrow_forward</span>
            </a>
        </div>
    </div>
);

export default PrivacyCard;


