"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                    <div className="prose max-w-none">
                        <p className="text-lg text-slate-600">
                            Welcome back, <span className="font-semibold text-slate-900">{user?.displayName || user?.email}</span>!
                        </p>
                        <p className="mt-4 text-slate-500">
                            This is your Talent Dashboard. Once you complete your assessments, your profile status will appear here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
