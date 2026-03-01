import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import LogMood from './pages/LogMood/LogMood';
import Support from './pages/Support/Support';
import MainLayout from './components/layout/MainLayout';

const Placeholder = ({ name, dev }) => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <span className="material-icons-outlined text-3xl">construction</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
            This page is currently being developed by <span className="font-semibold text-primary">{dev}</span>.
            Please check back soon for updates!
        </p>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />

                {/* App Routes wrapped in MainLayout */}
                <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                <Route path="/log-mood" element={<MainLayout><LogMood /></MainLayout>} />
                <Route path="/support" element={<MainLayout><Support /></MainLayout>} />

                <Route path="/insights" element={<MainLayout><Placeholder name="Insights & Progress" dev="Insights Team" /></MainLayout>} />
                <Route path="/ai-assistant" element={<MainLayout><Placeholder name="MindAI Chat" dev="AI Service Team" /></MainLayout>} />
                <Route path="/account" element={<MainLayout><Placeholder name="Account Settings" dev="Account Team" /></MainLayout>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
