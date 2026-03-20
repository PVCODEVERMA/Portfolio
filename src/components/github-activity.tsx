"use client";

import React, { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

export function GithubActivity() {
  const [year, setYear] = useState(new Date().getFullYear());
  const years = [2023, 2024, 2025, 2026];

  const theme = {
    light: ["#161b22", "#f97015"],
    dark: ["#161b22", "#f97015"],
  };

  return (
    <section id="github" className="py-20 scroll-mt-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mb-12"
        >
          <div className="inline-block rounded-full bg-primary/10 text-primary px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
             GitHub Contribution Graph
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-center">
            My Open Source <span className="text-primary italic">Journey</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-secondary/20 rounded-2xl border border-primary/10 backdrop-blur-md">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all duration-300 ${
                  year === y 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105" 
                    : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-6 sm:p-10 rounded-[3rem] bg-secondary/5 border border-primary/10 backdrop-blur-xl group overflow-hidden"
        >
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col items-center overflow-x-auto hide-scrollbar">
            <div className="min-w-[800px] lg:min-w-fit flex justify-center py-4">
              <GitHubCalendar 
                username={DATA.githubActivity.username}
                year={year}
                theme={theme}
                fontSize={12}
                blockSize={13}
                blockMargin={5}
                colorScheme="dark"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary/10 pt-8 relative z-10 w-full">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10">
                   <Icons.github className="size-6 text-primary" />
                </div>
                <div>
                   <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">GitHub Handle</p>
                   <a 
                     href={`https://github.com/${DATA.githubActivity.username}`} 
                     target="_blank" 
                     className="text-lg font-black text-foreground hover:text-primary transition-colors"
                   >
                     @{DATA.githubActivity.username}
                   </a>
                </div>
             </div>
             
             <div className="flex gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {DATA.githubActivity.stats.map((stat) => (
                   <div key={stat.label} className="flex flex-col items-center sm:items-end">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{stat.label}</p>
                      <p className="text-xl font-black text-primary">{stat.value}</p>
                   </div>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
