"use client";

import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { motion, AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { Sparkles, ArrowLeft, X, Copy, Check, Info, Layout, Send, Bot, User, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileParam = searchParams.get("file");
  const [selectedProject, setSelectedProject] = React.useState<null | any>(null);
  const [copied, setCopied] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(true);
  const [messages, setMessages] = React.useState<{role: string, content: string}[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  // Handle Deep Linking from Home Page
  React.useEffect(() => {
    if (fileParam) {
      const allProjects = [...DATA.projects, ...(DATA as any).aiProjects];
      const project = allProjects.find(p => p.title.toLowerCase().includes(fileParam.toLowerCase()));
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [fileParam]);

  const handleCopy = (file: string) => {
    const url = `${window.location.origin}/projects/${file}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Blueprint Link Copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const userMsg = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
        const aiMsg = { 
            role: "assistant", 
            content: `Project Analysis for ${selectedProject?.title}. 📊\n\nThis build demonstrates a high-performance stack utilizing ${selectedProject?.technologies?.join(", ")}. The architecture ensures seamless integration between the frontend and distributed backend services. \n\nHow would you like to explore this technical implementation further?` 
        };
        setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-20 px-4 transition-all overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 text-center"
        >
           <Link href="/" className="group">
               <Button 
                variant="ghost" 
                className="rounded-full gap-3 text-muted-foreground hover:bg-[#F97C39] hover:text-white dark:hover:bg-[#F97C39] dark:hover:text-white transition-all font-black text-[11px] uppercase tracking-widest px-6 py-2"
               >
                  <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
               </Button>
           </Link>
           <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none">
              TECHNICAL <span className="text-primary italic">LABORATORY</span>
           </h1>
           <p className="max-w-2xl text-muted-foreground font-medium text-sm sm:text-base italic leading-relaxed">
              A deep-dive into high-performance engineering, intelligent architectures, and scalable digital systems.
           </p>
        </motion.div>

        {/* 1. Creative & Web Apps */}
        <section id="projects" className="scroll-mt-20">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground uppercase">
                 Full-Stack <span className="text-primary italic">Systems</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {DATA.projects.map((project, id) => (
                <div key={project.title} onClick={() => setSelectedProject(project)} className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] h-full">
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
              ))}
            </div>
          </div>
        </section>

        {/* 2. AI Projects */}
        <section id="ai-projects" className="scroll-mt-20 border-t border-primary/10 pt-20">
          <div className="space-y-12 w-full pb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest leading-none">
                <Sparkles className="size-3" /> AI Engineering Stage 
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tighter text-foreground uppercase">
                 AI & <span className="text-primary italic">ORCHESTRATION</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {(DATA as any).aiProjects?.map((project: any, id: number) => (
                <div key={project.title} onClick={() => setSelectedProject(project)} className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] h-full">
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
              ))}
            </div>
          </div>
        </section>



      </div>

      {/* Advanced Full Screen Project Laboratory Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-black/60 backdrop-blur-3xl overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle, #f97015 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Top Command Bar */}
            <div className="relative z-30 flex items-center justify-between px-10 py-6 bg-black/60 backdrop-blur-3xl border-b border-primary/10 shadow-2xl">
              <div className="flex items-center gap-6">
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
                 >
                   <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
                   </div>
                   <div className="hidden sm:block text-left">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] block text-muted-foreground/50">BUILD_ANALYSIS</span>
                      <span className="text-lg font-black tracking-tight text-foreground">{selectedProject.title}</span>
                   </div>
                 </button>
              </div>
              
              <div className="flex items-center gap-5">

                 <Link href={selectedProject.href || "#"} target="_blank">
                    <Button className="rounded-2xl gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[11px] uppercase tracking-widest px-8 py-6 shadow-xl shadow-primary/20">
                        Launch System <Maximize2 className="size-4" />
                    </Button>
                 </Link>
                 <div className="w-px h-10 bg-white/10" />
                 <button onClick={() => setSelectedProject(null)} className="p-4 rounded-full bg-white/5 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                   <X className="size-6" />
                 </button>
              </div>
            </div>

            {/* Laboratory Stage */}
            <div className={`flex-1 relative z-20 flex items-center justify-center p-12 sm:p-24 transition-all duration-500 ${isChatOpen ? 'pr-[450px]' : ''}`}>
               <motion.div
                 initial={{ scale: 0.85, opacity: 0, y: 40 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 className="w-full h-full relative flex flex-col items-center justify-center gap-8"
               >
                     <div className="w-full h-full rounded-[3rem] bg-secondary/10 border border-primary/10 overflow-hidden relative group">
                          {selectedProject.video ? (
                             <video src={selectedProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center">
                                 <span className="text-primary/20 text-8xl font-black italic">NO_PREVIEW</span>
                             </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-12 left-12 right-12 space-y-4">
                             <h2 className="text-4xl font-black text-white leading-none uppercase tracking-tighter">System Overview</h2>
                             <p className="text-white/60 font-medium max-w-2xl leading-relaxed italic">{selectedProject.description}</p>
                          </div>
                     </div>

                  <div className="px-6 py-2.5 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-md flex items-center gap-3 text-muted-foreground/70">
                     <Info className="size-4 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-[0.25em]">Precision Engineering Showcase • Built with {selectedProject.technologies[0]}</span>
                  </div>
               </motion.div>
            </div>

            {/* Status Footer */}
            <div className="relative z-30 px-10 py-5 bg-black/40 border-t border-primary/10 flex items-center justify-between">
               <div className="flex items-center gap-8 text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.5em]">
                  <span>BUILD: STABLE</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LOAD_TIME: 1.2s</span>
               </div>
               <div className="flex items-center gap-4">
                  <button 
                     onClick={() => setIsChatOpen(!isChatOpen)}
                     className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest ${isChatOpen ? 'bg-primary text-primary-foreground border-primary' : 'bg-white/5 text-primary border-primary/20 hover:bg-primary/10'}`}
                  >
                     <Bot className="size-4" />
                     {isChatOpen ? "Close Assistant" : "Ask Technical Assistant"}
                  </button>
               </div>
               <div className="flex items-center gap-4 text-primary opacity-60 font-black text-[9px] uppercase tracking-widest">
                  [ PROJ_ACTIVE ]
               </div>
            </div>

            {/* Chat Sidebar */}
            <AnimatePresence>
               {isChatOpen && (
                  <motion.div
                     initial={{ x: 450 }}
                     animate={{ x: 0 }}
                     exit={{ x: 450 }}
                     className="absolute top-[88px] bottom-[68px] right-0 w-[450px] z-40 bg-[#0a0f1e]/90 backdrop-blur-3xl border-l border-primary/20 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                  >
                     <div className="p-6 border-b border-primary/10 bg-primary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Bot className="size-5 text-primary" />
                           <div>
                              <h3 className="text-sm font-black text-foreground uppercase tracking-wider text-xl leading-none">AI Assistant</h3>
                           </div>
                        </div>
                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                     </div>
                     <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="text-center py-20 px-10 space-y-4 opacity-40">
                                <Sparkles className="size-10 text-primary mx-auto" />
                                <p className="text-xs font-black uppercase tracking-widest">System Analysis Ready. <br/>What would you like to know about this build?</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                           <div key={i} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                              <p className="text-[9px] font-black uppercase tracking-widest opacity-30">{msg.role === 'user' ? 'Scientist' : 'Core System'}</p>
                              <div className={`max-w-[90%] p-4 rounded-3xl text-xs font-bold ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white/5 text-white/80 border border-white/5'}`}>
                                 {msg.content}
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="p-6 border-t border-primary/10 bg-black/20">
                        <form onSubmit={handleSendMessage} className="relative">
                           <input 
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Inquire technical details..."
                              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4.5 pl-6 pr-16 text-xs font-bold focus:outline-none focus:border-primary/50 transition-all text-white"
                           />
                           <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 size-10 flex items-center justify-center rounded-xl bg-primary text-black">
                              <Send className="size-4" />
                           </button>
                        </form>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div>Loading Lab...</div>}>
            <ProjectsContent />
        </Suspense>
    );
}
