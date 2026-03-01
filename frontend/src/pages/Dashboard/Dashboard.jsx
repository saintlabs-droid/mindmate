import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
            <div className="max-w-6xl mx-auto space-y-4">
                {/* Desktop Header Area */}
                <div className="hidden md:flex items-center justify-between py-4">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Jambo, Imani 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Here's your daily well-being overview.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                            <span className="material-icons-outlined text-lg">notifications</span>
                            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-primary rounded-full border border-background-light dark:border-background-dark"></span>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                            <span className="material-icons-outlined text-lg">settings</span>
                        </button>
                    </div>
                </div>

                {/* Hero Section: Mood Check-in */}
                <section className="bg-white dark:bg-surface-dark rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left max-w-lg">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-2">Daily Check-in</span>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">How are you feeling right now?</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">Take a moment to reflect. Tracking your mood helps you understand your patterns better.</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {[
                                    { emoji: '😄', label: 'Great' },
                                    { emoji: '🙂', label: 'Good' },
                                    { emoji: '😐', label: 'Okay' },
                                    { emoji: '😔', label: 'Low' },
                                    { emoji: '😣', label: 'Bad' }
                                ].map((m) => (
                                    <button key={m.label} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/5 transition-all w-16 group/btn">
                                        <div className="text-xl transform group-hover/btn:scale-110 transition-transform">{m.emoji}</div>
                                        <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover/btn:text-primary">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <img className="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-surface-dark shadow-md rotate-2 hover:rotate-0 transition-transform duration-500" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" alt="Mood decoration" />
                        </div>
                    </div>
                </section>
                {/* Grid Layout for Charts & Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Your Week in Review</h3>
                                <select className="text-[11px] border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 pl-2 pr-6 focus:ring-primary focus:border-primary">
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>
                            <div className="h-44 w-full flex items-end justify-between px-1 gap-1.5">
                                {[
                                    { day: 'Mon', h: '60%' },
                                    { day: 'Tue', h: '40%' },
                                    { day: 'Wed', h: '80%' },
                                    { day: 'Thu', h: '55%' },
                                    { day: 'Fri', h: '70%' },
                                    { day: 'Sat', h: '45%' },
                                    { day: 'Sun', h: '75%', bold: true }
                                ].map((d) => (
                                    <div key={d.day} className="flex flex-col items-center gap-1.5 w-full group cursor-pointer">
                                        <div className="w-full max-w-[28px] bg-primary/20 rounded h-full group-hover:bg-primary/30 transition-colors relative">
                                            <div className="absolute bottom-0 w-full bg-primary rounded" style={{ height: d.h }}></div>
                                        </div>
                                        <span className={`text-[10px] ${d.bold ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400 font-medium'}`}>{d.day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                                <span className="text-gray-500 font-medium">Average: <span className="font-bold text-primary">Good</span></span>
                                <a className="text-primary hover:text-primary-dark font-bold flex items-center gap-1 transition-colors uppercase tracking-tight" href="#">
                                    Detailed Report <span className="material-icons-outlined text-[10px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>

                        {/* Recommended Resources */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 hover:shadow-md transition-all cursor-pointer">
                                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-icons-outlined text-xl">school</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Exam Stress?</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">Proven anxiety techniques.</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex gap-3 hover:shadow-md transition-all cursor-pointer">
                                <div className="h-10 w-10 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-green-600 dark:text-green-400">
                                    <span className="material-icons-outlined text-xl">self_improvement</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Meditation</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">10-minute mind reset.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Widgets Column */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white shadow-md relative overflow-hidden">
                            <span className="material-icons-outlined absolute top-2 right-2 text-white/20 text-3xl">format_quote</span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-3 block text-center">Daily Quote</span>
                            <blockquote className="text-sm font-medium leading-relaxed mb-4 italic text-center px-1">
                                "You are capable of amazing things, even when you're tired."
                            </blockquote>
                            <div className="flex justify-center gap-2">
                                <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors backdrop-blur-sm">
                                    <span className="material-icons-outlined text-xs">favorite_border</span>
                                </button>
                                <button className="p-1.5 bg-white/20 rounded hover:bg-white/30 transition-colors backdrop-blur-sm">
                                    <span className="material-icons-outlined text-xs">share</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-50 dark:border-gray-800 pb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Journal</h3>
                                <a className="text-primary text-[10px] font-bold uppercase hover:underline" href="#">All Entries</a>
                            </div>
                            <div className="relative pl-3 border-l-2 border-primary/20 space-y-4">
                                <div className="relative">
                                    <div className="absolute -left-[16px] top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-surface-dark"></div>
                                    <p className="text-[10px] text-gray-400 mb-0.5">8:30 PM Yesterday</p>
                                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">Feeling tired</h4>
                                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 italic leading-tight">Three deadlines next week...</p>
                                </div>
                            </div>
                            <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-[11px] font-bold uppercase tracking-wider">
                                <span className="material-icons-outlined text-sm">edit</span>
                                Log Mood
                            </button>
                        </div>

                        <div className="bg-primary-light dark:bg-gray-800/50 rounded-xl p-4 border border-primary/10 dark:border-gray-700 shadow-sm">
                            <div className="flex items-start gap-3">
                                <span className="material-icons-outlined text-primary text-xl">lightbulb</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-[11px]">Tip of the Day</h4>
                                    <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">
                                        Hydration affects mood. Take a sip right now!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
