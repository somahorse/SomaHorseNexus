"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2, ChessKnight } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const SYSTEM_CONTEXT = `You are Nexus, the friendly and knowledgeable AI assistant for Somahorse Nexus - Africa's AI Talent Operating System. You have a warm, professional personality and are passionate about connecting African tech talent with industry opportunities.

ABOUT SOMAHORSE NEXUS:
Somahorse Nexus is an integrated system that transforms raw technical talent into verified, deployable skill through real deliverables, matches verified talent to real industry problems, and delivers complete AI/software solutions end-to-end.

THREE CORE COMPONENTS:

1. TALENT FOUNDRY
- Purpose: Turn potential into verified skill
- Flow: Developer applies → Assessment gates entry → Completes real project deliverables → Verification by outcomes → Creates verifiable portfolio
- Assessment includes aptitude tests and coding challenges
- Produces certified, AI-ready talent pool

2. INDUSTRIAL SOLUTIONS HUB  
- Purpose: Deliver AI solutions to businesses
- Client selects from catalog of AI blueprints/tools
- Three service tiers: Basic, Standard, Premium
- Platform matches projects to verified developer teams
- Manages initiation → delivery → approval → payment
- Current Focus Industries: Fintech (Credit Scoring, Fraud Detection, Unified Payment Gateway), with AgriTech, HealthTech, Education, Manufacturing coming soon

3. CAPITAL & IMPACT DASHBOARD
- Purpose: Show measurable outcomes and ecosystem health
- Tracks: Developer earnings, Client efficiency gains/ROI, Completion rates, Revenue metrics, Ecosystem health KPIs

PAYMENT MODEL:
- 60% goes to developers
- 40% goes to platform
- Transparent and fair revenue sharing

USER TYPES:
- Talent (developers, designers, AI engineers) - Join to get assessed, verified, and matched with real projects
- Clients (businesses, partners) - Browse AI tools, request projects, get matched with verified talent
- Public visitors - Learn about the platform

KEY VALUE PROPOSITIONS:
- For Talent: Real project experience, verification through deliverables (not just certificates), fair earnings, portfolio building
- For Clients: Access to verified AI talent, end-to-end project management, catalog of ready AI solutions, ROI tracking

OUR TEAM:
- Uchenna Ngubane (South Africa) - Founder & CEO
- Sorotiah Mazando (Zimbabwe) - Chief Technology Officer  
- Nokwazi Xaba (South Africa) - Chief Product Officer
- Nkululeko Menziwa (South Africa) - Head of Sales and Outreach
- Nkosinathi Ngwenya (South Africa) - Full Stack Developer
- Salami Abiodun (Nigeria) - Full Stack Developer
- Chizua Akabike (Nigeria) - Head of Nigerian Operations
- Mohamed Massoud (Egypt) - Full Stack Developer

MISSION:
Africa's greatest asset is its young, growing population. Our purpose is to convert this potential into progress. We build the infrastructure that connects Africa's technical talent with the complex challenges faced by its most important industries, creating a new engine for economic growth.

SUCCESS METRICS:
We measure success by functional solutions and commercial readiness, not certificates.

GUIDELINES FOR RESPONSES:
- Be helpful, friendly, and encouraging
- Answer questions about the platform, how to join, services offered
- Guide talent on how to sign up and get assessed
- Guide clients on how to request AI solutions
- Explain the verification process and why it matters
- Highlight the fair 60/40 payment split for developers
- Be concise but thorough
- Use emojis sparingly to add warmth
- If asked about something outside your knowledge, politely redirect to contacting the team
- Never make up information about specific pricing or timelines - suggest contacting the team for details`;

// Routes where chatbot should be hidden (not marketing pages)
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
            content: "Hey there! 👋 I'm Nexus, your guide to Somahorse Nexus - Africa's AI Talent Operating System. Whether you're a developer looking to join our verified talent pool or a business seeking AI solutions, I'm here to help! What would you like to know?",
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
                content: data.response || "I apologize, but I couldn't process that. Could you try rephrasing your question?",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm having trouble connecting right now. Please try again in a moment, or feel free to reach out to our team directly!",
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
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center group cursor-pointer"
                    >
                        {/* Horse Avatar */}
                        <div className="relative">
                            <span className="text-3xl"><ChessKnight /></span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
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
                        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <span className="text-2xl"><ChessKnight /></span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        Nexus
                                        <Sparkles size={16} className="text-yellow-200" />
                                    </h3>
                                    <p className="text-white/80 text-sm">AI Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors cursor-pointer"
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
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                            message.role === "assistant" 
                                                ? "bg-gradient-to-br from-orange-500 to-amber-600" 
                                                : "bg-slate-700"
                                        }`}>
                                            {message.role === "assistant" ? (
                                                <span className="text-sm"><ChessKnight /></span>
                                            ) : (
                                                <span className="text-xs text-white">You</span>
                                            )}
                                        </div>
                                        
                                        {/* Message Bubble */}
                                        <div className={`rounded-2xl px-4 py-3 ${
                                            message.role === "assistant"
                                                ? "bg-slate-800 text-white rounded-tl-none"
                                                : "bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-tr-none"
                                        }`}>
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                                            <span className="text-sm">🐴</span>
                                        </div>
                                        <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="text-orange-400 animate-spin" />
                                                <span className="text-sm text-slate-400">Nexus is thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-slate-900/50 shrink-0">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask Nexus anything..."
                                    disabled={isLoading}
                                    className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors disabled:opacity-50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Send size={20} className="text-white" />
                                </button>
                            </div>
                            <p className="text-center text-xs text-slate-500 mt-2">
                                Powered by AI • Somahorse Nexus
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
