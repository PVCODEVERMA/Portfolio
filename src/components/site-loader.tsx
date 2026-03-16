"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Briefcase, Users, Cpu, FileText } from "lucide-react";
import { useLoading } from "@/hooks/use-loading";

export function SiteLoader() {
  const { isActive } = useLoading();
  const [progress, setProgress] = useState(0);
  const [showInitially, setShowInitially] = useState(true);

  // Initial load effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 15);
    
    const timeout = setTimeout(() => {
      setShowInitially(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  // Reset progress when global loading starts
  useEffect(() => {
    if (isActive) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 2; // Slightly faster for click-triggered
        });
      }, 10);
      return () => clearInterval(timer);
    }
  }, [isActive]);

  const isVisible = showInitially || isActive;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/30 backdrop-blur-3xl"
        >
          {/* Main Loader Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-6 w-full max-w-sm px-6"
          >
            {/* Avatar with Animated Blue Ring */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600">
                <Avatar className="size-24 border-4 border-background shadow-2xl relative z-10">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                  <AvatarFallback className="text-2xl">{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-foreground">
                  {DATA.name}
                </h1>
                <CheckCircle2 className="size-5 text-blue-500 fill-blue-500/10" />
              </div>
              <p className="text-xs font-bold text-muted-foreground line-clamp-1 italic px-4">
                {DATA.role} @ {DATA.work[0]?.company} | {DATA.subtitle}
              </p>
            </div>

            {/* Progress Bar Section */}
            <div className="w-full space-y-3 pt-4">
              <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden relative border border-primary/5">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Bottom Stats Section */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-8 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-t border-primary/5 w-full mt-4">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Briefcase className="size-3.5 text-blue-500" />
                <span>1.5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <FileText className="size-3.5 text-blue-500" />
                <span>25+ Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Cpu className="size-3.5 text-blue-500" />
                <span>AI Builder</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
