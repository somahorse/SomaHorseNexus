"use client";

export default function ProjectProgress() {
    const completed = 41;
    const inProgress = 35;
    const pending = 24;

    // Calculate arc for semi-circle progress
    const radius = 80;
    const circumference = Math.PI * radius; // Half circle
    const completedArc = (completed / 100) * circumference;
    const inProgressArc = (inProgress / 100) * circumference;

    return (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Project Progress</h3>

            {/* Semi-Circle Donut Chart */}
            <div className="relative w-full flex justify-center mb-6">
                <div className="relative w-48 h-24 overflow-hidden">
                    <svg className="w-48 h-48 absolute top-0 left-0" viewBox="0 0 200 200">
                        {/* Background arc */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="20"
                            strokeLinecap="round"
                        />
                        {/* Pending arc (amber) */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray={`${circumference}`}
                            strokeDashoffset="0"
                            className="opacity-40"
                        />
                        {/* In Progress arc (violet) */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray={`${completedArc + inProgressArc} ${circumference}`}
                            strokeDashoffset="0"
                            style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                        />
                        {/* Completed arc (cyan) */}
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray={`${completedArc} ${circumference}`}
                            strokeDashoffset="0"
                            style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                        />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 block">{completed}%</span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Project Ended</span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
                    Completed
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                    In Progress
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    Pending
                </div>
            </div>
        </div>
    );
}
