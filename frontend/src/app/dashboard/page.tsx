"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    Briefcase,
    CheckCircle2,
    Clock,
    Plus,
    Search,
    Bell,
    Settings,
    Lock,
    Code,
    Wallet,
    TrendingUp,
    Star,
    Award,
    Target,
    Zap,
    Users,
    FileText,
    ExternalLink,
    ChevronRight,
    Activity,
    Calendar,
    GitBranch,
    CircleDot
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
    const { user, loading, refreshUserData } = useAuth();
    const router = useRouter();
    const [profileLoading, setProfileLoading] = useState(true);
    const [profile, setProfile] = useState<Record<string, unknown> | null>(null);

    useEffect(() => {
        const hydrateProfile = async () => {
            if (!user) {
                setProfileLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    setProfile(snapshot.data());
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            }

            if ((user as any)?.onboardingStep === undefined && refreshUserData) {
                await refreshUserData();
            }

            setProfileLoading(false);
        };

        hydrateProfile();
    }, [user, refreshUserData]);

    if (loading || profileLoading) return null;

    if (!user) {
        router.replace("/login");
        return null;
    }

    // Get user role
    const role = (profile as any)?.role || (user as any)?.role;

    // Client Dashboard
    if (role === "client") {
        const displayName = (profile as any)?.displayName || (user as any)?.displayName || "Client";
        const email = (profile as any)?.email || user?.email || "client@example.com";
        const photoURL = (profile as any)?.photoURL || (user as any)?.photoURL;
        const organization = (profile as any)?.organization;
        const activeProjectId = (profile as any)?.activeProjectId;
        const createdAt = (profile as any)?.createdAt;
        const memberSince = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2025';

        return (
            <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
                <Sidebar />

                <main className="flex-1 lg:ml-72 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto h-screen">
                    {/* Top Header Bar */}
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <div className="relative flex-1 max-w-md hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                            />
                        </div>

                        <div className="flex items-center gap-3 ml-auto">
                            <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
                                <Bell size={18} />
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full border-2 border-slate-900"></span>
                            </button>
                            <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Welcome Hero Card */}
                    <div className="relative mb-8 rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20"></div>
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="relative p-6 lg:p-8 border border-white/10 rounded-3xl">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                <div className="relative">
                                    {photoURL ? (
                                        <img src={photoURL} alt={displayName} className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover ring-4 ring-white/20" />
                                    ) : (
                                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/20">
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-500 rounded-xl flex items-center justify-center border-4 border-slate-900">
                                        <Briefcase size={14} className="text-white" />
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h1 className="text-2xl lg:text-3xl font-bold text-white">Welcome, {displayName.split(' ')[0]}!</h1>
                                        <span className="px-3 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded-full border border-violet-500/30">
                                            Client
                                        </span>
                                    </div>
                                    <p className="text-slate-400 mb-2">{email} • Member since {memberSince}</p>
                                    {organization?.name && (
                                        <p className="text-slate-300 text-sm flex items-center gap-2">
                                            <Briefcase size={14} className="text-violet-400" />
                                            {organization.name} • {organization.industry}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center gap-2">
                                        <Plus size={18} />
                                        New Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Request Card */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FileText size={20} className="text-cyan-400" />
                                    Active Request
                                </h2>
                                {activeProjectId && (
                                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30 flex items-center gap-1.5">
                                        <CircleDot size={10} className="animate-pulse" />
                                        Pending Review
                                    </span>
                                )}
                            </div>

                            {activeProjectId ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <p className="text-slate-500 text-xs mb-1">Status</p>
                                            <p className="text-amber-400 font-semibold flex items-center gap-2">
                                                <Clock size={14} />
                                                Pending Review
                                            </p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <p className="text-slate-500 text-xs mb-1">Solution</p>
                                            <p className="text-white font-semibold">{(profile as any)?.selectedSolution || "AI Solution"}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <p className="text-slate-500 text-xs mb-1">Tier</p>
                                            <p className="text-white font-semibold capitalize">{(profile as any)?.selectedTier || "Standard"}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <p className="text-slate-500 text-xs mb-1">Timeline</p>
                                            <p className="text-white font-semibold capitalize">{(profile as any)?.projectBrief?.urgency || "Normal"}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm">
                                        Our team is reviewing your project request. You'll receive an update within 24-48 hours.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-2xl">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText size={28} className="text-slate-500" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">No active projects</h3>
                                    <p className="text-slate-400 text-sm mb-4">Start a new AI project request to get matched with verified talent</p>
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 mx-auto">
                                        <Plus size={18} />
                                        New Project Request
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* KPI Placeholders */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                                    <TrendingUp size={20} className="text-emerald-400" />
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">ROI Impact</p>
                                <p className="text-2xl font-bold text-white">--</p>
                                <p className="text-slate-500 text-xs mt-1">Pending project</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                                    <Zap size={20} className="text-cyan-400" />
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Efficiency Gains</p>
                                <p className="text-2xl font-bold text-white">--</p>
                                <p className="text-slate-500 text-xs mt-1">Pending project</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-violet-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3">
                                    <Users size={20} className="text-violet-400" />
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Talent Matched</p>
                                <p className="text-2xl font-bold text-white">0</p>
                                <p className="text-slate-500 text-xs mt-1">Awaiting match</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3">
                                    <Calendar size={20} className="text-amber-400" />
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Est. Delivery</p>
                                <p className="text-2xl font-bold text-white">--</p>
                                <p className="text-slate-500 text-xs mt-1">TBD</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Placeholder */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                        <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-violet-400" />
                                Project Timeline
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                    <div className="flex-1 p-4 bg-white/5 rounded-xl">
                                        <p className="text-white font-medium">Request Submitted</p>
                                        <p className="text-slate-500 text-sm">Your project request has been received</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 opacity-50">
                                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                                    <div className="flex-1 p-4 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 font-medium">Under Review</p>
                                        <p className="text-slate-500 text-sm">Team reviewing requirements</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 opacity-50">
                                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                                    <div className="flex-1 p-4 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 font-medium">Talent Matching</p>
                                        <p className="text-slate-500 text-sm">Finding the right experts</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 opacity-50">
                                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                                    <div className="flex-1 p-4 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 font-medium">In Progress</p>
                                        <p className="text-slate-500 text-sm">Development underway</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 opacity-50">
                                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                                    <div className="flex-1 p-4 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 font-medium">Delivered</p>
                                        <p className="text-slate-500 text-sm">Project completed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Check verification status - both tests must be passed (for talent)
    const onboardingStep = (profile as any)?.onboardingStep ?? (user as any)?.onboardingStep ?? 1;
    const aptitudePassed = (profile as any)?.aptitude?.passed === true || (user as any)?.aptitude?.passed === true;
    const codingPassed = (profile as any)?.coding?.passed === true || (user as any)?.coding?.passed === true;
    const aptitudeNextAttemptDate = (profile as any)?.aptitude?.nextAttemptDate as string | undefined;
    const codingNextAttemptDate = (profile as any)?.coding?.nextAttemptDate as string | undefined;
    const isFullyVerified = onboardingStep >= 4 && aptitudePassed && codingPassed;

    const getCooldownInfo = (nextAttemptDate?: string) => {
        if (!nextAttemptDate) return null;
        const nextDate = new Date(nextAttemptDate);
        const now = new Date();
        if (now >= nextDate) return null;
        const diffMs = nextDate.getTime() - now.getTime();
        const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return { daysRemaining, dateLabel: nextDate.toDateString() };
    };

    const aptitudeCooldown = getCooldownInfo(aptitudeNextAttemptDate);
    const codingCooldown = getCooldownInfo(codingNextAttemptDate);

    const statusConfig: {
        title: string;
        detail: ReactNode;
        actionLabel?: string;
        actionHref?: string;
        showAction?: boolean;
    } = (() => {
        if (onboardingStep <= 1) {
            return {
                title: "Profile not active",
                detail: "Finish Step 1 to activate your talent profile.",
                actionLabel: "Complete Step 1",
                actionHref: "/onboarding/step-1",
                showAction: true,
            };
        }

        if (onboardingStep === 2 || !aptitudePassed) {
            if (aptitudeCooldown) {
                return {
                    title: "Step 2 cooldown active",
                    detail: (
                        <span>
                            You can retry the aptitude assessment in{" "}
                            <span className="font-semibold text-indigo-600">{aptitudeCooldown.daysRemaining} day(s)</span>{" "}
                            on <span className="font-semibold text-slate-900">{aptitudeCooldown.dateLabel}</span>.
                        </span>
                    ),
                    showAction: false,
                };
            }
            return {
                title: "Step 2 incomplete",
                detail: "Complete the aptitude assessment to unlock Step 3.",
                actionLabel: "Start Aptitude Test",
                actionHref: "/assessments/aptitude",
                showAction: true,
            };
        }

        if (onboardingStep === 3 || !codingPassed) {
            if (codingCooldown) {
                return {
                    title: "Step 3 cooldown active",
                    detail: (
                        <span>
                            You can retry the coding challenge in{" "}
                            <span className="font-semibold text-indigo-600">{codingCooldown.daysRemaining} day(s)</span>{" "}
                            on <span className="font-semibold text-slate-900">{codingCooldown.dateLabel}</span>.
                        </span>
                    ),
                    showAction: false,
                };
            }
            return {
                title: "Step 3 incomplete",
                detail: "Complete the coding challenge to unlock your dashboard.",
                actionLabel: "Start Coding Challenge",
                actionHref: "/assessments/coding",
                showAction: true,
            };
        }

        return {
            title: "Verified and active",
            detail: "All steps completed. Your talent profile is fully unlocked.",
            actionLabel: "Explore projects",
            actionHref: "/dashboard",
            showAction: false,
        };
    })();

    // Locked State - Step 1 or Aptitude not completed
    if (onboardingStep <= 1 || !aptitudePassed) {
        return (
            <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
                <Sidebar />
                <main className="flex-1 lg:ml-72 p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12 text-center overflow-hidden relative">
                            {/* Decorative Gradient Top */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-violet-600"></div>

                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-50 to-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock size={40} className="text-violet-600" />
                            </div>

                            <h1 className="text-3xl font-black text-slate-900 mb-4">{statusConfig.title}</h1>
                            <p className="text-lg text-slate-600 max-w-lg mx-auto mb-8">
                                {statusConfig.detail}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                {statusConfig.showAction && statusConfig.actionHref && (
                                    <button
                                        onClick={() => router.push(statusConfig.actionHref)}
                                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
                                    >
                                        {statusConfig.actionLabel}
                                    </button>
                                )}
                                <button disabled className="px-8 py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                                    Browse Projects (Locked)
                                </button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="mt-10 pt-8 border-t border-slate-100">
                                <p className="text-sm text-slate-400 mb-4">Verification Progress</p>
                                <div className="flex justify-center gap-3">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${onboardingStep > 1 ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-500"}`}>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        Step 1
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${aptitudePassed ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-400"}`}>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        Step 2
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${codingPassed ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-400"}`}>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        Step 3
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blurred Preview */}
                        <div className="mt-8 opacity-30 blur-sm pointer-events-none select-none" aria-hidden="true">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="h-32 bg-gradient-to-br from-cyan-100 to-violet-100 rounded-2xl"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Locked State - Coding Test Not Passed (but aptitude passed)
    if (!codingPassed || onboardingStep === 3) {
        return (
            <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
                <Sidebar />
                <main className="flex-1 lg:ml-72 p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 lg:p-12 text-center overflow-hidden relative">
                            {/* Decorative Gradient Top */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-violet-600"></div>

                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-50 to-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Code size={40} className="text-cyan-600" />
                            </div>

                            <h1 className="text-3xl font-black text-slate-900 mb-4">{statusConfig.title}</h1>
                            <p className="text-lg text-slate-600 max-w-lg mx-auto mb-8">
                                {statusConfig.detail}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                {statusConfig.showAction && statusConfig.actionHref && (
                                    <button
                                        onClick={() => router.push(statusConfig.actionHref)}
                                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
                                    >
                                        {statusConfig.actionLabel}
                                    </button>
                                )}
                                <button disabled className="px-8 py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                                    Browse Projects (Locked)
                                </button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="mt-10 pt-8 border-t border-slate-100">
                                <p className="text-sm text-slate-400 mb-4">Verification Progress</p>
                                <div className="flex justify-center gap-3">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${onboardingStep > 1 ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-500"}`}>
                                        <CheckCircle2 size={18} />
                                        Step 1
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${aptitudePassed ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-500"}`}>
                                        <CheckCircle2 size={18} />
                                        Step 2
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-sm font-medium">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                                        Step 3
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blurred Preview */}
                        <div className="mt-8 opacity-30 blur-sm pointer-events-none select-none" aria-hidden="true">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="h-32 bg-gradient-to-br from-cyan-100 to-violet-100 rounded-2xl"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                                <div className="h-32 bg-white rounded-2xl shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // Extract real user data
    const displayName = (profile as any)?.displayName || (user as any)?.displayName || "Talent User";
    const email = (profile as any)?.email || user?.email || "user@example.com";
    const photoURL = (profile as any)?.photoURL || (user as any)?.photoURL;
    const aptitudeScore = (profile as any)?.aptitude?.score ?? (user as any)?.aptitude?.score ?? 0;
    const codingScore = (profile as any)?.coding?.score ?? (user as any)?.coding?.score ?? 0;
    const createdAt = (profile as any)?.createdAt;
    const memberSince = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2025';

    // Placeholder data for sections we don't have yet
    const totalEarnings = 0;
    const activeProjects = 0;
    const completedProjects = 0;
    const pendingProjects = 0;

    // Fully Verified Talent Dashboard
    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
            <Sidebar />

            <main className="flex-1 lg:ml-72 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto h-screen">
                {/* Top Header Bar */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    <div className="relative flex-1 max-w-md hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects, skills..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                        />
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
                            <Bell size={18} />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full border-2 border-slate-900"></span>
                        </button>
                        <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <Settings size={18} />
                        </button>
                    </div>
                </div>

                {/* Welcome Hero Card */}
                <div className="relative mb-8 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20"></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative p-6 lg:p-8 border border-white/10 rounded-3xl">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="relative">
                                {photoURL ? (
                                    <img src={photoURL} alt={displayName} className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover ring-4 ring-white/20" />
                                ) : (
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/20">
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center border-4 border-slate-900">
                                    <CheckCircle2 size={16} className="text-white" />
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-white">Welcome back, {displayName.split(' ')[0]}!</h1>
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                                        <CircleDot size={10} className="animate-pulse" />
                                        Verified & Active
                                    </span>
                                </div>
                                <p className="text-slate-400 mb-4">{email} • Member since {memberSince}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                                        <Award size={14} className="text-cyan-400" />
                                        Aptitude: {aptitudeScore}%
                                    </span>
                                    <span className="px-3 py-1.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                                        <Code size={14} className="text-violet-400" />
                                        Coding: {codingScore}%
                                    </span>
                                    <span className="px-3 py-1.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                                        <Target size={14} className="text-emerald-400" />
                                        Ready for Projects
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2">
                                    <Briefcase size={18} />
                                    Browse Projects
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Earnings Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                                <Wallet size={20} className="text-emerald-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Total Earnings</p>
                            <p className="text-2xl font-bold text-white">R{totalEarnings.toLocaleString()}</p>
                            <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                                <TrendingUp size={12} />
                                60% share on projects
                            </p>
                        </div>
                    </div>

                    {/* Active Projects Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                                <Activity size={20} className="text-cyan-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Active Projects</p>
                            <p className="text-2xl font-bold text-white">{activeProjects}</p>
                            <p className="text-cyan-400 text-xs mt-1 flex items-center gap-1">
                                <Zap size={12} />
                                In progress
                            </p>
                        </div>
                    </div>

                    {/* Completed Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-violet-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-violet-500/30 transition-all">
                            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3">
                                <CheckCircle2 size={20} className="text-violet-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Completed</p>
                            <p className="text-2xl font-bold text-white">{completedProjects}</p>
                            <p className="text-violet-400 text-xs mt-1 flex items-center gap-1">
                                <Star size={12} />
                                Delivered
                            </p>
                        </div>
                    </div>

                    {/* Pending Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3">
                                <Clock size={20} className="text-amber-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Pending Review</p>
                            <p className="text-2xl font-bold text-white">{pendingProjects}</p>
                            <p className="text-amber-400 text-xs mt-1 flex items-center gap-1">
                                <Calendar size={12} />
                                Awaiting match
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column - 2/3 */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Available Projects Section */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                            <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Briefcase size={20} className="text-cyan-400" />
                                            Available Projects
                                        </h2>
                                        <p className="text-slate-400 text-sm">AI solutions waiting for your expertise</p>
                                    </div>
                                    <button className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:text-cyan-300 transition-colors">
                                        View All <ChevronRight size={16} />
                                    </button>
                                </div>

                                {/* Empty State */}
                                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <FileText size={28} className="text-slate-500" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">No projects available yet</h3>
                                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                                        New AI projects from clients will appear here. Stay tuned for opportunities in Fintech, AgriTech, and more.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skills & Expertise */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                            <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Zap size={20} className="text-violet-400" />
                                        Your Skills & Expertise
                                    </h2>
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all flex items-center gap-2">
                                        <Plus size={16} />
                                        Add Skills
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl text-cyan-300 text-sm">Python</span>
                                    <span className="px-4 py-2 bg-gradient-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-xl text-violet-300 text-sm">Machine Learning</span>
                                    <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-300 text-sm">Data Analysis</span>
                                    <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-sm cursor-pointer hover:border-white/20 transition-all">+ Add more</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - 1/3 */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                            <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Target size={20} className="text-cyan-400" />
                                    Quick Actions
                                </h2>
                                <div className="space-y-3">
                                    <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-cyan-500/30 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FileText size={18} className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Update Portfolio</p>
                                                <p className="text-slate-400 text-xs">Showcase your best work</p>
                                            </div>
                                            <ExternalLink size={16} className="text-slate-500 ml-auto" />
                                        </div>
                                    </button>
                                    <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-violet-500/30 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <GitBranch size={18} className="text-violet-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Connect GitHub</p>
                                                <p className="text-slate-400 text-xs">Link your repositories</p>
                                            </div>
                                            <ExternalLink size={16} className="text-slate-500 ml-auto" />
                                        </div>
                                    </button>
                                    <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-emerald-500/30 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Users size={18} className="text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Join Community</p>
                                                <p className="text-slate-400 text-xs">Connect with other talents</p>
                                            </div>
                                            <ExternalLink size={16} className="text-slate-500 ml-auto" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Industry Focus */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                            <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-emerald-400" />
                                    Industry Focus
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <span className="text-slate-300 text-sm">Fintech</span>
                                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-lg">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl opacity-50">
                                        <span className="text-slate-400 text-sm">AgriTech</span>
                                        <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded-lg">Coming Soon</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl opacity-50">
                                        <span className="text-slate-400 text-sm">HealthTech</span>
                                        <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded-lg">Coming Soon</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
