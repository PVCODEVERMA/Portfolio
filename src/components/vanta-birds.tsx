"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function VantaBirds() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    if (threeLoaded && vantaLoaded && vantaRef.current && !vantaEffect) {
      try {
        const effect = window.VANTA.BIRDS({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xffd863,
          color1: 0xff1f1f,
          color2: 0x333333,
          birdSize: 1.5,
          wingSpan: 20.0,
          speedLimit: 5.0,
          separation: 50.0,
          alignment: 50.0,
          cohesion: 50.0,
        });
        setVantaEffect(effect);
      } catch (error) {
        console.error("Vanta Birds initialization error:", error);
      }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [threeLoaded, vantaLoaded, vantaEffect]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        onLoad={() => {
          console.log("Three.js loaded successfully");
          setThreeLoaded(true);
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"
        onLoad={() => {
          console.log("Vanta Birds loaded successfully");
          setVantaLoaded(true);
        }}
      />
      <div
        ref={vantaRef}
        className="fixed inset-0 -z-10 w-full h-full"
        style={{ backgroundColor: "#ffd863" }}
      />
    </>
  );
}
