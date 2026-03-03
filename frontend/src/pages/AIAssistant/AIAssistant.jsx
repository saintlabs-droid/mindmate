import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

/**
 * AIAssistant Page
 * Refined for a more compact, "smart" and smoother conversational experience.
 */
const AIAssistant = () => {
    const { user } = useUser();
    const firstName = user?.fullName?.split(' ')[0] || 'there';
    const [message, setMessage] = useState('');

    const mockMessages = [
        {
            id: 1,
            sender: 'ai',
            time: '2:31 PM',
            content: (
                <p>Hi {firstName}! I noticed from your recent check-ins that you've been feeling a bit overwhelmed lately. That's completely normal, and I'm here to help.</p>
            )
        },
        {
            id: 2,
            sender: 'ai',
            time: '2:31 PM',
            content: (
                <div className="space-y-3">
                    <p>Here is a <span className="text-primary font-bold">Small Step</span> for you to try right now:</p>
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 border-l-2 border-primary rounded-r-lg">
                        <h4 className="font-bold text-primary mb-1 text-[11px] uppercase tracking-wider">Grounding Exercise</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">Take a deep breath. Can you name 5 things you can see right now?</p>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            sender: 'user',
            time: '2:33 PM',
            content: "I can see my laptop, a coffee mug, the window, a pen, and my notebook."
        },
        {
            id: 4,
            sender: 'ai',
            time: '2:34 PM',
            content: (
                <p>Great job noticing those details. Bringing your focus to the physical world helps quiet the racing thoughts. How does your chest feel now compared to a few minutes ago?</p>
            ),
            chips: ["It feels lighter", "Still tight", "Another tip?"]
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#fcfcfc] dark:bg-background-dark overflow-hidden transition-colors duration-500">

            {/* -- Slim Desktop Header -- */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#ff9f8a] flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-icons text-white text-xl">auto_awesome</span>
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full shadow-sm"></span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-none">MindAI Companion</h1>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Smart Support • Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 group">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                        <span className="material-icons text-lg">settings</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                        <span className="material-icons text-lg">history</span>
                    </button>
                </div>
            </div>

            {/* -- Focused Messages Area -- */}
            <div className="flex-1 overflow-y-auto pt-6 px-4 pb-24 scroll-smooth chat-scroll">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Timestamp */}
                    <div className="flex justify-center mb-8">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 rounded-full">Conversation Started</span>
                    </div>

                    {mockMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            {msg.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-lg bg-primary/5 dark:bg-primary/10 flex-shrink-0 flex items-center justify-center border border-primary/10 mt-1">
                                    <span className="material-icons text-primary text-base">psychology</span>
                                </div>
                            )}
                            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                <div className={`
                                    px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all
                                    ${msg.sender === 'ai'
                                        ? 'bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/5'
                                        : 'bg-primary text-white rounded-tr-none shadow-orange-500/10'
                                    }
                                `}>
                                    {msg.content}
                                </div>

                                {msg.chips && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {msg.chips.map(chip => (
                                            <button
                                                key={chip}
                                                className="px-3 py-1.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-primary hover:border-primary hover:bg-primary hover:text-white rounded-full text-[10px] font-bold transition-all shadow-sm active:scale-95"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 mt-1.5 uppercase tracking-tighter opacity-60">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* -- Floating Slim Input -- */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-background-dark via-white/80 dark:via-background-dark/80 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <div className="relative flex items-center gap-2 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40">
                        <button className="p-2.5 text-gray-400 hover:text-primary transition-colors rounded-xl flex-shrink-0">
                            <span className="material-icons text-lg font-light">add_circle_outline</span>
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm py-2 px-1 font-medium"
                            placeholder="Message MindAI..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
                        />
                        <button className={`
                            p-2.5 rounded-xl transition-all flex-shrink-0 flex items-center justify-center
                            ${message ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-100 rotate-0' : 'text-gray-300 scale-90 rotate-45'}
                        `}>
                            <span className="material-icons text-lg">send</span>
                        </button>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2 px-4 opacity-50">
                        <span className="material-icons text-[10px] text-gray-400">info_outline</span>
                        <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center leading-none">
                            AI support provided for guidance, not therapy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
