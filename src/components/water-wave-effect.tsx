"use client";

import React from "react";
import WaterWave from "react-water-wave";

export function WaterWaveEffect() {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none overflow-hidden bg-[#001219]">
      {/* Liquid Water Background Gradient - Matches the "Yes" example look */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#005f73] via-[#001219] to-[#000000] opacity-90" />
      
      <WaterWave
        imageUrl="/images/water-texture.png"
        resolution={512}
        dropRadius={40}
        perturbance={0.06}
        className="size-full"
        interactive={true}
      >
        {() => (
          <div className="size-full" />
        )}
      </WaterWave>
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/70" />
    </div>
  );
}
