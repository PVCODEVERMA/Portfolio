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
            className="flex flex-col items-center space-y-5 w-full max-w-sm px-6"
          >
            {/* Avatar with Light Blue Glowing Ring */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative p-1 rounded-full border-2 border-blue-400/50 shadow-[0_0_30px_rgba(96,165,250,0.4)]">
                <Avatar className="size-28 border-[6px] border-background shadow-2xl relative z-10 transition-transform hover:scale-105 duration-500">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                  <AvatarFallback className="text-3xl font-black bg-blue-500/10 text-blue-500">{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* User Info (Matching the Reference Image Styling) */}
            <div className="text-center space-y-1.5 pt-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-foreground">
                  {DATA.name}
                </h1>
                <svg
                  viewBox="0 0 24 24"
                  aria-label="Verified account"
                  className="size-5 sm:size-7 fill-[#00a2ff] shrink-0"
                >
                  <g>
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.08s-2.47-1.49-3.89-1.29c-.73-1.1-1.97-1.79-3.36-1.79s-2.63.69-3.36 1.79c-1.42-.2-2.88.18-3.89 1.29s-1.27 2.69-.81 4.08C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.08s2.47 1.49 3.89 1.29c.73 1.1 1.97 1.79 3.36 1.79s2.63-.69 3.36-1.79c1.42.2 2.88-.18 3.89-1.29s1.27-2.69.81-4.08c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.35-6.2 6.78z"></path>
                  </g>
                </svg>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground leading-relaxed px-4 opacity-80 uppercase tracking-wider">
                {DATA.role} | {DATA.subtitle}
              </p>
            </div>

            {/* Progress Bar Section (White/Minimalist) */}
            <div className="w-full space-y-2 pt-4 px-10">
              <div className="h-[3px] w-full bg-foreground/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="text-center">
                <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Bottom Stats Section (Directly from DATA) */}
            <div className="flex flex-row items-center justify-center gap-4 pt-6 w-full text-[10px] sm:text-[11px] font-bold text-muted-foreground/80 tracking-tight">
              <div className="flex items-center gap-1.5">
                <Briefcase className="size-3.5 text-foreground/60" />
                <span className="whitespace-nowrap">1.5+ Years Exp.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-foreground/60" />
                <span className="whitespace-nowrap">25+ Projects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="size-3.5 text-foreground/60" />
                <span className="whitespace-nowrap">AI Builder</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
