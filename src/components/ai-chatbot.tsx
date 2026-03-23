"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ConfettiButton } from "@/registry/magicui/confetti";
import toast from "react-hot-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

function getConversationId() {
  if (typeof window === "undefined") return "server";
  const key = "pv_chat_conversation_id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
  window.localStorage.setItem(key, next);
  return next;
}

const INITIAL_QUICK_QUESTIONS = [
  "Why should I hire you?",
  "What is your total experience?",
  "Tell me about your latest project.",
  "How can I contact you?",
];

const AI_MODELS = [
  { id: "gpt-5.2", name: "DeepThink", fullName: "GPT 5.2", description: "Complex work & reasoning", color: "text-blue-500", icon: "🧠" },
  { id: "gpt-5.1", name: "Fast", fullName: "GPT 5.1", description: "Quick answers", color: "text-emerald-500", icon: "⚡" },
  { id: "gemini-3.1", name: "Advanced+", fullName: "Gemini 3.1 Pro", description: "Improved reasoning", color: "text-blue-600", icon: "💎" },
  { id: "gemini-3", name: "Balanced", fullName: "Gemini 3", description: "Everyday tasks", color: "text-blue-400", icon: "⚖️" },
  { id: "claude-4.6-opus", name: "Master+", fullName: "Claude Opus 4.6", description: "Extreme creative work", color: "text-orange-600", icon: "🎭" },
  { id: "claude-4.5-opus", name: "Master", fullName: "Claude Opus 4.5", description: "Complex analytical work", color: "text-orange-500", icon: "🏛️" },
  { id: "claude-4.1-opus", name: "Expert", fullName: "Claude Opus 4.1", description: "Nuanced understanding", color: "text-orange-400", icon: "🎓" },
  { id: "claude-4.5-sonnet", name: "Smart", fullName: "Claude Sonnet 4.5", description: "Intelligence & Speed", color: "text-purple-500", icon: "💡" },
  { id: "claude-4.6-sonnet", name: "Smart+", fullName: "Claude Sonnet 4.6", description: "Better coding & logic", color: "text-purple-600", icon: "🚀" },
  { id: "claude-4-sonnet", name: "Efficient", fullName: "Claude Sonnet 4", description: "Reliable & Fast", color: "text-purple-400", icon: "♻️" },
  { id: "grok-4", name: "Reason", fullName: "Grok 4", description: "Logic expert", color: "text-zinc-200", icon: "🤖" },
  { id: "llama-4", name: "Creative", fullName: "LLaMA 4", description: "Creative thinking", color: "text-red-500", icon: "🎨" },
  { id: "mistral-3", name: "Research", fullName: "Mistral 3", description: "Advanced analysis", color: "text-cyan-500", icon: "🔬" },
  { id: "deepseek-3.2", name: "HardSolve", fullName: "DeepSeek 3.2", description: "Technical problem solver", color: "text-blue-700", icon: "🛠️" },
  { id: "qwen-3", name: "Reasoning", fullName: "Qwen 3", description: "Instruction following", color: "text-indigo-500", icon: "📜" },
  { id: "gemma-3", name: "Lightweight", fullName: "Gemma 3", description: "General-purpose", color: "text-emerald-400", icon: "🌱" },
  { id: "minimax-m2", name: "LongContext", fullName: "MiniMax M2", description: "400K tokens", color: "text-yellow-500", icon: "📚" },
  { id: "nvidia", name: "Efficient", fullName: "NVIDIA", description: "Low-latency", color: "text-green-500", icon: "🟢" },
  { id: "kimi-k2.5", name: "Kimi", fullName: "Kimi K2.5", description: "Fast & Balanced", color: "text-blue-300", icon: "🌙" },
];

export default function AIChatbot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(AI_MODELS[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hi! I'm **${DATA.name}'s AI Assistant**. How can I help you today? \n\nI can tell you about my **1.5+ years of experience**, skills in **React/Node.js**, or show you my latest projects!`,
      sender: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string>("init");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    conversationIdRef.current = getConversationId();
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
        setShowModelSelector(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          modelId: currentModel.id,
          conversationId: conversationIdRef.current,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to the AI. Please check your internet or try again later.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const [isExternalDrawerOpen, setIsExternalDrawerOpen] = useState(false);

  useEffect(() => {
    const checkDrawer = () => {
      setIsExternalDrawerOpen(document.body.classList.contains("drawer-open"));
    };
    
    // Check initially and on a small delay to catch state changes
    checkDrawer();
    const interval = setInterval(checkDrawer, 100);
    return () => clearInterval(interval);
  }, []);

  const isHidden = pathname.startsWith("/systems/") || (pathname === "/projects" && searchParams.get("file"));

  if (isHidden) return null;

  return (
    <div className={cn(
      "fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end transition-all duration-500 ease-in-out",
      isOpen && "inset-0 bottom-0 right-0 sm:inset-auto sm:bottom-6 sm:right-6",
      isExternalDrawerOpen && "translate-y-full opacity-0 pointer-events-none"
    )}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 z-[100] sm:relative sm:inset-auto sm:mb-4 w-full sm:w-[440px] h-full sm:h-[600px] bg-background sm:bg-card/60 sm:backdrop-blur-2xl border-none sm:border sm:border-primary/20 rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-11 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <Sparkles className="size-6 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground/90">{DATA.name} | AI</h3>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] text-foreground/50 font-medium">Assistant Online</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full hover:bg-primary/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-background/20">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[88%]",
                    message.sender === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-xl shadow-primary/10"
                        : "bg-background/40 text-foreground/90 border border-primary/5 rounded-tl-none backdrop-blur-md"
                    )}
                  >
                    <ReactMarkdown className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:p-2 prose-code:text-primary">
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1.5 p-3 px-4 items-center bg-primary/5 rounded-2xl w-fit border border-primary/10"
                >
                  <span className="size-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                  <span className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-background/20 border-t border-primary/10">
              {/* Quick Questions */}
              {messages.length < 3 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {INITIAL_QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] px-3.5 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-foreground/70 transition-all duration-200 hover:border-primary/30"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="relative group"
              >
                <div className="flex items-center bg-background/40 backdrop-blur-md border border-primary/20 rounded-2xl p-1 shadow-inner focus-within:border-primary/50 transition-all duration-300">
                  {/* Model Selector Trigger */}
                  <div className="relative" ref={modelSelectorRef}>
                    <button
                      type="button"
                      onClick={() => setShowModelSelector(!showModelSelector)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all border border-transparent hover:border-primary/20 text-[11px] font-bold text-primary"
                    >
                      <span className="text-sm">{currentModel.icon}</span>
                      <span className="hidden sm:inline">{currentModel.name}</span>
                      <ChevronDown className={cn("size-3 transition-transform duration-200", showModelSelector && "rotate-180")} />
                    </button>

                    {/* Model Dropdown */}
                    <AnimatePresence>
                      {showModelSelector && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-0 mb-2 w-[280px] bg-card border border-primary/20 rounded-2xl shadow-2xl p-2 overflow-hidden z-[110] backdrop-blur-3xl"
                        >
                          <div className="px-3 py-2 mb-2 border-b border-primary/10">
                            <p className="text-sm font-black text-foreground tracking-tight">
                              Choose Your AI Brain
                            </p>
                            <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">
                              19 active models available
                            </p>
                          </div>
                          <div className="max-h-[320px] overflow-y-auto pr-1 space-y-1 scrollbar-hide">
                            {AI_MODELS.map((model) => (
                              <button
                                key={model.id}
                                type="button"
                                onClick={() => {
                                  setCurrentModel(model);
                                  setShowModelSelector(false);
                                }}
                                className={cn(
                                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group",
                                  currentModel.id === model.id ? "bg-primary/20 text-primary" : "hover:bg-primary/5 text-foreground/60"
                                )}
                              >
                                <span className="text-xl group-hover:scale-110 transition-transform">{model.icon}</span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-[11px] font-black leading-none">{model.name}</p>
                                    <span className="text-[8px] font-black opacity-40 uppercase truncate">{model.fullName}</span>
                                  </div>
                                  <p className="text-[9px] opacity-60 font-bold truncate">{model.description}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask PV AI..."
                    className="flex-1 bg-transparent border-none px-3 py-2 text-[13px] focus:outline-none focus:ring-0 text-foreground/80 placeholder:text-foreground/30 min-w-0"
                    disabled={isTyping}
                  />

                  <ConfettiButton
                    type="submit"
                    size="icon"
                    disabled={isTyping || !inputValue.trim()}
                    options={{ particleCount: 30, spread: 50, colors: ["#22c55e", "#3b82f6", "#f59e0b"] }}
                    className="rounded-xl size-9 shrink-0 shadow-lg shadow-primary/20 ml-1"
                  >
                    <Send className="size-4" />
                  </ConfettiButton>
                </div>
              </form>
              <div className="flex flex-col items-center gap-1 mt-4">
                <p className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.15em] whitespace-nowrap">
                   Build with Best Advanced Models
                </p>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-6 bg-primary/20" />
                   <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">
                     19 High-Performace Nodes Active
                   </p>
                   <div className="h-[1px] w-6 bg-primary/20" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="size-12 sm:size-16 rounded-full shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 flex items-center justify-center p-0 transition-transform duration-300 ring-4 ring-primary/5"
        >
          {isOpen ? (
            <X className="size-6 sm:size-8 text-primary-foreground" />
          ) : (
            <div className="relative">
              <MessageCircle className="size-6 sm:size-8 text-primary-foreground fill-current animate-pulse-subtle" />
              <div className="absolute -top-1 -right-1 size-2.5 sm:size-3.5 bg-green-500 rounded-full border-2 border-primary ring-2 ring-primary/20"></div>
            </div>
          )}
        </Button>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
























