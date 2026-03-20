"use client";

import { motion } from "framer-motion";
import React from "react";
import { Maximize2, Layout } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { DATA } from "@/data/resume";

export default function SystemsPage() {
  const architectures = DATA.architectures;
  const router = useRouter();

  return (
    <main className="min-h-screen bg-transparent relative overflow-x-hidden selection:bg-primary/30">
      
      {/* Dynamic Background Watermarks */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <h1 className="absolute top-[10%] left-[-5%] text-[15vw] font-black italic text-primary/5 uppercase tracking-tighter leading-none -rotate-12 whitespace-nowrap">
           ARCHITECTURES
        </h1>
        <h1 className="absolute bottom-[10%] right-[-5%] text-[15vw] font-black italic text-primary/5 uppercase tracking-tighter leading-none rotate-12 whitespace-nowrap">
           BLUEPRINTS
        </h1>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-28 pb-32 space-y-24">
        
        {/* Superior Header Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-8 text-center"
        >
           <div className="space-y-4">
              <motion.div 
                 initial={{ opacity: 0, y: 10 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: 0.2 }}
                 className="flex items-center justify-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.4em]"
              >
                 <span className="w-8 h-px bg-primary" /> 
                 Industrial Systems Visualization
                 <span className="w-8 h-px bg-primary" />
              </motion.div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-tight">
                 THE <span className="text-primary italic font-[900]">BLUEPRINT</span> LAB
              </h1>
           </div>

           <p className="max-w-xl text-muted-foreground font-medium text-sm sm:text-lg italic leading-relaxed opacity-90">
              Explore a curated laboratory of production-ready system designs. High-fidelity architectural maps for scalable digital products.
           </p>
        </motion.div>

        {/* Gallery Grid with Studio Card Experience */}
        <section className="scroll-mt-20">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
              {architectures.map((arch, idx) => (
                 <motion.div 
                    key={arch.file}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.04, duration: 0.5 }}
                    onClick={() => router.push(`/systems/${arch.file}`)}
                    className="group relative flex flex-col p-2.5 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-primary/40 transition-all duration-500 hover:bg-white/[0.05] shadow-2xl cursor-pointer"
                 >
                    {/* Floating Expander Tool */}
                    <div className="absolute top-6 right-6 z-30 flex gap-2">
                       <div className="p-2.5 rounded-2xl bg-black/60 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 border border-white/10 shadow-xl">
                          <Maximize2 className="size-4" />
                       </div>
                    </div>

                    {/* Image Stage */}
                    <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0a0f1e] border border-white/5 flex items-center justify-center p-8 relative">
                       {/* Background Texture for Image Stage */}
                       <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
                            style={{ backgroundImage: `radial-gradient(circle, #f97015 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                       
                       <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       
                       <img 
                          src={`/SystemsArchitected/${arch.file}`} 
                          alt={arch.name} 
                          className="max-w-full max-h-full object-contain group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 relative z-10 drop-shadow-[0_0_30px_rgba(249,112,21,0.2)]" 
                       />

                       {/* Hover Overlay Title */}
                       <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                          <div className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest shadow-xl">
                             View Details
                          </div>
                       </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col gap-1 p-5 pt-2">
                       <div className="flex items-center justify-between gap-4">
                          <h3 className="font-[900] text-foreground/90 text-xl group-hover:text-primary transition-colors tracking-tight leading-tight">{arch.name}</h3>
                          <span className="shrink-0 px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[8px] font-black text-primary/60 uppercase tracking-widest">
                             {arch.tag}
                          </span>
                       </div>
                       <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">Architecture System • 2026</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </section>

        {/* Studio Footer */}
        <div className="py-20 border-t border-primary/5 text-center flex flex-col items-center gap-6">
           <div className="p-4 rounded-3xl bg-primary/5 border border-primary/10">
              <Layout className="size-8 text-primary opacity-40 hover:opacity-100 transition-opacity" />
           </div>
           <p className="text-[10px] font-black text-muted-foreground/30 tracking-[0.8em] uppercase flex items-center justify-center gap-8 w-full">
              <span className="flex-1 h-px bg-primary/5" /> 
              Engineering Portfolio • Studio Edition • @PVCODEVERMA 
              <span className="flex-1 h-px bg-primary/5" />
           </p>
        </div>
      </div>
    </main>
  );
}
