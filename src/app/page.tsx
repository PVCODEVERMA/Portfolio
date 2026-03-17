"use client";

import { HackathonCard } from "@/components/hackathon-card";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useLoading } from "@/hooks/use-loading";
import { CertificationCard } from "@/components/certification-card";
import { SkillsDrawer } from "@/components/skills-drawer";
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
  X
} from "lucide-react";

export default function Page() {
  const [isSkillsDrawerOpen, setIsSkillsDrawerOpen] = React.useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = React.useState<string | null>(null);
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const [commentForm, setCommentForm] = React.useState({ name: "", email: "", comment: "" });

  const { startLoading } = useLoading();

  const openSkillsDrawer = (category: string) => {
    setActiveSkillCategory(category);
    setIsSkillsDrawerOpen(true);
  };

  const submitComment = async () => {
    const comment = commentForm.comment.trim();
    if (!comment) {
      toast.error("Write a comment first.");
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
    } catch {
      toast.error("Could not submit comment. Try again.");
    }
  };

  const followOn = async (platform: string, handle?: string) => {
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, handle }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) throw new Error(data?.error || "Failed");

      toast.success(`Thanks! Follow recorded for ${platform}.`);
    } catch {
      toast.success(`Open ${platform} to follow.`);
    }
  };

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-4 sm:pt-10 md:pt-12 pb-8 overflow-hidden">
        <div className="mx-auto w-full max-w-4xl space-y-8 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4"
          >

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-400 to-blue-600 rounded-full blur-md opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <Avatar className="size-28 sm:size-36 md:size-40 border-4 border-background shadow-2xl relative z-10">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="text-4xl">{DATA.initials}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground leading-[1.1]">
                  {DATA.name.split(" ")[0]} <span className="text-primary italic">{DATA.name.split(" ")[1] ?? ""}</span>
                </h1>
                <CheckCircle2 className="size-6 sm:size-8 text-primary fill-primary/10" />
              </div>
              <p className="text-base sm:text-xl font-bold text-muted-foreground italic max-w-[600px] mx-auto">
                {(DATA as any).role} — {(DATA as any).subtitle}
              </p>
            </div>

            <div className="max-w-[700px] text-sm sm:text-base text-foreground/90 dark:text-white font-bold leading-relaxed px-4 drop-shadow-sm">
              {DATA.description}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 cursor-pointer">
                <Link 
                  href="/resuma/resuma_pv.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    startLoading(1500);
                    toast.success("Resume downloading...");
                  }}
                >
                  Hire Me <Download className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full px-6 font-bold">
                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full px-6 font-bold"
                onClick={() => {
                  const x = (DATA.contact.social as any)?.X;
                  followOn("X", x?.label || x?.handle || "@pv_code421");
                  if (x?.url) window.open(x.url, "_blank");
                }}
              >
                Follow
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-6 font-bold"
                onClick={() => setIsCommentOpen(true)}
              >
                Comment
              </Button>
            </div>

            {/* Quick Contact Section */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="hidden sm:flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6 border-t border-primary/10 mt-8 w-full max-w-2xl mx-auto px-4"
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

            {/* Social Links Section */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="hidden sm:flex items-center justify-center gap-4 pt-4"
            >
                {Object.entries(DATA.contact.social).map(([name, social]) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={name}
                      href={social.url}
                      target="_blank"
                      className={cn(
                        "p-2.5 rounded-xl transition-all hover:scale-110",
                        name === "LinkedIn" && "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20",
                        name === "GitHub" && "bg-slate-500/10 text-slate-400 hover:bg-slate-500/20",
                        // X needs theme-aware contrast (white on dark, dark on light).
                        name === "X" && "bg-foreground/10 text-foreground hover:bg-foreground/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
                        name === "Youtube" && "bg-red-600/10 text-red-600 hover:bg-red-600/20",
                        !["LinkedIn", "GitHub", "X", "Youtube"].includes(name) && "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                      title={name}
                    >
                      <Icon className="size-5" />
                    </Link>
                  );
                })}
                {/* Manual Instagram as it's in community but not in contact.social sometimes, though here we use what's in contact.social */}
                {(DATA as any).community?.filter((c: any) => c.platform === "Instagram").map((insta: any) => (
                  <Link
                    key="Instagram"
                    href={insta.link}
                    target="_blank"
                    className="p-2.5 rounded-xl bg-pink-600/10 text-pink-600 hover:bg-pink-600/20 transition-all hover:scale-110"
                    title="Instagram"
                  >
                    <Users className="size-5" />
                  </Link>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

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
              className="relative w-full max-w-lg rounded-3xl border border-primary/20 bg-background p-6 shadow-2xl"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black tracking-tight">Leave a comment</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">
                    Share feedback or say hi. This will be saved to Supabase.
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

              <div className="mt-5 grid gap-3">
                <input
                  className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary/60"
                  placeholder="Your name (optional)"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm((s) => ({ ...s, name: e.target.value }))}
                />
                <input
                  className="w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary/60"
                  placeholder="Email (optional)"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm((s) => ({ ...s, email: e.target.value }))}
                />
                <textarea
                  className="min-h-[120px] w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm font-medium outline-none focus:border-primary/60"
                  placeholder="Write your comment..."
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm((s) => ({ ...s, comment: e.target.value }))}
                />
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
      <section id="about" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
        <div className="space-y-12 max-w-4xl lg:max-w-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
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
                      <h3 className="text-base sm:text-lg font-black">{item.title}</h3>
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
      {/* 3. Stats / Achievements */}
      <section id="stats" className="scroll-mt-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
          {DATA.stats?.map((stat, idx) => {
            const Icon = {
              Briefcase: Briefcase,
              Users: Users,
              Cpu: Cpu,
            }[stat.icon as string] || Trophy;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-secondary/15 backdrop-blur-md border border-primary/10 hover:border-primary/30 transition-all text-center space-y-2 group shadow-xl"
              >
                <div className="mx-auto size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-foreground">
                    {stat.label.split(" ").slice(0, 1).join(" ")}
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {stat.label.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3.5 Freelance Services */}
      <section id="services" className="scroll-mt-16 px-4">
        <div className="space-y-10 max-w-[1400px] mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black">Freelance <span className="text-primary italic">Services</span></h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium">Helping businesses scale with modern tech and AI.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Full Stack Web Development", icon: Layout, desc: "Building scalable, production-ready applications from scratch." },
              { title: "AI Integration", icon: Sparkles, desc: "Injecting LLM power and agentic workflows into your business." },
              { title: "Website SEO Optimization", icon: ArrowUpRight, desc: "Technical SEO and performance tuning to rank your site higher." },
              { title: "Business Websites", icon: Briefcase, desc: "Premium portfolio and business landing pages that convert." },
            ].map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-primary/10 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all flex flex-col gap-3 shadow-lg"
              >
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <service.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-extrabold text-lg">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section id="projects" className="scroll-mt-20 px-4">
        <div className="space-y-10 w-full py-8">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter">
               Creative & <span className="text-primary italic">Web Apps</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium">
              Robust full-stack applications built with modern frameworks and performance in mind.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto">
            {DATA.projects.map((project, id) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Projects */}
      <section id="ai-projects" className="scroll-mt-20 px-4">
        <div className="space-y-10 w-full py-8">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="size-3" /> AI Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter">
               Intelligent <span className="text-primary italic">Systems</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium">
              Exploring the frontiers of RAG, Agentic workflows, and LLM orchestration.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto">
            {(DATA as any).aiProjects?.map((project: any, id: number) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Work Experience */}
      <section id="work" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-primary/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-black">Work Experience</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-[10px] sm:text-xs">
              1.5+ Years Exp.
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

      {/* 6.5 Education (Integrated) */}
      <section id="education" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto">
        <div className="space-y-8">
          <h2 className="text-xl sm:text-2xl font-black">Education</h2>
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

      {/* 7. Skills Section */}
      <section id="skills" className="scroll-mt-24 px-4">
        <div className="space-y-12 py-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
             <h2 className="text-2xl sm:text-4xl font-black tracking-tighter">
               Technical <span className="text-primary italic">Arsenal</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base font-medium">
              A comprehensive toolkit of {Object.values(DATA.skills).reduce((acc: number, curr: any) => acc + (curr.list?.length || 0), 0)} expert skills across modern engineering domains.
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
                      <h3 className="font-bold text-lg">{category}</h3>
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

      {/* 8. GitHub Activity */}
      <section id="github" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
        <div className="p-8 rounded-3xl bg-secondary/20 backdrop-blur-md border border-primary/10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
              <Github className="size-6 text-primary" />
              GitHub Activity
            </h2>
            <Link href={`https://github.com/${DATA.githubActivity.username}`} target="_blank" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              @{DATA.githubActivity.username} <ArrowUpRight className="size-3" />
            </Link>
          </div>
          
          {/* Mock Heatmap Grid */}
          <div className="hide-scrollbar overflow-x-auto pb-2">
            <div className="flex gap-1">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 shrink-0">
                  {Array.from({ length: 7 }).map((_, j) => {
                    const opacity = Math.random();
                    return (
                      <div 
                        key={j} 
                        className="size-2 sm:size-3 rounded-sm bg-primary" 
                        style={{ opacity: opacity < 0.3 ? 0.1 : opacity }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-primary/5 pt-6">
            {DATA.githubActivity.stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <p className="text-lg sm:text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Blog / Articles */}
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
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Certifications */}
      <section id="certifications" className="scroll-mt-24 px-4">
        <div className="space-y-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-6">
            <div className="space-y-1">
               <h2 className="text-2xl sm:text-3xl font-black">Certifications</h2>
               <p className="text-sm text-muted-foreground font-medium italic">Industry recognized credentials & skill validations.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1.5 rounded-full bg-secondary/20">
              <CheckCircle2 className="size-3 text-green-500 fill-green-500/10" />
              <span>{(DATA.certifications as readonly any[])?.filter((c) => c.status === "completed")?.length || 0} Done</span>
              <span className="mx-1 opacity-20">|</span>
              <Flame className="size-3 text-orange-500 animate-pulse" />
              <span>{(DATA.certifications as readonly any[])?.filter((c) => c.status === "ongoing")?.length || 0} High-Speed Learning</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DATA.certifications?.map((cert, id) => (
              <CertificationCard key={cert.title} cert={cert as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Community / Content Creator */}
      <section id="community" className="scroll-mt-16 px-4 max-w-[1400px] mx-auto w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
              <Users className="size-6 text-primary" />
              Community & Content
            </h2>
            <p className="text-sm text-muted-foreground font-medium italic">Building in public and helping the next generation of engineers.</p>
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
                  <h3 className="font-extrabold text-lg">{item.platform}</h3>
                  <p className="text-xs font-bold text-muted-foreground">{item.handle}</p>
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed pt-1">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Contact Section */}
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
            <p className="mx-auto max-w-[600px] text-muted-foreground text-base sm:text-lg font-medium leading-relaxed">
              Whether you have a question or just want to say hi, my inbox is always open. 
              Let&apos;s architect the future together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
               <Button asChild size="lg" className="rounded-full px-8 font-black shadow-xl shadow-primary/20 h-14">
                  <a href={`mailto:${DATA.contact.email}`}>
                    Email Me <Send className="ml-2 size-5" />
                  </a>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-black h-14 border-primary/20 hover:bg-primary/5">
                  <a href={DATA.contact.social.X.url} target="_blank" rel="noopener noreferrer">
                    DM on X (Twitter)
                  </a>
               </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
