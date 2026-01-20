"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, Code, CheckCircle, Circle } from "lucide-react";

type UserType = "client" | "talent" | null;

export default function SignupPage() {
    const [selectedType, setSelectedType] = useState<UserType>(null);

    const handleSelect = (type: "client" | "talent") => {
        setSelectedType(type);
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl space-y-10">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        Join as a client or talent
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Client Card */}
                    <button
                        onClick={() => handleSelect("client")}
                        className={`relative flex flex-col items-start p-8 rounded-2xl border-2 text-left transition-all duration-300 group ${selectedType === "client"
                            ? "border-transparent bg-gradient-to-r from-cyan-500/5 to-violet-600/5 ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/10"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                            }`}
                        // Use style for gradient border workaround if ring doesn't suffice for specific look
                        style={selectedType === "client" ? { borderColor: "transparent" } : {}}
                    >
                        {/* Radio Indicator */}
                        <div className="absolute top-6 right-6">
                            {selectedType === "client" ? (
                                <CheckCircle className="text-cyan-600" size={24} fill="currentColor" stroke="white" />
                            ) : (
                                <Circle className="text-slate-300 group-hover:text-slate-400 transition-colors" size={24} />
                            )}
                        </div>

                        <div className={`p-3 rounded-xl mb-6 transition-colors ${selectedType === "client" ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"}`}>
                            <Briefcase size={28} />
                        </div>

                        <span className="text-xl font-bold text-slate-900 mb-2">
                            I&apos;m a client, hiring for a project
                        </span>
                    </button>

                    {/* Talent Card */}
                    <button
                        onClick={() => handleSelect("talent")}
                        className={`relative flex flex-col items-start p-8 rounded-2xl border-2 text-left transition-all duration-300 group ${selectedType === "talent"
                            ? "border-transparent bg-gradient-to-r from-cyan-500/5 to-violet-600/5 ring-2 ring-violet-600 shadow-lg shadow-violet-500/10"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
                            }`}
                        style={selectedType === "talent" ? { borderColor: "transparent" } : {}}
                    >
                        {/* Radio Indicator */}
                        <div className="absolute top-6 right-6">
                            {selectedType === "talent" ? (
                                <CheckCircle className="text-violet-600" size={24} fill="currentColor" stroke="white" />
                            ) : (
                                <Circle className="text-slate-300 group-hover:text-slate-400 transition-colors" size={24} />
                            )}
                        </div>

                        <div className={`p-3 rounded-xl mb-6 transition-colors ${selectedType === "talent" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"}`}>
                            <Code size={28} />
                        </div>

                        <span className="text-xl font-bold text-slate-900 mb-2">
                            I&apos;m a talent, looking for work
                        </span>
                    </button>
                </div>

                <div className="flex flex-col items-center space-y-6 pt-4">
                    <Link
                        href={selectedType ? `/auth/signup?role=${selectedType}` : "#"}
                        className={`w-full max-w-sm py-4 px-8 rounded-full font-bold text-lg transition-all transform flex items-center justify-center ${selectedType
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:scale-105 hover:shadow-cyan-500/40"
                                : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
                            }`}
                        aria-disabled={!selectedType}
                    >
                        {selectedType === "client"
                            ? "Join as a Client"
                            : selectedType === "talent"
                                ? "Apply as Talent"
                                : "Create Account"}
                    </Link>

                    <div className="text-center">
                        <span className="text-slate-600">Already have an account? </span>
                        <Link href="/login" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 transition-all border-b border-transparent hover:border-violet-500">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
