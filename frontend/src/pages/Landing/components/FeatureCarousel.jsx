import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';

const slides = [
    {
        title: "Always on, always there",
        desc: "No matter the time of day, MindMate is ready to help: no appointments, no waiting, just instant access to care.",
        image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=800",
        blobClass: "bg-blue-100/50",
        accent: "text-blue-600"
    },
    {
        title: "Anonymous and secure",
        desc: "Stigma-free and anonymous, MindMate is designed to feel safe, supportive, and judgment-free for every student.",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=800",
        blobClass: "bg-green-100/50",
        accent: "text-green-600"
    },
    {
        title: "Evidence-based support",
        desc: "Our platform uses techniques from CBT and mindfulness to help you manage stress and build emotional resilience.",
        image: "https://images.unsplash.com/photo-1523240715639-960c18d483b5?auto=format&fit=crop&q=80&w=800",
        blobClass: "bg-purple-100/50",
        accent: "text-purple-600"
    },
    {
        title: "Clinical grounding",
        desc: "Developed in collaboration with mental health professionals to ensure your safety and the quality of care provided.",
        image: "https://images.unsplash.com/photo-1559192823-74ad3d7ef448?auto=format&fit=crop&q=80&w=800",
        blobClass: "bg-orange-100/50",
        accent: "text-orange-600"
    },
    {
        title: "Peer-led resilience",
        desc: "Connect with the collective wisdom of thousands of students who have walked the same path as you.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
        blobClass: "bg-pink-100/50",
        accent: "text-pink-600"
    }
];

const FeatureCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 700);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <section className="py-24 overflow-hidden">
            <SectionHeader
                centered
                title={<>Why <span className="text-primary">MindMate?</span></>}
                className="mb-12"
            />

            <div className="relative max-w-6xl mx-auto px-6">
                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-text-main hover:text-primary transition-all active:scale-90"
                >
                    <span className="material-icons-outlined">chevron_left</span>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-text-main hover:text-primary transition-all active:scale-90"
                >
                    <span className="material-icons-outlined">chevron_right</span>
                </button>

                {/* Slides Container */}
                <div className="relative min-h-[500px] flex items-center">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-in-out ${index === currentIndex
                                ? "opacity-100 translate-x-0 z-10"
                                : index < currentIndex
                                    ? "opacity-0 -translate-x-full z-0"
                                    : "opacity-0 translate-x-full z-0"
                                }`}
                        >
                            <div className="space-y-6">
                                <h3 className="text-3xl md:text-4xl font-bold text-text-main leading-tight">
                                    {slide.title}
                                </h3>
                                <p className="text-lg text-neutral-warm leading-relaxed">
                                    {slide.desc}
                                </p>
                            </div>

                            <div className="relative flex justify-center items-center">
                                {/* Ovular/Blob Mask - Mirroring Wysa */}
                                <div className={`relative w-80 h-80 md:w-96 md:h-96 rounded-[60%_40%_70%_30%_/_40%_50%_60%_55%] transition-all duration-1000 ${slide.blobClass} flex items-center justify-center p-4`}>
                                    <div className="w-full h-full overflow-hidden rounded-[40%_60%_70%_30%_/_50%_60%_40%_55%] shadow-2xl relative z-10">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover scale-110"
                                        />
                                    </div>
                                    {/* Decorative circles inside blob */}
                                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full border border-white/30 animate-pulse"></div>
                                    <div className="absolute bottom-10 right-10 w-8 h-8 rounded-full border border-white/20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (isAnimating) return;
                                setIsAnimating(true);
                                setCurrentIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-text-main w-8"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;
