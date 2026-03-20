"use client";

import { motion } from "framer-motion";
import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 text-center"
        >
           <Link href="/" className="group">
              <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground hover:text-primary transition-all">
                 <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                 Back to Home
              </Button>
           </Link>
           <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground">
              Tech <span className="text-primary italic">Stack</span>
           </h1>
           <p className="max-w-2xl text-muted-foreground font-medium text-sm sm:text-base italic">
              A high-level architectural overview of the technologies and tools I use to build scalable applications.
           </p>
        </motion.div>

        {/* Diagram Display Area */}
        <section className="scroll-mt-20">
           <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              className="relative w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden bg-secondary/5 border border-primary/10 shadow-2xl flex items-center justify-center p-8 sm:p-16 group"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
              <img 
                 src="/TechnologiesUsed/tech_stack_diagram.svg" 
                 alt="Tech Stack Diagram" 
                 className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-[1.02] drop-shadow-[0_0_30px_rgba(249,112,21,0.15)]"
              />
           </motion.div>
        </section>

        {/* Footer Info */}
        <div className="py-12 border-t border-primary/10 text-center">
           <p className="text-[10px] font-black text-muted-foreground/40 tracking-[0.5em] uppercase flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-primary/10" /> Full Stack Ecosystem • 2026 • @PVCODEVERMA <span className="w-12 h-px bg-primary/10" />
           </p>
        </div>

      </div>
    </main>
  );
}
