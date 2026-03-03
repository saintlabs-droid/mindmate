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
        <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-14 gap-8">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
                        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                            <span className="material-icons-outlined text-white" style={{ fontSize: '15px' }}>psychology</span>
                        </div>
                        <span className="text-[15px] font-semibold text-text-main tracking-tight">MindMate</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 flex-1">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="px-3 py-1.5 text-[13.5px] font-normal text-[#3c4043] hover:text-primary hover:bg-gray-50 rounded transition-colors whitespace-nowrap"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="hidden md:flex items-center gap-1 ml-auto">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="w-9 h-9 flex items-center justify-center rounded-full text-[#5f6368] hover:bg-gray-100 transition-colors"
                            aria-label="Search"
                        >
                            <span className="material-icons-outlined" style={{ fontSize: '20px' }}>search</span>
                        </button>
                        <a href="/login/" className="ml-2 px-4 py-1.5 text-[13.5px] font-normal text-[#3c4043] hover:text-primary hover:bg-gray-50 rounded transition-colors">
                            Login
                        </a>
                        <a href="/signup/" className="ml-1 px-5 py-2 bg-primary text-white text-[13px] font-semibold rounded-full hover:brightness-105 transition-all shadow-sm">
                            Sign Up
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center ml-auto">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-9 h-9 flex items-center justify-center text-[#5f6368] hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <span className="material-icons-outlined" style={{ fontSize: '22px' }}>
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Expandable search */}
                {isSearchOpen && (
                    <div className="hidden md:block pb-3 animate-in fade-in duration-200">
                        <input
                            autoFocus
                            type="search"
                            placeholder="Search MindMate..."
                            className="w-full max-w-md border border-gray-200 rounded-full px-5 py-2 text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2.5 text-sm text-[#3c4043] hover:text-primary hover:bg-gray-50 rounded transition-colors"
                            >
                                {label}
                            </a>
                        ))}
                        <div className="pt-3 grid grid-cols-2 gap-3">
                            <a href="/login/" className="text-center py-2.5 text-sm font-semibold text-text-main border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">Login</a>
                            <a href="/signup/" className="text-center py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:brightness-105 transition-colors">Sign Up</a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default LandingHeader;

