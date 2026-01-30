"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    CheckCircle2,
    Briefcase,
    Wallet,
    Settings,
    HelpCircle,
    LogOut,
    Calendar,
    BarChart3,
    Users,
    Menu,
    X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    const menuLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/assessments", label: "Tasks", icon: CheckCircle2, badge: "2" },
        { href: "/calendar", label: "Calendar", icon: Calendar },
        { href: "/projects", label: "Analytics", icon: BarChart3 },
        { href: "/team", label: "Team", icon: Users },
    ];

    const generalLinks = [
        { href: "/settings", label: "Settings", icon: Settings },
        { href: "/help", label: "Help", icon: HelpCircle },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-white/5">

            {/* Logo */}
            <div className="p-6 pt-8">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 shadow-lg shadow-cyan-500/20 overflow-hidden">
                        <Image
                            src="/somahorse-logo.png"
                            alt="Somahorse Nexus logo"
                            fill
                            sizes="40px"
                            className="object-contain p-1.5"
                            priority
                        />
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">Somahorse</span>
                </div>
            </div>

            {/* Menu Section */}
            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div>
                    <h4 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Menu</h4>
                    <div className="space-y-1">
                        {menuLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white shadow-sm border-l-4 border-cyan-500"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? "text-cyan-400" : ""} />
                                    <span>{link.label}</span>
                                    {link.badge && (
                                        <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-full">
                                            {link.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h4 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">General</h4>
                    <div className="space-y-1">
                        {generalLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white shadow-sm"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-700 hover:bg-slate-50 transition-colors"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`lg:hidden fixed top-0 left-0 h-screen w-72 z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Close Button */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur rounded-lg text-slate-700 hover:bg-white transition-colors"
                >
                    <X size={20} />
                </button>
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 h-screen fixed top-0 left-0 z-40 overflow-hidden">
                <SidebarContent />
            </aside>
        </>
    );
}
