import React from 'react';
import mindaiImage from '../../../assets/mindai-feature.png';

const MindAISection = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Main Feature Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="relative group overflow-hidden shadow-premium bg-gray-50">
                    {/* The Image (already contains conversation) */}
                    <img
                        src={mindaiImage}
                        alt="MindAI Feature"
                        className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-[1.01]"
                    />

                    {/* Content Overlay - Bottom Left */}
                    <div className="absolute bottom-10 left-10 z-20 max-w-sm md:max-w-lg space-y-8">
                        <div className="space-y-4">
                            <p className="text-sm md:text-base text-white font-medium leading-relaxed drop-shadow-md max-w-sm md:max-w-md">
                                Stigma-free and private support tailored for your campus journey. MindAI is trained to listen, help you explore emotions, and identify triggers without judgment. 24/7 care, right when you need it.
                            </p>
                        </div>

                        <a
                            href="/signup/"
                            className="inline-block bg-primary text-white px-10 py-5 rounded-none font-black uppercase tracking-widest text-xs hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30"
                        >
                            Chat with MindAI Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MindAISection;
