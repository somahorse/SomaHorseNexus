"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
    MessageSquare,
    Mail,
    Clock,
    CheckCircle2,
    User,
    Building2,
    ChevronDown,
    Search,
    Eye,
    Loader2,
} from "lucide-react";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    company?: string;
    subject: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "unread" | "read">("all");

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "contact_messages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: ContactMessage[] = [];
            snapshot.forEach((docSnap) => {
                msgs.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
            });
            setMessages(msgs);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching messages:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const markAsRead = async (msg: ContactMessage) => {
        setSelectedMessage(msg);
        if (!msg.read) {
            try {
                await updateDoc(doc(db, "contact_messages", msg.id), { read: true });
            } catch (err) {
                console.error("Error marking as read:", err);
            }
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === "all" ||
            (filterType === "unread" && !msg.read) ||
            (filterType === "read" && msg.read);
        return matchesSearch && matchesFilter;
    });

    const unreadCount = messages.filter((m) => !m.read).length;

    if (loading) return null;

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <AdminSidebar />
            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                            <MessageSquare size={20} className="text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Messages</h1>
                            <p className="text-slate-400 text-sm">
                                {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}` : "All caught up"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "unread", "read"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilterType(f)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${
                                    filterType === f
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                }`}
                            >
                                {f} {f === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-2 space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 size={24} className="text-cyan-400 animate-spin" />
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="text-center py-16">
                                <Mail size={32} className="text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-400 text-sm">No messages found</p>
                            </div>
                        ) : (
                            filteredMessages.map((msg) => (
                                <button
                                    key={msg.id}
                                    onClick={() => markAsRead(msg)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                                        selectedMessage?.id === msg.id
                                            ? "bg-cyan-500/10 border-cyan-500/30"
                                            : msg.read
                                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                                            : "bg-white/5 border-cyan-500/20 hover:bg-white/10"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2">
                                            {!msg.read && <span className="w-2 h-2 bg-cyan-400 rounded-full shrink-0" />}
                                            <p className={`text-sm font-semibold truncate ${msg.read ? "text-slate-300" : "text-white"}`}>
                                                {msg.name}
                                            </p>
                                        </div>
                                        <span className="text-xs text-slate-500 shrink-0">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate mb-1">{msg.subject}</p>
                                    <p className="text-xs text-slate-500 truncate">{msg.message}</p>
                                </button>
                            ))
                        )}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-3">
                        {selectedMessage ? (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">{selectedMessage.subject}</h2>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <User size={14} />
                                                {selectedMessage.name}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Mail size={14} />
                                                {selectedMessage.email}
                                            </span>
                                            {selectedMessage.company && (
                                                <span className="flex items-center gap-1.5">
                                                    <Building2 size={14} />
                                                    {selectedMessage.company}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock size={12} />
                                        {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-6">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 capitalize">
                                        {selectedMessage.type}
                                    </span>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                        selectedMessage.read
                                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                            : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                    }`}>
                                        {selectedMessage.read ? "Read" : "Unread"}
                                    </span>
                                </div>

                                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>

                                <div className="mt-6">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                                    >
                                        <Mail size={16} />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="text-center">
                                    <Eye size={32} className="text-slate-600 mx-auto mb-3" />
                                    <p className="text-slate-400 text-sm">Select a message to view</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
