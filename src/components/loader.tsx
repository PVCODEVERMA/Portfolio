"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/data/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, Users, Cpu, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Briefcase,
  Users,
  Cpu,
};

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closestInteractable = target.closest("a, button");
      
      if (!closestInteractable || isLoading) return;
      
      setIsLoading(true);
      setProgress(0);
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        } else {
          setProgress(currentProgress);
        }
      }, 40);
    };

    document.addEventListener("click", handleInteraction);
    return () => document.removeEventListener("click", handleInteraction);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
        >
          {/* Avatar with Progress Ring */}
          <div className="relative mb-8">
            <svg className="size-40 sm:size-48 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-primary/10 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-primary fill-none"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(progress * 2.82)} 1000` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Avatar className="size-full border-4 border-background shadow-2xl">
                <AvatarImage src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center space-y-2 mb-8 px-6">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{DATA.name}</h2>
              <CheckCircle2 className="size-6 text-blue-500 fill-blue-500/20" />
            </div>
            <p className="text-muted-foreground font-medium">
              {(DATA as any).role} | {(DATA as any).subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 space-y-3 mb-12 px-6">
            <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
            <div className="text-center text-sm font-bold text-muted-foreground tracking-widest uppercase">
              {Math.floor(progress)}%
            </div>
          </div>

          {/* Bottom Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 px-6 mt-auto pb-12 opacity-80">
            {(DATA as any).stats?.map((stat: any) => {
              const Icon = ICON_MAP[stat.icon];
              return (
                <div key={stat.label} className="flex items-center gap-2 text-sm font-semibold">
                  {Icon && <Icon className="size-4 text-primary" />}
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
