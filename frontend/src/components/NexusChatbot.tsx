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

const SYSTEM_CONTEXT = `You are Nexus, the AI assistant for Somahorse Nexus — Africa's AI Talent Operating System.

IMPORTANT RESPONSE RULES:
- Keep responses MEDIUM length (4-8 sentences). Provide enough detail to be helpful but stay focused.
- Use bold (**text**) to highlight key terms and important words.
- Break longer info into short bullet points when helpful.
- Be warm, confident, and knowledgeable.
- Use 1-2 emojis max per response for personality.
- If someone asks about a specific topic, give a thorough but organized answer.

PLATFORM OVERVIEW:
Somahorse Nexus connects verified African AI talent with global businesses. Three pillars:
1. **Talent Foundry** — Developers apply → pass assessments → get verified → matched to real projects
2. **Industrial Solutions Hub** — Businesses pick AI solutions across 5 sectors, choose a tier (Basic/Standard/Premium), get matched with verified devs
3. **Capital Dashboard** — Tracks ROI, earnings, completion rates

PAYMENT: **60/40 split** (developer gets 60%, platform 40%). Example: A Standard Tier project at R100,000 — developers earn R60,000, platform earns R40,000.

SECTORS & SOLUTIONS (15 total):
- **Fintech**: Credit Scoring (R25k–R250k), Fraud Detection (R30k–R300k), Unified Payment Gateway (R20k–R200k)
- **Agriculture**: Crop Disease Scanner (R15k–R150k), Farmer-to-Buyer Marketplace (R20k–R180k), Precision Farming (R25k–R220k)
- **Healthcare**: Telemedicine (R25k–R250k), AI Diagnostic Assistant (R30k–R300k), Drug Inventory Tracking (R20k–R220k)
- **Education**: Adaptive Learning (R15k–R150k), Skills Training App (R10k–R120k), School Management (R12k–R130k)
- **Manufacturing**: Production Monitoring (R25k–R250k), Predictive Maintenance (R30k–R280k), Supply Chain Tracking (R20k–R220k)

TIERS: Basic (prototype/validation), Standard (production-ready with integrations), Premium (enterprise-grade with compliance and advanced features).

All engagements include a dedicated project lead, verified AI delivery team, deployment support, and post-launch validation.

MISSION: Design, build and deploy tailored AI solutions for Africa's key sectors.

For detailed pricing or to discuss which solution and tier fit your needs, direct users to the /contact page or email somahorsenexus@gmail.com.`;

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
            content: "Hey! I'm **Nexus**, your guide to Somahorse Nexus. Whether you're a **developer** looking to get verified and matched to real projects, or a **business** searching for top **AI talent** — I'm here to help. Ask me anything about the platform, services, or how to get started!",
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
