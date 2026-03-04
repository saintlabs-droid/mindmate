import { memo } from 'react';
import { Card } from '../../../shared/components';

/**
 * PrivacyCard Component
 * Restored to exact mockup specifications.
 */
const PrivacyCard = memo(() => (
    <Card padding="sm" className="bg-primary/5 dark:bg-primary/10 border-primary/20 relative overflow-hidden p-6">
        {/* Decorative bg element */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 blur-2xl"></div>
        <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-primary">security</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Privacy Matters</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            At MindMate, we understand that seeking help takes courage. Your mental health journey is private. Here is how we protect you:
        </p>
        <ul className="space-y-4">
            <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">University Independence</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">We do not share your chat logs or session details with university administration.</p>
                </div>
            </li>
            <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">End-to-End Encryption</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">All messages and video calls are encrypted. Only you and your counselor have access.</p>
                </div>
            </li>
            <li className="flex gap-3 items-start">
                <div className="mt-0.5 h-5 w-5 bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600 dark:text-green-400 text-xs">check</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Anonymous Mode</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">You can choose to appear anonymous in community forums.</p>
                </div>
            </li>
        </ul>
        <nav className="mt-8 pt-6 border-t border-primary/20 space-y-3" aria-label="Legal links">
            <a href="#" className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary group bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                <span>Privacy Policy</span>
                <span className="material-icons text-slate-400 text-sm group-hover:text-primary">arrow_forward</span>
            </a>
            <a href="#" className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary group bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all">
                <span>Terms of Service</span>
                <span className="material-icons text-slate-400 text-sm group-hover:text-primary">arrow_forward</span>
            </a>
        </nav>
    </Card>
));

PrivacyCard.displayName = 'PrivacyCard';

export default PrivacyCard;


