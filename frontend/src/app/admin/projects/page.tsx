"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    FolderKanban,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    Play,
    MoreVertical,
    Eye,
    Mail,
    DollarSign,
    Calendar,
    User,
    Building2,
    Zap,
    Crown,
    Rocket,
    AlertCircle,
} from "lucide-react";

interface Project {
    id: string;
    clientId: string;
    clientEmail: string;
    organization?: {
        name: string;
        industry: string;
    };
    solution: string;
    tier: string;
    status: string;
    brief?: {
        goal: string;
        urgency: string;
        successMetric: string;
    };
    createdAt: string;
    updatedAt?: string;
}

const solutionLabels: Record<string, string> = {
    "credit-scoring": "AI Credit Scoring",
    "fraud-detection": "Fraud Detection",
    "payment-gateway": "Unified Payment Gateway",
};

const tierConfig: Record<string, { label: string; icon: any; price: string; color: string }> = {
    basic: { label: "Basic", icon: Zap, price: "R25,000", color: "cyan" },
    standard: { label: "Standard", icon: Crown, price: "R75,000", color: "violet" },
    premium: { label: "Premium", icon: Rocket, price: "R150,000+", color: "emerald" },
};

export default function AdminProjectsPage() {
    const { user, loading } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;

            try {
                const projectsSnapshot = await getDocs(collection(db, "projects"));
                const projectsData = projectsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];

                // Sort by date
                projectsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setProjects(projectsData);
                setFilteredProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchProjects();
        }
    }, [user, loading]);

    useEffect(() => {
        let result = projects;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.clientEmail?.toLowerCase().includes(query) ||
                p.organization?.name?.toLowerCase().includes(query) ||
                p.solution?.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== "all") {
            result = result.filter(p => p.status === statusFilter);
        }

        setFilteredProjects(result);
    }, [searchQuery, statusFilter, projects]);

    const updateProjectStatus = async (projectId: string, newStatus: string) => {
        try {
            const project = projects.find(p => p.id === projectId);
            
            await updateDoc(doc(db, "projects", projectId), {
                status: newStatus,
                updatedAt: new Date().toISOString(),
            });

            // If approving, trigger auto-assignment of talent
            if (newStatus === "approved" && project) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/matching/auto-assign`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            project_id: projectId,
                            client_id: project.clientId,
                            client_name: project.organization?.name || project.clientEmail,
                            client_email: project.clientEmail,
                            service_type: project.solution,
                            tier: project.tier,
                        }),
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(`Auto-assigned ${data.assigned_count} talent to project`);
                        
                        // Update project status to in_progress after assignment
                        await updateDoc(doc(db, "projects", projectId), {
                            status: "in_progress",
                            collaborationId: data.collaboration_id,
                        });
                        
                        setProjects(projects.map(p => p.id === projectId ? { ...p, status: "in_progress" } : p));
                    }
                } catch (assignError) {
                    console.error("Error auto-assigning talent:", assignError);
                }
            }

            setProjects(projects.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "pending": return { label: "Pending Review", color: "amber", icon: Clock };
            case "approved": return { label: "Approved", color: "blue", icon: CheckCircle2 };
            case "in_progress": return { label: "In Progress", color: "violet", icon: Play };
            case "completed": return { label: "Completed", color: "emerald", icon: CheckCircle2 };
            case "declined": return { label: "Declined", color: "red", icon: XCircle };
            default: return { label: status, color: "slate", icon: AlertCircle };
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Stats
    const pendingCount = projects.filter(p => p.status === "pending").length;
    const approvedCount = projects.filter(p => p.status === "approved").length;
    const inProgressCount = projects.filter(p => p.status === "in_progress").length;
    const completedCount = projects.filter(p => p.status === "completed").length;

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 lg:ml-72 overflow-y-auto">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Project Requests</h1>
                    <p className="text-slate-400">Review and manage client project requests</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Clock size={24} className="text-amber-400" />
                            <div>
                                <p className="text-amber-400 text-xs font-medium">Pending</p>
                                <p className="text-2xl font-bold text-white">{pendingCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={24} className="text-blue-400" />
                            <div>
                                <p className="text-blue-400 text-xs font-medium">Approved</p>
                                <p className="text-2xl font-bold text-white">{approvedCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Play size={24} className="text-violet-400" />
                            <div>
                                <p className="text-violet-400 text-xs font-medium">In Progress</p>
                                <p className="text-2xl font-bold text-white">{inProgressCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={24} className="text-emerald-400" />
                            <div>
                                <p className="text-emerald-400 text-xs font-medium">Completed</p>
                                <p className="text-2xl font-bold text-white">{completedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by client, organization, or solution..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="declined">Declined</option>
                    </select>
                </div>

                {/* Projects List */}
                <div className="space-y-4">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 bg-white/5 rounded-2xl border border-white/10">
                            No projects found matching your criteria
                        </div>
                    ) : (
                        filteredProjects.map((project) => {
                            const status = getStatusConfig(project.status);
                            const StatusIcon = status.icon;
                            const tier = tierConfig[project.tier] || tierConfig.standard;
                            const TierIcon = tier.icon;

                            return (
                                <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        {/* Left Side */}
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                    tier.color === "cyan" ? "bg-cyan-500/20" :
                                                    tier.color === "violet" ? "bg-violet-500/20" :
                                                    "bg-emerald-500/20"
                                                }`}>
                                                    <TierIcon size={24} className={
                                                        tier.color === "cyan" ? "text-cyan-400" :
                                                        tier.color === "violet" ? "text-violet-400" :
                                                        "text-emerald-400"
                                                    } />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold text-lg">
                                                        {solutionLabels[project.solution] || project.solution || "AI Project"}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Building2 size={14} />
                                                            {project.organization?.name || "Unknown Org"}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User size={14} />
                                                            {project.clientEmail}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side */}
                                        <div className="flex items-center gap-4">
                                            {/* Tier Badge */}
                                            <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                                                tier.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                                                tier.color === "violet" ? "bg-violet-500/20 text-violet-400" :
                                                "bg-emerald-500/20 text-emerald-400"
                                            }`}>
                                                {tier.label} • {tier.price}
                                            </div>

                                            {/* Status Badge */}
                                            <div className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
                                                status.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                                                status.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                                                status.color === "violet" ? "bg-violet-500/20 text-violet-400" :
                                                status.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                                                status.color === "red" ? "bg-red-500/20 text-red-400" :
                                                "bg-slate-500/20 text-slate-400"
                                            }`}>
                                                <StatusIcon size={14} />
                                                {status.label}
                                            </div>

                                            {/* Actions */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActionMenuOpen(actionMenuOpen === project.id ? null : project.id)}
                                                    className="p-2 hover:bg-white/10 rounded-lg"
                                                >
                                                    <MoreVertical size={18} className="text-slate-400" />
                                                </button>

                                                {actionMenuOpen === project.id && (
                                                    <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-10 py-1">
                                                        <button
                                                            onClick={() => { setSelectedProject(project); setActionMenuOpen(null); }}
                                                            className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/10 flex items-center gap-2"
                                                        >
                                                            <Eye size={14} /> View Details
                                                        </button>
                                                        {project.status === "pending" && (
                                                            <>
                                                                <button
                                                                    onClick={() => updateProjectStatus(project.id, "approved")}
                                                                    className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-white/10 flex items-center gap-2"
                                                                >
                                                                    <CheckCircle2 size={14} /> Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => updateProjectStatus(project.id, "declined")}
                                                                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                                                                >
                                                                    <XCircle size={14} /> Decline
                                                                </button>
                                                            </>
                                                        )}
                                                        {project.status === "approved" && (
                                                            <button
                                                                onClick={() => updateProjectStatus(project.id, "in_progress")}
                                                                className="w-full px-4 py-2 text-left text-sm text-violet-400 hover:bg-white/10 flex items-center gap-2"
                                                            >
                                                                <Play size={14} /> Start Project
                                                            </button>
                                                        )}
                                                        {project.status === "in_progress" && (
                                                            <button
                                                                onClick={() => updateProjectStatus(project.id, "completed")}
                                                                className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-white/10 flex items-center gap-2"
                                                            >
                                                                <CheckCircle2 size={14} /> Mark Complete
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <Calendar size={14} /> {formatDate(project.createdAt)}
                                        </span>
                                        {project.brief?.urgency && (
                                            <span className={`px-2 py-0.5 rounded text-xs ${
                                                project.brief.urgency === "critical" ? "bg-red-500/20 text-red-400" :
                                                project.brief.urgency === "high" ? "bg-orange-500/20 text-orange-400" :
                                                project.brief.urgency === "medium" ? "bg-amber-500/20 text-amber-400" :
                                                "bg-slate-500/20 text-slate-400"
                                            }`}>
                                                {project.brief.urgency} priority
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Project Detail Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Project Details</h2>
                                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/10 rounded-lg">
                                    <XCircle size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Solution & Tier */}
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {solutionLabels[selectedProject.solution] || selectedProject.solution}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-sm ${
                                            tierConfig[selectedProject.tier]?.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                                            tierConfig[selectedProject.tier]?.color === "violet" ? "bg-violet-500/20 text-violet-400" :
                                            "bg-emerald-500/20 text-emerald-400"
                                        }`}>
                                            {tierConfig[selectedProject.tier]?.label} Tier
                                        </span>
                                        <span className="text-white font-semibold">{tierConfig[selectedProject.tier]?.price}</span>
                                    </div>
                                </div>

                                {/* Client Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 text-xs mb-1">Organization</p>
                                        <p className="text-white font-medium">{selectedProject.organization?.name || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 text-xs mb-1">Industry</p>
                                        <p className="text-white font-medium">{selectedProject.organization?.industry || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl col-span-2">
                                        <p className="text-slate-400 text-xs mb-1">Client Email</p>
                                        <p className="text-white font-medium">{selectedProject.clientEmail}</p>
                                    </div>
                                </div>

                                {/* Brief */}
                                {selectedProject.brief && (
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-3">Project Brief</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-slate-400 text-xs mb-1">Goal</p>
                                                <p className="text-white text-sm">{selectedProject.brief.goal}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-xs mb-1">Success Metric</p>
                                                <p className="text-white text-sm">{selectedProject.brief.successMetric}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-xs mb-1">Urgency</p>
                                                <p className="text-white text-sm capitalize">{selectedProject.brief.urgency}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Status & Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 text-xs mb-1">Status</p>
                                        <p className={`font-medium capitalize ${
                                            selectedProject.status === "pending" ? "text-amber-400" :
                                            selectedProject.status === "approved" ? "text-blue-400" :
                                            selectedProject.status === "in_progress" ? "text-violet-400" :
                                            selectedProject.status === "completed" ? "text-emerald-400" :
                                            "text-red-400"
                                        }`}>{selectedProject.status.replace("_", " ")}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-slate-400 text-xs mb-1">Submitted</p>
                                        <p className="text-white font-medium">{formatDate(selectedProject.createdAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="flex-1 py-2.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                                >
                                    Close
                                </button>
                                {selectedProject.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => { updateProjectStatus(selectedProject.id, "approved"); setSelectedProject(null); }}
                                            className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={16} /> Approve
                                        </button>
                                        <button
                                            onClick={() => { updateProjectStatus(selectedProject.id, "declined"); setSelectedProject(null); }}
                                            className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={16} /> Decline
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}
