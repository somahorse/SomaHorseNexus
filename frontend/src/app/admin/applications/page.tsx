"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Mail,
    Briefcase,
    Star,
    ChevronRight,
    Filter,
    AlertCircle,
} from "lucide-react";

interface TalentApplication {
    id: string;
    project_id: string;
    talent_id: string;
    talent_name: string;
    talent_email: string;
    talent_skills: string[];
    message?: string;
    status: "pending" | "approved" | "rejected";
    applied_at: string;
    project_service_type?: string;
    project_tier?: string;
}

export default function AdminApplicationsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [applications, setApplications] = useState<TalentApplication[]>([]);
    const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
    const [searchQuery, setSearchQuery] = useState("");
    const [processing, setProcessing] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const applicationsQuery = query(collection(db, "talent_applications"));

        const unsubscribe = onSnapshot(applicationsQuery, async (snapshot) => {
            const apps: TalentApplication[] = [];
            
            for (const docSnap of snapshot.docs) {
                const data = docSnap.data();
                
                // Fetch project details
                let projectDetails: any = {};
                try {
                    const projectDoc = await getDoc(doc(db, "projects", data.project_id));
                    if (projectDoc.exists()) {
                        projectDetails = projectDoc.data();
                    }
                } catch (e) {
                    console.error("Error fetching project:", e);
                }

                apps.push({
                    id: docSnap.id,
                    ...data,
                    project_service_type: projectDetails.service_type,
                    project_tier: projectDetails.tier,
                } as TalentApplication);
            }

            setApplications(apps);
        });

        return () => unsubscribe();
    }, [user]);

    const handleApprove = async (application: TalentApplication) => {
        setProcessing(application.id);
        try {
            // Update application status
            await updateDoc(doc(db, "talent_applications", application.id), {
                status: "approved",
                reviewed_at: new Date().toISOString(),
            });

            // Create collaboration entry for the talent
            const projectDoc = await getDoc(doc(db, "projects", application.project_id));
            if (projectDoc.exists()) {
                const projectData = projectDoc.data();

                // Check if collaboration already exists
                const collabQuery = query(
                    collection(db, "project_collaborations"),
                    where("project_id", "==", application.project_id)
                );

                // Add talent to the project collaboration
                await addDoc(collection(db, "project_collaborations"), {
                    project_id: application.project_id,
                    client_id: projectData.client_id,
                    client_name: projectData.client_name,
                    service_type: projectData.service_type,
                    tier: projectData.tier,
                    status: "in_progress",
                    overall_progress: 0,
                    assigned_talent: [{
                        talent_id: application.talent_id,
                        talent_name: application.talent_name,
                        talent_email: application.talent_email,
                        skills_matched: application.talent_skills,
                        match_score: 0,
                        status: "accepted",
                        assigned_via: "application",
                    }],
                    chat_messages: [],
                    clarification_questions: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });

                // Notify talent
                await addDoc(collection(db, "talent_notifications"), {
                    talent_id: application.talent_id,
                    type: "application_approved",
                    title: "Application Approved! 🎉",
                    message: `Your application for the ${projectData.service_type.replace("-", " ")} project has been approved. You can now start collaborating.`,
                    project_id: application.project_id,
                    read: false,
                    created_at: new Date().toISOString(),
                });
            }
        } catch (error) {
            console.error("Error approving application:", error);
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (application: TalentApplication) => {
        setProcessing(application.id);
        try {
            await updateDoc(doc(db, "talent_applications", application.id), {
                status: "rejected",
                reviewed_at: new Date().toISOString(),
            });

            // Notify talent
            await addDoc(collection(db, "talent_notifications"), {
                talent_id: application.talent_id,
                type: "application_rejected",
                title: "Application Update",
                message: `Your application for the ${application.project_service_type?.replace("-", " ") || "project"} has not been selected at this time.`,
                project_id: application.project_id,
                read: false,
                created_at: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error rejecting application:", error);
        } finally {
            setProcessing(null);
        }
    };

    if (loading || !user) return null;

    const filteredApplications = applications.filter((app) => {
        if (filter !== "all" && app.status !== filter) return false;
        if (searchQuery) {
            const search = searchQuery.toLowerCase();
            return (
                app.talent_name?.toLowerCase().includes(search) ||
                app.talent_email?.toLowerCase().includes(search) ||
                app.project_service_type?.toLowerCase().includes(search)
            );
        }
        return true;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <XCircle size={12} />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <Clock size={12} />
                        Pending
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <AdminSidebar />

            <main className="lg:ml-72 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Talent Applications</h1>
                        <p className="text-slate-400">Review and manage talent project applications</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <p className="text-slate-400 text-sm mb-1">Total</p>
                            <p className="text-2xl font-bold text-white">{applications.length}</p>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                            <p className="text-amber-400 text-sm mb-1">Pending</p>
                            <p className="text-2xl font-bold text-white">
                                {applications.filter((a) => a.status === "pending").length}
                            </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <p className="text-emerald-400 text-sm mb-1">Approved</p>
                            <p className="text-2xl font-bold text-white">
                                {applications.filter((a) => a.status === "approved").length}
                            </p>
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-400 text-sm mb-1">Rejected</p>
                            <p className="text-2xl font-bold text-white">
                                {applications.filter((a) => a.status === "rejected").length}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or project..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "pending", "approved", "rejected"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                        filter === f
                                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                    }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="space-y-4">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map((application) => (
                                <div
                                    key={application.id}
                                    className="p-5 bg-white/5 border border-white/10 rounded-2xl"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold">
                                                {application.talent_name?.charAt(0)?.toUpperCase() || "T"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-white font-semibold">
                                                        {application.talent_name}
                                                    </h3>
                                                    {getStatusBadge(application.status)}
                                                </div>
                                                <p className="text-slate-400 text-sm mb-2">
                                                    {application.talent_email}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                                    <span className="text-slate-500 flex items-center gap-1">
                                                        <Briefcase size={14} />
                                                        {application.project_service_type?.replace("-", " ") || "Project"}
                                                    </span>
                                                    <span className="text-slate-500 capitalize">
                                                        {application.project_tier} tier
                                                    </span>
                                                    <span className="text-slate-500">
                                                        Applied {new Date(application.applied_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {application.message && (
                                                    <p className="text-slate-400 text-sm mt-3 p-3 bg-white/5 rounded-lg">
                                                        "{application.message}"
                                                    </p>
                                                )}
                                                {application.talent_skills?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {application.talent_skills.slice(0, 5).map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-lg"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {application.status === "pending" && (
                                            <div className="flex gap-2 lg:flex-col">
                                                <button
                                                    onClick={() => handleApprove(application)}
                                                    disabled={processing === application.id}
                                                    className="flex-1 lg:flex-none px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium hover:bg-emerald-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {processing === application.id ? (
                                                        <div className="w-4 h-4 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                                                    ) : (
                                                        <CheckCircle2 size={16} />
                                                    )}
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(application)}
                                                    disabled={processing === application.id}
                                                    className="flex-1 lg:flex-none px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    <XCircle size={16} />
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle size={28} className="text-slate-500" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">No applications found</h3>
                                <p className="text-slate-400 text-sm">
                                    {filter !== "all"
                                        ? "Try changing your filter"
                                        : "Applications will appear here when talent apply to projects"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
