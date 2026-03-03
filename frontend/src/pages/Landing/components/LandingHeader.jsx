import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * LandingHeader: Navigation boundary for the landing experience.
 * Encapsulates brand identity, navigation links, and primary auth CTAs.
 */
const LandingHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-primary/10 dark:border-primary/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white">
                            <span className="material-icons text-xl font-light">spa</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-primary">
                            MindMate
                        </span>
                    </div>

                    <nav className="hidden md:flex space-x-10 items-center">
                        <Link className="text-gray-900 dark:text-white hover:text-primary transition-all font-bold text-xs uppercase tracking-widest" to="/">Home</Link>
                        <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest" href="#how-it-works">How it Works</a>
                        <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest" href="#resources">Resources</a>
                        <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest" href="#about">About</a>
                        <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest" href="#contact">Contact</a>
                    </nav>

                    <div className="hidden md:flex items-center gap-6">
                        <a
                            className="text-gray-900 dark:text-gray-200 hover:text-primary font-black px-2 py-2 transition-all uppercase tracking-[0.2em] text-[10px]"
                            href="/login/"
                        >
                            Login
                        </a>
                        <a
                            className="bg-primary text-white px-7 py-3 rounded-xl font-black shadow-xl shadow-primary/20 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px]"
                            href="/signup/"
                        >
                            Sign Up
                        </a>
                        <div className="w-px h-8 bg-gray-200 dark:bg-gray-800 mx-2"></div>
                        <Link
                            className="bg-crisis hover:bg-crisis/90 text-white px-5 py-3 rounded-xl font-black shadow-lg hover:shadow-crisis/20 transition-all flex items-center gap-2 animate-pulse uppercase tracking-[0.2em] text-[9px]"
                            to="/support"
                        >
                            <span className="material-icons text-white text-xs">notifications_active</span>
                            Crisis Mode
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors focus:outline-none"
                        >
                            <span className="material-icons text-2xl">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 animate-in slide-in-from-top duration-300">
                    <div className="px-6 py-10 space-y-6">
                        <Link className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest" to="/">Home</Link>
                        <a className="block text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest" href="#how-it-works">How it Works</a>
                        <a className="block text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest" href="#resources">Resources</a>
                        <a className="block text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest" href="#about">About</a>
                        <a className="block text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest" href="#contact">Contact</a>
                        <div className="pt-6 flex flex-col gap-4">
                            <a className="block w-full text-center text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs py-4 border border-gray-100 dark:border-white/5 rounded-2xl" href="/login/">Login</a>
                            <a className="block w-full text-center bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 uppercase tracking-[0.2em] text-xs" href="/signup/">Join MindMate</a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;
