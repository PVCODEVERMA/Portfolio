"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { createPortal } from "react-dom";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Folder,
  Mail,
  Phone,
  Award,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useLoading } from "@/hooks/use-loading";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Experience", href: "/#work", icon: Briefcase },
  { name: "Education", href: "/#education", icon: GraduationCap },
  { name: "Projects", href: "/#projects", icon: Folder },
  { name: "Certificates", href: "/#certifications", icon: Award },
];


export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [activeCertIdx, setActiveCertIdx] = React.useState<number | null>(null);
  const [activeHash, setActiveHash] = React.useState("/");
  const { startLoading } = useLoading();

  const isHidden = pathname.startsWith("/systems/") || (pathname === "/projects" && searchParams.get("file"));

  React.useEffect(() => {
    setMounted(true);

    if (isHidden) return;

    const handleScroll = () => {
      // Find the current section
      const sections = NAV_ITEMS
        .map(item => item.href)
        .filter(href => href.includes("#"));

      let current = "/";
      for (const section of sections) {
        const id = section.split("#")[1];
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              current = section;
            }
          }
        }
      }
      setActiveHash(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHidden]);

  // Lock body scroll when certifications drawer or lightbox is open
  React.useEffect(() => {
    if (isDrawerOpen || activeCertIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, activeCertIdx]);

  const closeCertificates = React.useCallback(() => {
    setIsDrawerOpen(false);
    setActiveCertIdx(null);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    startLoading(1000);
    if (href.includes("#")) {
      setActiveHash(href);
    }
    if (href === "/#certifications") {
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

  // Sync drawer/lightbox state to body class (to hide chatbot)
  React.useEffect(() => {
    if (isDrawerOpen || activeCertIdx !== null) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [isDrawerOpen, activeCertIdx]);

  if (isHidden) return null;

  const certifications = DATA.certifications as readonly { status?: string }[];
  const totalCerts = certifications.length;
  const completedCerts = certifications.filter((c) => c.status === "completed").length;
  const ongoingCerts = certifications.filter((c) => c.status === "ongoing").length;

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pt-0 sm:pt-4 px-0 sm:px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full sm:w-auto flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2 px-0 sm:px-2 py-1.5 sm:p-2 rounded-none sm:rounded-2xl bg-background/60 backdrop-blur-2xl border-b sm:border border-primary/20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] pointer-events-auto max-w-full overflow-x-auto hide-scrollbar"
      >


        {/* Center: Navigation Links (Text labels hidden on small screens) */}
        <div className="flex items-center gap-1 sm:gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeHash === item.href;

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative flex items-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 active:scale-95 group",
                      isActive
                        ? "text-primary-foreground scale-105"
                        : "text-foreground font-black hover:text-primary opacity-80"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={cn(
                      "size-4 sm:size-4 shrink-0 transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-125"
                    )} />
                    <span className="hidden sm:inline-block">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10} className="sm:hidden pointer-events-none">
                  <p className="text-[10px] font-bold">{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Right: Theme toggle only */}
        <div className="pl-0.5 sm:pl-2 border-l border-border/50 flex items-center">
          <ModeToggle />
        </div>

      </motion.nav>

      {mounted
        ? createPortal(
          <AnimatePresence>
            {isDrawerOpen && (
              <motion.div
                key="drawer-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] pointer-events-auto"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeCertificates}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute top-0 right-0 h-full w-full sm:w-[500px] lg:w-[650px] bg-background border-l border-border/50 shadow-2xl flex flex-col pt-6 z-[101]"
                >
                  <div className="px-6 flex items-start justify-between gap-4 mb-7">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-black tracking-tight text-foreground">
                          Certificates
                        </h2>
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {totalCerts} total
                        </span>
                        {completedCerts > 0 ? (
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {completedCerts} completed
                          </span>
                        ) : null}
                        {ongoingCerts > 0 ? (
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                            {ongoingCerts} ongoing
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground font-bold">
                        My achievements & certifications
                      </p>
                    </div>
                    <button
                      onClick={closeCertificates}
                      className="shrink-0 p-2 rounded-xl hover:bg-primary/10 transition-colors active:scale-90 relative z-50 overflow-visible"
                      aria-label="Close certificates"
                      type="button"
                    >
                      <CloseIcon className="size-6 text-foreground/70 hover:text-foreground" />
                    </button>
                  </div>

                  <div
                    className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide"
                    data-lenis-prevent
                  >
                    <div className="space-y-6">
                      {DATA.certifications.map((cert: any, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          onClick={() => setActiveCertIdx(idx)}
                          className="group cursor-pointer flex flex-col gap-4 p-4 rounded-2xl bg-secondary/25 border border-border/50 hover:border-primary/50 hover:bg-secondary/30 transition-all"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") setActiveCertIdx(idx);
                          }}
                        >
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-bold text-lg leading-tight text-foreground">
                                {cert.title}
                              </h3>
                              <span className="text-[10px] font-black px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                                {cert.date}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-primary">
                              {cert.issuer}
                            </p>
                          </div>

                          {cert.image && (
                            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border/50 group-hover:scale-[1.02] transition-transform duration-300">
                              <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm bg-primary/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-primary/20">
                                  Click to Preview
                                </span>
                              </div>
                            </div>
                          )}

                          <p className="text-xs text-foreground font-bold line-clamp-2 leading-relaxed opacity-90">
                            {cert.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Drawer Footer */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
                    <button
                      onClick={closeCertificates}
                      className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all relative z-50"
                      type="button"
                    >
                      Close Certificates
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
        : null}

      {/* Certificate Lightbox – also via portal so it escapes header stacking context */}
      {mounted
        ? createPortal(
          <AnimatePresence>
            {activeCertIdx !== null && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[300] pointer-events-auto flex items-center justify-center p-4 sm:p-6"
                onClick={() => setActiveCertIdx(null)}
              >
                {/* Controls */}
                <div className="absolute top-6 left-6 text-white/50 font-bold text-sm sm:text-lg z-[310]">
                  <span className="text-white">{activeCertIdx + 1}</span> / {DATA.certifications.length}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setActiveCertIdx(null); }}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 z-[320] active:scale-90"
                >
                  <CloseIcon className="size-5 sm:size-7 text-white" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevCert(); }}
                  className="absolute left-2 sm:left-10 p-2 sm:p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all border border-white/10 group active:scale-90 z-[320]"
                >
                  <ChevronLeft className="size-6 sm:size-10" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNextCert(); }}
                  className="absolute right-2 sm:right-10 p-2 sm:p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all border border-white/10 group active:scale-90 z-[320]"
                >
                  <ChevronRight className="size-6 sm:size-10" />
                </button>

                {/* Main Image */}
                {DATA.certifications[activeCertIdx] && (
                  <motion.div
                    key={activeCertIdx}
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) handlePrevCert();
                      else if (info.offset.x < -80) handleNextCert();
                    }}
                    className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center gap-6 cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(DATA.certifications[activeCertIdx] as any).image && (
                      <div className="w-full max-w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                        <img
                          src={(DATA.certifications[activeCertIdx] as any).image}
                          alt={(DATA.certifications[activeCertIdx] as any).title}
                          className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain pointer-events-none select-none"
                        />
                      </div>
                    )}
                    <div className="text-center space-y-2 px-6 max-w-3xl">
                      <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        {(DATA.certifications[activeCertIdx] as any).title}
                      </h2>
                      <p className="text-primary font-bold text-base sm:text-xl italic">
                        {(DATA.certifications[activeCertIdx] as any).issuer}
                      </p>
                      <p className="text-white font-black text-[10px] sm:text-xs uppercase tracking-widest pt-2 opacity-60">
                        Swipe or use arrows to navigate • ESC to close
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
        : null}
    </header>
  );
}
