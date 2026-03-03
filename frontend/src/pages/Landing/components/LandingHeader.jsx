import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navLinks = [
        { label: 'Programs', href: '#how-it-works' },
        { label: 'Resources', href: '#resources' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center h-20 gap-10">

                    {/* Logo - Synchronized with Brand Scale */}
                    <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                            <span className="material-icons-outlined text-white" style={{ fontSize: '20px' }}>psychology</span>
                        </div>
                        <span className="text-xl font-bold text-text-main tracking-tight">MindMate</span>
                    </Link>

                    {/* Desktop Nav - Smart & Airy */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="px-4 py-2 text-[15px] font-medium text-neutral-warm hover:text-primary rounded-xl hover:bg-primary/5 transition-all whitespace-nowrap"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Right actions - Premium CTAs */}
                    <div className="hidden md:flex items-center gap-4 ml-auto">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl text-neutral-warm hover:bg-gray-50 transition-colors"
                            aria-label="Search"
                        >
                            <span className="material-icons-outlined" style={{ fontSize: '22px' }}>search</span>
                        </button>
                        <Link
                            to="/login/"
                            className="px-5 py-2.5 text-[15px] font-semibold text-text-main hover:text-primary transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup/"
                            className="px-8 py-3 bg-primary text-white text-[15px] font-bold rounded-2xl hover:brightness-105 hover:scale-[1.02] active:scale-95 transition-all shadow-premium"
                        >
                            Join MindMate
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center ml-auto">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-11 h-11 flex items-center justify-center text-text-main hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            <span className="material-icons-outlined" style={{ fontSize: '24px' }}>
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Expandable search */}
                {isSearchOpen && (
                    <div className="hidden md:block pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="relative max-w-2xl mx-auto">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 material-icons-outlined text-neutral-warm">search</span>
                            <input
                                autoFocus
                                type="search"
                                placeholder="Search wellness resources, clinical paths..."
                                className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-base text-text-main placeholder-neutral-warm/60 focus:ring-2 focus:ring-primary/20 shadow-inner transition-all"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300 h-screen overflow-y-auto">
                    <div className="px-6 py-8 space-y-2">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-4 text-lg font-semibold text-text-main hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                            >
                                {label}
                            </a>
                        ))}
                        <div className="pt-8 flex flex-col gap-4">
                            <Link
                                to="/login/"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center py-4 text-lg font-bold text-text-main border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup/"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center py-4 text-lg font-bold text-white bg-primary rounded-2xl hover:brightness-105 transition-all shadow-premium"
                            >
                                Join MindMate
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );

};

export default LandingHeader;

