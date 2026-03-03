import React from 'react';
import InfiniteCarousel from './InfiniteCarousel';

const WhyUsSection = () => {
  const features = [
    {
      title: 'Anonymous and secure',
      description: 'Stigma-free and anonymous. MindMate is designed to feel safe, supportive, and judgment-free. Your privacy is our priority, with end-to-end encryption and no personal data sharing.',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
      label: 'Private'
    },
    {
      title: 'AI-powered support',
      description: 'Evidence-based techniques powered by AI to provide instant mental health support anytime. Get personalized recommendations and coping strategies tailored to your needs.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      label: 'Smart'
    },
    {
      title: 'Available 24/7',
      description: 'No matter the time of day, support is ready to help with no appointments or waiting. Access mental health resources whenever you need them, wherever you are.',
      image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=800',
      label: 'Always On'
    },
    {
      title: 'Clinically validated',
      description: 'Built on evidence-based therapeutic techniques like CBT, DBT, and mindfulness. Our approach is backed by research and designed by mental health professionals.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      label: 'Proven'
    },
    {
      title: 'Professional guidance',
      description: 'Connect with licensed therapists and coaches when you need human support. Seamlessly transition from AI support to professional care when needed.',
      image: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=800',
      label: 'Expert Care'
    },
    {
      title: 'Track your progress',
      description: 'Monitor your mental health journey with insights and personalized recommendations. Visualize your mood patterns and celebrate your growth over time.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      label: 'Insights'
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <div className="text-center mx-auto max-w-3xl space-y-4">
          <h2 className="text-5xl lg:text-6xl font-normal leading-tight text-text-main">
            Why Choose MindMate?
          </h2>
          <p className="text-lg text-neutral-warm leading-relaxed">
            Trusted mental health support designed to be accessible, safe, and effective for everyone.
          </p>
        </div>
      </div>

      <InfiniteCarousel items={features} />
    </section>
  );
};

export default WhyUsSection;
