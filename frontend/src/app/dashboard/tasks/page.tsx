"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import {
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    Calendar,
    Users,
    ChevronRight,
    Filter,
    Search,
    Plus,
} from "lucide-react";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate?: string;
    projectId?: string;
    projectName?: string;
    assignedTo?: string;
    createdAt: string;
}

interface ProjectCollaboration {
    _id: string;
    service_type: string;
    status: string;
    overall_progress: number;
    assigned_talent: Array<{
        talent_id: string;
        status: string;
    }>;
}

export default function TasksPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [collaborations, setCollaborations] = useState<ProjectCollaboration[]>([]);
    const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        // Fetch collaborations and generate tasks from them
        const collabCollection = collection(db, "project_collaborations");

        const unsubscribe = onSnapshot(collabCollection, (snapshot) => {
            const collabs: ProjectCollaboration[] = [];
            const generatedTasks: Task[] = [];

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const isRelevant = data.client_id === user.uid ||
                    data.assigned_talent?.some((t: any) => t.talent_id === user.uid);

                if (isRelevant) {
                    collabs.push({ _id: docSnap.id, ...data } as ProjectCollaboration);

                    // Generate tasks from collaboration
                    const myAssignment = data.assigned_talent?.find((t: any) => t.talent_id === user.uid);

                    if (myAssignment?.status === "pending") {
                        generatedTasks.push({
                            id: `accept-${docSnap.id}`,
                            title: `Accept Assignment: ${data.service_type.replace("-", " ")} Project`,
                            description: "Review and accept your project assignment to start working.",
                            status: "pending",
                            priority: "high",
                            projectId: docSnap.id,
                            projectName: data.service_type,
                            createdAt: data.created_at,
                        });
                    }

                    if (data.status === "in_progress" && data.overall_progress < 100) {
                        generatedTasks.push({
                            id: `progress-${docSnap.id}`,
                            title: `Update Progress: ${data.service_type.replace("-", " ")} Project`,
                            description: `Current progress: ${data.overall_progress}%. Keep the client updated.`,
                            status: "in_progress",
                            priority: "medium",
                            projectId: docSnap.id,
                            projectName: data.service_type,
                            createdAt: data.created_at,
                        });
                    }

                    // Check for unanswered questions
                    const unansweredQuestions = data.clarification_questions?.filter((q: any) => !q.answer);
                    if (unansweredQuestions?.length > 0 && data.client_id === user.uid) {
                        generatedTasks.push({
                            id: `qa-${docSnap.id}`,
                            title: `Answer Questions: ${data.service_type.replace("-", " ")} Project`,
                            description: `${unansweredQuestions.length} question(s) from your team need answers.`,
                            status: "pending",
                            priority: "high",
                            projectId: docSnap.id,
                            projectName: data.service_type,
                            createdAt: data.created_at,
                        });
                    }
                }
            });

            setCollaborations(collabs);
            setTasks(generatedTasks);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading || !user) return null;

    const filteredTasks = tasks.filter(task => {
        if (filter !== "all" && task.status !== filter) return false;
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <CheckCircle2 size={18} className="text-emerald-400" />;
            case "in_progress": return <Clock size={18} className="text-cyan-400" />;
            default: return <Circle size={18} className="text-amber-400" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
            case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
            default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Tasks</h1>
                        <p className="text-slate-400">Manage your project tasks and assignments</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "pending", "in_progress", "completed"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {f.replace("_", " ").charAt(0).toUpperCase() + f.replace("_", " ").slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-slate-500/20 rounded-lg">
                                    <Circle size={18} className="text-slate-400" />
                                </div>
                                <span className="text-slate-400 text-sm">Total</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{tasks.length}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <AlertCircle size={18} className="text-amber-400" />
                                </div>
                                <span className="text-slate-400 text-sm">Pending</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "pending").length}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Clock size={18} className="text-cyan-400" />
                                </div>
                                <span className="text-slate-400 text-sm">In Progress</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "in_progress").length}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <CheckCircle2 size={18} className="text-emerald-400" />
                                </div>
                                <span className="text-slate-400 text-sm">Completed</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "completed").length}</p>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="space-y-3">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <Link
                                    key={task.id}
                                    href={task.projectId ? `/projects/${task.projectId}` : "#"}
                                    className="block p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/30 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1">
                                            {getStatusIcon(task.status)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-white font-medium truncate">{task.title}</h3>
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm mb-2">{task.description}</p>
                                            {task.projectName && (
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="capitalize">{task.projectName.replace("-", " ")} Project</span>
                                                </div>
                                            )}
                                        </div>
                                        <ChevronRight size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 size={28} className="text-slate-500" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">No tasks found</h3>
                                <p className="text-slate-400 text-sm">
                                    {filter !== "all" ? "Try changing your filter" : "Tasks will appear when you have active projects"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
