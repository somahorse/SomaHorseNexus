"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Users,
    Circle,
} from "lucide-react";

interface ProjectEvent {
    id: string;
    title: string;
    date: string;
    type: "deadline" | "milestone" | "meeting";
    projectId: string;
    color: string;
}

interface ProjectCollaboration {
    _id: string;
    service_type: string;
    deadline?: string;
    status: string;
    created_at: string;
}

export default function CalendarPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [events, setEvents] = useState<ProjectEvent[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const collabCollection = collection(db, "project_collaborations");

        const unsubscribe = onSnapshot(collabCollection, (snapshot) => {
            const projectEvents: ProjectEvent[] = [];

            snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                const isRelevant = data.client_id === user.uid ||
                    data.assigned_talent?.some((t: any) => t.talent_id === user.uid);

                if (isRelevant && data.deadline) {
                    projectEvents.push({
                        id: docSnap.id,
                        title: `${data.service_type.replace("-", " ")} Deadline`,
                        date: data.deadline,
                        type: "deadline",
                        projectId: docSnap.id,
                        color: "bg-red-500",
                    });
                }

                if (isRelevant && data.created_at) {
                    projectEvents.push({
                        id: `start-${docSnap.id}`,
                        title: `${data.service_type.replace("-", " ")} Started`,
                        date: data.created_at,
                        type: "milestone",
                        projectId: docSnap.id,
                        color: "bg-cyan-500",
                    });
                }
            });

            setEvents(projectEvents);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading || !user) return null;

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        return { daysInMonth, startingDay };
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

    const getEventsForDate = (day: number) => {
        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        return events.filter(e => e.date.startsWith(dateStr));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const today = new Date();
    const isToday = (day: number) => {
        return today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Sidebar />

            <main className="lg:ml-72 h-screen overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Calendar</h1>
                            <p className="text-slate-400">View project deadlines and milestones</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevMonth}
                                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeft size={20} className="text-white" />
                            </button>
                            <span className="text-white font-medium px-4 min-w-[160px] text-center">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                            <button
                                onClick={nextMonth}
                                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <ChevronRight size={20} className="text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        {/* Calendar Grid */}
                        <div className="xl:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {dayNames.map((day) => (
                                    <div key={day} className="text-center text-slate-500 text-sm font-medium py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startingDay }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square p-1" />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dayEvents = getEventsForDate(day);

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                                            className={`aspect-square p-1 rounded-lg transition-all hover:bg-white/10 ${isToday(day) ? "bg-cyan-500/20 border border-cyan-500/50" : ""
                                                } ${selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth() ? "ring-2 ring-cyan-500" : ""}`}
                                        >
                                            <div className="h-full flex flex-col">
                                                <span className={`text-sm ${isToday(day) ? "text-cyan-400 font-bold" : "text-white"}`}>
                                                    {day}
                                                </span>
                                                <div className="flex-1 flex flex-wrap gap-0.5 mt-1">
                                                    {dayEvents.slice(0, 3).map((event) => (
                                                        <div
                                                            key={event.id}
                                                            className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                                                            title={event.title}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Events Sidebar */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <CalendarIcon size={18} className="text-cyan-400" />
                                {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : "Upcoming Events"}
                            </h3>

                            <div className="space-y-3">
                                {(selectedDate
                                    ? events.filter(e => e.date.startsWith(selectedDate.toISOString().split('T')[0]))
                                    : events.slice(0, 5)
                                ).map((event) => (
                                    <Link
                                        key={event.id}
                                        href={`/projects/${event.projectId}`}
                                        className="block p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${event.color}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate capitalize">
                                                    {event.title}
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {new Date(event.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {events.length === 0 && (
                                    <div className="text-center py-8">
                                        <Circle size={24} className="text-slate-600 mx-auto mb-2" />
                                        <p className="text-slate-500 text-sm">No events yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-slate-400 text-sm">Deadline</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-500" />
                            <span className="text-slate-400 text-sm">Project Start</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-slate-400 text-sm">Milestone</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
