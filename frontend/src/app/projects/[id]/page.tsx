"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, ADMIN_EMAILS } from "@/context/AuthContext";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    ArrowLeft,
    Users,
    Clock,
    CheckCircle2,
    MessageSquare,
    HelpCircle,
    Send,
    Bell,
    ChevronRight,
    Loader2,
    User,
    Calendar,
    Target,
    TrendingUp,
} from "lucide-react";

interface TalentAssignment {
    talent_id: string;
    talent_name: string;
    talent_email: string;
    skills_matched: string[];
    match_score: number;
    status: string;
    assigned_at: string;
    accepted_at?: string;
}

interface ProgressUpdate {
    updated_by: string;
    updated_by_name: string;
    progress_percentage: number;
    message: string;
    created_at: string;
}

interface ChatMessage {
    sender_id: string;
    sender_name: string;
    sender_role: string;
    message: string;
    is_question: boolean;
    created_at: string;
}

interface ClarificationQuestion {
    asked_by: string;
    asked_by_name: string;
    question: string;
    answer?: string;
    answered_at?: string;
    created_at: string;
}

interface ProjectCollaboration {
    _id: string;
    project_id: string;
    client_id: string;
    client_name: string;
    client_email: string;
    service_type: string;
    tier: string;
    estimated_duration_days: number;
    deadline?: string;
    assigned_talent: TalentAssignment[];
    overall_progress: number;
    progress_updates: ProgressUpdate[];
    chat_messages: ChatMessage[];
    clarification_questions: ClarificationQuestion[];
    created_at: string;
    started_at?: string;
    completed_at?: string;
    status: string;
}

export default function ProjectCollaborationPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [collaboration, setCollaboration] = useState<ProjectCollaboration | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"overview" | "chat" | "questions">("overview");
    const [newMessage, setNewMessage] = useState("");
    const [newProgress, setNewProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isQuestion, setIsQuestion] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [answeringIndex, setAnsweringIndex] = useState<number | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const collaborationId = params.id as string;
    const isClient = user?.role === "client";
    const isTalent = user?.role === "talent";

    useEffect(() => {
        if (!collaborationId) return;

        // Real-time listener for collaboration updates
        const unsubscribe = onSnapshot(
            doc(db, "project_collaborations", collaborationId),
            (doc) => {
                if (doc.exists()) {
                    setCollaboration({ _id: doc.id, ...doc.data() } as ProjectCollaboration);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching collaboration:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [collaborationId]);

    useEffect(() => {
        // Scroll to bottom of chat when new messages arrive
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [collaboration?.chat_messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !user || !collaboration) return;

        setIsSubmitting(true);
        try {
            const docRef = doc(db, "project_collaborations", collaborationId);
            const newMsg: ChatMessage = {
                sender_id: user.uid,
                sender_name: user.displayName || user.email || "Unknown",
                sender_role: isClient ? "client" : "talent",
                message: newMessage,
                is_question: isQuestion,
                created_at: new Date().toISOString(),
            };

            const updatedMessages = [...(collaboration.chat_messages || []), newMsg];
            await updateDoc(docRef, { chat_messages: updatedMessages });

            // If it's a question, also add to clarification questions
            if (isQuestion) {
                const newQuestion: ClarificationQuestion = {
                    asked_by: user.uid,
                    asked_by_name: user.displayName || user.email || "Unknown",
                    question: newMessage,
                    created_at: new Date().toISOString(),
                };
                const updatedQuestions = [...(collaboration.clarification_questions || []), newQuestion];
                await updateDoc(docRef, { clarification_questions: updatedQuestions });
            }

            setNewMessage("");
            setIsQuestion(false);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateProgress = async () => {
        if (!user || !collaboration || newProgress < 0) return;

        setIsSubmitting(true);
        try {
            const docRef = doc(db, "project_collaborations", collaborationId);
            const update: ProgressUpdate = {
                updated_by: user.uid,
                updated_by_name: user.displayName || user.email || "Unknown",
                progress_percentage: newProgress,
                message: progressMessage,
                created_at: new Date().toISOString(),
            };

            const updatedProgressList = [...(collaboration.progress_updates || []), update];
            await updateDoc(docRef, {
                progress_updates: updatedProgressList,
                overall_progress: newProgress,
                status: newProgress >= 100 ? "completed" : "in_progress",
            });

            setProgressMessage("");
        } catch (error) {
            console.error("Error updating progress:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswerQuestion = async (index: number) => {
        if (!answerText.trim() || !collaboration) return;

        setIsSubmitting(true);
        try {
            const docRef = doc(db, "project_collaborations", collaborationId);
            const updatedQuestions = [...collaboration.clarification_questions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                answer: answerText,
                answered_at: new Date().toISOString(),
            };

            await updateDoc(docRef, { clarification_questions: updatedQuestions });
            setAnswerText("");
            setAnsweringIndex(null);
        } catch (error) {
            console.error("Error answering question:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAcceptAssignment = async () => {
        if (!user || !collaboration) return;

        setIsSubmitting(true);
        try {
            const docRef = doc(db, "project_collaborations", collaborationId);
            const updatedAssignments = collaboration.assigned_talent.map((a) =>
                a.talent_id === user.uid
                    ? { ...a, status: "accepted", accepted_at: new Date().toISOString() }
                    : a
            );

            const allAccepted = updatedAssignments.every((a) => a.status === "accepted");

            await updateDoc(docRef, {
                assigned_talent: updatedAssignments,
                status: allAccepted ? "in_progress" : collaboration.status,
                started_at: allAccepted ? new Date().toISOString() : collaboration.started_at,
            });
        } catch (error) {
            console.error("Error accepting assignment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
        );
    }

    if (!collaboration) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Project not found</h1>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Access control: Check if user is authorized to view this project
    const isAdmin = (user as any)?.role === "admin" || ADMIN_EMAILS.includes(user?.email?.toLowerCase() || "");
    const isProjectClient = collaboration.client_id === user?.uid;
    const isAssignedTalent = collaboration.assigned_talent?.some(
        (talent) => talent.talent_id === user?.uid
    );
    const isAuthorized = isAdmin || isProjectClient || isAssignedTalent;

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V9m0 0V7m0 2h2m-2 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
                    <p className="text-slate-600 mb-6">
                        You don't have permission to view this project. Only the client, assigned talent members, and admins can access project details.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const myAssignment = collaboration.assigned_talent.find((a) => a.talent_id === user?.uid);
    const isPending = myAssignment?.status === "pending";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 capitalize">
                                    {collaboration.service_type.replace("-", " ")} Project
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {collaboration.tier.charAt(0).toUpperCase() + collaboration.tier.slice(1)} Tier •{" "}
                                    {isClient ? "Your Project" : `Client: ${collaboration.client_name}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${collaboration.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : collaboration.status === "in_progress"
                                        ? "bg-cyan-100 text-cyan-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                            >
                                {collaboration.status.replace("_", " ").toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Pending Assignment Banner for Talent */}
                {isTalent && isPending && (
                    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-amber-800 flex items-center gap-2">
                                    <Bell size={20} />
                                    You've been assigned to this project!
                                </h3>
                                <p className="text-amber-700 mt-1">
                                    Your skills ({myAssignment?.skills_matched.join(", ")}) match this project.
                                    Match score: {myAssignment?.match_score}%
                                </p>
                            </div>
                            <button
                                onClick={handleAcceptAssignment}
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Accepting..." : "Accept Assignment"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-slate-200 w-fit">
                    {[
                        { id: "overview", label: "Overview", icon: Target },
                        { id: "chat", label: "Team Chat", icon: MessageSquare },
                        { id: "questions", label: "Q&A", icon: HelpCircle },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? "bg-cyan-600 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === "overview" && (
                            <>
                                {/* Progress Card */}
                                <div className="bg-white rounded-xl border border-slate-200 p-6">
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <TrendingUp size={20} className="text-cyan-600" />
                                        Project Progress
                                    </h2>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">Overall Progress</span>
                                            <span className="font-bold text-slate-900">
                                                {collaboration.overall_progress}%
                                            </span>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                                                style={{ width: `${collaboration.overall_progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Progress Updates */}
                                    {(collaboration.progress_updates?.length ?? 0) > 0 && (
                                        <div className="mt-6 space-y-3">
                                            <h3 className="font-semibold text-slate-700">Recent Updates</h3>
                                            {(collaboration.progress_updates ?? []).slice(-3).reverse().map((update, i) => (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                                                        <User size={16} className="text-cyan-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-slate-900">
                                                                {update.updated_by_name}
                                                            </span>
                                                            <span className="text-xs text-slate-500">
                                                                {new Date(update.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-slate-600 mt-1">{update.message}</p>
                                                        <span className="text-xs font-medium text-cyan-600">
                                                            Progress: {update.progress_percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Update Progress (Talent Only) */}
                                    {isTalent && myAssignment?.status === "accepted" && (
                                        <div className="mt-6 pt-6 border-t border-slate-200">
                                            <h3 className="font-semibold text-slate-700 mb-3">Update Progress</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-sm text-slate-600 block mb-1">
                                                        Progress: {newProgress}%
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={newProgress}
                                                        onChange={(e) => setNewProgress(parseInt(e.target.value))}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <textarea
                                                    value={progressMessage}
                                                    onChange={(e) => setProgressMessage(e.target.value)}
                                                    placeholder="What did you accomplish?"
                                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                                    rows={2}
                                                />
                                                <button
                                                    onClick={handleUpdateProgress}
                                                    disabled={isSubmitting || !progressMessage.trim()}
                                                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50"
                                                >
                                                    {isSubmitting ? "Updating..." : "Update Progress"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {activeTab === "chat" && (
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[400px] max-h-[700px]">
                                <div className="p-3 sm:p-4 border-b border-slate-200 shrink-0">
                                    <h2 className="font-bold text-slate-900">Team Chat</h2>
                                    <p className="text-sm text-slate-500 hidden sm:block">
                                        Discuss project details with your team
                                    </p>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                                    {(collaboration.chat_messages?.length ?? 0) === 0 ? (
                                        <div className="text-center text-slate-500 py-8">
                                            <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                                            No messages yet. Start the conversation!
                                        </div>
                                    ) : (
                                        (collaboration.chat_messages ?? []).map((msg, i) => {
                                            const isMe = msg.sender_id === user?.uid;
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                                >
                                                    {!isMe && (
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold mr-2 shrink-0">
                                                            {msg.sender_name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 ${isMe
                                                            ? "bg-cyan-600 text-white rounded-br-md"
                                                            : "bg-slate-100 text-slate-900 rounded-bl-md"
                                                            } ${msg.is_question ? "border-2 border-amber-400" : ""}`}
                                                    >
                                                        {!isMe && (
                                                            <p className="text-xs font-medium opacity-70 mb-1">
                                                                {msg.sender_name} <span className="opacity-60">• {msg.sender_role}</span>
                                                            </p>
                                                        )}
                                                        {msg.is_question && (
                                                            <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full mb-1 inline-block">
                                                                ❓ Question
                                                            </span>
                                                        )}
                                                        <p className="text-sm sm:text-base break-words">{msg.message}</p>
                                                        <p className="text-xs opacity-60 mt-1">
                                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Message Input */}
                                <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 shrink-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isQuestion}
                                                onChange={(e) => setIsQuestion(e.target.checked)}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="hidden sm:inline">Mark as question (for clarification)</span>
                                            <span className="sm:hidden">Ask question?</span>
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                                            placeholder="Type your message..."
                                            className="flex-1 px-3 sm:px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={isSubmitting || !newMessage.trim()}
                                            className="p-2.5 sm:px-4 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                                        >
                                            <Send size={18} />
                                            <span className="hidden sm:inline font-medium">Send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "questions" && (
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <HelpCircle size={20} className="text-amber-600" />
                                    Clarification Questions
                                </h2>

                                {(collaboration.clarification_questions?.length ?? 0) === 0 ? (
                                    <p className="text-slate-500 text-center py-8">
                                        No questions yet. Talent can ask questions in the chat by marking them as
                                        questions.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {(collaboration.clarification_questions ?? []).map((q, i) => (
                                            <div key={i} className="border border-slate-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium text-slate-900">{q.question}</p>
                                                        <p className="text-sm text-slate-500 mt-1">
                                                            Asked by {q.asked_by_name} •{" "}
                                                            {new Date(q.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    {q.answer ? (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                            Answered
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>

                                                {q.answer ? (
                                                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                                        <p className="text-sm font-medium text-green-800">Answer:</p>
                                                        <p className="text-sm text-green-700">{q.answer}</p>
                                                    </div>
                                                ) : isClient ? (
                                                    <div className="mt-3">
                                                        {answeringIndex === i ? (
                                                            <div className="space-y-2">
                                                                <textarea
                                                                    value={answerText}
                                                                    onChange={(e) => setAnswerText(e.target.value)}
                                                                    placeholder="Type your answer..."
                                                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                                                    rows={2}
                                                                />
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleAnswerQuestion(i)}
                                                                        disabled={isSubmitting}
                                                                        className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-lg"
                                                                    >
                                                                        Submit Answer
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setAnsweringIndex(null)}
                                                                        className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-lg"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setAnsweringIndex(i)}
                                                                className="text-sm text-cyan-600 font-medium hover:underline"
                                                            >
                                                                Answer this question
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Details */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Project Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                                        <Calendar size={20} className="text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Deadline</p>
                                        <p className="font-medium text-slate-900">
                                            {collaboration.deadline
                                                ? new Date(collaboration.deadline).toLocaleDateString()
                                                : "Not set"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                                        <Clock size={20} className="text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Duration</p>
                                        <p className="font-medium text-slate-900">
                                            {collaboration.estimated_duration_days} days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Members */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Users size={20} className="text-cyan-600" />
                                Team ({collaboration.assigned_talent.length})
                            </h3>
                            <div className="space-y-3">
                                {collaboration.assigned_talent.map((talent, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold">
                                            {talent.talent_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 truncate">
                                                {talent.talent_name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Match: {talent.match_score}%
                                            </p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${talent.status === "accepted"
                                                ? "bg-green-100 text-green-700"
                                                : talent.status === "pending"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-slate-100 text-slate-700"
                                                }`}
                                        >
                                            {talent.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Matched (for client) */}
                        {isClient && (
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                                <h3 className="font-bold text-slate-900 mb-4">Skills Coverage</h3>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(
                                        new Set(
                                            collaboration.assigned_talent.flatMap((t) => t.skills_matched)
                                        )
                                    ).map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-medium rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
