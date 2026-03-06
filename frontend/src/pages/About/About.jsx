import React from "react";
import { Link } from "react-router-dom";

/**
 * About Page Component
 * Restored to exact mockup specifications.
 */
const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display selection:bg-primary/30 selection:text-primary-dark">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                <span className="material-icons text-xl">psychology</span>
                            </div>
                            <Link
                                to="/"
                                className="font-bold text-xl tracking-tight text-slate-900 dark:text-white"
                            >
                                MindMate
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <div className="flex items-center space-x-6">
                                <Link
                                    className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition-colors"
                                    to="/"
                                >
                                    Home
                                </Link>
                                <Link
                                    className="text-primary font-semibold transition-colors"
                                    to="/about"
                                >
                                    About
                                </Link>
                                <a
                                    className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition-colors"
                                    href="#contact"
                                >
                                    Contact
                                </a>
                            </div>
                            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-700">
                                <Link
                                    className="text-slate-900 dark:text-slate-300 font-semibold hover:opacity-80 transition-opacity"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
                                    to="/signup"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-slate-600 hover:text-primary focus:outline-none">
                                <span className="material-icons">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-16 pb-20 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span>For Kenyan Students</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Empowering <span className="text-primary">Kenyan Minds</span> to Thrive.
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                                    MindMate is dedicated to providing accessible, culturally relevant mental health support for university students across Kenya. We bridge the gap between academic pressure and personal well-being, creating a space where you can just breathe.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                    {[
                                        { icon: "lock", title: "Confidential", desc: "Your privacy is our priority. Safe & secure." },
                                        { icon: "diversity_3", title: "Community", desc: "You are never alone in this journey." },
                                        { icon: "school", title: "Accessible", desc: "Support tailored for campus life." }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                                                <span className="material-icons">{item.icon}</span>
                                            </div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 group">
                                <img
                                    alt="Group of diverse students"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src="https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=800"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="font-medium text-lg italic">
                                        "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 bg-white dark:bg-slate-900" id="contact">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg">
                                Have questions about our programs, need assistance with the app, or just want to say hello? We're here to listen.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Contact Info */}
                            <div className="lg:col-span-4 space-y-8 h-full flex flex-col">
                                <div className="bg-background-light dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 flex-grow">
                                    <div className="space-y-8">
                                        {[
                                            { icon: "location_on", title: "Visit Us", content: "Innovation Hub, 4th Floor\\nNgong Road, Nairobi, Kenya" },
                                            { icon: "mail", title: "Email Us", content: "hello@mindmate.co.ke", isEmail: true },
                                            { icon: "phone_in_talk", title: "Helpline", content: "Mon-Fri from 8am to 5pm\\n+254 700 123 456" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                                                    <span className="material-icons">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 dark:text-white text-lg">{item.title}</h4>
                                                    {item.isEmail ? (
                                                        <a href={`mailto:${item.content}`} className="text-slate-500 hover:text-primary transition-colors block mt-1 leading-relaxed">
                                                            {item.content}
                                                        </a>
                                                    ) : (
                                                        <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed whitespace-pre-line">
                                                            {item.content}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 rounded-xl overflow-hidden h-40 bg-slate-200 dark:bg-slate-700 relative group border border-slate-200 dark:border-slate-600">
                                        <img
                                            alt="Map view"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold text-slate-900 dark:text-white backdrop-blur-sm">
                                                Find us in Nairobi
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-8">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none h-full">
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                                <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/20 transition-all py-3 px-4" placeholder="e.g. Amani Kamau" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Student Email</label>
                                                <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/20 transition-all py-3 px-4" placeholder="name@university.ac.ke" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">University</label>
                                                <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/20 transition-all py-3 px-4">
                                                    <option>Select your university</option>
                                                    <option>University of Nairobi</option>
                                                    <option>Kenyatta University</option>
                                                    <option>Strathmore University</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                                <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/20 transition-all py-3 px-4" placeholder="How can we help?" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                            <textarea className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/20 transition-all py-3 px-4 resize-none h-32" placeholder="Tell us more about your inquiry..." />
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <button className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg shadow-lg shadow-primary/30 text-white bg-primary hover:bg-primary-dark hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200">
                                                Send Message
                                                <span className="material-icons ml-2 text-sm">send</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-xs">M</div>
                        <span className="font-bold text-slate-900 dark:text-white">MindMate</span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm ml-2">© 2026 MindMate Kenya.</span>
                    </div>
                    <div className="flex gap-6">
                        <Link className="text-slate-500 hover:text-primary dark:text-slate-400 text-sm transition-colors" to="/privacy">Privacy Policy</Link>
                        <Link className="text-slate-500 hover:text-primary dark:text-slate-400 text-sm transition-colors" to="/terms">Terms of Service</Link>
                        <Link className="text-slate-500 hover:text-primary dark:text-slate-400 text-sm transition-colors" to="/support">Emergency Contacts</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;

