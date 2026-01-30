"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    ArrowRight,
    ArrowLeft,
    Building2,
    CreditCard,
    Shield,
    Banknote,
    Crown,
    Zap,
    Rocket,
    Target,
    Clock,
    CheckCircle2,
    Edit3,
    FileText,
} from "lucide-react";

const solutionLabels: Record<string, { name: string; icon: any }> = {
    "credit-scoring": { name: "AI Credit Scoring", icon: CreditCard },
    "fraud-detection": { name: "Fraud Detection", icon: Shield },
    "payment-gateway": { name: "Unified Payment Gateway", icon: Banknote },
};

const tierLabels: Record<string, { name: string; icon: any; price: string }> = {
    basic: { name: "Basic", icon: Zap, price: "R25,000" },
    standard: { name: "Standard", icon: Crown, price: "R75,000" },
    premium: { name: "Premium", icon: Rocket, price: "R150,000+" },
};

const urgencyLabels: Record<string, string> = {
    low: "Low - 3+ months",
    medium: "Medium - 1-3 months",
    high: "High - 2-4 weeks",
    critical: "Critical - ASAP",
};

export default function ClientOnboardingStep5() {
    const { user, refreshUserData } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projectData, setProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setProjectData(userDoc.data());
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleSubmit = async () => {
        if (!user || !projectData) return;

        setIsSubmitting(true);
        try {
            // Create a new project request document
            const projectsRef = collection(db, "projects");
            const projectDoc = await addDoc(projectsRef, {
                clientId: user.uid,
                clientEmail: user.email,
                organization: projectData.organization,
                contact: projectData.contact,
                solution: projectData.selectedSolution,
                tier: projectData.selectedTier,
                brief: projectData.projectBrief,
                status: "pending",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            // Update user document
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                clientOnboardingStep: 6,
                clientOnboardingCompleted: true,
                activeProjectId: projectDoc.id,
                updatedAt: new Date().toISOString(),
            });

            await refreshUserData();
            router.push("/client/onboarding/step-6");
        } catch (error) {
            console.error("Error submitting project:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const solution = solutionLabels[projectData?.selectedSolution] || { name: "Unknown", icon: FileText };
    const tier = tierLabels[projectData?.selectedTier] || { name: "Unknown", icon: Zap, price: "TBD" };
    const SolutionIcon = solution.icon;
    const TierIcon = tier.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-400 text-sm font-medium">Step 5 of 6</span>
                        <span className="text-slate-400 text-sm">Review & Submit</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[83.33%] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
                                <FileText size={32} className="text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Review Your Request</h1>
                            <p className="text-slate-400">Please verify all details before submitting</p>
                        </div>

                        <div className="space-y-6">
                            {/* Organization Summary */}
                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Building2 size={20} className="text-cyan-400" />
                                        <h3 className="font-semibold text-white">Organization</h3>
                                    </div>
                                    <button
                                        onClick={() => router.push("/client/onboarding/step-1")}
                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                    >
                                        <Edit3 size={16} className="text-slate-400" />
                                    </button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-300">
                                        <span className="text-slate-500">Name:</span> {projectData?.organization?.name || "N/A"}
                                    </p>
                                    <p className="text-slate-300">
                                        <span className="text-slate-500">Industry:</span> {projectData?.organization?.industry || "N/A"}
                                    </p>
                                    <p className="text-slate-300">
                                        <span className="text-slate-500">Size:</span> {projectData?.organization?.size || "N/A"}
                                    </p>
                                    <p className="text-slate-300">
                                        <span className="text-slate-500">Region:</span> {projectData?.organization?.region || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Solution & Tier */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-medium text-slate-400">Solution</h3>
                                        <button
                                            onClick={() => router.push("/client/onboarding/step-2")}
                                            className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                        >
                                            <Edit3 size={14} className="text-slate-400" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                            <SolutionIcon size={20} className="text-cyan-400" />
                                        </div>
                                        <span className="font-medium text-white">{solution.name}</span>
                                    </div>
                                </div>

                                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-medium text-slate-400">Tier</h3>
                                        <button
                                            onClick={() => router.push("/client/onboarding/step-3")}
                                            className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                        >
                                            <Edit3 size={14} className="text-slate-400" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                            <TierIcon size={20} className="text-violet-400" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-white">{tier.name}</span>
                                            <p className="text-xs text-slate-500">{tier.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Brief */}
                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Target size={20} className="text-emerald-400" />
                                        <h3 className="font-semibold text-white">Project Brief</h3>
                                    </div>
                                    <button
                                        onClick={() => router.push("/client/onboarding/step-4")}
                                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                                    >
                                        <Edit3 size={16} className="text-slate-400" />
                                    </button>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-slate-500 mb-1">Goal:</p>
                                        <p className="text-slate-300">{projectData?.projectBrief?.goal || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 mb-1">Timeline:</p>
                                        <p className="text-slate-300">{urgencyLabels[projectData?.projectBrief?.urgency] || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 mb-1">Success Metric:</p>
                                        <p className="text-slate-300">{projectData?.projectBrief?.successMetric || "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <p className="text-amber-300 text-sm">
                                    <strong>Note:</strong> By submitting, your project request will be reviewed by our team. Final pricing and timeline will be confirmed after the scoping call.
                                </p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4 mt-8">
                            <button
                                onClick={() => router.push("/client/onboarding/step-4")}
                                className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 max-w-xs py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CheckCircle2 size={18} />
                                        Submit Request
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
