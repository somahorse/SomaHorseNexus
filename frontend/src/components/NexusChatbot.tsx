"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2 } from "lucide-react";

// Custom Horse SVG icon (Lucide doesn't have one)
function HorseIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 2L17 7l-2-2-5 5c-1.5-1-3.5-1.5-5.5-.5L3 11l4 4-2 4 4-2 4 4 1.5-1.5c1-2-.5-4-1.5-5.5l5-5-2-2 5-5z" />
            <path d="M7 17l-3 3" />
            <path d="M17 7l1 1" />
        </svg>
    );
}

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const SYSTEM_CONTEXT = `You are Soma, the AI assistant for Somahorse AI — Africa's intelligent project delivery platform.

IMPORTANT RESPONSE RULES:
- Be helpful but focused and brief.
- Use bold (**text**) to highlight key terms and important concepts.
- Break longer info into short bullet points when helpful.
- Be warm, confident, and direct — you represent a cutting-edge African tech platform.
- DO NOT USE EMOJIS.
- Always answer with African context in mind: ZAR pricing, African sectors, African developers.
- Never suggest the client pick from a fixed catalogue — emphasise that we scope it for them.

PLATFORM OVERVIEW:
Somahorse AI is an agent-powered platform that takes a client's real business problem, breaks it into smaller technical tasks using an LLM agent, and matches each task to the best-fit verified African developer from a live talent database. Clients describe their problem in plain language — we handle the rest.

HOW IT WORKS (THE CORE FLOW):
1. **Client submits a brief** — describe the problem, the data you have, and the outcome you want (via /contact or the onboarding flow)
2. **AI agent decomposes it** — the LLM breaks the problem into discrete, manageable sub-tasks (e.g. data pipeline, model training, API integration, dashboard)
3. **Developer matching** — each sub-task is matched to a verified developer from our talent database using: assessment score, skill profile, past project ratings, availability, and bio
4. **Scoped & priced** — a project lead reviews the decomposition, confirms scope, and provides a ZAR-denominated quote
5. **Delivery** — developers execute milestone by milestone; client approves deliverables before payment is released
6. **Payment split** — **60% to developers, 40% to platform** on every project

DEVELOPER MATCHING CRITERIA (what the agent uses):
- **Assessment score** — developers are verified through aptitude and coding assessments before joining the pool
- **Skill profile** — matched to the specific sub-task requirements (Python, ML, API dev, data engineering, etc.)
- **Rating** — star rating from completed projects on the platform
- **Availability** — only available developers are surfaced for matching
- **Bio & experience** — contextual fit for the client's sector and problem type

WHO WE SERVE:
- **Businesses & Organisations** — any company in Africa (or globally) with a real AI or software problem. No need to write a technical spec — just describe your challenge.
- **Developers** — verified African AI and software developers who want to be matched to real, paying projects. Must pass assessments to enter the talent pool.

KEY SECTORS WE COVER:
Fintech (credit scoring, fraud detection, payments), Agriculture (crop intelligence, farmer marketplaces, precision farming), Healthcare (telemedicine, diagnostics, inventory), Education (adaptive learning, skills platforms, school management), Manufacturing (production monitoring, predictive maintenance, supply chain). We are not limited to these — the agent can scope any software or AI problem.

PRICING:
All projects are scoped and quoted in **ZAR (South African Rand)** based on the decomposed tasks and matched developers. There are no fixed prices — the quote is generated after scoping. Clients can expect:
- Small/focused problems: R15,000 – R50,000
- Mid-size production systems: R60,000 – R180,000
- Enterprise-grade platforms: R200,000+

GETTING STARTED:
- **Clients**: Go to /contact or start the client onboarding flow to submit your brief. Email: somahorseai@gmail.com
- **Developers**: Apply via the developer onboarding flow, complete the assessments, and join the verified talent pool.

WHAT TO SAY IF ASKED ABOUT OLD PLATFORM:
Somahorse AI is the evolution of Somahorse Nexus. The core mission is the same — connecting African developers with real projects — but the new platform uses an AI agent to intelligently decompose problems and match talent, replacing the old fixed-solution catalogue model.

For detailed questions about a specific project or to get a scoping call booked, direct users to /contact or email somahorse.ai@gmail.com.`;
// Routes where chatbot should be hidden
const HIDDEN_ROUTES = [
    "/dashboard",
    "/admin",
    "/onboarding",
    "/client/onboarding",
    "/assessments",
    "/login",
    "/signup",
];

export default function NexusChatbot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
    {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm **Soma**, your guide to **Somahorse AI**. 🤖\n\nWe're Africa's intelligent project delivery platform — describe your business problem in plain language, and our AI agent breaks it down into tasks matched to verified African developers.\n\nAre you a **business** with a problem to solve, or a **developer** looking to join the talent pool?",
        timestamp: new Date(),
    },
]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Format message content: bold **text** and line breaks
    const formatMessage = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-cyan-300 font-semibold">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    systemContext: SYSTEM_CONTEXT,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data = await response.json();

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response || "Hmm, couldn't process that. Try rephrasing?",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Connection issue — try again shortly or reach out at **/contact**!",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Hide chatbot on non-marketing routes
    const isHidden = HIDDEN_ROUTES.some(route => pathname?.startsWith(route));
    if (isHidden) return null;

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-full shadow-2xl shadow-cyan-500/25 flex items-center justify-center group cursor-pointer"
                    >
                        <div className="relative">
                            <HorseIcon size={24} className="text-white" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"
                            />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                                Chat with Nexus
                                <div className="absolute top-full right-6 border-8 border-transparent border-t-slate-900" />
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] bg-slate-950 rounded-2xl shadow-2xl shadow-cyan-500/10 border border-white/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-600 to-violet-600 p-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <HorseIcon size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        Nexus
                                        <Sparkles size={14} className="text-cyan-200" />
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                                        <p className="text-white/70 text-xs">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex items-start gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                                        {/* Avatar */}
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                            message.role === "assistant"
                                                ? "bg-gradient-to-br from-cyan-500 to-violet-600"
                                                : "bg-slate-700"
                                        }`}>
                                            {message.role === "assistant" ? (
                                                <HorseIcon size={14} className="text-white" />
                                            ) : (
                                                <span className="text-[10px] text-white font-bold">You</span>
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div className={`rounded-2xl px-4 py-3 ${
                                            message.role === "assistant"
                                                ? "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"
                                                : "bg-gradient-to-br from-cyan-500 to-violet-600 text-white rounded-tr-sm"
                                        }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {message.role === "assistant" ? formatMessage(message.content) : message.content}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                                            <HorseIcon size={14} className="text-white" />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={14} className="text-cyan-400 animate-spin" />
                                                <span className="text-sm text-slate-500">Thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex gap-2 flex-wrap">
                                {["I'm a developer", "I need AI talent", "How does it work?"].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => { setInput(q); }}
                                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-pointer"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 bg-slate-950/80 shrink-0">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask Nexus anything..."
                                    disabled={isLoading}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors disabled:opacity-50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
