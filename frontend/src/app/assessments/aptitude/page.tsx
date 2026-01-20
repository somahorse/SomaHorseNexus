"use client";

import { useRouter } from "next/navigation";

export default function AptitudeTestPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-3xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
                    <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Aptitude Assessment</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        This involves a series of logic and reasoning questions. Expected duration: 15 minutes.
                    </p>
                    <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        Start Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}
