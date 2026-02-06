"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    FolderKanban,
    Settings,
    LogOut,
    Shield,
    Menu,
    X,
    BarChart3,
    Bell,
    ClipboardList,
} from "lucide-react";
import { useState } from "react";
import NotificationBell from "@/components/notifications/NotificationBell";

const menuLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "All Users", icon: Users },
    { href: "/admin/talent", label: "Talent Pool", icon: UserCheck },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/applications", label: "Applications", icon: ClipboardList },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const displayName = (user as any)?.displayName || "Admin";
    const email = user?.email || "admin@somahorse.com";
    const photoURL = (user as any)?.photoURL;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 bg-slate-800 border border-white/10 rounded-xl text-white shadow-lg"
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-[45] backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-72 bg-slate-900 border-r border-white/10 z-50 transform transition-transform duration-300 ${
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 overflow-hidden`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <Shield size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                                <p className="text-xs text-slate-500">Somahorse Nexus</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href || 
                                (link.href !== "/admin" && pathname?.startsWith(link.href));

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-gradient-to-r from-red-500/20 to-orange-500/10 text-orange-400 border border-orange-500/20"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <Icon size={18} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl">
                            {photoURL ? (
                                <img
                                    src={photoURL}
                                    alt={displayName}
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                                <p className="text-xs text-slate-500 truncate">{email}</p>
                            </div>
                            {user && (
                                <NotificationBell userId={user.uid} userRole="admin" />
                            )}
                        </div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl text-sm font-medium transition-all border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
