"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    UserCheck,
    UserX,
    Eye,
    Mail,
    Calendar,
    Shield,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface User {
    uid: string;
    displayName: string;
    email: string;
    role: string;
    status?: string;
    createdAt: string;
    photoURL?: string;
    onboardingStep?: number;
    clientOnboardingStep?: number;
    clientOnboardingCompleted?: boolean;
    aptitude?: { passed: boolean; score?: number };
    coding?: { passed: boolean; score?: number };
}

export default function AdminUsersPage() {
    const { user, loading } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user) return;

            try {
                const usersSnapshot = await getDocs(collection(db, "users"));
                const usersData = usersSnapshot.docs.map(doc => ({
                    uid: doc.id,
                    ...doc.data()
                })) as User[];

                setUsers(usersData);
                setFilteredUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchUsers();
        }
    }, [user, loading]);

    useEffect(() => {
        let result = users;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(u =>
                u.displayName?.toLowerCase().includes(query) ||
                u.email?.toLowerCase().includes(query)
            );
        }

        // Apply role filter
        if (roleFilter !== "all") {
            result = result.filter(u => u.role === roleFilter);
        }

        // Apply status filter
        if (statusFilter !== "all") {
            if (statusFilter === "verified") {
                result = result.filter(u => u.aptitude?.passed && u.coding?.passed);
            } else if (statusFilter === "pending") {
                result = result.filter(u => !(u.aptitude?.passed && u.coding?.passed) && u.status !== "suspended");
            } else if (statusFilter === "suspended") {
                result = result.filter(u => u.status === "suspended");
            }
        }

        setFilteredUsers(result);
    }, [searchQuery, roleFilter, statusFilter, users]);

    const handleSuspendUser = async (userId: string) => {
        try {
            await updateDoc(doc(db, "users", userId), {
                status: "suspended",
                updatedAt: new Date().toISOString(),
            });
            setUsers(users.map(u => u.uid === userId ? { ...u, status: "suspended" } : u));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error suspending user:", error);
        }
    };

    const handleActivateUser = async (userId: string) => {
        try {
            await updateDoc(doc(db, "users", userId), {
                status: "active",
                updatedAt: new Date().toISOString(),
            });
            setUsers(users.map(u => u.uid === userId ? { ...u, status: "active" } : u));
            setActionMenuOpen(null);
        } catch (error) {
            console.error("Error activating user:", error);
        }
    };

    const getUserStatus = (u: User) => {
        if (u.status === "suspended") return { label: "Suspended", color: "red" };
        if (u.role === "talent") {
            if (u.aptitude?.passed && u.coding?.passed) return { label: "Verified", color: "emerald" };
            return { label: "Pending", color: "amber" };
        }
        if (u.role === "client") {
            if (u.clientOnboardingCompleted) return { label: "Active", color: "emerald" };
            return { label: "Onboarding", color: "amber" };
        }
        return { label: "Active", color: "blue" };
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

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
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">All Users</h1>
                        <p className="text-slate-400">{filteredUsers.length} users found</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        />
                    </div>

                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <option value="all">All Roles</option>
                        <option value="talent">Talent</option>
                        <option value="client">Client</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No users found matching your criteria
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((u) => {
                                        const status = getUserStatus(u);
                                        return (
                                            <tr key={u.uid} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {u.photoURL ? (
                                                            <img src={u.photoURL} alt={u.displayName} className="w-10 h-10 rounded-lg object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                                {u.displayName?.charAt(0) || u.email?.charAt(0) || "?"}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-white font-medium">{u.displayName || "No name"}</p>
                                                            <p className="text-slate-500 text-sm">{u.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                        u.role === "talent" ? "bg-cyan-500/20 text-cyan-400" :
                                                        u.role === "client" ? "bg-violet-500/20 text-violet-400" :
                                                        "bg-orange-500/20 text-orange-400"
                                                    }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 w-fit ${
                                                        status.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                                                        status.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                                                        status.color === "red" ? "bg-red-500/20 text-red-400" :
                                                        "bg-blue-500/20 text-blue-400"
                                                    }`}>
                                                        {status.color === "emerald" && <CheckCircle2 size={12} />}
                                                        {status.color === "amber" && <Clock size={12} />}
                                                        {status.color === "red" && <XCircle size={12} />}
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {u.role === "talent" && (
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${u.aptitude?.passed ? "bg-emerald-500" : "bg-slate-600"}`}></div>
                                                            <span className="text-slate-400 text-sm">Aptitude</span>
                                                            <div className={`w-2 h-2 rounded-full ${u.coding?.passed ? "bg-emerald-500" : "bg-slate-600"}`}></div>
                                                            <span className="text-slate-400 text-sm">Coding</span>
                                                        </div>
                                                    )}
                                                    {u.role === "client" && (
                                                        <span className="text-slate-400 text-sm">
                                                            Step {u.clientOnboardingStep || 1}/6
                                                        </span>
                                                    )}
                                                    {u.role === "admin" && (
                                                        <span className="text-orange-400 text-sm flex items-center gap-1">
                                                            <Shield size={12} /> Full Access
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-400 text-sm">{formatDate(u.createdAt)}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setActionMenuOpen(actionMenuOpen === u.uid ? null : u.uid)}
                                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            <MoreVertical size={16} className="text-slate-400" />
                                                        </button>

                                                        {actionMenuOpen === u.uid && (
                                                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-10 py-2">
                                                                <button
                                                                    onClick={() => setSelectedUser(u)}
                                                                    className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/10 flex items-center gap-2"
                                                                >
                                                                    <Eye size={14} /> View Details
                                                                </button>
                                                                <button
                                                                    className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/10 flex items-center gap-2"
                                                                >
                                                                    <Mail size={14} /> Send Email
                                                                </button>
                                                                {u.status === "suspended" ? (
                                                                    <button
                                                                        onClick={() => handleActivateUser(u.uid)}
                                                                        className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-white/10 flex items-center gap-2"
                                                                    >
                                                                        <UserCheck size={14} /> Activate User
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleSuspendUser(u.uid)}
                                                                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                                                                    >
                                                                        <UserX size={14} /> Suspend User
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* User Detail Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedUser(null)}>
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-4 mb-6">
                                {selectedUser.photoURL ? (
                                    <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-16 h-16 rounded-xl object-cover" />
                                ) : (
                                    <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                                        {selectedUser.displayName?.charAt(0) || "?"}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedUser.displayName || "No name"}</h2>
                                    <p className="text-slate-400">{selectedUser.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Role</span>
                                    <span className="text-white font-medium capitalize">{selectedUser.role}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Status</span>
                                    <span className={`font-medium ${selectedUser.status === "suspended" ? "text-red-400" : "text-emerald-400"}`}>
                                        {selectedUser.status || "Active"}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                    <span className="text-slate-400">Joined</span>
                                    <span className="text-white">{formatDate(selectedUser.createdAt)}</span>
                                </div>
                                {selectedUser.role === "talent" && (
                                    <>
                                        <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                            <span className="text-slate-400">Aptitude Test</span>
                                            <span className={selectedUser.aptitude?.passed ? "text-emerald-400" : "text-amber-400"}>
                                                {selectedUser.aptitude?.passed ? `Passed (${selectedUser.aptitude.score}%)` : "Pending"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                                            <span className="text-slate-400">Coding Test</span>
                                            <span className={selectedUser.coding?.passed ? "text-emerald-400" : "text-amber-400"}>
                                                {selectedUser.coding?.passed ? `Passed (${selectedUser.coding.score}%)` : "Pending"}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="flex-1 py-2.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                                >
                                    Close
                                </button>
                                {selectedUser.status === "suspended" ? (
                                    <button
                                        onClick={() => { handleActivateUser(selectedUser.uid); setSelectedUser(null); }}
                                        className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
                                    >
                                        Activate User
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { handleSuspendUser(selectedUser.uid); setSelectedUser(null); }}
                                        className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all"
                                    >
                                        Suspend User
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
