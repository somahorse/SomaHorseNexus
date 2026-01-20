"use client";

import { useRouter } from "next/navigation";

export default function CodingTestPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
                    <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Coding Challenge</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        Demonstrate your technical skills with a practical coding problem. Expected duration: 30 minutes.
                    </p>
                    <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        Begin Challenge
                    </button>
                </div>
            </div>
        </div>
    );
}
