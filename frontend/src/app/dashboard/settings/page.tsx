"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Phone,
    Camera,
    Save,
    Check,
} from "lucide-react";

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        phone: "",
        bio: "",
        notifications: {
            email: true,
            push: true,
            projectUpdates: true,
            newAssignments: true,
        },
    });

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
                const data = snapshot.data();
                setProfile(data);
                setFormData({
                    displayName: data.displayName || data.fullName || "",
                    email: data.email || user.email || "",
                    phone: data.phone || "",
                    bio: data.bio || "",
                    notifications: data.notifications || {
                        email: true,
                        push: true,
                        projectUpdates: true,
                        newAssignments: true,
                    },
                });
            }
        };
        fetchProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                displayName: formData.displayName,
                phone: formData.phone,
                bio: formData.bio,
                notifications: formData.notifications,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Failed to save settings:", error);
        }
        setSaving(false);
    };

    if (loading || !user) return null;

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-slate-400">Manage your account preferences</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Tabs */}
                        <div className="lg:w-48 flex lg:flex-col gap-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                                : "text-slate-400 hover:bg-white/5"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <h3 className="text-white font-semibold text-lg">Profile Information</h3>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
                                            {formData.displayName.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                                            <Camera size={16} />
                                            Change Photo
                                        </button>
                                    </div>

                                    {/* Form */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Display Name</label>
                                            <input
                                                type="text"
                                                value={formData.displayName}
                                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                disabled
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+27 123 456 7890"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-400 text-sm mb-2">Role</label>
                                            <input
                                                type="text"
                                                value={profile?.role || "User"}
                                                disabled
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 cursor-not-allowed capitalize"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">Bio</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            placeholder="Tell us about yourself..."
                                            rows={3}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-6">
                                    <h3 className="text-white font-semibold text-lg">Notification Preferences</h3>

                                    <div className="space-y-4">
                                        {[
                                            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                                            { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                                            { key: "projectUpdates", label: "Project Updates", desc: "When project status changes" },
                                            { key: "newAssignments", label: "New Assignments", desc: "When assigned to a project" },
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                                <div>
                                                    <p className="text-white font-medium">{item.label}</p>
                                                    <p className="text-slate-500 text-sm">{item.desc}</p>
                                                </div>
                                                <button
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        notifications: {
                                                            ...formData.notifications,
                                                            [item.key]: !formData.notifications[item.key as keyof typeof formData.notifications],
                                                        },
                                                    })}
                                                    className={`w-12 h-6 rounded-full transition-colors ${formData.notifications[item.key as keyof typeof formData.notifications]
                                                            ? "bg-cyan-500"
                                                            : "bg-slate-600"
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.notifications[item.key as keyof typeof formData.notifications]
                                                            ? "translate-x-6"
                                                            : "translate-x-0.5"
                                                        }`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-6">
                                    <h3 className="text-white font-semibold text-lg">Security Settings</h3>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-white font-medium">Password</p>
                                                <button className="text-cyan-400 text-sm hover:text-cyan-300">
                                                    Change
                                                </button>
                                            </div>
                                            <p className="text-slate-500 text-sm">Last changed 30 days ago</p>
                                        </div>

                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-white font-medium">Two-Factor Authentication</p>
                                                <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">
                                                    Not Enabled
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm mb-3">Add an extra layer of security</p>
                                            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">
                                                Enable 2FA
                                            </button>
                                        </div>

                                        <div className="p-4 bg-white/5 rounded-xl">
                                            <p className="text-white font-medium mb-2">Active Sessions</p>
                                            <p className="text-slate-500 text-sm">1 active session</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="mt-8 flex items-center gap-4">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>Saving...</>
                                    ) : saved ? (
                                        <>
                                            <Check size={18} />
                                            Saved!
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
