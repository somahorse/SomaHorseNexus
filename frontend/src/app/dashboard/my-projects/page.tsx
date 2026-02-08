"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    FolderKanban,
    Search,
    Filter,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    Users,
    Calendar,
    ChevronRight,
    Briefcase,
    Code,
    TrendingUp,
    FileText,
    ArrowUpRight,
    Loader2,
    CircleDot,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, getDoc, collection, onSnapshot, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ProjectCollaboration {
    _id: string;
    project_id: string;
    client_id: string;
    client_name: string;
    service_type: string;
    tier: string;
    estimated_duration_days: number;
    deadline?: string;
    assigned_talent: Array<{
        talent_id: string;
        talent_name: string;
        skills_matched: string[];
        match_score: number;
        status: string;
    }>;
    overall_progress: number;
    status: string;
    created_at: string;
}

type FilterStatus = "all" | "pending" | "in_progress" | "completed";

export default function MyProjectsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
    const [collaborations, setCollaborations] = useState<ProjectCollaboration[]>([]);
    const [clientProjects, setClientProjects] = useState<any[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

    // Fetch profile
    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    setProfile(snapshot.data());
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        fetchProfile();
    }, [user]);

    // Fetch collaborations - use role from AuthContext user (already merged with Firestore)
    useEffect(() => {
        if (!user) return;

        const role = (user as any)?.role || (profile as any)?.role;
        if (!role) {
            // Role not hydrated yet, wait
            return;
        }

        const collabCollection = collection(db, "project_collaborations");

        const unsubscribe = onSnapshot(collabCollection, (snapshot) => {
            const collabs: ProjectCollaboration[] = [];
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                if (role === "client" && data.client_id === user.uid) {
                    collabs.push({ _id: docSnap.id, ...data } as ProjectCollaboration);
                } else if (role === "talent") {
                    const isAssigned = data.assigned_talent?.some(
                        (t: any) => t.talent_id === user.uid
                    );
                    if (isAssigned) {
                        collabs.push({ _id: docSnap.id, ...data } as ProjectCollaboration);
                    }
                }
            });
            // Sort by most recent first
            collabs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setCollaborations(collabs);
            setProjectsLoading(false);
        }, (error) => {
            console.error("Error fetching collaborations:", error);
            setProjectsLoading(false);
        });

        // For clients: also fetch their submitted projects from the projects collection
        if (role === "client") {
            const fetchClientProjects = async () => {
                try {
                    const q = query(collection(db, "projects"), where("clientId", "==", user.uid));
                    const snapshot = await getDocs(q);
                    const projects: any[] = [];
                    snapshot.forEach((docSnap) => {
                        projects.push({ id: docSnap.id, ...docSnap.data() });
                    });
                    projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setClientProjects(projects);
                } catch (err) {
                    console.error("Error fetching client projects:", err);
                }
            };
            fetchClientProjects();
        }

        return () => unsubscribe();
    }, [user, profile]);

    if (loading) return null;

    if (!user) {
        router.replace("/login");
        return null;
    }

    const role = (profile as any)?.role || (user as any)?.role;
    const isClient = role === "client";

    // Filter and search
    const filteredProjects = collaborations.filter((collab) => {
        const matchesSearch =
            searchQuery === "" ||
            collab.service_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            collab.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            collab.assigned_talent.some((t) =>
                t.talent_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesFilter =
            filterStatus === "all" || collab.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Client projects that don't yet have a collaboration (pending/approved in projects collection)
    const standAloneClientProjects = isClient
        ? clientProjects.filter((p) => !collaborations.some((c) => c.project_id === p.id))
        : [];

    // Stats — combine collaborations + standalone client projects
    const totalProjects = collaborations.length + standAloneClientProjects.length;
    const activeCount = collaborations.filter((c) => c.status === "in_progress").length;
    const pendingCount = collaborations.filter((c) => c.status === "pending").length + standAloneClientProjects.filter((p) => p.status === "pending" || p.status === "approved").length;
    const completedCount = collaborations.filter((c) => c.status === "completed").length;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 size={12} />
                        Completed
                    </span>
                );
            case "in_progress":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        <CircleDot size={12} className="animate-pulse" />
                        In Progress
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Clock size={12} />
                        Pending
                    </span>
                );
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                            <FolderKanban size={28} className="text-cyan-400" />
                            My Projects
                        </h1>
                        <p className="text-slate-400 mt-1">
                            {isClient
                                ? "Track and manage all your project requests"
                                : "View projects you're assigned to"}
                        </p>
                    </div>

                    {isClient && (
                        <Link
                            href="/dashboard/new-project"
                            className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center gap-2 w-fit"
                        >
                            <Plus size={18} />
                            New Project
                        </Link>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                                <FolderKanban size={20} className="text-cyan-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Total Projects</p>
                            <p className="text-2xl font-bold text-white">{totalProjects}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                                <TrendingUp size={20} className="text-blue-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">In Progress</p>
                            <p className="text-2xl font-bold text-white">{activeCount}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3">
                                <Clock size={20} className="text-amber-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Pending</p>
                            <p className="text-2xl font-bold text-white">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                                <CheckCircle2 size={20} className="text-emerald-400" />
                            </div>
                            <p className="text-slate-400 text-xs font-medium mb-1">Completed</p>
                            <p className="text-2xl font-bold text-white">{completedCount}</p>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects by name, type, or team member..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "in_progress", "pending", "completed"] as FilterStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === status
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {status === "all"
                                    ? "All"
                                    : status === "in_progress"
                                    ? "Active"
                                    : status === "pending"
                                    ? "Pending"
                                    : "Completed"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects List */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                        {projectsLoading ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <Loader2 size={32} className="text-cyan-400 animate-spin" />
                                <p className="text-slate-400 text-sm">Loading your projects...</p>
                            </div>
                        ) : filteredProjects.length > 0 ? (
                            <div className="space-y-4">
                                {filteredProjects.map((collab) => {
                                    const myAssignment = !isClient
                                        ? collab.assigned_talent.find((t) => t.talent_id === user?.uid)
                                        : null;
                                    const isPendingAccept = myAssignment?.status === "pending";

                                    return (
                                        <Link
                                            key={collab._id}
                                            href={`/projects/${collab._id}`}
                                            className={`block p-5 rounded-2xl border transition-all group hover:shadow-lg hover:shadow-black/20 ${
                                                isPendingAccept
                                                    ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-400"
                                                    : "bg-white/5 border-white/10 hover:border-cyan-500/30"
                                            }`}
                                        >
                                            {/* Pending accept banner for talent */}
                                            {isPendingAccept && (
                                                <div className="flex items-center gap-2 mb-4 p-3 bg-amber-500/10 rounded-xl text-amber-400 text-sm font-medium">
                                                    <AlertCircle size={16} />
                                                    Action Required: Accept this assignment
                                                </div>
                                            )}

                                            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                                {/* Project Icon */}
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center shrink-0">
                                                    {isClient ? (
                                                        <Briefcase size={22} className="text-violet-400" />
                                                    ) : (
                                                        <Code size={22} className="text-cyan-400" />
                                                    )}
                                                </div>

                                                {/* Project Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                                        <h3 className="text-white font-semibold text-lg capitalize">
                                                            {collab.service_type.replace(/-/g, " ")} Project
                                                        </h3>
                                                        {getStatusBadge(collab.status)}
                                                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 capitalize">
                                                            {collab.tier} tier
                                                        </span>
                                                    </div>

                                                    {/* Meta info */}
                                                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 mb-4">
                                                        {isClient ? (
                                                            <span className="flex items-center gap-1.5">
                                                                <Users size={14} className="text-slate-500" />
                                                                {collab.assigned_talent.length} team member{collab.assigned_talent.length !== 1 ? "s" : ""}
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1.5">
                                                                <Briefcase size={14} className="text-slate-500" />
                                                                Client: {collab.client_name}
                                                            </span>
                                                        )}
                                                        {collab.deadline && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Calendar size={14} className="text-amber-400" />
                                                                Deadline: {new Date(collab.deadline).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-slate-500" />
                                                            Created: {new Date(collab.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mb-4">
                                                        <div className="flex justify-between text-xs mb-1.5">
                                                            <span className="text-slate-400">Overall Progress</span>
                                                            <span className="text-white font-semibold">{collab.overall_progress}%</span>
                                                        </div>
                                                        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full transition-all duration-500 ${
                                                                    collab.overall_progress === 100
                                                                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                                        : "bg-gradient-to-r from-cyan-500 to-violet-500"
                                                                }`}
                                                                style={{ width: `${collab.overall_progress}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Team Members (Client view) */}
                                                    {isClient && collab.assigned_talent.length > 0 && (
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-500 text-xs">Team:</span>
                                                            <div className="flex -space-x-2">
                                                                {collab.assigned_talent.slice(0, 5).map((talent, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-800"
                                                                        title={talent.talent_name}
                                                                    >
                                                                        {talent.talent_name.charAt(0)}
                                                                    </div>
                                                                ))}
                                                                {collab.assigned_talent.length > 5 && (
                                                                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs border-2 border-slate-800">
                                                                        +{collab.assigned_talent.length - 5}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 ml-2">
                                                                {collab.assigned_talent.slice(0, 2).map((t, i) => (
                                                                    <span key={i} className="text-slate-400 text-xs">
                                                                        {t.talent_name}{i < Math.min(collab.assigned_talent.length, 2) - 1 ? "," : ""}
                                                                    </span>
                                                                ))}
                                                                {collab.assigned_talent.length > 2 && (
                                                                    <span className="text-slate-500 text-xs">
                                                                        and {collab.assigned_talent.length - 2} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Skills Matched (Talent view) */}
                                                    {!isClient && myAssignment && (
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {myAssignment.skills_matched.slice(0, 4).map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="px-2.5 py-1 bg-cyan-500/15 text-cyan-400 text-xs rounded-lg border border-cyan-500/20"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                            {myAssignment.skills_matched.length > 4 && (
                                                                <span className="px-2.5 py-1 bg-white/5 text-slate-400 text-xs rounded-lg">
                                                                    +{myAssignment.skills_matched.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Arrow */}
                                                <div className="hidden lg:flex items-center self-center">
                                                    <div className="p-2 rounded-xl bg-white/5 text-slate-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
                                                        <ArrowUpRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : standAloneClientProjects.length > 0 && !searchQuery && filterStatus === "all" ? (
                            /* Show client's submitted projects from projects collection */
                            <div className="space-y-4">
                                {standAloneClientProjects.map((project) => {
                                    const statusMap: Record<string, { label: string; color: string }> = {
                                        pending: { label: "Under Review", color: "amber" },
                                        approved: { label: "Approved — Matching Talent", color: "blue" },
                                        in_progress: { label: "In Progress", color: "cyan" },
                                        completed: { label: "Completed", color: "emerald" },
                                        declined: { label: "Declined", color: "red" },
                                    };
                                    const st = statusMap[project.status] || statusMap.pending;

                                    return (
                                        <div key={project.id} className={`p-5 rounded-2xl border ${
                                            st.color === "amber" ? "bg-amber-500/10 border-amber-500/30" :
                                            st.color === "blue" ? "bg-blue-500/10 border-blue-500/30" :
                                            st.color === "red" ? "bg-red-500/10 border-red-500/30" :
                                            "bg-white/5 border-white/10"
                                        }`}>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center shrink-0">
                                                    <Briefcase size={22} className={`${
                                                        st.color === "amber" ? "text-amber-400" :
                                                        st.color === "blue" ? "text-blue-400" :
                                                        st.color === "red" ? "text-red-400" :
                                                        "text-cyan-400"
                                                    }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                                        <h3 className="text-white font-semibold text-lg capitalize">
                                                            {project.solution?.replace(/-/g, " ") || "AI"} Project
                                                        </h3>
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                                                            st.color === "amber" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                                                            st.color === "blue" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                                                            st.color === "red" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                                            st.color === "emerald" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                                                            "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                                        }`}>
                                                            <Clock size={12} />
                                                            {st.label}
                                                        </span>
                                                        {project.tier && (
                                                            <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 capitalize">
                                                                {project.tier} tier
                                                            </span>
                                                        )}
                                                    </div>
                                                    {project.brief?.goal && (
                                                        <p className="text-slate-400 text-sm mb-3">{project.brief.goal}</p>
                                                    )}
                                                    {!project.brief?.goal && (
                                                        <p className="text-slate-400 text-sm mb-3">
                                                            Your project has been submitted and is pending admin review.
                                                        </p>
                                                    )}
                                                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                                                        {project.organization?.name && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Briefcase size={14} className="text-slate-500" />
                                                                {project.organization.name}
                                                            </span>
                                                        )}
                                                        {project.createdAt && (
                                                            <span className="flex items-center gap-1.5">
                                                                <Calendar size={14} className="text-slate-500" />
                                                                Submitted: {new Date(project.createdAt).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="text-center pt-4">
                                    <Link
                                        href="/dashboard/new-project"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all"
                                    >
                                        <Plus size={16} />
                                        Submit Another Project
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            /* True empty state */
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <FileText size={36} className="text-slate-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {searchQuery || filterStatus !== "all"
                                        ? "No projects match your filters"
                                        : "No projects yet"}
                                </h3>
                                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                                    {isClient
                                        ? searchQuery || filterStatus !== "all"
                                            ? "Try adjusting your search or filter criteria."
                                            : "Start a new project request to get matched with verified talent from our network."
                                        : searchQuery || filterStatus !== "all"
                                        ? "Try adjusting your search or filter criteria."
                                        : "When clients need your skills, you'll be automatically matched and notified here."}
                                </p>
                                {isClient && !searchQuery && filterStatus === "all" && (
                                    <Link
                                        href="/dashboard/new-project"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-400 hover:to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
                                    >
                                        <Plus size={18} />
                                        Create Your First Project
                                    </Link>
                                )}
                                {(searchQuery || filterStatus !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setFilterStatus("all");
                                        }}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
