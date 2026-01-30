"use client";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    BarChart3,
    TrendingUp,
    Users,
    FolderKanban,
    DollarSign,
    Activity,
    Clock,
    Calendar,
} from "lucide-react";

export default function AdminAnalyticsPage() {
    const { loading } = useAuth();

    if (loading) {
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
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-slate-400">Platform performance and insights</p>
                </div>

                {/* Placeholder Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* User Growth Chart Placeholder */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Users size={20} className="text-blue-400" />
                                User Growth
                            </h3>
                            <select className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400">
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>Last year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                            <div className="text-center">
                                <BarChart3 size={48} className="text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500">Chart coming soon</p>
                                <p className="text-slate-600 text-sm">Connect analytics provider</p>
                            </div>
                        </div>
                    </div>

                    {/* Project Pipeline Placeholder */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <FolderKanban size={20} className="text-violet-400" />
                                Project Pipeline
                            </h3>
                            <select className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400">
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>Last year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                            <div className="text-center">
                                <Activity size={48} className="text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-500">Chart coming soon</p>
                                <p className="text-slate-600 text-sm">Pipeline visualization</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign size={20} className="text-emerald-400" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">Total Revenue</p>
                        <p className="text-2xl font-bold text-white">--</p>
                        <p className="text-emerald-400 text-xs mt-1">Coming soon</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <TrendingUp size={20} className="text-blue-400" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">Conversion Rate</p>
                        <p className="text-2xl font-bold text-white">--</p>
                        <p className="text-blue-400 text-xs mt-1">Coming soon</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                                <Clock size={20} className="text-violet-400" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">Avg. Delivery Time</p>
                        <p className="text-2xl font-bold text-white">--</p>
                        <p className="text-violet-400 text-xs mt-1">Coming soon</p>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                <Calendar size={20} className="text-amber-400" />
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mb-1">Active Projects</p>
                        <p className="text-2xl font-bold text-white">--</p>
                        <p className="text-amber-400 text-xs mt-1">Coming soon</p>
                    </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-center">
                    <BarChart3 size={32} className="text-orange-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                        We're building comprehensive analytics dashboards with user behavior, revenue tracking, and project insights. Stay tuned!
                    </p>
                </div>
                </div>
            </main>
        </div>
    );
}
