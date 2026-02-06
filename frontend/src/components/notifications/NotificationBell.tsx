"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X, Check, ExternalLink, ChevronDown } from "lucide-react";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Notification {
    _id: string;
    type: string;
    title: string;
    message: string;
    read: boolean;
    created_at: string;
    collaboration_id?: string;
    project_id?: string;
}

interface NotificationBellProps {
    userId: string;
    userRole: "talent" | "client" | "admin";
}

export default function NotificationBell({ userId, userRole }: NotificationBellProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [drawerHeight, setDrawerHeight] = useState(60); // percentage of screen height
    const [isDragging, setIsDragging] = useState(false);
    const startYRef = useRef<number>(0);
    const startHeightRef = useRef<number>(60);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Reset drawer height when opened
    useEffect(() => {
        if (isOpen && isMobile) {
            setDrawerHeight(60);
        }
    }, [isOpen, isMobile]);

    // Prevent body scroll when modal/drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!userId) return;

        let collectionName = "";
        let queryField = "";

        switch (userRole) {
            case "talent":
                collectionName = "talent_notifications";
                queryField = "talent_id";
                break;
            case "client":
                collectionName = "client_notifications";
                queryField = "client_id";
                break;
            case "admin":
                collectionName = "admin_notifications";
                queryField = "";
                break;
        }

        if (!collectionName) return;

        const notifCollection = collection(db, collectionName);
        const notifQuery = userRole === "admin"
            ? notifCollection
            : query(notifCollection, where(queryField, "==", userId));

        const unsubscribe = onSnapshot(notifQuery, (snapshot) => {
            const notifs: Notification[] = [];
            snapshot.forEach((doc) => {
                notifs.push({ _id: doc.id, ...doc.data() } as Notification);
            });
            notifs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setNotifications(notifs);
        });

        return () => unsubscribe();
    }, [userId, userRole]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = async (notificationId: string) => {
        const collectionName = userRole === "talent" ? "talent_notifications"
            : userRole === "client" ? "client_notifications"
                : "admin_notifications";

        try {
            await updateDoc(doc(db, collectionName, notificationId), { read: true });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        const unread = notifications.filter((n) => !n.read);
        for (const notif of unread) {
            await markAsRead(notif._id);
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const getNotificationLink = (notif: Notification) => {
        if (notif.collaboration_id) {
            return `/projects/${notif.collaboration_id}`;
        }
        return "#";
    };

    // Drag handlers for bottom drawer
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        startYRef.current = e.touches[0].clientY;
        startHeightRef.current = drawerHeight;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaY = startYRef.current - e.touches[0].clientY;
        const deltaPercent = (deltaY / window.innerHeight) * 100;
        const newHeight = Math.min(90, Math.max(20, startHeightRef.current + deltaPercent));
        setDrawerHeight(newHeight);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        // Snap to close if dragged below 30%
        if (drawerHeight < 30) {
            setIsOpen(false);
        } else if (drawerHeight < 50) {
            setDrawerHeight(60);
        } else if (drawerHeight > 80) {
            setDrawerHeight(90);
        }
    };

    // Notification content (shared between modal and drawer)
    const NotificationContent = () => (
        <>
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <h3 className="text-white font-bold text-lg">Notifications</h3>
                <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"
                        >
                            <Check size={14} />
                            Mark all read
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
                {notifications.length > 0 ? (
                    notifications.slice(0, 15).map((notif) => (
                        <Link
                            key={notif._id}
                            href={getNotificationLink(notif)}
                            onClick={() => {
                                markAsRead(notif._id);
                                setIsOpen(false);
                            }}
                            className={`block p-4 border-b border-white/5 hover:bg-white/5 transition-colors active:bg-white/10 ${!notif.read ? "bg-cyan-500/10" : ""
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${!notif.read ? "bg-cyan-400" : "bg-slate-600"
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium ${!notif.read ? "text-white" : "text-slate-400"
                                        }`}>
                                        {notif.title}
                                    </p>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                        {notif.message}
                                    </p>
                                    <p className="text-slate-600 text-xs mt-2">
                                        {formatTime(notif.created_at)}
                                    </p>
                                </div>
                                {notif.collaboration_id && (
                                    <ExternalLink size={16} className="text-slate-500 shrink-0 mt-1" />
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={28} className="text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No notifications yet</p>
                        <p className="text-slate-600 text-sm mt-1">We'll notify you when something happens</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            {notifications.length > 15 && (
                <div className="p-4 border-t border-white/10 text-center shrink-0">
                    <Link
                        href="/dashboard"
                        className="text-cyan-400 font-medium hover:text-cyan-300"
                        onClick={() => setIsOpen(false)}
                    >
                        View all notifications
                    </Link>
                </div>
            )}
        </>
    );

    return (
        <>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            >
                <Bell size={20} className="text-slate-400" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Modal/Drawer */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Desktop Modal */}
                    <div className="hidden sm:flex fixed inset-0 z-[101] items-center justify-center p-4 pointer-events-none">
                        <div
                            className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <NotificationContent />
                        </div>
                    </div>

                    {/* Mobile Bottom Drawer */}
                    <div
                        className="sm:hidden fixed bottom-0 left-0 right-0 z-[101] bg-slate-900 border-t border-white/10 rounded-t-3xl flex flex-col transition-all duration-300 ease-out"
                        style={{ height: `${drawerHeight}vh` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drag Handle */}
                        <div
                            className="py-3 flex justify-center cursor-grab active:cursor-grabbing shrink-0"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
                        </div>

                        <NotificationContent />
                    </div>
                </>
            )}
        </>
    );
}
