"use client";

import React, { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "./auth-modal";

export function RatingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user: sessionUser, signOut } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!sessionUser) {
      setIsAuthModalOpen(true);
      toast.error("Please login to submit your rating");
      return;
    }
    if (rating === 0) return toast.error("Please select a rating.");

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: sessionUser.id,
        user_email: sessionUser.email,
        user_name: sessionUser.user_metadata?.full_name || sessionUser.email,
        avatar_url: sessionUser.user_metadata?.avatar_url || "",
        rating,
        comment
      };
      
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      toast.success("Thank you for your rating!");
      onClose();
      setTimeout(() => window.location.reload(), 1500); 
    } catch(err: any) {
      toast.error(err.message || "Failed to submit rating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
           className="fixed inset-0 z-[400] flex items-center justify-center p-4"
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div
             className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-primary/20 bg-background p-6 shadow-2xl"
             initial={{ y: 30, scale: 0.95, opacity: 0 }}
             animate={{ y: 0, scale: 1, opacity: 1 }}
             exit={{ y: 20, scale: 0.95, opacity: 0 }}
             onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
               <div>
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" /> Rate My Work
                  </h3>
                  <p className="mt-1 text-sm text-foreground/70 font-medium">
                    Your feedback helps me improve and grow.
                  </p>
               </div>
               <button onClick={onClose} className="p-2 bg-secondary/50 hover:bg-secondary rounded-full transition-colors">
                  <X className="size-5" />
               </button>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="text-sm font-bold opacity-70">Tap a star to rate</p>
                  <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(i => (
                        <button 
                          key={i}
                          className="transition-transform hover:scale-110 active:scale-95"
                          onMouseEnter={() => setHoveredRating(i)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(i)}
                        >
                            <Star className={`size-10 sm:size-12 transition-colors ${i <= (hoveredRating || rating) ? "fill-yellow-500 text-yellow-500" : "fill-transparent text-muted-foreground/30"}`} />
                        </button>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold opacity-70">Share your experience (Optional)</p>
                  <textarea 
                    placeholder="What did you think?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full min-h-[100px] resize-none rounded-2xl border border-border/60 bg-secondary/30 p-4 text-sm outline-none focus:border-primary/60 transition-all font-medium"
                  />
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || rating === 0}
                  className="w-full rounded-2xl h-12 font-black text-base shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
                
                {sessionUser && (
                  <div className="text-center pt-2">
                    <button onClick={() => signOut()} className="text-[10px] text-muted-foreground hover:text-red-500 hover:underline uppercase tracking-widest font-black transition-colors">
                        Sign out from {sessionUser.email}
                    </button>
                  </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
    />
    </>
  );
}
