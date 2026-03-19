"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client";
import toast from "react-hot-toast";

export function RatingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [session, setSession] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleSubmit = async () => {
    if (!session?.user) return;
    if (rating === 0) return toast.error("Please select a rating.");

    setIsSubmitting(true);
    try {
      const payload = {
        user_id: session.user.id,
        user_email: session.user.email,
        user_name: session.user.user_metadata?.full_name || session.user.email,
        avatar_url: session.user.user_metadata?.avatar_url || "",
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

            {!session ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                 <div className="p-4 rounded-full bg-primary/10">
                    <LogIn className="size-8 text-primary" />
                 </div>
                 <p className="text-center text-sm font-medium opacity-80 max-w-[250px]">
                    Please sign in with Google to leave a verified review and rating.
                 </p>
                 <Button onClick={handleGoogleLogin} size="lg" className="rounded-2xl w-full sm:w-auto font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform">
                   <svg className="size-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                   </svg>
                   Continue with Google
                 </Button>
              </div>
            ) : (
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
                 
                 <div className="text-center pt-2">
                    <button onClick={() => supabase.auth.signOut()} className="text-[10px] text-muted-foreground hover:text-red-500 hover:underline uppercase tracking-widest font-black transition-colors">
                       Sign out from {session.user.email}
                    </button>
                 </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
