"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, getDoc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import {
    Search,
    Filter,
    Briefcase,
    Clock,
    Users,
    DollarSign,
    ChevronRight,
    CheckCircle2,
    CreditCard,
    Shield,
    Banknote,
    Zap,
    Crown,
    Rocket,
    Send,
    X,
    AlertCircle,
} from "lucide-react";

interface Project {
    id: string;
    client_id: string;
    client_name: string;
    service_type: string;
    tier: string;
    required_skills: string[];
    requirements?: string;
    status: string;
    team_size: number;
    estimated_duration: string;
    created_at: string;
    applicants?: string[];
}

const solutionIcons: Record<string, any> = {
    "credit-scoring": CreditCard,
    "fraud-detection": Shield,
    "payment-gateway": Banknote,
};

const tierIcons: Record<string, any> = {
    basic: Zap,
    standard: Crown,
    premium: Rocket,
};

const tierColors: Record<string, string> = {
    basic: "cyan",
    standard: "violet",
    premium: "emerald",
};

export default function BrowseProjectsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTier, setFilterTier] = useState<string>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [applying, setApplying] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState("");

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

    useEffect(() => {
        if (!user) return;

        // Fetch approved projects that are open for applications
        const projectsQuery = query(
            collection(db, "projects"),
            where("status", "in", ["approved", "open", "matching"])
        );

        const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
            const projectList: Project[] = [];
            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                // Don't show projects user has already applied to
                if (!data.applicants?.includes(user.uid)) {
                    projectList.push({
                        id: docSnap.id,
                        ...data,
                    } as Project);
                }
            });
            setProjects(projectList);
        });

        return () => unsubscribe();
    }, [user]);

    const handleApply = async () => {
        if (!user || !selectedProject) return;

        setApplying(true);
        try {
            // Add application to talent_applications collection
            await addDoc(collection(db, "talent_applications"), {
                project_id: selectedProject.id,
                talent_id: user.uid,
                talent_name: profile?.displayName || user.email?.split("@")[0],
                talent_email: user.email,
                talent_skills: profile?.skills || [],
                message: applicationMessage,
                status: "pending", // Pending admin approval
                applied_at: new Date().toISOString(),
            });

            // Update project with applicant
            await updateDoc(doc(db, "projects", selectedProject.id), {
                applicants: arrayUnion(user.uid),
            });

            setSelectedProject(null);
            setApplicationMessage("");
        } catch (error) {
            console.error("Error applying to project:", error);
        } finally {
            setApplying(false);
        }
    };

    if (loading || !user) return null;

    const filteredProjects = projects.filter((project) => {
        if (filterTier !== "all" && project.tier !== filterTier) return false;
        if (searchQuery) {
            const search = searchQuery.toLowerCase();
            return (
                project.service_type.toLowerCase().includes(search) ||
                project.client_name?.toLowerCase().includes(search) ||
                project.required_skills?.some((s) => s.toLowerCase().includes(search))
            );
        }
        return true;
    });

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string }> = {
            cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
            violet: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30" },
            emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Browse Projects</h1>
                        <p className="text-slate-400">Find and apply for projects that match your skills</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by solution, client, or skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "basic", "standard", "premium"].map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() => setFilterTier(tier)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterTier === tier
                                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {filteredProjects.map((project) => {
                                const SolutionIcon = solutionIcons[project.service_type] || Briefcase;
                                const TierIcon = tierIcons[project.tier] || Zap;
                                const color = tierColors[project.tier] || "cyan";
                                const colorClasses = getColorClasses(color);

                                return (
                                    <div
                                        key={project.id}
                                        className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all group"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 ${colorClasses.bg} rounded-xl`}>
                                                <SolutionIcon size={24} className={colorClasses.text} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold capitalize mb-1">
                                                    {project.service_type.replace("-", " ")}
                                                </h3>
                                                <p className="text-slate-400 text-sm">
                                                    by {project.client_name || "Client"}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.text} text-xs font-bold rounded-full border ${colorClasses.border} flex items-center gap-1`}
                                            >
                                                <TierIcon size={12} />
                                                {project.tier}
                                            </span>
                                        </div>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.required_skills?.slice(0, 4).map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 bg-white/5 text-slate-400 text-xs rounded-lg"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {project.required_skills?.length > 4 && (
                                                <span className="px-2 py-1 text-slate-500 text-xs">
                                                    +{project.required_skills.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Users size={14} />
                                                {project.team_size} members
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {project.estimated_duration}
                                            </span>
                                        </div>

                                        {/* Apply Button */}
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-violet-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Send size={16} />
                                            Apply Now
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Briefcase size={28} className="text-slate-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">No projects available</h3>
                            <p className="text-slate-400 text-sm">
                                New projects will appear here when clients post them
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Application Modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Apply to Project</h2>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl mb-4">
                                <h3 className="text-white font-medium capitalize mb-1">
                                    {selectedProject.service_type.replace("-", " ")}
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    {selectedProject.tier} tier • {selectedProject.team_size} team members
                                </p>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                <p className="text-amber-200 text-sm">
                                    Your application will be reviewed by our admin team. You'll be notified once a decision is made.
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <label className="block text-white font-medium mb-2">
                                Why are you a good fit? (Optional)
                            </label>
                            <textarea
                                value={applicationMessage}
                                onChange={(e) => setApplicationMessage(e.target.value)}
                                placeholder="Share your relevant experience, skills, or enthusiasm for this project..."
                                rows={4}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                            />
                        </div>

                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-medium hover:from-cyan-400 hover:to-violet-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {applying ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Applying...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={16} />
                                        Submit Application
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
