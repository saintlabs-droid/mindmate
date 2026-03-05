import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { Construction, Loader2 } from 'lucide-react';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const LogMood = lazy(() => import('./pages/LogMood/LogMood'));
const Support = lazy(() => import('./pages/Support/Support'));
const Insights = lazy(() => import('./pages/Insights'));
const AIAssistant = lazy(() => import('./pages/AIAssistant/AIAssistant'));
const AccountSettings = lazy(() => import('./pages/AccountSettings/AccountSettings'));
const About = lazy(() => import('./pages/About/About'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

/**
 * DjangoRedirect: Escapes React Router and hands the browser to a
 * Django-managed URL. Used for auth pages served by the backend.
 */
const DjangoRedirect = ({ to }) => {
    useEffect(() => { window.location.replace(to); }, [to]);
    return null;
};

/**
 * AuthGuard: Enforcement boundary for protected application states.
 * Ensures session integrity before granting access to private modules.
 */
const AuthGuard = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-background-dark">
                <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/20 rounded-[2rem] animate-pulse" />
                        <Loader2 className="absolute inset-0 w-16 h-16 text-primary animate-spin" />
                    </div>
                    <div className="text-center space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white">Establishing Secure Session</span>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Verifying state with authentication gateway...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirection logic to Django-managed authentication gateway
        window.location.href = '/login/';
        return null;
    }

    return children;
};

/**
 * PageLoader Component
 * Shown while lazy-loaded pages are being fetched.
 */
const PageLoader = () => (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-background-dark">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 rounded-[2rem] animate-pulse" />
                <Loader2 className="absolute inset-0 w-16 h-16 text-primary animate-spin" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white">Loading</span>
        </div>
    </div>
);

/**
 * Placeholder Component
 * Standardized for development visibility across the distributed system.
 */
const Placeholder = ({ name, dev }) => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-8 shadow-xl shadow-primary/10">
            <Construction className="w-10 h-10" />
        </div>
        <h2 className="text-sm font-black text-gray-900 dark:text-white mb-2 uppercase tracking-[0.2em]">{name} <span className="text-primary italic">Interface</span></h2>
        <p className="text-[11px] font-medium text-gray-400 max-w-sm leading-relaxed uppercase tracking-widest">
            Module under active development by <span className="font-black text-primary">{dev}</span>.
        </p>
        <div className="mt-8 flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-primary animate-ping"></div>
            <span className="text-[9px] font-black text-primary/60 uppercase tracking-[0.4em]">Development Sequence 042</span>
        </div>
    </div>
);

function App() {
    return (
        <UserProvider>
            <Router>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/about" element={<About />} />

                        {/* Protected App Routes wrapped in AuthGuard + MainLayout */}
                        <Route path="/dashboard" element={<AuthGuard><MainLayout><Dashboard /></MainLayout></AuthGuard>} />
                        <Route path="/journal" element={<AuthGuard><MainLayout><LogMood /></MainLayout></AuthGuard>} />
                        <Route path="/support" element={<AuthGuard><MainLayout><Support /></MainLayout></AuthGuard>} />
                        <Route path="/insights" element={<AuthGuard><MainLayout><Insights /></MainLayout></AuthGuard>} />
                        <Route path="/community" element={<AuthGuard><MainLayout><Placeholder name="Community Hub" dev="Social Systems Team" /></MainLayout></AuthGuard>} />

                        <Route path="/ai-assistant" element={<AuthGuard><MainLayout><AIAssistant /></MainLayout></AuthGuard>} />
                        <Route path="/account" element={<AuthGuard><MainLayout><AccountSettings /></MainLayout></AuthGuard>} />

                        {/* Django auth pages - escape React Router entirely */}
                        <Route path="/login" element={<DjangoRedirect to="/login/" />} />
                        <Route path="/login/" element={<DjangoRedirect to="/login/" />} />
                        <Route path="/signup" element={<DjangoRedirect to="/signup/" />} />
                        <Route path="/signup/" element={<DjangoRedirect to="/signup/" />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider>
    );
}

export default App;

