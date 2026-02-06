"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    Users,
    Briefcase,
    Target,
    Zap,
} from "lucide-react";

interface ProjectStats {
    total: number;
    inProgress: number;
    completed: number;
    averageProgress: number;
}

interface SkillStat {
    name: string;
    projects: number;
    percentage: number;
}

export default function AnalyticsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [projectStats, setProjectStats] = useState<ProjectStats>({
        total: 0,
        inProgress: 0,
        completed: 0,
        averageProgress: 0,
    });
    const [skillStats, setSkillStats] = useState<SkillStat[]>([]);
    const [timelineData, setTimelineData] = useState<number[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            const docRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                setProfile(snapshot.data());
            }
        };
        fetchProfile();

        const collabCollection = collection(db, "project_collaborations");

        const unsubscribe = onSnapshot(collabCollection, (snapshot) => {
            let total = 0;
            let inProgress = 0;
            let completed = 0;
            let totalProgress = 0;
            const skills: Record<string, number> = {};

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const isRelevant = data.client_id === user.uid ||
                    data.assigned_talent?.some((t: any) => t.talent_id === user.uid);

                if (isRelevant) {
                    total++;
                    totalProgress += data.overall_progress || 0;

                    if (data.status === "completed") {
                        completed++;
                    } else if (data.status === "in_progress") {
                        inProgress++;
                    }

                    // Track skills used
                    data.assigned_talent?.forEach((t: any) => {
                        if (t.talent_id === user.uid) {
                            t.skills_matched?.forEach((skill: string) => {
                                skills[skill] = (skills[skill] || 0) + 1;
                            });
                        }
                    });
                }
            });

            setProjectStats({
                total,
                inProgress,
                completed,
                averageProgress: total > 0 ? Math.round(totalProgress / total) : 0,
            });

            // Convert skills to stats
            const skillArray = Object.entries(skills)
                .map(([name, projects]) => ({
                    name,
                    projects,
                    percentage: Math.round((projects / total) * 100) || 0,
                }))
                .sort((a, b) => b.projects - a.projects)
                .slice(0, 5);

            setSkillStats(skillArray);

            // Mock timeline data (last 7 days activity)
            setTimelineData([30, 45, 60, 40, 70, 85, 65]);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading || !user) return null;

    const role = profile?.role || "talent";

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Analytics</h1>
                        <p className="text-slate-400">Track your project performance and metrics</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Briefcase size={20} className="text-cyan-400" />
                                </div>
                                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    +12%
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-white mb-1">{projectStats.total}</p>
                            <p className="text-slate-500 text-sm">Total Projects</p>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <Clock size={20} className="text-amber-400" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white mb-1">{projectStats.inProgress}</p>
                            <p className="text-slate-500 text-sm">In Progress</p>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <CheckCircle2 size={20} className="text-emerald-400" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white mb-1">{projectStats.completed}</p>
                            <p className="text-slate-500 text-sm">Completed</p>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-violet-500/20 rounded-lg">
                                    <Target size={20} className="text-violet-400" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white mb-1">{projectStats.averageProgress}%</p>
                            <p className="text-slate-500 text-sm">Avg Progress</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Activity Chart */}
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                                <BarChart3 size={18} className="text-cyan-400" />
                                Weekly Activity
                            </h3>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {timelineData.map((value, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-gradient-to-t from-cyan-500 to-violet-500 rounded-t-lg transition-all"
                                            style={{ height: `${value}%` }}
                                        />
                                        <span className="text-slate-500 text-xs">
                                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Used */}
                        {role === "talent" && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                                    <Zap size={18} className="text-violet-400" />
                                    Top Skills Used
                                </h3>
                                <div className="space-y-4">
                                    {skillStats.length > 0 ? skillStats.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white text-sm">{skill.name}</span>
                                                <span className="text-slate-400 text-sm">{skill.projects} projects</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                                    style={{ width: `${skill.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8">
                                            <Zap size={24} className="text-slate-600 mx-auto mb-2" />
                                            <p className="text-slate-500 text-sm">No skill data yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Client: Project Distribution */}
                        {role === "client" && (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                                    <Users size={18} className="text-violet-400" />
                                    Team Performance
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-slate-400 text-sm">On-time Delivery</span>
                                            <span className="text-emerald-400 font-medium">95%</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[95%]" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-slate-400 text-sm">Response Time</span>
                                            <span className="text-cyan-400 font-medium">~2 hrs</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-cyan-500 w-[85%]" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-slate-400 text-sm">Quality Score</span>
                                            <span className="text-violet-400 font-medium">4.8/5</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-violet-500 w-[96%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
