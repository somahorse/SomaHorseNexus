"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    CreditCard,
    Shield,
    Banknote,
    Zap,
    Crown,
    Rocket,
    Clock,
    Code,
    BarChart3,
    Users,
    Headphones,
    FileText,
    Sparkles,
} from "lucide-react";

import { getSolutionById } from "@/lib/solutions-data";

const solutions = [
    {
        id: "credit-scoring",
        name: "Credit Scoring Using Mobile Money Data",
        description: "AI-driven credit assessment using real transaction behaviour rather than traditional credit histories, enabling faster and more inclusive lending decisions.",
        icon: CreditCard,
        features: ["Alternative data integration", "Real-time scoring API", "Risk segmentation", "Explainability features"],
        color: "cyan",
        skills: ["Python", "Machine Learning", "Data Science", "API Development"],
    },
    {
        id: "fraud-detection",
        name: "Real-Time Fraud Detection",
        description: "AI-powered monitoring that identifies and flags suspicious transaction behaviour instantly, reducing fraud losses across payment flows.",
        icon: Shield,
        features: ["Transaction monitoring", "Behavioral analytics", "Anomaly detection", "Compliance logging"],
        color: "violet",
        skills: ["Python", "Machine Learning", "Real-time Systems", "Security"],
    },
    {
        id: "payment-gateway",
        name: "Unified Payment Gateway",
        description: "Accept card, mobile money, and bank transfer payments through one integration with intelligent routing and automated reconciliation.",
        icon: Banknote,
        features: ["Multi-provider support", "Smart routing", "Auto reconciliation", "Multi-currency settlement"],
        color: "emerald",
        skills: ["Node.js", "API Integration", "Payment Systems", "Security"],
    },
];

function buildTiers(solutionId: string | null) {
    const solution = solutionId ? getSolutionById(solutionId) : null;
    return [
        {
            id: "basic",
            name: "Basic",
            description: solution?.tiers.basic.description || "Essential AI capabilities for startups",
            price: solution?.tiers.basic.price || "R25,000",
            icon: Zap,
            color: "cyan",
            teamSize: 2,
            duration: "4-6 weeks",
            features: solution?.tiers.basic.features.slice(0, 4) || ["Standard delivery", "Core implementation", "Basic API", "Email support"],
        },
        {
            id: "standard",
            name: "Standard",
            description: solution?.tiers.standard.description || "Full-featured solution for growing businesses",
            price: solution?.tiers.standard.price || "R80,000",
            icon: Crown,
            color: "violet",
            popular: true,
            teamSize: 3,
            duration: "2-4 weeks",
            features: solution?.tiers.standard.features.slice(0, 4) || ["Priority delivery", "Custom training", "Full API + Dashboard", "Priority support"],
        },
        {
            id: "premium",
            name: "Premium",
            description: solution?.tiers.premium.description || "Enterprise-grade with full customization",
            price: solution?.tiers.premium.price || "R250,000",
            icon: Rocket,
            color: "emerald",
            teamSize: 5,
            duration: "1-2 weeks",
            features: solution?.tiers.premium.features.slice(0, 4) || ["Express delivery", "Fully custom models", "Enterprise integrations", "Dedicated manager"],
        },
    ];
}

export default function NewProjectPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [requirements, setRequirements] = useState("");
    const [timeline, setTimeline] = useState("normal");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    const tiers = buildTiers(selectedSolution);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                setProfile(userDoc.data());
            }
        };
        fetchProfile();
    }, [user]);

    const handleSubmit = async () => {
        if (!user || !selectedSolution || !selectedTier) return;

        setIsSubmitting(true);
        try {
            const solution = solutions.find(s => s.id === selectedSolution);
            const tier = tiers.find(t => t.id === selectedTier);

            // Create project in Firestore
            // NOTE: Field names align with what admin/projects/page.tsx expects
            const projectData = {
                // IDs for backend to use
                client_id: user.uid,
                clientId: user.uid, // Admin page uses this format
                client_name: profile?.displayName || user.email?.split("@")[0] || "Client",
                client_email: user.email,
                clientEmail: user.email, // Admin page uses this format
                // Project details
                service_type: selectedSolution,
                solution: selectedSolution, // Admin page uses this format
                tier: selectedTier,
                required_skills: solution?.skills || [],
                requirements: requirements,
                timeline_preference: timeline,
                team_size: tier?.teamSize || 2,
                estimated_duration: tier?.duration || "4-6 weeks",
                // Organization info
                organization: {
                    name: profile?.company || profile?.displayName || "Unknown Organization",
                    industry: profile?.industry || "Technology",
                },
                // Brief for admin review
                brief: {
                    goal: requirements || "No specific requirements provided",
                    urgency: timeline === "urgent" ? "high" : timeline === "relaxed" ? "low" : "medium",
                    successMetric: "Successful implementation and deployment",
                },
                // Status
                status: "pending", // Will need admin approval
                createdAt: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            const docRef = await addDoc(collection(db, "projects"), projectData);
            console.log("Project created with ID:", docRef.id);

            // Redirect to dashboard with success message
            router.push("/dashboard?newProject=success");
        } catch (error) {
            console.error("Error creating project:", error);
            // Show error to user
            alert(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) return null;

    const getColorClasses = (color: string, isSelected: boolean) => {
        const colors: Record<string, { border: string; bg: string; icon: string }> = {
            cyan: {
                border: isSelected ? "border-cyan-500 ring-2 ring-cyan-500/30" : "border-white/10 hover:border-cyan-500/50",
                bg: "bg-cyan-500/20",
                icon: "text-cyan-400",
            },
            violet: {
                border: isSelected ? "border-violet-500 ring-2 ring-violet-500/30" : "border-white/10 hover:border-violet-500/50",
                bg: "bg-violet-500/20",
                icon: "text-violet-400",
            },
            emerald: {
                border: isSelected ? "border-emerald-500 ring-2 ring-emerald-500/30" : "border-white/10 hover:border-emerald-500/50",
                bg: "bg-emerald-500/20",
                icon: "text-emerald-400",
            },
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href="/dashboard"
                            className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Create New Project</h1>
                            <p className="text-slate-400">Step {step} of 3</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex-1">
                                    <div
                                        className={`h-2 rounded-full transition-all ${s <= step ? "bg-gradient-to-r from-cyan-500 to-violet-500" : "bg-white/10"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span className={step >= 1 ? "text-cyan-400" : ""}>Solution</span>
                            <span className={step >= 2 ? "text-cyan-400" : ""}>Tier</span>
                            <span className={step >= 3 ? "text-cyan-400" : ""}>Details</span>
                        </div>
                    </div>

                    {/* Step 1: Select Solution */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-4">Choose Your Solution</h2>
                            <div className="grid gap-4">
                                {solutions.map((solution) => {
                                    const Icon = solution.icon;
                                    const isSelected = selectedSolution === solution.id;
                                    const colors = getColorClasses(solution.color, isSelected);
                                    return (
                                        <button
                                            key={solution.id}
                                            onClick={() => setSelectedSolution(solution.id)}
                                            className={`p-6 bg-white/5 border ${colors.border} rounded-2xl text-left transition-all`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 ${colors.bg} rounded-xl`}>
                                                    <Icon size={24} className={colors.icon} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-white font-semibold">{solution.name}</h3>
                                                        {isSelected && (
                                                            <CheckCircle2 size={18} className="text-cyan-400" />
                                                        )}
                                                    </div>
                                                    <p className="text-slate-400 text-sm mb-3">{solution.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {solution.features.map((feature) => (
                                                            <span
                                                                key={feature}
                                                                className="px-2 py-1 bg-white/5 text-slate-400 text-xs rounded-lg"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Select Tier */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-4">Choose Your Tier</h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {tiers.map((tier) => {
                                    const Icon = tier.icon;
                                    const isSelected = selectedTier === tier.id;
                                    const colors = getColorClasses(tier.color, isSelected);
                                    return (
                                        <button
                                            key={tier.id}
                                            onClick={() => setSelectedTier(tier.id)}
                                            className={`relative p-6 bg-white/5 border ${colors.border} rounded-2xl text-left transition-all ${tier.popular ? "ring-1 ring-violet-500/50" : ""
                                                }`}
                                        >
                                            {tier.popular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                                                    Popular
                                                </div>
                                            )}
                                            <div className={`p-3 ${colors.bg} rounded-xl w-fit mb-4`}>
                                                <Icon size={24} className={colors.icon} />
                                            </div>
                                            <h3 className="text-white font-semibold mb-1">{tier.name}</h3>
                                            <p className="text-2xl font-bold text-white mb-2">{tier.price}</p>
                                            <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Users size={14} />
                                                    <span>{tier.teamSize} team members</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Clock size={14} />
                                                    <span>{tier.duration}</span>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-4 right-4">
                                                    <CheckCircle2 size={20} className="text-cyan-400" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Project Details */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-white mb-4">Project Details</h2>

                            {/* Summary */}
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                    <Sparkles size={16} className="text-cyan-400" />
                                    Project Summary
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500">Solution:</span>
                                        <p className="text-white capitalize">{selectedSolution?.replace("-", " ")}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">Tier:</span>
                                        <p className="text-white capitalize">{selectedTier}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    <FileText size={16} className="inline mr-2 text-cyan-400" />
                                    Project Requirements
                                </label>
                                <textarea
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    placeholder="Describe your specific requirements, goals, and any constraints..."
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                                />
                            </div>

                            {/* Timeline Preference */}
                            <div>
                                <label className="block text-white font-medium mb-3">
                                    <Clock size={16} className="inline mr-2 text-cyan-400" />
                                    Timeline Preference
                                </label>
                                <div className="flex gap-3">
                                    {[
                                        { id: "relaxed", label: "Relaxed", desc: "Flexible deadline" },
                                        { id: "normal", label: "Normal", desc: "Standard timeline" },
                                        { id: "urgent", label: "Urgent", desc: "ASAP delivery" },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setTimeline(option.id)}
                                            className={`flex-1 p-4 border rounded-xl text-center transition-all ${timeline === option.id
                                                ? "bg-cyan-500/20 border-cyan-500 text-white"
                                                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                                                }`}
                                        >
                                            <p className="font-medium">{option.label}</p>
                                            <p className="text-xs mt-1 opacity-70">{option.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                            >
                                <ArrowLeft size={18} />
                                Cancel
                            </Link>
                        )}

                        {step < 3 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                disabled={(step === 1 && !selectedSolution) || (step === 2 && !selectedTier)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-violet-400 transition-all"
                            >
                                Next
                                <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-medium disabled:opacity-50 hover:from-cyan-400 hover:to-violet-400 transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={18} />
                                        Create Project
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
