"use client";

import { Plus } from "lucide-react";

export default function ProjectList() {
    const projects = [
        { title: "Develop API Endpoints", date: "Nov 26, 2024", color: "bg-cyan-500", icon: "💻" },
        { title: "Onboarding Flow", date: "Nov 28, 2024", color: "bg-violet-500", icon: "🚀" },
        { title: "Build Dashboard", date: "Nov 30, 2024", color: "bg-blue-500", icon: "📊" },
        { title: "Optimize Page Load", date: "Dec 5, 2024", color: "bg-purple-500", icon: "⚡" },
        { title: "Cross-Browser Testing", date: "Dec 6, 2024", color: "bg-indigo-500", icon: "🧪" },
    ];

    return (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Project</h3>
                <button className="inline-flex items-center gap-1.5 text-xs font-bold border border-slate-200 px-3 py-2 rounded-full text-slate-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-violet-50 hover:border-cyan-200 transition-all">
                    <Plus size={14} />
                    New
                </button>
            </div>

            <div className="space-y-5">
                {projects.map((project, i) => (
                    <div key={i} className="flex items-start gap-3 group cursor-pointer">
                        {/* Timeline Dot and Line */}
                        <div className="relative flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${project.color} ring-4 ring-white shadow-sm z-10`}></div>
                            {i !== projects.length - 1 && (
                                <div className="absolute top-3 w-0.5 h-12 bg-slate-100"></div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-base">{project.icon}</span>
                                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-violet-600 transition-colors">
                                    {project.title}
                                </h4>
                            </div>
                            <p className="text-xs text-slate-400">Due date: {project.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
