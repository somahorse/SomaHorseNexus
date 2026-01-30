"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    CheckCircle2,
    ArrowRight,
    Clock,
    MessageSquare,
    FileText,
    Sparkles,
} from "lucide-react";

export default function ClientOnboardingStep6() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Auto-redirect to dashboard after 5 seconds
        const timer = setTimeout(() => {
            router.push("/dashboard");
        }, 8000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg text-center">
                {/* Success Animation */}
                <div className="mb-8">
                    <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                            <CheckCircle2 size={48} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
                            <Sparkles size={16} />
                            Request Submitted
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-3">You're All Set!</h1>
                        <p className="text-slate-400 mb-8">
                            Your project request has been received. Our team will review it and get back to you within 24-48 hours.
                        </p>

                        {/* What's Next */}
                        <div className="space-y-4 mb-8 text-left">
                            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">What happens next</h3>
                            
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock size={20} className="text-cyan-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Review Period</p>
                                    <p className="text-sm text-slate-400">Our team will analyze your requirements within 24-48 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MessageSquare size={20} className="text-violet-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Scoping Call</p>
                                    <p className="text-sm text-slate-400">We'll schedule a call to finalize requirements and pricing</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText size={20} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Project Kickoff</p>
                                    <p className="text-sm text-slate-400">Once approved, we'll match you with verified talent</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                        >
                            Go to Dashboard
                            <ArrowRight size={20} />
                        </button>

                        <p className="text-slate-500 text-sm mt-4">
                            Redirecting to dashboard in a few seconds...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
