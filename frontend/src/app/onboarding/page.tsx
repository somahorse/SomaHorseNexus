"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { api } from "@/lib/api";
import { Challenge } from "@/lib/types";
import { Terminal, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; feedback: string } | null>(null);

    useEffect(() => {
        async function loadChallenge() {
            try {
                // Mock ID for now, in real app we'd fetch list and pick one
                // Ensuring we hit the endpoint we made
                const res = await api.get<Challenge[]>("/assessments/challenges");
                if (res.data.length > 0) {
                    const firstChallenge = res.data[0];
                    setChallenge(firstChallenge);
                    setCode(firstChallenge.starter_code);
                }
            } catch (err) {
                console.error("Failed to load challenge", err);
            } finally {
                setLoading(false);
            }
        }
        loadChallenge();
    }, []);

    const handleSubmit = async () => {
        if (!challenge) return;
        setSubmitting(true);
        try {
            const res = await api.post("/assessments/submit", {
                developer_id: "temp_dev_id", // In real app, from Auth context
                challenge_id: challenge._id,
                code_content: code,
                model_accuracy: 0, // Backend calculates this
                passed: false,
                feedback: "",
                extracted_skills: []
            });

            setResult({
                passed: res.data.passed,
                feedback: res.data.feedback
            });
        } catch (err) {
            console.error("Submission failed", err);
            alert("Submission failed. Check console.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-black text-green-500">
            <Loader2 className="w-10 h-10 animate-spin" />
        </div>
    );

    if (!challenge) return <div className="text-white p-10">No challenges available. Ensure Backend is running.</div>;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Sidebar: Instructions */}
            <div className="w-full md:w-1/3 p-6 border-r border-white/10 flex flex-col h-screen overflow-y-auto">
                <Link href="/" className="mb-8 text-sm text-gray-400 hover:text-white flex items-center gap-2">
                    ← Back
                </Link>

                <div className="mb-6">
                    <span className="text-xs font-mono text-green-400 border border-green-400/30 px-2 py-1 rounded">
                        SKILL ASSESSMENT #01
                    </span>
                    <h1 className="text-3xl font-bold mt-4 mb-2">{challenge.title}</h1>
                    <p className="text-gray-400 leading-relaxed">
                        {challenge.description}
                    </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg mb-6 text-sm">
                    <h3 className="font-bold text-gray-300 mb-2 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Dataset Info
                    </h3>
                    <p className="text-xs font-mono text-blue-300 break-all">
                        {challenge.dataset_url}
                    </p>
                </div>

                <div className="mt-auto">
                    {/* Result Display */}
                    {result && (
                        <div className={`p-4 rounded-lg mb-4 border ${result.passed ? "bg-green-900/20 border-green-500/50" : "bg-red-900/20 border-red-500/50"}`}>
                            <div className="flex items-center gap-2 font-bold mb-1">
                                {result.passed ? <CheckCircle className="text-green-400" /> : <XCircle className="text-red-400" />}
                                {result.passed ? "PASSED" : "FAILED"}
                            </div>
                            <p className="text-sm opacity-80">{result.feedback}</p>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`w-full py-4 font-bold rounded-lg transition-all ${submitting
                                ? "bg-gray-700 cursor-not-allowed"
                                : "bg-white text-black hover:bg-green-400"
                            }`}
                    >
                        {submitting ? "Analyzing..." : "Submit Solution"}
                    </button>
                </div>
            </div>

            {/* Main: Editor */}
            <div className="flex-1 h-[500px] md:h-screen p-4 bg-[#1e1e1e]">
                <CodeEditor
                    initialValue={code}
                    onChange={(val) => setCode(val || "")}
                />
            </div>
        </div>
    );
}
