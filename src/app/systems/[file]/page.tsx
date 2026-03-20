"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { ArrowLeft, Maximize2, X, Copy, Check, Info, Layout, Send, Bot, User, Sparkles, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

import { DATA } from "@/data/resume";

function SystemDetailContent() {
  const params = useParams();
  const router = useRouter();
  const file = params.file as string;
  const architectures = DATA.architectures;

  const arch = architectures.find(a => a.file === file);

  const [copied, setCopied] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);
  const [messages, setMessages] = React.useState<{role: string, content: string}[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);

  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!arch) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-8 px-6 text-center">
        <div className="p-6 rounded-[2.5rem] bg-primary/5 border border-primary/10 ring-8 ring-primary/5">
           <Layout className="size-16 text-primary opacity-20" />
        </div>
        <div className="space-y-2">
           <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Blueprint Not Found</h1>
           <p className="text-muted-foreground/60 text-sm font-medium italic">The requested architectural system is not available in the laboratory.</p>
        </div>
        <Link href="/systems">
           <Button variant="outline" className="rounded-2xl gap-2 font-black text-[10px] uppercase tracking-widest px-10 py-6 border-primary/20 hover:bg-primary transition-all shadow-xl shadow-primary/10">
              <ArrowLeft className="size-4" /> Return to Gallery
           </Button>
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Blueprint Link Secured");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputValue;
    if (!query.trim()) return;

    const userMsg = { role: "user", content: query };
    setMessages(prev => [...prev, userMsg]);
    if (!customQuery) setInputValue("");
    setIsTyping(true);

    // Advanced search across system knowledge
    setTimeout(() => {
        let responseContent = "";
        const knowledge = DATA.systemKnowledge[arch.file as keyof typeof DATA.systemKnowledge];
        
        // 1. Search for specific Q&A matches in current system
        const localQA = knowledge?.qa.find(item => 
            query.toLowerCase().includes(item.q.toLowerCase()) || 
            item.q.toLowerCase().includes(query.toLowerCase())
        );

        if (localQA) {
            responseContent = `${localQA.a}\n\n**Key Insight:** ${localQA.insight}\n\n**Tech Stack:** ${knowledge.tags.join(", ")}`;
        } else {
            // 2. Fallback to general overview or search other systems
            responseContent = `Technical Analysis for ${arch.name} 🤖\n\n${knowledge?.overview || "This architectural pattern focuses on distributed reliability and high-speed data orchestration."}\n\n**Key Insight:** ${knowledge?.insight || "Decoupling services improves system resilience."}\n\n**Technologies:** ${knowledge?.tags.join(", ") || arch.tag}`;
        }

        const aiMsg = { 
            role: "assistant", 
            content: responseContent
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }, 800);
  };

  const topicPills = ["Architecture", "Scalability", "Security", "Cost Ops", "Performance"];

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <main className="min-h-screen flex flex-col bg-[#020617] selection:bg-primary/30 relative">
      {/* Overlay Engineering Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #f97015 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      
      {/* Dynamic Watermark Background */}
      <div className="fixed inset-0 z-10 pointer-events-none select-none overflow-hidden opacity-[0.03]">
         <h1 className="absolute top-[10%] left-[-5%] text-[15vw] font-black italic text-primary uppercase tracking-tighter leading-none -rotate-12 whitespace-nowrap">
            {arch.tag?.replace(" ", "_")}
         </h1>
         <h1 className="absolute bottom-[10%] right-[-5%] text-[15vw] font-black italic text-primary uppercase tracking-tighter leading-none rotate-12 whitespace-nowrap">
            STABLE_BUILD
         </h1>
      </div>

      {/* Top Command Bar */}
      <div className="sticky top-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-6 bg-black/60 backdrop-blur-3xl border-b border-primary/10 shadow-2xl">
        <div className="flex items-center gap-6">
           <Link href="/systems" className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
             <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/20 transition-all border border-white/10">
                <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
             </div>
             <div className="hidden sm:block text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block text-muted-foreground/50">Laboratory Archive</span>
                <span className="text-xl font-black tracking-tight text-foreground uppercase">{arch.name}</span>
             </div>
           </Link>
        </div>
        
        <div className="flex items-center gap-5">
           <Button 
             variant="outline" 
             onClick={handleCopy}
             className="hidden sm:flex rounded-2xl gap-3 bg-white/5 hover:bg-white/10 text-foreground font-black text-[10px] uppercase tracking-widest border border-white/10 px-8 py-6 shadow-xl active:scale-95 transition-all"
           >
             {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4 text-primary" />}
             {copied ? "Link Copied" : "Share Blueprint"}
           </Button>
           
           <div className="w-px h-10 bg-white/10 hidden sm:block" />

           <Link href="/systems">
             <button className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-90 transition-all shadow-xl shadow-primary/20">
               <X className="size-6" />
             </button>
           </Link>
        </div>
      </div>

      {/* Laboratory Presentation Stage */}
      <div className={`flex-1 relative z-20 flex flex-col items-center justify-center p-8 sm:p-24 transition-all duration-700 min-h-[80vh] overflow-hidden ${isChatOpen ? 'pr-0 lg:pr-[450px]' : ''}`}>
         {/* Zoom Controls Overlay */}
         <div className="absolute bottom-10 left-10 z-50 flex flex-col gap-3">
            <button 
               onClick={handleZoomIn}
               className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-2xl group"
               title="Zoom In"
            >
               <ZoomIn className="size-5 group-active:scale-90 transition-transform" />
            </button>
            <button 
               onClick={handleZoomOut}
               className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-2xl group"
               title="Zoom Out"
            >
               <ZoomOut className="size-5 group-active:scale-90 transition-transform" />
            </button>
            <button 
               onClick={handleResetZoom}
               className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-2xl group"
               title="Reset View"
            >
               <RotateCcw className="size-5 group-active:rotate-[-45deg] transition-transform" />
            </button>
         </div>

         <motion.div
           initial={{ scale: 0.9, opacity: 0, y: 30 }}
           animate={{ scale: zoom, opacity: 1, y: 0 }}
           transition={{ type: "spring", damping: 25, stiffness: 180 }}
           className={`w-full max-w-5xl aspect-[4/3] relative group/stage flex flex-col items-center justify-center p-4 sm:p-2`}
         >
            {/* Stage Title Watermark - Vertical Left */}
            <div className="absolute left-[-8%] top-1/2 -translate-y-1/2 z-0 font-black italic text-primary/5 text-[12vw] leading-none select-none uppercase tracking-tighter -rotate-90 origin-center whitespace-nowrap">
               SYSTEM_MAP
            </div>

            <img 
               src={`/SystemsArchitected/${arch.file}`} 
               alt={arch.name}
               className="max-w-full max-h-full object-contain drop-shadow-[0_0_80px_rgba(249,112,21,0.25)] select-none relative z-10 transition-shadow duration-500 group-hover/stage:drop-shadow-[0_0_100px_rgba(249,112,21,0.4)]"
            />
         </motion.div>
         
         {/* Technical Tooltip */}
         <div className="mt-8 px-6 py-2.5 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-md flex items-center gap-3 text-muted-foreground/70 relative z-30">
            <Info className="size-4 text-primary animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em]">
               Full Resolution Production Diagram • Studio Quality
            </span>
         </div>
      </div>

      {/* Industrial Data Footer */}
      <div className="sticky bottom-0 z-[100] px-6 sm:px-10 py-5 bg-black/60 backdrop-blur-2xl border-t border-primary/10 flex items-center justify-between shadow-2xl">
         <div className="flex items-center gap-4 sm:gap-8 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.6em] whitespace-nowrap">
            <span className="hidden md:inline">SCALE: 1:{(1/zoom).toFixed(1)}</span>
            <div className="size-1.5 rounded-full bg-primary animate-ping" />
            <span className="hidden sm:inline">RENDER_ENGINE: SVG_PRECISE</span>
         </div>
         
         <div className="flex items-center gap-4">
            <button 
               onClick={() => setIsChatOpen(!isChatOpen)}
               className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-widest ${isChatOpen ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(249,112,21,0.4)]' : 'bg-white/5 text-primary border-primary/20 hover:bg-primary/10'}`}
            >
               <Bot className="size-4" />
               {isChatOpen ? "Close Assistant" : "Ask Technical Assistant"}
            </button>
         </div>

         <div className="flex items-center gap-4 text-primary/60 font-black text-[9px] uppercase tracking-[0.4em] hidden sm:flex">
            [ ARCH_ACTIVE ]
         </div>
      </div>

      {/* AI Assistant Chat Sidebar */}
      <AnimatePresence>
         {isChatOpen && (
            <motion.div
               initial={{ x: 450 }}
               animate={{ x: 0 }}
               exit={{ x: 450 }}
               className="fixed top-[88px] bottom-[68px] right-0 w-full sm:w-[450px] z-[200] bg-[#0a0f1e]/95 backdrop-blur-3xl border-l border-primary/20 flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.6)]"
            >
                {/* Chat Header with Topic Pills */}
                <div className="p-4 border-b border-white/10 bg-black/40">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Bot className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">AI System Specialist</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-tighter">Knowledge Base Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Topic Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                        {topicPills.map(topic => (
                            <button 
                                key={topic}
                                onClick={() => handleSendMessage(undefined, `Tell me about the ${topic} of this system.`)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all whitespace-nowrap uppercase tracking-widest"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide no-scrollbar min-h-[300px]">
                    {messages.length === 0 && (
                        <div className="grid grid-cols-1 gap-2 mb-4">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 px-1">Suggested Inquiries</p>
                            {DATA.systemKnowledge[arch.file as keyof typeof DATA.systemKnowledge]?.qa.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(undefined, item.q)}
                                    className="text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                                >
                                    <p className="text-xs font-bold text-white/70 group-hover:text-primary transition-colors">{item.q}</p>
                                </button>
                            ))}
                        </div>
                    )}
                    
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1 ${msg.role === 'user' ? 'text-primary' : 'text-slate-500'}`}>
                                {msg.role === 'user' ? 'Scientist' : 'Blueprint_AI'}
                            </div>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium leading-relaxed ${
                                msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground ml-4 shadow-lg shadow-primary/20' 
                                : 'bg-white/5 border border-white/10 text-white/90 mr-4 backdrop-blur-md'
                            }`}>
                                <ReactMarkdown 
                                    components={{
                                        p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed opacity-90">{children}</p>,
                                        strong: ({children}) => <strong className="font-black text-primary brightness-125">{children}</strong>,
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                                <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" />
                                <span className="size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                                <span className="size-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Command Input */}
                <div className="p-6 border-t border-primary/10 bg-black/20">
                   <form onSubmit={(e) => handleSendMessage(e)} className="relative group">
                      <input 
                         type="text"
                         value={inputValue}
                         onChange={(e) => setInputValue(e.target.value)}
                         placeholder="Ask technical question..."
                         className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-7 pr-16 text-[13px] font-bold focus:outline-none focus:border-primary/60 transition-all text-foreground placeholder:text-muted-foreground/30 shadow-inner"
                      />
                      <button 
                         type="submit"
                         disabled={!inputValue.trim()}
                         className="absolute right-3.5 top-1/2 -translate-y-1/2 size-11 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:scale-110 active:scale-95 transition-all disabled:opacity-20 shadow-xl shadow-primary/20"
                      >
                         <Send className="size-5" />
                      </button>
                   </form>
                </div>
            </motion.div>
         )}
      </AnimatePresence>

    </main>
  );
}

export default function SystemDetailPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin ring-8 ring-primary/5" />
          <p className="text-[11px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">Establishing Secure Laboratory Link</p>
       </div>
    }>
      <SystemDetailContent />
    </Suspense>
  );
}
