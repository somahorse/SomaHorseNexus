"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import {
    Users,
    MessageSquare,
    Star,
    Mail,
    Phone,
    Briefcase,
    CheckCircle2,
    Clock,
    ChevronRight,
} from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    skills: string[];
    matchScore?: number;
    status: string;
    projectId: string;
    projectName: string;
}

interface ProjectCollaboration {
    _id: string;
    service_type: string;
    client_id: string;
    client_name: string;
    assigned_talent: Array<{
        talent_id: string;
        talent_name: string;
        talent_email: string;
        skills_matched: string[];
        match_score: number;
        status: string;
    }>;
    status: string;
}

export default function TeamPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [collaborations, setCollaborations] = useState<ProjectCollaboration[]>([]);

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
            const collabs: ProjectCollaboration[] = [];
            const members: TeamMember[] = [];

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const isClient = data.client_id === user.uid;
                const isTalent = data.assigned_talent?.some((t: any) => t.talent_id === user.uid);

                if (isClient || isTalent) {
                    collabs.push({ _id: docSnap.id, ...data } as ProjectCollaboration);

                    // For clients: show assigned talent
                    if (isClient) {
                        data.assigned_talent?.forEach((t: any) => {
                            if (!members.find(m => m.id === t.talent_id && m.projectId === docSnap.id)) {
                                members.push({
                                    id: t.talent_id,
                                    name: t.talent_name,
                                    email: t.talent_email || "",
                                    role: "Developer",
                                    skills: t.skills_matched || [],
                                    matchScore: t.match_score,
                                    status: t.status,
                                    projectId: docSnap.id,
                                    projectName: data.service_type,
                                });
                            }
                        });
                    }

                    // For talent: show client and other team members
                    if (isTalent) {
                        // Add client
                        if (!members.find(m => m.id === data.client_id)) {
                            members.push({
                                id: data.client_id,
                                name: data.client_name,
                                email: data.client_email || "",
                                role: "Client",
                                skills: [],
                                status: "active",
                                projectId: docSnap.id,
                                projectName: data.service_type,
                            });
                        }

                        // Add other talent
                        data.assigned_talent?.forEach((t: any) => {
                            if (t.talent_id !== user.uid && !members.find(m => m.id === t.talent_id && m.projectId === docSnap.id)) {
                                members.push({
                                    id: t.talent_id,
                                    name: t.talent_name,
                                    email: t.talent_email || "",
                                    role: "Team Member",
                                    skills: t.skills_matched || [],
                                    matchScore: t.match_score,
                                    status: t.status,
                                    projectId: docSnap.id,
                                    projectName: data.service_type,
                                });
                            }
                        });
                    }
                }
            });

            setCollaborations(collabs);
            setTeamMembers(members);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading || !user) return null;

    const role = profile?.role || "talent";

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "accepted":
                return <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">Active</span>;
            case "pending":
                return <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">Pending</span>;
            default:
                return <span className="px-2 py-0.5 text-xs bg-slate-500/20 text-slate-400 rounded-full">{status}</span>;
        }
    };

    // Group members by project
    const membersByProject = teamMembers.reduce((acc, member) => {
        if (!acc[member.projectId]) {
            acc[member.projectId] = {
                projectName: member.projectName,
                members: [],
            };
        }
        acc[member.projectId].members.push(member);
        return acc;
    }, {} as Record<string, { projectName: string; members: TeamMember[] }>);

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Team</h1>
                        <p className="text-slate-400">
                            {role === "client" ? "Your project team members" : "Clients and collaborators"}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={18} className="text-cyan-400" />
                                <span className="text-slate-400 text-sm">Total Members</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Briefcase size={18} className="text-violet-400" />
                                <span className="text-slate-400 text-sm">Projects</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{Object.keys(membersByProject).length}</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 size={18} className="text-emerald-400" />
                                <span className="text-slate-400 text-sm">Active</span>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {teamMembers.filter(m => m.status === "accepted" || m.status === "active").length}
                            </p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock size={18} className="text-amber-400" />
                                <span className="text-slate-400 text-sm">Pending</span>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {teamMembers.filter(m => m.status === "pending").length}
                            </p>
                        </div>
                    </div>

                    {/* Team by Project */}
                    {Object.keys(membersByProject).length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(membersByProject).map(([projectId, { projectName, members }]) => (
                                <div key={projectId} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                        <h3 className="text-white font-semibold capitalize flex items-center gap-2">
                                            <Briefcase size={18} className="text-cyan-400" />
                                            {projectName.replace("-", " ")} Project
                                        </h3>
                                        <Link
                                            href={`/projects/${projectId}`}
                                            className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"
                                        >
                                            View Project <ChevronRight size={16} />
                                        </Link>
                                    </div>

                                    <div className="divide-y divide-white/5">
                                        {members.map((member) => (
                                            <div key={`${member.id}-${projectId}`} className="p-4 hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="text-white font-medium">{member.name}</h4>
                                                            {getStatusBadge(member.status)}
                                                            {member.matchScore && (
                                                                <span className="px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-full flex items-center gap-1">
                                                                    <Star size={10} /> {member.matchScore}% match
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-400 text-sm">{member.role}</p>
                                                        {member.skills.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {member.skills.slice(0, 3).map((skill, i) => (
                                                                    <span key={i} className="px-2 py-0.5 text-xs bg-white/5 text-slate-400 rounded">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                                {member.skills.length > 3 && (
                                                                    <span className="px-2 py-0.5 text-xs bg-white/5 text-slate-500 rounded">
                                                                        +{member.skills.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/projects/${projectId}`}
                                                            className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded-lg transition-colors group"
                                                            title="Message"
                                                        >
                                                            <MessageSquare size={18} className="text-slate-400 group-hover:text-cyan-400" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users size={28} className="text-slate-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">No team members yet</h3>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto">
                                Team members will appear here once you have active projects.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
