"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    HelpCircle,
    MessageSquare,
    Book,
    Video,
    Mail,
    Phone,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Search,
} from "lucide-react";

const faqs = [
    {
        question: "How does the talent matching work?",
        answer: "Our AI-powered matching algorithm analyzes your project requirements and matches you with the best-suited talent based on their verified skills, experience, and past project performance. We consider skill overlap, confidence scores, and verification status to ensure the best fit.",
    },
    {
        question: "How do I communicate with my team?",
        answer: "Each project has a dedicated collaboration page with a real-time group chat. You can access it from your dashboard by clicking on any active project. The chat supports questions, updates, and general discussion between all team members.",
    },
    {
        question: "How is project progress tracked?",
        answer: "Talent members can update the project progress percentage at any time. You'll see a progress bar on your dashboard and project page. You'll also receive notifications for major progress updates.",
    },
    {
        question: "What happens if I have questions about the project?",
        answer: "Use the Q&A feature in your project collaboration page. Talent can ask clarification questions that clients can answer directly. All questions and answers are visible to the entire team for transparency.",
    },
    {
        question: "How do I accept a project assignment?",
        answer: "When you're matched to a project, you'll receive a notification. Visit the project page and click 'Accept Assignment' to confirm your participation. The project begins once all team members have accepted.",
    },
    {
        question: "What are the different project tiers?",
        answer: "We offer three tiers: Basic (2 team members, ~5 weeks), Standard (3 team members, ~3 weeks), and Premium (5 team members, ~1.5 weeks). Each tier is designed to match project complexity and timeline requirements.",
    },
];

export default function HelpPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) return null;

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Help Center</h1>
                        <p className="text-slate-400">Find answers and get support</p>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <a
                            href="mailto:support@somahorse.com"
                            className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Mail size={20} className="text-cyan-400" />
                                </div>
                                <h3 className="text-white font-medium">Email Support</h3>
                            </div>
                            <p className="text-slate-400 text-sm">support@somahorse.com</p>
                        </a>

                        <a
                            href="#"
                            className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-violet-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-violet-500/20 rounded-lg">
                                    <Book size={20} className="text-violet-400" />
                                </div>
                                <h3 className="text-white font-medium">Documentation</h3>
                            </div>
                            <p className="text-slate-400 text-sm">Browse our guides</p>
                        </a>

                        <a
                            href="#"
                            className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <MessageSquare size={20} className="text-emerald-400" />
                                </div>
                                <h3 className="text-white font-medium">Live Chat</h3>
                            </div>
                            <p className="text-slate-400 text-sm">Chat with our team</p>
                        </a>
                    </div>

                    {/* FAQs */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-white/10">
                            <h2 className="text-white font-semibold flex items-center gap-2">
                                <HelpCircle size={18} className="text-cyan-400" />
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="divide-y divide-white/5">
                            {filteredFaqs.map((faq, index) => (
                                <div key={index}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    >
                                        <span className="text-white font-medium pr-4">{faq.question}</span>
                                        {openFaq === index ? (
                                            <ChevronDown size={18} className="text-cyan-400 shrink-0" />
                                        ) : (
                                            <ChevronRight size={18} className="text-slate-400 shrink-0" />
                                        )}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-5 pb-5">
                                            <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredFaqs.length === 0 && (
                                <div className="p-8 text-center">
                                    <HelpCircle size={24} className="text-slate-600 mx-auto mb-2" />
                                    <p className="text-slate-500">No matching questions found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-2xl">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl">
                                <MessageSquare size={24} className="text-cyan-400" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-white font-semibold mb-1">Still need help?</h3>
                                <p className="text-slate-400 text-sm">
                                    Our support team is available Monday-Friday, 9am-6pm SAST
                                </p>
                            </div>
                            <a
                                href="mailto:support@somahorse.com"
                                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-medium transition-colors"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
