"use client";

import { HackathonCard } from "@/components/hackathon-card";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import AnimeReveal from "@/components/anime-reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import dynamic from "next/dynamic";
import Link from "next/link";
import Markdown from "react-markdown";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useLoading } from "@/hooks/use-loading";
import { CertificationCard } from "@/components/certification-card";
import { SkillsDrawer } from "@/components/skills-drawer";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import DomeGallery from "@/components/DomeGallery";
const GithubActivity = dynamic(() => import("@/components/github-activity").then(mod => mod.GithubActivity), {
  ssr: false,
  loading: () => (
    <div className="py-20 flex justify-center">
      <div className="w-full max-w-4xl h-80 bg-secondary/5 rounded-[3rem] animate-pulse" />
    </div>
  )
});
import { MessageCircle } from "lucide-react";
import {
  ExternalLink,
  Download,
  CheckCircle2,
  Briefcase,
  Users,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Layout,
  Server,
  Cloud,
  Database,
  Wrench,
  Calendar,
  Flame,
  Github,
  BookOpen,
  Send,
  Trophy,
  History,
  Rocket,
  Mail,
  Phone,
  User,
  MessageSquare,
  X,
  Maximize2
} from "lucide-react";

export default function Page() {
  const [isSkillsDrawerOpen, setIsSkillsDrawerOpen] = React.useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = React.useState<string | null>(null);
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const [showFullGallery, setShowFullGallery] = React.useState(false);
  const [galleryZoom, setGalleryZoom] = React.useState(0.9);
  const [commentForm, setCommentForm] = React.useState({ name: "", email: "", comment: "" });

  const { startLoading } = useLoading();
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(249, 112, 21, 0.12), transparent 80%)`;

  const openSkillsDrawer = (category: string) => {
    setActiveSkillCategory(category);
    setIsSkillsDrawerOpen(true);
  };

  const submitComment = async () => {
    const name = commentForm.name.trim();
    const email = commentForm.email.trim();
    const comment = commentForm.comment.trim();

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!comment) {
      toast.error("Please write your comment.");
      return;
    }

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "/",
          name: commentForm.name,
          email: commentForm.email,
          comment,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed");

      toast.success("Comment submitted. Thank you!");
      setIsCommentOpen(false);
      setCommentForm({ name: "", email: "", comment: "" });
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err.message || "Could not submit comment. Try again.");
    }
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 md:space-y-24">
      <AnimatePresence mode="wait">
        {!showFullGallery ? (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-16 md:space-y-24"
          >
            <AnimeReveal delay={100}>
            {/* 1. Hero Section */}
            <section
              id="hero"
              className="relative pt-4 sm:pt-10 md:pt-12 pb-8 overflow-hidden group/hero"
              onMouseMove={handleMouseMove}
            >
              <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover/hero:opacity-100 z-0"
                style={{ background: spotlightBackground }}
              />
              <div className="mx-auto w-full max-w-4xl flex flex-col items-start gap-10 px-4 relative z-10 text-left">
                {/* LEFT: Text & Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 flex flex-col items-start space-y-2.5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
                >
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-start gap-2">
                      <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground leading-[1.1] pb-1 text-left">
                        {DATA.name.split(" ")[0]}{" "}
                        <motion.span
                          className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#f97015] to-purple-500"
                          style={{ backgroundSize: "200% auto" }}
                          animate={{ backgroundPosition: ["0% center", "200% center"] }}
                          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                        >
                          {DATA.name.split(" ")[1] ?? ""}
                        </motion.span>
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
                    <p className="text-base sm:text-xl font-bold text-muted-foreground italic max-w-[600px]">
                      {(DATA as any).role} — {(DATA as any).subtitle}
                    </p>
                  </div>

                  <motion.div
                    className="max-w-[700px] w-full text-[13px] sm:text-base text-foreground font-bold leading-relaxed px-0 sm:px-0 drop-shadow-sm flex flex-wrap justify-start gap-x-1 sm:gap-x-1.5 gap-y-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.03 } },
                      hidden: {}
                    }}
                  >
                    {DATA.description.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        variants={{
                          hidden: { filter: "blur(10px)", opacity: 0, y: 4 },
                          visible: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                      hidden: {}
                    }}
                    className="flex flex-row items-center justify-start gap-1.5 sm:gap-3 pt-0 sm:pt-4 w-full px-0 sm:px-0"
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button asChild size="default" className="rounded-full w-full px-2 sm:px-8 font-black shadow-xl shadow-primary/20 cursor-pointer h-10 sm:h-12 text-[10px] sm:text-base">
                        <Link
                          href="https://drive.google.com/file/d/1Cbbx05lspTunaePTrem1YZq6MZ_rHZAJ/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            startLoading(1500);
                            toast.success("Opening Resume...");
                          }}
                          className="flex items-center justify-center gap-1"
                        >
                          Hire <span className="hidden xs:inline">Me</span> <Download className="size-3.5 sm:size-5" />
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        size="default"
                        variant="outline"
                        className="rounded-full w-full px-2 sm:px-8 font-black h-10 sm:h-12 text-[10px] sm:text-base border-primary/20 hover:bg-primary/5 flex items-center justify-center gap-1"
                        onClick={() => setIsCommentOpen(true)}
                      >
                        <MessageCircle className="text-[#f97015] size-3.5 sm:size-5" /> Ask <span className="hidden xs:inline">Me</span>
                      </Button>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        size="default"
                        className="rounded-full w-full px-2 sm:px-8 font-black shadow-xl shadow-orange-500/20 h-10 sm:h-12 text-[10px] sm:text-base bg-gradient-to-r from-orange-500 to-primary hover:scale-105 transition-transform flex items-center justify-center gap-1"
                        onClick={() => setShowFullGallery(true)}
                      >
                        <Layout className="size-3.5 sm:size-5" /> Gallery
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="hidden sm:flex flex-wrap items-center justify-start gap-x-6 gap-y-3 pt-6 border-t border-primary/10 mt-8 w-full max-w-2xl px-0"
                  >
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      className="flex items-center gap-2 group transition-all duration-300"
                    >
                      <div className="p-2 rounded-xl bg-red-500/10 text-red-500 group-hover:scale-110 group-hover:bg-red-500/20 transition-all">
                        <Mail className="size-4" />
                      </div>
                      <span className="text-sm font-black text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                        {DATA.contact.email}
                      </span>
                    </Link>

                    <div className="hidden sm:block w-[1px] h-4 bg-primary/20" />

                    <Link
                      href={`tel:${DATA.contact.tel.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 group transition-all duration-300"
                    >
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                        <Phone className="size-4" />
                      </div>
                      <span className="text-sm font-black text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                        {DATA.contact.tel}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="hidden sm:flex items-center justify-start flex-wrap gap-1 pt-4"
                  >
                    {Object.entries(DATA.contact.social).map(([name, social]) => {
                      const Icon = (social as any).icon;
                      const cls =
                        name === "LinkedIn" ? "si-linkedin" :
                          name === "GitHub" ? "si-github" :
                            name === "X" ? "si-x" :
                              name === "Youtube" ? "si-youtube" : "";
                      return (
                        <a key={name} href={social.url} target="_blank" rel="noopener noreferrer" className={`social-icon-btn ${cls}`}>
                          <span className="social-icon-tip">{name}</span>
                          <Icon className="size-5" />
                        </a>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </section>
            </AnimeReveal>

            {/* Comment Modal */}
            <AnimatePresence>
              {isCommentOpen && (
                <motion.div
                  className="fixed inset-0 z-[300] flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCommentOpen(false)}
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <motion.div
                    className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl border border-primary/20 bg-background p-6 shadow-2xl hide-scrollbar"
                    initial={{ y: 20, scale: 0.98, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: 20, scale: 0.98, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black tracking-tight">Let’s connect 🚀</h3>
                        <p className="mt-1 text-sm text-muted-foreground font-medium">
                          Drop your message and I’ll get back to you soon.
                        </p>
                      </div>
                      <button
                        className="rounded-xl p-2 hover:bg-primary/10 transition-colors"
                        onClick={() => setIsCommentOpen(false)}
                        type="button"
                        aria-label="Close"
                      >
                        <X className="size-6 text-foreground/70" />
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          className="w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 py-3 text-sm font-medium outline-none focus:border-primary/60 transition-all"
                          placeholder="Enter Your name"
                          value={commentForm.name}
                          onChange={(e) => setCommentForm((s) => ({ ...s, name: e.target.value }))}
                        />
                      </div>

                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          className="w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 py-3 text-sm font-medium outline-none focus:border-primary/60 transition-all"
                          placeholder="Enter Your Email"
                          value={commentForm.email}
                          onChange={(e) => setCommentForm((s) => ({ ...s, email: e.target.value }))}
                        />
                      </div>

                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-4 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <textarea
                          className="min-h-[120px] w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 py-3 text-sm font-medium outline-none focus:border-primary/60 transition-all resize-none"
                          placeholder="Write your comment..."
                          value={commentForm.comment}
                          onChange={(e) => setCommentForm((s) => ({ ...s, comment: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsCommentOpen(false)} className="rounded-2xl">
                        Cancel
                      </Button>
                      <Button onClick={submitComment} className="rounded-2xl font-bold">
                        Submit
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. About Section with Timeline */}
            <AnimeReveal delay={200}>
            <section id="about" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
              <div className="space-y-12 max-w-4xl lg:max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-foreground">
                    <History className="size-6 text-primary" />
                    About & Journey
                  </h2>
                  <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-base text-foreground dark:prose-invert leading-relaxed font-black">
                    {DATA.summary}
                  </Markdown>
                </motion.div>

                <div className="relative pl-8 space-y-10 before:absolute before:inset-0 before:left-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-orange-400 before:to-transparent">
                  {(DATA as any).timeline?.map((item: any, idx: number) => {
                    const Icon = {
                      CheckCircle2: CheckCircle2,
                      Briefcase: Briefcase,
                      Sparkles: Sparkles,
                    }[item.icon as string] || Rocket;

                    return (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative"
                      >
                        <div className="absolute -left-[37px] top-1 size-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                          <div className="size-1.5 rounded-full bg-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-primary px-2 py-0.5 rounded-md bg-primary/10">
                              {item.year}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-foreground">{item.title}</h3>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground font-bold opacity-80">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
            </AnimeReveal>


            {/* 10. Certifications */}
            <AnimeReveal delay={250}>
            <section id="certifications" className="scroll-mt-24 px-4">
              <div className="space-y-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground">Certifications</h2>
                    <p className="text-sm text-foreground/70 font-medium italic">Industry recognized credentials & skill validations.</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1.5 rounded-full bg-secondary/20">
                    <CheckCircle2 className="size-3 text-green-500 fill-green-500/10" />
                    <span>{(DATA.certifications as readonly any[])?.filter((c) => c.status === "completed")?.length || 0} Done</span>
                    <span className="mx-1 opacity-20">|</span>
                    <Flame className="size-3 text-orange-500 animate-pulse" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1400px] mx-auto w-full">
                  {DATA.certifications?.map((cert, id) => (
                    <CertificationCard key={cert.title} cert={cert as any} />
                  ))}
                </div>
              </div>
            </section>
            </AnimeReveal>

            {/* 7. Featured Projects Stage */}
            <AnimeReveal delay={300}>
            <section id="projects" className="scroll-mt-16 px-4">
              <div className="max-w-[1400px] mx-auto space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-primary/10 pb-10">
                  <div className="text-left space-y-2 flex-1">
                    <h2 className="text-3xl sm:text-5xl font-[900] tracking-tighter text-foreground uppercase leading-none">
                      Featured <span className="text-primary italic">Builds</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-black text-muted-foreground/60 uppercase tracking-[0.3em]">
                      Production-Ready Engineering Showcase
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(DATA.projects as readonly any[]).slice(0, 3).map((project, id) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: id * 0.1 }}
                      className="group h-full"
                    >
                      <div className="relative group hover:-translate-y-2 transition-transform duration-500 h-full">
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          dates={project.dates}
                          tags={project.technologies}
                          image={project.image}
                          video={project.video}
                          links={project.links}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center mt-12 pb-4">
                  <Link href="/projects">
                    <Button variant="outline" className="rounded-2xl gap-2 font-black text-[10px] uppercase tracking-widest bg-primary/5 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all shadow-xl px-12 py-7 h-auto">
                      View Full Archive <ArrowUpRight className="size-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
            </AnimeReveal>

            


            {/* 7.5 Work Experience */}
            <AnimeReveal delay={400}>
            <section id="work" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto">
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                  <h2 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">Work <span className="text-primary italic">History</span></h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-[10px] sm:text-xs">
                    1 year 3 months
                  </Badge>
                </div>
                <div className="space-y-4">
                  {DATA.work.map((work, id) => (
                    <ResumeCard
                      key={work.company}
                      logoUrl={work.logoUrl}
                      altText={work.company}
                      title={work.company}
                      subtitle={work.title}
                      href={work.href}
                      badges={work.badges}
                      period={`${work.start} - ${work.end ?? "Present"}`}
                      description={work.description}
                    />
                  ))}
                </div>
              </div>
            </section>
            </AnimeReveal>

            {/* 6.5 Education (Integrated) */}
            <AnimeReveal delay={450}>
            <section id="education" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto">
              <div className="space-y-8">
                <h2 className="text-xl sm:text-2xl font-black text-foreground">Education</h2>
                <div className="space-y-4">
                  {DATA.education.map((education, id) => (
                    <ResumeCard
                      key={education.school}
                      href={education.href}
                      logoUrl={education.logoUrl}
                      altText={education.school}
                      title={education.school}
                      subtitle={education.degree}
                      period={`${education.start} - ${education.end}`}
                    />
                  ))}
                </div>
              </div>
            </section>
            </AnimeReveal>

            {/* 7. Skills Section */}
            <AnimeReveal delay={350}>
            <section id="skills" className="scroll-mt-24 px-4">
              <div className="space-y-12 py-8">
                <div className="text-left space-y-4 max-w-3xl ml-0">
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground">
                    Technical <span className="text-primary italic">Arsenal</span>
                  </h2>
                  <p className="text-foreground/70 text-sm sm:text-base font-medium">
                   A comprehensive toolkit of expert skills across modern engineering domains.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1400px] mx-auto w-full">
                  {Object.entries(DATA.skills).map(([category, data]: [string, any], idx) => {
                    const Icon = {
                      "AI / ML": Cpu,
                      "Frontend": Layout,
                      "Backend & Architecture": Server,
                      "DevOps & Security": Cloud,
                      "Databases": Database,
                      "Testing & Tools": Wrench,
                      "Soft Skills": Users
                    }[category] || Cpu;

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => openSkillsDrawer(category)}
                        className="group relative p-6 rounded-3xl bg-secondary/20 backdrop-blur-md border border-primary/10 hover:border-primary/40 transition-all cursor-pointer active:scale-95 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                              <Icon className="size-5 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground">{category}</h3>
                          </div>
                          <ArrowUpRight className="size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {data.list.slice(0, 4).map((skill: any) => (
                            <Badge key={skill.name} variant="secondary" className="px-2 py-0 text-[10px] bg-background/50 border-white/5 uppercase">
                              {skill.name}
                            </Badge>
                          ))}
                          {data.list.length > 4 && (
                            <span className="text-[10px] font-black text-primary/60 px-2">+{data.list.length - 4} More</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {activeSkillCategory && (
                <SkillsDrawer
                  isOpen={isSkillsDrawerOpen}
                  onClose={() => setIsSkillsDrawerOpen(false)}
                  initialCategory={activeSkillCategory}
                  skillsData={DATA.skills as any}
                />
              )}
            </section>
            </AnimeReveal>

            {/* 9. Blog / Articles */}
            <AnimeReveal delay={500}>
            <section id="blog" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                  <BookOpen className="size-6 text-primary" />
                  Blog & Insights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DATA.blogPosts.map((post) => (
                    <Link key={post.title} href={post.url} className="group p-6 rounded-3xl bg-secondary/20 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all space-y-3 shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest px-2 py-0.5 rounded-md bg-primary/10 italic">
                          {post.publishedAt}
                        </span>
                        <ArrowUpRight className="size-4 text-foreground/40 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                      <p className="text-sm text-foreground/70 line-clamp-2">{post.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            </AnimeReveal>

            {/* 11. Community / Content Creator */}
            <AnimeReveal delay={550}>
            <section id="community" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                    <Users className="size-6 text-primary" />
                    Community & Content
                  </h2>
                  <p className="text-sm text-foreground/70 font-medium italic">Building in public and helping the next generation of engineers.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(DATA as any).community?.map((item: any) => (
                    <Link key={item.platform} href={item.link} target="_blank" className="group p-6 rounded-3xl bg-secondary/20 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all flex flex-col gap-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                          {item.platform === "Instagram" ? <Users className="size-6 text-primary" /> :
                            item.platform === "YouTube" ? <Icons.youtube className="size-6 text-primary" /> :
                              <Icons.x className="size-6 text-primary" />}
                        </div>
                        <span className="text-[10px] font-black text-primary px-2 py-0.5 rounded-full bg-primary/10">{item.followers}</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-lg text-foreground">{item.platform}</h3>
                        <p className="text-xs font-bold text-foreground/60">{item.handle}</p>
                        <p className="text-[10px] text-foreground/50 leading-relaxed pt-1">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            </AnimeReveal>

            {/* 12. Contact Section */}
            <AnimeReveal delay={600}>
            <section id="contact" className="scroll-mt-20 px-4">
              <div className="grid items-center justify-center gap-4 px-4 text-center w-full py-12 sm:py-20 bg-primary/5 rounded-[3rem] border border-primary/10 mx-auto max-w-[1400px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Send className="size-64 text-primary -rotate-12" />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="space-y-6 relative z-10"
                >
                  <div className="inline-block rounded-full bg-primary text-primary-foreground px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.3em]">
                    Get In Touch
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                    Ready to build <span className="text-primary italic">something insane?</span>
                  </h2>
                  <p className="mx-auto max-w-[600px] text-foreground/70 text-base sm:text-lg font-medium leading-relaxed">
                    Whether you have a question or just want to say hi, my inbox is always open.
                    Let&apos;s architect the future together.
                    <br />
                    <span className="text-xs sm:text-sm mt-2 block opacity-80">
                      Looking for freelancing services? Visit <a href="https://pvcode1u.ai" target="_blank" className="text-primary font-bold hover:underline">pvcode1u.ai</a>
                    </span>
                  </p>

                  {/* Testimonials integrated inside Contact Section as requested */}
                  <section id="testimonials" className="scroll-mt-16 overflow-hidden">
                    <TestimonialsCarousel />
                  </section>
                </motion.div>
              </div>
            </section>
            </AnimeReveal>
          </motion.div>
        ) : (
          <motion.div
            key="full-gallery"
            initial={{ opacity: 0, scale: 0.5, borderRadius: "100%" }}
            animate={{ opacity: 1, scale: 1, borderRadius: "0%" }}
            exit={{ opacity: 0, scale: 0.5, borderRadius: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[500] bg-background overflow-hidden flex flex-col"
          >
            {/* Gallery Header / Back Button */}
            <div className="absolute top-6 left-6 z-[600]">
              <Button
                onClick={() => setShowFullGallery(false)}
                variant="outline"
                className="rounded-full px-6 font-black bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary/10 group h-12"
              >
                <X className="mr-2 size-5 group-hover:rotate-90 transition-transform" />
                Back to Home
              </Button>
            </div>

            <div className="absolute top-6 right-6 z-[600] hidden md:block text-right">
              <h2 className="text-2xl font-black text-foreground drop-shadow-md">
                Interactive <span className="text-primary italic">Gallery</span>
              </h2>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Drag to explore • Scroll to zoom
              </p>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[600] flex flex-col items-center gap-4 w-[280px] sm:w-[400px] px-6 py-4 rounded-3xl bg-background/40 backdrop-blur-xl border border-primary/10 shadow-2xl">
              <div className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-widest text-primary/70">
                <span className="flex items-center gap-1.5"><Icons.x className="size-3" /> Minimum</span>
                <span className="flex items-center gap-1.5">Maximum <Icons.youtube className="size-3" /></span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-sm" />
                <input
                  type="range"
                  min="0.3"
                  max="1.5"
                  step="0.01"
                  value={galleryZoom}
                  onChange={(e) => setGalleryZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary relative z-10"
                  style={{
                    background: `linear-gradient(to right, #f97015 0%, #f97015 ${(galleryZoom - 0.3) / 1.2 * 100}%, rgba(249, 112, 21, 0.2) ${(galleryZoom - 0.3) / 1.2 * 100}%, rgba(249, 112, 21, 0.2) 100%)`
                  }}
                />
              </div>
              <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-tighter">
                Current Fit: <span className="text-primary font-black">{(galleryZoom * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Full Screen Gallery Component */}
            <div className="flex-1 w-full h-full relative flex items-center justify-center p-4 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,112,21,0.08)_0%,transparent_70%)] pointer-events-none" />

              {/* The Circular Gallery Box */}
              <motion.div
                className="relative w-full h-full max-w-[90vh] aspect-square rounded-full border-[10px] sm:border-[20px] border-secondary/20 shadow-[0_0_80px_rgba(249,112,21,0.15)] overflow-hidden bg-black/40 ring-1 ring-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
                <DomeGallery
                  images={[
                    { src: "/images/p1.jpeg", alt: "Photo 1" },
                    { src: "/images/p2.jpeg", alt: "Photo 2" },
                    { src: "/images/p3.jpg", alt: "Photo 3" },
                    { src: "/images/p4.jpg", alt: "Photo 4" },
                    { src: "/images/p5.jpg", alt: "Photo 5" },
                    { src: "/images/p6.jpg", alt: "Photo 6" },
                    { src: "/images/p7.jpg", alt: "Photo 7" },
                    { src: "/images/p8.jpg", alt: "Photo 8" },
                    { src: "/images/p9.jpg", alt: "Photo 9" },
                    { src: "/images/p10.jpg", alt: "Photo 10" },
                    { src: "/images/p11.jpg", alt: "Photo 11" },
                    { src: "/images/p12.jpg", alt: "Photo 12" },
                    { src: "/images/p13.jpg", alt: "Photo 13" },
                    { src: "/images/p14.jpg", alt: "Photo 14" },
                    { src: "/images/p15.jpg", alt: "Photo 15" },
                    { src: "/images/p16.jpg", alt: "Photo 16" },
                    { src: "/images/p17.jpg", alt: "Photo 17" },
                    { src: "/images/p18.jpeg", alt: "Photo 18" },
                  ]}
                  fit={galleryZoom}
                  minRadius={400}
                  maxVerticalRotationDeg={15}
                  segments={40}
                  dragDampening={1.2}
                  grayscale={false}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
