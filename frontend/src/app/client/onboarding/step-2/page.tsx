"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    CreditCard,
    Shield,
    Banknote,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Sparkles,
    Lock,
} from "lucide-react";

const solutions = [
    {
        id: "credit-scoring",
        name: "AI Credit Scoring",
        description: "Intelligent credit risk assessment using machine learning models trained on alternative data sources.",
        icon: CreditCard,
        features: [
            "Alternative data integration",
            "Real-time scoring API",
            "Risk segmentation",
            "Custom model training",
        ],
        color: "cyan",
        available: true,
    },
    {
        id: "fraud-detection",
        name: "Fraud Detection",
        description: "Real-time fraud prevention system powered by advanced anomaly detection algorithms.",
        icon: Shield,
        features: [
            "Transaction monitoring",
            "Behavioral analytics",
            "Alert management",
            "Investigation dashboard",
        ],
        color: "violet",
        available: true,
    },
    {
        id: "payment-gateway",
        name: "Unified Payment Gateway",
        description: "Seamless multi-provider payment integration with intelligent routing and reconciliation.",
        icon: Banknote,
        features: [
            "Multi-provider support",
            "Smart routing",
            "Auto reconciliation",
            "Payment analytics",
        ],
        color: "emerald",
        available: true,
    },
];

export default function ClientOnboardingStep2() {
    const { user, refreshUserData } = useAuth();
    const router = useRouter();
    const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!user || !selectedSolution) return;

        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedSolution: selectedSolution,
                clientOnboardingStep: 3,
                updatedAt: new Date().toISOString(),
            });

            await refreshUserData();
            router.push("/client/onboarding/step-3");
        } catch (error) {
            console.error("Error saving solution:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getColorClasses = (color: string, isSelected: boolean) => {
        const colors: Record<string, { border: string; bg: string; icon: string; text: string }> = {
            cyan: {
                border: isSelected ? "border-cyan-500" : "border-white/10 hover:border-cyan-500/50",
                bg: "bg-cyan-500/20",
                icon: "text-cyan-400",
                text: "text-cyan-400",
            },
            violet: {
                border: isSelected ? "border-violet-500" : "border-white/10 hover:border-violet-500/50",
                bg: "bg-violet-500/20",
                icon: "text-violet-400",
                text: "text-violet-400",
            },
            emerald: {
                border: isSelected ? "border-emerald-500" : "border-white/10 hover:border-emerald-500/50",
                bg: "bg-emerald-500/20",
                icon: "text-emerald-400",
                text: "text-emerald-400",
            },
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-full max-w-4xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-400 text-sm font-medium">Step 2 of 6</span>
                        <span className="text-slate-400 text-sm">Select a Solution</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[33.33%] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
                                <Sparkles size={16} />
                                Fintech Solutions
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Select Your AI Solution</h1>
                            <p className="text-slate-400">Choose the solution that best fits your business needs</p>
                        </div>

                        {/* Solutions Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {solutions.map((solution) => {
                                const Icon = solution.icon;
                                const isSelected = selectedSolution === solution.id;
                                const colors = getColorClasses(solution.color, isSelected);

                                return (
                                    <button
                                        key={solution.id}
                                        onClick={() => setSelectedSolution(solution.id)}
                                        disabled={!solution.available}
                                        className={`relative p-6 bg-white/5 backdrop-blur border-2 ${colors.border} rounded-2xl text-left transition-all duration-300 ${
                                            isSelected ? "ring-2 ring-offset-2 ring-offset-slate-900" : ""
                                        } ${!solution.available ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"}`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-4 right-4">
                                                <CheckCircle2 size={24} className={colors.text} />
                                            </div>
                                        )}

                                        {!solution.available && (
                                            <div className="absolute top-4 right-4">
                                                <Lock size={20} className="text-slate-500" />
                                            </div>
                                        )}

                                        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                                            <Icon size={24} className={colors.icon} />
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2">{solution.name}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{solution.description}</p>

                                        <ul className="space-y-2">
                                            {solution.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                                    <CheckCircle2 size={14} className={colors.text} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Coming Soon Notice */}
                        <div className="text-center mb-8">
                            <p className="text-slate-500 text-sm">
                                More solutions coming soon: AgriTech, HealthTech, EdTech, and more
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={() => router.push("/client/onboarding/step-1")}
                                className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={!selectedSolution || isSubmitting}
                                className="flex-1 max-w-xs py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Continue to Pricing
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
