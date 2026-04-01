"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimeRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const AnimeReveal: React.FC<AnimeRevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 800, 
  direction = 'up',
  className = "" 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const translateY = direction === 'up' ? [40, 0] : direction === 'down' ? [-40, 0] : 0;
            const translateX = direction === 'left' ? [40, 0] : direction === 'right' ? [-40, 0] : 0;

            animate(entry.target, {
              opacity: [0, 1],
              translateY: translateY,
              translateX: translateX,
              duration: duration,
              delay: delay,
              ease: 'easeOutQuart'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, duration, direction]);

  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

export default AnimeReveal;
