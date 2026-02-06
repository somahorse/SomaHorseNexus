"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    Brain,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    ShieldAlert,
    Zap,
    Target,
    Calculator,
    Type,
    Box,
    LogOut
} from "lucide-react";

// Question Categories
type Category = 'pattern' | 'logic' | 'spatial' | 'verbal' | 'numerical';

interface Question {
    id: number;
    category: Category;
    text: string;
    options: string[];
    correct: number;
}

const categoryConfig: Record<Category, { label: string; icon: React.ReactNode; color: string }> = {
    pattern: { label: "Pattern Recognition", icon: <Target size={16} />, color: "bg-cyan-500" },
    logic: { label: "Logical Reasoning", icon: <Brain size={16} />, color: "bg-violet-500" },
    spatial: { label: "Spatial Reasoning", icon: <Box size={16} />, color: "bg-emerald-500" },
    verbal: { label: "Verbal Reasoning", icon: <Type size={16} />, color: "bg-amber-500" },
    numerical: { label: "Numerical Reasoning", icon: <Calculator size={16} />, color: "bg-blue-500" },
};

export default function AptitudeTestPage() {
    const router = useRouter();
    const { user, refreshUserData, logout } = useAuth();
    const [gateLoading, setGateLoading] = useState(true);
    const [cooldownInfo, setCooldownInfo] = useState<{ daysRemaining: number; nextDate: string } | null>(null);

    const handleLogout = async () => {
        if (logout) {
            await logout();
            router.push("/");
        }
    };

    // Test State
    const [testStatus, setTestStatus] = useState<'intro' | 'active' | 'completed'>('intro');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [warnings, setWarnings] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; score: number; cooldown?: boolean, attempts?: number, categoryScores?: Record<Category, { correct: number; total: number }> } | null>(null);

    // Only check for cooldown - AuthContext handles all other routing
    useEffect(() => {
        const checkCooldown = async () => {
            if (!user) {
                setGateLoading(false);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(docRef);
                
                if (snapshot.exists()) {
                    const profile = snapshot.data();
                    const nextAttemptDate = profile?.aptitude?.nextAttemptDate;

                    if (nextAttemptDate) {
                        const nextDate = new Date(nextAttemptDate);
                        const now = new Date();
                        if (now < nextDate) {
                            const diffMs = nextDate.getTime() - now.getTime();
                            const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                            setCooldownInfo({ daysRemaining, nextDate: nextDate.toDateString() });
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to check cooldown", error);
            }

            setGateLoading(false);
        };

        checkCooldown();
    }, [user]);

    // 15 Questions - Professional Aptitude Test
    const questions: Question[] = [
        // Pattern Recognition (3)
        {
            id: 1,
            category: 'pattern',
            text: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
            options: ["42", "40", "38", "44"],
            correct: 0 // 42 (n² + n pattern: 6*7 = 42)
        },
        {
            id: 2,
            category: 'pattern',
            text: "Complete the pattern: A1, B2, C4, D7, E11, ?",
            options: ["F15", "F16", "F14", "F17"],
            correct: 1 // F16 (difference increases by 1 each time: +1, +2, +3, +4, +5)
        },
        {
            id: 3,
            category: 'pattern',
            text: "What is the next number: 1, 1, 2, 3, 5, 8, 13, ?",
            options: ["18", "20", "21", "26"],
            correct: 2 // 21 (Fibonacci sequence)
        },

        // Logical Reasoning (3)
        {
            id: 4,
            category: 'logic',
            text: "All roses are flowers. Some flowers fade quickly. Therefore:",
            options: [
                "All roses fade quickly",
                "Some roses may fade quickly",
                "No roses fade quickly",
                "All flowers are roses"
            ],
            correct: 1
        },
        {
            id: 5,
            category: 'logic',
            text: "If all Bloops are Razzies and all Razzies are Lazzies, then:",
            options: [
                "All Bloops are definitely Lazzies",
                "Some Lazzies are Bloops",
                "All Lazzies are Bloops",
                "No Bloops are Lazzies"
            ],
            correct: 0
        },
        {
            id: 6,
            category: 'logic',
            text: "A train travels 60 km in 1 hour. It then travels 90 km in 1.5 hours. What is its average speed for the entire journey?",
            options: ["70 km/h", "60 km/h", "75 km/h", "65 km/h"],
            correct: 1 // (60+90)/(1+1.5) = 150/2.5 = 60 km/h
        },

        // Spatial Reasoning (3)
        {
            id: 7,
            category: 'spatial',
            text: "If a cube has 6 faces painted red, and you cut it into 27 smaller equal cubes, how many small cubes have exactly one face painted?",
            options: ["6", "8", "12", "1"],
            correct: 0 // 6 (center of each face)
        },
        {
            id: 8,
            category: 'spatial',
            text: "A paper is folded twice and a hole is punched. When unfolded, how many holes appear?",
            options: ["2", "3", "4", "1"],
            correct: 2 // 4 holes
        },
        {
            id: 9,
            category: 'spatial',
            text: "If you look at a clock in a mirror and it shows 2:30, what is the actual time?",
            options: ["9:30", "10:30", "8:30", "7:30"],
            correct: 0 // 9:30
        },

        // Verbal Reasoning (3)
        {
            id: 10,
            category: 'verbal',
            text: "EPHEMERAL is to PERMANENT as OBSCURE is to:",
            options: ["Hidden", "Clear", "Dark", "Vague"],
            correct: 1 // Clear (opposites)
        },
        {
            id: 11,
            category: 'verbal',
            text: "Choose the word that does NOT belong: Dog, Cat, Bird, Chair, Fish",
            options: ["Dog", "Cat", "Chair", "Fish"],
            correct: 2 // Chair (not an animal)
        },
        {
            id: 12,
            category: 'verbal',
            text: "Rearrange 'NEGIEERNN' to form a word. What category does it belong to?",
            options: ["Science", "Profession", "Art Form", "Sport"],
            correct: 1 // ENGINEERING - Profession
        },

        // Numerical Reasoning (3)
        {
            id: 13,
            category: 'numerical',
            text: "If 8 workers can build a wall in 12 days, how many days will 6 workers take?",
            options: ["16 days", "14 days", "18 days", "10 days"],
            correct: 0 // 16 days (inverse proportion: 8*12/6 = 16)
        },
        {
            id: 14,
            category: 'numerical',
            text: "A product's price is increased by 20%, then decreased by 20%. What is the net change?",
            options: ["No change", "4% decrease", "4% increase", "10% decrease"],
            correct: 1 // 4% decrease (1.2 * 0.8 = 0.96)
        },
        {
            id: 15,
            category: 'numerical',
            text: "If the ratio of boys to girls in a class is 3:5 and there are 40 students, how many boys are there?",
            options: ["15", "18", "12", "20"],
            correct: 0 // 15 (3/8 * 40 = 15)
        }
    ];

    const handleStart = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTestStatus('active');
        }, 800);
    };

    // Security: Tab Switching / Blur Detection
    useEffect(() => {
        if (testStatus !== 'active' || result) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation();
            }
        };

        const handleBlur = () => {
            handleViolation();
        };

        const handleViolation = () => {
            if (result) return;
            const newWarnings = warnings + 1;
            setWarnings(newWarnings);

            if (newWarnings >= 2) {
                finishTest(true);
            } else {
                alert("⚠️ WARNING: Tab switching is monitored. If you leave this tab again, your test will be immediately submitted with a score of ZERO.");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [testStatus, warnings, result]);

    // Timer
    useEffect(() => {
        if (testStatus !== 'active' || result) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishTest(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [testStatus, result]);

    const handleAnswer = (optionIndex: number) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const goToQuestion = (index: number) => {
        setCurrentQuestion(index);
    };

    // Get timer color based on time remaining
    const getTimerColor = () => {
        const minutes = Math.floor(timeLeft / 60);
        if (minutes <= 2) return "bg-red-500 text-white animate-pulse";
        if (minutes <= 5) return "bg-amber-500 text-white";
        return "bg-emerald-500 text-white";
    };

    const finishTest = async (disqualified = false) => {
        if (isSubmitting || !user) return;
        setIsSubmitting(true);

        // Calculate Score by Category
        const categoryScores: Record<Category, { correct: number; total: number }> = {
            pattern: { correct: 0, total: 0 },
            logic: { correct: 0, total: 0 },
            spatial: { correct: 0, total: 0 },
            verbal: { correct: 0, total: 0 },
            numerical: { correct: 0, total: 0 }
        };

        let rawScore = 0;
        if (!disqualified) {
            questions.forEach((q, index) => {
                categoryScores[q.category].total++;
                if (answers[index] === q.correct) {
                    rawScore++;
                    categoryScores[q.category].correct++;
                }
            });
        }

        const percentage = Math.round((rawScore / questions.length) * 100);
        const passed = percentage >= 60;

        // Save to Firebase
        try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();

            const attemptHistory = userData?.aptitude?.history || [];
            const attempts = attemptHistory.length + 1;

            if (userData?.aptitude?.nextAttemptDate) {
                const cooldown = new Date(userData.aptitude.nextAttemptDate);
                if (new Date() < cooldown) {
                    setResult({ passed: false, score: 0, cooldown: true, attempts, categoryScores });
                    setTestStatus('completed');
                    return;
                }
            }

            const newHistory = [
                ...attemptHistory,
                { date: new Date().toISOString(), score: percentage, disqualified }
            ];

            const updateData: Record<string, unknown> = {
                "aptitude.score": percentage,
                "aptitude.passed": passed,
                "aptitude.history": newHistory,
                "aptitude.lastAttempt": new Date().toISOString()
            };

            let isCooldown = false;

            if (passed) {
                updateData["onboardingStep"] = 3;
            } else {
                if (attempts >= 2) {
                    const nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + 30);
                    updateData["aptitude.nextAttemptDate"] = nextDate.toISOString();
                    isCooldown = true;
                }
            }

            await updateDoc(userRef, updateData);
            if (refreshUserData) {
                await refreshUserData();
            }
            setResult({ passed, score: percentage, cooldown: isCooldown, attempts, categoryScores });
            setTestStatus('completed');

        } catch (error) {
            console.error("Submission failed", error);
            alert("Submission failed. Please check connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentQ = questions[currentQuestion];
    const answeredCount = Object.keys(answers).length;

    if (gateLoading) return null;

    if (cooldownInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center relative">
                    {/* Logout Button */}
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>

                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="text-amber-600" size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Aptitude Cooldown Active</h1>
                    <p className="mt-4 text-slate-600">
                        You have reached the maximum attempts. You can retry in{" "}
                        <span className="font-semibold text-slate-900">{cooldownInfo.daysRemaining} day(s)</span> on{" "}
                        <span className="font-semibold text-slate-900">{cooldownInfo.nextDate}</span>.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="mt-6 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                    >
                        Return to dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
            <AnimatePresence mode="wait">
                {testStatus === 'intro' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl mx-auto px-6 py-12 lg:py-24"
                    >
                        {/* Logout Button */}
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Header Section */}
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center justify-center p-4 mb-6 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-2xl shadow-lg shadow-cyan-500/25"
                            >
                                <Brain className="w-10 h-10 text-white" />
                            </motion.div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-6">
                                Somahorse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">Talent Foundry</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                This is the gateway to verification. Prove your raw cognitive engine with our professional 15-question assessment.
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">

                                {/* Left: Context & Details */}
                                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Zap size={120} />
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"></div>
                                        Assessment Protocol
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-cyan-600">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Pressure Test</h4>
                                                <p className="text-slate-500 text-sm">20 Minutes. Strict cutoff. We simulate high-stakes delivery environments.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 text-violet-600">
                                                <Brain size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">5 Cognitive Domains</h4>
                                                <p className="text-slate-500 text-sm">Pattern, Logical, Spatial, Verbal & Numerical reasoning. 15 questions total.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-600">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">The Gate</h4>
                                                <p className="text-slate-500 text-sm">Pass with 60% to unlock the <b>Coding Challenge</b> and start your Verified Portfolio.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Pills */}
                                    <div className="mt-8 pt-6 border-t border-slate-100">
                                        <h4 className="text-sm font-semibold text-slate-500 mb-3">Question Categories</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(categoryConfig).map(([key, config]) => (
                                                <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white ${config.color}`}>
                                                    {config.icon}
                                                    {config.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Rules & Action */}
                                <div className="p-8 lg:p-12 bg-gradient-to-br from-slate-50 to-slate-100/50 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                            Rules of Engagement
                                        </h3>
                                        <ul className="space-y-4 mb-10">
                                            <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-100">
                                                    <ShieldAlert className="text-amber-600" size={16} />
                                                </div>
                                                <span>Zero-Tolerance for AI Assistance</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-100">
                                                    <AlertTriangle className="text-amber-600" size={16} />
                                                </div>
                                                <span>Do not refresh or close the tab</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-100">
                                                    <Clock className="text-amber-600" size={16} />
                                                </div>
                                                <span>Maximum 2 attempts per 30 days</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={handleStart}
                                            disabled={isLoading}
                                            className="group w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-violet-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between disabled:opacity-70 disabled:cursor-wait"
                                        >
                                            <span>
                                                {isLoading ? "Initializing Environment..." : "I'm Ready. Start Now"}
                                            </span>
                                            {!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                        <p className="text-xs text-center text-slate-400">
                                            By starting, you agree to being monitored for tab switching.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {testStatus === 'active' && (
                    <motion.div
                        key="active-test"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto px-6 py-8"
                    >
                        {/* Top Bar */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                            <div className="flex items-center gap-4 flex-wrap">
                                {/* Timer */}
                                <div className={`px-5 py-2.5 rounded-2xl font-mono font-bold text-lg shadow-lg ${getTimerColor()}`}>
                                    <Clock className="inline mr-2" size={18} />
                                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                </div>

                                {/* Category Badge */}
                                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold text-white ${categoryConfig[currentQ.category].color}`}>
                                    {categoryConfig[currentQ.category].icon}
                                    {categoryConfig[currentQ.category].label}
                                </span>

                                {/* Warning */}
                                {warnings > 0 && (
                                    <span className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-2xl text-sm font-bold animate-pulse">
                                        <AlertTriangle size={16} /> Warning {warnings}/2
                                    </span>
                                )}
                            </div>

                            <div className="text-slate-500 font-medium">
                                <span className="text-slate-900 font-bold">{currentQuestion + 1}</span> / {questions.length}
                                <span className="ml-4 text-emerald-600">({answeredCount} answered)</span>
                            </div>
                        </div>

                        {/* Progress Bar with Question Indicators */}
                        <div className="mb-8">
                            <div className="flex gap-1.5 flex-wrap">
                                {questions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToQuestion(i)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${i === currentQuestion
                                                ? 'bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg scale-110'
                                                : answers[i] !== undefined
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Question Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100"
                            >
                                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-10 leading-relaxed">
                                    {currentQ.text}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {currentQ.options.map((option, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswer(idx)}
                                            className={`p-5 text-left rounded-2xl border-2 transition-all ${answers[currentQuestion] === idx
                                                    ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-violet-50 shadow-lg ring-2 ring-cyan-500/20'
                                                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-bold text-sm ${answers[currentQuestion] === idx
                                                        ? 'border-cyan-600 bg-gradient-to-br from-cyan-500 to-violet-600 text-white'
                                                        : 'border-slate-300 text-slate-400'
                                                    }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className={`font-medium text-lg ${answers[currentQuestion] === idx ? 'text-cyan-900' : 'text-slate-700'
                                                    }`}>
                                                    {option}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Navigation */}
                                <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
                                    <button
                                        onClick={prevQuestion}
                                        disabled={currentQuestion === 0}
                                        className="flex items-center gap-2 px-6 py-3 text-slate-500 font-semibold hover:text-slate-900 disabled:opacity-30 transition-colors rounded-xl hover:bg-slate-50"
                                    >
                                        <ArrowLeft size={18} />
                                        Previous
                                    </button>

                                    {currentQuestion < questions.length - 1 ? (
                                        <button
                                            onClick={nextQuestion}
                                            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
                                        >
                                            Next Question
                                            <ArrowRight size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => finishTest(false)}
                                            disabled={isSubmitting}
                                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Assessment"}
                                            <CheckCircle2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}

                {testStatus === 'completed' && result && (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-3xl mx-auto px-6 py-16"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                            {/* Result Header */}
                            <div className={`p-12 text-center ${result.passed ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-rose-600'}`}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    {result.passed ? (
                                        <CheckCircle2 size={48} className="text-white" />
                                    ) : (
                                        <AlertTriangle size={48} className="text-white" />
                                    )}
                                </motion.div>
                                <h2 className="text-4xl font-black text-white mb-2">
                                    {result.passed ? "Gate Passed!" : "Verification Failed"}
                                </h2>
                                <p className="text-white/80 text-lg">
                                    {result.passed
                                        ? "Your cognitive engine is verified. Welcome to Phase 2."
                                        : "You did not meet the industrial benchmark."}
                                </p>
                            </div>

                            {/* Score Details */}
                            <div className="p-8 lg:p-12">
                                {/* Overall Score */}
                                <div className="text-center mb-10">
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 mb-2">
                                        {result.score}%
                                    </div>
                                    <p className="text-slate-500 font-medium">Overall Score</p>
                                </div>

                                {/* Category Breakdown */}
                                {result.categoryScores && (
                                    <div className="mb-10">
                                        <h4 className="font-bold text-slate-900 mb-4">Score by Category</h4>
                                        <div className="grid gap-3">
                                            {Object.entries(result.categoryScores).map(([cat, scores]) => (
                                                <div key={cat} className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg text-white ${categoryConfig[cat as Category].color}`}>
                                                        {categoryConfig[cat as Category].icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-slate-700">{categoryConfig[cat as Category].label}</span>
                                                            <span className="text-sm font-bold text-slate-900">{scores.correct}/{scores.total}</span>
                                                        </div>
                                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${categoryConfig[cat as Category].color}`}
                                                                style={{ width: `${(scores.correct / scores.total) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col gap-4">
                                    {result.passed ? (
                                        <button
                                            onClick={() => router.push('/assessments/coding')}
                                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                        >
                                            Proceed to Coding Challenge
                                            <ArrowRight size={20} />
                                        </button>
                                    ) : result.cooldown ? (
                                        <div className="p-6 bg-slate-100 text-slate-600 rounded-2xl text-center">
                                            <p className="font-medium mb-2">Cooldown Active</p>
                                            <p className="text-sm">You can retry after {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setTestStatus('intro');
                                                setWarnings(0);
                                                setCurrentQuestion(0);
                                                setAnswers({});
                                                setTimeLeft(20 * 60);
                                                setResult(null);
                                            }}
                                            className="w-full py-4 border-2 border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                                        >
                                            Retake Assessment
                                        </button>
                                    )}

                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="w-full py-4 text-slate-500 font-medium hover:text-slate-900 transition-colors"
                                    >
                                        Return to Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
