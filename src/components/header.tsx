"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  Folder, 
  Mail,
  Moon,
  Sun,
  Award,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#work", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Projects", href: "#projects", icon: Folder },
  { name: "Certificates", href: "#certifications", icon: Award },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeCertIdx, setActiveCertIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === "#certifications") {
      e.preventDefault();
      setIsDrawerOpen(true);
    }
  };

  const handleNextCert = React.useCallback(() => {
    if (activeCertIdx !== null) {
      setActiveCertIdx((activeCertIdx + 1) % DATA.certifications.length);
    }
  }, [activeCertIdx]);

  const handlePrevCert = React.useCallback(() => {
    if (activeCertIdx !== null) {
      setActiveCertIdx((activeCertIdx - 1 + DATA.certifications.length) % DATA.certifications.length);
    }
  }, [activeCertIdx]);

  // Handle ESC key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeCertIdx !== null) setActiveCertIdx(null);
        else if (isDrawerOpen) setIsDrawerOpen(false);
      }
      if (activeCertIdx !== null) {
        if (e.key === "ArrowRight") handleNextCert();
        if (e.key === "ArrowLeft") handlePrevCert();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertIdx, isDrawerOpen, handleNextCert, handlePrevCert]);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pt-4 px-4 overflow-hidden pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-2 rounded-2xl bg-background/70 backdrop-blur-xl border border-border/50 shadow-2xl pointer-events-auto max-w-full overflow-x-auto hide-scrollbar"
      >
        {/* Left: Theme/Profile Section */}
        <div className="flex items-center gap-2 pr-2 border-r border-border/50">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {mounted && (theme === "dark" ? (
              <Sun className="size-4 text-primary" />
            ) : (
              <Moon className="size-4 text-primary" />
            ))}
            {!mounted && <Moon className="size-4 text-primary" />}
          </button>
          <Avatar className="size-8 border-2 border-primary/20">
            <AvatarImage src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 active:scale-95",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                )}
              >
                <Icon className="size-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Certificate Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-border/50 shadow-2xl z-[101] pointer-events-auto flex flex-col pt-6"
            >
              <div className="px-6 flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Certificates</h2>
                  <p className="text-sm text-muted-foreground">My achievements & certifications</p>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <CloseIcon className="size-6 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-20 scrollbar-hide">
                <div className="space-y-8">
                  {DATA.certifications.map((cert: any, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setActiveCertIdx(idx)}
                      className="group cursor-pointer flex flex-col gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg leading-tight">{cert.title}</h3>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {cert.date}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-primary">{cert.issuer}</p>
                      </div>
                      
                      {cert.image && (
                        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border/50 group-hover:scale-[1.02] transition-transform duration-300">
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold text-sm bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20">Click to Preview</span>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {cert.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                  Close Certificates
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {activeCertIdx !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertIdx(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] pointer-events-auto flex items-center justify-center p-4"
            >
              {/* Controls */}
              <div className="absolute top-6 left-6 text-white/70 font-bold text-lg">
                <span className="text-white">{activeCertIdx + 1}</span> / {DATA.certifications.length}
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveCertIdx(null); }}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              >
                <CloseIcon className="size-6" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); handlePrevCert(); }}
                className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 group active:scale-90"
              >
                <motion.div whileHover={{ x: -2 }}><ChevronLeft className="size-8" /></motion.div>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); handleNextCert(); }}
                className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 group active:scale-90"
              >
                <motion.div whileHover={{ x: 2 }}><ChevronRight className="size-8" /></motion.div>
              </button>

              {/* Main Image */}
              <motion.div
                key={activeCertIdx}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {(DATA.certifications[activeCertIdx] as any)?.image && (
                  <div className="w-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-blue-500/20">
                    <img 
                      src={(DATA.certifications[activeCertIdx] as any).image} 
                      alt={(DATA.certifications[activeCertIdx] as any).title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="text-center space-y-2 max-w-2xl">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {(DATA.certifications[activeCertIdx] as any).title}
                  </h2>
                  <p className="text-blue-400 font-bold text-lg">
                    {(DATA.certifications[activeCertIdx] as any).issuer}
                  </p>
                  <p className="text-white/60 text-sm italic">
                    Click outside or press ESC to close • Use arrows to navigate
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
