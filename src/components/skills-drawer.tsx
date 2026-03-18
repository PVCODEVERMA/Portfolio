"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Cpu,
  Layout,
  Server,
  Cloud,
  Database,
  Wrench,
  TrendingUp,
  Clock,
  Briefcase,
  ChevronRight,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Skill {
  name: string;
  level: "Advanced" | "Medium" | "Easy";
  years: string;
  projects: string;
  trend: string;
  progress: number;
}

interface CategoryInfo {
  icon: string;
  description: string;
  list: Skill[];
}

interface SkillsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: string;
  skillsData: Record<string, CategoryInfo>;
}

const LEVEL_CONFIG = {
  Advanced: {
    icon: <TrendingUp className="size-3 text-red-500" />,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    label: "Advanced - Professional/Production Level"
  },
  Medium: {
    icon: <TrendingUp className="size-3 text-orange-500" />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    label: "Medium - Intermediate/Feature Level"
  },
  Easy: {
    icon: <TrendingUp className="size-3 text-green-500" />,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    label: "Easy - Beginner/Foundational Level"
  }
};

const CATEGORY_ICONS: Record<string, any> = {
  "AI / ML": Cpu,
  "Frontend": Layout,
  "Backend & Architecture": Server,
  "DevOps & Security": Cloud,
  "Databases": Database,
  "Testing & Tools": Wrench,
  "Soft Skills": Users
};

export function SkillsDrawer({ isOpen, onClose, initialCategory, skillsData }: SkillsDrawerProps) {
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);

  React.useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, initialCategory]);

  const activeInfo = skillsData[activeCategory];
  const CategoryIcon = CATEGORY_ICONS[activeCategory] || Cpu;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full lg:w-[60%] bg-background border-l border-border/50 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b lg:border-b-0 border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <CategoryIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Technical Skills
                  </h2>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none lg:hidden">
                    {activeCategory}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              >
                <X className="size-6 text-muted-foreground" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="px-6 py-4 border-b border-border/50 overflow-x-auto scrollbar-hide flex gap-2 bg-secondary/20">
              {Object.keys(skillsData).map((cat) => {
                const Icon = CATEGORY_ICONS[cat] || Cpu;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 active:scale-95",
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-background border border-border/50 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Icon className="size-4" />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <CategoryIcon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black flex items-center gap-2">
                      {activeCategory}
                      <span className="text-sm font-black text-foreground/70">{activeInfo?.list.length}</span>
                    </h3>
                    <p className="text-sm text-foreground font-bold">{activeInfo?.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {activeInfo?.list.map((skill, idx) => {
                  const config = LEVEL_CONFIG[skill.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.Easy;
                  const displayName = (skill.name || "").replace(/\s*\(.*?\)\s*/g, "").trim();

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-2.5 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all group overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className={cn("p-1 rounded-lg bg-primary/10 shrink-0")}>
                            <CategoryIcon className={cn("size-3 text-primary")} />
                          </div>
                          <h4 className="font-bold text-[10px] text-foreground group-hover:text-primary transition-colors truncate">
                            {displayName}
                          </h4>
                        </div>
                        <div className="shrink-0">{config.icon}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-1">
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold border shrink-0 cursor-help", config.bgColor, config.color, config.borderColor)}>
                                {skill.level === "Advanced" ? "Adv" : skill.level === "Medium" ? "Med" : "Beg"}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-background/95 backdrop-blur-md border-primary/20 p-2 shadow-2xl z-[110]">
                              <p className="text-[10px] font-black text-foreground">{config.label}</p>
                            </TooltipContent>
                          </Tooltip>

                          <div className="text-[8px] text-foreground font-black italic opacity-80 truncate">
                            {skill.years}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.progress}%` }}
                            className={cn("h-full rounded-full", skill.level === "Advanced" ? "bg-red-500" : skill.level === "Medium" ? "bg-orange-500" : "bg-green-500")}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex items-center gap-0.5 text-[8px] font-black text-foreground opacity-80">
                            <Briefcase className="size-2" />
                            {(skill.projects || "").split(" ")[0]}
                          </div>
                          <div className={cn("flex items-center gap-0.5 text-[8px] font-bold", skill.trend === "High" ? "text-red-500" : "text-primary")}>
                            {skill.trend}
                            <ChevronRight className="size-2" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
