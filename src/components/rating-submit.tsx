"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { RatingModal } from "./rating-modal";

export function RatingSubmit() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ average: 0, total: 0 });

  useEffect(() => {
    fetch("/api/ratings")
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.ratings && data.ratings.length > 0) {
           const max = data.ratings.length;
           const sum = data.ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0);
           setStats({ average: sum / max, total: max });
        }
      });
  }, []);

  return (
    <>
      <div 
         className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-secondary/10 px-6 py-4 rounded-3xl border border-primary/10 shadow-lg w-fit mx-auto my-8 cursor-pointer hover:bg-secondary/20 transition-colors" 
         onClick={() => setIsOpen(true)}
      >
         <div className="flex items-center gap-4">
            <div className="flex -space-x-1.5 border-r border-primary/10 pr-4">
               {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`size-5 sm:size-6 ${i <= Math.round(stats.average || 5) ? "fill-yellow-500 text-yellow-500" : "fill-transparent text-muted-foreground/30"}`} />
               ))}
            </div>
            <div className="flex flex-col text-left">
               <span className="font-black text-xl leading-none text-foreground">{stats.average ? stats.average.toFixed(1) : "5.0"}</span>
               <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                 {stats.total > 0 ? `${stats.total} Reviews` : "No reviews yet"}
               </span>
            </div>
         </div>
         <button className="text-sm font-black bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-md">
            Rate My Work
         </button>
      </div>

      <RatingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
