"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Zap,
    Crown,
    Rocket,
    Clock,
    Shield,
    Headphones,
    Code,
    BarChart3,
    Users,
} from "lucide-react";

const tiers = [
    {
        id: "basic",
        name: "Basic",
        description: "Essential AI capabilities for startups and small teams",
        price: "R25,000",
        period: "/project",
        icon: Zap,
        color: "cyan",
        popular: false,
        features: [
            { text: "Standard delivery (4-6 weeks)", icon: Clock },
            { text: "Core model implementation", icon: Code },
            { text: "Basic API integration", icon: Rocket },
            { text: "Email support", icon: Headphones },
            { text: "1 revision round", icon: CheckCircle2 },
        ],
        notIncluded: [
            "Custom model training",
            "Priority support",
            "Advanced integrations",
        ],
    },
    {
        id: "standard",
        name: "Standard",
        description: "Full-featured solution for growing businesses",
        price: "R75,000",
        period: "/project",
        icon: Crown,
        color: "violet",
        popular: true,
        features: [
            { text: "Priority delivery (2-4 weeks)", icon: Clock },
            { text: "Custom model training", icon: Code },
            { text: "Full API + Dashboard", icon: BarChart3 },
            { text: "Priority email & chat support", icon: Headphones },
            { text: "3 revision rounds", icon: CheckCircle2 },
            { text: "Basic analytics dashboard", icon: BarChart3 },
        ],
        notIncluded: [
            "Dedicated success manager",
            "On-premise deployment",
        ],
    },
    {
        id: "premium",
        name: "Premium",
        description: "Enterprise-grade solution with full customization",
        price: "R150,000+",
        period: "/project",
        icon: Rocket,
        color: "emerald",
        popular: false,
        features: [
            { text: "Express delivery (1-2 weeks)", icon: Clock },
            { text: "Fully custom AI models", icon: Code },
            { text: "Enterprise integrations", icon: Shield },
            { text: "Dedicated success manager", icon: Users },
            { text: "Unlimited revisions", icon: CheckCircle2 },
            { text: "Advanced analytics + reporting", icon: BarChart3 },
            { text: "On-premise deployment option", icon: Shield },
            { text: "24/7 priority support", icon: Headphones },
        ],
        notIncluded: [],
    },
];

export default function ClientOnboardingStep3() {
    const { user, refreshUserData } = useAuth();
    const router = useRouter();
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!user || !selectedTier) return;

        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                selectedTier: selectedTier,
                clientOnboardingStep: 4,
                updatedAt: new Date().toISOString(),
            });

            await refreshUserData();
            router.push("/client/onboarding/step-4");
        } catch (error) {
            console.error("Error saving tier:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getColorClasses = (color: string, isSelected: boolean) => {
        const colors: Record<string, { border: string; bg: string; icon: string; badge: string; glow: string }> = {
            cyan: {
                border: isSelected ? "border-cyan-500" : "border-white/10",
                bg: "bg-cyan-500/20",
                icon: "text-cyan-400",
                badge: "bg-cyan-500",
                glow: "shadow-cyan-500/25",
            },
            violet: {
                border: isSelected ? "border-violet-500" : "border-white/10",
                bg: "bg-violet-500/20",
                icon: "text-violet-400",
                badge: "bg-violet-500",
                glow: "shadow-violet-500/25",
            },
            emerald: {
                border: isSelected ? "border-emerald-500" : "border-white/10",
                bg: "bg-emerald-500/20",
                icon: "text-emerald-400",
                badge: "bg-emerald-500",
                glow: "shadow-emerald-500/25",
            },
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-full max-w-6xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-400 text-sm font-medium">Step 3 of 6</span>
                        <span className="text-slate-400 text-sm">Choose Your Tier</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[50%] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Choose Your Investment Tier</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Select the package that best fits your project scope and timeline. All tiers include our 60/40 talent-driven delivery model.
                    </p>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        const isSelected = selectedTier === tier.id;
                        const colors = getColorClasses(tier.color, isSelected);

                        return (
                            <button
                                key={tier.id}
                                onClick={() => setSelectedTier(tier.id)}
                                className={`relative p-6 bg-white/5 backdrop-blur-xl border-2 ${colors.border} rounded-3xl text-left transition-all duration-300 hover:bg-white/10 ${
                                    isSelected ? `ring-2 ring-offset-2 ring-offset-slate-900 ${colors.glow} shadow-xl` : ""
                                } ${tier.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
                            >
                                {/* Popular Badge */}
                                {tier.popular && (
                                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 ${colors.badge} rounded-full text-white text-xs font-bold`}>
                                        Most Popular
                                    </div>
                                )}

                                {/* Selected Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4">
                                        <CheckCircle2 size={24} className={colors.icon} />
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-4`}>
                                    <Icon size={28} className={colors.icon} />
                                </div>

                                {/* Name & Description */}
                                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                                <p className="text-slate-400 text-sm mb-4">{tier.description}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-3xl font-black text-white">{tier.price}</span>
                                    <span className="text-slate-400 text-sm">{tier.period}</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-4">
                                    {tier.features.map((feature, idx) => {
                                        const FeatureIcon = feature.icon;
                                        return (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                <FeatureIcon size={16} className={`${colors.icon} mt-0.5 flex-shrink-0`} />
                                                <span>{feature.text}</span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Not Included */}
                                {tier.notIncluded.length > 0 && (
                                    <ul className="space-y-2 pt-4 border-t border-white/10">
                                        {tier.notIncluded.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 line-through">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="mb-8 p-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl">
                    <p className="text-slate-400 text-sm text-center">
                        <span className="text-cyan-400 font-medium">Note:</span> Final pricing is determined after project scoping. The 60/40 model means verified talent receives 60% of the project value, ensuring top-quality delivery.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => router.push("/client/onboarding/step-2")}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!selectedTier || isSubmitting}
                        className="flex-1 max-w-xs py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Continue to Brief
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
