"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    Settings,
    Shield,
    Bell,
    Mail,
    Globe,
    Key,
    Users,
    Save,
    AlertCircle,
} from "lucide-react";

export default function AdminSettingsPage() {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("general");

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "team", label: "Admin Team", icon: Users },
    ];

    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 lg:ml-72 overflow-y-auto">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-slate-400">Manage platform configuration</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                                    activeTab === tab.id
                                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* General Settings */}
                {activeTab === "general" && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe size={20} className="text-blue-400" />
                                Platform Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Platform Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Somahorse Nexus"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Support Email</label>
                                    <input
                                        type="email"
                                        defaultValue="support@somahorse.com"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Maintenance Mode</p>
                                        <p className="text-slate-500 text-sm">Disable public access temporarily</p>
                                    </div>
                                    <button className="w-12 h-6 bg-slate-700 rounded-full relative">
                                        <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0.5 top-0.5"></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Key size={20} className="text-amber-400" />
                                Security Configuration
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Two-Factor Authentication</p>
                                        <p className="text-slate-500 text-sm">Require 2FA for admin access</p>
                                    </div>
                                    <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Session Timeout</p>
                                        <p className="text-slate-500 text-sm">Auto-logout after inactivity</p>
                                    </div>
                                    <select className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm">
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>4 hours</option>
                                        <option>Never</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                            <AlertCircle size={20} className="text-amber-400 mt-0.5" />
                            <div>
                                <p className="text-amber-400 font-medium">Security Best Practices</p>
                                <p className="text-slate-400 text-sm">Enable 2FA and use strong, unique passwords for all admin accounts.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Settings */}
                {activeTab === "notifications" && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Mail size={20} className="text-violet-400" />
                                Email Notifications
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">New User Registration</p>
                                        <p className="text-slate-500 text-sm">Get notified when new users sign up</p>
                                    </div>
                                    <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">New Project Request</p>
                                        <p className="text-slate-500 text-sm">Get notified when clients submit projects</p>
                                    </div>
                                    <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Talent Verification</p>
                                        <p className="text-slate-500 text-sm">Get notified when talent passes assessments</p>
                                    </div>
                                    <button className="w-12 h-6 bg-slate-700 rounded-full relative">
                                        <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0.5 top-0.5"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Team Settings */}
                {activeTab === "team" && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Users size={20} className="text-cyan-400" />
                                Admin Email Whitelist
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Only these emails can access the admin dashboard. Edit the whitelist in <code className="bg-white/10 px-2 py-0.5 rounded">AuthContext.tsx</code>
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 font-bold text-sm">A</div>
                                        <span className="text-white">admin@somahorse.com</span>
                                    </div>
                                    <span className="text-emerald-400 text-xs">Active</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 font-bold text-sm">P</div>
                                        <span className="text-white">phutinexus@gmail.com</span>
                                    </div>
                                    <span className="text-emerald-400 text-xs">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <p className="text-blue-400 text-sm">
                                <strong>Note:</strong> To add new admins, update the <code className="bg-white/10 px-1.5 py-0.5 rounded">ADMIN_EMAILS</code> array in <code className="bg-white/10 px-1.5 py-0.5 rounded">frontend/src/context/AuthContext.tsx</code>
                            </p>
                        </div>
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}
