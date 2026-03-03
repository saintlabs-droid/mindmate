import React from "react";
import { Link } from "react-router-dom";

/**
 * Landing Page: Primary trust-building boundary for the student wellness platform.
 * Employs high-fidelity visual systems to establish psychological safety and platform integrity.
 */
const Landing = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-text-main dark:text-gray-100 antialiased overflow-x-hidden min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm border-b border-primary/10 dark:border-primary/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-xl">spa</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-primary">
                                MindMate
                            </span>
                        </div>
                        <nav className="hidden md:flex space-x-8 items-center">
                            <Link
                                className="text-text-main dark:text-white hover:text-primary dark:hover:text-primary font-medium transition-colors"
                                to="/"
                            >
                                Home
                            </Link>
                            <a
                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                                href="#"
                            >
                                How it Works
                            </a>
                            <a
                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                                href="#"
                            >
                                Resources
                            </a>
                            <a
                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                                href="#"
                            >
                                Community
                            </a>
                        </nav>
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                className="text-gray-900 dark:text-gray-200 hover:opacity-70 font-bold px-3 py-2 transition-all uppercase tracking-widest text-xs"
                                href="/login/"
                            >
                                Login
                            </a>
                            <a
                                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest text-xs"
                                href="/signup/"
                            >
                                Sign Up
                            </a>
                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                            <Link
                                className="bg-crisis hover:bg-crisis/90 text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 animate-pulse uppercase tracking-widest text-[10px]"
                                to="/support"
                            >
                                <span className="material-icons text-white text-sm">
                                    notifications_active
                                </span>
                                Crisis Mode
                            </Link>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
                                type="button"
                            >
                                <span className="material-icons text-2xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 md:px-12 space-y-24">
                    {/* Hero Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
                        <div className="space-y-8 md:pr-8">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                                Mental Wellness for Students
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-text-main dark:text-white">
                                Your Student Journey,{" "}
                                <span className="text-primary relative inline-block">
                                    Balanced.
                                    <svg
                                        className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 100 10"
                                    >
                                        <path
                                            d="M0 5 Q 50 10 100 5"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="8"
                                        ></path>
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                                Navigating university life in Kenya can be overwhelming.
                                MindMate is your safe space to track your mood, reflect on your
                                day, and find resources tailored just for you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a
                                    href="/signup/"
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                                >
                                    Start Your Journey
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </a>
                                <button className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-lg">
                                    <span className="material-icons text-primary">
                                        play_circle
                                    </span>
                                    See How It Works
                                </button>
                            </div>
                            <div className="flex items-center gap-4 pt-8">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map((i) => (
                                        <img
                                            key={i}
                                            alt={`Student avatar ${i}`}
                                            className="w-12 h-12 rounded-full border-2 border-white dark:border-background-dark object-cover"
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-base text-gray-500 dark:text-gray-400">
                                    Trusted by students across{" "}
                                    <span className="font-semibold text-text-main dark:text-gray-200">
                                        12 campuses
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="relative h-full min-h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl bg-primary/5">
                            <img
                                alt="University students"
                                className="absolute inset-0 w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=1200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <span className="material-icons text-primary text-4xl">
                                        format_quote
                                    </span>
                                    <div>
                                        <p className="text-base text-gray-700 dark:text-gray-200 italic mb-3">
                                            "It's easier to focus on my studies when I'm not carrying
                                            all my stress alone. MindMate helps me unpack my day."
                                        </p>
                                        <p className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
                                            — Sarah O., UoN
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Steps Section */}
                    <section className="py-12 border-t border-primary/10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-6">
                                Simple Steps to Balance
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Build a healthy routine with our proven 3-step framework
                                designed for the busy student lifestyle.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12 relative">
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"></div>
                            {[
                                {
                                    id: 1,
                                    title: "Log",
                                    icon: "edit",
                                    desc: "Take a moment each day to record your mood and thoughts in a private, secure journal.",
                                },
                                {
                                    id: 2,
                                    title: "View",
                                    icon: "bar_chart",
                                    desc: "Visualize your emotional patterns over the semester to understand your triggers better.",
                                },
                                {
                                    id: 3,
                                    title: "Reflect",
                                    icon: "self_improvement",
                                    desc: "Get personalized prompts and local support resources to help you regain your balance.",
                                },
                            ].map((step) => (
                                <div
                                    key={step.id}
                                    className="group flex flex-col items-center text-center"
                                >
                                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 shadow-md group-hover:shadow-xl group-hover:border-primary/30 transition-all duration-300 flex items-center justify-center mb-8 relative z-10">
                                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <span className="material-icons text-3xl">
                                                {step.icon}
                                            </span>
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm border-2 border-white dark:border-background-dark">
                                            {step.id}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main dark:text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Articles Section */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-text-main dark:text-white">
                                Recent Articles
                            </h2>
                            <a
                                className="text-primary font-semibold hover:underline flex items-center gap-1"
                                href="#"
                            >
                                View All Resources{" "}
                                <span className="material-icons text-sm">arrow_forward</span>
                            </a>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Managing Exam Anxiety",
                                    category: "Study Tips",
                                    desc: "Practical breathing techniques to help you stay calm during finals week.",
                                    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
                                },
                                {
                                    title: "Finding Your Tribe",
                                    category: "Community",
                                    desc: "How connecting with peers can improve your mental resilience on campus.",
                                    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
                                },
                                {
                                    title: "Sleep Better",
                                    category: "Wellness",
                                    desc: "Why sleep is critical for memory retention and emotional regulation.",
                                    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
                                },
                            ].map((article, idx) => (
                                <div
                                    key={idx}
                                    className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col group"
                                >
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        <img
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={article.img}
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">
                                            {article.category}
                                        </div>
                                        <h3 className="text-xl font-semibold text-text-main dark:text-white mb-3 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-base text-gray-500 dark:text-gray-400 mb-6 flex-1">
                                            {article.desc}
                                        </p>
                                        <a
                                            className="text-sm font-bold text-text-main dark:text-gray-200 hover:text-primary flex items-center gap-2"
                                            href="#"
                                        >
                                            Read more{" "}
                                            <span className="material-icons text-xs">
                                                arrow_forward
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-primary/10 dark:border-primary/20">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-sm">spa</span>
                            </div>
                            <span className="font-bold text-primary text-lg">MindMate</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
                            <a className="hover:text-primary transition-colors" href="#">
                                About Us
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Features
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                University Partners
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p>© 2026 MindMate Kenya. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;


