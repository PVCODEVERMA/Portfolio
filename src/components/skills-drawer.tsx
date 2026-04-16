"use client";

import React from "react";
import { createPortal } from "react-dom";
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
  Briefcase,
  ChevronRight,
  Users,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory);
      document.body.style.overflow = "hidden";
      document.body.classList.add("skills-drawer-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("skills-drawer-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("skills-drawer-open");
    };
  }, [isOpen, initialCategory]);

  // ESC key to close
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const activeInfo = skillsData[activeCategory];
  const CategoryIcon = CATEGORY_ICONS[activeCategory] || Cpu;
  const categories = Object.keys(skillsData);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="skills-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] pointer-events-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[520px] lg:w-[680px] bg-background border-l border-border/50 shadow-2xl flex flex-col z-[201]"
          >
            {/* ── Header ── */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4 border-b border-border/50">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">
                    Technical Skills
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {categories.length} categories
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-bold">
                  Expert-level toolkit across modern engineering domains
                </p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 p-2 rounded-xl hover:bg-primary/10 transition-colors active:scale-90"
                aria-label="Close skills"
                type="button"
              >
                <X className="size-6 text-foreground/70 hover:text-foreground" />
              </button>
            </div>

            {/* ── Category Tabs (horizontal scroll) ── */}
            <div className="px-4 py-3 border-b border-border/50 bg-secondary/10 overflow-x-auto scrollbar-hide flex gap-2 shrink-0">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat] || Cpu;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-background border border-border/50 hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Icon className="size-3.5" />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* ── Content (scrollable) ── */}
            <div 
              className="flex-1 overflow-y-auto pb-24 scrollbar-hide"
              data-lenis-prevent
            >
              {/* Category Header */}
              <div className="px-6 py-5 border-b border-border/30 bg-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <CategoryIcon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      {activeCategory}
                      <span className="text-sm font-bold text-foreground/50 bg-secondary/40 px-2 py-0.5 rounded-full">
                        {activeInfo?.list.length} skills
                      </span>
                    </h3>
                    <p className="text-xs font-bold text-muted-foreground">{activeInfo?.description}</p>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeInfo?.list.map((skill, idx) => {
                  const config = LEVEL_CONFIG[skill.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.Easy;
                  const displayName = (skill.name || "").replace(/\s*\(.*?\)\s*/g, "").trim();

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="p-3 rounded-2xl bg-secondary/25 border border-border/50 hover:border-primary/40 hover:bg-secondary/40 transition-all group"
                    >
                      {/* Skill name */}
                      <div className="flex items-start justify-between gap-1 mb-2.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="p-1 rounded-lg bg-primary/10 shrink-0">
                            <CategoryIcon className="size-3 text-primary" />
                          </div>
                          <h4 className="font-bold text-[11px] text-foreground group-hover:text-primary transition-colors leading-tight">
                            {displayName}
                          </h4>
                        </div>
                        <div className="shrink-0">{config.icon}</div>
                      </div>

                      {/* Level badge + years */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <div className={cn(
                              "flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border shrink-0 cursor-help",
                              config.bgColor, config.color, config.borderColor
                            )}>
                              {skill.level === "Advanced" ? "Adv" : skill.level === "Medium" ? "Med" : "Beg"}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-background/95 backdrop-blur-md border-primary/20 p-2 shadow-2xl z-[210]">
                            <p className="text-[10px] font-black text-foreground">{config.label}</p>
                          </TooltipContent>
                        </Tooltip>
                        <div className="text-[9px] text-foreground font-black italic opacity-60 truncate">
                          {skill.years}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          transition={{ delay: idx * 0.04 + 0.2, duration: 0.5 }}
                          className={cn(
                            "h-full rounded-full",
                            skill.level === "Advanced" ? "bg-red-500" :
                            skill.level === "Medium" ? "bg-orange-500" : "bg-green-500"
                          )}
                        />
                      </div>

                      {/* Projects + Trend */}
                      <div className="flex items-center justify-between pt-1.5">
                        <div className="flex items-center gap-0.5 text-[9px] font-black text-foreground opacity-60">
                          <Briefcase className="size-2.5" />
                          {(skill.projects || "").split(" ")[0]}
                        </div>
                        <div className={cn(
                          "flex items-center gap-0.5 text-[9px] font-bold",
                          skill.trend === "High" ? "text-red-500" : "text-primary"
                        )}>
                          {skill.trend}
                          <ChevronRight className="size-2.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
                type="button"
              >
                Close Skills
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
