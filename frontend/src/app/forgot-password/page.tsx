"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await resetPassword(email);
            setSent(true);
        } catch (err: any) {
            const code = err?.code || "";
            if (code === "auth/user-not-found") {
                setError("No account found with that email address.");
            } else if (code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (code === "auth/too-many-requests") {
                setError("Too many attempts. Please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 relative">
            {/* Back Button */}
            <Link
                href="/login"
                className="absolute top-8 left-8 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600 flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                <span className="font-medium text-sm">Back to login</span>
            </Link>

            <div className="w-full max-w-md space-y-6 p-8 sm:p-10 border border-slate-200 rounded-xl">
                {sent ? (
                    /* ─── Success State ─── */
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                            <CheckCircle2 size={32} className="text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Check your email</h1>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            We&apos;ve sent a password reset link to{" "}
                            <span className="font-semibold text-slate-900">{email}</span>.
                            <br />
                            Click the link in the email to reset your password.
                        </p>
                        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-left space-y-2">
                            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                Didn&apos;t get the email?
                            </p>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Check your spam or junk folder</li>
                                <li>• Make sure you entered the correct email</li>
                                <li>• The email may take a few minutes to arrive</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setSent(false);
                                    setEmail("");
                                }}
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Try a different email
                            </button>
                            <Link
                                href="/login"
                                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white text-center hover:from-cyan-600 hover:to-blue-700 transition-all"
                            >
                                Return to login
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* ─── Form State ─── */
                    <>
                        <div className="text-center">
                            <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                                <Mail size={24} className="text-cyan-600" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Forgot password?
                            </h1>
                            <p className="mt-2 text-sm text-slate-600">
                                No worries. Enter the email address associated with your account and
                                we&apos;ll send you a link to reset your password.
                            </p>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-2">
                                <span className="shrink-0 mt-0.5">⚠</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="reset-email"
                                    className="block text-sm font-medium text-slate-900 mb-2"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-5 h-5"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <input
                                        id="reset-email"
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white hover:from-cyan-600 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {loading ? "Sending..." : "Send reset link"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-600">
                            Remember your password?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-cyan-600 hover:text-cyan-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
