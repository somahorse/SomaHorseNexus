"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

function AuthPageContent() {
    const searchParams = useSearchParams();
    const role = (searchParams.get("role") as "client" | "talent") || "talent";
    const { signInWithGoogle, signUpWithEmail } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signUpWithEmail(name, email, password, role);
        } catch (err: any) {
            const code = err?.code || "";
            if (code === "auth/email-already-in-use") {
                setError("An account with this email already exists. Try logging in instead.");
            } else if (code === "auth/weak-password") {
                setError("Password is too weak. Use at least 6 characters.");
            } else if (code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        setError("");
        try {
            await signInWithGoogle(role);
        } catch (err: any) {
            if (err?.code !== "auth/popup-closed-by-user") {
                setError("Google sign-up failed. Please try again.");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 relative">
            {/* Back Button */}
            <Link href="/signup" className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                <span className="font-medium">Back</span>
            </Link>

            <div className="w-full max-w-xl space-y-8 p-8 sm:p-12 border border-slate-200 rounded-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join as a <span className="font-bold text-cyan-600 capitalize">{role}</span> to get started.
                    </p>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="mt-8 space-y-6">
                    {/* Google Button - At the top */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading}
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm hover:bg-slate-50 transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {googleLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                        )}
                        <span className="font-semibold">
                            {googleLoading ? "Connecting..." : "Continue with Google"}
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-slate-500">Or sign up with email</span>
                        </div>
                    </div>

                    {/* Full Form */}
                    <form className="space-y-4" onSubmit={handleSignupSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm px-4 py-2 border"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm px-4 py-2 border"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm px-4 py-2 border pr-10"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm px-4 py-2 border pr-10"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-1 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                                I agree to the <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">Terms and Conditions</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AuthPageContent />
        </Suspense>
    );
}
