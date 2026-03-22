"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, LogIn, Mail, Lock, User, Github, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase-client";
import toast from "react-hot-toast";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    const client = getSupabaseClient();
    if (!client) return toast.error("Supabase is not configured.");
    await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getSupabaseClient();
    if (!client) return toast.error("Supabase is not configured.");

    setIsSubmitting(true);
    try {
      if (mode === "register") {
        const { error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        toast.success("Registration successful! Please check your email for verification.");
      } else {
        // Special check for Admin Key from .env.local via process.env
        const isAdmin = email.toLowerCase() === "pankaj912978@gmail.com" && password === process.env.NEXT_PUBLIC_ADMIN_KEY;
        
        const { error } = await client.auth.signInWithPassword({
          email,
          password, 
        });
        if (error) throw error;
        toast.success("Welcome back!");
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6"
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div
             className="relative w-full max-w-[400px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-primary/20 bg-background p-6 sm:p-8 shadow-2xl"
             initial={{ y: 30, scale: 0.95, opacity: 0 }}
             animate={{ y: 0, scale: 1, opacity: 1 }}
             exit={{ y: 20, scale: 0.95, opacity: 0 }}
             onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </button>

            {/* Background Grain Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('/images/noise.png')` }} />

            <div className="text-center mb-8 relative">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-foreground">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground font-medium">
                {mode === "login" ? "Continue your journey with us" : "Join the PV CODE community"}
              </p>
            </div>

            <div className="space-y-4 relative">
              <Button 
                type="button"
                onClick={handleGoogleLogin} 
                variant="outline"
                className="w-full h-12 rounded-2xl border-primary/20 hover:bg-primary/5 font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="size-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-muted-foreground"><span className="bg-background px-3">or</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "register" && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input 
                      type="text" required placeholder="Full Name" value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/60 bg-secondary/20 text-sm outline-none focus:border-primary/60 transition-all font-bold"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input 
                    type="email" required placeholder="Email Address" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/60 bg-secondary/20 text-sm outline-none focus:border-primary/60 transition-all font-bold"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input 
                    type="password" required placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/60 bg-secondary/20 text-sm outline-none focus:border-primary/60 transition-all font-bold"
                  />
                </div>

                <Button 
                  type="submit" disabled={isSubmitting}
                  className="w-full rounded-2xl h-12 font-black text-base shadow-xl shadow-primary/20 active:scale-95 transition-all mt-2"
                >
                  {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : (mode === "login" ? "Sign In" : "Register")}
                </Button>
              </form>
            </div>

            <p className="mt-8 text-center text-[11px] font-bold text-muted-foreground">
              {mode === "login" ? "New here?" : "Joined already?"}{" "}
              <button 
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-primary hover:underline underline-offset-4"
              >
                {mode === "login" ? "Create an account" : "Log in now"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
