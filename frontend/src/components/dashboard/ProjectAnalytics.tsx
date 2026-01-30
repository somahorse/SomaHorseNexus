"use client";

export default function ProjectAnalytics() {
    const data = [
        { day: 'S', value: 45, active: false },
        { day: 'M', value: 70, active: false },
        { day: 'T', value: 55, active: true },
        { day: 'W', value: 85, active: false },
        { day: 'T', value: 60, active: false },
        { day: 'F', value: 75, active: false },
        { day: 'S', value: 40, active: false },
    ];

    return (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">Project Analytics</h3>
                    <p className="text-sm text-slate-400 mt-1">78%</p>
                </div>
                <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-200"></div>
                </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-3 px-2">
                {data.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                        <div className="w-full bg-slate-100 rounded-2xl relative h-full overflow-hidden">
                            {/* Striped pattern for inactive bars */}
                            {!bar.active && (
                                <div
                                    className="absolute bottom-0 left-0 w-full rounded-2xl transition-all duration-500"
                                    style={{
                                        height: `${bar.value}%`,
                                        background: `repeating-linear-gradient(
                                            0deg,
                                            #d1d5db,
                                            #d1d5db 4px,
                                            #e5e7eb 4px,
                                            #e5e7eb 8px
                                        )`
                                    }}
                                />
                            )}
                            {/* Gradient fill for active bar */}
                            {bar.active && (
                                <div
                                    className="absolute bottom-0 left-0 w-full rounded-2xl bg-gradient-to-t from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/30 transition-all duration-500"
                                    style={{ height: `${bar.value}%` }}
                                />
                            )}
                            {/* Hover overlay for all bars */}
                            <div
                                className="absolute bottom-0 left-0 w-full rounded-2xl bg-gradient-to-t from-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ height: `${bar.value}%` }}
                            />
                        </div>
                        <span className={`text-xs font-bold transition-colors ${bar.active ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-600'
                            }`}>
                            {bar.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
