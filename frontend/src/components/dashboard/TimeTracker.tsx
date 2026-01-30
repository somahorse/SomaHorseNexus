"use client";

import { Pause, Square } from "lucide-react";

export default function TimeTracker() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8 text-white shadow-xl min-h-[200px] flex flex-col justify-between">
            {/* Gradient Glow Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full blur-[80px] opacity-30"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600 rounded-full blur-[80px] opacity-30"></div>
            </div>

            {/* Wave Pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="timeWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <path d="M0,180 C30,160 60,190 100,170 C140,150 170,180 200,160 V200 H0 Z" fill="url(#timeWaveGrad)" />
                    <path d="M0,185 C40,170 80,195 120,175 C160,155 180,185 200,170 V200 H0 Z" fill="url(#timeWaveGrad)" opacity="0.7" />
                    <path d="M0,190 C50,175 90,200 130,180 C170,160 185,190 200,175 V200 H0 Z" fill="url(#timeWaveGrad)" opacity="0.5" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-semibold text-cyan-300 tracking-wider uppercase">Time Tracker</h3>
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50"></div>
                </div>

                <div className="text-5xl lg:text-6xl font-black tracking-tighter font-mono mb-8 text-center bg-gradient-to-r from-white to-cyan-200 text-transparent bg-clip-text">
                    01:24:08
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button className="h-12 w-12 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-white/20 hover:shadow-white/30">
                        <Pause size={20} fill="currentColor" />
                    </button>
                    <button className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-red-500/40 hover:shadow-red-500/50">
                        <Square size={16} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
}
