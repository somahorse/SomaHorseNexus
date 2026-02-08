"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, X, Briefcase, Code, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmail(email, password);
        } catch (err: any) {
            const code = err?.code || "";
            if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
                setError("Invalid email or password. Please try again.");
            } else if (code === "auth/too-many-requests") {
                setError("Too many failed attempts. Please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async (role: "client" | "talent") => {
        setShowRoleModal(false);
        setGoogleLoading(true);
        setError("");
        try {
            await signInWithGoogle(role);
        } catch (err: any) {
            if (err?.code !== "auth/popup-closed-by-user") {
                setError("Google sign-in failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 relative">
                {/* Back Button */}
                <Link href="/" className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                    <span className="font-medium">Back</span>
                </Link>

                <div className="w-full max-w-xl space-y-8 p-8 sm:p-12 border border-slate-200 rounded-xl">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-2">
                            <span className="shrink-0 mt-0.5">⚠</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mt-10 space-y-6">
                        <form onSubmit={handleEmailLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-3 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading && <Loader2 size={18} className="animate-spin" />}
                                    {loading ? "Signing in..." : "Sign In"}
                                </button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => setShowRoleModal(true)}
                                disabled={googleLoading}
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-700 shadow-sm hover:bg-slate-50 transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {googleLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                                )}
                                <span className="font-semibold text-sm">
                                    {googleLoading ? "Connecting..." : "Continue with Google"}
                                </span>
                            </button>
                        </div>

                        <p className="mt-10 text-center text-sm text-slate-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Role Selection Modal for Google Sign-In */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
                        {/* Close button */}
                        <button
                            onClick={() => setShowRoleModal(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Sign in with Google</h3>
                            <p className="text-sm text-slate-500 mt-1">How are you joining Somahorse Nexus?</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* Client Option */}
                            <button
                                onClick={() => handleGoogleSignIn("client")}
                                className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all duration-200"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                                    <Briefcase size={26} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Client</p>
                                    <p className="text-xs text-slate-500">Hire for a project</p>
                                </div>
                            </button>

                            {/* Talent Option */}
                            <button
                                onClick={() => handleGoogleSignIn("talent")}
                                className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-slate-200 hover:border-violet-500 hover:bg-violet-50/50 transition-all duration-200"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                                    <Code size={26} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Talent</p>
                                    <p className="text-xs text-slate-500">Looking for work</p>
                                </div>
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 text-center">
                            Already have an account? Your existing role will be preserved.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
