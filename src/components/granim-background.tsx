"use client";

import React, { useEffect, useRef } from 'react';
import Granim from 'granim';

const GranimBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const granimInstance = new Granim({
      element: canvasRef.current,
      direction: 'diagonal',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#0f172a', '#1e293b'],
            ['#1e293b', '#0f172a'],
            ['#0f172a', '#334155']
          ],
          transitionSpeed: 7000
        }
      }
    });

    return () => {
      granimInstance.destroy();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-50 w-full h-full pointer-events-none opacity-40"
    />
  );
};

export default GranimBackground;
