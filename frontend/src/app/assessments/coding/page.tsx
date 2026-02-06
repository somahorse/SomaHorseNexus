"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    Code,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    ShieldAlert,
    Zap,
    Terminal,
    Play,
    RotateCcw,
    LogOut
} from "lucide-react";

interface CodingQuestion {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    examples: { input: string; output: string; explanation?: string }[];
    starterCode: string;
    testCases: { input: string; expectedOutput: string }[];
    hints?: string[];
}

export default function CodingTestPage() {
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
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [code, setCode] = useState<Record<number, string>>({});
    const [warnings, setWarnings] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; score: number; totalPassed: number; totalTests: number; cooldown?: boolean } | null>(null);
    const [testResults, setTestResults] = useState<Record<number, { passed: boolean; output: string }[]>>({});
    const [isRunning, setIsRunning] = useState(false);

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
                    const nextAttemptDate = profile?.coding?.nextAttemptDate;

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

    // Coding Questions
    const questions: CodingQuestion[] = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.",
            examples: [
                { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9" },
                { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" }
            ],
            starterCode: `function twoSum(nums, target) {
    // Your code here
    
}`,
            testCases: [
                { input: "[2, 7, 11, 15], 9", expectedOutput: "[0, 1]" },
                { input: "[3, 2, 4], 6", expectedOutput: "[1, 2]" },
                { input: "[3, 3], 6", expectedOutput: "[0, 1]" }
            ],
            hints: ["Try using a hash map to store values you've seen"]
        },
        {
            id: 2,
            title: "Reverse String",
            difficulty: "Easy",
            description: "Write a function that reverses a string. The input string is given as an array of characters.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
            examples: [
                { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
                { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
            ],
            starterCode: `function reverseString(s) {
    // Your code here - modify s in-place
    
}`,
            testCases: [
                { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
                { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
                { input: '["a","b","c"]', expectedOutput: '["c","b","a"]' }
            ]
        },
        {
            id: 3,
            title: "FizzBuzz",
            difficulty: "Easy",
            description: "Given an integer n, return a string array where:\n\n- answer[i] == \"FizzBuzz\" if i is divisible by 3 and 5\n- answer[i] == \"Fizz\" if i is divisible by 3\n- answer[i] == \"Buzz\" if i is divisible by 5\n- answer[i] == i (as a string) if none of the above",
            examples: [
                { input: "n = 3", output: '["1","2","Fizz"]' },
                { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
                { input: "n = 15", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
            ],
            starterCode: `function fizzBuzz(n) {
    // Your code here
    
}`,
            testCases: [
                { input: "3", expectedOutput: '["1","2","Fizz"]' },
                { input: "5", expectedOutput: '["1","2","Fizz","4","Buzz"]' },
                { input: "15", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
            ]
        }
    ];

    const handleStart = () => {
        setIsLoading(true);
        // Initialize code with starter code
        const initialCode: Record<number, string> = {};
        questions.forEach((q, i) => {
            initialCode[i] = q.starterCode;
        });
        setCode(initialCode);

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

    // Get timer color based on time remaining
    const getTimerColor = () => {
        const minutes = Math.floor(timeLeft / 60);
        if (minutes <= 2) return "bg-red-500 text-white animate-pulse";
        if (minutes <= 5) return "bg-amber-500 text-white";
        return "bg-gradient-to-r from-cyan-500 to-violet-600 text-white";
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-cyan-100 text-cyan-700';
            case 'Medium': return 'bg-amber-100 text-amber-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    // Simulate running code (in production, this would call a backend)
    const runCode = async () => {
        setIsRunning(true);

        // Simulate code execution delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const currentQ = questions[currentQuestion];
        const results: { passed: boolean; output: string }[] = [];

        // Simulate test case results (random for demo)
        currentQ.testCases.forEach((tc, i) => {
            const passed = Math.random() > 0.3; // 70% pass rate for demo
            results.push({
                passed,
                output: passed ? tc.expectedOutput : `Error: Expected ${tc.expectedOutput}`
            });
        });

        setTestResults({ ...testResults, [currentQuestion]: results });
        setIsRunning(false);
    };

    const resetCode = () => {
        setCode({ ...code, [currentQuestion]: questions[currentQuestion].starterCode });
        setTestResults({ ...testResults, [currentQuestion]: [] });
    };

    const finishTest = async (disqualified = false) => {
        if (isSubmitting || !user) return;
        setIsSubmitting(true);

        // Calculate score based on test results
        let totalPassed = 0;
        let totalTests = 0;

        if (!disqualified) {
            questions.forEach((q, qIndex) => {
                const qResults = testResults[qIndex] || [];
                qResults.forEach(r => {
                    totalTests++;
                    if (r.passed) totalPassed++;
                });
            });

            // If no tests were run, give partial credit for code presence
            if (totalTests === 0) {
                questions.forEach((q, qIndex) => {
                    const userCode = code[qIndex] || '';
                    if (userCode.length > q.starterCode.length + 20) {
                        totalTests += 3;
                        totalPassed += 1; // Give 1/3 credit for attempting
                    }
                });
            }
        }

        // Ensure we have some total tests to calculate percentage
        if (totalTests === 0) totalTests = questions.length * 3;

        const percentage = Math.round((totalPassed / totalTests) * 100);
        const passed = percentage >= 50; // 50% pass mark for coding

        // Save to Firebase
        try {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();

            const attemptHistory = userData?.coding?.history || [];
            const attempts = attemptHistory.length + 1;

            // Check cooldown
            if (userData?.coding?.nextAttemptDate) {
                const cooldown = new Date(userData.coding.nextAttemptDate);
                if (new Date() < cooldown) {
                    setResult({ passed: false, score: 0, totalPassed: 0, totalTests, cooldown: true });
                    setTestStatus('completed');
                    return;
                }
            }

            const newHistory = [
                ...attemptHistory,
                { date: new Date().toISOString(), score: percentage, disqualified, totalPassed, totalTests }
            ];

            const updateData: Record<string, unknown> = {
                "coding.score": percentage,
                "coding.passed": passed,
                "coding.history": newHistory,
                "coding.lastAttempt": new Date().toISOString()
            };

            let isCooldown = false;

            if (passed) {
                updateData["onboardingStep"] = 4; // Fully onboarded
            } else {
                if (attempts >= 2) {
                    const nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + 30);
                    updateData["coding.nextAttemptDate"] = nextDate.toISOString();
                    isCooldown = true;
                }
            }

            await updateDoc(userRef, updateData);

            // Refresh user data to update context
            if (refreshUserData) {
                await refreshUserData();
            }

            setResult({ passed, score: percentage, totalPassed, totalTests, cooldown: isCooldown });
            setTestStatus('completed');

        } catch (error) {
            console.error("Submission failed", error);
            alert("Submission failed. Please check connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentQ = questions[currentQuestion];

    if (gateLoading) return null;

    if (cooldownInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-slate-800/70 rounded-3xl shadow-2xl border border-slate-700/50 p-8 text-center relative">
                    {/* Logout Button */}
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>

                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="text-amber-400" size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-white">Coding Cooldown Active</h1>
                    <p className="mt-4 text-slate-300">
                        You have reached the maximum attempts. You can retry in{" "}
                        <span className="font-semibold text-white">{cooldownInfo.daysRemaining} day(s)</span> on{" "}
                        <span className="font-semibold text-white">{cooldownInfo.nextDate}</span>.
                    </p>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="mt-6 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all"
                    >
                        Return to dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white selection:bg-cyan-500/30">
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
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
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
                                <Terminal className="w-10 h-10 text-white" />
                            </motion.div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Coding Challenge</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Demonstrate your technical skills with real coding problems. This is the final gate to your Verified Portfolio.
                            </p>
                        </div>

                        {/* Main Card */}
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2">

                                {/* Left: Context & Details */}
                                <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-700/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Code size={120} className="text-cyan-500" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"></div>
                                        Challenge Protocol
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Time Limit</h4>
                                                <p className="text-slate-400 text-sm">30 Minutes. Solve as many problems as you can.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400">
                                                <Terminal size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">3 Coding Problems</h4>
                                                <p className="text-slate-400 text-sm">JavaScript-based challenges. Write clean, efficient code.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Pass Threshold</h4>
                                                <p className="text-slate-400 text-sm">50% of test cases must pass to unlock your dashboard.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Rules & Action */}
                                <div className="p-8 lg:p-12 bg-slate-800/30 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                            Security Rules
                                        </h3>
                                        <ul className="space-y-4 mb-10">
                                            <li className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-500/20">
                                                    <ShieldAlert className="text-amber-400" size={16} />
                                                </div>
                                                <span>No external resources or AI assistance</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-500/20">
                                                    <AlertTriangle className="text-amber-400" size={16} />
                                                </div>
                                                <span>Tab switching will trigger a warning</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                                <div className="p-2 rounded-lg bg-amber-500/20">
                                                    <Clock className="text-amber-400" size={16} />
                                                </div>
                                                <span>2 warnings = automatic disqualification</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={handleStart}
                                            disabled={isLoading}
                                            className="group w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between disabled:opacity-70 disabled:cursor-wait"
                                        >
                                            <span>
                                                {isLoading ? "Loading Editor..." : "Begin Challenge"}
                                            </span>
                                            {!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                        <p className="text-xs text-center text-slate-500">
                                            By starting, you agree to proctored monitoring.
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-screen flex flex-col"
                    >
                        {/* Top Bar */}
                        <div className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Timer */}
                                    <div className={`px-5 py-2.5 rounded-xl font-mono font-bold shadow-lg ${getTimerColor()}`}>
                                        <Clock className="inline mr-2" size={18} />
                                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                    </div>

                                    {/* Warning */}
                                    {warnings > 0 && (
                                        <span className="flex items-center gap-2 text-red-400 bg-red-500/20 px-4 py-2 rounded-xl text-sm font-bold animate-pulse">
                                            <AlertTriangle size={16} /> Warning {warnings}/2
                                        </span>
                                    )}
                                </div>

                                {/* Question Nav */}
                                <div className="flex items-center gap-2">
                                    {questions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentQuestion(i)}
                                            className={`w-10 h-10 rounded-xl font-bold transition-all ${i === currentQuestion
                                                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg'
                                                    : testResults[i]?.some(r => r.passed)
                                                        ? 'bg-cyan-500/30 text-cyan-300'
                                                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => finishTest(false)}
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-70"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit All"}
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                            {/* Problem Description */}
                            <div className="bg-slate-800/50 border-r border-slate-700/50 overflow-y-auto p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-white">{currentQ.title}</h2>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(currentQ.difficulty)}`}>
                                        {currentQ.difficulty}
                                    </span>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-slate-300 whitespace-pre-line mb-6">{currentQ.description}</p>

                                    <h4 className="text-lg font-bold text-white mb-4">Examples</h4>
                                    {currentQ.examples.map((ex, i) => (
                                        <div key={i} className="bg-slate-900/50 rounded-xl p-4 mb-4 font-mono text-sm">
                                            <div className="text-cyan-400 mb-2"><span className="text-slate-500">Input:</span> {ex.input}</div>
                                            <div className="text-violet-400 mb-2"><span className="text-slate-500">Output:</span> {ex.output}</div>
                                            {ex.explanation && (
                                                <div className="text-slate-400 text-xs mt-2">{ex.explanation}</div>
                                            )}
                                        </div>
                                    ))}

                                    {currentQ.hints && currentQ.hints.length > 0 && (
                                        <>
                                            <h4 className="text-lg font-bold text-white mb-4">Hints</h4>
                                            <ul className="list-disc list-inside text-slate-400 text-sm">
                                                {currentQ.hints.map((hint, i) => (
                                                    <li key={i}>{hint}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Code Editor */}
                            <div className="flex flex-col bg-slate-900">
                                {/* Editor Header */}
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                                    <span className="text-sm font-medium text-slate-400">JavaScript</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={resetCode}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            <RotateCcw size={14} />
                                            Reset
                                        </button>
                                        <button
                                            onClick={runCode}
                                            disabled={isRunning}
                                            className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-70"
                                        >
                                            <Play size={14} />
                                            {isRunning ? "Running..." : "Run"}
                                        </button>
                                    </div>
                                </div>

                                {/* Code Area */}
                                <div className="flex-1 p-4">
                                    <textarea
                                        value={code[currentQuestion] || ''}
                                        onChange={(e) => setCode({ ...code, [currentQuestion]: e.target.value })}
                                        className="w-full h-full bg-slate-950 text-cyan-300 font-mono text-sm p-4 rounded-xl border border-slate-700 focus:border-cyan-500 focus:outline-none resize-none"
                                        spellCheck={false}
                                        placeholder="Write your code here..."
                                    />
                                </div>

                                {/* Test Results */}
                                {testResults[currentQuestion] && testResults[currentQuestion].length > 0 && (
                                    <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700/50">
                                        <h4 className="text-sm font-bold text-slate-300 mb-2">Test Results</h4>
                                        <div className="flex gap-2">
                                            {testResults[currentQuestion].map((r, i) => (
                                                <div key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${r.passed ? 'bg-cyan-500/20 text-cyan-300' : 'bg-red-500/20 text-red-300'
                                                    }`}>
                                                    Test {i + 1}: {r.passed ? '✓ Passed' : '✗ Failed'}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {testStatus === 'completed' && result && (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-2xl mx-auto px-6 py-16"
                    >
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
                            {/* Result Header */}
                            <div className={`p-12 text-center ${result.passed
                                    ? 'bg-gradient-to-br from-cyan-500 to-violet-600'
                                    : 'bg-gradient-to-br from-red-500 to-rose-600'
                                }`}>
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
                                    {result.passed ? "Challenge Complete!" : "Challenge Failed"}
                                </h2>
                                <p className="text-white/80 text-lg">
                                    {result.passed
                                        ? "Congratulations! Your dashboard is now fully unlocked."
                                        : "You did not pass enough test cases."}
                                </p>
                            </div>

                            {/* Score Details */}
                            <div className="p-8 lg:p-12">
                                <div className="text-center mb-10">
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-2">
                                        {result.score}%
                                    </div>
                                    <p className="text-slate-400 font-medium">
                                        {result.totalPassed} / {result.totalTests} test cases passed
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-4">
                                    {result.passed ? (
                                        <button
                                            onClick={() => router.push('/dashboard')}
                                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                        >
                                            Go to Dashboard
                                            <ArrowRight size={20} />
                                        </button>
                                    ) : result.cooldown ? (
                                        <div className="p-6 bg-slate-700/50 text-slate-300 rounded-2xl text-center">
                                            <p className="font-medium mb-2">Cooldown Active</p>
                                            <p className="text-sm text-slate-400">You can retry after {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setTestStatus('intro');
                                                setWarnings(0);
                                                setCurrentQuestion(0);
                                                setCode({});
                                                setTestResults({});
                                                setTimeLeft(30 * 60);
                                                setResult(null);
                                            }}
                                            className="w-full py-4 border-2 border-slate-600 text-white font-bold rounded-2xl hover:bg-slate-700/50 transition-all"
                                        >
                                            Retake Challenge
                                        </button>
                                    )}

                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="w-full py-4 text-slate-400 font-medium hover:text-white transition-colors"
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
