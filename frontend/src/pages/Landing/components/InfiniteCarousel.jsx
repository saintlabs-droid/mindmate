import React, { useState, useEffect } from 'react';

const InfiniteCarousel = ({ items, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative h-[450px] overflow-hidden">
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + items.length) % items.length;

            let transformClass = '';
            if (isActive) {
              transformClass = 'translate-x-0 opacity-100';
            } else if (isPrev) {
              transformClass = '-translate-x-full opacity-0';
            } else {
              transformClass = 'translate-x-full opacity-0';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${transformClass}`}
              >
                <div className="h-full overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Text Content - Left Side */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Image - Right Side */}
                    <div className="flex-1 flex items-center justify-center p-8">
                      {item.image ? (
                        <div className="relative">
                          <div className="w-56 h-56 rounded-full rounded-tr-none overflow-hidden shadow-premium bg-gray-50">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {item.label && (
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm bg-primary/5 text-primary backdrop-blur-sm border border-white/20">
                              {item.label}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-56 h-56 rounded-full rounded-tr-none bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center shadow-premium border-4 border-primary/10">
                          <span className="text-9xl">{item.icon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? 'w-10 h-3 bg-primary'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
