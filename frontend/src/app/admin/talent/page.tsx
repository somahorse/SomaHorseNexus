"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    UserCheck,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    Award,
    Code,
    Brain,
    MoreVertical,
    Eye,
    Mail,
    UserX,
    Star,
    TrendingUp,
    AlertTriangle,
} from "lucide-react";

interface Talent {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    createdAt: string;
    status?: string;
    onboardingStep?: number;
    aptitude?: { passed: boolean; score?: number; attempts?: number };
    coding?: { passed: boolean; score?: number; attempts?: number };
    skills?: string[];
    certified?: boolean;
}

export default function AdminTalentPage() {
    const { user, loading } = useAuth();
    const [talent, setTalent] = useState<Talent[]>([]);
    const [filteredTalent, setFilteredTalent] = useState<Talent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [verificationFilter, setVerificationFilter] = useState<string>("all");
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
    const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

    useEffect(() => {
        const fetchTalent = async () => {
            if (!user) return;

            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const talentData = usersSnapshot.docs
                    .map(doc => ({ uid: doc.id, ...doc.data() }))
                    .filter((u: any) => u.role === "talent") as Talent[];

                setTalent(talentData);
                setFilteredTalent(talentData);
            } catch (error) {
                console.error("Error fetching talent:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchTalent();
        }
    }, [user, loading]);

    useEffect(() => {
        let result = talent;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.displayName?.toLowerCase().includes(query) ||
                t.email?.toLowerCase().includes(query)
            );
        }

        if (verificationFilter !== "all") {
            if (verificationFilter === "verified") {
                result = result.filter(t => t.aptitude?.passed && t.coding?.passed);
            } else if (verificationFilter === "pending") {
                result = result.filter(t => !(t.aptitude?.passed && t.coding?.passed) && t.status !== "suspended");
            } else if (verificationFilter === "suspended") {
                result = result.filter(t => t.status === "suspended");
            }
        }

        setFilteredTalent(result);
    }, [searchQuery, verificationFilter, talent]);

    const handleCertify = async (talentId: string) => {
        try {
            await updateDoc(doc(db, "users", talentId), {
                certified: true,
                updatedAt: new Date().toISOString(),
            });
            setTalent(talent.map(t => t.uid === talentId ? { ...t, certified: true } : t));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error certifying talent:", error);
        }
    };

    const handleSuspend = async (talentId: string) => {
        try {
            await updateDoc(doc(db, "users", talentId), {
                status: "suspended",
                updatedAt: new Date().toISOString(),
            });
            setTalent(talent.map(t => t.uid === talentId ? { ...t, status: "suspended" } : t));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error suspending talent:", error);
        }
    };

    const handleActivate = async (talentId: string) => {
        try {
            await updateDoc(doc(db, "users", talentId), {
                status: "active",
                updatedAt: new Date().toISOString(),
            });
            setTalent(talent.map(t => t.uid === talentId ? { ...t, status: "active" } : t));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error activating talent:", error);
        }
    };

    const getVerificationStatus = (t: Talent) => {
        if (t.status === "suspended") return { label: "Suspended", color: "red", icon: XCircle };
        if (t.aptitude?.passed && t.coding?.passed) {
            if (t.certified) return { label: "Certified", color: "emerald", icon: Award };
            return { label: "Verified", color: "blue", icon: CheckCircle2 };
        }
        return { label: "Pending", color: "amber", icon: Clock };
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Stats
    const verifiedCount = talent.filter(t => t.aptitude?.passed && t.coding?.passed).length;
    const certifiedCount = talent.filter(t => t.certified).length;
    const pendingCount = talent.filter(t => !(t.aptitude?.passed && t.coding?.passed) && t.status !== "suspended").length;
    const suspendedCount = talent.filter(t => t.status === "suspended").length;

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
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Talent Pool</h1>
                    <p className="text-slate-400">Manage and verify talent applications</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <UserCheck size={20} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Total Talent</p>
                                <p className="text-xl font-bold text-white">{talent.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                <Award size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Certified</p>
                                <p className="text-xl font-bold text-white">{certifiedCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                <Clock size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Pending</p>
                                <p className="text-xl font-bold text-white">{pendingCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <UserX size={20} className="text-red-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">Suspended</p>
                                <p className="text-xl font-bold text-white">{suspendedCount}</p>
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
                            placeholder="Search talent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                    </div>
                    <select
                        value={verificationFilter}
                        onChange={(e) => setVerificationFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                {/* Talent Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTalent.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            No talent found matching your criteria
                        </div>
                    ) : (
                        filteredTalent.map((t) => {
                            const status = getVerificationStatus(t);
                            const StatusIcon = status.icon;

                            return (
                                <div key={t.uid} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {t.photoURL ? (
                                                <img src={t.photoURL} alt={t.displayName} className="w-12 h-12 rounded-xl object-cover" />
                                            ) : (
                                                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-white font-bold">
                                                    {t.displayName?.charAt(0) || "?"}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-medium">{t.displayName || "No name"}</p>
                                                <p className="text-slate-500 text-sm truncate max-w-[150px]">{t.email}</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => setActionMenuOpen(actionMenuOpen === t.uid ? null : t.uid)}
                                                className="p-2 hover:bg-white/10 rounded-lg"
                                            >
                                                <MoreVertical size={16} className="text-slate-400" />
                                            </button>
                                            {actionMenuOpen === t.uid && (
                                                <div className="absolute right-0 mt-1 w-40 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-10 py-1">
                                                    <button
                                                        onClick={() => { setSelectedTalent(t); setActionMenuOpen(null); }}
                                                        className="w-full px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/10 flex items-center gap-2"
                                                    >
                                                        <Eye size={14} /> View
                                                    </button>
                                                    {!t.certified && t.aptitude?.passed && t.coding?.passed && (
                                                        <button
                                                            onClick={() => handleCertify(t.uid)}
                                                            className="w-full px-3 py-2 text-left text-sm text-emerald-400 hover:bg-white/10 flex items-center gap-2"
                                                        >
                                                            <Award size={14} /> Certify
                                                        </button>
                                                    )}
                                                    {t.status === "suspended" ? (
                                                        <button
                                                            onClick={() => handleActivate(t.uid)}
                                                            className="w-full px-3 py-2 text-left text-sm text-blue-400 hover:bg-white/10 flex items-center gap-2"
                                                        >
                                                            <UserCheck size={14} /> Activate
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleSuspend(t.uid)}
                                                            className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                                                        >
                                                            <UserX size={14} /> Suspend
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="mb-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                                            status.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                                            status.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                                            status.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                                            "bg-red-500/20 text-red-400"
                                        }`}>
                                            <StatusIcon size={12} />
                                            {status.label}
                                        </span>
                                    </div>

                                    {/* Assessment Progress */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400 flex items-center gap-2">
                                                <Brain size={14} /> Aptitude
                                            </span>
                                            {t.aptitude?.passed ? (
                                                <span className="text-emerald-400 flex items-center gap-1">
                                                    <CheckCircle2 size={12} /> {t.aptitude.score}%
                                                </span>
                                            ) : (
                                                <span className="text-slate-500">Pending</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400 flex items-center gap-2">
                                                <Code size={14} /> Coding
                                            </span>
                                            {t.coding?.passed ? (
                                                <span className="text-emerald-400 flex items-center gap-1">
                                                    <CheckCircle2 size={12} /> {t.coding.score}%
                                                </span>
                                            ) : (
                                                <span className="text-slate-500">Pending</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-slate-500 text-xs">Joined {formatDate(t.createdAt)}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Talent Detail Modal */}
                {selectedTalent && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTalent(null)}>
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-4 mb-6">
                                {selectedTalent.photoURL ? (
                                    <img src={selectedTalent.photoURL} alt={selectedTalent.displayName} className="w-16 h-16 rounded-xl object-cover" />
                                ) : (
                                    <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                                        {selectedTalent.displayName?.charAt(0) || "?"}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedTalent.displayName}</h2>
                                    <p className="text-slate-400">{selectedTalent.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl">
                                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Assessment Results</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 flex items-center gap-2"><Brain size={16} /> Aptitude Test</span>
                                            <span className={selectedTalent.aptitude?.passed ? "text-emerald-400 font-medium" : "text-amber-400"}>
                                                {selectedTalent.aptitude?.passed ? `Passed - ${selectedTalent.aptitude.score}%` : "Not Passed"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400 flex items-center gap-2"><Code size={16} /> Coding Test</span>
                                            <span className={selectedTalent.coding?.passed ? "text-emerald-400 font-medium" : "text-amber-400"}>
                                                {selectedTalent.coding?.passed ? `Passed - ${selectedTalent.coding.score}%` : "Not Passed"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Status</span>
                                    <span className={`font-medium ${selectedTalent.status === "suspended" ? "text-red-400" : "text-emerald-400"}`}>
                                        {selectedTalent.status || "Active"}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Certified</span>
                                    <span className={selectedTalent.certified ? "text-emerald-400" : "text-slate-500"}>
                                        {selectedTalent.certified ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Joined</span>
                                    <span className="text-white">{formatDate(selectedTalent.createdAt)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedTalent(null)}
                                    className="flex-1 py-2.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                                >
                                    Close
                                </button>
                                {!selectedTalent.certified && selectedTalent.aptitude?.passed && selectedTalent.coding?.passed && (
                                    <button
                                        onClick={() => { handleCertify(selectedTalent.uid); setSelectedTalent(null); }}
                                        className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Award size={16} /> Certify
                                    </button>
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
