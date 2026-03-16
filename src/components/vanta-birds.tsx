"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function VantaBirds() {
  const vantaEffectRef = useRef<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (threeLoaded && vantaLoaded && vantaRef.current && mounted) {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }

      try {
        const isDark = resolvedTheme === "dark";
        vantaEffectRef.current = window.VANTA.BIRDS({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: isDark ? 0x010101 : 0xffffff,
          color1: isDark ? 0x3b82f6 : 0xff1f1f,
          color2: isDark ? 0x1d4ed8 : 0x333333,
          birdSize: 1.5,
          wingSpan: 20.0,
          speedLimit: 5.0,
          separation: 50.0,
          alignment: 50.0,
          cohesion: 50.0,
        });
      } catch (error) {
        console.error("Vanta Birds initialization error:", error);
      }
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [threeLoaded, vantaLoaded, resolvedTheme, mounted]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => {
          setThreeLoaded(true);
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"
        onLoad={() => {
          setVantaLoaded(true);
        }}
      />
      <div
        ref={vantaRef}
        className="fixed inset-0 -z-10 w-full h-full transition-colors duration-500"
        style={{ 
          backgroundColor: mounted 
            ? (resolvedTheme === "dark" ? "#000000" : "#ffffff") 
            : "#000000" // Default to dark background during hydration to match initial HTML state
        }}
      />
    </>
  );
}
