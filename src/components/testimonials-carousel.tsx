"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { RatingSubmit } from "./rating-submit";

export function TestimonialsCarousel() {
  const [ratings, setRatings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/ratings")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.ratings) {
          setRatings(data.ratings);
        }
      });
  }, []);

  if (ratings.length === 0) {
     return (
        <div className="w-full flex flex-col items-center py-10">
           <RatingSubmit />
        </div>
     );
  }

  // Clone array to make seamless loop infinitely
  const items = [...ratings, ...ratings, ...ratings, ...ratings];

  return (
    <div className="w-full overflow-hidden flex flex-col items-center py-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto mb-6 px-4">
         <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground">
           Client <span className="text-primary italic">Testimonials</span>
         </h2>
         <p className="text-foreground/70 text-sm sm:text-base font-medium">
           What amazing people have said about my work.
         </p>
      </div>

      <RatingSubmit />

      <div 
        className="relative w-full max-w-[100vw] mx-auto mt-6"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <motion.div
           className="flex gap-4 sm:gap-6 w-max pl-4"
           animate={{ x: [0, -350 * ratings.length] }}
           transition={{ ease: "linear", duration: ratings.length * 6, repeat: Infinity }}
        >
          {items.map((rating, idx) => (
             <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0 p-5 sm:p-6 rounded-3xl bg-secondary/20 backdrop-blur-md border border-primary/10 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="size-10 sm:size-12 border border-primary/20">
                      <AvatarImage src={rating.avatar_url || ""} />
                      <AvatarFallback className="font-bold text-lg bg-primary/20 text-primary">
                        {rating.user_name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-foreground truncate">{rating.user_name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className={`size-3.5 ${i <= rating.rating ? "fill-current" : "fill-transparent text-muted-foreground opacity-30"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {rating.comment && (
                    <p className="text-sm text-foreground/80 leading-relaxed italic line-clamp-4 font-medium">
                      "{rating.comment}"
                    </p>
                  )}
                </div>
             </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
