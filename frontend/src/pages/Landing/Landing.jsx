import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen w-full font-display">
            <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-primary/10 dark:border-primary/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-xl">spa</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-primary">MindMate</span>
                        </div>
                        <nav className="hidden md:flex space-x-8 items-center">
                            <Link className="text-text-main dark:text-white hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/">Home</Link>
                            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/how-it-works">How it Works</Link>
                            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/support">Resources</Link>
                            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" to="/community">Community</Link>
                        </nav>
                        <div className="hidden md:flex items-center gap-4">
                            <Link className="text-deep-charcoal dark:text-gray-200 hover:opacity-70 font-semibold px-3 py-2 transition-all" to="/login">Login</Link>
                            <Link className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:brightness-110 transition-all font-display" to="/register">
                                Sign Up
                            </Link>
                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                            <a className="bg-[#E2725B] hover:bg-[#c95e4a] text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 animate-pulse" href="#">
                                <span className="material-icons text-white text-sm">notifications_active</span>
                                Crisis Mode
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 md:px-12 space-y-24">
                    <section className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
                        <div className="space-y-8 md:pr-8">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                                Mental Wellness for Students
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-text-main dark:text-white">
                                Your Student Journey, <span className="text-primary relative inline-block">
                                    Balanced.
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30" preserveAspectRatio="none" viewBox="0 0 100 10">
                                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" stroke-width="8"></path>
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                                Navigating university life in Kenya can be overwhelming. MindMate is your safe space to track your mood, reflect on your day, and find resources tailored just for you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg">
                                    Start Your Journey
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </Link>
                                <Link to="/about" className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-lg">
                                    <span className="material-icons text-primary">play_circle</span>
                                    See How It Works
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-full min-h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-primary/5">
                            <img alt="University students" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=800" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <span className="material-icons text-primary text-4xl">format_quote</span>
                                    <div>
                                        <p className="text-base text-gray-700 dark:text-gray-200 italic mb-3">
                                            "It's easier to focus on my studies when I'm not carrying all my stress alone. MindMate helps me unpack my day."
                                        </p>
                                        <p className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">— Sarah O., MMUST</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-12 border-t border-primary/10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-6">Simple Steps to Balance</h2>
                        <div className="grid md:grid-cols-3 gap-12 pt-12">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <span className="material-icons text-3xl">edit</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Log</h3>
                                <p className="text-gray-500 max-w-xs">Take a moment each day to record your mood and thoughts in a private, secure journal.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <span className="material-icons text-3xl">bar_chart</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">View</h3>
                                <p className="text-gray-500 max-w-xs">Visualize your emotional patterns over the semester to understand your triggers better.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <span className="material-icons text-3xl">self_improvement</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Reflect</h3>
                                <p className="text-gray-500 max-w-xs">Get personalized prompts and local support resources to help you regain your balance.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-surface-light dark:bg-surface-dark border-t border-primary/10 dark:border-primary/20 p-8 text-center text-gray-500">
                <p>© 2026 MindMate MMUST. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
