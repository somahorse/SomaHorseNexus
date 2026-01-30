"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    ArrowRight,
    ArrowLeft,
    Target,
    Database,
    Clock,
    TrendingUp,
    Upload,
    FileText,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const dataTypes = [
    { id: "transactions", label: "Transaction data" },
    { id: "customer", label: "Customer profiles" },
    { id: "historical", label: "Historical records" },
    { id: "thirdparty", label: "Third-party data sources" },
    { id: "realtime", label: "Real-time data feeds" },
    { id: "documents", label: "Document/PDF data" },
    { id: "none", label: "No data yet (need guidance)" },
];

const urgencyLevels = [
    { id: "low", label: "Low - 3+ months", description: "Flexible timeline, no rush" },
    { id: "medium", label: "Medium - 1-3 months", description: "Normal business priority" },
    { id: "high", label: "High - 2-4 weeks", description: "Urgent business need" },
    { id: "critical", label: "Critical - ASAP", description: "Business critical, immediate" },
];

export default function ClientOnboardingStep4() {
    const { user, refreshUserData } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        goal: "",
        dataAvailable: [] as string[],
        urgency: "",
        successMetric: "",
        additionalNotes: "",
    });

    const handleDataToggle = (dataId: string) => {
        setFormData((prev) => ({
            ...prev,
            dataAvailable: prev.dataAvailable.includes(dataId)
                ? prev.dataAvailable.filter((d) => d !== dataId)
                : [...prev.dataAvailable, dataId],
        }));
    };

    const handleSubmit = async () => {
        if (!user) return;

        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                projectBrief: {
                    goal: formData.goal,
                    dataAvailable: formData.dataAvailable,
                    urgency: formData.urgency,
                    successMetric: formData.successMetric,
                    additionalNotes: formData.additionalNotes,
                },
                clientOnboardingStep: 5,
                updatedAt: new Date().toISOString(),
            });

            await refreshUserData();
            router.push("/client/onboarding/step-5");
        } catch (error) {
            console.error("Error saving brief:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.goal && formData.dataAvailable.length > 0 && formData.urgency && formData.successMetric;

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
                        <span className="text-cyan-400 text-sm font-medium">Step 4 of 6</span>
                        <span className="text-slate-400 text-sm">Define the Problem</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[66.66%] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                <Target size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Define Your Problem</h1>
                                <p className="text-slate-400">Help us understand your needs</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Goal */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <Target size={16} className="text-cyan-400" />
                                    What do you want to improve? *
                                </label>
                                <textarea
                                    value={formData.goal}
                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                    placeholder="e.g., We want to reduce loan defaults by 30% using AI-powered credit scoring..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                                />
                            </div>

                            {/* Data Available */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <Database size={16} className="text-violet-400" />
                                    What data do you have? *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {dataTypes.map((data) => {
                                        const isSelected = formData.dataAvailable.includes(data.id);
                                        return (
                                            <button
                                                key={data.id}
                                                type="button"
                                                onClick={() => handleDataToggle(data.id)}
                                                className={`p-3 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-3 ${
                                                    isSelected
                                                        ? "bg-cyan-500/20 border-2 border-cyan-500 text-cyan-300"
                                                        : "bg-white/5 border-2 border-white/10 text-slate-400 hover:border-white/20"
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                                                    isSelected ? "bg-cyan-500" : "bg-white/10"
                                                }`}>
                                                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                                {data.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Urgency */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <Clock size={16} className="text-amber-400" />
                                    Timeline / Urgency *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {urgencyLevels.map((level) => {
                                        const isSelected = formData.urgency === level.id;
                                        return (
                                            <button
                                                key={level.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, urgency: level.id })}
                                                className={`p-4 rounded-xl text-left transition-all ${
                                                    isSelected
                                                        ? "bg-violet-500/20 border-2 border-violet-500"
                                                        : "bg-white/5 border-2 border-white/10 hover:border-white/20"
                                                }`}
                                            >
                                                <p className={`font-medium ${isSelected ? "text-violet-300" : "text-slate-300"}`}>
                                                    {level.label}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">{level.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Success Metric */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    Success Metric *
                                </label>
                                <input
                                    type="text"
                                    value={formData.successMetric}
                                    onChange={(e) => setFormData({ ...formData, successMetric: e.target.value })}
                                    placeholder="e.g., Reduce fraud by 40%, Increase approval rate by 25%..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                />
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                                    <FileText size={16} className="text-slate-400" />
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    value={formData.additionalNotes}
                                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                    placeholder="Any other details, constraints, or requirements..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                                />
                            </div>

                            {/* File Upload Placeholder */}
                            <div className="p-4 border-2 border-dashed border-white/10 rounded-xl text-center">
                                <Upload size={24} className="text-slate-500 mx-auto mb-2" />
                                <p className="text-slate-400 text-sm">File upload coming soon</p>
                                <p className="text-slate-500 text-xs mt-1">You'll be able to attach documents after submission</p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4 mt-8">
                            <button
                                onClick={() => router.push("/client/onboarding/step-3")}
                                className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                                className="flex-1 max-w-xs py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Review & Submit
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
