"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    Users,
    UserCheck,
    FolderKanban,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Zap,
    DollarSign,
    Eye,
} from "lucide-react";
import Link from "next/link";

interface UserStats {
    total: number;
    talent: number;
    clients: number;
    newThisWeek: number;
}

interface TalentStats {
    verified: number;
    pending: number;
    suspended: number;
}

interface ProjectStats {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
}

interface RecentUser {
    uid: string;
    displayName: string;
    email: string;
    role: string;
    createdAt: string;
    photoURL?: string;
}

interface RecentProject {
    id: string;
    clientEmail: string;
    solution: string;
    tier: string;
    status: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userStats, setUserStats] = useState<UserStats>({ total: 0, talent: 0, clients: 0, newThisWeek: 0 });
    const [talentStats, setTalentStats] = useState<TalentStats>({ verified: 0, pending: 0, suspended: 0 });
    const [projectStats, setProjectStats] = useState<ProjectStats>({ total: 0, pending: 0, inProgress: 0, completed: 0 });
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;

            try {
                // Fetch all users
                const usersSnapshot = await getDocs(collection(db, "users"));
                const users = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));

                // Calculate user stats
                const talent = users.filter((u: any) => u.role === "talent");
                const clients = users.filter((u: any) => u.role === "client");
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const newThisWeek = users.filter((u: any) =>
                    u.createdAt && new Date(u.createdAt) > oneWeekAgo
                ).length;

                setUserStats({
                    total: users.length,
                    talent: talent.length,
                    clients: clients.length,
                    newThisWeek,
                });

                // Calculate talent stats
                const verified = talent.filter((t: any) =>
                    t.aptitude?.passed === true && t.coding?.passed === true
                ).length;
                const suspended = talent.filter((t: any) => t.status === "suspended").length;
                const pending = talent.length - verified - suspended;

                setTalentStats({ verified, pending, suspended });

                // Fetch projects
                const projectsSnapshot = await getDocs(collection(db, "projects"));
                const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const pendingProjects = projects.filter((p: any) => p.status === "pending").length;
                const inProgress = projects.filter((p: any) => p.status === "in_progress").length;
                const completed = projects.filter((p: any) => p.status === "completed").length;

                setProjectStats({
                    total: projects.length,
                    pending: pendingProjects,
                    inProgress,
                    completed,
                });

                // Get recent users (last 5)
                const sortedUsers = users
                    .filter((u: any) => u.createdAt)
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                setRecentUsers(sortedUsers as RecentUser[]);

                // Get recent projects (last 5)
                const sortedProjects = projects
                    .filter((p: any) => p.createdAt)
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                setRecentProjects(sortedProjects as RecentProject[]);

            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchStats();
        }
    }, [user, loading]);

    if (loading || isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 lg:ml-72 overflow-y-auto">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Admin Overview</h1>
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                                Beta
                            </span>
                        </div>
                        <p className="text-slate-400">Platform statistics and recent activity</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Total Users */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        <Users size={20} className="text-blue-400" />
                                    </div>
                                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                                        <ArrowUpRight size={12} />
                                        +{userStats.newThisWeek}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Total Users</p>
                                <p className="text-2xl font-bold text-white">{userStats.total}</p>
                            </div>
                        </div>

                        {/* Verified Talent */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                        <UserCheck size={20} className="text-emerald-400" />
                                    </div>
                                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                                        <CheckCircle2 size={12} />
                                        Verified
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Verified Talent</p>
                                <p className="text-2xl font-bold text-white">{talentStats.verified}</p>
                            </div>
                        </div>

                        {/* Active Projects */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-violet-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                        <FolderKanban size={20} className="text-violet-400" />
                                    </div>
                                    <span className="text-xs text-amber-400 flex items-center gap-1">
                                        <Clock size={12} />
                                        {projectStats.pending} pending
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Total Projects</p>
                                <p className="text-2xl font-bold text-white">{projectStats.total}</p>
                            </div>
                        </div>

                        {/* Pending Reviews */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                            <div className="relative p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                        <AlertCircle size={20} className="text-amber-400" />
                                    </div>
                                    <span className="text-xs text-amber-400 flex items-center gap-1">
                                        <Activity size={12} />
                                        Action needed
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs font-medium mb-1">Pending Talent</p>
                                <p className="text-2xl font-bold text-white">{talentStats.pending}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                <Zap size={24} className="text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Talent Pool</p>
                                <p className="text-xl font-bold text-white">{userStats.talent}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center">
                                <Users size={24} className="text-fuchsia-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Clients</p>
                                <p className="text-xl font-bold text-white">{userStats.clients}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <XCircle size={24} className="text-red-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Suspended</p>
                                <p className="text-xl font-bold text-white">{talentStats.suspended}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Users */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Users size={20} className="text-blue-400" />
                                    Recent Users
                                </h2>
                                <Link href="/admin/users" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                    View all <ArrowUpRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentUsers.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-8">No users yet</p>
                                ) : (
                                    recentUsers.map((u) => (
                                        <div key={u.uid} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                            {u.photoURL ? (
                                                <img src={u.photoURL} alt={u.displayName} className="w-10 h-10 rounded-lg object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                    {u.displayName?.charAt(0) || u.email?.charAt(0) || "?"}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{u.displayName || "No name"}</p>
                                                <p className="text-slate-500 text-xs truncate">{u.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 text-xs rounded-full ${u.role === "talent" ? "bg-cyan-500/20 text-cyan-400" :
                                                        u.role === "client" ? "bg-violet-500/20 text-violet-400" :
                                                            "bg-orange-500/20 text-orange-400"
                                                    }`}>
                                                    {u.role}
                                                </span>
                                                <p className="text-slate-500 text-xs mt-1">{formatDate(u.createdAt)}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Recent Projects */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FolderKanban size={20} className="text-violet-400" />
                                    Recent Projects
                                </h2>
                                <Link href="/admin/projects" className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
                                    View all <ArrowUpRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentProjects.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-8">No projects yet</p>
                                ) : (
                                    recentProjects.map((p) => (
                                        <div key={p.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                            <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                                                <FolderKanban size={18} className="text-violet-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{p.solution || "AI Project"}</p>
                                                <p className="text-slate-500 text-xs truncate">{p.clientEmail}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 text-xs rounded-full ${p.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                                                        p.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                                                            p.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                                                                "bg-slate-500/20 text-slate-400"
                                                    }`}>
                                                    {p.status}
                                                </span>
                                                <p className="text-slate-500 text-xs mt-1 capitalize">{p.tier}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
